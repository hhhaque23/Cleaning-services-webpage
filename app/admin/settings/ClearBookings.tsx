"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, AlertTriangle, Check } from "lucide-react";

const CONFIRM = "DELETE ALL";

// Danger zone: wipe every booking. Strong type-to-confirm guard because this is
// irreversible and especially risky once real bookings exist.
export function ClearBookings({ count }: { count: number }) {
  const router = useRouter();
  const [armed, setArmed] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [cleared, setCleared] = useState(false);

  // After a successful wipe the slate is empty, even if the server-rendered prop
  // is briefly stale before the refresh lands.
  const effectiveCount = cleared ? 0 : count;

  async function clearAll() {
    setErr(null);
    setBusy(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ confirm: "DELETE_ALL" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Delete failed");
      setCleared(true);
      setArmed(false);
      setInput("");
      // Invalidate cached RSC for the other admin pages so they reflect the wipe.
      router.refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Network error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mt-8 rounded-2xl bg-[var(--surface-elevated)] ring-1 ring-line p-5 sm:p-6">
      <h2 className="text-[11px] uppercase tracking-wider font-semibold text-ink-700">
        Danger zone
      </h2>
      <p className="mt-2 text-sm text-ink-800 leading-relaxed max-w-lg">
        Permanently delete every booking. Use this to clear out test data before you go live — it
        can&apos;t be undone.
      </p>

      {err && (
        <div className="mt-3 rounded-xl bg-[oklch(0.96_0.04_25)] text-[oklch(0.42_0.18_25)] text-sm font-medium px-3 py-2.5">
          {err}
        </div>
      )}

      {armed ? (
        <div className="mt-4 max-w-sm">
          <p className="flex items-start gap-2 text-sm text-ink-800">
            <AlertTriangle className="h-4 w-4 mt-0.5 flex-none text-[oklch(0.55_0.18_25)]" />
            <span>
              This permanently deletes all {effectiveCount} booking{effectiveCount === 1 ? "" : "s"}.
              Type <span className="font-mono font-bold text-ink-950">{CONFIRM}</span> to confirm.
            </span>
          </p>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={CONFIRM}
            autoFocus
            className="mt-3 w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-950 placeholder:text-ink-700/40 focus:border-[oklch(0.6_0.18_25)] focus:ring-2 focus:ring-[oklch(0.6_0.18_25)]/20 outline-none transition-colors"
          />
          <div className="mt-3 flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              disabled={input !== CONFIRM || busy}
              onClick={clearAll}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[oklch(0.55_0.2_25)] hover:bg-[oklch(0.5_0.2_25)] text-white font-semibold px-4 py-2.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
              {busy ? "Deleting…" : "Permanently delete all"}
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => {
                setArmed(false);
                setInput("");
              }}
              className="inline-flex items-center justify-center rounded-xl bg-white ring-1 ring-line hover:ring-ink-300 text-ink-800 font-semibold px-4 py-2.5 text-sm disabled:opacity-60 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : effectiveCount === 0 ? (
        <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-grass-700">
          <Check className="h-4 w-4" strokeWidth={3} />
          {cleared ? "Done — all bookings deleted." : "No bookings yet — you're all clear."}
        </div>
      ) : (
        <button
          type="button"
          disabled={busy}
          onClick={() => setArmed(true)}
          className="mt-4 inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[oklch(0.5_0.18_25)] hover:bg-[oklch(0.96_0.04_25)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <Trash2 className="h-4 w-4" />
          Delete all bookings ({effectiveCount})
        </button>
      )}
    </section>
  );
}
