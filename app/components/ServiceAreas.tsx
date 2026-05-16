"use client";

import { motion } from "framer-motion";

type City = {
  name: string;
  x: number;
  y: number;
  primary?: boolean;
  anchor?: "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";
};

// Positions inside an 720x440 viewBox, laid out roughly to metro Detroit
// geography (Rochester Hills central, others north/east/south by direction).
const HQ: City = { name: "Rochester Hills", x: 372, y: 234, primary: true };

const CITIES: City[] = [
  { name: "Oxford", x: 348, y: 50, anchor: "n" },
  { name: "Lake Orion", x: 322, y: 108, anchor: "w" },
  { name: "Rochester", x: 372, y: 164, anchor: "e" },
  { name: "Shelby Twp", x: 502, y: 210, anchor: "e" },
  { name: "Sterling Heights", x: 538, y: 286, anchor: "e" },
  { name: "Madison Heights", x: 432, y: 358, anchor: "s" },
  { name: "Clawson", x: 360, y: 388, anchor: "s" },
  { name: "Berkley", x: 296, y: 376, anchor: "sw" },
  { name: "Royal Oak", x: 350, y: 332, anchor: "s" },
  { name: "Troy", x: 358, y: 282, anchor: "s" },
  { name: "Birmingham", x: 286, y: 304, anchor: "sw" },
  { name: "Bloomfield Hills", x: 248, y: 264, anchor: "w" },
  { name: "Bloomfield Twp", x: 220, y: 214, anchor: "w" },
  { name: "Beverly Hills", x: 192, y: 296, anchor: "w" },
  { name: "Auburn Hills", x: 290, y: 220, anchor: "w" },
];

const labelOffset = (anchor: City["anchor"]) => {
  switch (anchor) {
    case "n":
      return { dx: 0, dy: -14, textAnchor: "middle" as const };
    case "s":
      return { dx: 0, dy: 18, textAnchor: "middle" as const };
    case "e":
      return { dx: 10, dy: 4, textAnchor: "start" as const };
    case "w":
      return { dx: -10, dy: 4, textAnchor: "end" as const };
    case "ne":
      return { dx: 8, dy: -8, textAnchor: "start" as const };
    case "nw":
      return { dx: -8, dy: -8, textAnchor: "end" as const };
    case "se":
      return { dx: 8, dy: 14, textAnchor: "start" as const };
    case "sw":
      return { dx: -8, dy: 14, textAnchor: "end" as const };
    default:
      return { dx: 10, dy: 4, textAnchor: "start" as const };
  }
};

// Simplified Lower Peninsula of Michigan (the "mitten"), used as a faint
// silhouette behind the cluster diagram.
const MITTEN_PATH =
  "M 92 96 Q 110 64 144 60 Q 180 58 214 76 L 300 78 Q 332 60 366 70 L 408 78 Q 438 88 446 116 L 452 168 Q 480 184 494 220 L 502 282 Q 502 314 484 326 L 446 332 Q 422 326 412 304 L 404 252 Q 390 268 380 286 L 380 348 Q 376 388 360 412 L 312 426 Q 244 432 184 416 Q 124 400 100 364 Q 80 320 82 256 Q 84 196 92 152 Z";

// Same Mitten, scaled down for the inline glyph next to the eyebrow.
function MichiganGlyph() {
  return (
    <svg
      viewBox="0 0 600 500"
      width="22"
      height="20"
      aria-hidden="true"
      className="text-ink-900"
    >
      <path d={MITTEN_PATH} fill="currentColor" />
      {/* Rochester Hills dot, in the southeast region */}
      <circle cx="372" cy="234" r="34" fill="oklch(0.62 0.17 145)" />
    </svg>
  );
}

