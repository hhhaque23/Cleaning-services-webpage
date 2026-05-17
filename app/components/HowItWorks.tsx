"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useCallback, useRef } from "react";
import { ArrowDownRight } from "lucide-react";
import { MagneticButton } from "./motion/MagneticButton";
import { EASE_OUT_QUINT } from "./motion/motion-primitives";

function useEdgeGlow() {
  const ref = useRef<HTMLDivElement | null>(null);
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--gx", `${x}%`);
    el.style.setProperty("--gy", `${y}%`);
  }, []);
  return { ref, onMouseMove };
}

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

const SYMBOLS: Record<string, React.FC<{ delay?: number }>> = {
  "01": SliderGlyph,
  "02": CalendarGlyph,
  "03": MoonGlyph,
};

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 30%"],
  });
  const spineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Per-card parallax y-shifts
  const card1Y = useTransform(scrollYProgress, [0, 1], [16, -16]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [28, -28]);
  const card3Y = useTransform(scrollYProgress, [0, 1], [22, -22]);
  const cardYs = [card1Y, card2Y, card3Y];

  return (
    <section
      id="how"
      ref={sectionRef}
      className="relative py-24 sm:py-32 scroll-mt-24 bg-[var(--surface-tint)] overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-faint bg-grid-32 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: EASE_OUT_QUINT }}
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

        <div className="mt-16 relative">
          {/* Scroll-progress spine — visible on lg+ */}
          <div
            aria-hidden
            className="hidden lg:block absolute left-0 top-0 bottom-0 w-px ml-3"
          >
            <div className="absolute inset-0 bg-line-strong/40" />
            <motion.div
              style={reduce ? { height: "100%" } : { height: spineHeight }}
              className="absolute top-0 left-0 w-px bg-gradient-to-b from-grass-500 to-grass-700"
            />
          </div>

          <ol className="grid md:grid-cols-3 gap-6 lg:gap-8 lg:ml-10">
            {STEPS.map((s, i) => {
              const Glyph = SYMBOLS[s.n];
              return (
                <StepCard
                  key={s.n}
                  step={s}
                  index={i}
                  Glyph={Glyph}
                  cardY={cardYs[i]}
                  reduce={!!reduce}
                />
              );
            })}
          </ol>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border-t border-line pt-8"
        >
          <p className="text-ink-700 max-w-lg">
            Cleaners are typically dispatched within the hour. You won&apos;t hear from us until
            they&apos;re on their way.
          </p>
          <MagneticButton as="div" radius={110} strength={0.28}>
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-ink-950 hover:bg-ink-900 text-[var(--surface)] font-semibold px-6 py-3.5 text-sm whitespace-nowrap transition-all duration-300 ease-out-quint cursor-pointer"
            >
              Start a booking
              <ArrowDownRight className="h-4 w-4 -rotate-90" />
            </Link>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

type StepCardProps = {
  step: { n: string; title: string; body: string; accent: string };
  index: number;
  Glyph: React.FC<{ delay?: number }>;
  cardY: import("framer-motion").MotionValue<number>;
  reduce: boolean;
};

function StepCard({ step, index, Glyph, cardY, reduce }: StepCardProps) {
  const { ref, onMouseMove } = useEdgeGlow();
  return (
    <motion.li
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: EASE_OUT_QUINT }}
      className="relative"
    >
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        style={reduce ? undefined : { y: cardY }}
        className="group/glow relative rounded-[1.5rem] bg-[var(--surface)] shadow-soft hover:shadow-card transition-shadow"
      >
        {/* Cursor-tracked edge glow — grass + cyan blend, only shows on hover. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 group-hover/glow:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(220px circle at var(--gx, 50%) var(--gy, 50%), oklch(0.78 0.16 145 / 0.95), oklch(0.65 0.13 220 / 0.55) 45%, transparent 75%)",
            padding: 1.5,
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Static base border */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] border border-line-strong/40"
        />

        <div className="relative rounded-[inherit] overflow-hidden">
          <div className="relative h-44 sm:h-48 lg:h-52 flex items-center justify-center bg-gradient-to-b from-[oklch(0.96_0.022_146)] to-[oklch(0.985_0.006_220)] overflow-hidden">
            <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-[var(--surface)] text-ink-950 text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-1 ring-1 ring-line-strong/60">
              <span className="inline-block h-1 w-1 rounded-full bg-grass-500" />
              Step {step.n}
            </span>
            <Glyph delay={index * 1.2} />
          </div>

          <div className="px-6 pt-6 pb-7">
            <h3 className="font-display font-extrabold text-2xl tracking-[-0.02em] text-ink-950">
              {step.title}
            </h3>
            <p className="mt-2 text-[15px] text-[var(--ink-soft,oklch(0.43_0.04_230))] leading-relaxed text-pretty">
              {step.body}
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-grass-700">
              <ArrowDownRight className="h-3.5 w-3.5" />
              {step.accent}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.li>
  );
}

