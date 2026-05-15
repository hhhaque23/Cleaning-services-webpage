"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Users, MapPin } from "lucide-react";
import { PHOTOS } from "@/lib/unsplash";

export function AboutHero() {
  return (
    <section className="relative overflow-hidden pt-32 sm:pt-36 lg:pt-44 pb-12 sm:pb-16">
      <div className="absolute inset-0 -z-10 bg-grid-faint bg-grid-32 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-[11px] uppercase tracking-[0.14em] text-ink-600 font-semibold"
            >
              About Pristine
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 font-display font-extrabold text-hero text-balance text-ink-950"
            >
              Real cleaners.
              <br />
              Real homes.{" "}
              <span className="italic font-medium text-ink-700">
                Real guarantee.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-lead text-ink-700 leading-relaxed text-pretty"
            >
              No subcontractors, no surge pricing, no chase calls. Pristine is a small
              local crew that has cleaned more than 12,000 homes around Rochester Hills
              since 2019, paid above market, and trained relentlessly.
            </motion.p>

            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
              className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm"
            >
              {[
                { icon: Users, label: "Locally hired team of 14" },
                { icon: ShieldCheck, label: "$2M insured, fully bonded" },
                { icon: MapPin, label: "Serving 16 metro Detroit suburbs" },
              ].map((b) => (
                <motion.li
                  key={b.label}
                  variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                  className="flex items-center gap-2 text-ink-800"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[oklch(0.65_0.13_220/0.1)] text-ink-700">
                    <b.icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </span>
                  <span className="font-medium">{b.label}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[5/6] rounded-[2rem] overflow-hidden shadow-lift">
              <Image
                src={PHOTOS.livingRoom}
                alt="A sunlit living room, late afternoon, after a Pristine clean"
                fill
                priority
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[oklch(0.11_0.04_230/0.45)] via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
