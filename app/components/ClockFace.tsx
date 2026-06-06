"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Animated analog clock face. Hour hand gently oscillates, minute hand ticks
 * (`clock-minute-tick`), and the second hand sweeps a full revolution every 60s
 * (`clock-second` — keyframes live in app/globals.css). Honors
 * prefers-reduced-motion. Pass `className` to size/position the SVG; the default
 * matches the home page's "60 sec" stat tile usage.
 */
export function ClockFace({
  className = "absolute -top-2 -right-2 h-20 w-20 opacity-95",
}: {
  className?: string;
}) {
  const reduce = useReducedMotion();
  // 12 tick marks around the face. Major ticks at 12/3/6/9 are longer/bolder.
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 * Math.PI) / 180;
    const isMajor = i % 3 === 0;
    const outerR = 46;
    const innerR = isMajor ? 39 : 42;
    const cx = 50 + Math.sin(angle) * outerR;
    const cy = 50 - Math.cos(angle) * outerR;
    const ix = 50 + Math.sin(angle) * innerR;
    const iy = 50 - Math.cos(angle) * innerR;
    return { x1: cx, y1: cy, x2: ix, y2: iy, isMajor };
  });

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      {/* Face */}
      <circle cx="50" cy="50" r="48" fill="oklch(0.99 0.005 220)" stroke="oklch(0.88 0.015 220)" strokeWidth="1.5" />

      {/* Ticks */}
      {ticks.map((t, i) => (
        <line
          key={i}
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke={t.isMajor ? "oklch(0.23 0.05 230)" : "oklch(0.62 0.025 230)"}
          strokeWidth={t.isMajor ? 2.2 : 1.2}
          strokeLinecap="round"
        />
      ))}

      {/* Hour hand — anchored near 10 (10:10 classic ad pose), with a very
          gentle oscillation so the clock feels alive. */}
      <motion.g
        style={{ originX: "50px", originY: "50px" }}
        animate={reduce ? undefined : { rotate: [-1, 1.2, -1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      >
        <line
          x1="50"
          y1="50"
          x2="34"
          y2="38"
          stroke="oklch(0.23 0.05 230)"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
      </motion.g>

      {/* Minute hand — pointing to 2 (10:10 pose) with a softer oscillation
          slightly offset in phase from the hour hand for natural motion. */}
      <motion.g
        style={{
          transformOrigin: "50px 50px",
          transformBox: "fill-box",
          animation: reduce ? undefined : "clock-minute-tick 9s ease-in-out infinite",
        }}
      >
        <line
          x1="50"
          y1="50"
          x2="68"
          y2="34"
          stroke="oklch(0.23 0.05 230)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </motion.g>

      {/* Second hand — full revolution every 60s. Pure CSS keyframe so the
          rotation runs on the compositor with zero per-frame JS. */}
      <motion.g
        style={{
          transformOrigin: "50px 50px",
          transformBox: "fill-box",
          animation: reduce ? undefined : "clock-second 60s linear infinite",
        }}
      >
        <line
          x1="50"
          y1="56"
          x2="50"
          y2="16"
          stroke="oklch(0.58 0.15 238)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="50" cy="16" r="2" fill="oklch(0.58 0.15 238)" />
      </motion.g>

      {/* Center pivot */}
      <circle cx="50" cy="50" r="2.6" fill="oklch(0.13 0.045 230)" />
      <circle cx="50" cy="50" r="1" fill="oklch(0.58 0.15 238)" />
    </svg>
  );
}
