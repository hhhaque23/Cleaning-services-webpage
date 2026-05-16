"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { MapPin } from "lucide-react";
import { EASE_OUT_QUINT } from "./motion/motion-primitives";

type Anchor = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";
type City = { name: string; x: number; y: number; anchor: Anchor };

const HQ = { name: "Rochester Hills", x: 460, y: 230 };

const CITIES: City[] = [
  { name: "Oxford", x: 410, y: 130, anchor: "n" },
  { name: "Lake Orion", x: 360, y: 178, anchor: "w" },
  { name: "Rochester", x: 510, y: 168, anchor: "ne" },
  { name: "Shelby Twp", x: 612, y: 198, anchor: "e" },
  { name: "Sterling Heights", x: 638, y: 280, anchor: "e" },
  { name: "Bloomfield Twp", x: 252, y: 220, anchor: "w" },
  { name: "Bloomfield Hills", x: 290, y: 280, anchor: "w" },
  { name: "Beverly Hills", x: 222, y: 326, anchor: "w" },
  { name: "Auburn Hills", x: 388, y: 286, anchor: "sw" },
  { name: "Troy", x: 458, y: 322, anchor: "e" },
  { name: "Madison Heights", x: 558, y: 346, anchor: "e" },
  { name: "Birmingham", x: 340, y: 350, anchor: "sw" },
  { name: "Royal Oak", x: 408, y: 380, anchor: "s" },
  { name: "Clawson", x: 332, y: 396, anchor: "s" },
  { name: "Berkley", x: 268, y: 384, anchor: "sw" },
];

function labelOffset(anchor: Anchor): { dx: number; dy: number; textAnchor: "start" | "middle" | "end" } {
  switch (anchor) {
    case "n":
      return { dx: 0, dy: -14, textAnchor: "middle" };
    case "s":
      return { dx: 0, dy: 18, textAnchor: "middle" };
    case "e":
      return { dx: 11, dy: 4, textAnchor: "start" };
    case "w":
      return { dx: -11, dy: 4, textAnchor: "end" };
    case "ne":
      return { dx: 9, dy: -8, textAnchor: "start" };
    case "nw":
      return { dx: -9, dy: -8, textAnchor: "end" };
    case "se":
      return { dx: 9, dy: 14, textAnchor: "start" };
    case "sw":
      return { dx: -9, dy: 14, textAnchor: "end" };
  }
}

const STAGGER = 0.06;
const LINE_DURATION = 0.5;
const DOT_DURATION = 0.3;
const LABEL_DURATION = 0.28;
const LINE_START = 0.4;

const lineVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: LINE_DURATION, delay: LINE_START + i * STAGGER, ease: EASE_OUT_QUINT },
      opacity: { duration: 0.18, delay: LINE_START + i * STAGGER },
    },
  }),
};

const dotVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      duration: DOT_DURATION,
      delay: LINE_START + i * STAGGER + LINE_DURATION - 0.1,
      ease: EASE_OUT_QUINT,
    },
  }),
};

const labelVariants: Variants = {
  hidden: { opacity: 0, y: 4 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: LABEL_DURATION,
      delay: LINE_START + i * STAGGER + LINE_DURATION + 0.05,
      ease: EASE_OUT_QUINT,
    },
  }),
};

