"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Leaf, BadgeCheck, Clock, MapPin, Star } from "lucide-react";

const ITEMS = [
  { icon: ShieldCheck, label: "Bonded · $2M insured" },
  { icon: BadgeCheck, label: "Every cleaner background-checked" },
  { icon: Leaf, label: "EPA Safer Choice products" },
  { icon: Clock, label: "24-hour re-clean guarantee" },
  { icon: MapPin, label: "Rochester Hills · metro Detroit" },
  { icon: Star, label: "4.9 average · 2,300+ reviews" },
];

const ROW = [...ITEMS, ...ITEMS];

export function TrustBar() {
  const reduce = useReducedMotion();

  return (
    <section className="relative pt-14 sm:pt-20 overflow-hidden" aria-label="What you're getting">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-32 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center top, oklch(0.65 0.13 220 / 0.06), transparent 65%)",
        }}
      />

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-16 sm:w-24 z-10 pointer-events-none bg-gradient-to-r from-[var(--surface)] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-24 z-10 pointer-events-none bg-gradient-to-l from-[var(--surface)] to-transparent" />

        <div className="group flex overflow-hidden border-y border-line py-5">
          <motion.div
            animate={reduce ? undefined : { x: ["0%", "-50%"] }}
            transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
            className="flex flex-none items-center gap-8 sm:gap-12 pr-8 sm:pr-12 group-hover:[animation-play-state:paused]"
            style={{ willChange: "transform" }}
          >
            {ROW.map((it, i) => (
              <span
                key={`${it.label}-${i}`}
                className="hover-only inline-flex items-center gap-2.5 text-[13px] sm:text-sm whitespace-nowrap"
              >
                <span className="inline-flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-[oklch(0.65_0.13_220/0.1)] text-ink-700">
                  <it.icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                </span>
                <span className="font-medium text-ink-900">{it.label}</span>
                <span className="inline-block h-1 w-1 rounded-full bg-line-strong ml-2" aria-hidden />
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
