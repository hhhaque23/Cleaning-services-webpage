"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

export function PriceTicker({ value, className = "" }: { value: number; className?: string }) {
  const motionVal = useMotionValue(value);
  const rounded = useTransform(motionVal, (v) =>
    `$${Math.round(v).toLocaleString()}`
  );
  const [display, setDisplay] = useState(`$${Math.round(value).toLocaleString()}`);
  const prev = useRef(value);

  useEffect(() => {
    const controls = animate(motionVal, value, {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    });
    const unsub = rounded.on("change", (v) => setDisplay(v));
    prev.current = value;
    return () => {
      controls.stop();
      unsub();
    };
  }, [value, motionVal, rounded]);

  return (
    <motion.span
      key={Math.round(value)}
      initial={{ opacity: 0.6, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {display}
    </motion.span>
  );
}
