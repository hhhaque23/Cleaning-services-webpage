"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
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
import { SplitText } from "./motion/SplitText";
import { MagneticButton } from "./motion/MagneticButton";
import { Aurora } from "./motion/Aurora";
import { EASE_OUT_QUINT } from "./motion/motion-primitives";

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
  palette: "cyan" | "grass" | "mixed";
};

const CONTENT: Record<Tier, TierContent> = {
  Standard: {
    hero: PHOTOS.livingRoomAlt,
    heroAlt: "A sunlit living room, the standard finish",
    includesPhoto: PHOTOS.kitchen,
    includesAlt: "A living room mid-afternoon, dusted and vacuumed",
    Icon: Sparkles,
    palette: "cyan",
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
    hero: PHOTOS.bathroomBright,
    heroAlt: "A bright bathroom with detailed surfaces, after a deep clean",
    includesPhoto: PHOTOS.diningRoom,
    includesAlt: "A living room freshly deep-cleaned, including baseboards and vents",
    Icon: Hammer,
    palette: "grass",
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
    includesPhoto: PHOTOS.bedroomAlt,
    includesAlt: "A bedroom emptied and turned, ready for handover",
    Icon: KeyRound,
    palette: "mixed",
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
  const heroRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const [showSticky, setShowSticky] = useState(false);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(heroProgress, [0, 1], [0, -50]);
  const photoScale = useTransform(heroProgress, [0, 1], [1, 1.06]);
  const badgeY = useTransform(heroProgress, [0, 1], [0, -22]);

  useEffect(() => {
    const onScroll = () => {
      const el = heroRef.current;
      if (!el) return;
      const bottom = el.getBoundingClientRect().bottom;
      setShowSticky(bottom < 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-32 sm:pt-36 lg:pt-44 pb-20 sm:pb-24"
      >
        <div className="absolute inset-0 -z-10 bg-grid-faint bg-grid-32 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_70%)]" />
        <Aurora palette={c.palette} intensity="subtle" blur={130} blobs={2} />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
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

              <h1 className="mt-4 font-display font-extrabold text-hero text-balance text-ink-950 leading-[1.02] tracking-[-0.028em]">
                <SplitText as="span" mode="word" trigger="view" stagger={0.06}>
                  {`${meta.label}.`}
                </SplitText>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="mt-5 max-w-xl text-lead text-ink-700 leading-relaxed text-pretty"
              >
                {c.oneLiner}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
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
                transition={{ duration: 0.6, delay: 0.85 }}
                className="mt-8 flex flex-col sm:flex-row gap-3"
              >
                <MagneticButton as="div" radius={130} strength={0.3}>
                  <Link
                    href={`/book?tier=${TIER_SLUG[tier]}`}
                    className="group relative inline-flex items-center justify-center gap-2 rounded-2xl bg-grass-500 hover:bg-grass-600 text-white font-semibold px-7 py-3.5 text-[15px] shadow-commit hover:shadow-commit-glow transition-all duration-300 ease-out-quint cursor-pointer overflow-hidden"
                  >
                    <span
                      aria-hidden
                      className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-grass-500/0 via-grass-400/40 to-grass-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                    />
                    <span className="relative">Book this clean</span>
                    <ArrowRight className="relative h-4 w-4 transition-transform duration-300 ease-out-quint group-hover:translate-x-1" />
                  </Link>
                </MagneticButton>
                <Link
                  href="/#tiers"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--surface-elevated)] hover:bg-[var(--surface)] border border-line text-ink-950 font-semibold px-7 py-3.5 text-[15px] transition-all duration-300 ease-out-quint cursor-pointer"
                >
                  Compare tiers
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: EASE_OUT_QUINT }}
              className="relative"
            >
              <motion.div
                style={reduce ? undefined : { y: photoY, scale: photoScale }}
                className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-lift"
              >
                <Image
                  src={c.hero}
                  alt={c.heroAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[oklch(0.11_0.04_230/0.45)] via-transparent to-transparent" />
              </motion.div>

              <motion.div
                style={reduce ? undefined : { y: badgeY }}
                initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: -3 }}
                transition={{ duration: 0.7, delay: 0.7, ease: EASE_OUT_QUINT }}
                className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6"
              >
                <div className="relative rounded-2xl bg-[var(--surface)] border border-line shadow-card px-4 py-3 flex items-center gap-3">
                  <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${
                    c.palette === "grass"
                      ? "bg-grass-500/15 text-grass-700"
                      : c.palette === "cyan"
                      ? "bg-cyan/10 text-ink-700"
                      : "bg-gradient-to-br from-grass-500/15 to-cyan/15 text-ink-700"
                  }`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="leading-tight">
                    <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-ink-600">
                      Tier
                    </div>
                    <div className="font-display font-bold text-base text-ink-950">
                      {meta.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative pt-12 sm:pt-16 pb-24 sm:pb-28 border-t border-line">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <motion.figure
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, ease: EASE_OUT_QUINT }}
            className="relative w-full aspect-[21/9] sm:aspect-[24/9] overflow-hidden rounded-[1.5rem] mb-16 shadow-card"
          >
            <Image
              src={c.includesPhoto}
              alt={c.includesAlt}
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover animate-ken-burns"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.13_0.045_230/0.55)] via-transparent to-transparent" />
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
              <h2 className="mt-3 font-display font-extrabold text-display-1 text-ink-950 text-balance leading-[1.05]">
                Every surface,{" "}
                <span className="italic font-medium text-ink-700">named.</span>
              </h2>
              <p className="mt-5 text-ink-700 leading-relaxed">
                No vague checklists. Here&apos;s exactly what your cleaner will do, room by room.
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
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.55,
                        delay: gi * 0.08,
                        ease: EASE_OUT_QUINT,
                        staggerChildren: 0.05,
                        delayChildren: gi * 0.08 + 0.2,
                      },
                    },
                  }}
                  className="grid sm:grid-cols-[10rem_1fr] gap-3 sm:gap-8 py-8 first:pt-0 last:pb-0"
                >
                  <div className="font-display font-bold text-lg text-ink-950 leading-tight">
                    {group.title}
                  </div>
                  <ul className="space-y-2.5">
                    {group.items.map((item) => (
                      <motion.li
                        key={item}
                        variants={{
                          hidden: { opacity: 0, x: -8 },
                          show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE_OUT_QUINT } },
                        }}
                        className="flex items-start gap-2.5 text-[15px] text-ink-800"
                      >
                        <motion.svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4 mt-1 flex-none text-grass-700"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <motion.path
                            d="M5 12.5 L10 17.5 L19 7"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            viewport={{ once: true, margin: "-20px" }}
                            transition={{ duration: 0.5, ease: EASE_OUT_QUINT }}
                          />
                        </motion.svg>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 sm:py-28 bg-ink-50/50 overflow-hidden">
        <Aurora palette={c.palette} intensity="subtle" blur={140} blobs={2} />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-grass-700">
            Best for
          </div>
          <h2 className="mt-3 font-display font-extrabold text-display-1 text-ink-950 max-w-2xl text-balance leading-[1.05]">
            Pick this tier when{" "}
            <span className="italic font-medium text-ink-700">these are true.</span>
          </h2>

          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="mt-12 divide-y divide-line-strong/40"
          >
            {c.bestFor.map((b, bi) => (
              <motion.li
                key={b.label}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_QUINT } },
                }}
                className="grid sm:grid-cols-[6rem_1fr] gap-3 sm:gap-10 py-8 first:pt-0 last:pb-0 items-baseline group"
              >
                <motion.div
                  whileHover={{ scale: 1.05, color: "oklch(0.52 0.16 145)" }}
                  className="font-display font-extrabold text-4xl text-grass-700 tabular-nums origin-left cursor-default"
                >
                  {String(bi + 1).padStart(2, "0")}
                </motion.div>
                <div>
                  <div className="font-display font-bold text-xl text-ink-950">{b.label}</div>
                  <p className="mt-1.5 text-[15px] text-ink-800 leading-relaxed max-w-xl">
                    {b.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>

          {c.extras && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm"
            >
              <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-600">
                Optional add-ons
              </span>
              {c.extras.map((e) => (
                <span key={e} className="text-ink-800">
                  · {e}
                </span>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Sticky tier CTA — appears after hero scrolls past */}
      <motion.div
        initial={false}
        animate={{ y: showSticky ? 0 : 80, opacity: showSticky ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        className="fixed bottom-4 left-4 right-4 z-40 pointer-events-none flex justify-center"
      >
        <MagneticButton
          as="div"
          radius={150}
          strength={0.22}
          className="pointer-events-auto"
        >
          <Link
            href={`/book?tier=${TIER_SLUG[tier]}`}
            className="group inline-flex items-center gap-2.5 rounded-full bg-ink-950 hover:bg-ink-900 text-white font-semibold px-5 py-3 shadow-lift transition-all cursor-pointer"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-grass-500 text-white text-xs font-bold">
              <Icon className="h-3.5 w-3.5" />
            </span>
            <span className="text-sm">
              Book a {meta.label.toLowerCase()} clean
            </span>
            <span className="text-grass-400 font-mono text-sm">${meta.base}+</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </MagneticButton>
      </motion.div>
    </>
  );
}
