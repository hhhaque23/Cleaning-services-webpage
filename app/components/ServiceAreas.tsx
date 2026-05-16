"use client";

import { motion, type Variants } from "framer-motion";
import { MapPin } from "lucide-react";

type Anchor = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";
type City = { name: string; x: number; y: number; anchor: Anchor };

// ViewBox 720 × 460. Oakland County outline at (80, 80) → (640, 380).
// HQ Rochester Hills near the center-east of the county.
const HQ = { name: "Rochester Hills", x: 408, y: 200 };

const CITIES: City[] = [
  // North band
  { name: "Oxford", x: 360, y: 110, anchor: "n" },
  { name: "Lake Orion", x: 330, y: 158, anchor: "w" },
  // East cluster
  { name: "Rochester", x: 440, y: 152, anchor: "ne" },
  { name: "Auburn Hills", x: 348, y: 248, anchor: "sw" },
  { name: "Shelby Twp", x: 552, y: 188, anchor: "e" },
  { name: "Sterling Heights", x: 568, y: 260, anchor: "e" },
  // West cluster
  { name: "Bloomfield Twp", x: 232, y: 200, anchor: "w" },
  { name: "Bloomfield Hills", x: 268, y: 250, anchor: "w" },
  { name: "Beverly Hills", x: 212, y: 296, anchor: "w" },
  // South band
  { name: "Birmingham", x: 308, y: 306, anchor: "sw" },
  { name: "Troy", x: 396, y: 296, anchor: "ne" },
  { name: "Madison Heights", x: 488, y: 320, anchor: "e" },
  { name: "Royal Oak", x: 388, y: 348, anchor: "s" },
  { name: "Clawson", x: 320, y: 348, anchor: "s" },
  { name: "Berkley", x: 252, y: 348, anchor: "sw" },
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

const STAGGER = 0.07;
const LINE_DURATION = 0.55;
const DOT_DURATION = 0.32;
const LABEL_DURATION = 0.3;
const LINE_START = 0.35;

const lineVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: LINE_DURATION, delay: LINE_START + i * STAGGER, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.2, delay: LINE_START + i * STAGGER },
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
      ease: [0.22, 1, 0.36, 1],
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
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function ServiceAreas() {
  const viewport = { once: true, margin: "-60px" };

  return (
    <section
      id="areas"
      className="relative py-16 sm:py-20 scroll-mt-24 bg-[var(--surface-tint)] overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute -bottom-24 right-0 h-[22rem] w-[22rem] rounded-full bg-[oklch(0.78_0.16_145/0.1)] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-ink-600 font-semibold">
            <MapPin className="h-3.5 w-3.5 text-grass-700" />
            <span>Where we clean</span>
          </div>
          <h2 className="mt-3 font-display font-extrabold text-display-1 text-ink-950 text-balance">
            Based in Rochester Hills.{" "}
            <span className="italic font-medium text-ink-700">
              Serving Oakland County.
            </span>
          </h2>
          <p className="mt-4 text-ink-700 text-lg leading-relaxed max-w-md">
            Sixteen neighborhoods, dispatch within the hour. Outside our zone?
            Drop your ZIP at checkout and we&apos;ll tell you in 60 seconds.
          </p>
        </motion.div>

        <motion.svg
          viewBox="0 0 720 460"
          className="mt-12 w-full h-auto"
          role="img"
          aria-label={`Service map: Rochester Hills HQ connected to ${CITIES.map((c) => c.name).join(", ")}`}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {/* Oakland County outline */}
          <motion.path
            d="M 90 90 L 590 92 Q 632 96 638 132 L 642 240 Q 646 320 612 350 L 410 372 Q 240 380 130 358 Q 92 350 84 312 L 80 200 Q 78 130 90 90 Z"
            fill="oklch(0.65 0.13 220 / 0.06)"
            stroke="oklch(0.65 0.13 220 / 0.32)"
            strokeWidth="1.6"
            strokeLinejoin="round"
            initial={{ opacity: 0, pathLength: 0 }}
            variants={{
              hidden: { opacity: 0, pathLength: 0 },
              show: {
                opacity: 1,
                pathLength: 1,
                transition: { pathLength: { duration: 1.1, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.3 } },
              },
            }}
          />
          <motion.text
            x="108"
            y="124"
            fontSize="13"
            fontWeight="700"
            letterSpacing="2"
            fill="oklch(0.45 0.07 220)"
            fontFamily="sans-serif"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { delay: 0.7, duration: 0.4 } },
            }}
          >
            OAKLAND COUNTY, MI
          </motion.text>

          {/* Connecting lines */}
          {CITIES.map((c, i) => (
            <motion.line
              key={`line-${c.name}`}
              x1={HQ.x}
              y1={HQ.y}
              x2={c.x}
              y2={c.y}
              stroke="oklch(0.62 0.17 145 / 0.55)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="3 4"
              custom={i}
              variants={lineVariants}
            />
          ))}

          {/* HQ halo (cheap stacked translucent circles) */}
          <motion.circle
            cx={HQ.x}
            cy={HQ.y}
            r={32}
            fill="oklch(0.68 0.18 145 / 0.12)"
            variants={{
              hidden: { scale: 0, opacity: 0 },
              show: { scale: 1, opacity: 1, transition: { duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] } },
            }}
            style={{ transformOrigin: `${HQ.x}px ${HQ.y}px` }}
          />
          <motion.circle
            cx={HQ.x}
            cy={HQ.y}
            r={20}
            fill="oklch(0.68 0.18 145 / 0.24)"
            variants={{
              hidden: { scale: 0, opacity: 0 },
              show: { scale: 1, opacity: 1, transition: { duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] } },
            }}
            style={{ transformOrigin: `${HQ.x}px ${HQ.y}px` }}
          />

          {/* HQ dot */}
          <motion.circle
            cx={HQ.x}
            cy={HQ.y}
            r={9}
            fill="oklch(0.13 0.045 230)"
            stroke="oklch(0.62 0.17 145)"
            strokeWidth="3"
            variants={{
              hidden: { scale: 0, opacity: 0 },
              show: { scale: 1, opacity: 1, transition: { duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] } },
            }}
            style={{ transformOrigin: `${HQ.x}px ${HQ.y}px` }}
          />

          {/* HQ label + HEADQUARTERS pill */}
          <motion.g
            variants={{
              hidden: { opacity: 0, y: 6 },
              show: { opacity: 1, y: 0, transition: { duration: LABEL_DURATION, delay: 0.4, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            <text
              x={HQ.x}
              y={HQ.y - 22}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="oklch(0.13 0.045 230)"
              fontFamily="sans-serif"
            >
              {HQ.name}
            </text>
            <rect x={HQ.x - 54} y={HQ.y + 18} width="108" height="18" rx="9" fill="oklch(0.13 0.045 230)" />
            <text
              x={HQ.x}
              y={HQ.y + 31}
              textAnchor="middle"
              fontSize="9"
              fontWeight="700"
              fill="oklch(0.62 0.17 145)"
              letterSpacing="1.6"
              fontFamily="sans-serif"
            >
              HEADQUARTERS
            </text>
          </motion.g>

          {/* Satellite dots + labels */}
          {CITIES.map((c, i) => {
            const off = labelOffset(c.anchor);
            return (
              <g key={`pt-${c.name}`}>
                <motion.circle
                  cx={c.x}
                  cy={c.y}
                  r={5}
                  fill="oklch(0.62 0.17 145)"
                  stroke="oklch(0.985 0.006 220)"
                  strokeWidth="2"
                  custom={i}
                  variants={dotVariants}
                  style={{ transformOrigin: `${c.x}px ${c.y}px` }}
                />
                <motion.text
                  x={c.x + off.dx}
                  y={c.y + off.dy}
                  textAnchor={off.textAnchor}
                  fontSize="11.5"
                  fontWeight="600"
                  fill="oklch(0.23 0.05 230)"
                  fontFamily="sans-serif"
                  custom={i}
                  variants={labelVariants}
                >
                  {c.name}
                </motion.text>
              </g>
            );
          })}
        </motion.svg>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, delay: 1.6 }}
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
