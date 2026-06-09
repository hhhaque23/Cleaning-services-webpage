import type { Booking } from "./booking-types";
import { SITE } from "./site";
import { TIER_META, FREQUENCY_META, ADDON_META } from "@/app/components/Booking/pricing";

/**
 * Email layer — Resend over plain fetch (no npm dependency). Fail-open by
 * design: a missing key or a provider error must NEVER break a booking. The
 * caller treats a non-ok result as "not emailed" and moves on.
 *
 * Setup (one-time): create a Resend account, verify your sending domain, then
 * set RESEND_API_KEY and EMAIL_FROM on the host. Until then, sends are skipped.
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
// `from` must be on a Resend-verified domain in production. The resend.dev
// fallback only delivers to your own Resend account email — handy for a first
// live test before the domain is verified.
const EMAIL_FROM =
  process.env.EMAIL_FROM || "Spectre Cleaning <onboarding@resend.dev>";

export function isEmailConfigured() {
  return Boolean(RESEND_API_KEY);
}

type SendResult = { ok: boolean; skipped?: boolean; id?: string; error?: string };

export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<SendResult> {
  if (!RESEND_API_KEY) {
    console.warn("[email] RESEND_API_KEY not set — skipping email to", opts.to);
    return { ok: false, skipped: true };
  }

  // Don't let a hung provider stall the booking response.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: [opts.to],
        subject: opts.subject,
        html: opts.html,
        text: opts.text,
        ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("[email] Resend error", res.status, body);
      return { ok: false, error: `Resend ${res.status}` };
    }
    const data = (await res.json().catch(() => ({}))) as { id?: string };
    return { ok: true, id: data?.id };
  } catch (e) {
    console.error("[email] send failed", e);
    return { ok: false, error: e instanceof Error ? e.message : "send failed" };
  } finally {
    clearTimeout(timeout);
  }
}

// ---- Booking confirmation template ----

const WINDOW_LABEL: Record<Booking["slotWindow"], string> = {
  morning: "Morning · 8–11 AM",
  midday: "Midday · 11 AM–2 PM",
  afternoon: "Afternoon · 2–5 PM",
};

// Email-safe palette (hex only — no oklch/var). Echoes the Spectre brand:
// dark navy ink, cool cyan-blue accent, tinted off-white surfaces.
const C = {
  ink: "#14233a",
  inkDeep: "#0c1726",
  inkSoft: "#5b6b82",
  onDark: "#aebccf",
  onDarkFaint: "#8090a4",
  accent: "#2f6fe0",
  accentLight: "#8fb6ff",
  page: "#eef2f8",
  card: "#ffffff",
  line: "#e6ebf3",
  tint: "#eef4ff",
  tintBorder: "#d3e2ff",
};

// System font stack — web fonts don't render reliably in email clients.
const F = "-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif";
const MONO = "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function bookingConfirmationEmail(b: Booking): {
  subject: string;
  html: string;
  text: string;
} {
  const service = TIER_META[b.tier].label;
  const freq = FREQUENCY_META[b.frequency].label;
  const when = new Date(b.slotDate + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const windowLabel = WINDOW_LABEL[b.slotWindow];
  const where = b.address + (b.apt ? `, ${b.apt}` : "");
  const addOnLabels = b.addOns.map(
    (a) => ADDON_META[a as keyof typeof ADDON_META]?.label ?? a
  );
  const addOns = addOnLabels.length ? addOnLabels.join(", ") : "None";
  const money = (n: number) => `$${n.toLocaleString("en-US")}`;
  const hasDiscount = b.priceDiscount > 0;

  const subject = `You're booked — Spectre Cleaning (${b.id})`;

  // Detail rows (clean label/value table).
  const detailRows: [string, string][] = [
    ["When", when],
    ["Time window", windowLabel],
    ["Address", where],
    ["Service", service],
    ["Plan", freq],
  ];
  if (addOnLabels.length) detailRows.push(["Add-ons", addOns]);

  const detailRowsHtml = detailRows
    .map(
      ([label, value], i) => `
        <tr>
          <td style="padding:11px 0;${i > 0 ? `border-top:1px solid ${C.line};` : ""}font:600 11px/1.4 ${F};letter-spacing:.07em;text-transform:uppercase;color:${C.inkSoft};vertical-align:top;width:36%;white-space:nowrap;">${esc(label)}</td>
          <td style="padding:11px 0;${i > 0 ? `border-top:1px solid ${C.line};` : ""}font:600 15px/1.5 ${F};color:${C.ink};text-align:right;">${esc(value)}</td>
        </tr>`
    )
    .join("");

  const discountRow = hasDiscount
    ? `<tr>
            <td style="font:400 14px/1.8 ${F};color:${C.onDark};">${esc(freq)} discount</td>
            <td align="right" style="font:600 14px/1.8 ${F};color:${C.accentLight};">&minus;${money(b.priceDiscount)}</td>
          </tr>`
    : "";

  const siteHost = SITE.url.replace(/^https?:\/\//, "");

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:0;background:${C.page};-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Your booking ${esc(b.id)} is confirmed — ${esc(when)}, ${esc(windowLabel)}.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.page};padding:30px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;border-radius:22px;overflow:hidden;border:1px solid ${C.line};box-shadow:0 24px 60px -28px rgba(20,35,58,.4);">

        <!-- Logo header band -->
        <tr><td style="background-color:${C.ink};background-image:linear-gradient(135deg,${C.ink} 0%,${C.inkDeep} 100%);padding:24px 32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="vertical-align:middle;">
              <table role="presentation" cellpadding="0" cellspacing="0"><tr>
                <td style="vertical-align:middle;padding-right:11px;"><img src="${SITE.url}/spectre-ghost.png" width="40" height="34" alt="Spectre Cleaning" style="display:block;border:0;outline:none;"></td>
                <td style="vertical-align:middle;font:800 20px/1 ${F};color:#ffffff;letter-spacing:-.01em;">Spectre<span style="color:${C.accentLight};font-weight:600;"> Cleaning</span></td>
              </tr></table>
            </td>
            <td align="right" style="vertical-align:middle;"><span style="display:inline-block;background:rgba(143,182,255,.16);color:#cfe0ff;font:700 10px/1 ${F};letter-spacing:.12em;text-transform:uppercase;padding:8px 13px;border-radius:999px;">Confirmed</span></td>
          </tr></table>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:${C.card};padding:36px 32px 32px;">
          <div style="font:700 12px/1.4 ${F};letter-spacing:.1em;text-transform:uppercase;color:${C.accent};">Booking confirmed</div>
          <h1 style="margin:8px 0 0;font:800 31px/1.08 ${F};color:${C.ink};letter-spacing:-.025em;">You&apos;re booked.</h1>
          <p style="margin:12px 0 0;font:400 16px/1.6 ${F};color:${C.inkSoft};">Thanks for booking with Spectre Cleaning — your clean is locked in. Keep this email; your booking code and full details are below.</p>

          <!-- Booking code -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:26px 0 0;">
            <tr><td style="background:${C.tint};border:1px solid ${C.tintBorder};border-radius:16px;padding:18px 22px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
                <td style="vertical-align:middle;">
                  <div style="font:700 11px/1.4 ${F};letter-spacing:.14em;text-transform:uppercase;color:${C.inkSoft};">Booking code</div>
                  <div style="margin-top:5px;font:800 27px/1.1 ${MONO};letter-spacing:.06em;color:${C.ink};">${esc(b.id)}</div>
                </td>
                <td align="right" style="vertical-align:middle;font:500 12px/1.5 ${F};color:${C.inkSoft};">Show this to<br>your cleaner</td>
              </tr></table>
            </td></tr>
          </table>

          <!-- Details -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px;">${detailRowsHtml}
          </table>

          <!-- Price card -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
            <tr><td style="background-color:${C.ink};background-image:linear-gradient(135deg,${C.ink} 0%,${C.inkDeep} 100%);border-radius:16px;padding:22px 24px;">
              <div style="font:700 11px/1.4 ${F};letter-spacing:.14em;text-transform:uppercase;color:${C.accentLight};">Your price</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">
                <tr>
                  <td style="font:400 14px/1.8 ${F};color:${C.onDark};">Subtotal</td>
                  <td align="right" style="font:600 14px/1.8 ${F};color:#ffffff;">${money(b.priceSubtotal)}</td>
                </tr>
                ${discountRow}
              </table>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:10px;border-top:1px solid rgba(255,255,255,.14);">
                <tr>
                  <td style="padding-top:13px;font:600 13px/1.3 ${F};color:${C.onDark};vertical-align:bottom;">Total<span style="display:block;font:400 11px/1.4 ${F};color:${C.onDarkFaint};margin-top:3px;">Billed after the clean</span></td>
                  <td align="right" style="padding-top:13px;font:800 32px/1 ${F};color:#ffffff;letter-spacing:-.02em;vertical-align:bottom;">${money(b.priceTotal)}</td>
                </tr>
              </table>
            </td></tr>
          </table>

          <!-- What happens next -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
            <tr><td style="background:${C.page};border-radius:14px;padding:16px 18px;font:400 14px/1.6 ${F};color:${C.ink};">
              <strong style="color:${C.ink};">What happens next:</strong> we&apos;ll text you within 15 minutes to confirm your cleaner and exact arrival window. Need to change anything? Reply to this email or reach us at <a href="mailto:${esc(SITE.email)}" style="color:${C.accent};text-decoration:none;font-weight:600;">${esc(SITE.email)}</a>.
            </td></tr>
          </table>
        </td></tr>
      </table>

      <!-- Footer -->
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;">
        <tr><td style="padding:18px 12px 6px;text-align:center;">
          <div style="font:700 13px/1 ${F};color:${C.ink};letter-spacing:-.01em;">Spectre<span style="color:${C.accent};"> Cleaning Solutions</span></div>
          <div style="margin-top:6px;font:400 12px/1.6 ${F};color:${C.inkSoft};">${esc(SITE.areaLong)} &middot; <a href="${esc(SITE.url)}" style="color:${C.inkSoft};text-decoration:underline;">${esc(siteHost)}</a></div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  const text = [
    `You're booked — Spectre Cleaning`,
    ``,
    `Booking code: ${b.id}`,
    ``,
    `When:        ${when}`,
    `Time window: ${windowLabel}`,
    `Address:     ${where}`,
    `Service:     ${service}`,
    `Plan:        ${freq}`,
    `Add-ons:     ${addOns}`,
    ``,
    `Subtotal:    ${money(b.priceSubtotal)}`,
    ...(hasDiscount ? [`Discount:    -${money(b.priceDiscount)} (${freq})`] : []),
    `Total:       ${money(b.priceTotal)} (billed after the clean)`,
    ``,
    `What happens next: we'll text you within 15 minutes to confirm your cleaner and exact arrival window.`,
    `Need to change anything? Reply to this email or contact ${SITE.email}.`,
    ``,
    `Spectre Cleaning Solutions · ${SITE.areaLong}`,
    SITE.url,
  ].join("\n");

  return { subject, html, text };
}
