"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ElementType, ReactNode } from "react";
import { splitChar, splitWord, EASE_OUT_QUINT, VIEWPORT_ONCE } from "./motion-primitives";

type Mode = "word" | "char" | "line";

type SplitTextProps = {
  children: string;
  as?: ElementType;
  mode?: Mode;
  delay?: number;
  stagger?: number;
  className?: string;
  trigger?: "view" | "load";
  once?: boolean;
};

export function SplitText({
  children,
  as: Tag = "span",
  mode = "word",
  delay = 0,
  stagger,
  className,
  trigger = "view",
  once = true,
}: SplitTextProps) {
  const reduce = useReducedMotion();
  const variants = mode === "char" ? splitChar : splitWord;
  const finalStagger = stagger ?? (mode === "char" ? 0.025 : 0.05);

  if (reduce) {
    return <Tag className={className}>{children}</Tag>;
  }

  const tokens: string[] =
    mode === "char"
      ? Array.from(children)
      : mode === "line"
        ? children.split("\n")
        : children.split(/(\s+)/);

  const triggerProps =
    trigger === "view"
      ? { initial: "hidden", whileInView: "show", viewport: { ...VIEWPORT_ONCE, once } }
      : { initial: "hidden", animate: "show" };

  return (
    <Tag className={className} style={{ perspective: 800 }}>
      <motion.span
        {...triggerProps}
        style={{ display: "inline-block" }}
        transition={{ delayChildren: delay, staggerChildren: finalStagger, ease: EASE_OUT_QUINT }}
      >
        {tokens.map((tok, i) => {
          if (/^\s+$/.test(tok)) {
            return (
              <span key={i} aria-hidden style={{ display: "inline-block", whiteSpace: "pre" }}>
                {tok}
              </span>
            );
          }
          return (
            <span key={i} style={{ display: "inline-block" }}>
              <motion.span
                variants={variants}
                style={{ display: "inline-block", willChange: "transform, opacity" }}
              >
                {tok}
              </motion.span>
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}
