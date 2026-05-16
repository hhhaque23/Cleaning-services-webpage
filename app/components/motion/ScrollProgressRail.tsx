"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgressRail() {
  const { scrollYProgress } = useScroll();
  const sy = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.3 });

  return (
    <motion.div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: 2,
        right: 0,
        zIndex: 80,
        transformOrigin: "0 50%",
        scaleX: sy,
        background:
          "linear-gradient(90deg, oklch(0.65 0.13 220) 0%, oklch(0.68 0.18 145) 100%)",
        pointerEvents: "none",
      }}
    />
  );
}
