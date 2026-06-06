"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { STATUS_META, type BookingStatus } from "@/lib/booking-types";

type Win = "morning" | "midday" | "afternoon";

type CalJob = {
  id: string;
  address: string;
  apt: string | null;
  tierLabel: string;
  freqLabel: string;
  priceTotal: number;
  status: BookingStatus;
  assignedTo: string | null;
  bedrooms: number;
  bathrooms: number;
};
type Cell = { window: Win; jobs: CalJob[]; booked: number; open: number };
type Day = {
  date: string;
  weekday: string;
  dayNum: number;
  isToday: boolean;
  cells: Cell[];
};

const TONE_DOT: Record<string, string> = {
  grass: "bg-grass-500",
  ink: "bg-ink-500",
  amber: "bg-[oklch(0.7_0.16_70)]",
  rose: "bg-[oklch(0.6_0.18_25)]",
};
const TONE_BADGE: Record<string, string> = {
  grass: "bg-grass-500/15 text-grass-700",
  ink: "bg-ink-100 text-ink-900",
  amber: "bg-[oklch(0.95_0.08_75)] text-[oklch(0.42_0.16_70)]",
  rose: "bg-[oklch(0.95_0.05_25)] text-[oklch(0.45_0.18_25)]",
};

const COLS = "84px repeat(7, minmax(0, 1fr))";

export function CalendarGrid({
  week,
  capacity,
  windows,
  monthLabel,
  prevWeek,
  nextWeek,
  thisWeek,
}: {
  week: Day[];
  capacity: number;
  windows: { id: Win; label: string; range: string }[];
  monthLabel: string;
  prevWeek: string;
  nextWeek: string;
  thisWeek: string;
}) {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 py-10">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-ink-600 font-semibold">
            Calendar
          </div>
          <h1 className="mt-2 font-display font-extrabold text-2xl sm:text-3xl text-ink-950 tracking-tight">
            {monthLabel}
          </h1>
          <p className="mt-1 text-sm text-ink-700">
            {capacity} {capacity === 1 ? "cleaner" : "cleaners"} · up to {capacity} per window.{" "}
            <Link
              href="/admin/settings"
              className="underline underline-offset-4 hover:text-ink-950"
            >
              Manage cleaners
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/calendar?week=${prevWeek}`}
            aria-label="Previous week"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white ring-1 ring-line hover:ring-ink-300 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link
            href={`/admin/calendar?week=${thisWeek}`}
            className="inline-flex items-center rounded-xl bg-white ring-1 ring-line hover:ring-ink-300 px-3 py-2 text-sm font-semibold cursor-pointer"
          >
            Today
          </Link>
          <Link
            href={`/admin/calendar?week=${nextWeek}`}
            aria-label="Next week"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white ring-1 ring-line hover:ring-ink-300 cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="mt-8 overflow-x-auto pb-2">
        <div className="min-w-[920px] rounded-2xl bg-white ring-1 ring-line overflow-hidden">
          {/* Day header */}
          <div className="grid" style={{ gridTemplateColumns: COLS }}>
            <div />
            {week.map((d) => (
              <div key={d.date} className="px-2 py-3 text-center border-l border-line">
                <div
                  className={`text-[11px] font-semibold uppercase tracking-wider ${
                    d.isToday ? "text-grass-700" : "text-ink-600"
                  }`}
                >
                  {d.weekday}
                </div>
                <div
                  className={`font-display font-extrabold text-xl tabular-nums ${
                    d.isToday ? "text-grass-700" : "text-ink-950"
                  }`}
                >
                  {d.dayNum}
                </div>
              </div>
            ))}
          </div>

          {windows.map((win, wi) => (
            <div
              key={win.id}
              className="grid border-t border-line"
              style={{ gridTemplateColumns: COLS }}
            >
              <div className="px-2 py-3 bg-[var(--surface)]">
                <div className="text-xs font-bold text-ink-950">{win.label}</div>
                <div className="text-[10px] text-ink-600">{win.range}</div>
              </div>
              {week.map((d) => {
                const cell = d.cells[wi];
                const full = cell.open === 0;
                return (
                  <div
                    key={d.date + win.id}
                    className={`relative min-h-[90px] border-l border-line p-1.5 ${
                      d.isToday ? "bg-grass-500/[0.04]" : ""
                    }`}
                  >
                    <div
                      className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                        full
                          ? "bg-[oklch(0.95_0.05_25)] text-[oklch(0.45_0.18_25)]"
                          : cell.booked > 0
                          ? "bg-ink-100 text-ink-700"
                          : "bg-grass-500/15 text-grass-700"
                      }`}
                    >
                      {full ? "Booked out" : cell.booked > 0 ? `${cell.booked}/${capacity}` : "Open"}
                    </div>

                    <div className="mt-1 space-y-1">
                      {cell.jobs.map((j) => {
                        const meta = STATUS_META[j.status];
                        const cancelled = j.status === "cancelled";
                        const key = `${j.id}-${d.date}-${win.id}`;
                        return (
                          <div
                            key={key}
                            className="relative"
                            onMouseEnter={() => setHover(key)}
                            onMouseLeave={() => setHover((h) => (h === key ? null : h))}
                          >
                            <Link
                              href={`/admin/${j.id}`}
                              onFocus={() => setHover(key)}
                              onBlur={() => setHover((h) => (h === key ? null : h))}
                              className={`flex items-center gap-1.5 rounded-lg px-1.5 py-1 text-[11px] ring-1 transition-colors cursor-pointer ${
                                cancelled
                                  ? "opacity-50 ring-line bg-white line-through"
                                  : "ring-line bg-white hover:ring-ink-300"
                              }`}
                            >
                              <span
                                className={`inline-block h-1.5 w-1.5 flex-none rounded-full ${
                                  TONE_DOT[meta.tone]
                                }`}
                              />
                              <span className="font-mono font-bold text-ink-950">
                                {j.id.replace("SP-", "")}
                              </span>
                              <span className="text-ink-600 truncate">{j.address}</span>
                            </Link>

                            <AnimatePresence>
                              {hover === key && (
                                <motion.div
                                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                                  transition={{ duration: 0.16 }}
                                  className="absolute z-30 left-0 top-full mt-1 w-64 rounded-2xl bg-white ring-1 ring-ink-200 shadow-lift p-3.5 text-left"
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="font-mono text-xs font-bold text-ink-950">
                                      {j.id}
                                    </span>
                                    <span
                                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                                        TONE_BADGE[meta.tone]
                                      }`}
                                    >
                                      {meta.label}
                                    </span>
                                  </div>
                                  <div className="mt-2 text-sm font-semibold text-ink-950">
                                    {j.address}
                                    {j.apt ? `, ${j.apt}` : ""}
                                  </div>
                                  <div className="mt-0.5 text-xs text-ink-700">
                                    {j.tierLabel} · {j.bedrooms} bd · {j.bathrooms} ba · {j.freqLabel}
                                  </div>
                                  <div className="mt-2 flex items-center justify-between">
                                    <span className="font-display font-bold text-ink-950">
                                      ${j.priceTotal}
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-xs text-ink-700">
                                      <User className="h-3 w-3" />
                                      {j.assignedTo || "Unassigned"}
                                    </span>
                                  </div>
                                  <div className="mt-3 flex items-center gap-2">
                                    <Link
                                      href={`/admin/${j.id}`}
                                      className="flex-1 inline-flex items-center justify-center rounded-lg bg-ink-950 text-white text-xs font-semibold px-2 py-1.5 cursor-pointer hover:bg-ink-800"
                                    >
                                      Open booking
                                    </Link>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
