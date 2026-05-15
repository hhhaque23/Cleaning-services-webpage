"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { PHOTOS } from "@/lib/unsplash";

export function Team() {
  return (
    <section className="relative py-16 sm:py-24 bg-ink-50/40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full bg-ink-100 text-ink-800 text-xs font-semibold px-3 py-1.5 uppercase tracking-wider">
            <BadgeCheck className="h-3.5 w-3.5" /> Meet your cleaners
          </div>
          <h2 className="mt-4 font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-ink-950">
            The same trusted face, every visit.
          </h2>
          <p className="mt-3 text-ink-800/80 text-lg">
            We hire locally, train relentlessly, and pay above market. No subcontractors,
            ever.
          </p>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5"
        >
          {PHOTOS.team.map((m) => (
            <motion.li
              key={m.name}
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
              className="group"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src={m.photo}
                  alt={m.name}
                  fill
                  sizes="(min-width: 1024px) 220px, 45vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="font-display font-bold text-base">{m.name}</div>
                  <div className="text-xs text-white/85">{m.role}</div>
                </div>
                <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/85 text-ink-950 text-[10px] font-bold uppercase tracking-wider px-2 py-1">
                  <BadgeCheck className="h-3 w-3 text-grass-700" /> Vetted
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
