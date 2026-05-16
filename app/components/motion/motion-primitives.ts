import type { Variants } from "framer-motion";

export const EASE_OUT_QUINT: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_OUT_QUART: [number, number, number, number] = [0.25, 1, 0.5, 1];
export const EASE_SOFT_SPRING = { type: "spring", stiffness: 220, damping: 26 } as const;

export const DUR_FAST = 0.35;
export const DUR_BASE = 0.55;
export const DUR_SLOW = 0.85;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR_BASE, ease: EASE_OUT_QUINT },
  },
};

export const fadeUpStagger = (delay = 0, stagger = 0.08): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { delayChildren: delay, staggerChildren: stagger },
  },
});

export const splitWord: Variants = {
  hidden: { opacity: 0, y: "0.4em", rotateX: -20 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: EASE_OUT_QUINT },
  },
};

export const splitChar: Variants = {
  hidden: { opacity: 0, y: "0.6em" },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: EASE_OUT_QUINT },
  },
};

export const tilePop: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: DUR_BASE, ease: EASE_OUT_QUINT },
  },
};

export const pillSlide: Variants = {
  hidden: { opacity: 0, x: -14 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: DUR_FAST, ease: EASE_OUT_QUINT },
  },
};

export const checkDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.55, ease: EASE_OUT_QUINT },
  },
};

export const VIEWPORT_ONCE = { once: true, margin: "-80px" } as const;
export const VIEWPORT_LOOSE = { once: true, margin: "-20px" } as const;
