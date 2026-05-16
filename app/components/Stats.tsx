"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Star, TrendingUp, ShieldCheck, Zap } from "lucide-react";
import { PHOTOS } from "@/lib/unsplash";
import { CountUp } from "./motion/CountUp";

const RECENT_BOOKINGS = [
  { city: "Troy", tier: "Deep clean", min: 2 },
  { city: "Bloomfield Hills", tier: "Standard", min: 4 },
  { city: "Rochester", tier: "Move-out", min: 7 },
  { city: "Birmingham", tier: "Biweekly", min: 11 },
  { city: "Auburn Hills", tier: "Standard", min: 16 },
];

export function Stats() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.78_0.16_145/0.1)] blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-0 right-0 h-[24rem] w-[24rem] rounded-full bg-[oklch(0.65_0.13_220/0.08)] blur-3xl pointer-events-none"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <div className="text-[11px] uppercase tracking-[0.14em] text-ink-600 font-semibold">
            Since 2019, across metro Detroit
          </div>
          <h2 className="mt-3 font-display font-extrabold text-display-1 text-balance text-ink-950 leading-[1.05]">
            Numbers from a team that{" "}
            <span className="italic font-medium text-ink-700">mostly</span> hasn&apos;t changed
            since year one.
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[auto_auto] gap-4 sm:gap-5">
          <BigPhotoTile />
          <BigCounterTile />
          <RatingTile />
          <SpeedTile />
          <LiveTickerTile />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-ink-600 border-t border-line pt-6"
        >
          <span className="inline-flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-grass-600" />
            <span className="font-semibold text-ink-950">
              <CountUp to={3.4} decimals={1} duration={1.2} suffix="x" />
            </span>
            <span>more reviews than the next local competitor</span>
          </span>
          <span className="text-line-strong">·</span>
          <span>
            Featured in{" "}
            <span className="text-ink-950 font-semibold">Hour Detroit</span>,{" "}
            <span className="text-ink-950 font-semibold">Crain&apos;s</span>, and{" "}
            <span className="text-ink-950 font-semibold">Rochester Patch</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}

