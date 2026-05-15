"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { PHOTOS } from "@/lib/unsplash";

export function Team() {
  return (
    <section className="relative py-16 sm:py-24 bg-[var(--surface-tint)]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-[1fr_auto] items-end gap-6"
        >
          <div className="max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.14em] text-ink-600 font-semibold">
              Meet your cleaners
            </div>
            <h2 className="mt-3 font-display font-extrabold text-display-1 text-ink-950 text-balance">
              The same trusted face,{" "}
              <span className="italic font-medium text-ink-700">every visit.</span>
            </h2>
          </div>
          <p className="text-ink-700 lg:text-right max-w-xs">
            Hired locally, trained relentlessly, paid above market. No subcontractors,
            ever.
          </p>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1.5 sm:gap-2"
        >
          {PHOTOS.team.map((m) => (
            <motion.li
              key={m.name}
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
              className="group relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={m.photo}
                  alt={m.name}
                  fill
                  sizes="(min-width: 1024px) 240px, 45vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/92 via-ink-950/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-[var(--surface)]">
                  <div className="inline-flex items-center gap-1 rounded-full bg-grass-500/30 backdrop-blur-sm text-grass-300 text-[10px] font-bold uppercase tracking-[0.12em] px-2 py-1 mb-2">
                    <BadgeCheck className="h-3 w-3" /> Vetted
                  </div>
                  <div className="font-display font-bold text-lg sm:text-xl leading-tight">
                    {m.name}
                  </div>
                  <div className="text-xs text-[oklch(0.985_0.006_220/0.78)] mt-0.5">
                    {m.role}
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
