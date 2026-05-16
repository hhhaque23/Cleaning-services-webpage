"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { CSSProperties, ReactNode, useCallback, useRef } from "react";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  radius?: number;
  strength?: number;
  as?: "button" | "div" | "a";
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
};

export function MagneticButton({
  children,
  className,
  style,
  radius = 120,
  strength = 0.28,
  as = "div",
  href,
  onClick,
  ariaLabel,
  type,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 22, mass: 0.4 });

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduce) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > radius) {
        x.set(0);
        y.set(0);
        return;
      }
      x.set(dx * strength);
      y.set(dy * strength);
    },
    [radius, strength, reduce, x, y],
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const Comp = as === "a" ? motion.a : as === "button" ? motion.button : motion.div;

  return (
    <Comp
      ref={ref as React.Ref<any>}
      href={href}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={className}
      style={{ ...style, x: sx, y: sy, display: style?.display ?? "inline-flex" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={reduce ? undefined : { scale: 0.97 }}
    >
      {children}
    </Comp>
  );
}