function TileShell({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
      className={`relative rounded-[1.5rem] border border-line-strong/40 bg-[var(--surface-elevated)] shadow-soft hover:shadow-card transition-shadow ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}

function BigPhotoTile() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-2 rounded-[1.5rem] overflow-hidden shadow-card aspect-[4/5] sm:aspect-auto sm:min-h-[28rem]"
    >
      <Image
        src={PHOTOS.bathroom}
        alt="A bathroom on a quiet weekday afternoon after a Pristine clean"
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover animate-ken-burns"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-[oklch(0.11_0.04_230/0.55)] via-[oklch(0.11_0.04_230/0.1)] to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
        <div className="inline-flex items-center gap-1.5 self-start rounded-full bg-[oklch(0.13_0.045_230/0.55)] backdrop-blur-sm text-[var(--surface)] text-[11px] font-semibold uppercase tracking-[0.14em] px-2.5 py-1">
          <span className="inline-block h-1 w-1 rounded-full bg-grass-400" />
          Tuesday · 2:14 PM
        </div>
        <div className="mt-3 flex items-baseline gap-2 font-display font-extrabold text-[var(--surface)] leading-[0.92] tracking-[-0.04em]">
          <span className="text-[clamp(3.5rem,8vw,7rem)] tabular-nums">
            <CountUp to={12384} duration={2.2} />
          </span>
          <span className="text-[clamp(1.5rem,3vw,2.5rem)] text-grass-300">+</span>
        </div>
        <p className="mt-2 text-[var(--surface)]/85 leading-relaxed max-w-md text-sm sm:text-base">
          homes cleaned across metro Detroit since 2019.
        </p>
      </div>
    </motion.div>
  );
}

function BigCounterTile() {
  return (
    <TileShell className="col-span-1 sm:col-span-2 lg:col-span-2 p-6 sm:p-7 flex flex-col justify-between min-h-[12rem]" delay={0.05}>
      <div className="flex items-start justify-between">
        <div className="text-[11px] uppercase tracking-[0.14em] text-ink-600 font-semibold">
          Rebook rate
        </div>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-grass-500/12 text-grass-700">
          <TrendingUp className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-4 flex items-baseline gap-2 font-display font-extrabold text-ink-950 leading-none tracking-[-0.03em]">
        <span className="text-[clamp(3.25rem,7vw,5.5rem)] tabular-nums">
          <CountUp to={92} duration={1.4} />
        </span>
        <span className="text-2xl text-ink-600 font-medium">%</span>
      </div>
      <p className="mt-3 text-sm text-ink-700 leading-relaxed">
        of first-time customers book a second clean within 30 days.
      </p>
      <Sparkline />
    </TileShell>
  );
}

function Sparkline() {
  return (
    <svg viewBox="0 0 200 36" className="mt-4 w-full h-9" aria-hidden>
      <motion.path
        d="M 4 28 L 28 22 L 52 25 L 76 18 L 100 20 L 124 12 L 148 14 L 172 6 L 196 8"
        fill="none"
        stroke="oklch(0.68 0.18 145)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      />
      <motion.path
        d="M 4 28 L 28 22 L 52 25 L 76 18 L 100 20 L 124 12 L 148 14 L 172 6 L 196 8 L 196 36 L 4 36 Z"
        fill="url(#spark-fill)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: 1.2 }}
      />
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.68 0.18 145 / 0.25)" />
          <stop offset="100%" stopColor="oklch(0.68 0.18 145 / 0)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function RatingTile() {
  return (
    <TileShell className="col-span-1 lg:col-span-1 p-6 flex flex-col gap-3 min-h-[11rem]" delay={0.1}>
      <div className="flex items-center justify-between">
        <div className="text-[11px] uppercase tracking-[0.14em] text-ink-600 font-semibold">
          Average rating
        </div>
        <span className="text-[10px] text-ink-faint font-medium">2,300+ reviews</span>
      </div>
      <div className="font-display font-extrabold text-ink-950 leading-none tracking-[-0.02em]">
        <span className="text-5xl tabular-nums">
          <CountUp to={4.9} decimals={1} duration={1.4} />
        </span>
        <span className="text-2xl text-ink-600 font-medium">/5</span>
      </div>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } }}
        className="flex items-center gap-0.5"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { scale: 0.4, opacity: 0 },
              show: {
                scale: 1,
                opacity: 1,
                transition: { type: "spring", stiffness: 320, damping: 16 },
              },
            }}
          >
            <Star className="h-5 w-5 fill-grass-500 stroke-grass-500" />
          </motion.span>
        ))}
      </motion.div>
    </TileShell>
  );
}

function SpeedTile() {
  return (
    <TileShell className="col-span-1 lg:col-span-1 p-6 flex flex-col gap-3 min-h-[11rem] relative overflow-hidden" delay={0.15}>
      <div className="flex items-center justify-between">
        <div className="text-[11px] uppercase tracking-[0.14em] text-ink-600 font-semibold">
          To book
        </div>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[oklch(0.65_0.13_220/0.1)] text-ink-700">
          <Zap className="h-4 w-4" />
        </span>
      </div>
      <div className="font-display font-extrabold text-ink-950 leading-none tracking-[-0.02em]">
        <span className="text-5xl tabular-nums">
          <CountUp to={60} duration={1.4} />
        </span>
        <span className="text-2xl text-ink-600 font-medium">sec</span>
      </div>
      <div className="relative h-12">
        <svg viewBox="0 0 100 100" className="absolute -top-1 -right-1 h-16 w-16 opacity-90" aria-hidden>
          <circle cx="50" cy="50" r="44" fill="none" stroke="oklch(0.92 0.012 220)" strokeWidth="6" />
          <motion.line
            x1="50"
            y1="50"
            x2="50"
            y2="14"
            stroke="oklch(0.68 0.18 145)"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ rotate: 0 }}
            whileInView={{ rotate: 320 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            style={{ transformOrigin: "50px 50px" }}
          />
          <circle cx="50" cy="50" r="3.5" fill="oklch(0.13 0.045 230)" />
        </svg>
        <p className="text-sm text-ink-700 leading-relaxed max-w-[10rem]">
          from open tab to text confirmation.
        </p>
      </div>
    </TileShell>
  );
}

function LiveTickerTile() {
  const [idx, setIdx] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % RECENT_BOOKINGS.length), 3800);
    return () => clearInterval(t);
  }, [reduce]);

  const b = RECENT_BOOKINGS[idx];

  return (
    <TileShell
      className="col-span-1 sm:col-span-2 lg:col-span-2 p-6 flex items-center justify-between gap-5 min-h-[7rem]"
      delay={0.2}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <span className="relative inline-flex h-3 w-3 flex-none">
          <span className="absolute inset-0 rounded-full bg-grass-500 animate-pulse-ring" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-grass-500" />
        </span>
        <div className="min-w-0">
          <div className="text-[11px] uppercase tracking-[0.14em] text-ink-600 font-semibold">
            Live · just booked
          </div>
          <div className="relative h-7 mt-0.5">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 font-display font-bold text-ink-950 truncate"
              >
                <span>{b.tier}</span>
                <span className="text-ink-faint mx-1.5">·</span>
                <span>{b.city}</span>
                <span className="text-ink-faint mx-1.5">·</span>
                <span className="text-ink-600 text-sm font-medium">{b.min} min ago</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="hidden sm:inline-flex items-center gap-1.5 text-xs text-ink-700">
        <ShieldCheck className="h-3.5 w-3.5 text-grass-600" />
        Verified booking
      </div>
    </TileShell>
  );
}
