"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from "framer-motion";
import { Check, User, ArrowRight, Repeat, AlertTriangle } from "lucide-react";
import { EASE_OUT_QUINT } from "@/app/components/motion/motion-primitives";
import { TIER_META, FREQUENCY_META } from "@/app/components/Booking/pricing";
import { STATUS_META, type Booking, type BookingStatus } from "@/lib/booking-types";

// Pipeline flow: new -> confirmed -> scheduled -> completed (drops off board).
const NEXT: Partial<Record<BookingStatus, { status: BookingStatus; label: string }>> = {
  new: { status: "confirmed", label: "Confirm" },
  confirmed: { status: "scheduled", label: "Mark scheduled" },
  scheduled: { status: "completed", label: "Mark done" },
};

const DOT: Record<string, string> = {
  grass: "bg-grass-500",
  ink: "bg-ink-500",
  amber: "bg-[oklch(0.7_0.16_70)]",
  rose: "bg-[oklch(0.6_0.18_25)]",
};

type Handlers = {
  cleaners: string[];
  reduce: boolean;
  onStatus: (id: string, status: BookingStatus) => Promise<void>;
  onAssign: (id: string, name: string) => Promise<void>;
};

export function OpsBoard({
  initial,
  cleaners,
  todayISO,
}: {
  initial: Booking[];
  cleaners: string[];
  todayISO: string;
}) {
  const [items, setItems] = useState<Booking[]>(initial);
  const [error, setError] = useState<string | null>(null);
  const reduce = useReducedMotion() ?? false;

  const cols = useMemo(() => {
    const live = (b: Booking) => b.status === "confirmed" || b.status === "scheduled";
    return {
      needs: items.filter((b) => b.status === "new"),
      today: items.filter((b) => live(b) && b.slotDate === todayISO),
      upcoming: items
        .filter((b) => live(b) && b.slotDate > todayISO)
        .sort((a, b) => a.slotDate.localeCompare(b.slotDate)),
    };
  }, [items, todayISO]);

  const onStatus = async (id: string, status: BookingStatus) => {
    setError(null);
    const prev = items;
    // Optimistic: completed/cancelled leave the board; others re-bucket.
    setItems((cur) =>
      status === "completed" || status === "cancelled"
        ? cur.filter((b) => b.id !== id)
        : cur.map((b) => (b.id === id ? { ...b, status } : b)),
    );
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({})))?.error || "Update failed");
    } catch (e) {
      setItems(prev);
      setError(e instanceof Error ? e.message : "Network error");
    }
  };

  const onAssign = async (id: string, name: string) => {
    setError(null);
    const prev = items;
    setItems((cur) => cur.map((b) => (b.id === id ? { ...b, assignedTo: name || null } : b)));
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ assignedTo: name || null }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({})))?.error || "Assign failed");
    } catch (e) {
      setItems(prev);
      setError(e instanceof Error ? e.message : "Network error");
    }
  };

  const h: Handlers = { cleaners, reduce, onStatus, onAssign };

  return (
    <div>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-4 flex items-center gap-2 rounded-xl bg-[oklch(0.96_0.04_25)] text-[oklch(0.42_0.18_25)] text-sm font-medium px-3.5 py-2.5"
          >
            <AlertTriangle className="h-4 w-4 flex-none" /> {error}
          </motion.div>
        )}
      </AnimatePresence>

      <LayoutGroup>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
          <Column title="Needs action" tone="amber" items={cols.needs} empty="You're all caught up." h={h} />
          <Column title="Today" tone="ink" items={cols.today} empty="Nothing scheduled today." h={h} />
          <Column title="Upcoming" tone="ink" items={cols.upcoming} empty="Nothing upcoming." h={h} />
        </div>
      </LayoutGroup>
    </div>
  );
}

