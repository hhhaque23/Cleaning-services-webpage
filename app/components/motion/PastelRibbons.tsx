"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * PastelRibbons — soft layered SVG ribbons in pastel cyan / cream / peach /
 * rose with a rainbow refraction stroke on the leading edge. Each ribbon
 * drifts a few pixels on its own long loop so the whole scene breathes
 * without ever pulling focus. Pure SVG + CSS + framer-motion — no canvas,
 * no WebGL, no new deps.
 *
 * Layers (back → front):
 *   1. Pastel cross-fade base gradient (cream → rose → sky → peach)
 *   2. Sky-blue ribbon wrapping the upper-right
 *   3. Two teal cascade ribbons on the right
 *   4. Large cream sheet filling the lower half
 *   5. Peach accent (mix-blend: screen) drifting through the middle
 *   6. Rose underlay at the bottom
 *   7. Two rainbow refraction strokes following the strongest curves
 */

export function PastelRibbons() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Soft pastel cross-fade base */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(125deg, oklch(0.97 0.018 30) 0%, oklch(0.96 0.022 350) 22%, oklch(0.97 0.014 220) 48%, oklch(0.97 0.018 200) 72%, oklch(0.96 0.025 45) 100%)",
        }}
      />

      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="rb-sky" x1="1" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.09 235)" stopOpacity="0.95" />
            <stop offset="55%" stopColor="oklch(0.87 0.06 220)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="oklch(0.93 0.04 200)" stopOpacity="0.22" />
          </linearGradient>
          <linearGradient id="rb-teal1" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.08 195)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="oklch(0.92 0.04 180)" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="rb-teal2" x1="1" y1="0" x2="0.2" y2="1">
            <stop offset="0%" stopColor="oklch(0.82 0.07 200)" stopOpacity="0.75" />
            <stop offset="100%" stopColor="oklch(0.93 0.035 175)" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="rb-cream" x1="0" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stopColor="oklch(0.99 0.005 80)" stopOpacity="0.92" />
            <stop offset="55%" stopColor="oklch(0.96 0.015 70)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="oklch(0.93 0.03 50)" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="rb-peach" x1="0" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="oklch(0.93 0.06 50)" stopOpacity="0.65" />
            <stop offset="100%" stopColor="oklch(0.95 0.035 35)" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="rb-rose" x1="0" y1="0" x2="1" y2="0.4">
            <stop offset="0%" stopColor="oklch(0.93 0.04 0)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="oklch(0.96 0.022 350)" stopOpacity="0.3" />
          </linearGradient>
          {/* Rainbow refraction — light bending through a glass edge */}
          <linearGradient id="rb-rainbow" x1="0" y1="0" x2="1" y2="0.2">
            <stop offset="0%" stopColor="oklch(0.78 0.1 240)" stopOpacity="0" />
            <stop offset="22%" stopColor="oklch(0.85 0.08 200)" stopOpacity="0.55" />
            <stop offset="48%" stopColor="oklch(0.96 0.04 100)" stopOpacity="0.75" />
            <stop offset="72%" stopColor="oklch(0.88 0.07 50)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="oklch(0.87 0.05 0)" stopOpacity="0" />
          </linearGradient>
          {/* Soft far-offset drop shadow for the layered-paper depth */}
          <filter id="rb-shadow" x="-15%" y="-15%" width="130%" height="135%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="26" />
            <feOffset dy="22" result="off" />
            <feFlood floodColor="oklch(0.55 0.06 230)" floodOpacity="0.18" />
            <feComposite in2="off" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Sky-blue ribbon — wraps upper-right region */}
        <motion.path
          d="M 1440 0 L 1440 540 C 1290 510, 1180 450, 1040 420 C 880 388, 740 470, 580 388 C 440 305, 290 245, 150 285 C 65 308, 20 240, 0 130 L 0 0 Z"
          fill="url(#rb-sky)"
          filter="url(#rb-shadow)"
          animate={reduce ? undefined : { x: [0, 9, 0, -9, 0], y: [0, -5, 0, 5, 0] }}
          transition={{ duration: 48, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Main teal cascade */}
        <motion.path
          d="M 1440 290 C 1290 370, 1170 320, 1020 400 C 880 470, 760 410, 620 480 C 500 540, 400 510, 280 470 L 280 590 C 420 620, 580 600, 720 570 C 900 530, 1060 580, 1230 540 C 1340 510, 1410 480, 1440 460 Z"
          fill="url(#rb-teal1)"
          filter="url(#rb-shadow)"
          animate={reduce ? undefined : { x: [0, 6, 0, -6, 0], y: [0, -3, 0, 3, 0] }}
          transition={{ duration: 52, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Secondary teal — thinner */}
        <motion.path
          d="M 1440 400 C 1320 460, 1220 430, 1100 470 C 980 510, 860 470, 740 510 L 740 600 C 880 580, 1020 590, 1160 570 C 1280 555, 1370 540, 1440 530 Z"
          fill="url(#rb-teal2)"
          opacity="0.85"
          animate={reduce ? undefined : { x: [0, -7, 0, 7, 0], y: [0, 3, 0, -3, 0] }}
          transition={{ duration: 58, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />

        {/* Cream sheet — the main lower body */}
        <motion.path
          d="M 0 900 L 0 360 C 130 420, 280 400, 440 450 C 620 500, 760 580, 920 600 C 1100 620, 1240 560, 1360 620 C 1410 645, 1440 700, 1440 770 L 1440 900 Z"
          fill="url(#rb-cream)"
          filter="url(#rb-shadow)"
          animate={reduce ? undefined : { x: [0, -7, 0, 7, 0], y: [0, 5, 0, -5, 0] }}
          transition={{ duration: 56, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Peach accent — warm horizontal sweep */}
        <motion.path
          d="M 0 580 C 180 540, 360 620, 540 640 C 720 660, 880 600, 1080 640 C 1240 670, 1360 720, 1440 700 L 1440 780 C 1280 790, 1080 740, 880 760 C 660 780, 440 740, 240 720 C 130 710, 50 670, 0 640 Z"
          fill="url(#rb-peach)"
          animate={reduce ? undefined : { x: [0, 11, 0, -11, 0], y: [0, -4, 0, 4, 0] }}
          transition={{ duration: 64, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ mixBlendMode: "screen" }}
        />

        {/* Rose underlay at the bottom */}
        <motion.path
          d="M 0 740 C 200 770, 400 780, 620 760 C 820 740, 1020 700, 1240 720 C 1340 730, 1410 740, 1440 750 L 1440 900 L 0 900 Z"
          fill="url(#rb-rose)"
          animate={reduce ? undefined : { x: [0, 8, 0, -8, 0] }}
          transition={{ duration: 44, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />

        {/* Rainbow refraction edge — follows the strongest upper curve */}
        <motion.path
          d="M 1440 540 C 1290 510, 1180 450, 1040 420 C 880 388, 740 470, 580 388 C 440 305, 290 245, 150 285 C 65 308, 20 240, 0 130"
          fill="none"
          stroke="url(#rb-rainbow)"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.7"
          animate={reduce ? undefined : { x: [0, 9, 0, -9, 0], y: [0, -5, 0, 5, 0] }}
          transition={{ duration: 48, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Secondary rainbow stroke on the cream boundary */}
        <motion.path
          d="M 0 360 C 130 420, 280 400, 440 450 C 620 500, 760 580, 920 600 C 1100 620, 1240 560, 1360 620"
          fill="none"
          stroke="url(#rb-rainbow)"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.5"
          animate={reduce ? undefined : { x: [0, -7, 0, 7, 0], y: [0, 5, 0, -5, 0] }}
          transition={{ duration: 56, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
