"use client";

import { motion, Variants } from "framer-motion";
import { CSSProperties, ElementType, ReactNode } from "react";
import { fadeUp, VIEWPORT_ONCE } from "./motion-primitives";

type RevealOnViewProps = {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
  delay?: number;
  once?: boolean;
  margin?: string;
};

export function RevealOnView({
  children,
  variants = fadeUp,
  className,
  style,
  as: Tag = motion.div,
  delay = 0,
  once = true,
  margin = "-80px",
}: RevealOnViewProps) {
  const Comp: any = Tag === motion.div ? motion.div : motion(Tag);
  return (
    <Comp
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin }}
      transition={{ delay }}
    >
      {children}
    </Comp>
  );
}
