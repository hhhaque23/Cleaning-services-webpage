"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  SlidersHorizontal,
  CalendarCheck,
  Sparkles,
  ArrowDownRight,
} from "lucide-react";
import { PHOTOS } from "@/lib/unsplash";

const STEPS = [
  {
    n: "01",
    icon: SlidersHorizontal,
    title: "Configure",
    body: "Pick a tier, set rooms and add-ons. The price is live. No hidden fees, no quote forms.",
    accent: "Tap. Drag. Done.",
    photo: PHOTOS.kitchen,
    alt: "A kitchen on a Sunday afternoon, ready to be booked",
  },
  {
    n: "02",
    icon: CalendarCheck,
    title: "Schedule",
    body: "Open dates and time windows are shown in real time. Same-day available when slots are open.",
    accent: "It's a live calendar.",
    photo: PHOTOS.livingRoom,
    alt: "A living room the morning of your slot",
  },
  {
    n: "03",
    icon: Sparkles,
    title: "Relax",
    body: "We text within 15 minutes with your cleaner's photo. You're charged only after the clean is approved.",
    accent: "Sleep in tomorrow.",
    photo: PHOTOS.bedroom,
    alt: "A made bed in late afternoon light, after the clean",
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

        <ol className="mt-12 grid md:grid-cols-3 gap-6 lg:gap-8">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <figure className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem]">
                <Image
                  src={s.photo}
                  alt={s.alt}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.13_0.045_230/0.5)] via-transparent to-[oklch(0.13_0.045_230/0.15)]" />

                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--surface)]/95 backdrop-blur-sm text-ink-950 text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-1.5">
                    <span className="inline-block h-1 w-1 rounded-full bg-grass-500" />
                    Step {s.n}
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 text-[var(--surface)]">
                  <span className="font-display font-extrabold text-[3rem] sm:text-[3.5rem] leading-none tabular-nums -tracking-[0.04em]">
                    {s.n}
                  </span>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--surface)]/15 backdrop-blur-sm text-[var(--surface)] ring-1 ring-[var(--surface)]/25">
                    <s.icon className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                </div>
              </figure>

              <div className="mt-5">
                <h3 className="font-display font-extrabold text-2xl sm:text-[1.625rem] tracking-[-0.02em] text-ink-950">
                  {s.title}
                </h3>
                <p className="mt-2 text-[15px] text-ink-700 leading-relaxed text-pretty">
                  {s.body}
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-grass-700">
                  <ArrowDownRight className="h-3.5 w-3.5" />
                  {s.accent}
                </div>
              </div>
            </motion.li>
          ))}
        </ol>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border-t border-line pt-8"
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
