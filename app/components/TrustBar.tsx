"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Leaf, BadgeCheck, Clock, MapPin, Star } from "lucide-react";

const ITEMS = [
  { icon: ShieldCheck, label: "Locally owned & operated" },
  { icon: BadgeCheck, label: "Vetted, local cleaners" },
  { icon: Leaf, label: "Eco-friendly, pet-safe products" },
  { icon: Clock, label: "Same-day available" },
  { icon: MapPin, label: "Ann Arbor · Washtenaw County" },
  { icon: Star, label: "5★ on Thumbtack" },
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
        <div className="absolute inset-y-0 left-0 w-16 sm:w-24 z-10 pointer-events-none bg-gradient-to-r from-[var(--surface-elevated)] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-24 z-10 pointer-events-none bg-gradient-to-l from-[var(--surface-elevated)] to-transparent" />

        <div className="group flex overflow-hidden bg-[var(--surface-elevated)] border-y border-line-strong py-5 shadow-[0_14px_36px_-24px_oklch(0.15_0.045_230/0.45)]">
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
