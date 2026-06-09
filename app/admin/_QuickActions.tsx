"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, User } from "lucide-react";

/**
 * Inline quick-actions for a NEW booking on the dashboard: confirm it and assign
 * a cleaner without opening the detail page. Reuses the same PATCH/PUT endpoints
 * as StatusActions / ManageBooking.
 */
export function QuickActions({
  id,
  cleaners,
  assignedTo,
}: {
  id: string;
  cleaners: string[];
  assignedTo: string | null;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const disabled = busy || pending;

  async function confirm() {
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status: "confirmed" }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Couldn't confirm");
      }
      start(() => router.refresh());
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Network error");
    } finally {
      setBusy(false);
    }
  }

  async function assign(name: string) {
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ assignedTo: name || null }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Couldn't assign");
      }
      start(() => router.refresh());
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Network error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-line pt-3">
      <button
        type="button"
        onClick={confirm}
        disabled={disabled}
        className="inline-flex items-center gap-1.5 rounded-xl bg-ink-950 hover:bg-ink-800 text-[var(--surface)] text-sm font-semibold px-3.5 py-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <Check className="h-4 w-4" /> Confirm
      </button>
      <label className="inline-flex items-center gap-1.5 rounded-xl bg-white ring-1 ring-line px-2.5 py-1.5 text-sm">
        <User className="h-3.5 w-3.5 text-ink-600" />
        <select
          defaultValue={assignedTo ?? ""}
          disabled={disabled}
          onChange={(e) => assign(e.target.value)}
          className="bg-transparent text-sm text-ink-900 outline-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          aria-label="Assign cleaner"
        >
          <option value="">Assign cleaner…</option>
          {cleaners.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
      {err && <span className="text-xs font-medium text-red-600">{err}</span>}
    </div>
  );
}
