"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

const STEPS = [
  {
    n: "01",
    title: "Configure",
    body: "Pick a tier, set rooms and add-ons. The price is live. No hidden fees, no quote forms.",
    accent: "Tap. Drag. Done.",
  },
  {
    n: "02",
    title: "Schedule",
    body: "Open dates and time windows are shown in real time. Same-day available when slots are open.",
    accent: "It's a live calendar.",
  },
  {
    n: "03",
    title: "Relax",
    body: "We text within 15 minutes with your cleaner's photo. You're charged only after the clean is approved.",
    accent: "Sleep in tomorrow.",
  },
];

const SYMBOLS: Record<string, React.FC> = {
  "01": SliderGlyph,
  "02": CalendarGlyph,
  "03": SparkGlyph,
};

export function HowItWorks() {
  return (
    <section id="how" className="relative py-20 sm:py-28 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="grid lg:grid-cols-[1fr_auto] gap-6 items-end"
        >
          <div className="max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.14em] text-ink-600 font-semibold">
              The process
            </div>
            <h2 className="mt-3 font-display font-extrabold text-display-1 text-ink-950 text-balance">
              From curious to booked,{" "}
              <span className="italic font-medium text-ink-700">no phone calls.</span>
            </h2>
          </div>
          <p className="text-ink-700 lg:text-right max-w-xs">
            Three taps, fifteen minutes from open tab to text confirmation.
          </p>
        </motion.div>

        <ol className="mt-14 grid md:grid-cols-3 gap-6 lg:gap-8">
          {STEPS.map((s, i) => {
            const Glyph = SYMBOLS[s.n];
            return (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-[1.5rem] border border-line bg-[var(--surface-elevated)] overflow-hidden"
              >
                <div className="relative h-44 sm:h-48 lg:h-52 flex items-center justify-center bg-gradient-to-b from-[oklch(0.96_0.022_146)] to-[oklch(0.985_0.006_220)] overflow-hidden">
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-[var(--surface)] text-ink-950 text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-1 ring-1 ring-line-strong/60">
                    <span className="inline-block h-1 w-1 rounded-full bg-grass-500" />
                    Step {s.n}
                  </span>
                  <Glyph />
                </div>

                <div className="px-6 pt-6 pb-7">
                  <h3 className="font-display font-extrabold text-2xl tracking-[-0.02em] text-ink-950">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[15px] text-ink-700 leading-relaxed text-pretty">
                    {s.body}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-grass-700">
                    <ArrowDownRight className="h-3.5 w-3.5" />
                    {s.accent}
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ol>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border-t border-line pt-8"
        >
          <p className="text-ink-700 max-w-lg">
            Cleaners are typically dispatched within the hour. You won&apos;t hear from us
            until they&apos;re on their way.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-ink-950 hover:bg-ink-900 text-[var(--surface)] font-semibold px-6 py-3.5 text-sm whitespace-nowrap transition-all duration-300 ease-out-quint cursor-pointer"
          >
            Start a booking
            <ArrowDownRight className="h-4 w-4 -rotate-90" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function SliderGlyph() {
  return (
    <motion.svg
      viewBox="0 0 200 96"
      width="200"
      height="96"
      className="text-ink-950"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      role="img"
      aria-label="A configurable slider control"
    >
      <line x1="14" y1="34" x2="186" y2="34" stroke="oklch(0.88 0.022 220)" strokeWidth="4" strokeLinecap="round" />
      <motion.line
        x1="14"
        y1="34"
        x2="186"
        y2="34"
        stroke="oklch(0.62 0.17 145)"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0.18, 0.72, 0.42, 0.62] }}
        transition={{ duration: 6, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
      />
      <motion.circle
        cy="34"
        r="11"
        fill="oklch(0.13 0.045 230)"
        stroke="oklch(0.985 0.006 220)"
        strokeWidth="3"
        initial={{ cx: 50 }}
        animate={{ cx: [50, 150, 95, 130, 60, 110] }}
        transition={{ duration: 6, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
      />

      <line x1="14" y1="68" x2="186" y2="68" stroke="oklch(0.88 0.022 220)" strokeWidth="3" strokeLinecap="round" />
      <motion.circle
        cy="68"
        r="8"
        fill="oklch(0.62 0.17 145)"
        initial={{ cx: 130 }}
        animate={{ cx: [130, 70, 110, 90, 145] }}
        transition={{ duration: 7, repeat: Infinity, ease: [0.45, 0, 0.55, 1], delay: 0.4 }}
      />
    </motion.svg>
  );
}

function CalendarGlyph() {
  const cells = Array.from({ length: 14 });
  const highlight = 8;
  return (
    <motion.svg
      viewBox="0 0 200 112"
      width="200"
      height="112"
      role="img"
      aria-label="A live calendar with a confirmed date"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
    >
      <rect x="34" y="14" width="132" height="86" rx="14" fill="oklch(0.985 0.006 220)" stroke="oklch(0.84 0.018 220)" strokeWidth="1.5" />
      <line x1="34" y1="34" x2="166" y2="34" stroke="oklch(0.88 0.022 220)" strokeWidth="1.5" />
      <circle cx="58" cy="24" r="3" fill="oklch(0.13 0.045 230)" />
      <circle cx="142" cy="24" r="3" fill="oklch(0.13 0.045 230)" />

      {cells.map((_, i) => {
        const col = i % 7;
        const row = Math.floor(i / 7);
        const x = 46 + col * 16;
        const y = 48 + row * 18;
        const isHighlight = i === highlight;
        return (
          <motion.rect
            key={i}
            x={x}
            y={y}
            width="12"
            height="12"
            rx="3"
            fill={isHighlight ? "oklch(0.62 0.17 145)" : "oklch(0.94 0.018 220)"}
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.1 + i * 0.025, ease: [0.22, 1, 0.36, 1] }}
          />
        );
      })}

      <motion.circle
        cx={46 + (highlight % 7) * 16 + 6}
        cy={48 + Math.floor(highlight / 7) * 18 + 6}
        r="12"
        fill="none"
        stroke="oklch(0.62 0.17 145)"
        strokeWidth="2.5"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [0.9, 1.25, 0.95, 1.15, 0.95], opacity: [0.85, 0.2, 0.7, 0.2, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
        style={{ transformOrigin: `${46 + (highlight % 7) * 16 + 6}px ${48 + Math.floor(highlight / 7) * 18 + 6}px` }}
      />
    </motion.svg>
  );
}

function SparkGlyph() {
  return (
    <motion.svg
      viewBox="0 0 200 112"
      width="200"
      height="112"
      role="img"
      aria-label="Sparkles around a crescent moon, sleep in tomorrow"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
    >
      <motion.path
        d="M115 36 a30 30 0 1 0 0 40 a22 22 0 1 1 0 -40 z"
        fill="oklch(0.13 0.045 230)"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "108px 56px" }}
      />

      {[
        { cx: 52, cy: 30, size: 8, delay: 0.4 },
        { cx: 38, cy: 64, size: 6, delay: 0.7 },
        { cx: 68, cy: 86, size: 5, delay: 1.0 },
        { cx: 162, cy: 26, size: 7, delay: 0.55 },
        { cx: 176, cy: 70, size: 6, delay: 0.85 },
      ].map((s, i) => (
        <Twinkle key={i} {...s} />
      ))}
    </motion.svg>
  );
}

function Twinkle({ cx, cy, size, delay }: { cx: number; cy: number; size: number; delay: number }) {
  return (
    <motion.g
      style={{ transformOrigin: `${cx}px ${cy}px` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      <path
        d={`M${cx} ${cy - size} L${cx + size * 0.35} ${cy - size * 0.35} L${cx + size} ${cy} L${cx + size * 0.35} ${cy + size * 0.35} L${cx} ${cy + size} L${cx - size * 0.35} ${cy + size * 0.35} L${cx - size} ${cy} L${cx - size * 0.35} ${cy - size * 0.35} Z`}
        fill="oklch(0.62 0.17 145)"
      />
    </motion.g>
  );
}
