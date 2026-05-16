"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Repeat, Sparkles, TrendingDown } from "lucide-react";

export function SubscriptionCallout() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-[var(--surface-tint)] text-ink-950 p-6 sm:p-10 lg:p-12 overflow-hidden border border-line-strong/40"
        >
          {/* Animated grass corner shapes */}
          <motion.div
            aria-hidden="true"
            className="absolute -top-32 -right-24 h-[22rem] w-[22rem] rounded-full bg-[oklch(0.68_0.18_145/0.32)] blur-3xl pointer-events-none"
            animate={{ scale: [1, 1.06, 1], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 6, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute -bottom-32 -left-20 h-[18rem] w-[18rem] rounded-full bg-[oklch(0.68_0.18_145/0.22)] blur-3xl pointer-events-none"
            animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: [0.45, 0, 0.55, 1], delay: 3 }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute top-1/3 -left-10 h-[10rem] w-[10rem] rounded-full bg-[oklch(0.65_0.13_220/0.18)] blur-3xl pointer-events-none"
            animate={{ x: [0, 12, 0], y: [0, -8, 0], opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 8, repeat: Infinity, ease: [0.45, 0, 0.55, 1], delay: 1 }}
          />

          <div className="relative grid lg:grid-cols-[1.05fr_1fr] gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-grass-500/12 text-grass-700 text-xs font-semibold px-3 py-1.5 uppercase tracking-wider">
                <Repeat className="h-3.5 w-3.5" /> Set it &amp; forget it
              </div>
              <h2 className="mt-4 font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-ink-950">
                Save up to 20% with biweekly.
              </h2>
              <p className="mt-4 text-ink-700 text-lg leading-relaxed max-w-xl">
                Subscribers get the same cleaner each visit, locked rates, and the
                first slot on the calendar. Cancel any time, no contracts, no fees.
              </p>

              <ul className="mt-6 space-y-2.5 text-[15px]">
                {[
                  "Same trusted cleaner every visit",
                  "Priority booking. Pick your day forever",
                  "Locked-in rates, no surge pricing",
                  "Skip or reschedule from a text",
                ].map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-ink-800">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-grass-500/15 text-grass-700">
                      <Sparkles className="h-3 w-3" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/book?frequency=biweekly"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-ink-950 hover:bg-ink-900 text-white font-semibold px-6 py-3.5 shadow-[0_20px_50px_-20px_oklch(0.13_0.045_230/0.55)] transition-all cursor-pointer"
                >
                  Start a biweekly plan
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/about#faq"
                  className="inline-flex items-center justify-center rounded-2xl bg-[var(--surface)] hover:bg-white border border-line-strong text-ink-950 font-semibold px-6 py-3.5 transition-all cursor-pointer"
                >
                  How billing works
                </Link>
              </div>
            </div>

            <div className="relative pt-3">
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.45 }}
                className="absolute -top-1 right-5 z-10 inline-flex items-center gap-1.5 rounded-full bg-ink-950 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 shadow-[0_12px_28px_-10px_oklch(0.13_0.045_230/0.45)]"
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-grass-400" />
                Most popular plan
              </motion.div>

              <div className="rounded-3xl bg-white text-ink-950 p-5 sm:p-6 shadow-card border border-line">
                <div className="text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Two-year savings
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-display font-extrabold text-5xl tabular-nums">$2,496</span>
                  <span className="text-grass-700 text-sm font-semibold inline-flex items-center gap-1">
                    <TrendingDown className="h-4 w-4" /> 18% off
                  </span>
                </div>
                <div className="mt-1 text-sm text-ink-700">
                  vs. paying one-time rates over 52 visits
                </div>

                <hr className="my-5 border-ink-100" />

                <Bar label="One-time per visit" value="$169" pct={100} muted />
                <Bar label="Biweekly per visit" value="$144" pct={82} highlight />

                <div className="mt-5 rounded-xl bg-ink-50 p-3.5 text-sm text-ink-800 leading-relaxed">
                  <span className="font-semibold text-ink-950">Lifetime value:</span>{" "}
                  recurring clients average 24 cleans / year. Every biweekly slot stays
                  with you, locked at today&apos;s price.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Bar({
  label,
  value,
  pct,
  highlight,
  muted,
}: {
  label: string;
  value: string;
  pct: number;
  highlight?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="mt-3 first:mt-0">
      <div className="flex items-center justify-between text-sm">
        <span className={muted ? "text-ink-700" : "text-ink-950 font-semibold"}>
          {label}
        </span>
        <span className={highlight ? "text-grass-700 font-bold" : "text-ink-700 font-semibold"}>
          {value}
        </span>
      </div>
      <div className="mt-1.5 h-2 rounded-full bg-ink-100 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full ${
            highlight ? "bg-grass-500" : "bg-ink-400"
          }`}
        />
      </div>
    </div>
  );
}