export function ServiceAreas() {
  const viewport = { once: true, margin: "-60px" };
  const STAGGER = 0.07;
  const LINE_DURATION = 0.55;
  const DOT_DURATION = 0.35;
  const LABEL_DURATION = 0.3;

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
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-ink-600 font-semibold">
            <MichiganGlyph />
            <span>Where we clean</span>
          </div>
          <h2 className="mt-3 font-display font-extrabold text-display-1 text-ink-950 text-balance">
            Based in Rochester Hills.{" "}
            <span className="italic font-medium text-ink-700">
              Serving metro Detroit.
            </span>
          </h2>
          <p className="mt-4 text-ink-700 text-lg leading-relaxed max-w-md">
            Sixteen neighborhoods, dispatch within the hour. Outside our zone?
            Drop your ZIP at checkout and we&apos;ll tell you in 60 seconds.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12"
        >
          <svg
            viewBox="0 0 720 440"
            className="w-full h-auto"
            role="img"
            aria-label={`Service map: Rochester Hills HQ connected to ${CITIES.map((c) => c.name).join(", ")}`}
          >
            {/* Michigan mitten silhouette in the background */}
            <g transform="translate(220, 30) scale(0.6)">
              <path
                d={MITTEN_PATH}
                fill="oklch(0.65 0.13 220 / 0.06)"
                stroke="oklch(0.65 0.13 220 / 0.16)"
                strokeWidth="2"
              />
              {/* Tiny SE Michigan label on the mitten */}
              <text
                x="380"
                y="380"
                fontSize="22"
                fontWeight="700"
                fill="oklch(0.65 0.13 220 / 0.35)"
                fontFamily="sans-serif"
                letterSpacing="2"
              >
                SE MICHIGAN
              </text>
            </g>

            {/* Connecting lines from HQ to each city */}
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
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={viewport}
                transition={{
                  pathLength: { duration: LINE_DURATION, delay: 0.3 + i * STAGGER, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.2, delay: 0.3 + i * STAGGER },
                }}
              />
            ))}

            {/* HQ halo (cheap stacked translucent circles, no filter blur) */}
            <motion.circle
              cx={HQ.x}
              cy={HQ.y}
              r={32}
              fill="oklch(0.68 0.18 145 / 0.12)"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={viewport}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: `${HQ.x}px ${HQ.y}px` }}
            />
            <motion.circle
              cx={HQ.x}
              cy={HQ.y}
              r={20}
              fill="oklch(0.68 0.18 145 / 0.24)"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={viewport}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
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
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={viewport}
              transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: `${HQ.x}px ${HQ.y}px` }}
            />

            {/* HQ label + HQ pill */}
            <motion.g
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: LABEL_DURATION, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
              <rect
                x={HQ.x - 50}
                y={HQ.y + 18}
                width="100"
                height="18"
                rx="9"
                fill="oklch(0.13 0.045 230)"
              />
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

            {/* Satellite city dots */}
            {CITIES.map((c, i) => {
              const lineEndT = 0.3 + i * STAGGER + LINE_DURATION;
              return (
                <motion.circle
                  key={`dot-${c.name}`}
                  cx={c.x}
                  cy={c.y}
                  r={5}
                  fill="oklch(0.62 0.17 145)"
                  stroke="oklch(0.985 0.006 220)"
                  strokeWidth="2"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={viewport}
                  transition={{
                    duration: DOT_DURATION,
                    delay: lineEndT - 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ transformOrigin: `${c.x}px ${c.y}px` }}
                />
              );
            })}

            {/* Satellite city labels */}
            {CITIES.map((c, i) => {
              const lineEndT = 0.3 + i * STAGGER + LINE_DURATION;
              const off = labelOffset(c.anchor);
              return (
                <motion.text
                  key={`label-${c.name}`}
                  x={c.x + off.dx}
                  y={c.y + off.dy}
                  textAnchor={off.textAnchor}
                  fontSize="11"
                  fontWeight="600"
                  fill="oklch(0.23 0.05 230)"
                  fontFamily="sans-serif"
                  initial={{ opacity: 0, y: c.y + off.dy + 4 }}
                  whileInView={{ opacity: 1, y: c.y + off.dy }}
                  viewport={viewport}
                  transition={{
                    duration: LABEL_DURATION,
                    delay: lineEndT + 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {c.name}
                </motion.text>
              );
            })}
          </svg>
        </motion.div>

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
