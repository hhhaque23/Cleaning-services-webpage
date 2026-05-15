"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Hammer,
  KeyRound,
  Sparkles,
  X as XIcon,
} from "lucide-react";
import { PHOTOS } from "@/lib/unsplash";
import { TIER_META, type Tier } from "./Booking/pricing";
import { TIER_SLUG } from "@/lib/tiers";

type IncludedGroup = { title: string; items: string[] };

type TierContent = {
  hero: string;
  heroAlt: string;
  includesPhoto: string;
  includesAlt: string;
  Icon: typeof Sparkles;
  oneLiner: string;
  bestFor: { label: string; body: string }[];
  included: IncludedGroup[];
  notIncluded?: string[];
  durationHint: string;
  extras?: string[];
};

const CONTENT: Record<Tier, TierContent> = {
  Standard: {
    hero: PHOTOS.livingRoom,
    heroAlt: "A sunlit living room, the standard finish",
    includesPhoto: PHOTOS.livingRoom,
    includesAlt: "A living room mid-afternoon, dusted and vacuumed",
    Icon: Sparkles,
    oneLiner:
      "The recurring upkeep clean. Built for already-tidy homes on a maintenance schedule.",
    bestFor: [
      {
        label: "Subscribers",
        body: "Best paired with biweekly or weekly. Same cleaner, locked rate.",
      },
      {
        label: "Already-tidy homes",
        body: "Assumes a Deep clean has already been done within the last 60 days.",
      },
      {
        label: "Single visits welcome",
        body: "One-time Standards are fine if your place is in good shape.",
      },
    ],
    included: [
      {
        title: "Kitchen",
        items: [
          "Counters and backsplashes wiped",
          "Sink scrubbed and polished",
          "Stovetop and exterior of appliances",
          "Microwave inside and out",
          "Floor swept and mopped",
        ],
      },
      {
        title: "Bathrooms",
        items: [
          "Sinks, mirrors, and fixtures",
          "Toilets inside and out",
          "Tub or shower scrubbed",
          "Floors mopped",
        ],
      },
      {
        title: "Bedrooms and living areas",
        items: [
          "Surfaces dusted, including shelves and frames",
          "Vacuum carpets and rugs",
          "Mop hard floors",
          "Beds made if linens are left out",
        ],
      },
      {
        title: "Throughout",
        items: ["Trash and recycling out", "Light tidying", "Final walk-through"],
      },
    ],
    notIncluded: [
      "Inside ovens, fridges, or cabinets",
      "Baseboards, window tracks, or vents",
      "Hand-detailed grout, descaling",
    ],
    durationHint: "Typical 2 bed / 1 bath: 1.5 to 2 hours.",
  },
  Deep: {
    hero: PHOTOS.bathroom,
    heroAlt: "A bright bathroom with detailed surfaces, after a deep clean",
    includesPhoto: PHOTOS.livingRoom,
    includesAlt: "A living room freshly deep-cleaned, including baseboards and vents",
    Icon: Hammer,
    oneLiner:
      "Everything Standard misses, hand-detailed. Required before your first recurring clean.",
    bestFor: [
      {
        label: "First-time clients",
        body: "We start with a Deep clean so your recurring rate stays low.",
      },
      {
        label: "Seasonal resets",
        body: "Spring, end of summer, post-holiday. Quarterly works for most homes.",
      },
      {
        label: "Post-event or post-renovation",
        body: "After hosting, after construction dust, after a tough month.",
      },
    ],
    included: [
      {
        title: "Everything in Standard, plus",
        items: [
          "Hand-detailed kitchen and bathrooms",
          "Cabinet fronts wiped",
          "Range hood and behind reachable appliances",
        ],
      },
      {
        title: "Kitchen deep",
        items: [
          "Cabinet fronts hand-cleaned",
          "Backsplash de-greased",
          "Around and behind toaster, coffee maker, kettle",
        ],
      },
      {
        title: "Bathroom deep",
        items: ["Grout hand-scrubbed", "Fixtures descaled", "Exhaust vents wiped"],
      },
      {
        title: "Throughout deep",
        items: [
          "Baseboards hand-wiped",
          "Door frames, switches, vent covers",
          "Light fixtures dusted",
        ],
      },
    ],
    durationHint: "Typical 2 bed / 1 bath: 3 to 4 hours.",
    extras: [
      "Add inside-oven or inside-fridge at checkout",
      "Add interior windows for the full reset",
    ],
  },
  MoveInOut: {
    hero: PHOTOS.emptyRoom,
    heroAlt: "An empty room ready for the next tenant, freshly cleaned",
    includesPhoto: PHOTOS.bedroom,
    includesAlt: "A bedroom emptied and turned, ready for handover",
    Icon: KeyRound,
    oneLiner:
      "Empty home, top to bottom. The clean that gets deposits back and homes sold.",
    bestFor: [
      {
        label: "Renters moving out",
        body: "Deposit-back guarantee: if your landlord deducts cleaning costs, we refund the difference.",
      },
      {
        label: "Landlords flipping units",
        body: "Photo report on completion, ready for the next listing within 24 hours.",
      },
      {
        label: "Homeowners staging",
        body: "Empty house, ready for photos or final walk-through.",
      },
    ],
    included: [
      {
        title: "Everything in Deep, plus",
        items: [
          "Inside ovens, fridges, and freezers",
          "Inside every cabinet and drawer",
          "Window tracks and light fixtures",
        ],
      },
      {
        title: "Kitchen move-out",
        items: [
          "Oven racks, glass, and interior",
          "Fridge and freezer interiors, gaskets",
          "All cabinetry inside and out",
        ],
      },
      {
        title: "Throughout move-out",
        items: [
          "Walls spot-cleaned",
          "Window sills, tracks, and frames",
          "Inside closets, light fixtures",
        ],
      },
      {
        title: "On completion",
        items: [
          "Photo report sent by text",
          "Optional certificate for landlord or buyer",
        ],
      },
    ],
    durationHint: "Typical 2 bed / 1 bath empty: 5 to 6 hours.",
    extras: ["Carpet shampoo bookable as an add-on"],
  },
};

