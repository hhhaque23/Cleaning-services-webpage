"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  SlidersHorizontal,
  CalendarCheck,
  Sparkles,
  ArrowDownRight,
  ArrowRight,
} from "lucide-react";

const STEPS = [
  {
    n: "01",
    icon: SlidersHorizontal,
    title: "Configure",
    body: "Pick a tier, set rooms and add-ons. The price is live. No hidden fees, no quote forms.",
    accent: "Tap. Drag. Done.",
    meta: "About 45 seconds",
  },
  {
    n: "02",
    icon: CalendarCheck,
    title: "Schedule",
    body: "Open dates and time windows are shown in real time. Same-day available when slots are open.",
    accent: "It's a live calendar.",
    meta: "Pick one slot",
  },
  {
    n: "03",
    icon: Sparkles,
    title: "Relax",
    body: "We text within 15 minutes with your cleaner's photo. You're charged only after the clean is approved.",
    accent: "Sleep in tomorrow.",
    meta: "We handle the rest",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-20 sm:py-28 scroll-mt-24 overflow-hidden">
      <div className="absolute top-1/4 -left-32 h-[26rem] w-[26rem] rounded-full bg-[oklch(0.78_0.09_220/0.16)] blur-3xl animate-blob-drift pointer-events-none" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="grid lg:grid-cols-[1fr_auto] gap-6 items-end"
        >
          <div className="max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.14em] text-ink-600 font-semibold">
              The process
            </div>
            <h2 className="mt-3 font-display font-extrabold text-display-1 text-ink-950 text-balance">
              From curious to booked,{" "}
              <span className="italic font-medium text-ink-700">no phone calls.</span>
            </h2>
          </div>
          <p className="text-ink-700 lg:text-right max-w-xs">
            Three taps, fifteen minutes from open tab to text confirmation.
          </p>
        </motion.div>

        <div className="mt-16 relative">
          <div className="hidden lg:block">
            <div
              aria-hidden="true"
              className="absolute top-[2.75rem] left-0 right-0 h-[3px] rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.92 0.012 220) 0%, oklch(0.68 0.18 145) 18%, oklch(0.68 0.18 145) 82%, oklch(0.92 0.012 220) 100%)",
              }}
            />
            <motion.div
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-[2.75rem] left-[8%] right-[8%] h-[3px] rounded-full bg-grass-500 origin-left shadow-[0_0_24px_-4px_oklch(0.68_0.18_145/0.55)]"
            />
          </div>

          <div className="lg:hidden absolute top-12 bottom-12 left-[2.625rem] w-[3px] rounded-full bg-gradient-to-b from-[oklch(0.92_0.012_220)] via-grass-500 to-[oklch(0.92_0.012_220)]" aria-hidden="true" />

          <ol className="relative grid lg:grid-cols-3 gap-12 lg:gap-10">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-24 lg:pl-0"
              >
                <div className="absolute left-0 top-0 lg:relative lg:left-auto lg:top-auto flex items-center gap-4 lg:block">
                  <span className="relative inline-flex h-[5.5rem] w-[5.5rem] lg:h-[5.5rem] lg:w-[5.5rem] items-center justify-center">
                    <span className="absolute inset-0 rounded-full bg-grass-500/15 animate-pulse-ring" aria-hidden="true" />
                    <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-ink-950 text-[var(--surface)] ring-8 ring-[var(--surface)] shadow-card">
                      <s.icon className="h-5 w-5" strokeWidth={2.2} />
                    </span>
                  </span>

                  <div className="lg:hidden">
                    <div className="font-display font-extrabold text-2xl text-ink-950 tabular-nums leading-none">
                      {s.n}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.14em] font-semibold text-ink-600">
                      Step {s.n.replace(/^0/, "")} of 3
                    </div>
                  </div>
                </div>

                <div className="hidden lg:flex items-baseline gap-3 mt-5">
                  <span className="font-display font-extrabold text-[3.25rem] leading-none tabular-nums text-ink-950 -tracking-[0.04em]">
                    {s.n}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-grass-500/10 text-grass-700 text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1">
                    <span className="inline-block h-1 w-1 rounded-full bg-grass-500" />
                    {s.meta}
                  </span>
                </div>

                <div className="lg:mt-6">
                  <h3 className="font-display font-bold text-2xl lg:text-[1.625rem] tracking-[-0.018em] text-ink-950">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] sm:text-base text-ink-700 leading-relaxed text-pretty max-w-sm">
                    {s.body}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-grass-700">
                    <ArrowDownRight className="h-3.5 w-3.5" />
                    {s.accent}
                  </div>
                </div>

                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden lg:block absolute top-[2.4rem] right-[-1.2rem] text-ink-faint"
                  >
                    <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
                  </span>
                )}
              </motion.li>
            ))}
          </ol>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border-t border-line pt-8"
        >
          <p className="text-ink-700 max-w-lg">
            Cleaners are typically dispatched within the hour. You won&apos;t hear from us
            until they&apos;re on their way.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-ink-950 hover:bg-ink-900 text-[var(--surface)] font-semibold px-6 py-3.5 text-sm whitespace-nowrap transition-all duration-300 ease-out-quint cursor-pointer"
          >
            Start a booking
            <ArrowDownRight className="h-4 w-4 -rotate-90" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