export function ServiceAreas() {
  const viewport = { once: true, margin: "-60px" };
  const reduce = useReducedMotion();
  const [highlighted, setHighlighted] = useState<string | null>(null);

  return (
    <section
      id="areas"
      className="relative py-24 sm:py-32 scroll-mt-24 bg-[var(--surface-tint)] overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 topo-lines opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <motion.div
        aria-hidden="true"
        className="absolute -top-32 -right-32 h-[24rem] w-[24rem] rounded-full bg-[oklch(0.68_0.18_145/0.22)] blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.06, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -bottom-28 -left-24 h-[20rem] w-[20rem] rounded-full bg-[oklch(0.68_0.18_145/0.18)] blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.08, 1], opacity: [0.65, 1, 0.65] }}
        transition={{ duration: 7, repeat: Infinity, ease: [0.45, 0, 0.55, 1], delay: 3 }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.65 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-ink-600 font-semibold">
            <MapPin className="h-3.5 w-3.5 text-grass-700" />
            <span>Where we clean</span>
          </div>
          <h2 className="mt-3 font-display font-extrabold text-display-1 text-ink-950 text-balance leading-[1.05]">
            Based in Rochester Hills.{" "}
            <span className="italic font-medium text-ink-700">Serving Oakland County.</span>
          </h2>
          <p className="mt-4 text-ink-700 text-lg leading-relaxed max-w-md">
            Sixteen neighborhoods, dispatch within the hour. Outside our zone? Drop your ZIP at
            checkout and we&apos;ll tell you in 60 seconds.
          </p>
        </motion.div>

        <motion.svg
          viewBox="0 0 800 520"
          className="mt-12 w-full h-auto"
          role="img"
          aria-label={`Service map: Rochester Hills HQ connected to ${CITIES.map((c) => c.name).join(", ")}`}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.path
            d="M 110 110 L 650 108 Q 700 112 706 152 L 712 280 Q 716 380 668 410 L 460 426 Q 260 432 156 408 Q 116 400 108 360 L 100 220 Q 96 144 110 110 Z"
            fill="oklch(0.65 0.13 220 / 0.06)"
            stroke="oklch(0.65 0.13 220 / 0.32)"
            strokeWidth="1.6"
            strokeLinejoin="round"
            variants={{
              hidden: { opacity: 0, pathLength: 0 },
              show: {
                opacity: 1,
                pathLength: 1,
                transition: { pathLength: { duration: 1.1, ease: EASE_OUT_QUINT }, opacity: { duration: 0.3 } },
              },
            }}
          />
          <motion.text
            x="130"
            y="146"
            fontSize="13"
            fontWeight="700"
            letterSpacing="2"
            fill="oklch(0.45 0.07 220)"
            fontFamily="sans-serif"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { delay: 0.85, duration: 0.4 } },
            }}
          >
            OAKLAND COUNTY, MI
          </motion.text>

          {CITIES.map((c, i) => {
            const isActive = highlighted === c.name;
            return (
              <motion.line
                key={`line-${c.name}`}
                x1={HQ.x}
                y1={HQ.y}
                x2={c.x}
                y2={c.y}
                stroke={isActive ? "oklch(0.62 0.17 145)" : "oklch(0.62 0.17 145 / 0.6)"}
                strokeWidth={isActive ? 2.4 : 1.5}
                strokeLinecap="round"
                strokeDasharray="3 4"
                animate={{ opacity: isActive ? 1 : 0.85 }}
                custom={i}
                variants={lineVariants}
              />
            );
          })}

          {/* HQ rotating outer ring */}
          {!reduce && (
            <motion.circle
              cx={HQ.x}
              cy={HQ.y}
              r={54}
              fill="none"
              stroke="oklch(0.62 0.17 145 / 0.25)"
              strokeWidth="1.5"
              strokeDasharray="4 8"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { delay: 0.3 } },
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: `${HQ.x}px ${HQ.y}px` }}
            />
          )}

          <motion.circle
            cx={HQ.x}
            cy={HQ.y}
            r={40}
            fill="oklch(0.68 0.18 145 / 0.14)"
            variants={{
              hidden: { scale: 0, opacity: 0 },
              show: {
                scale: [0, 1, 1.08, 1],
                opacity: [0, 1, 0.85, 1],
                transition: {
                  duration: 5,
                  ease: "easeInOut",
                  delay: 0.05,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              },
            }}
            style={{ transformOrigin: `${HQ.x}px ${HQ.y}px` }}
          />
          <motion.circle
            cx={HQ.x}
            cy={HQ.y}
            r={22}
            fill="oklch(0.68 0.18 145 / 0.28)"
            variants={{
              hidden: { scale: 0, opacity: 0 },
              show: { scale: 1, opacity: 1, transition: { duration: 0.6, delay: 0.1, ease: EASE_OUT_QUINT } },
            }}
            style={{ transformOrigin: `${HQ.x}px ${HQ.y}px` }}
          />

          <motion.circle
            cx={HQ.x}
            cy={HQ.y}
            r={10}
            fill="oklch(0.13 0.045 230)"
            stroke="oklch(0.62 0.17 145)"
            strokeWidth="3"
            variants={{
              hidden: { scale: 0, opacity: 0 },
              show: { scale: 1, opacity: 1, transition: { duration: 0.45, delay: 0.18, ease: EASE_OUT_QUINT } },
            }}
            style={{ transformOrigin: `${HQ.x}px ${HQ.y}px` }}
          />

          <motion.g
            variants={{
              hidden: { opacity: 0, y: 6 },
              show: { opacity: 1, y: 0, transition: { duration: LABEL_DURATION, delay: 0.45, ease: EASE_OUT_QUINT } },
            }}
          >
            <text
              x={HQ.x}
              y={HQ.y - 24}
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="oklch(0.13 0.045 230)"
              fontFamily="sans-serif"
            >
              {HQ.name}
            </text>
            <rect x={HQ.x - 58} y={HQ.y + 20} width="116" height="20" rx="10" fill="oklch(0.13 0.045 230)" />
            <text
              x={HQ.x}
              y={HQ.y + 34}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill="oklch(0.62 0.17 145)"
              letterSpacing="1.6"
              fontFamily="sans-serif"
            >
              HEADQUARTERS
            </text>
          </motion.g>

          {CITIES.map((c, i) => {
            const off = labelOffset(c.anchor);
            const isActive = highlighted === c.name;
            return (
              <g
                key={`pt-${c.name}`}
                onMouseEnter={() => setHighlighted(c.name)}
                onMouseLeave={() => setHighlighted(null)}
                style={{ cursor: "pointer" }}
              >
                <motion.circle
                  cx={c.x}
                  cy={c.y}
                  r={6}
                  fill="oklch(0.62 0.17 145)"
                  stroke="oklch(0.985 0.006 220)"
                  strokeWidth="2"
                  animate={{ scale: isActive ? 1.5 : 1 }}
                  transition={{ duration: 0.25, ease: EASE_OUT_QUINT }}
                  custom={i}
                  variants={dotVariants}
                  style={{ transformOrigin: `${c.x}px ${c.y}px` }}
                />
                {isActive && (
                  <motion.circle
                    cx={c.x}
                    cy={c.y}
                    r={14}
                    fill="oklch(0.68 0.18 145 / 0.25)"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ transformOrigin: `${c.x}px ${c.y}px` }}
                  />
                )}
                <motion.text
                  x={c.x + off.dx}
                  y={c.y + off.dy}
                  textAnchor={off.textAnchor}
                  fontSize={isActive ? 13 : 12}
                  fontWeight={isActive ? 700 : 600}
                  fill={isActive ? "oklch(0.15 0.045 230)" : "oklch(0.23 0.05 230)"}
                  fontFamily="sans-serif"
                  custom={i}
                  variants={labelVariants}
                  animate={{ y: 0 }}
                >
                  {c.name}
                </motion.text>
              </g>
            );
          })}
        </motion.svg>

        {/* City chips below the map, synced with hover */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.55, delay: 1.6 }}
          className="mt-10 flex flex-wrap gap-2"
        >
          {CITIES.map((c) => {
            const isActive = highlighted === c.name;
            return (
              <button
                key={c.name}
                type="button"
                onMouseEnter={() => setHighlighted(c.name)}
                onMouseLeave={() => setHighlighted(null)}
                className={`group relative inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-ink-950 text-white shadow-card"
                    : "bg-[var(--surface)] text-ink-800 border border-line-strong/40 hover:border-grass-500/40"
                }`}
              >
                <motion.span
                  animate={{ scale: isActive ? 1.4 : 1 }}
                  transition={{ duration: 0.2 }}
                  className={`inline-block h-1.5 w-1.5 rounded-full ${isActive ? "bg-grass-400" : "bg-grass-500"}`}
                />
                {c.name}
              </button>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, delay: 1.7 }}
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-700"
        >
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-grass-500" />
            <span className="font-semibold text-ink-950">16 neighborhoods</span>
            <span>covered</span>
          </span>
          <span className="text-line-strong">·</span>
          <span>Dispatch within the hour, most slots</span>
          <span className="text-line-strong">·</span>
          <span>Same-day available when slots are open</span>
        </motion.div>
      </div>
    </section>
  );
}