export function ServiceDetail({ tier }: { tier: Tier }) {
  const meta = TIER_META[tier];
  const c = CONTENT[tier];
  const Icon = c.Icon;

  return (
    <>
      <section className="relative overflow-hidden pt-32 sm:pt-36 lg:pt-44 pb-16 sm:pb-20">
        <div className="absolute inset-0 -z-10 bg-grid-faint bg-grid-32 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_70%)]" />

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full bg-ink-100 text-ink-800 text-xs font-semibold px-3 py-1.5 uppercase tracking-wider"
              >
                <Icon className="h-3.5 w-3.5" /> {meta.tagline}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="mt-4 font-display font-extrabold text-hero text-balance text-ink-950"
              >
                {meta.label}.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-5 max-w-xl text-lead text-ink-700 leading-relaxed text-pretty"
              >
                {c.oneLiner}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="mt-8 flex flex-wrap items-center gap-5"
              >
                <div>
                  <div className="text-[11px] uppercase tracking-[0.12em] font-semibold text-ink-600">
                    From
                  </div>
                  <div className="mt-0.5 flex items-baseline gap-2">
                    <span className="font-display font-extrabold text-5xl text-ink-950 tabular-nums">
                      ${meta.base}
                    </span>
                    <span className="text-ink-700 text-sm">flat-priced</span>
                  </div>
                </div>
                <div className="h-10 w-px bg-line-strong" />
                <div className="text-sm text-ink-700 max-w-[16rem]">{c.durationHint}</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.22 }}
                className="mt-8 flex flex-col sm:flex-row gap-3"
              >
                <Link
                  href={`/book?tier=${TIER_SLUG[tier]}`}
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-grass-500 hover:bg-grass-600 text-white font-semibold px-7 py-3.5 text-[15px] shadow-commit transition-all duration-300 ease-out-quint cursor-pointer"
                >
                  Book this clean
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out-quint group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/#tiers"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--surface-elevated)] hover:bg-white border border-line text-ink-950 font-semibold px-7 py-3.5 text-[15px] transition-all duration-300 ease-out-quint cursor-pointer"
                >
                  Compare tiers
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden">
                <Image
                  src={c.hero}
                  alt={c.heroAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[oklch(0.11_0.04_230/0.45)] via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative pt-12 sm:pt-16 pb-20 sm:pb-24 border-t border-line">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <motion.figure
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full aspect-[21/9] sm:aspect-[24/9] overflow-hidden rounded-[1.5rem] mb-14 sm:mb-16"
          >
            <Image
              src={c.includesPhoto}
              alt={c.includesAlt}
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.13_0.045_230/0.45)] via-transparent to-transparent" />
            <figcaption className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 text-[var(--surface)]">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[oklch(0.13_0.045_230/0.5)] backdrop-blur-sm text-[var(--surface)] text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-1.5">
                <span className="inline-block h-1 w-1 rounded-full bg-grass-400" />
                {meta.label}
              </div>
              <div className="mt-2 font-display font-bold text-xl sm:text-2xl tracking-[-0.018em] max-w-md">
                What every {meta.label.toLowerCase()} clean covers.
              </div>
            </figcaption>
          </motion.figure>

          <div className="grid lg:grid-cols-[1fr_2.2fr] gap-12 lg:gap-20 items-start">
            <div className="lg:sticky lg:top-24">
              <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-grass-700">
                What&apos;s included
              </div>
              <h2 className="mt-3 font-display font-extrabold text-display-1 text-ink-950 text-balance">
                Every surface,{" "}
                <span className="italic font-medium text-ink-700">named</span>.
              </h2>
              <p className="mt-5 text-ink-700 leading-relaxed">
                No vague checklists. Here&apos;s exactly what your cleaner will do, room
                by room.
              </p>

              {c.notIncluded && (
                <div className="mt-10">
                  <div className="text-[11px] uppercase tracking-[0.12em] font-semibold text-ink-600">
                    Not included
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-ink-700">
                    {c.notIncluded.map((n) => (
                      <li key={n} className="flex items-start gap-2">
                        <XIcon className="h-4 w-4 flex-none mt-0.5 text-ink-400" />
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="divide-y divide-line-strong/40">
              {c.included.map((group, gi) => (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: gi * 0.06 }}
                  className="grid sm:grid-cols-[10rem_1fr] gap-3 sm:gap-8 py-7 first:pt-0 last:pb-0"
                >
                  <div className="font-display font-bold text-lg text-ink-950 leading-tight">
                    {group.title}
                  </div>
                  <ul className="space-y-2.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[15px] text-ink-800"
                      >
                        <Check
                          className="h-4 w-4 mt-1 flex-none text-grass-700"
                          strokeWidth={3}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-24 bg-ink-50/50">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-grass-700">
            Best for
          </div>
          <h2 className="mt-3 font-display font-extrabold text-display-1 text-ink-950 max-w-2xl text-balance">
            Pick this tier when{" "}
            <span className="italic font-medium text-ink-700">these are true</span>.
          </h2>

          <ol className="mt-12 divide-y divide-line-strong/40">
            {c.bestFor.map((b, bi) => (
              <motion.li
                key={b.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: bi * 0.07 }}
                className="grid sm:grid-cols-[6rem_1fr] gap-3 sm:gap-10 py-7 first:pt-0 last:pb-0 items-baseline"
              >
                <div className="font-display font-extrabold text-4xl text-grass-700 tabular-nums">
                  {String(bi + 1).padStart(2, "0")}
                </div>
                <div>
                  <div className="font-display font-bold text-xl text-ink-950">
                    {b.label}
                  </div>
                  <p className="mt-1.5 text-[15px] text-ink-800 leading-relaxed max-w-xl">
                    {b.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>

          {c.extras && (
            <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-600">
                Optional add-ons
              </span>
              {c.extras.map((e) => (
                <span key={e} className="text-ink-800">
                  · {e}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
