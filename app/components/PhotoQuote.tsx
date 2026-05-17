"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { PHOTOS } from "@/lib/unsplash";
import { SplitText } from "./motion/SplitText";
import { EASE_OUT_QUINT } from "./motion/motion-primitives";

export function PhotoQuote() {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Clip-path reveals from top -> bottom: inset 30% 0 0 0 -> inset 0 0 0 0
  const clipInset = useTransform(scrollYProgress, [0, 0.45], [30, 0]);
  const clip = useTransform(clipInset, (v) => `inset(${v}% 0 0 0)`);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const photoY = useTransform(scrollYProgress, [0, 1], [40, -30]);

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 bg-[var(--surface-tint)] overflow-hidden"
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.figure
            style={reduce ? undefined : { clipPath: clip }}
            className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-card"
          >
            <motion.div
              style={reduce ? undefined : { scale: photoScale, y: photoY }}
              className="absolute inset-0"
            >
              <Image
                src={PHOTOS.photoQuote}
                alt="A sunlit living room, mid-afternoon, after a recurring clean"
                fill
                sizes="(min-width: 1024px) 540px, 100vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.13_0.045_230/0.18)] via-transparent to-[oklch(0.13_0.045_230/0.08)]" />
          </motion.figure>

          <div className="relative">
            <motion.span
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, ease: EASE_OUT_QUINT }}
              className="font-display font-extrabold text-[6rem] sm:text-[8rem] leading-none text-grass-500/35 -mb-6 block select-none"
              style={{ transformOrigin: "left bottom" }}
            >
              &ldquo;
            </motion.span>
            <blockquote className="font-display italic font-medium text-balance text-ink-950 text-[clamp(1.75rem,3.4vw,2.65rem)] leading-[1.18] tracking-[-0.018em]">
              <SplitText mode="word" stagger={0.06}>
                {"It feels like coming back to a place someone actually cared about, not just a place that got cleaned."}
              </SplitText>
            </blockquote>
            <motion.figcaption
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.8, ease: EASE_OUT_QUINT }}
              className="mt-7 flex items-center gap-3 text-sm text-ink-700"
            >
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.7, ease: EASE_OUT_QUINT }}
                className="inline-block h-px w-10 bg-line-strong origin-left"
              />
              <span className="font-semibold text-ink-950">Lena P.</span>
              <span className="text-ink-faint">·</span>
              <span>Birmingham, biweekly since 2024</span>
            </motion.figcaption>
          </div>
        </div>
      </div>
    </section>
  );
}
