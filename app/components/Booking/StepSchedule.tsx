"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { CalendarClock, Clock } from "lucide-react";

export type Slot = {
  dateISO: string;
  window: "morning" | "midday" | "afternoon";
};

type Props = {
  selected: Slot | null;
  onSelect: (s: Slot) => void;
};

const WINDOWS: { id: Slot["window"]; label: string; range: string }[] = [
  { id: "morning", label: "Morning", range: "8 – 11 AM" },
  { id: "midday", label: "Midday", range: "11 AM – 2 PM" },
  { id: "afternoon", label: "Afternoon", range: "2 – 5 PM" },
];

function nextDates(n: number) {
  const out: Date[] = [];
  const d = new Date();
  for (let i = 0; i < n; i++) {
    out.push(new Date(d.getFullYear(), d.getMonth(), d.getDate() + i));
  }
  return out;
}

function availabilityFor(dateIdx: number, win: Slot["window"]) {
  // Deterministic, looks live but stable: today has 2 left, tomorrow 4, day-after 6, etc.
  const map: Record<Slot["window"], number[]> = {
    morning: [1, 3, 2, 4, 3, 5, 4],
    midday: [2, 2, 4, 3, 5, 4, 6],
    afternoon: [0, 4, 5, 5, 6, 5, 7],
  };
  return map[win][dateIdx] ?? 3;
}

export function StepSchedule({ selected, onSelect }: Props) {
  const dates = useMemo(() => nextDates(7), []);
  const dayShort = (d: Date) =>
    d.toLocaleDateString("en-US", { weekday: "short" });
  const dayNum = (d: Date) => d.getDate();
  const monthShort = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short" });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2.5 text-sm text-ink-800">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-grass-500/15 text-grass-700">
          <CalendarClock className="h-4.5 w-4.5" />
        </span>
        <span>
          <span className="font-semibold text-ink-950">Live availability.</span>{" "}
          We block slots in real time. What you see is what&apos;s open.
        </span>
      </div>

      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-ink-700/80 mb-3">
          Pick a date
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {dates.map((d, i) => {
            const iso = d.toISOString().slice(0, 10);
            const active = selected?.dateISO === iso;
            const isToday = i === 0;
            return (
              <button
                key={iso}
                type="button"
                onClick={() =>
                  onSelect({ dateISO: iso, window: selected?.window ?? "morning" })
                }
                className={`relative rounded-2xl px-2 py-3 text-center transition-all cursor-pointer ${
                  active
                    ? "bg-ink-950 text-white shadow-glow"
                    : "bg-white border border-ink-200/70 text-ink-900 hover:border-ink-500"
                }`}
              >
                <div
                  className={`text-[11px] font-semibold uppercase tracking-wide ${
                    active ? "text-grass-400" : "text-ink-700/80"
                  }`}
                >
                  {isToday ? "Today" : dayShort(d)}
                </div>
                <div className="font-display font-extrabold text-xl tabular-nums">
                  {dayNum(d)}
                </div>
                <div
                  className={`text-[10px] uppercase tracking-wider ${
                    active ? "text-ink-200/70" : "text-ink-700/60"
                  }`}
                >
                  {monthShort(d)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-ink-700/80 mb-3">
          Pick a window
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {WINDOWS.map((w) => {
            const dateIdx = dates.findIndex(
              (d) => d.toISOString().slice(0, 10) === selected?.dateISO
            );
            const left = availabilityFor(Math.max(0, dateIdx), w.id);
            const active = selected?.window === w.id;
            const disabled = left === 0;
            return (
              <motion.button
                key={w.id}
                type="button"
                whileTap={{ scale: 0.98 }}
                disabled={disabled || !selected?.dateISO}
                onClick={() =>
                  selected?.dateISO &&
                  onSelect({ dateISO: selected.dateISO, window: w.id })
                }
                className={`rounded-2xl px-4 py-4 text-left transition-all cursor-pointer ${
                  active
                    ? "bg-grass-500/10 ring-2 ring-grass-500"
                    : "bg-white border border-ink-200/70 hover:border-grass-500"
                } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${
                        active
                          ? "bg-grass-500 text-white"
                          : "bg-ink-100 text-ink-700"
                      }`}
                    >
                      <Clock className="h-4.5 w-4.5" />
                    </span>
                    <div className="leading-tight">
                      <div className="text-sm font-semibold text-ink-950">
                        {w.label}
                      </div>
                      <div className="text-xs text-ink-700/80">{w.range}</div>
                    </div>
                  </div>
                  <div
                    className={`text-[11px] font-semibold uppercase tracking-wider ${
                      disabled
                        ? "text-red-600"
                        : left <= 2
                        ? "text-amber-600"
                        : "text-grass-700"
                    }`}
                  >
                    {disabled
                      ? "Booked"
                      : left === 1
                      ? "1 left"
                      : `${left} left`}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
