"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SlidersHorizontal, CalendarCheck, Sparkles, ArrowDownRight } from "lucide-react";

const STEPS = [
  {
    n: "01",
    icon: SlidersHorizontal,
    title: "Configure",
    body: "Pick a tier, set rooms and add-ons. The price is live. No hidden fees, no quote forms.",
    accent: "Tap. Drag. Done.",
  },
  {
    n: "02",
    icon: CalendarCheck,
    title: "Schedule",
    body: "Open dates and time windows are shown in real time, with same-day available when slots are open.",
    accent: "It's a live calendar.",
  },
  {
    n: "03",
    icon: Sparkles,
    title: "Relax",
    body: "We text within 15 minutes with your cleaner's photo. You're charged only after the clean is approved.",
    accent: "Sleep in tomorrow.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-20 sm:py-28 scroll-mt-24">
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
              How it works
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
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[3.5rem] left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-line-strong to-transparent"
          />

          <div className="lg:hidden absolute top-12 bottom-12 left-[1.5rem] w-px bg-gradient-to-b from-transparent via-line-strong to-transparent" aria-hidden="true" />

          <ol className="grid lg:grid-cols-3 gap-10 lg:gap-14 relative">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-16 lg:pl-0"
              >
                <div className="flex flex-row lg:flex-col lg:items-start">
                  <div className="absolute left-0 lg:relative lg:left-auto flex items-center gap-3 lg:gap-4">
                    <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-950 text-[var(--surface)] shadow-card ring-4 ring-[var(--surface)]">
                      <s.icon className="h-5 w-5" />
                    </span>
                  </div>

                  <div className="hidden lg:flex items-baseline gap-3 mt-6">
                    <span className="font-display font-extrabold text-[2.75rem] leading-none tabular-nums text-ink-faint -tracking-[0.04em]">
                      {s.n}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-ink-600">
                      Step
                    </span>
                  </div>
                </div>

                <div className="lg:mt-5">
                  <div className="lg:hidden text-[11px] uppercase tracking-[0.14em] font-semibold text-ink-600">
                    Step {s.n}
                  </div>
                  <h3 className="mt-1 lg:mt-0 font-display font-bold text-2xl lg:text-[1.75rem] tracking-[-0.018em] text-ink-950">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] sm:text-base text-ink-700 leading-relaxed text-pretty max-w-md">
                    {s.body}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-grass-700">
                    <ArrowDownRight className="h-3.5 w-3.5" />
                    {s.accent}
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
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
