"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Hammer, KeyRound, ArrowRight } from "lucide-react";
import { startingPrice, type Tier } from "./Booking/pricing";

type Card = {
  tier: Tier;
  title: string;
  tagline: string;
  icon: typeof Sparkles;
  features: string[];
  popular?: boolean;
};

const CARDS: Card[] = [
  {
    tier: "Standard",
    title: "Standard",
    tagline: "Recurring upkeep, weekly or biweekly",
    icon: Sparkles,
    features: [
      "Kitchen, bathrooms, bedrooms, common areas",
      "Surface dusting, vacuum, mop, trash out",
      "Stays affordable on a subscription",
      "Best for already-tidy homes",
    ],
  },
  {
    tier: "Deep",
    title: "Deep clean",
    tagline: "First-time, seasonal, or back-on-track",
    icon: Hammer,
    popular: true,
    features: [
      "Everything in Standard +",
      "Inside cabinet fronts, baseboards, vents",
      "Hand-detailed kitchen & bathrooms",
      "Required before your first recurring clean",
    ],
  },
  {
    tier: "MoveInOut",
    title: "Move in / out",
    tagline: "Empty home, top to bottom",
    icon: KeyRound,
    features: [
      "Inside ovens, fridges, cabinets, drawers",
      "Window tracks, baseboards, light fixtures",
      "Deposit-back guarantee for renters",
      "Photo report on completion",
    ],
  },
];

export function Tiers() {
  return (
    <section id="tiers" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full bg-ink-100 text-ink-800 text-xs font-semibold px-3 py-1.5 uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" /> Three tiers, zero guesswork
          </div>
          <h2 className="mt-4 font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-ink-950">
            Pick the clean that fits the moment.
          </h2>
          <p className="mt-4 text-ink-800/80 text-lg">
            Every tier is flat-priced. Configure your home below and the price is final. No
            upsells when our team arrives.
          </p>
        </motion.div>

        <div className="mt-12 grid md:grid-cols-3 gap-5 lg:gap-6">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.tier}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
              className={`relative rounded-3xl border p-6 sm:p-7 flex flex-col transition-all hover:-translate-y-1 hover:shadow-ring ${
                c.popular
                  ? "bg-ink-950 text-white border-transparent shadow-glow md:scale-[1.03]"
                  : "bg-white border-ink-200/70 shadow-card"
              }`}
            >
              {c.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-grass-500 text-white text-[11px] font-bold px-3 py-1 uppercase tracking-wider shadow-[0_8px_18px_-6px_rgba(34,197,94,0.7)]">
                  Most booked
                </span>
              )}

              <span
                className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${
                  c.popular ? "bg-white/10 text-grass-400" : "bg-ink-100 text-ink-700"
                }`}
              >
                <c.icon className="h-5 w-5" />
              </span>

              <h3
                className={`mt-5 font-display font-bold text-2xl tracking-tight ${
                  c.popular ? "text-white" : "text-ink-950"
                }`}
              >
                {c.title}
              </h3>
              <p
                className={`mt-1 text-sm ${
                  c.popular ? "text-ink-100/85" : "text-ink-700/85"
                }`}
              >
                {c.tagline}
              </p>

              <div className="mt-6 flex items-baseline gap-1.5">
                <span
                  className={`text-xs uppercase tracking-wider font-semibold ${
                    c.popular ? "text-ink-100/70" : "text-ink-600"
                  }`}
                >
                  From
                </span>
                <span
                  className={`font-display font-extrabold text-4xl ${
                    c.popular ? "text-white" : "text-ink-950"
                  }`}
                >
                  ${startingPrice(c.tier)}
                </span>
              </div>

              <ul className="mt-6 space-y-2.5 flex-1">
                {c.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <span
                      className={`mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full ${
                        c.popular
                          ? "bg-grass-500/20 text-grass-400"
                          : "bg-grass-500/15 text-grass-700"
                      }`}
                    >
                      <Check className="h-3 w-3" strokeWidth={3.5} />
                    </span>
                    <span
                      className={c.popular ? "text-ink-100/90" : "text-ink-800"}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={`#booking?tier=${c.tier}`}
                className={`mt-7 group inline-flex items-center justify-between gap-2 rounded-2xl px-5 py-3.5 font-semibold transition-all cursor-pointer ${
                  c.popular
                    ? "bg-grass-500 hover:bg-grass-600 text-white shadow-[0_12px_28px_-10px_rgba(34,197,94,0.7)]"
                    : "bg-ink-950 hover:bg-ink-900 text-white"
                }`}
              >
                Configure &amp; book
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
