"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, Repeat, Sparkles, TrendingDown, Check } from "lucide-react";
import { MagneticButton } from "./motion/MagneticButton";
import { Aurora } from "./motion/Aurora";

type Freq = "one-time" | "biweekly" | "weekly";

const PLANS: Record<
  Freq,
  {
    label: string;
    cadence: string;
    perVisit: number;
    visitsPerYear: number;
    perks: string[];
    badge?: string;
  }
> = {
  "one-time": {
    label: "One-time",
    cadence: "every now and then",
    perVisit: 169,
    visitsPerYear: 4,
    perks: ["Fresh slot each booking", "Same crew when available"],
  },
  biweekly: {
    label: "Biweekly",
    cadence: "every two weeks",
    perVisit: 144,
    visitsPerYear: 26,
    badge: "Most popular",
    perks: [
      "Same cleaner every visit",
      "Priority booking, locked rate",
      "Skip or reschedule from a text",
    ],
  },
  weekly: {
    label: "Weekly",
    cadence: "every week",
    perVisit: 129,
    visitsPerYear: 52,
    perks: ["Lowest per-visit rate", "Cleaner becomes part of your household routine"],
  },
};

const FREQS: Freq[] = ["one-time", "biweekly", "weekly"];

export function SubscriptionCallout() {
  const [active, setActive] = useState<Freq>("biweekly");
  const reduce = useReducedMotion();
  const plan = PLANS[active];
  const oneTimePerVisit = PLANS["one-time"].perVisit;
  const annualSpend = plan.perVisit * plan.visitsPerYear;
  const annualFullPrice = oneTimePerVisit * plan.visitsPerYear;
  const annualSavings = annualFullPrice - annualSpend;
  const savingsPct = Math.round((annualSavings / annualFullPrice) * 100);

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[2rem] bg-[var(--surface-tint)] text-ink-950 p-6 sm:p-10 lg:p-14 overflow-hidden border border-line-strong/40 shadow-card"
        >
          <Aurora palette="grass" intensity="subtle" blobs={2} blur={140} />

          <div className="relative grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-start">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-grass-500/12 text-grass-700 text-xs font-semibold px-3 py-1.5 uppercase tracking-wider">
                <Repeat className="h-3.5 w-3.5" /> Set it &amp; forget it
              </div>
              <h2 className="mt-4 font-display font-extrabold text-display-1 leading-[1.05] tracking-[-0.022em] text-ink-950">
                Switch to recurring,{" "}
                <span className="italic font-medium text-ink-700">save the rest of your year.</span>
              </h2>
              <p className="mt-5 text-ink-700 text-lg leading-relaxed max-w-xl">
                Subscribers get the same cleaner each visit, locked rates, and the first slot on the
                calendar. Cancel any time, no contracts, no fees.
              </p>

              <div className="mt-9 rounded-2xl bg-[var(--surface)] p-5 sm:p-6 border border-line shadow-soft">
                <div className="text-[11px] uppercase tracking-[0.14em] text-ink-600 font-semibold">
                  Your annual savings at this cadence
                </div>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="font-display font-extrabold text-5xl sm:text-6xl text-ink-950 tabular-nums tracking-[-0.03em]">
                    $
                    <AnimatedNumber value={annualSavings} />
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`${active}-pct`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.28 }}
                      className={`inline-flex items-center gap-1 text-sm font-bold rounded-full px-2.5 py-1 ${
                        savingsPct > 0
                          ? "bg-grass-500/15 text-grass-700"
                          : "bg-ink-100 text-ink-600"
                      }`}
                    >
                      <TrendingDown className="h-3.5 w-3.5" />
                      {savingsPct}% off
                    </motion.span>
                  </AnimatePresence>
                </div>
                <p className="mt-2 text-sm text-ink-700">
                  vs paying one-time rates for {plan.visitsPerYear} visits over a year.
                </p>

                <div className="mt-5 space-y-3">
                  <Bar
                    label="One-time per visit"
                    value={`$${oneTimePerVisit}`}
                    pct={100}
                    muted
                    keySuffix={active}
                  />
                  <Bar
                    label={`${plan.label} per visit`}
                    value={`$${plan.perVisit}`}
                    pct={Math.max(20, Math.round((plan.perVisit / oneTimePerVisit) * 100))}
                    highlight
                    keySuffix={active}
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <MagneticButton as="div" radius={130} strength={0.28}>
                  <Link
                    href={`/book?frequency=${active === "one-time" ? "one-time" : active}`}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-ink-950 hover:bg-ink-900 text-white font-semibold px-6 py-3.5 shadow-lift transition-all cursor-pointer"
                  >
                    Start {plan.label.toLowerCase()}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </MagneticButton>
                <Link
                  href="/about#faq"
                  className="inline-flex items-center justify-center rounded-2xl bg-[var(--surface)] hover:bg-[var(--surface-elevated)] border border-line-strong text-ink-950 font-semibold px-6 py-3.5 transition-all cursor-pointer"
                >
                  How billing works
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {FREQS.map((f) => {
                const p = PLANS[f];
                const isActive = f === active;
                return (
                  <FreqCard
                    key={f}
                    plan={p}
                    isActive={isActive}
                    onSelect={() => setActive(f)}
                    reduce={!!reduce}
                  />
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FreqCard({
  plan,
  isActive,
  onSelect,
  reduce,
}: {
  plan: (typeof PLANS)[Freq];
  isActive: boolean;
  onSelect: () => void;
  reduce: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={reduce ? undefined : { y: -2 }}
      whileTap={reduce ? undefined : { scale: 0.99 }}
      animate={{
        y: isActive ? -4 : 0,
      }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      className={`relative text-left rounded-2xl p-5 sm:p-6 border transition-all cursor-pointer overflow-hidden ${
        isActive
          ? "bg-[var(--surface)] border-grass-500/60 shadow-commit-glow"
          : "bg-[var(--surface)]/65 border-line hover:border-line-strong"
      }`}
    >
      {isActive && (
        <motion.div
          aria-hidden
          layoutId="freq-glow"
          className="absolute inset-0 -z-10 rounded-2xl"
          style={{
            background:
              "radial-gradient(ellipse at top right, oklch(0.68 0.18 145 / 0.18), transparent 60%)",
          }}
        />
      )}

      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`font-display font-extrabold text-xl tracking-[-0.02em] ${
                isActive ? "text-ink-950" : "text-ink-900"
              }`}
            >
              {plan.label}
            </span>
            {plan.badge && (
              <span className="inline-flex items-center gap-1 rounded-full bg-ink-950 text-white text-[9px] font-bold uppercase tracking-[0.12em] px-2 py-0.5">
                <span className="inline-block h-1 w-1 rounded-full bg-grass-400" />
                {plan.badge}
              </span>
            )}
          </div>
          <div className="mt-0.5 text-sm text-ink-700">{plan.cadence}</div>
        </div>
        <div className="text-right">
          <div className="font-display font-extrabold text-2xl text-ink-950 tabular-nums">
            ${plan.perVisit}
          </div>
          <div className="text-[11px] text-ink-faint font-medium">per visit</div>
        </div>
      </div>

      <ul className="mt-4 space-y-1.5">
        {plan.perks.map((perk) => (
          <li key={perk} className="flex items-start gap-2 text-sm text-ink-800">
            <Check
              className={`h-3.5 w-3.5 mt-0.5 flex-none ${
                isActive ? "text-grass-600" : "text-ink-faint"
              }`}
              strokeWidth={3}
            />
            {perk}
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-grass-700"
          >
            <Sparkles className="h-3 w-3" /> Selected
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function Bar({
  label,
  value,
  pct,
  highlight,
  muted,
  keySuffix,
}: {
  label: string;
  value: string;
  pct: number;
  highlight?: boolean;
  muted?: boolean;
  keySuffix: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className={muted ? "text-ink-700" : "text-ink-950 font-semibold"}>{label}</span>
        <span className={highlight ? "text-grass-700 font-bold tabular-nums" : "text-ink-700 font-semibold tabular-nums"}>
          {value}
        </span>
      </div>
      <div className="mt-1.5 h-2 rounded-full bg-ink-100 overflow-hidden">
        <motion.div
          key={`${keySuffix}-${highlight ? "h" : "m"}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full ${highlight ? "bg-grass-500" : "bg-ink-400"}`}
        />
      </div>
    </div>
  );
}

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      return;
    }
    const start = performance.now();
    const from = display;
    const dur = 540;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 4);
      setDisplay(Math.round(from + (value - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, reduce]);

  return <>{display.toLocaleString()}</>;
}
