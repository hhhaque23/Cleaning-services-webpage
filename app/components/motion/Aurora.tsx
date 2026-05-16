"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CSSProperties } from "react";

type Palette = "grass" | "cyan" | "mixed" | "warm";
type Intensity = "subtle" | "vivid";

const COLORS: Record<Palette, [string, string]> = {
  grass: ["oklch(0.78 0.16 145 / 0.55)", "oklch(0.52 0.16 145 / 0.4)"],
  cyan: ["oklch(0.72 0.13 220 / 0.55)", "oklch(0.65 0.13 220 / 0.4)"],
  mixed: ["oklch(0.78 0.16 145 / 0.45)", "oklch(0.65 0.13 220 / 0.45)"],
  warm: ["oklch(0.85 0.14 75 / 0.45)", "oklch(0.78 0.16 145 / 0.35)"],
};

type AuroraProps = {
  palette?: Palette;
  intensity?: Intensity;
  className?: string;
  style?: CSSProperties;
  blur?: number;
  blobs?: 1 | 2 | 3;
};

export function Aurora({
  palette = "mixed",
  intensity = "subtle",
  className,
  style,
  blur = 70,
  blobs = 2,
}: AuroraProps) {
  const reduce = useReducedMotion();
  const [a, b] = COLORS[palette];
  const baseOpacity = intensity === "vivid" ? 0.85 : 0.55;

  const blobConfigs = [
    { color: a, x: "-12%", y: "-18%", w: "62%", h: "62%", delay: 0 },
    { color: b, x: "60%", y: "30%", w: "55%", h: "55%", delay: 1.2 },
    { color: a, x: "20%", y: "60%", w: "50%", h: "50%", delay: 2.4 },
  ].slice(0, blobs);

  return (
    <div
      aria-hidden
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        filter: `blur(${reduce ? Math.min(40, blur) : blur}px)`,
        opacity: baseOpacity,
        contain: "paint",
        ...style,
      }}
    >
      {blobConfigs.map((cfg, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={
            reduce
              ? undefined
              : {
                  x: ["0%", "6%", "-3%", "0%"],
                  y: ["0%", "-4%", "5%", "0%"],
                  scale: [1, 1.08, 0.96, 1],
                }
          }
          transition={{
            duration: 18 + i * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: cfg.delay,
          }}
          style={{
            position: "absolute",
            left: cfg.x,
            top: cfg.y,
            width: cfg.w,
            height: cfg.h,
            borderRadius: "50%",
            background: cfg.color,
            willChange: reduce ? undefined : "transform",
          }}
        />
      ))}
    </div>
  );
}
