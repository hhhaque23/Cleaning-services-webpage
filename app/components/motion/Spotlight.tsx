"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { CSSProperties, ReactNode, useCallback, useRef } from "react";

type SpotlightProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  size?: number;
  intensity?: number;
  color?: string;
  rounded?: string;
  follow?: boolean;
};

/**
 * Spotlight: a cursor-following radial gradient overlay.
 * Place it as the first child of a `relative` container.
 * `follow=false` renders a centered static spotlight (good for static cards).
 */
export function Spotlight({
  children,
  className,
  style,
  size = 520,
  intensity = 0.22,
  color = "oklch(0.65 0.13 220)",
  rounded = "inherit",
  follow = true,
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(50);
  const y = useMotionValue(30);
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<{ clientX: number; clientY: number } | null>(null);

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      if (!follow || reduce) return;
      pendingRef.current = { clientX: e.clientX, clientY: e.clientY };
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const el = ref.current;
        const ev = pendingRef.current;
        if (!el || !ev) return;
        const rect = el.getBoundingClientRect();
        x.set(((ev.clientX - rect.left) / rect.width) * 100);
        y.set(((ev.clientY - rect.top) / rect.height) * 100);
      });
    },
    [follow, reduce, x, y],
  );

  const bg = useMotionTemplate`radial-gradient(${size}px circle at ${x}% ${y}%, ${color} 0%, transparent 70%)`;

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={className}
      style={{ position: "absolute", inset: 0, pointerEvents: "none", borderRadius: rounded, ...style }}
    >
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: bg,
          opacity: intensity,
          mixBlendMode: "screen",
          borderRadius: rounded,
        }}
      />
      {children}
    </div>
  );
}