// ---- Glyph 01: Configure ------------------------------------------------
function SliderGlyph({ delay = 0 }: { delay?: number }) {
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
      transition={{ duration: 0.4, delay }}
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
        transition={{ duration: 1.4, ease: EASE_OUT_QUINT, delay: delay + 0.15 }}
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
        transition={{ duration: 1.4, ease: EASE_OUT_QUINT, delay: delay + 0.15 }}
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
        transition={{ duration: 1.4, ease: EASE_OUT_QUINT, delay: delay + 0.5 }}
      />
      <motion.circle
        cy="68"
        r="8"
        fill="oklch(0.62 0.17 145)"
        initial={{ cx: 14 }}
        whileInView={{ cx: 84 }}
        viewport={viewport}
        transition={{ duration: 1.4, ease: EASE_OUT_QUINT, delay: delay + 0.5 }}
      />
    </motion.svg>
  );
}

// ---- Glyph 02: Schedule -------------------------------------------------
function CalendarGlyph({ delay = 0 }: { delay?: number }) {
  const cols = 7;
  const cellSize = 22;
  const gap = 3;
  const totalW = cols * cellSize + (cols - 1) * gap;
  const gridX = (200 - totalW) / 2;
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
      transition={{ duration: 0.4, delay }}
    >
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

      {targets.map((tg, i) => {
        const x = gridX + tg.col * (cellSize + gap);
        const y = gridY + tg.row * (cellSize + gap);
        const c = center(tg.col, tg.row);
        const clickT = clickAt(i);
        return (
          <g key={`target-${i}`}>
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
                delay,
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
                delay,
              }}
            />
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
                delay,
              }}
            />
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
                ease: EASE_OUT_QUINT,
                delay,
              }}
            />
          </g>
        );
      })}

      <motion.g
        initial={{ x: cursorX[0], y: cursorY[0], opacity: 0 }}
        whileInView={{ x: cursorX, y: cursorY, opacity: cursorOpacity }}
        viewport={viewport}
        transition={{ duration: DURATION, times: cursorTimes, ease: EASE_OUT_QUINT, delay }}
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
function MoonGlyph({ delay = 0 }: { delay?: number }) {
  const stars = [
    { cx: 58, cy: 26, size: 8, delay: 0.4 },
    { cx: 38, cy: 56, size: 6, delay: 0.7 },
    { cx: 62, cy: 88, size: 5, delay: 1.0 },
    { cx: 28, cy: 38, size: 4, delay: 0.55 },
    { cx: 80, cy: 96, size: 4, delay: 0.9 },
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
      transition={{ duration: 0.4, delay }}
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
        transition={{ duration: 0.65, delay: delay + 0.15, ease: EASE_OUT_QUINT }}
        style={{ transformOrigin: "124px 62px" }}
      />

      {stars.map((s, i) => (
        <Twinkle key={i} cx={s.cx} cy={s.cy} size={s.size} delay={delay + s.delay} />
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
      transition={{ duration: 1.3, delay, ease: EASE_OUT_QUINT }}
    >
      <path
        d={`M${cx} ${cy - size} L${cx + size * 0.35} ${cy - size * 0.35} L${cx + size} ${cy} L${cx + size * 0.35} ${cy + size * 0.35} L${cx} ${cy + size} L${cx - size * 0.35} ${cy + size * 0.35} L${cx - size} ${cy} L${cx - size * 0.35} ${cy - size * 0.35} Z`}
        fill="oklch(0.62 0.17 145)"
      />
    </motion.g>
  );
}
