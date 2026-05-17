"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * MoppedFloor — a brand-themed background scene: a glossy tile floor receding
 * to a horizon, with a detailed mop slowly sweeping across it. Pure SVG + CSS
 * + framer-motion; no canvas, no WebGL, no new deps.
 *
 * Layers (back → front):
 *   1. Cyan gradient base
 *   2. 3D perspective tile grid (animate-grid-flow)
 *   3. Glossy reflective overlay on the floor (mix-blend: screen)
 *   4. Drying wet patches (4 staggered pulses)
 *   5. Diagonal shine streak sweep (mix-blend: screen)
 *   6. The mop: wooden handle, metal ferrule, 22 fanned strands, water drips
 *
 * All motion is gated by useReducedMotion(). Fixed-positioned, pointer-events
 * none, z-index 0 — sits behind every section.
 */

// Precompute strand geometry so the component body stays clean. Each strand
// gets its own start position, length, curve, opacity, and gradient tone — so
// the head reads as fabric, not a row of identical sticks.
const STRANDS = Array.from({ length: 22 }).map((_, i) => {
  const t = i / 21;
  const startX = 56 + t * 48;
  const length = 60 + Math.sin(i * 0.7) * 5;
  const curveX = Math.sin(i * 1.3 + 0.4) * 6;
  const endX = startX + curveX;
  const ctrlX = startX + curveX * 0.45;
  const ctrlY = 178 + Math.sin(i * 0.9) * 4;
  const opacity = 0.6 + (1 - Math.abs(t - 0.5) * 0.7) * 0.4;
  const tone = i % 3;
  return { startX, endX, ctrlX, ctrlY, length, opacity, tone, key: i };
});

function Mop() {
  return (
    <svg
      viewBox="0 0 160 260"
      width="100%"
      height="auto"
      style={{ display: "block", overflow: "visible" }}
    >
      <defs>
        <linearGradient id="mopHandle" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.42 0.04 60)" />
          <stop offset="20%" stopColor="oklch(0.6 0.06 60)" />
          <stop offset="50%" stopColor="oklch(0.74 0.07 60)" />
          <stop offset="80%" stopColor="oklch(0.55 0.05 60)" />
          <stop offset="100%" stopColor="oklch(0.38 0.04 60)" />
        </linearGradient>
        <linearGradient id="mopHandleHi" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <linearGradient id="mopFerrule" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.35 0.02 230)" />
          <stop offset="20%" stopColor="oklch(0.82 0.04 230)" />
          <stop offset="50%" stopColor="oklch(0.65 0.04 230)" />
          <stop offset="80%" stopColor="oklch(0.45 0.03 230)" />
          <stop offset="100%" stopColor="oklch(0.3 0.02 230)" />
        </linearGradient>
        <linearGradient id="mopStrand0" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.94 0.02 220)" stopOpacity="1" />
          <stop offset="100%" stopColor="oklch(0.7 0.06 220)" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="mopStrand1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.9 0.03 220)" stopOpacity="1" />
          <stop offset="100%" stopColor="oklch(0.65 0.08 220)" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="mopStrand2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.97 0.015 220)" stopOpacity="1" />
          <stop offset="100%" stopColor="oklch(0.75 0.05 220)" stopOpacity="0.4" />
        </linearGradient>
        <filter id="mopShadowBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
        <filter id="strandSoft" x="-10%" y="-10%" width="120%" height="130%">
          <feGaussianBlur stdDeviation="0.7" />
        </filter>
      </defs>

      {/* Floor-contact shadow beneath the mop head */}
      <ellipse
        cx="80"
        cy="246"
        rx="58"
        ry="5.5"
        fill="black"
        opacity="0.22"
        filter="url(#mopShadowBlur)"
      />

      {/* Strand group — pivots from the ferrule base so the head sways naturally */}
      <motion.g
        animate={{ rotate: [-2.5, 2.5, -2.5] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          transformOrigin: "80px 168px",
          transformBox: "fill-box" as const,
        }}
      >
        {STRANDS.map((s) => (
          <path
            key={s.key}
            d={`M ${s.startX} 168 Q ${s.ctrlX} ${s.ctrlY} ${s.endX} ${168 + s.length}`}
            stroke={`url(#mopStrand${s.tone})`}
            strokeWidth="2.3"
            strokeLinecap="round"
            fill="none"
            opacity={s.opacity}
            filter="url(#strandSoft)"
          />
        ))}
      </motion.g>

      {/* Water drips falling from strand tips */}
      {[0.25, 0.5, 0.75].map((t, i) => (
        <motion.ellipse
          key={`drip-${i}`}
          cx={62 + t * 36}
          cy={236}
          rx="1.7"
          ry="2.7"
          fill="oklch(0.85 0.07 220)"
          animate={{
            cy: [236, 252, 236],
            ry: [2.7, 3.4, 2.7],
            opacity: [0.75, 0, 0.75],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeIn",
          }}
        />
      ))}

      {/* Ferrule (metal collar) */}
      <rect x="55" y="148" width="50" height="22" rx="5" fill="url(#mopFerrule)" />
      <rect x="55" y="148" width="50" height="3" rx="1" fill="rgba(255,255,255,0.55)" />
      <rect x="55" y="167" width="50" height="3" rx="1" fill="rgba(0,0,0,0.3)" />
      <circle cx="64" cy="159" r="1.4" fill="oklch(0.88 0.02 230)" />
      <circle cx="96" cy="159" r="1.4" fill="oklch(0.88 0.02 230)" />

      {/* Wooden handle */}
      <rect x="74" y="8" width="12" height="140" rx="6" fill="url(#mopHandle)" />
      {/* Specular highlight stripe */}
      <rect x="76.5" y="10" width="2.2" height="138" rx="1" fill="url(#mopHandleHi)" />
      {/* Shadow stripe on the dark side */}
      <rect x="82.5" y="10" width="1.4" height="138" rx="0.7" fill="rgba(0,0,0,0.28)" />
      {/* Wood grain striations */}
      {[0, 1, 2, 3].map((g) => (
        <line
          key={`grain-${g}`}
          x1={77 + g * 2.4}
          y1={12}
          x2={77 + g * 2.4}
          y2={146}
          stroke="rgba(40,25,10,0.18)"
          strokeWidth="0.4"
        />
      ))}
      {/* Top cap */}
      <ellipse cx="80" cy="8" rx="6.5" ry="3.2" fill="url(#mopHandle)" />
      <ellipse cx="80" cy="6.8" rx="3" ry="1.3" fill="rgba(255,255,255,0.5)" />
    </svg>
  );
}

