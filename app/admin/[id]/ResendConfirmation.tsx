"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";

type Props = { id: string; email: string };

export function ResendConfirmation({ id, email }: Props) {
  const [busy, setBusy] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function send() {
    setErr(null);
    setSentTo(null);
    setBusy(true);
    try {
      const res = await fetch(`/api/bookings/${id}/email`, { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Send failed");
      setSentTo(data.to || email);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Network error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="rounded-2xl bg-[var(--surface-elevated)] ring-1 ring-line p-5">
      <h2 className="text-[11px] uppercase tracking-wider font-semibold text-ink-700">
        Confirmation email
      </h2>
      <p className="mt-1.5 text-sm text-ink-800">
        Send the booking confirmation (code, time, price) to{" "}
        <span className="font-semibold text-ink-950 break-all">{email}</span>.
      </p>

      {err && (
        <div className="mt-3 rounded-xl bg-[oklch(0.96_0.04_25)] text-[oklch(0.42_0.18_25)] text-sm font-medium px-3 py-2.5">
          {err}
        </div>
      )}
      {sentTo && (
        <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-grass-700">
          <Check className="h-4 w-4" strokeWidth={3} />
          Sent to {sentTo}
        </div>
      )}

      <div>
        <button
          type="button"
          disabled={busy}
          onClick={send}
          className="mt-3 inline-flex items-center gap-2 rounded-xl bg-white ring-1 ring-line hover:ring-ink-300 text-ink-800 font-semibold px-4 py-2.5 text-sm disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <Mail className="h-4 w-4" />
          {busy ? "Sending…" : "Resend confirmation"}
        </button>
      </div>
    </section>
  );
}
