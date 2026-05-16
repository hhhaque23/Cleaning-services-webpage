"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { EASE_OUT_QUINT } from "./motion-primitives";

type ConfettiProps = {
  count?: number;
  duration?: number;
  spread?: number;
  className?: string;
};

const COLORS = [
  "oklch(0.68 0.18 145)",
  "oklch(0.78 0.16 145)",
  "oklch(0.65 0.13 220)",
  "oklch(0.85 0.14 75)",
];

export function Confetti({
  count = 36,
  duration = 1.8,
  spread = 320,
  className,
}: ConfettiProps) {
  const reduce = useReducedMotion();

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
      const dist = spread * (0.55 + Math.random() * 0.55);
      const x = Math.cos(angle) * dist;
      const y = Math.sin(angle) * dist * 0.85 - 40;
      const rot = (Math.random() - 0.5) * 540;
      const color = COLORS[i % COLORS.length];
      const size = 4 + Math.random() * 6;
      const delay = Math.random() * 0.12;
      return { x, y, rot, color, size, delay, i };
    });
  }, [count, spread]);

  if (reduce) return null;

  return (
    <div
      aria-hidden
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        display: "grid",
        placeItems: "center",
        overflow: "visible",
      }}
    >
      {particles.map((p) => (
        <motion.span
          key={p.i}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.6, rotate: 0 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 1, rotate: p.rot }}
          transition={{ duration, ease: EASE_OUT_QUINT, delay: p.delay }}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size * 1.4,
            borderRadius: 2,
            background: p.color,
            transformOrigin: "center",
          }}
        />
      ))}
    </div>
  );
}
