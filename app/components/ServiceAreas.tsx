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
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-1.5 rounded-full bg-ink-100 text-ink-800 text-xs font-semibold px-3 py-1.5 uppercase tracking-wider">
              <MapPin className="h-3.5 w-3.5" /> Where we clean
            </div>
            <h2 className="mt-4 font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-ink-950">
              Based in Rochester Hills. Serving metro Detroit.
            </h2>
            <p className="mt-4 text-ink-800/85 text-lg leading-relaxed max-w-md">
              Most neighborhoods get a same-day or next-day slot. Outside our zone? Drop your
              ZIP at checkout. If we can&apos;t reach you, we&apos;ll tell you in 60 seconds.
            </p>
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ show: { transition: { staggerChildren: 0.03 } } }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2"
          >
            {AREAS.map((a) => (
              <motion.li
                key={a.name}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  show: { opacity: 1, y: 0 },
                }}
                className={`rounded-xl px-3.5 py-3 text-sm font-medium border transition-all hover:-translate-y-0.5 ${
                  a.primary
                    ? "bg-ink-950 text-white border-transparent shadow-card"
                    : "bg-white border-ink-200/70 text-ink-900 hover:border-ink-500"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span
                    className={`inline-block h-1.5 w-1.5 rounded-full ${
                      a.primary ? "bg-grass-400" : "bg-grass-500"
                    }`}
                  />
                  {a.name}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
