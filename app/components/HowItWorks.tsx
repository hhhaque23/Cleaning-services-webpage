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

// ---- Glyph 01: Configure ------------------------------------------------
// Two horizontal rails, each with a single smooth sweep from left to a
// final landing position. No oscillation. Settles and stays.
function SliderGlyph() {
  const viewport = { once: true, margin: "-40px" };
  return (
    <motion.svg
      viewBox="0 0 200 96"
      width="200"
      height="96"
      role="img"
      aria-label="A configurable slider control"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewport}
      transition={{ duration: 0.4 }}
    >
      {/* Top rail base */}
      <line x1="14" y1="34" x2="186" y2="34" stroke="oklch(0.88 0.022 220)" strokeWidth="4" strokeLinecap="round" />
      {/* Top rail grass fill */}
      <motion.line
        x1="14"
        y1="34"
        y2="34"
        stroke="oklch(0.62 0.17 145)"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ x2: 14 }}
        whileInView={{ x2: 132 }}
        viewport={viewport}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      />
      {/* Top knob */}
      <motion.circle
        cy="34"
        r="11"
        fill="oklch(0.13 0.045 230)"
        stroke="oklch(0.985 0.006 220)"
        strokeWidth="3"
        initial={{ cx: 14 }}
        whileInView={{ cx: 132 }}
        viewport={viewport}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      />

      {/* Bottom rail base */}
      <line x1="14" y1="68" x2="186" y2="68" stroke="oklch(0.88 0.022 220)" strokeWidth="3" strokeLinecap="round" />
      {/* Bottom rail grass fill */}
      <motion.line
        x1="14"
        y1="68"
        y2="68"
        stroke="oklch(0.62 0.17 145 / 0.7)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ x2: 14 }}
        whileInView={{ x2: 84 }}
        viewport={viewport}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      />
      {/* Bottom knob */}
      <motion.circle
        cy="68"
        r="8"
        fill="oklch(0.62 0.17 145)"
        initial={{ cx: 14 }}
        whileInView={{ cx: 84 }}
        viewport={viewport}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      />
    </motion.svg>
  );
}

