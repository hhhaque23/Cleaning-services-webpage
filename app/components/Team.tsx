"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, Clock } from "lucide-react";
import { PHOTOS } from "@/lib/unsplash";
import { EASE_OUT_QUINT } from "./motion/motion-primitives";

const JOBS = [PHOTOS.team1, PHOTOS.team2, PHOTOS.team3, PHOTOS.team4, PHOTOS.team5];

export function Team() {
  const reduce = useReducedMotion();

  return (
    <section className="relative py-20 sm:py-28 bg-ink-50/40 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: EASE_OUT_QUINT }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full bg-ink-100 text-ink-800 text-xs font-semibold px-3 py-1.5 uppercase tracking-wider">
            <BadgeCheck className="h-3.5 w-3.5" /> Recent jobs
          </div>
          <h2 className="mt-4 font-display font-extrabold text-display-1 tracking-[-0.022em] text-ink-950">
            Real homes,{" "}
            <span className="italic font-medium text-ink-700">cleaned this week.</span>
          </h2>
          <p className="mt-4 text-ink-800/80 text-lg leading-relaxed">
            A small slice of the rooms we&apos;ve handed back to their owners over the last few days
            across metro Detroit.
          </p>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5"
        >
          {JOBS.map((j, i) => {
            const dir = i % 2 === 0 ? 1.4 : -1.4;
            return (
              <motion.li
                key={`${j.room}-${j.city}`}
                variants={{
                  hidden: { opacity: 0, y: 22, rotate: dir, scale: 0.96 },
                  show: {
                    opacity: 1,
                    y: 0,
                    rotate: 0,
                    scale: 1,
                    transition: { duration: 0.6, ease: EASE_OUT_QUINT },
                  },
                }}
                className="group"
              >
                <motion.div
                  animate={
                    reduce
                      ? undefined
                      : {
                          y: [0, -6, 0],
                        }
                  }
                  transition={{
                    duration: 5 + i * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.25,
                  }}
                  whileHover={reduce ? undefined : { y: -8 }}
                  className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-soft group-hover:shadow-lift transition-shadow"
                >
                  <Image
                    src={j.src}
                    alt={`${j.room} cleaned in ${j.city}`}
                    fill
                    sizes="(min-width: 1024px) 220px, 45vw"
                    className="object-cover transition-transform duration-700 ease-out-quint group-hover:scale-110"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink-950/95 via-ink-950/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="font-display font-bold text-base">{j.room}</div>
                    <div className="text-xs text-white/85 mt-0.5">
                      {j.city} · {j.tier}
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm text-ink-950 text-[10px] font-bold uppercase tracking-wider px-2 py-1">
                    <Clock className="h-3 w-3 text-grass-700" />
                    {j.when}
                  </div>
                </motion.div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
