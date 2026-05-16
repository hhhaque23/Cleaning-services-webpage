"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "framer-motion";
import { EASE_OUT_QUINT } from "../motion/motion-primitives";

export function PriceTicker({ value, className = "" }: { value: number; className?: string }) {
  const motionVal = useMotionValue(value);
  const rounded = useTransform(motionVal, (v) =>
    `$${Math.round(v).toLocaleString()}`
  );
  const [display, setDisplay] = useState(`$${Math.round(value).toLocaleString()}`);
  const [delta, setDelta] = useState<{ id: number; amount: number } | null>(null);
  const [flash, setFlash] = useState<"up" | "down" | null>(null);
  const prev = useRef(value);
  const deltaIdRef = useRef(0);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deltaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const diff = Math.round(value - prev.current);
    const controls = animate(motionVal, value, {
      duration: 0.45,
      ease: EASE_OUT_QUINT,
    });
    const unsub = rounded.on("change", (v) => setDisplay(v));

    if (diff !== 0 && prev.current !== value) {
      setFlash(diff > 0 ? "up" : "down");
      deltaIdRef.current += 1;
      setDelta({ id: deltaIdRef.current, amount: diff });

      if (flashTimer.current) clearTimeout(flashTimer.current);
      flashTimer.current = setTimeout(() => setFlash(null), 700);

      if (deltaTimer.current) clearTimeout(deltaTimer.current);
      deltaTimer.current = setTimeout(() => setDelta(null), 1100);
    }

    prev.current = value;
    return () => {
      controls.stop();
      unsub();
    };
  }, [value, motionVal, rounded]);

  return (
    <span className={`relative inline-block ${className}`}>
      <span
        className={`relative inline-block transition-colors duration-300 ${
          flash === "down"
            ? "text-grass-300"
            : flash === "up"
            ? "text-[oklch(0.92_0.04_70)]"
            : ""
        }`}
      >
        {display}
      </span>

      <AnimatePresence>
        {delta && (
          <motion.span
            key={delta.id}
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: -28, scale: 1 }}
            exit={{ opacity: 0, y: -36, scale: 0.96 }}
            transition={{ duration: 0.85, ease: EASE_OUT_QUINT }}
            className={`pointer-events-none absolute left-full top-2 ml-2 inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-bold tabular-nums whitespace-nowrap ${
              delta.amount < 0
                ? "bg-grass-500/20 text-grass-300"
                : "bg-[oklch(0.55_0.16_70/0.18)] text-[oklch(0.88_0.1_75)]"
            }`}
          >
            {delta.amount > 0 ? "+" : "−"}${Math.abs(delta.amount)}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
