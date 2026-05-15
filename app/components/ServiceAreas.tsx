"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const AREAS = [
  { name: "Rochester Hills", primary: true },
  { name: "Rochester" },
  { name: "Troy" },
  { name: "Auburn Hills" },
  { name: "Birmingham" },
  { name: "Bloomfield Hills" },
  { name: "Royal Oak" },
  { name: "Sterling Heights" },
  { name: "Shelby Twp" },
  { name: "Clawson" },
  { name: "Madison Heights" },
  { name: "Bloomfield Twp" },
  { name: "Lake Orion" },
  { name: "Oxford" },
  { name: "Beverly Hills" },
  { name: "Berkley" },
];

export function ServiceAreas() {
  return (
    <section
      id="areas"
      className="relative py-20 sm:py-24 scroll-mt-24 bg-ink-950 text-[var(--surface)] overflow-hidden"
    >
      <div className="absolute inset-0 noise opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-32 -left-24 h-[24rem] w-[24rem] rounded-full bg-[oklch(0.68_0.18_145/0.18)] blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-grass-300 font-semibold">
            <MapPin className="h-3.5 w-3.5" /> Where we clean
          </div>
          <h2 className="mt-3 font-display font-extrabold text-display-1 text-[var(--surface)] text-balance">
            Based in Rochester Hills.{" "}
            <span className="italic font-medium text-[oklch(0.985_0.006_220/0.7)]">
              Serving metro Detroit.
            </span>
          </h2>
          <p className="mt-4 text-[oklch(0.985_0.006_220/0.75)] text-lg leading-relaxed max-w-md">
            Most neighborhoods get a same-day or next-day slot. Outside our zone? Drop
            your ZIP at checkout. If we can&apos;t reach you, we&apos;ll tell you in 60
            seconds.
          </p>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ show: { transition: { staggerChildren: 0.03 } } }}
          className="mt-12 flex flex-wrap gap-2.5"
        >
          {AREAS.map((a) => (
            <motion.li
              key={a.name}
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: { opacity: 1, y: 0 },
              }}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                a.primary
                  ? "bg-[var(--surface)] text-ink-950"
                  : "bg-[oklch(0.985_0.006_220/0.06)] text-[oklch(0.985_0.006_220/0.85)] ring-1 ring-[oklch(0.985_0.006_220/0.12)] hover:bg-[oklch(0.985_0.006_220/0.1)]"
              }`}
            >
              <span
                className={`inline-block h-1.5 w-1.5 rounded-full ${
                  a.primary ? "bg-grass-500" : "bg-grass-400"
                }`}
              />
              {a.name}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
