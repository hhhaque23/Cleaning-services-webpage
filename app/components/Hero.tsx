"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Check, CalendarClock, Star, ShieldCheck, Leaf, Zap } from "lucide-react";
import { PHOTOS } from "@/lib/unsplash";
import { HeroVideo } from "./HeroVideo";
import { SplitText } from "./motion/SplitText";
import { MagneticButton } from "./motion/MagneticButton";
import { EASE_OUT_QUINT, fadeUp } from "./motion/motion-primitives";

const stagger = {
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.55 } },
};

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const photoY = useTransform(scrollYProgress, [0, 1], [0, -32]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.02]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24 min-h-[88vh] flex items-center"
    >
      <HeroVideo />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 relative w-full">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center"
        >
          <div>
            <motion.div variants={fadeUp} className="flex items-center gap-2.5">
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-grass-500">
                <span className="absolute inset-0 rounded-full animate-pulse-ring" />
              </span>
              <span className="text-sm font-medium text-ink-700">
                Next available slot{" "}
                <span className="font-semibold text-ink-950">tomorrow, 9:00 AM</span>
              </span>
            </motion.div>

            <h1 className="mt-6 font-display font-extrabold text-hero text-balance text-ink-950 leading-[1.02] tracking-[-0.028em]">
              <SplitText as="span" mode="word" trigger="view" stagger={0.06}>
                {"Your home, spotless."}
              </SplitText>
              <br />
              <SplitText
                as="span"
                mode="word"
                trigger="view"
                stagger={0.06}
                delay={0.4}
                className="text-ink-700/90 italic font-medium"
              >
                {"Booked in 60 seconds."}
              </SplitText>
            </h1>

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-xl text-lead text-ink-700 leading-relaxed text-pretty"
            >
              Rochester Hills&apos; only cleaning service you can actually book like a delivery order.
              Transparent pricing, vetted cleaners, same-day availability. No phone tag, no quote
              forms, no two-day reply windows.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-col sm:flex-row gap-3">
              <MagneticButton as="div" radius={140} strength={0.32}>
                <Link
                  href="/book"
                  className="group relative inline-flex items-center justify-center gap-2 rounded-2xl bg-ink-950 hover:bg-ink-900 text-[var(--surface)] font-semibold px-7 py-[1.05rem] text-[15px] shadow-lift hover:shadow-[0_30px_70px_-22px_oklch(0.13_0.045_230/0.6)] transition-all duration-300 ease-out-quint cursor-pointer overflow-hidden"
                >
                  <span
                    aria-hidden
                    className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-grass-500/0 via-grass-500/35 to-grass-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                  />
                  <span className="relative">Get my price and book</span>
                  <ArrowRight className="relative h-4 w-4 transition-transform duration-300 ease-out-quint group-hover:translate-x-1" />
                </Link>
              </MagneticButton>
              <MagneticButton as="div" radius={100} strength={0.2}>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--surface-elevated)] hover:bg-[var(--surface)] border border-line text-ink-950 font-semibold px-7 py-[1.05rem] text-[15px] transition-all duration-300 ease-out-quint cursor-pointer"
                >
                  Why us
                </Link>
              </MagneticButton>
            </motion.div>

            <motion.ul
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-700"
            >
              {[
                "No quote forms",
                "24-hour re-clean guarantee",
                "Eco and pet-safe products",
              ].map((b) => (
                <li key={b} className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-grass-600" strokeWidth={3} />
                  {b}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div variants={fadeUp} className="relative">
            <motion.div
              style={reduce ? undefined : { y: photoY, scale: photoScale }}
              className="relative aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-lift"
            >
              <Image
                src={PHOTOS.hero}
                alt="Sunlit living room with white sofa and clean wood floors, just finished by our team"
                fill
                priority
                fetchPriority="high"
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[oklch(0.11_0.04_230/0.4)] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.11_0.04_230/0.3)] via-transparent to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14, x: -10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 0.95, duration: 0.6, ease: EASE_OUT_QUINT }}
              className="absolute -left-3 sm:-left-6 top-6 sm:top-10 glass rounded-2xl px-4 py-3 shadow-card max-w-[15rem]"
            >
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[oklch(0.65_0.13_220/0.1)] text-ink-700">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <div className="leading-tight">
                  <div className="text-[10px] uppercase tracking-[0.08em] text-ink-600 font-semibold">
                    Bonded and insured
                  </div>
                  <div className="text-sm font-semibold text-ink-950">$2M coverage</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10, x: 10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 1.05, duration: 0.6, ease: EASE_OUT_QUINT }}
              className="absolute -right-2 sm:-right-4 top-1/3 -translate-y-1/2 glass rounded-2xl px-4 py-3 shadow-card"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-1.5">
                  {[PHOTOS.kitchen, PHOTOS.bathroomBright, PHOTOS.bedroomAlt].map((src, i) => (
                    <span
                      key={i}
                      className="inline-flex h-7 w-7 rounded-full ring-2 ring-[var(--surface)] overflow-hidden bg-ink-100 relative"
                    >
                      <Image
                        src={src}
                        alt=""
                        aria-hidden="true"
                        fill
                        sizes="28px"
                        className="object-cover"
                      />
                    </span>
                  ))}
                </div>
                <div className="leading-tight">
                  <div className="flex items-center gap-0.5 text-grass-600">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} className="h-3 w-3 fill-grass-500 stroke-grass-500" />
                    ))}
                  </div>
                  <div className="text-xs text-ink-700 font-medium">4.9 from 2,300+ cleans</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.6, ease: EASE_OUT_QUINT }}
              className="absolute -bottom-4 sm:-bottom-6 left-4 right-4 sm:left-10 sm:right-10 glass rounded-2xl px-4 py-3.5 shadow-card hidden sm:flex items-center gap-3"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[oklch(0.78_0.16_145/0.18)] text-grass-700">
                <CalendarClock className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <div className="text-[10px] uppercase tracking-[0.08em] text-ink-600 font-semibold">
                  Today&apos;s schedule
                </div>
                <div className="text-sm font-semibold text-ink-950">
                  3 slots left, same-day available
                </div>
              </div>
              <MagneticButton as="div" radius={50} strength={0.18} className="ml-auto">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-ink-700 hover:text-ink-950 cursor-pointer"
                >
                  Grab one
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.85, duration: 0.5 }}
              className="absolute left-4 bottom-6 sm:bottom-20 hidden sm:inline-flex items-center gap-1.5 rounded-full bg-ink-950 text-[var(--surface)] text-xs font-semibold px-3 py-1.5 shadow-card"
            >
              <Leaf className="h-3.5 w-3.5 text-grass-400" />
              Eco and pet-safe
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14, x: 14 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 1.3, duration: 0.6, ease: EASE_OUT_QUINT }}
              className="absolute hidden sm:flex -right-3 -bottom-3 glass rounded-2xl px-3.5 py-2.5 shadow-card items-center gap-2"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1], opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="relative inline-flex h-2 w-2 rounded-full bg-grass-500"
              />
              <div className="leading-tight">
                <div className="text-[10px] uppercase tracking-[0.08em] text-ink-600 font-semibold">
                  Live
                </div>
                <div className="text-[12px] font-semibold text-ink-950">
                  Booked 2 min ago · Troy
                </div>
              </div>
              <Zap className="h-3.5 w-3.5 text-grass-600" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
