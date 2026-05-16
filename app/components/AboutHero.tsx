"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Users, MapPin } from "lucide-react";
import { PHOTOS } from "@/lib/unsplash";
import { SplitText } from "./motion/SplitText";
import { Aurora } from "./motion/Aurora";
import { EASE_OUT_QUINT } from "./motion/motion-primitives";

export function AboutHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-32 sm:pt-36 lg:pt-44 pb-16 sm:pb-20">
      <div className="absolute inset-0 -z-10 bg-grid-faint bg-grid-32 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <Aurora palette="mixed" intensity="subtle" blur={120} blobs={2} />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE_OUT_QUINT }}
              className="text-[11px] uppercase tracking-[0.14em] text-ink-600 font-semibold"
            >
              About Pristine
            </motion.div>
            <h1 className="mt-3 font-display font-extrabold text-hero text-balance text-ink-950 leading-[1.02] tracking-[-0.028em]">
              <SplitText as="span" mode="word" trigger="view" stagger={0.06}>
                {"Real cleaners."}
              </SplitText>
              <br />
              <SplitText as="span" mode="word" trigger="view" stagger={0.06} delay={0.3}>
                {"Real homes."}
              </SplitText>{" "}
              <SplitText
                as="span"
                mode="word"
                trigger="view"
                stagger={0.06}
                delay={0.6}
                className="italic font-medium text-ink-700"
              >
                {"Real guarantee."}
              </SplitText>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85, ease: EASE_OUT_QUINT }}
              className="mt-6 max-w-xl text-lead text-ink-700 leading-relaxed text-pretty"
            >
              No subcontractors, no surge pricing, no chase calls. Pristine is a small local crew
              that has cleaned more than 12,000 homes around Rochester Hills since 2019, paid above
              market, and trained relentlessly.
            </motion.p>

            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 1 } } }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {[
                { icon: Users, label: "Locally hired team of 14" },
                { icon: ShieldCheck, label: "$2M insured, fully bonded" },
                { icon: MapPin, label: "Serving 16 metro Detroit suburbs" },
              ].map((b) => (
                <motion.li
                  key={b.label}
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                  whileHover={reduce ? undefined : { y: -2 }}
                  className="group inline-flex items-center gap-2 rounded-full bg-[var(--surface-elevated)] border border-line px-3.5 py-2 text-sm text-ink-800 shadow-soft hover:shadow-card transition-shadow cursor-default"
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[oklch(0.65_0.13_220/0.1)] text-ink-700 group-hover:bg-grass-500/15 group-hover:text-grass-700 transition-colors">
                    <b.icon className="h-3 w-3" strokeWidth={2.4} />
                  </span>
                  <span className="font-medium">{b.label}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: EASE_OUT_QUINT }}
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
              {/* Cinemagraph: subtle sweeping light gradient overlay */}
              <motion.div
                aria-hidden
                animate={
                  reduce
                    ? undefined
                    : {
                        opacity: [0.18, 0.42, 0.18],
                        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                      }
                }
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 mix-blend-screen pointer-events-none"
                style={{
                  background:
                    "linear-gradient(120deg, oklch(0.85 0.14 75 / 0.0) 30%, oklch(0.85 0.14 75 / 0.35) 50%, oklch(0.85 0.14 75 / 0.0) 70%)",
                  backgroundSize: "200% 200%",
                }}
              />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              transition={{ delay: 1.1, duration: 0.6, ease: EASE_OUT_QUINT }}
              className="absolute -bottom-3 -left-3 sm:-bottom-5 sm:-left-5 bg-[var(--surface)] rounded-2xl px-4 py-3 shadow-card border border-line"
            >
              <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-ink-600">
                BBB rating
              </div>
              <div className="font-display font-extrabold text-3xl text-ink-950 leading-none">A+</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
