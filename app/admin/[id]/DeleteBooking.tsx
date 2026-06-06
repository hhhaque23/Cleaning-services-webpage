"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2, AlertTriangle } from "lucide-react";

type Props = { id: string };

export function DeleteBooking({ id }: Props) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [armed, setArmed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function remove() {
    setErr(null);
    setBusy(true);
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Delete failed");
      }
      // The row is gone — leave the now-dead detail page for the dashboard.
      start(() => {
        router.push("/admin");
        router.refresh();
      });
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Network error");
      setBusy(false);
    }
  }

  return (
    <section className="rounded-2xl bg-[var(--surface-elevated)] ring-1 ring-line p-5">
      <h2 className="text-[11px] uppercase tracking-wider font-semibold text-ink-700">
        Danger zone
      </h2>

      {err && (
        <div className="mt-3 rounded-xl bg-[oklch(0.96_0.04_25)] text-[oklch(0.42_0.18_25)] text-sm font-medium px-3 py-2.5">
          {err}
        </div>
      )}

      {!armed ? (
        <button
          type="button"
          onClick={() => setArmed(true)}
          className="mt-3 inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[oklch(0.5_0.18_25)] hover:bg-[oklch(0.96_0.04_25)] transition-colors cursor-pointer"
        >
          <Trash2 className="h-4 w-4" />
          Delete booking
        </button>
      ) : (
        <div className="mt-3">
          <p className="flex items-start gap-2 text-sm text-ink-800">
            <AlertTriangle className="h-4 w-4 mt-0.5 flex-none text-[oklch(0.55_0.18_25)]" />
            This permanently deletes the booking. It can&apos;t be undone.
          </p>
          <div className="mt-3 flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              disabled={busy || pending}
              onClick={remove}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[oklch(0.55_0.2_25)] hover:bg-[oklch(0.5_0.2_25)] text-white font-semibold px-4 py-2.5 text-sm disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
              {busy || pending ? "Deleting…" : "Delete permanently"}
            </button>
            <button
              type="button"
              disabled={busy || pending}
              onClick={() => setArmed(false)}
              className="inline-flex items-center justify-center rounded-xl bg-white ring-1 ring-line hover:ring-ink-300 text-ink-800 font-semibold px-4 py-2.5 text-sm disabled:opacity-60 transition-colors cursor-pointer"
            >
              Keep booking
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
