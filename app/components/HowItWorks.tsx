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
    <section
      id="how"
      className="relative scroll-mt-24 overflow-hidden text-[var(--surface)] bg-[oklch(0.42_0.13_146)]"
    >
      <div className="absolute inset-0 noise opacity-30 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 12% 0%, oklch(0.52 0.16 145) 0%, transparent 55%), radial-gradient(ellipse at 88% 100%, oklch(0.32 0.11 148) 0%, transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="grid lg:grid-cols-[1fr_auto] gap-6 items-end"
        >
          <div className="max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.14em] text-grass-300 font-semibold">
              The process
            </div>
            <h2 className="mt-3 font-display font-extrabold text-display-1 text-[var(--surface)] text-balance">
              From curious to booked,{" "}
              <span className="italic font-medium text-[oklch(0.985_0.006_220/0.7)]">
                no phone calls.
              </span>
            </h2>
          </div>
          <p className="text-[oklch(0.985_0.006_220/0.75)] lg:text-right max-w-xs">
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
                  "linear-gradient(90deg, oklch(0.985 0.006 220 / 0.12) 0%, oklch(0.985 0.006 220 / 0.55) 18%, oklch(0.985 0.006 220 / 0.55) 82%, oklch(0.985 0.006 220 / 0.12) 100%)",
              }}
            />
            <motion.div
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-[2.75rem] left-[8%] right-[8%] h-[3px] rounded-full bg-[var(--surface)] origin-left shadow-[0_0_24px_-4px_oklch(0.985_0.006_220/0.6)]"
            />
          </div>

          <div
            className="lg:hidden absolute top-12 bottom-12 left-[2.625rem] w-[3px] rounded-full"
            aria-hidden="true"
            style={{
              background:
                "linear-gradient(180deg, oklch(0.985 0.006 220 / 0.12) 0%, oklch(0.985 0.006 220 / 0.7) 50%, oklch(0.985 0.006 220 / 0.12) 100%)",
            }}
          />

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
                  <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--surface)] text-[oklch(0.36_0.12_148)] ring-[6px] ring-[oklch(0.42_0.13_146)] shadow-[0_0_0_2px_oklch(0.985_0.006_220/0.35),0_18px_40px_-20px_oklch(0_0_0/0.4)]">
                    <s.icon className="h-5 w-5" strokeWidth={2.4} />
                  </span>

                  <div className="lg:hidden">
                    <div className="font-display font-extrabold text-2xl text-[var(--surface)] tabular-nums leading-none">
                      {s.n}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.14em] font-semibold text-grass-300">
                      Step {s.n.replace(/^0/, "")} of 3
                    </div>
                  </div>
                </div>

                <div className="hidden lg:flex items-baseline gap-3 mt-5">
                  <span className="font-display font-extrabold text-[3.25rem] leading-none tabular-nums text-[var(--surface)] -tracking-[0.04em]">
                    {s.n}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[oklch(0.985_0.006_220/0.14)] text-[oklch(0.985_0.006_220/0.9)] text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1">
                    <span className="inline-block h-1 w-1 rounded-full bg-grass-300" />
                    {s.meta}
                  </span>
                </div>

                <div className="lg:mt-6">
                  <h3 className="font-display font-bold text-2xl lg:text-[1.625rem] tracking-[-0.018em] text-[var(--surface)]">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] sm:text-base text-[oklch(0.985_0.006_220/0.78)] leading-relaxed text-pretty max-w-sm">
                    {s.body}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-grass-300">
                    <ArrowDownRight className="h-3.5 w-3.5" />
                    {s.accent}
                  </div>
                </div>

                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden lg:block absolute top-[2.4rem] right-[-1.2rem] text-[oklch(0.985_0.006_220/0.6)]"
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
          className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border-t border-[oklch(0.985_0.006_220/0.18)] pt-8"
        >
          <p className="text-[oklch(0.985_0.006_220/0.75)] max-w-lg">
            Cleaners are typically dispatched within the hour. You won&apos;t hear from us
            until they&apos;re on their way.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--surface)] hover:bg-white text-ink-950 font-semibold px-6 py-3.5 text-sm whitespace-nowrap transition-all duration-300 ease-out-quint cursor-pointer"
          >
            Start a booking
            <ArrowDownRight className="h-4 w-4 -rotate-90" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