function Column({
  title,
  tone,
  items,
  empty,
  h,
}: {
  title: string;
  tone: string;
  items: Booking[];
  empty: string;
  h: Handlers;
}) {
  return (
    <section className="rounded-2xl bg-[var(--surface-tint)]/25 ring-1 ring-line p-3 sm:p-3.5">
      <header className="flex items-center gap-2 px-1 pb-3">
        <span className={`inline-block h-2 w-2 rounded-full ${DOT[tone]}`} />
        <h2 className="font-display font-bold text-[13px] uppercase tracking-wide text-ink-950">
          {title}
        </h2>
        <span className="ml-auto inline-flex items-center rounded-full bg-ink-100 text-ink-700 text-xs font-bold px-2 py-0.5 tabular-nums">
          {items.length}
        </span>
      </header>
      <motion.div layout className="space-y-3 min-h-[3rem]">
        <AnimatePresence mode="popLayout">
          {items.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-1 py-6 text-center text-xs text-ink-500"
            >
              {empty}
            </motion.p>
          ) : (
            items.map((b) => <BookingCard key={b.id} b={b} h={h} />)
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function BookingCard({ b, h }: { b: Booking; h: Handlers }) {
  const tier = TIER_META[b.tier];
  const freq = FREQUENCY_META[b.frequency];
  const meta = STATUS_META[b.status];
  const isRecurring = b.frequency !== "onetime";
  const date = new Date(b.slotDate + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const win = { morning: "AM", midday: "Mid", afternoon: "PM" }[b.slotWindow];
  const next = NEXT[b.status];
  const [busy, setBusy] = useState(false);

  const advance = async () => {
    if (!next) return;
    setBusy(true);
    await h.onStatus(b.id, next.status);
    setBusy(false);
  };

  return (
    <motion.div
      layout
      layoutId={b.id}
      initial={h.reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={h.reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, x: 8 }}
      transition={{ duration: 0.3, ease: EASE_OUT_QUINT }}
      className="rounded-2xl bg-white ring-1 ring-line shadow-soft p-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`inline-block h-2 w-2 rounded-full ${DOT[meta.tone]}`} />
            <span className="font-mono text-[11px] font-bold text-ink-950 tabular-nums">{b.id}</span>
            {isRecurring && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-grass-500/15 text-grass-700 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5">
                <Repeat className="h-2.5 w-2.5" strokeWidth={2.8} />
                {freq.label}
              </span>
            )}
          </div>
          <div className="mt-1.5 text-sm font-semibold text-ink-950 truncate">
            {b.address}
            {b.apt ? `, ${b.apt}` : ""}
          </div>
          <div className="mt-0.5 text-[11px] text-ink-700">
            {tier.label} · {date} {win}
          </div>
        </div>
        <span className="font-display font-bold text-base text-ink-950 tabular-nums flex-none">
          ${b.priceTotal}
        </span>
      </div>

      {b.assignedTo && (
        <div className="mt-2 inline-flex items-center gap-1 rounded-lg bg-ink-50 px-2 py-1 text-[11px] font-medium text-ink-700">
          <User className="h-3 w-3" /> {b.assignedTo}
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-line pt-3">
        {next && (
          <button
            type="button"
            disabled={busy}
            onClick={advance}
            className="inline-flex items-center gap-1.5 rounded-xl bg-ink-950 hover:bg-ink-800 text-[var(--surface)] text-xs font-semibold px-3 py-1.5 disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {b.status === "scheduled" ? (
              <Check className="h-3.5 w-3.5" />
            ) : null}
            {next.label}
            {b.status !== "scheduled" && <ArrowRight className="h-3.5 w-3.5" />}
          </button>
        )}
        {b.status === "new" && (
          <label className="inline-flex items-center gap-1 rounded-xl bg-white ring-1 ring-line px-2 py-1.5 text-xs">
            <User className="h-3 w-3 text-ink-600" />
            <select
              defaultValue={b.assignedTo ?? ""}
              onChange={(e) => h.onAssign(b.id, e.target.value)}
              className="max-w-[6.5rem] bg-transparent text-xs text-ink-900 outline-none cursor-pointer"
              aria-label="Assign cleaner"
            >
              <option value="">Assign…</option>
              {h.cleaners.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        )}
        <Link
          href={`/admin/${b.id}`}
          className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-ink-700 hover:text-ink-950 cursor-pointer"
        >
          Open <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </motion.div>
  );
}
