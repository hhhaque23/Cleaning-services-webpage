"use client";

import { useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarClock, Clock, Check } from "lucide-react";
import { EASE_OUT_QUINT } from "../motion/motion-primitives";

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
  const map: Record<Slot["window"], number[]> = {
    morning: [1, 3, 2, 4, 3, 5, 4],
    midday: [2, 2, 4, 3, 5, 4, 6],
    afternoon: [0, 4, 5, 5, 6, 5, 7],
  };
  return map[win][dateIdx] ?? 3;
}

// When the user picks a date, prefer their previously-selected window if
// it still has open slots for the new date. Otherwise fall back to the
// first window with open slots so we never write a fully-booked slot into
// state (which would let canAdvance() pass on a logically invalid booking).
function firstAvailableWindow(
  dateIdx: number,
  preferred: Slot["window"] | undefined,
): Slot["window"] {
  if (preferred && availabilityFor(dateIdx, preferred) > 0) return preferred;
  for (const w of WINDOWS) {
    if (availabilityFor(dateIdx, w.id) > 0) return w.id;
  }
  return WINDOWS[0].id;
}

export function StepSchedule({ selected, onSelect }: Props) {
  const dates = useMemo(() => nextDates(7), []);
  const reduce = useReducedMotion();
  const dayShort = (d: Date) => d.toLocaleDateString("en-US", { weekday: "short" });
  const dayNum = (d: Date) => d.getDate();
  const monthShort = (d: Date) => d.toLocaleDateString("en-US", { month: "short" });

  const selectedDateIdx = dates.findIndex(
    (d) => d.toISOString().slice(0, 10) === selected?.dateISO,
  );

  return (
    <div className="space-y-7">
      <div className="flex items-center gap-2.5 text-sm text-ink-800">
        <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-grass-500/15 text-grass-700 flex-none">
          <CalendarClock className="h-[18px] w-[18px]" />
          {!reduce && (
            <motion.span
              animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-xl ring-2 ring-grass-500"
            />
          )}
        </span>
        <span>
          <span className="font-semibold text-ink-950">Live availability.</span> We block slots in
          real time. What you see is what&apos;s open.
        </span>
      </div>

      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-ink-700/80 mb-3">
          Pick a date
        </div>
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.04 } } }}
          className="grid grid-cols-4 sm:grid-cols-7 gap-2"
        >
          {dates.map((d, i) => {
            const iso = d.toISOString().slice(0, 10);
            const active = selected?.dateISO === iso;
            const isToday = i === 0;
            return (
              <motion.button
                key={iso}
                type="button"
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE_OUT_QUINT } },
                }}
                whileHover={reduce ? undefined : { y: -2 }}
                whileTap={reduce ? undefined : { scale: 0.97 }}
                onClick={() =>
                  onSelect({
                    dateISO: iso,
                    window: firstAvailableWindow(i, selected?.window),
                  })
                }
                className={`relative rounded-2xl px-2 py-3 text-center transition-all cursor-pointer ${
                  active
                    ? "bg-ink-950 text-white shadow-lift"
                    : "bg-[var(--surface)] border border-line text-ink-900 hover:border-ink-500"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="date-active"
                    className="absolute inset-0 -z-10 rounded-2xl bg-ink-950"
                    transition={{ type: "spring", stiffness: 280, damping: 24 }}
                  />
                )}
                <div
                  className={`relative text-[11px] font-semibold uppercase tracking-wide ${
                    active ? "text-grass-400" : "text-ink-700/80"
                  }`}
                >
                  {isToday ? "Today" : dayShort(d)}
                </div>
                <div className="relative font-display font-extrabold text-xl tabular-nums">
                  {dayNum(d)}
                </div>
                <div
                  className={`relative text-[10px] uppercase tracking-wider ${
                    active ? "text-ink-200/70" : "text-ink-700/60"
                  }`}
                >
                  {monthShort(d)}
                </div>
                {/* Availability dot — only for non-active dates */}
                {!active && (
                  <span
                    className="absolute top-1.5 right-1.5 inline-flex h-1.5 w-1.5"
                    aria-hidden
                  >
                    <span
                      className={`absolute inset-0 rounded-full ${
                        i === 0 ? "bg-amber-500" : "bg-grass-500"
                      } animate-pulse-ring`}
                    />
                    <span
                      className={`relative h-1.5 w-1.5 rounded-full ${
                        i === 0 ? "bg-amber-500" : "bg-grass-500"
                      }`}
                    />
                  </span>
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      <AnimatePresence>
        {selected?.dateISO && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE_OUT_QUINT }}
          >
            <div className="text-xs font-semibold uppercase tracking-wider text-ink-700/80 mb-3">
              Pick a window
            </div>
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
              className="grid sm:grid-cols-3 gap-3"
            >
              {WINDOWS.map((w) => {
                const left = availabilityFor(Math.max(0, selectedDateIdx), w.id);
                const active = selected?.window === w.id;
                const disabled = left === 0;
                return (
                  <motion.button
                    key={w.id}
                    type="button"
                    variants={{
                      hidden: { opacity: 0, y: 14 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT_QUINT } },
                    }}
                    whileTap={reduce ? undefined : { scale: 0.98 }}
                    whileHover={reduce || disabled ? undefined : { y: -2 }}
                    disabled={disabled}
                    onClick={() =>
                      selected?.dateISO &&
                      onSelect({ dateISO: selected.dateISO, window: w.id })
                    }
                    className={`relative rounded-2xl px-4 py-4 text-left transition-all cursor-pointer ${
                      active
                        ? "bg-grass-500/12 ring-2 ring-grass-500"
                        : "bg-[var(--surface)] border border-line hover:border-grass-500/40"
                    } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`relative inline-flex h-9 w-9 items-center justify-center rounded-xl transition-colors overflow-hidden ${
                            active ? "bg-grass-500 text-white" : "bg-ink-100 text-ink-700"
                          }`}
                        >
                          <AnimatePresence mode="wait" initial={false}>
                            {active ? (
                              <motion.span
                                key="check"
                                initial={{ scale: 0, rotate: -30 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0 }}
                                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                                className="flex items-center justify-center"
                              >
                                <Check className="h-[18px] w-[18px]" strokeWidth={3} />
                              </motion.span>
                            ) : (
                              <motion.span
                                key="clock"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="flex items-center justify-center"
                              >
                                <Clock className="h-[18px] w-[18px]" />
                              </motion.span>
                            )}
                          </AnimatePresence>
                          {active && !reduce && (
                            <motion.span
                              key={`ripple-${selected?.dateISO}-${w.id}`}
                              initial={{ scale: 0.6, opacity: 0.8 }}
                              animate={{ scale: 2.4, opacity: 0 }}
                              transition={{ duration: 0.9, ease: "easeOut" }}
                              className="absolute inset-0 rounded-xl bg-grass-500"
                            />
                          )}
                        </span>
                        <div className="leading-tight">
                          <div className="text-sm font-semibold text-ink-950">{w.label}</div>
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
                        {disabled ? "Booked" : left === 1 ? "1 left" : `${left} left`}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
