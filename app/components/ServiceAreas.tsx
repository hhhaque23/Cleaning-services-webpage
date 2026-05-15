"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const AREAS: { name: string; primary?: boolean }[] = [
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
    <section id="areas" className="relative py-16 sm:py-20 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-ink-600 font-semibold">
              <MapPin className="h-3.5 w-3.5" /> Where we clean
            </div>
            <h2 className="mt-3 font-display font-extrabold text-display-1 text-ink-950 text-balance">
              Based in Rochester Hills.{" "}
              <span className="italic font-medium text-ink-700">
                Serving metro Detroit.
              </span>
            </h2>
            <p className="mt-4 text-ink-700 text-lg leading-relaxed max-w-md">
              Most neighborhoods get a same-day or next-day slot. Outside our zone? Drop
              your ZIP at checkout. If we can&apos;t reach you, we&apos;ll tell you in
              60 seconds.
            </p>
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ show: { transition: { staggerChildren: 0.035 } } }}
            className="grid sm:grid-cols-2 gap-x-10 divide-y divide-line border-t border-line"
          >
            {AREAS.map((a) => (
              <motion.li
                key={a.name}
                variants={{
                  hidden: { opacity: 0, y: 6 },
                  show: { opacity: 1, y: 0 },
                }}
                className="group flex items-baseline gap-3 py-3.5 sm:[&:nth-child(2)]:border-t-0 sm:[&:nth-child(1)]:border-t-0"
              >
                <span
                  className={`inline-block h-1.5 w-1.5 flex-none rounded-full ${
                    a.primary ? "bg-grass-500" : "bg-grass-500/55"
                  }`}
                />
                <span
                  className={`flex-1 ${
                    a.primary
                      ? "font-display font-bold text-ink-950 text-[17px]"
                      : "font-medium text-ink-900 text-[15px]"
                  }`}
                >
                  {a.name}
                </span>
                {a.primary && (
                  <span className="text-[10px] uppercase tracking-[0.14em] font-bold text-grass-700">
                    Headquarters
                  </span>
                )}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
