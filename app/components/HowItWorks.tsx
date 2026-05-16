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
                  <p className="mt-2 text-[15px] text-[var(--ink-soft,oklch(0.43_0.04_230))] leading-relaxed text-pretty">
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
      <line x1="14" y1="34" x2="186" y2="34" stroke="oklch(0.88 0.022 220)" strokeWidth="4" strokeLinecap="round" />
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

      <line x1="14" y1="68" x2="186" y2="68" stroke="oklch(0.88 0.022 220)" strokeWidth="3" strokeLinecap="round" />
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

// ---- Glyph 02: Schedule -------------------------------------------------
// Zoomed-in two-week grid, no labels, just cells. Cursor walks across and
// clicks three days; each click triggers a soft glow + grass fill + white
// check. Plays once on view-in, then sits still.
function CalendarGlyph() {
  const cols = 7;
  const cellSize = 22;
  const gap = 3;
  const totalW = cols * cellSize + (cols - 1) * gap; // 166
  const gridX = (200 - totalW) / 2; // 17
  const headerY = 16;
  const gridY = 30;

  const targets = [
    { col: 1, row: 0 },
    { col: 5, row: 0 },
    { col: 3, row: 1 },
  ];

  const center = (col: number, row: number) => ({
    x: gridX + col * (cellSize + gap) + cellSize / 2,
    y: gridY + row * (cellSize + gap) + cellSize / 2,
  });

  const cells = Array.from({ length: cols * 2 }, (_, i) => ({
    col: i % cols,
    row: Math.floor(i / cols),
  }));

  const DURATION = 4.6;
  const t = (sec: number) => sec / DURATION;
  const viewport = { once: true, margin: "-40px" };
  const clickAt = (i: number) => 0.7 + i * 1.15;

  const stops = targets.map((tg) => center(tg.col, tg.row));
  const cursorX = [16, ...stops.map((s) => s.x - 4), 180];
  const cursorY = [-8, ...stops.map((s) => s.y - 4), 100];
  const cursorOpacity = [0, 1, 1, 1, 0];
  const cursorTimes = [
    0,
    t(clickAt(0) - 0.05),
    t(clickAt(1) - 0.05),
    t(clickAt(2) - 0.05),
    1,
  ];

  return (
    <motion.svg
      viewBox="0 0 200 90"
      width="200"
      height="90"
      role="img"
      aria-label="A cursor clicks three separate days on a two-week calendar"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewport}
      transition={{ duration: 0.4 }}
    >
      {/* Day-of-week abbreviations above the grid */}
      {"SMTWTFS".split("").map((d, i) => (
        <text
          key={i}
          x={gridX + i * (cellSize + gap) + cellSize / 2}
          y={headerY + 2}
          textAnchor="middle"
          fontSize="6"
          fontWeight="700"
          fill="oklch(0.5 0.042 228)"
          letterSpacing="0.6"
          fontFamily="sans-serif"
        >
          {d}
        </text>
      ))}

      {/* Empty cells (non-targets) */}
      {cells.map((c, i) => {
        const x = gridX + c.col * (cellSize + gap);
        const y = gridY + c.row * (cellSize + gap);
        const isTarget = targets.some((tg) => tg.col === c.col && tg.row === c.row);
        if (isTarget) return null;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={cellSize}
            height={cellSize}
            rx="3.5"
            fill="oklch(0.91 0.022 220)"
            stroke="oklch(0.82 0.024 220)"
            strokeWidth="0.8"
          />
        );
      })}

      {/* Target cells */}
      {targets.map((tg, i) => {
        const x = gridX + tg.col * (cellSize + gap);
        const y = gridY + tg.row * (cellSize + gap);
        const c = center(tg.col, tg.row);
        const clickT = clickAt(i);
        return (
          <g key={`target-${i}`}>
            {/* Glow halo (stacked translucent circles, no filter blur) */}
            <motion.circle
              cx={c.x}
              cy={c.y}
              r={cellSize * 1.15}
              fill="oklch(0.68 0.18 145 / 0.18)"
              style={{ transformOrigin: `${c.x}px ${c.y}px` }}
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: [0.5, 0.5, 1.2, 1], opacity: [0, 0, 1, 0.7] }}
              viewport={viewport}
              transition={{
                duration: DURATION,
                times: [0, t(clickT), t(clickT + 0.25), t(clickT + 0.55)],
                ease: "easeOut",
              }}
            />
            <motion.circle
              cx={c.x}
              cy={c.y}
              r={cellSize * 0.85}
              fill="oklch(0.68 0.18 145 / 0.32)"
              style={{ transformOrigin: `${c.x}px ${c.y}px` }}
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: [0.5, 0.5, 1.15, 1], opacity: [0, 0, 1, 0.7] }}
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
              width={cellSize}
              height={cellSize}
              rx="3.5"
              stroke="oklch(0.82 0.024 220)"
              strokeWidth="0.8"
              initial={{ fill: "oklch(0.91 0.022 220)" }}
              whileInView={{
                fill: [
                  "oklch(0.91 0.022 220)",
                  "oklch(0.91 0.022 220)",
                  "oklch(0.62 0.17 145)",
                ],
              }}
              viewport={viewport}
              transition={{
                duration: DURATION,
                times: [0, t(clickT), t(clickT + 0.2)],
                ease: "linear",
              }}
            />
            {/* Checkmark */}
            <motion.path
              d={`M ${x + cellSize * 0.25} ${y + cellSize * 0.55} L ${x + cellSize * 0.45} ${y + cellSize * 0.78} L ${x + cellSize * 0.78} ${y + cellSize * 0.3}`}
              fill="none"
              stroke="oklch(0.985 0.006 220)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: [0, 0, 1], opacity: [0, 0, 1] }}
              viewport={viewport}
              transition={{
                duration: DURATION,
                times: [0, t(clickT + 0.15), t(clickT + 0.5)],
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </g>
        );
      })}

      {/* Cursor */}
      <motion.g
        initial={{ x: cursorX[0], y: cursorY[0], opacity: 0 }}
        whileInView={{ x: cursorX, y: cursorY, opacity: cursorOpacity }}
        viewport={viewport}
        transition={{ duration: DURATION, times: cursorTimes, ease: [0.22, 1, 0.36, 1] }}
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
function MoonGlyph() {
  const stars = [
    // Left side (around the open mouth of the crescent)
    { cx: 58, cy: 26, size: 8, delay: 0.4 },
    { cx: 38, cy: 56, size: 6, delay: 0.7 },
    { cx: 62, cy: 88, size: 5, delay: 1.0 },
    { cx: 28, cy: 38, size: 4, delay: 0.55 },
    { cx: 80, cy: 96, size: 4, delay: 0.9 },
    // Right side (past the moon's back)
    { cx: 178, cy: 32, size: 6, delay: 0.5 },
    { cx: 188, cy: 64, size: 5, delay: 0.85 },
    { cx: 172, cy: 96, size: 4, delay: 1.05 },
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
