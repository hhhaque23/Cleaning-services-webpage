"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarClock, Clock, Check, RefreshCw } from "lucide-react";
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

const pad = (n: number) => String(n).padStart(2, "0");
// Local calendar date key — avoids the UTC off-by-one of toISOString().slice(0,10).
const ymd = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

function nextDates(n: number) {
  const out: Date[] = [];
  const d = new Date();
  for (let i = 0; i < n; i++) {
    out.push(new Date(d.getFullYear(), d.getMonth(), d.getDate() + i));
  }
  return out;
}

type WinAvail = { open: number; booked: number; capacity: number };
type DayAvail = Record<Slot["window"], WinAvail>;

export function StepSchedule({ selected, onSelect }: Props) {
  const dates = useMemo(() => nextDates(7), []);
  const reduce = useReducedMotion();
  const dayShort = (d: Date) => d.toLocaleDateString("en-US", { weekday: "short" });
  const dayNum = (d: Date) => d.getDate();
  const monthShort = (d: Date) => d.toLocaleDateString("en-US", { month: "short" });

  const [byDate, setByDate] = useState<Record<string, DayAvail>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`/api/availability?start=${ymd(new Date())}&days=7`);
      if (!res.ok) throw new Error("bad");
      const data = await res.json();
      const map: Record<string, DayAvail> = {};
      for (const day of data.days as { date: string; windows: DayAvail }[]) {
        map[day.date] = day.windows;
      }
      setByDate(map);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const ready = !loading && !error;
  const openFor = (dateISO: string, win: Slot["window"]): number =>
    byDate[dateISO]?.[win]?.open ?? 0;
  const dayOpen = (dateISO: string): number =>
    WINDOWS.reduce((sum, w) => sum + openFor(dateISO, w.id), 0);
  const firstOpen = (
    dateISO: string,
    preferred?: Slot["window"],
  ): Slot["window"] | null => {
    if (preferred && openFor(dateISO, preferred) > 0) return preferred;
    for (const w of WINDOWS) if (openFor(dateISO, w.id) > 0) return w.id;
    return null;
  };

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
          <span className="font-semibold text-ink-950">Pick your slot.</span> Choose a day and time
          window that works, and we&apos;ll confirm your booking by email.
        </span>
      </div>

      {error && (
        <div className="flex items-center justify-between gap-3 rounded-xl bg-[oklch(0.96_0.04_25)] text-[oklch(0.42_0.18_25)] text-sm font-medium px-3.5 py-3">
          <span>Couldn&apos;t load live availability.</span>
          <button
            type="button"
            onClick={load}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white/70 hover:bg-white px-2.5 py-1.5 font-semibold cursor-pointer transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Try again
          </button>
        </div>
      )}

      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-ink-700/80 mb-3 flex items-center gap-2">
          <span>Pick a date</span>
          {loading && (
            <span className="normal-case tracking-normal font-medium text-ink-700/50">
              · checking availability…
            </span>
          )}
        </div>
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.04 } } }}
          className="grid grid-cols-4 sm:grid-cols-7 gap-2"
        >
          {dates.map((d, i) => {
            const iso = ymd(d);
            const active = selected?.dateISO === iso;
            const isToday = i === 0;
            const full = ready && dayOpen(iso) === 0;
            const low = ready && !full && dayOpen(iso) <= 2;
            const disabled = !ready || full;
            return (
              <motion.button
                key={iso}
                type="button"
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE_OUT_QUINT } },
                }}
                whileHover={reduce || disabled ? undefined : { y: -2 }}
                whileTap={reduce || disabled ? undefined : { scale: 0.97 }}
                disabled={disabled}
                onClick={() => {
                  const win = firstOpen(iso, selected?.window);
                  if (win) onSelect({ dateISO: iso, window: win });
                }}
                className={`relative rounded-2xl px-2 py-3 text-center transition-all ${
                  disabled ? "cursor-not-allowed" : "cursor-pointer"
                } ${
                  active
                    ? "bg-ink-950 text-white shadow-lift"
                    : full
                    ? "bg-[var(--surface)] border border-line text-ink-700/50"
                    : "bg-[var(--surface)] border border-line text-ink-900 hover:border-ink-500"
                } ${loading ? "animate-pulse" : ""}`}
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
                    active ? "text-ink-200/70" : full ? "text-red-600 font-bold" : "text-ink-700/60"
                  }`}
                >
                  {full ? "Full" : monthShort(d)}
                </div>
                {!active && (
                  <span className="absolute top-1.5 right-1.5 inline-flex h-1.5 w-1.5" aria-hidden>
                    {ready && !full && (
                      <span
                        className={`absolute inset-0 rounded-full ${
                          low ? "bg-amber-500" : "bg-grass-500"
                        } animate-pulse-ring`}
                      />
                    )}
                    <span
                      className={`relative h-1.5 w-1.5 rounded-full ${
                        !ready ? "bg-ink-300" : full ? "bg-red-500" : low ? "bg-amber-500" : "bg-grass-500"
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
        {selected?.dateISO && ready && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE_OUT_QUINT }}
          >
            <div className="text-xs font-semibold uppercase tracking-wider text-ink-700/80 mb-3">
              Pick a window
            </div>
            {dayOpen(selected.dateISO) === 0 ? (
              <div className="rounded-xl bg-[oklch(0.97_0.02_60)] ring-1 ring-[oklch(0.85_0.05_60)] text-ink-800 text-sm px-3.5 py-3">
                This day is fully booked — pick another date.
              </div>
            ) : (
              <motion.div
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.08 } } }}
                className="grid sm:grid-cols-3 gap-3"
              >
                {WINDOWS.map((w) => {
                  const left = openFor(selected.dateISO, w.id);
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
                      whileTap={reduce || disabled ? undefined : { scale: 0.98 }}
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
                            disabled ? "text-red-600" : left <= 2 ? "text-amber-600" : "text-grass-700"
                          }`}
                        >
                          {disabled ? "Booked out" : left === 1 ? "1 left" : `${left} left`}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
