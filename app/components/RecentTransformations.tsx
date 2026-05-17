"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { ALL_PHOTOS } from "@/lib/unsplash";
import { EASE_OUT_QUINT } from "./motion/motion-primitives";

// 8 distinct photos for the grid. Indices chosen so within this grid every
// photo is unique, and to minimize repeat with other home-page sections.
const TILE_INDICES = [9, 11, 12, 17, 22, 1, 7, 18];

const TILES = TILE_INDICES.map((i) => ALL_PHOTOS[i]);

export function RecentTransformations() {
  return (
    <section className="relative py-20 sm:py-28 bg-[var(--surface-tint)] overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE_OUT_QUINT }}
          className="flex items-end justify-between gap-6 flex-wrap"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-ink-600 font-semibold">
              <Camera className="h-3.5 w-3.5 text-grass-700" />
              <span>From real cleans</span>
            </div>
            <h2 className="mt-3 font-display font-extrabold text-display-1 text-ink-950 text-balance leading-[1.05]">
              Recent transformations.
            </h2>
            <p className="mt-3 text-ink-700 text-lg leading-relaxed">
              A small sample of homes we&apos;ve cleaned in the last few weeks across metro Detroit.
            </p>
          </div>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {TILES.map((t, i) => (
            <motion.li
              key={`${t.label}-${i}`}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT_QUINT } },
              }}
            >
              <figure className="group relative aspect-[4/5] rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-shadow cursor-default">
                <Image
                  src={t.src}
                  alt={`${t.label} · ${t.sub}`}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
                  className="object-cover transition-transform duration-700 ease-out-quint group-hover:scale-[1.06]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/15 to-transparent" />
                <figcaption className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="font-display font-bold text-base leading-tight">{t.label}</div>
                  <div className="mt-0.5 text-[11px] uppercase tracking-wider text-white/75 font-semibold">
                    {t.sub}
                  </div>
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
