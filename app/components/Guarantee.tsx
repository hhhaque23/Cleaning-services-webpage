"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, RotateCcw, Leaf, UserCheck, Lock, ArrowRight } from "lucide-react";
import { PHOTOS } from "@/lib/unsplash";

const SECONDARY = [
  { icon: ShieldCheck, label: "$2M insured", body: "Bonded and fully insured." },
  { icon: Leaf, label: "Eco and pet-safe", body: "EPA Safer Choice products." },
  { icon: UserCheck, label: "Background-checked", body: "Every cleaner, every visit." },
  { icon: Lock, label: "Key and code safe", body: "Encrypted access notes." },
];

export function Guarantee() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-lift">
              <Image
                src={PHOTOS.livingRoom}
                alt="Pristine living room after a clean, late afternoon light through the window"
                fill
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[oklch(0.11_0.04_230/0.92)] via-[oklch(0.11_0.04_230/0.55)] to-transparent" />
              <div className="absolute bottom-7 left-7 right-7 text-[var(--surface)]">
                <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-grass-300">
                  Our promise
                </div>
                <blockquote className="mt-2 font-display font-extrabold text-display-2 tracking-[-0.02em] leading-[1.1]">
                  &ldquo;If it&apos;s not pristine, we come back. Free.&rdquo;
                </blockquote>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -4 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.55 }}
              className="absolute -top-4 -right-3 sm:-right-6 bg-[var(--surface)] rounded-2xl px-4 py-3"
            >
              <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-ink-600">
                Better Business
              </div>
              <div className="font-display font-extrabold text-2xl text-ink-950">A+</div>
            </motion.div>
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="text-[11px] uppercase tracking-[0.14em] text-ink-600 font-semibold"
            >
              Trust by design
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-3 font-display font-extrabold text-display-1 text-ink-950 text-balance"
            >
              You&apos;re letting a stranger into your home.{" "}
              <span className="italic font-medium text-ink-700">
                Make sure they&apos;ve earned it.
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-7 rounded-[1.75rem] bg-ink-950 text-[var(--surface)] p-7 sm:p-8 relative overflow-hidden shadow-lift"
            >
              <div className="absolute inset-0 noise opacity-50 pointer-events-none" />
              <div className="absolute -top-20 -right-16 h-56 w-56 rounded-full bg-[oklch(0.78_0.16_145/0.25)] blur-3xl" />
              <div className="relative flex items-start gap-4">
                <span className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-[oklch(0.78_0.16_145/0.18)] text-grass-300">
                  <RotateCcw className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-grass-300">
                    The headline promise
                  </div>
                  <div className="mt-1.5 font-display font-bold text-2xl tracking-[-0.018em]">
                    24-hour re-clean, no negotiation.
                  </div>
                  <p className="mt-2 text-[15px] text-[oklch(0.985_0.006_220/0.75)] max-w-sm leading-relaxed">
                    Text or call within a day of your clean. We send a cleaner back the
                    next morning. You don&apos;t pay twice.
                  </p>
                  <Link
                    href="/book"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-grass-300 hover:text-grass-glow transition-colors cursor-pointer"
                  >
                    Book with that promise
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
              className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6"
            >
              {SECONDARY.map((t) => (
                <motion.li
                  key={t.label}
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                  className="flex items-start gap-3"
                >
                  <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-[oklch(0.65_0.13_220/0.08)] text-ink-700 mt-0.5">
                    <t.icon className="h-4 w-4" />
                  </span>
                  <div className="leading-tight">
                    <div className="text-[15px] font-semibold text-ink-950">{t.label}</div>
                    <div className="mt-0.5 text-sm text-ink-700">{t.body}</div>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
