"use client";

import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { useCallback, useRef } from "react";
import { ArrowRight, Phone, Sparkles, CalendarClock } from "lucide-react";
import { SplitText } from "./motion/SplitText";
import { MagneticButton } from "./motion/MagneticButton";

const COMMITMENT_FRAGMENTS = [
  "$0 today",
  "charged after the clean",
  "24h satisfaction guarantee",
  "cancel anytime",
];

export function FinalCTA() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(50);
  const my = useMotionValue(35);

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduce) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      mx.set(((e.clientX - rect.left) / rect.width) * 100);
      my.set(((e.clientY - rect.top) / rect.height) * 100);
    },
    [mx, my, reduce],
  );

  const spotlight = useMotionTemplate`radial-gradient(700px circle at ${mx}% ${my}%, oklch(0.65 0.13 220 / 0.32), transparent 65%)`;

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          ref={ref}
          onMouseMove={handleMove}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[2rem] bg-ink-950 text-[var(--surface)] p-8 sm:p-12 lg:p-16 overflow-hidden shadow-lift"
        >
          <motion.div
            aria-hidden
            style={{ background: spotlight }}
            className="absolute inset-0 pointer-events-none"
          />
          <div className="absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.4_0.08_230/0.4)] blur-3xl" />
          <div className="absolute -bottom-32 -right-24 h-[24rem] w-[24rem] rounded-full bg-[oklch(0.68_0.18_145/0.32)] blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[oklch(0.985_0.006_220/0.1)] backdrop-blur-sm text-[var(--surface)] text-[11px] font-semibold px-3 py-1.5 uppercase tracking-[0.14em]">
              <Sparkles className="h-3.5 w-3.5 text-grass-300" /> Same-day available
            </div>

            <h2 className="mt-6 font-display font-extrabold text-hero text-balance tracking-[-0.028em] leading-[1.02] max-w-4xl">
              <SplitText mode="word" stagger={0.07}>
                {"Book your first clean."}
              </SplitText>
              <br />
              <SplitText
                mode="word"
                stagger={0.07}
                delay={0.5}
                className="italic font-medium text-grass-300"
              >
                {"Sleep in tomorrow."}
              </SplitText>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-lead text-[oklch(0.985_0.006_220/0.78)] leading-relaxed max-w-2xl text-pretty"
            >
              Take 60 seconds. Configure your home, pick a slot, confirm. We&apos;ll text you within
              15 minutes with your cleaner&apos;s name and photo.
            </motion.p>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 1.2 } } }}
              className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[oklch(0.985_0.006_220/0.82)] font-medium"
            >
              {COMMITMENT_FRAGMENTS.map((frag, i) => (
                <motion.span
                  key={frag}
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    show: { opacity: 1, y: 0 },
                  }}
                  className="inline-flex items-center gap-3"
                >
                  <span className="inline-block">{frag}</span>
                  {i < COMMITMENT_FRAGMENTS.length - 1 && (
                    <motion.span
                      variants={{
                        hidden: { scale: 0 },
                        show: { scale: 1, transition: { type: "spring", stiffness: 320, damping: 20 } },
                      }}
                      className="inline-block h-1 w-1 rounded-full bg-grass-400"
                    />
                  )}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 1.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-col sm:flex-row gap-3"
            >
              <MagneticButton as="div" radius={140} strength={0.34}>
                <Link
                  href="/book"
                  className="group relative inline-flex items-center justify-center gap-2 rounded-2xl bg-grass-500 hover:bg-grass-600 text-[var(--surface)] font-semibold px-8 py-4 text-[15px] shadow-commit hover:shadow-commit-glow transition-all duration-300 ease-out-quint cursor-pointer animate-pulse-ring overflow-hidden"
                >
                  <span
                    aria-hidden
                    className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-grass-500/0 via-grass-400/50 to-grass-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                  />
                  <span className="relative">Get my price</span>
                  <ArrowRight className="relative h-5 w-5 transition-transform duration-300 ease-out-quint group-hover:translate-x-1" />
                </Link>
              </MagneticButton>
              <MagneticButton as="div" radius={100} strength={0.22}>
                <a
                  href="tel:+12485550199"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[oklch(0.985_0.006_220/0.1)] hover:bg-[oklch(0.985_0.006_220/0.18)] text-[var(--surface)] font-semibold px-7 py-4 text-[15px] transition-all duration-300 ease-out-quint cursor-pointer"
                >
                  <Phone className="h-4 w-4" />
                  (248) 555-0199
                </a>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Floating slot card in upper-right */}
          <motion.div
            initial={{ opacity: 0, y: 18, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:flex absolute top-10 right-10 max-w-[16rem]"
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -6, 0], rotate: [-2, -1, -2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-2xl bg-[oklch(0.985_0.006_220/0.95)] text-ink-950 px-4 py-3.5 shadow-lift backdrop-blur-sm flex items-center gap-3 origin-center"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-grass-500/15 text-grass-700">
                <CalendarClock className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <div className="text-[10px] uppercase tracking-[0.08em] text-ink-600 font-semibold">
                  Next available
                </div>
                <div className="text-sm font-bold text-ink-950">Today 3:30 PM</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
