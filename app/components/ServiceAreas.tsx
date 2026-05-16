"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Clock, Sparkles } from "lucide-react";
import { EASE_OUT_QUINT } from "./motion/motion-primitives";
import { MagneticButton } from "./motion/MagneticButton";
import { Aurora } from "./motion/Aurora";

type City = { name: string; minutes: number };

const CITIES: City[] = [
  { name: "Rochester", minutes: 5 },
  { name: "Auburn Hills", minutes: 9 },
  { name: "Lake Orion", minutes: 8 },
  { name: "Troy", minutes: 11 },
  { name: "Shelby Twp", minutes: 12 },
  { name: "Bloomfield Twp", minutes: 14 },
  { name: "Bloomfield Hills", minutes: 16 },
  { name: "Oxford", minutes: 16 },
  { name: "Madison Heights", minutes: 17 },
  { name: "Sterling Heights", minutes: 18 },
  { name: "Birmingham", minutes: 18 },
  { name: "Clawson", minutes: 20 },
  { name: "Royal Oak", minutes: 22 },
  { name: "Beverly Hills", minutes: 22 },
  { name: "Berkley", minutes: 24 },
];

export function ServiceAreas() {
  const viewport = { once: true, margin: "-60px" } as const;
  const reduce = useReducedMotion();

  return (
    <section
      id="areas"
      className="relative py-24 sm:py-32 scroll-mt-24 bg-[var(--surface-tint)] overflow-hidden"
    >
      <Aurora palette="grass" intensity="subtle" blur={90} blobs={2} />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.65, ease: EASE_OUT_QUINT }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-ink-600 font-semibold">
            <MapPin className="h-3.5 w-3.5 text-grass-700" />
            <span>Where we clean</span>
          </div>
          <h2 className="mt-3 font-display font-extrabold text-display-1 text-ink-950 text-balance leading-[1.05]">
            Based in Rochester Hills.{" "}
            <span className="italic font-medium text-ink-700">Serving Oakland County.</span>
          </h2>
          <p className="mt-4 text-ink-700 text-lg leading-relaxed max-w-md">
            Sixteen neighborhoods, dispatch within the hour. Outside our zone? Drop your ZIP at
            checkout and we&apos;ll tell you in 60 seconds.
          </p>
        </motion.div>

        {/* HQ feature card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: EASE_OUT_QUINT, delay: 0.1 }}
          className="mt-12 relative rounded-[1.75rem] bg-ink-950 text-white p-7 sm:p-9 shadow-lift overflow-hidden"
        >
          <div className="absolute inset-0 noise opacity-40 pointer-events-none" />
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[oklch(0.68_0.18_145/0.3)] blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[oklch(0.65_0.13_220/0.18)] blur-3xl pointer-events-none" />

          <div className="relative grid sm:grid-cols-[1fr_auto] items-center gap-6">
            <div className="flex items-start gap-4">
              <span className="relative inline-flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-[oklch(0.68_0.18_145/0.2)] text-grass-300">
                {!reduce && (
                  <motion.span
                    aria-hidden
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                    className="absolute inset-0 rounded-2xl bg-grass-500/30"
                  />
                )}
                <MapPin className="relative h-6 w-6" strokeWidth={2.2} />
              </span>
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-grass-500/15 text-grass-300 text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-1">
                  <span className="inline-block h-1 w-1 rounded-full bg-grass-300" />
                  Headquarters
                </div>
                <div className="mt-2 font-display font-extrabold text-2xl sm:text-3xl tracking-[-0.022em]">
                  Rochester Hills, MI
                </div>
                <p className="mt-1 text-white/75 text-sm sm:text-base leading-relaxed">
                  Our home base. Crews dispatched from here cover{" "}
                  <span className="font-semibold text-white">15 nearby neighborhoods</span>,{" "}
                  typically within the hour.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-1 sm:auto-rows-min gap-3 sm:gap-2 text-center sm:text-right">
              <Stat label="Crews" value="14" />
              <Stat label="Zip codes" value="22" />
              <Stat label="Coverage radius" value="25 mi" />
            </div>
          </div>
        </motion.div>

        {/* City grid */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.2 } } }}
          className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
        >
          {CITIES.map((c) => (
            <motion.li
              key={c.name}
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, ease: EASE_OUT_QUINT },
                },
              }}
            >
              <MagneticButton as="div" radius={40} strength={0.18}>
                <div className="group relative rounded-2xl border border-line-strong/40 bg-[var(--surface-elevated)] px-4 py-3.5 hover:border-grass-500/50 hover:shadow-card transition-all cursor-default">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-display font-bold text-ink-950 text-[15px] tracking-[-0.01em] truncate">
                      {c.name}
                    </div>
                    <span className="relative inline-flex h-1.5 w-1.5 flex-none">
                      <span className="absolute inset-0 rounded-full bg-grass-500/40 group-hover:bg-grass-500 transition-colors" />
                      <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-grass-500 group-hover:scale-125 transition-transform" />
                    </span>
                  </div>
                  <div className="mt-1.5 inline-flex items-center gap-1 text-xs text-ink-700 font-medium tabular-nums">
                    <Clock className="h-3 w-3 text-ink-faint" />
                    {c.minutes} min from HQ
                  </div>
                </div>
              </MagneticButton>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-700"
        >
          <span className="inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-grass-600" />
            <span className="font-semibold text-ink-950">16 neighborhoods</span>
            <span>covered</span>
          </span>
          <span className="text-line-strong">·</span>
          <span>Dispatch within the hour, most slots</span>
          <span className="text-line-strong">·</span>
          <span>Same-day available when slots are open</span>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 px-3 py-2">
      <div className="text-[10px] uppercase tracking-[0.12em] font-bold text-grass-300/85">
        {label}
      </div>
      <div className="mt-0.5 font-display font-extrabold text-lg text-white tabular-nums">
        {value}
      </div>
    </div>
  );
}
