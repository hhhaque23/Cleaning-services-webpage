"use client";

import { CSSProperties, ReactNode } from "react";

type AnimatedBorderProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  radius?: string;
  active?: boolean;
  thickness?: number;
  speed?: number;
};

/**
 * AnimatedBorder: renders a rotating conic-gradient ring around its children.
 * Uses CSS animations for low cost; active=false keeps the ring at rest.
 */
export function AnimatedBorder({
  children,
  className,
  style,
  radius = "1rem",
  active = true,
  thickness = 1.5,
  speed = 6,
}: AnimatedBorderProps) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        borderRadius: radius,
        padding: thickness,
        ...style,
      }}
    >
      <div
        aria-hidden
        className={active ? "animate-border-spin" : ""}
        style={{
          position: "absolute",
          inset: -thickness,
          borderRadius: `calc(${radius} + ${thickness}px)`,
          background:
            "conic-gradient(from 0deg, oklch(0.65 0.13 220 / 0.0) 0deg, oklch(0.65 0.13 220 / 0.7) 60deg, oklch(0.68 0.18 145 / 0.7) 180deg, oklch(0.65 0.13 220 / 0.0) 280deg, oklch(0.65 0.13 220 / 0.0) 360deg)",
          opacity: active ? 1 : 0,
          transition: "opacity 280ms cubic-bezier(0.22, 1, 0.36, 1)",
          animationDuration: `${speed}s`,
          willChange: "transform",
        }}
      />
      <div
        style={{
          position: "relative",
          borderRadius: `calc(${radius} - ${thickness}px)`,
          background: "var(--surface)",
          height: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}
