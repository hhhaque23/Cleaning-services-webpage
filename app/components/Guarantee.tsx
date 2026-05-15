"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, RotateCcw, Leaf, UserCheck, Lock, ArrowRight } from "lucide-react";
import { PHOTOS } from "@/lib/unsplash";

const SECONDARY = [
  { icon: ShieldCheck, label: "$2M insured" },
  { icon: Leaf, label: "Eco and pet-safe" },
  { icon: UserCheck, label: "Background-checked" },
  { icon: Lock, label: "Key and code safe" },
];

export function Guarantee() {
  return (
    <section className="relative">
      <div className="grid lg:grid-cols-2 min-h-[36rem]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[24rem] lg:min-h-full"
        >
          <Image
            src={PHOTOS.livingRoom}
            alt="Pristine living room after a clean, late afternoon light through the window"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-ink-950/55 via-transparent to-transparent" />
          <div className="absolute top-7 left-7 right-7">
            <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-grass-300">
              Our promise
            </div>
            <blockquote className="mt-2 max-w-md font-display font-extrabold text-display-2 tracking-[-0.02em] leading-[1.1] text-[var(--surface)]">
              &ldquo;If it&apos;s not pristine, we come back. Free.&rdquo;
            </blockquote>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-[oklch(0.42_0.13_146)] text-[var(--surface)] px-7 sm:px-12 lg:px-16 py-14 sm:py-20 flex flex-col justify-center"
        >
          <div className="absolute inset-0 noise opacity-30 pointer-events-none" aria-hidden="true" />
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse at 100% 0%, oklch(0.52 0.16 145) 0%, transparent 50%), radial-gradient(ellipse at 0% 100%, oklch(0.32 0.11 148) 0%, transparent 50%)",
            }}
          />

          <div className="relative max-w-xl">
            <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[oklch(0.985_0.006_220/0.7)]">
              Trust by design
            </div>
            <h2 className="mt-3 font-display font-extrabold text-display-1 text-[var(--surface)] text-balance leading-[1.05]">
              You&apos;re letting a stranger into your home.{" "}
              <span className="italic font-medium text-[oklch(0.985_0.006_220/0.78)]">
                Make sure they&apos;ve earned it.
              </span>
            </h2>

            <div className="mt-8 flex items-start gap-4">
              <span className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-[var(--surface)]/15 text-grass-300 ring-1 ring-[var(--surface)]/20">
                <RotateCcw className="h-5 w-5" />
              </span>
              <div>
                <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-grass-300">
                  The headline promise
                </div>
                <div className="mt-1.5 font-display font-bold text-2xl tracking-[-0.018em] text-[var(--surface)]">
                  24-hour re-clean, no negotiation.
                </div>
                <p className="mt-2 text-[15px] text-[oklch(0.985_0.006_220/0.8)] max-w-sm leading-relaxed">
                  Text or call within a day of your clean. We send a cleaner back the next
                  morning. You don&apos;t pay twice.
                </p>
                <Link
                  href="/book"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--surface)] hover:text-grass-300 transition-colors cursor-pointer"
                >
                  Book with that promise
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-[oklch(0.985_0.006_220/0.18)] pt-6">
              {SECONDARY.map((t) => (
                <li key={t.label} className="flex items-center gap-2.5 text-sm">
                  <t.icon className="h-4 w-4 flex-none text-grass-300" strokeWidth={2.4} />
                  <span className="font-medium text-[var(--surface)]">{t.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
