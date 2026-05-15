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
  "03": MoonGlyph,
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

// ---- Glyph 01: Configure (slider, one-shot on view-in) ----
function SliderGlyph() {
  const knobCycle = [50, 150, 95, 130, 110];
  const knobFinal = knobCycle[knobCycle.length - 1];
  const dotCycle = [130, 70, 110, 145];
  const dotFinal = dotCycle[dotCycle.length - 1];

  const topTransition = { duration: 2.6, ease: [0.45, 0, 0.55, 1] };
  const bottomTransition = { duration: 3.0, ease: [0.45, 0, 0.55, 1], delay: 0.4 };

  return (
    <motion.svg
      viewBox="0 0 200 96"
      width="200"
      height="96"
      role="img"
      aria-label="A configurable slider control"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
    >
      {/* Top rail base */}
      <line x1="14" y1="34" x2="186" y2="34" stroke="oklch(0.88 0.022 220)" strokeWidth="4" strokeLinecap="round" />
      {/* Top rail grass fill, x2 follows knob */}
      <motion.line
        x1="14"
        y1="34"
        y2="34"
        stroke="oklch(0.62 0.17 145)"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ x2: 14 }}
        whileInView={{ x2: knobCycle }}
        viewport={{ once: true, margin: "-40px" }}
        transition={topTransition}
      />
      {/* Top knob */}
      <motion.circle
        cy="34"
        r="11"
        fill="oklch(0.13 0.045 230)"
        stroke="oklch(0.985 0.006 220)"
        strokeWidth="3"
        initial={{ cx: 14 }}
        whileInView={{ cx: knobCycle }}
        viewport={{ once: true, margin: "-40px" }}
        transition={topTransition}
      />

      {/* Bottom rail base */}
      <line x1="14" y1="68" x2="186" y2="68" stroke="oklch(0.88 0.022 220)" strokeWidth="3" strokeLinecap="round" />
      {/* Bottom rail grass fill, x2 follows lower knob */}
      <motion.line
        x1="14"
        y1="68"
        y2="68"
        stroke="oklch(0.62 0.17 145 / 0.7)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ x2: 14 }}
        whileInView={{ x2: dotCycle }}
        viewport={{ once: true, margin: "-40px" }}
        transition={bottomTransition}
      />
      {/* Bottom knob */}
      <motion.circle
        cy="68"
        r="8"
        fill="oklch(0.62 0.17 145)"
        initial={{ cx: 14 }}
        whileInView={{ cx: dotCycle }}
        viewport={{ once: true, margin: "-40px" }}
        transition={bottomTransition}
      />

      {/* Final-position fallbacks (rendered statically; the motion above overrides on view) */}
      <line x1="-9999" y1="0" x2="-9998" y2="0" data-final-top={knobFinal} data-final-bottom={dotFinal} />
    </motion.svg>
  );
}

