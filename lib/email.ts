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

const C = {
  ink: "#14233a",
  inkSoft: "#5b6b82",
  accent: "#2f6fe0",
  page: "#eef2f8",
  card: "#ffffff",
  line: "#e3e9f2",
  codeBg: "#eef4ff",
};

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
  const addOns =
    b.addOns.length === 0
      ? "None"
      : b.addOns
          .map((a) => ADDON_META[a as keyof typeof ADDON_META]?.label ?? a)
          .join(", ");
  const price = `$${b.priceTotal.toLocaleString()}`;

  const subject = `Your Spectre Cleaning booking is confirmed — ${b.id}`;

  const rows: [string, string][] = [
    ["Service", service],
    ["When", `${when} · ${windowLabel}`],
    ["Where", where],
    ["Frequency", freq],
    ["Add-ons", addOns],
    ["Price", `${price} · billed after the clean`],
  ];

  const rowsHtml = rows
    .map(
      ([label, value], i) => `
      <tr>
        <td style="padding:12px 0;${i > 0 ? `border-top:1px solid ${C.line};` : ""}font:600 12px/1.4 -apple-system,Segoe UI,Roboto,Arial,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:${C.inkSoft};white-space:nowrap;vertical-align:top;width:34%;">${esc(label)}</td>
        <td style="padding:12px 0;${i > 0 ? `border-top:1px solid ${C.line};` : ""}font:600 15px/1.5 -apple-system,Segoe UI,Roboto,Arial,sans-serif;color:${C.ink};text-align:right;">${esc(value)}</td>
      </tr>`,
    )
    .join("");

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:0;background:${C.page};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Your booking ${esc(b.id)} is confirmed — ${esc(when)}, ${esc(windowLabel)}.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.page};padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:560px;max-width:100%;">
        <!-- Brand bar -->
        <tr><td style="padding:6px 6px 18px;">
          <span style="font:800 18px/1 -apple-system,Segoe UI,Roboto,Arial,sans-serif;color:${C.ink};letter-spacing:-.01em;">Spectre<span style="color:${C.accent};font-weight:600;"> Cleaning</span></span>
        </td></tr>

        <!-- Card -->
        <tr><td style="background:${C.card};border:1px solid ${C.line};border-radius:18px;padding:32px 28px;">
          <div style="font:600 12px/1.4 -apple-system,Segoe UI,Roboto,Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:${C.accent};">Booking confirmed</div>
          <h1 style="margin:8px 0 0;font:800 28px/1.1 -apple-system,Segoe UI,Roboto,Arial,sans-serif;color:${C.ink};letter-spacing:-.02em;">You're booked.</h1>
          <p style="margin:10px 0 0;font:400 15px/1.6 -apple-system,Segoe UI,Roboto,Arial,sans-serif;color:${C.inkSoft};">
            Thanks for booking with Spectre Cleaning. Keep this email — your booking code is below if you ever need to reference it.
          </p>

          <!-- Code box -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:22px 0 6px;">
            <tr><td style="background:${C.codeBg};border:1px dashed ${C.accent};border-radius:14px;padding:18px 20px;" align="center">
              <div style="font:600 11px/1.4 -apple-system,Segoe UI,Roboto,Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:${C.inkSoft};">Your booking code</div>
              <div style="margin-top:6px;font:800 30px/1.1 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;letter-spacing:.06em;color:${C.ink};">${esc(b.id)}</div>
            </td></tr>
          </table>

          <!-- Details -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:18px;">
            ${rowsHtml}
          </table>

          <!-- Next steps -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px;">
            <tr><td style="background:${C.page};border-radius:14px;padding:16px 18px;font:400 14px/1.6 -apple-system,Segoe UI,Roboto,Arial,sans-serif;color:${C.ink};">
              <strong style="color:${C.ink};">What happens next:</strong> we'll text you within 15 minutes to confirm your cleaner and arrival window. Need to change anything? Just reply to this email or reach us at <a href="mailto:${esc(SITE.email)}" style="color:${C.accent};text-decoration:none;font-weight:600;">${esc(SITE.email)}</a>.
            </td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:18px 8px 6px;font:400 12px/1.6 -apple-system,Segoe UI,Roboto,Arial,sans-serif;color:${C.inkSoft};">
          Spectre Cleaning Solutions · ${esc(SITE.areaLong)}<br>
          <a href="${esc(SITE.url)}" style="color:${C.inkSoft};">${esc(SITE.url.replace(/^https?:\/\//, ""))}</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  const text = [
    `You're booked — Spectre Cleaning`,
    ``,
    `Your booking code: ${b.id}`,
    ``,
    `Service:   ${service}`,
    `When:      ${when} · ${windowLabel}`,
    `Where:     ${where}`,
    `Frequency: ${freq}`,
    `Add-ons:   ${addOns}`,
    `Price:     ${price} (billed after the clean)`,
    ``,
    `What happens next: we'll text you within 15 minutes to confirm your cleaner and arrival window.`,
    `Need to change anything? Reply to this email or contact ${SITE.email}.`,
    ``,
    `Spectre Cleaning Solutions · ${SITE.areaLong}`,
    SITE.url,
  ].join("\n");

  return { subject, html, text };
}
