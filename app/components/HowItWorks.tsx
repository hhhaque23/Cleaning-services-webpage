"use client";

import { motion } from "framer-motion";
import { SlidersHorizontal, CalendarCheck, Sparkles, ArrowDownRight } from "lucide-react";

const STEPS = [
  {
    n: "01",
    icon: SlidersHorizontal,
    title: "Configure",
    body: "Pick a tier, set rooms and add-ons. The price is live. No hidden fees, no quote forms.",
    accent: "Tap. Drag. Done.",
    span: "lg:col-span-7",
  },
  {
    n: "02",
    icon: CalendarCheck,
    title: "Schedule",
    body: "Open dates and time windows are shown in real time, with same-day available when slots are open.",
    accent: "It's a live calendar.",
    span: "lg:col-span-5",
  },
  {
    n: "03",
    icon: Sparkles,
    title: "Relax",
    body: "We text within 15 minutes with your cleaner's photo. You're charged only after the clean is approved.",
    accent: "Sleep in tomorrow.",
    span: "lg:col-span-12",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-20 sm:py-28">
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
              <span className="italic font-medium text-ink-700">
                no phone calls.
              </span>
            </h2>
          </div>
          <p className="text-ink-700 lg:text-right max-w-xs">
            Three taps, fifteen minutes from open tab to text confirmation.
          </p>
        </motion.div>

        <div className="mt-14 grid lg:grid-cols-12 gap-5 lg:gap-6 relative">
          {STEPS.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative ${s.span} rounded-[1.75rem] border border-line bg-[var(--surface-elevated)] overflow-hidden ${
                i === 2
                  ? "p-8 sm:p-10 grid sm:grid-cols-[1fr_auto] items-end gap-6"
                  : "p-7 sm:p-8"
              } hover:border-[oklch(0.84_0.018_220)] hover:shadow-card transition-all duration-500 ease-out-quint`}
            >
              <div className="absolute inset-x-7 top-7 flex items-start justify-between text-ink-faint">
                <span className="font-display font-extrabold text-[3.5rem] sm:text-[4.5rem] leading-none tabular-nums text-[oklch(0.92_0.012_220)] -tracking-[0.04em] pointer-events-none">
                  {s.n}
                </span>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-ink-950 text-[var(--surface)]">
                  <s.icon className="h-5 w-5" />
                </span>
              </div>

              <div className={`${i === 2 ? "" : "mt-24 sm:mt-28"} relative`}>
                <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-[-0.018em] text-ink-950">
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

              {i === 2 && (
                <a
                  href="#booking"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-ink-950 hover:bg-ink-900 text-[var(--surface)] font-semibold px-6 py-3.5 text-sm whitespace-nowrap transition-all duration-300 ease-out-quint cursor-pointer self-end"
                >
                  Start a booking
                  <ArrowDownRight className="h-4 w-4 -rotate-90" />
                </a>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
