"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CalendarClock,
  Star,
  ShieldCheck,
  Leaf,
} from "lucide-react";
import { PHOTOS } from "@/lib/unsplash";
import { HeroBackground } from "./HeroBackground";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-24 lg:pb-32"
    >
      <HeroBackground />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-center"
        >
          <div>
            <motion.div variants={fadeUp} className="flex items-center gap-2.5">
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-grass-500">
                <span className="absolute inset-0 rounded-full animate-pulse-ring" />
              </span>
              <span className="text-sm font-medium text-ink-700">
                Next available slot{" "}
                <span className="font-semibold text-ink-950">
                  tomorrow, 9:00 AM
                </span>
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-6 font-display font-extrabold text-hero text-balance text-ink-950"
            >
              Your home,
              <br />
              spotless.{" "}
              <span className="text-ink-700/90 italic font-medium">
                Booked in
              </span>{" "}
              60 seconds.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-xl text-lead text-ink-700 leading-relaxed text-pretty"
            >
              Rochester Hills&apos; only cleaning service you can actually book
              like a delivery order. Transparent pricing, vetted cleaners,
              same-day availability. No phone tag, no quote forms, no
              two-day reply windows.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col sm:flex-row gap-3"
            >
              <Link
                href="/book"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-ink-950 hover:bg-ink-900 text-[var(--surface)] font-semibold px-7 py-[1.05rem] text-[15px] shadow-lift hover:shadow-[0_30px_70px_-22px_oklch(0.13_0.045_230/0.55)] transition-all duration-300 ease-out-quint cursor-pointer"
              >
                Get my price and book
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out-quint group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--surface-elevated)] hover:bg-white border border-line text-ink-950 font-semibold px-7 py-[1.05rem] text-[15px] transition-all duration-300 ease-out-quint cursor-pointer"
              >
                Why us
              </Link>
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
            <div className="relative aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-lift">
              <Image
                src={PHOTOS.hero}
                alt="Sunlit living room with white sofa and clean wood floors, just finished by our team"
                fill
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[oklch(0.11_0.04_230/0.4)] via-transparent to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14, x: -10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
                  <div className="text-sm font-semibold text-ink-950">
                    $2M coverage
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10, x: 10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 glass rounded-2xl px-4 py-3 shadow-card"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-1.5">
                  {[1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className="inline-flex h-7 w-7 rounded-full ring-2 ring-[var(--surface)] overflow-hidden bg-ink-100"
                    >
                      <Image
                        src={PHOTOS.team[i].photo}
                        alt=""
                        aria-hidden="true"
                        width={28}
                        height={28}
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
                  <div className="text-xs text-ink-700 font-medium">
                    4.9 from 2,300+ reviews
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-4 sm:-bottom-6 left-4 right-4 sm:left-10 sm:right-10 glass rounded-2xl px-4 py-3.5 shadow-card flex items-center gap-3"
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
              <Link
                href="/book"
                className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-ink-700 hover:text-ink-950 cursor-pointer"
              >
                Grab one
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute left-4 bottom-12 sm:bottom-20 inline-flex items-center gap-1.5 rounded-full bg-ink-950 text-[var(--surface)] text-xs font-semibold px-3 py-1.5 shadow-card"
            >
              <Leaf className="h-3.5 w-3.5 text-grass-400" />
              Eco and pet-safe
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
