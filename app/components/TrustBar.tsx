"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Leaf, BadgeCheck, Clock } from "lucide-react";

const ITEMS = [
  { icon: ShieldCheck, label: "Bonded and $2M insured" },
  { icon: BadgeCheck, label: "Every cleaner background-checked" },
  { icon: Leaf, label: "EPA Safer Choice products" },
  { icon: Clock, label: "24-hour re-clean, or it's free" },
];

export function TrustBar() {
  return (
    <section className="relative pt-12 sm:pt-16" aria-label="What you're getting">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          className="flex flex-wrap items-center gap-x-7 gap-y-3 sm:gap-x-10 border-y border-line py-4 sm:py-5"
        >
          {ITEMS.map((it, i) => (
            <motion.div
              key={it.label}
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: { opacity: 1, y: 0 },
              }}
              className="flex items-center gap-2.5 text-[13px] sm:text-sm text-ink-700"
            >
              <span className="inline-flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-[oklch(0.65_0.13_220/0.1)] text-ink-700">
                <it.icon className="h-3.5 w-3.5" strokeWidth={2.2} />
              </span>
              <span className="font-medium text-ink-900">{it.label}</span>
              {i < ITEMS.length - 1 && (
                <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-line-strong ml-7 -mr-3" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
