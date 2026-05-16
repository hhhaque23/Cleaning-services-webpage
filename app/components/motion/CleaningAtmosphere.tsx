"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

// Deterministic pseudo-random so SSR + CSR markup match on first paint.
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Sparkle = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotate: number;
  twinkleDelay: number;
  twinkleDuration: number;
  tint: "grass" | "cyan" | "warm";
  twinkles: boolean;
};

type Bubble = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  driftDelay: number;
  driftDuration: number;
  tint: "grass" | "cyan";
  drifts: boolean;
};

const TINT_FILL: Record<Sparkle["tint"], string> = {
  grass: "oklch(0.68 0.18 145)",
  cyan: "oklch(0.65 0.13 220)",
  warm: "oklch(0.78 0.14 95)",
};

const BUBBLE_FILL: Record<Bubble["tint"], string> = {
  grass: "oklch(0.78 0.16 145)",
  cyan: "oklch(0.72 0.12 220)",
};

function seedSparkles(count: number): Sparkle[] {
  const rand = mulberry32(11);
  const out: Sparkle[] = [];
  const tints: Sparkle["tint"][] = ["grass", "cyan", "warm"];
  for (let i = 0; i < count; i++) {
    out.push({
      x: rand() * 100,
      y: rand() * 100,
      size: 4 + rand() * 7,
      opacity: 0.08 + rand() * 0.07,
      rotate: rand() * 90 - 45,
      twinkleDelay: rand() * 6,
      twinkleDuration: 3 + rand() * 4,
      tint: tints[Math.floor(rand() * tints.length)],
      twinkles: rand() < 0.45,
    });
  }
  return out;
}

function seedBubbles(count: number): Bubble[] {
  const rand = mulberry32(31);
  const out: Bubble[] = [];
  const tints: Bubble["tint"][] = ["grass", "cyan"];
  for (let i = 0; i < count; i++) {
    out.push({
      x: rand() * 100,
      y: rand() * 100,
      size: 22 + rand() * 50,
      opacity: 0.04 + rand() * 0.07,
      driftDelay: rand() * 10,
      driftDuration: 14 + rand() * 12,
      tint: tints[Math.floor(rand() * tints.length)],
      drifts: rand() < 0.35,
    });
  }
  return out;
}

function SparkleGlyph({ size, fill, rotate }: { size: number; fill: string; rotate: number }) {
  // 4-point star matching the Pristine logo glyph.
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden
    >
      <path d="M12 2 L13.5 9.2 Q14 10.2 15 10.5 L22 12 L15 13.5 Q14 13.8 13.5 14.8 L12 22 L10.5 14.8 Q10 13.8 9 13.5 L2 12 L9 10.5 Q10 10.2 10.5 9.2 Z" />
    </svg>
  );
}

function BubbleGlyph({ size, fill }: { size: number; fill: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      <defs>
        <radialGradient id={`bub-${size}-${fill.length}`} cx="32%" cy="28%" r="65%">
          <stop offset="0%" stopColor="oklch(0.985 0.006 220 / 0.85)" />
          <stop offset="55%" stopColor={fill} stopOpacity="0.55" />
          <stop offset="100%" stopColor={fill} stopOpacity="0.08" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="44" fill={`url(#bub-${size}-${fill.length})`} />
      <circle
        cx="36"
        cy="32"
        r="9"
        fill="oklch(0.985 0.006 220 / 0.7)"
        opacity="0.85"
      />
      <circle
        cx="62"
        cy="22"
        r="3"
        fill="oklch(0.985 0.006 220 / 0.9)"
      />
    </svg>
  );
}

export function CleaningAtmosphere() {
  const reduce = useReducedMotion();
  const sparkles = useMemo(() => seedSparkles(24), []);
  const bubbles = useMemo(() => seedBubbles(10), []);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
        contain: "paint",
      }}
    >
      {/* Bubbles sit underneath sparkles */}
      {bubbles.map((b, i) => {
        const fill = BUBBLE_FILL[b.tint];
        const node = <BubbleGlyph size={b.size} fill={fill} />;
        const baseStyle: React.CSSProperties = {
          position: "absolute",
          left: `${b.x}%`,
          top: `${b.y}%`,
          opacity: b.opacity,
          transform: "translate(-50%, -50%)",
          willChange: b.drifts && !reduce ? "transform" : undefined,
        };
        if (b.drifts && !reduce) {
          return (
            <motion.div
              key={`b-${i}`}
              style={baseStyle}
              animate={{ y: [0, -20, 0], x: [0, 6, 0] }}
              transition={{
                duration: b.driftDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: b.driftDelay,
              }}
            >
              {node}
            </motion.div>
          );
        }
        return (
          <div key={`b-${i}`} style={baseStyle}>
            {node}
          </div>
        );
      })}

      {/* Sparkles */}
      {sparkles.map((s, i) => {
        const fill = TINT_FILL[s.tint];
        const node = <SparkleGlyph size={s.size} fill={fill} rotate={s.rotate} />;
        const baseStyle: React.CSSProperties = {
          position: "absolute",
          left: `${s.x}%`,
          top: `${s.y}%`,
          opacity: s.opacity,
          transform: "translate(-50%, -50%)",
          willChange: s.twinkles && !reduce ? "opacity, transform" : undefined,
        };
        if (s.twinkles && !reduce) {
          return (
            <motion.div
              key={`s-${i}`}
              style={baseStyle}
              animate={{
                opacity: [s.opacity * 0.4, s.opacity * 1.4, s.opacity * 0.4],
                scale: [0.85, 1.15, 0.85],
              }}
              transition={{
                duration: s.twinkleDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: s.twinkleDelay,
              }}
            >
              {node}
            </motion.div>
          );
        }
        return (
          <div key={`s-${i}`} style={baseStyle}>
            {node}
          </div>
        );
      })}
    </div>
  );
}
