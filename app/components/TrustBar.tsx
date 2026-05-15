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
    <section className="relative bg-ink-950 text-[var(--surface)]" aria-label="What you're getting">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-5 sm:py-6"
        >
          {ITEMS.map((it) => (
            <motion.div
              key={it.label}
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: { opacity: 1, y: 0 },
              }}
              className="flex items-center gap-2.5 text-[13px] sm:text-sm"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-grass-500 shadow-[0_0_0_4px_oklch(0.68_0.18_145/0.18)]" />
              <it.icon className="h-3.5 w-3.5 text-grass-300 flex-none" strokeWidth={2.2} />
              <span className="font-medium text-[var(--surface)]">{it.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