// ---- Glyph 02: Schedule ------------------------------------------------
// Two-week calendar (2 rows × 7 columns = 14 cells). A cursor walks across
// and clicks three days in sequence; each click triggers a grass glow plus
// a white checkmark in that cell. Plays once on view-in then settles.
function CalendarGlyph() {
  const cols = 7;
  const rows = 2;
  const cellW = 19;
  const cellH = 13;
  const gap = 1.5;
  const gridX = 32;
  const gridY = 38;

  const startDate = 14; // showing May 14 to May 27

  const targets = [
    { col: 1, row: 0 }, // Mon week 1
    { col: 3, row: 0 }, // Wed week 1
    { col: 5, row: 1 }, // Fri week 2
  ];

  const center = (col: number, row: number) => ({
    x: gridX + col * (cellW + gap) + cellW / 2,
    y: gridY + row * (cellH + gap) + cellH / 2,
  });

  const cells = Array.from({ length: cols * rows }, (_, i) => ({
    col: i % cols,
    row: Math.floor(i / cols),
    n: startDate + i,
  }));

  const DURATION = 4.6;
  const t = (sec: number) => sec / DURATION;
  const viewport = { once: true, margin: "-40px" };

  // Per-cell click time inside the sequence (each click is 1.1s apart)
  const clickAt = (i: number) => 0.7 + i * 1.1;

  // Cursor path: enter from top-left, hit each target, then exit bottom-right.
  const cursorPath = (() => {
    const enter = { x: 16, y: -10 };
    const exit = { x: 170, y: 100 };
    const stops = targets.map((tg) => center(tg.col, tg.row));
    return {
      x: [enter.x, ...stops.map((s) => s.x - 5), exit.x],
      y: [enter.y, ...stops.map((s) => s.y - 4), exit.y],
      opacity: [0, 1, 1, 1, 0],
    };
  })();

  return (
    <motion.svg
      viewBox="0 0 200 124"
      width="200"
      height="124"
      role="img"
      aria-label="A cursor clicks three days on a two-week calendar"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewport}
      transition={{ duration: 0.4 }}
    >
      {/* Frame */}
      <rect x="20" y="18" width="160" height="92" rx="9" fill="oklch(0.985 0.006 220)" stroke="oklch(0.84 0.018 220)" strokeWidth="1.3" />
      <text x="100" y="28" textAnchor="middle" fontSize="6" fontWeight="700" fill="oklch(0.32 0.05 230)" letterSpacing="1.2" fontFamily="sans-serif">
        MAY 14 — MAY 27
      </text>
      <line x1="20" y1="33" x2="180" y2="33" stroke="oklch(0.92 0.012 220)" strokeWidth="0.8" />
      {"SMTWTFS".split("").map((d, i) => (
        <text
          key={i}
          x={gridX + i * (cellW + gap) + cellW / 2}
          y="36.5"
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

      {/* Static cells (non-targets) */}
      {cells.map((c) => {
        const x = gridX + c.col * (cellW + gap);
        const y = gridY + c.row * (cellH + gap);
        const isTarget = targets.some((tg) => tg.col === c.col && tg.row === c.row);
        if (isTarget) return null;
        return (
          <g key={c.n}>
            <rect x={x} y={y} width={cellW} height={cellH} rx="2.5" fill="oklch(0.96 0.012 220)" />
            <text
              x={x + cellW / 2}
              y={y + cellH / 2 + 1.8}
              textAnchor="middle"
              fontSize="5"
              fontWeight="500"
              fill="oklch(0.5 0.042 228)"
              fontFamily="sans-serif"
            >
              {c.n}
            </text>
          </g>
        );
      })}

      {/* Target cells: each gets a glow, fill, check, in sequence */}
      {targets.map((tg, i) => {
        const x = gridX + tg.col * (cellW + gap);
        const y = gridY + tg.row * (cellH + gap);
        const c = center(tg.col, tg.row);
        const clickT = clickAt(i);
        return (
          <g key={`target-${i}`}>
            {/* Glow halo behind cell (fades in then settles soft) */}
            <motion.circle
              cx={c.x}
              cy={c.y}
              r={cellW * 0.9}
              fill="oklch(0.68 0.18 145 / 0.35)"
              style={{ filter: "blur(6px)", transformOrigin: `${c.x}px ${c.y}px` }}
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{
                scale: [0.5, 0.5, 1.15, 1],
                opacity: [0, 0, 1, 0.55],
              }}
              viewport={viewport}
              transition={{
                duration: DURATION,
                times: [0, t(clickT), t(clickT + 0.25), t(clickT + 0.55)],
                ease: "easeOut",
              }}
            />
            {/* Cell fill */}
            <motion.rect
              x={x}
              y={y}
              width={cellW}
              height={cellH}
              rx="2.5"
              fill="oklch(0.96 0.012 220)"
              initial={false}
              whileInView={{
                fill: [
                  "oklch(0.96 0.012 220)",
                  "oklch(0.96 0.012 220)",
                  "oklch(0.62 0.17 145)",
                ],
              }}
              viewport={viewport}
              transition={{
                duration: DURATION,
                times: [0, t(clickT), t(clickT + 0.18)],
                ease: "linear",
              }}
            />
            {/* Date number fades out as cell turns grass */}
            <motion.text
              x={x + cellW / 2}
              y={y + cellH / 2 + 1.8}
              textAnchor="middle"
              fontSize="5"
              fontWeight="500"
              fill="oklch(0.5 0.042 228)"
              fontFamily="sans-serif"
              initial={false}
              whileInView={{ opacity: [1, 1, 0] }}
              viewport={viewport}
              transition={{
                duration: DURATION,
                times: [0, t(clickT), t(clickT + 0.18)],
                ease: "linear",
              }}
            >
              {startDate + tg.row * cols + tg.col}
            </motion.text>
            {/* Check draws */}
            <motion.path
              d={`M ${x + cellW * 0.26} ${y + cellH * 0.54} L ${x + cellW * 0.45} ${y + cellH * 0.78} L ${x + cellW * 0.78} ${y + cellH * 0.3}`}
              fill="none"
              stroke="oklch(0.985 0.006 220)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: [0, 0, 1], opacity: [0, 0, 1] }}
              viewport={viewport}
              transition={{
                duration: DURATION,
                times: [0, t(clickT + 0.15), t(clickT + 0.45)],
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </g>
        );
      })}

      {/* Cursor */}
      <motion.g
        initial={{ x: 16, y: -10, opacity: 0 }}
        whileInView={cursorPath}
        viewport={viewport}
        transition={{
          duration: DURATION,
          times: [
            0,
            t(clickAt(0) - 0.05),
            t(clickAt(1) - 0.05),
            t(clickAt(2) - 0.05),
            1,
          ],
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <path
          d="M 0 0 L 0 14 L 4 11 L 7 17 L 9 16 L 6 10 L 11 10 Z"
          fill="oklch(0.13 0.045 230)"
          stroke="oklch(0.985 0.006 220)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </motion.g>
    </motion.svg>
  );
}

// ---- Glyph 03: Relax ---------------------------------------------------
// Definitive crescent via SVG mask: a solid ink circle masked by an
// offset surface-colored circle. Stars twinkle in on stagger and stay.
function MoonGlyph() {
  const stars = [
    { cx: 58, cy: 26, size: 8, delay: 0.4 },
    { cx: 38, cy: 56, size: 6, delay: 0.7 },
    { cx: 62, cy: 88, size: 5, delay: 1.0 },
    { cx: 28, cy: 38, size: 4, delay: 0.55 },
    { cx: 80, cy: 96, size: 4, delay: 0.9 },
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
      <defs>
        <mask id="moon-cutout" maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width="200" height="124" fill="white" />
          <circle cx="140" cy="56" r="28" fill="black" />
        </mask>
      </defs>

      <motion.circle
        cx="124"
        cy="62"
        r="32"
        fill="oklch(0.13 0.045 230)"
        mask="url(#moon-cutout)"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "124px 62px" }}
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
      whileInView={{ scale: [0, 1.18, 1], opacity: [0, 1, 1] }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1.3, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <path
        d={`M${cx} ${cy - size} L${cx + size * 0.35} ${cy - size * 0.35} L${cx + size} ${cy} L${cx + size * 0.35} ${cy + size * 0.35} L${cx} ${cy + size} L${cx - size * 0.35} ${cy + size * 0.35} L${cx - size} ${cy} L${cx - size * 0.35} ${cy - size * 0.35} Z`}
        fill="oklch(0.62 0.17 145)"
      />
    </motion.g>
  );
}