export function MoppedFloor() {
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
      {/* Cyan gradient base */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, transparent 0%, oklch(0.96 0.025 220 / 0.35) 45%, oklch(0.93 0.04 220 / 0.55) 100%)",
        }}
      />

      {/* 3D perspective floor */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          perspective: "1000px",
          perspectiveOrigin: "50% 38%",
        }}
      >
        {/* Tile grid lines */}
        <div
          className="animate-grid-flow"
          style={{
            position: "absolute",
            left: "-60%",
            right: "-60%",
            top: "38%",
            bottom: "-30%",
            backgroundImage:
              "linear-gradient(oklch(0.55 0.12 220 / 0.22) 1.2px, transparent 1.2px), " +
              "linear-gradient(90deg, oklch(0.55 0.12 220 / 0.22) 1.2px, transparent 1.2px)",
            backgroundSize: "96px 96px",
            transform: "rotateX(64deg)",
            transformOrigin: "center top",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 18%, black 78%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 18%, black 78%, transparent 100%)",
            willChange: "background-position",
          }}
        />
        {/* Glossy reflective overlay */}
        <div
          style={{
            position: "absolute",
            left: "-60%",
            right: "-60%",
            top: "38%",
            bottom: "-30%",
            backgroundImage:
              "radial-gradient(ellipse 70% 50% at 50% 30%, oklch(1 0 0 / 0.32) 0%, oklch(1 0 0 / 0.08) 40%, transparent 75%)",
            transform: "rotateX(64deg)",
            transformOrigin: "center top",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 22%, black 70%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 22%, black 70%, transparent 100%)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* Drying wet patches — staggered pulses across the floor area */}
      {[
        { left: "12%", top: "62%", w: 280, delay: 0.5 },
        { left: "48%", top: "70%", w: 260, delay: 3 },
        { left: "72%", top: "58%", w: 320, delay: 6 },
        { left: "28%", top: "82%", w: 240, delay: 9 },
      ].map((spot, i) => (
        <motion.div
          key={`wet-${i}`}
          animate={
            reduce
              ? { opacity: 0.3 }
              : {
                  opacity: [0, 0.55, 0],
                  scale: [0.85, 1.15, 0.95],
                }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            delay: spot.delay,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: spot.left,
            top: spot.top,
            width: spot.w,
            height: spot.w * 0.28,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, oklch(1 0 0 / 0.45) 0%, oklch(0.88 0.04 220 / 0.28) 40%, transparent 75%)",
            filter: "blur(14px)",
            transform: "skewX(-12deg)",
            mixBlendMode: "screen",
            willChange: "opacity, transform",
          }}
        />
      ))}

      {/* Diagonal shine streak sweep */}
      <motion.div
        animate={reduce ? undefined : { x: ["-50%", "180%"] }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 1.5,
        }}
        style={{
          position: "absolute",
          top: "40%",
          left: 0,
          width: "45%",
          height: "70%",
          backgroundImage:
            "linear-gradient(110deg, transparent 0%, oklch(1 0 0 / 0.2) 40%, oklch(0.96 0.04 220 / 0.35) 50%, oklch(1 0 0 / 0.2) 60%, transparent 100%)",
          filter: "blur(32px)",
          mixBlendMode: "screen",
          willChange: "transform",
        }}
      />

      {/* The mop — meandering 7-point path across the viewport */}
      <motion.div
        animate={
          reduce
            ? undefined
            : {
                x: ["-10vw", "28vw", "55vw", "92vw", "65vw", "30vw", "-10vw"],
                y: ["48vh", "62vh", "44vh", "58vh", "48vh", "66vh", "48vh"],
                rotate: [-10, 5, -3, 12, -5, 8, -10],
              }
        }
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "clamp(120px, 14vw, 200px)",
          opacity: 0.48,
          filter: "drop-shadow(0 14px 22px rgba(15, 45, 80, 0.22))",
          willChange: "transform",
        }}
      >
        <Mop />
      </motion.div>
    </div>
  );
}
