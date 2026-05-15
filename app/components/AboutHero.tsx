"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PHOTOS } from "@/lib/unsplash";

export function AboutHero() {
  return (
    <section className="relative overflow-hidden pt-32 sm:pt-36 lg:pt-44 pb-16 sm:pb-20 bg-ink-950 text-[var(--surface)]">
      <div className="absolute inset-0 noise opacity-30 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 20% 30%, oklch(0.32 0.06 230) 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, oklch(0.42 0.13 146 / 0.45) 0%, transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-[11px] uppercase tracking-[0.14em] text-grass-300 font-semibold"
            >
              About Pristine
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 font-display font-extrabold text-hero text-balance text-[var(--surface)]"
            >
              Real cleaners.
              <br />
              Real homes.{" "}
              <span className="italic font-medium text-[oklch(0.985_0.006_220/0.7)]">
                Real guarantee.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-lead text-[oklch(0.985_0.006_220/0.78)] leading-relaxed text-pretty"
            >
              A small local crew of fourteen, mostly the same faces since 2019. We&apos;ve
              cleaned over 12,000 homes around Rochester Hills, paid above market and
              trained relentlessly. $2M insured, fully bonded, serving sixteen metro
              Detroit suburbs.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[5/6] rounded-[2rem] overflow-hidden">
              <Image
                src={PHOTOS.kitchen}
                alt="A bright kitchen freshly cleaned, late afternoon light"
                fill
                priority
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink-950/65 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