// ---- Glyph 02: Schedule (full calendar + cursor click + check spread, one-shot) ----
function CalendarGlyph() {
  const gridX = 32;
  const gridY = 34;
  const cellW = 19;
  const cellH = 12;
  const gap = 1.5;
  const cols = 7;
  const rows = 5;
  const targetRow = 2;
  const targetCol = 2;

  const cellCx = gridX + targetCol * (cellW + gap) + cellW / 2;
  const cellCy = gridY + 4 + targetRow * (cellH + gap) + cellH / 2;
  const targetCellX = gridX + targetCol * (cellW + gap);
  const targetCellY = gridY + 4 + targetRow * (cellH + gap);

  const cells = Array.from({ length: cols * rows }, (_, i) => ({
    col: i % cols,
    row: Math.floor(i / cols),
    n: i + 1,
  }));

  const DURATION = 3.4;
  const t = (sec: number) => sec / DURATION;
  const viewport = { once: true, margin: "-40px" };

  return (
    <motion.svg
      viewBox="0 0 200 124"
      width="200"
      height="124"
      role="img"
      aria-label="A mouse cursor clicks a date on the calendar and a check confirms"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewport}
      transition={{ duration: 0.4 }}
    >
      <rect x="20" y="14" width="160" height="100" rx="9" fill="oklch(0.985 0.006 220)" stroke="oklch(0.84 0.018 220)" strokeWidth="1.3" />
      <text x="100" y="24" textAnchor="middle" fontSize="6" fontWeight="700" fill="oklch(0.32 0.05 230)" letterSpacing="1.2" fontFamily="sans-serif">
        MAY 2026
      </text>
      <line x1="20" y1="30" x2="180" y2="30" stroke="oklch(0.92 0.012 220)" strokeWidth="0.8" />
      {"SMTWTFS".split("").map((d, i) => (
        <text
          key={i}
          x={gridX + i * (cellW + gap) + cellW / 2}
          y="33.5"
          textAnchor="middle"
          fontSize="3.6"
          fontWeight="700"
          fill="oklch(0.62 0.025 230)"
          letterSpacing="0.4"
          fontFamily="sans-serif"
        >
          {d}
        </text>
      ))}

      {cells.map((c) => {
        const x = gridX + c.col * (cellW + gap);
        const y = gridY + 4 + c.row * (cellH + gap);
        const isTarget = c.col === targetCol && c.row === targetRow;
        if (isTarget) return null;
        return (
          <g key={c.n}>
            <rect x={x} y={y} width={cellW} height={cellH} rx="2.5" fill="oklch(0.96 0.012 220)" />
            <text
              x={x + cellW / 2}
              y={y + cellH / 2 + 1.6}
              textAnchor="middle"
              fontSize="4.5"
              fontWeight="500"
              fill="oklch(0.5 0.042 228)"
              fontFamily="sans-serif"
            >
              {c.n}
            </text>
          </g>
        );
      })}

      {/* Target cell fill */}
      <motion.rect
        x={targetCellX}
        y={targetCellY}
        width={cellW}
        height={cellH}
        rx="2.5"
        fill="oklch(0.96 0.012 220)"
        initial={false}
        whileInView={{ fill: ["oklch(0.96 0.012 220)", "oklch(0.96 0.012 220)", "oklch(0.62 0.17 145)"] }}
        viewport={viewport}
        transition={{
          duration: DURATION,
          times: [0, t(1.35), t(1.6)],
          ease: "linear",
        }}
      />
      {/* Target cell number fades out */}
      <motion.text
        x={targetCellX + cellW / 2}
        y={targetCellY + cellH / 2 + 1.6}
        textAnchor="middle"
        fontSize="4.5"
        fontWeight="500"
        fill="oklch(0.5 0.042 228)"
        fontFamily="sans-serif"
        initial={false}
        whileInView={{ opacity: [1, 1, 0] }}
        viewport={viewport}
        transition={{ duration: DURATION, times: [0, t(1.35), t(1.55)], ease: "linear" }}
      >
        17
      </motion.text>
      {/* Check draws */}
      <motion.path
        d={`M ${targetCellX + cellW * 0.28} ${targetCellY + cellH * 0.55} L ${targetCellX + cellW * 0.46} ${targetCellY + cellH * 0.78} L ${targetCellX + cellW * 0.76} ${targetCellY + cellH * 0.3}`}
        fill="none"
        stroke="oklch(0.985 0.006 220)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: [0, 0, 1], opacity: [0, 0, 1] }}
        viewport={viewport}
        transition={{
          duration: DURATION,
          times: [0, t(1.4), t(1.75)],
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* Ripples (one pass, expand and fade, don't loop) */}
      {[0, 0.2].map((delaySec, i) => (
        <motion.circle
          key={i}
          cx={cellCx}
          cy={cellCy}
          r={cellW / 2 + 1}
          fill="none"
          stroke="oklch(0.62 0.17 145)"
          strokeWidth="1.4"
          style={{ transformOrigin: `${cellCx}px ${cellCy}px` }}
          initial={{ scale: 0.7, opacity: 0 }}
          whileInView={{
            scale: [0.7, 0.7, 1, 3.2],
            opacity: [0, 0, 0.65, 0],
          }}
          viewport={viewport}
          transition={{
            duration: DURATION,
            times: [0, t(1.5 + delaySec), t(1.6 + delaySec), t(2.6 + delaySec)],
            ease: "easeOut",
          }}
        />
      ))}

      {/* Cursor: enters, clicks, leaves once */}
      <motion.g
        initial={{ x: 30, y: -22, opacity: 0 }}
        whileInView={{
          x: [30, cellCx - 6, cellCx - 6, cellCx + 12],
          y: [-22, cellCy - 4, cellCy - 4, cellCy + 20],
          opacity: [0, 1, 1, 0],
        }}
        viewport={viewport}
        transition={{
          duration: DURATION,
          times: [0, t(1.15), t(1.55), t(3.0)],
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.g
          initial={{ scale: 1 }}
          whileInView={{ scale: [1, 1, 0.82, 1.06, 1] }}
          viewport={viewport}
          transition={{
            duration: DURATION,
            times: [0, t(1.18), t(1.27), t(1.35), t(1.45)],
            ease: "easeOut",
          }}
          style={{ transformOrigin: "6px 6px" }}
        >
          <path
            d="M 0 0 L 0 14 L 4 11 L 7 17 L 9 16 L 6 10 L 11 10 Z"
            fill="oklch(0.13 0.045 230)"
            stroke="oklch(0.985 0.006 220)"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </motion.g>
      </motion.g>
    </motion.svg>
  );
}

// ---- Glyph 03: Relax (clean crescent + stars twinkle once and stay) ----
function MoonGlyph() {
  const stars = [
    { cx: 58, cy: 26, size: 8, delay: 0.4 },
    { cx: 40, cy: 56, size: 6, delay: 0.7 },
    { cx: 60, cy: 86, size: 5, delay: 1.0 },
    { cx: 28, cy: 38, size: 4, delay: 0.55 },
    { cx: 82, cy: 96, size: 4, delay: 0.9 },
  ];
  return (
    <motion.svg
      viewBox="0 0 200 124"
      width="200"
      height="124"
      role="img"
      aria-label="A crescent moon with stars"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
    >
      <motion.path
        d="M 134 30 A 32 32 0 1 0 134 94 A 24 24 0 1 1 134 30 Z"
        fill="oklch(0.13 0.045 230)"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "126px 62px" }}
      />

      {stars.map((s, i) => (
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
      whileInView={{ scale: [0, 1.15, 1], opacity: [0, 1, 1] }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <path
        d={`M${cx} ${cy - size} L${cx + size * 0.35} ${cy - size * 0.35} L${cx + size} ${cy} L${cx + size * 0.35} ${cy + size * 0.35} L${cx} ${cy + size} L${cx - size * 0.35} ${cy + size * 0.35} L${cx - size} ${cy} L${cx - size * 0.35} ${cy - size * 0.35} Z`}
        fill="oklch(0.62 0.17 145)"
      />
    </motion.g>
  );
}
