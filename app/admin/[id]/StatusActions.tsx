"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, X } from "lucide-react";
import { STATUS_META, type BookingStatus } from "@/lib/booking-types";

const NEXT_STEP: Partial<Record<BookingStatus, BookingStatus>> = {
  new: "confirmed",
  confirmed: "scheduled",
  scheduled: "completed",
};

type Props = { id: string; current: BookingStatus };

export function StatusActions({ id, current }: Props) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [busy, setBusy] = useState<BookingStatus | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function update(status: BookingStatus) {
    setErr(null);
    setBusy(status);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Update failed");
      }
      start(() => router.refresh());
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Network error");
    } finally {
      setBusy(null);
    }
  }

  const isTerminal = current === "completed" || current === "cancelled";
  const next = NEXT_STEP[current];

  return (
    <div>
      <ol className="flex items-center justify-between gap-2 mb-5">
        {(["new", "confirmed", "scheduled", "completed"] as BookingStatus[]).map((s, i) => {
          const order = ["new", "confirmed", "scheduled", "completed"];
          const passed = order.indexOf(current) > i || current === s;
          const isCurrent = current === s;
          return (
            <li key={s} className="flex-1 min-w-0">
              <div
                className={`h-1.5 rounded-full transition-colors ${
                  passed ? (current === "cancelled" ? "bg-ink-300" : "bg-grass-500") : "bg-ink-200"
                }`}
              />
              <div
                className={`mt-1.5 text-[10px] font-semibold uppercase tracking-wider truncate ${
                  isCurrent
                    ? "text-ink-950"
                    : passed
                    ? "text-grass-700"
                    : "text-ink-faint"
                }`}
              >
                {STATUS_META[s].label}
              </div>
            </li>
          );
        })}
      </ol>

      {err && (
        <div className="mb-3 rounded-xl bg-[oklch(0.96_0.04_25)] text-[oklch(0.42_0.18_25)] text-sm font-medium px-3 py-2.5">
          {err}
        </div>
      )}

      {isTerminal ? (
        <div className="text-sm text-ink-700">
          {current === "completed"
            ? "This booking is complete. The customer can leave a review."
            : "This booking was cancelled."}
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {next && (
            <button
              type="button"
              disabled={pending || busy !== null}
              onClick={() => update(next)}
              className="inline-flex items-center justify-between gap-2 rounded-2xl bg-ink-950 hover:bg-ink-800 text-[var(--surface)] font-semibold px-5 py-3.5 text-sm disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <span className="inline-flex items-center gap-2">
                <Check className="h-4 w-4" />
                Mark as {STATUS_META[next].label.toLowerCase()}
              </span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            disabled={pending || busy !== null}
            onClick={() => update("cancelled")}
            className="inline-flex items-center justify-between gap-2 rounded-2xl bg-[var(--surface-elevated)] hover:bg-white ring-1 ring-line hover:ring-ink-300 text-ink-800 font-semibold px-5 py-3.5 text-sm disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <span className="inline-flex items-center gap-2">
              <X className="h-4 w-4" />
              Cancel this booking
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
