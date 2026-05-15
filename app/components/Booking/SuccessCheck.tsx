"use client";

import { motion } from "framer-motion";

export function SuccessCheck() {
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto inline-flex h-24 w-24 items-center justify-center"
    >
      <motion.span
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1.45, 1.7], opacity: [0, 0.35, 0] }}
        transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
        className="absolute inset-0 rounded-full bg-grass-500/45"
        aria-hidden="true"
      />
      <motion.span
        initial={{ scale: 0.85 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 rounded-full bg-grass-500/18 ring-1 ring-grass-500/35"
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 96 96"
        className="relative h-20 w-20"
        aria-hidden="true"
      >
        <motion.circle
          cx="48"
          cy="48"
          r="34"
          fill="oklch(0.62 0.17 145)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "48px 48px" }}
        />
        <motion.path
          d="M32 49 L43 60 L64 38"
          fill="none"
          stroke="oklch(0.985 0.006 220)"
          strokeWidth={5.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 0.5, delay: 0.45, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.05, delay: 0.45 },
          }}
        />
      </svg>

      <Spark angle={0} delay={0.7} />
      <Spark angle={45} delay={0.74} />
      <Spark angle={90} delay={0.78} />
      <Spark angle={135} delay={0.82} />
      <Spark angle={180} delay={0.86} />
      <Spark angle={225} delay={0.78} />
      <Spark angle={270} delay={0.74} />
      <Spark angle={315} delay={0.7} />
    </motion.div>
  );
}

function Spark({ angle, delay }: { angle: number; delay: number }) {
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * 56;
  const y = Math.sin(rad) * 56;
  return (
    <motion.span
      aria-hidden="true"
      initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
      animate={{ opacity: [0, 1, 0], x, y, scale: [0.4, 1, 0.4] }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -ml-[3px] -mt-[3px] rounded-full bg-grass-500"
    />
  );
}
