"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Sparkles, CalendarClock } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[2rem] bg-ink-950 text-[var(--surface)] p-8 sm:p-12 lg:p-16 overflow-hidden shadow-lift"
        >
          <div className="absolute inset-0 noise opacity-40 pointer-events-none" />
          <div className="absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.4_0.08_230/0.5)] blur-3xl" />
          <div className="absolute -bottom-32 -right-24 h-[24rem] w-[24rem] rounded-full bg-[oklch(0.68_0.18_145/0.35)] blur-3xl" />

          <div className="relative grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[oklch(0.985_0.006_220/0.1)] text-[var(--surface)] text-[11px] font-semibold px-3 py-1.5 uppercase tracking-[0.14em]">
                <Sparkles className="h-3.5 w-3.5 text-grass-300" /> Same-day available
              </div>
              <h2 className="mt-5 font-display font-extrabold text-hero text-balance tracking-[-0.028em] leading-[1.02]">
                Book your first clean.{" "}
                <span className="italic font-medium text-grass-300">
                  Sleep in tomorrow.
                </span>
              </h2>
              <p className="mt-6 text-lead text-[oklch(0.985_0.006_220/0.78)] leading-relaxed max-w-xl text-pretty">
                Take 60 seconds. Configure your home, pick a slot, confirm. We&apos;ll text
                you within 15 minutes with your cleaner&apos;s name and photo.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/book"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-grass-500 hover:bg-grass-600 text-[var(--surface)] font-semibold px-7 py-4 text-[15px] shadow-commit hover:shadow-[0_30px_70px_-20px_oklch(0.52_0.16_145/0.7)] transition-all duration-300 ease-out-quint cursor-pointer animate-pulse-ring"
                >
                  Get my price
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 ease-out-quint group-hover:translate-x-1" />
                </Link>
                <a
                  href="tel:+12485550199"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[oklch(0.985_0.006_220/0.1)] hover:bg-[oklch(0.985_0.006_220/0.18)] text-[var(--surface)] font-semibold px-7 py-4 text-[15px] transition-all duration-300 ease-out-quint cursor-pointer"
                >
                  <Phone className="h-4 w-4" />
                  (248) 555-0199
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <Pill icon={CalendarClock} label="Next available" value="Tomorrow 9 AM" />
              <Pill icon={Sparkles} label="Today's slots" value="3 left" highlight />
              <Pill icon={Phone} label="Avg. reply" value="Under 15 min" />
              <Pill icon={ArrowRight} label="To book" value="60 seconds" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Pill({
  icon: Icon,
  label,
  value,
  highlight,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-4 ${
        highlight
          ? "bg-[oklch(0.68_0.18_145/0.18)] ring-1 ring-[oklch(0.68_0.18_145/0.35)]"
          : "bg-[oklch(0.985_0.006_220/0.05)] ring-1 ring-[oklch(0.985_0.006_220/0.1)]"
      }`}
    >
      <Icon
        className={`h-4 w-4 ${
          highlight ? "text-grass-300" : "text-[oklch(0.985_0.006_220/0.65)]"
        }`}
      />
      <div className="mt-2.5 text-[10px] uppercase tracking-[0.12em] font-semibold text-[oklch(0.985_0.006_220/0.7)]">
        {label}
      </div>
      <div className="mt-0.5 font-display font-bold text-[1.05rem] text-[var(--surface)] leading-tight">
        {value}
      </div>
    </div>
  );
}
