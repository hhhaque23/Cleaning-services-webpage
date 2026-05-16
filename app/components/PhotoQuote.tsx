"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PHOTOS } from "@/lib/unsplash";

export function PhotoQuote() {
  return (
    <section className="relative py-16 sm:py-24 bg-[var(--surface-tint)] overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -left-24 h-[24rem] w-[24rem] rounded-full bg-[oklch(0.78_0.16_145/0.1)] blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.figure
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem]"
          >
            <Image
              src={PHOTOS.livingRoom}
              alt="A sunlit living room, mid-afternoon, after a recurring clean"
              fill
              sizes="(min-width: 1024px) 540px, 100vw"
              className="object-cover scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.13_0.045_230/0.18)] via-transparent to-[oklch(0.13_0.045_230/0.08)]" />
          </motion.figure>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                aria-hidden="true"
                className="font-display font-extrabold text-[6rem] sm:text-[8rem] leading-none text-grass-500/35 -mb-6 block select-none"
              >
                &ldquo;
              </span>
              <blockquote className="font-display italic font-medium text-balance text-ink-950 text-[clamp(1.75rem,3.4vw,2.65rem)] leading-[1.18] tracking-[-0.018em]">
                It feels like coming back to a place someone actually cared
                about, not just a place that got cleaned.
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3 text-sm text-ink-700">
                <span className="inline-block h-px w-10 bg-line-strong" />
                <span className="font-semibold text-ink-950">Lena P.</span>
                <span className="text-ink-faint">·</span>
                <span>Birmingham, biweekly since 2024</span>
              </figcaption>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
