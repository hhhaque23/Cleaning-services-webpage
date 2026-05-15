"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Sparkles, CalendarClock } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative bg-ink-950 text-[var(--surface)] overflow-hidden">
      <div className="absolute inset-0 noise opacity-40 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 15% 40%, oklch(0.32 0.08 230) 0%, transparent 55%), radial-gradient(ellipse at 90% 80%, oklch(0.42 0.13 146 / 0.55) 0%, transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 items-center"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] font-semibold text-grass-300">
              <Sparkles className="h-3.5 w-3.5" /> Same-day available
            </div>
            <h2 className="mt-4 font-display font-extrabold text-hero text-balance tracking-[-0.028em] leading-[1.02]">
              Book your first clean.{" "}
              <span className="italic font-medium text-grass-300">
                Sleep in tomorrow.
              </span>
            </h2>
            <p className="mt-6 text-lead text-[oklch(0.985_0.006_220/0.78)] leading-relaxed max-w-xl text-pretty">
              Take 60 seconds. Configure your home, pick a slot, confirm. We&apos;ll
              text you within 15 minutes with your cleaner&apos;s name and photo.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/book"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-grass-500 hover:bg-grass-600 text-[var(--surface)] font-semibold px-7 py-4 text-[15px] shadow-commit hover:shadow-[0_30px_70px_-20px_oklch(0.52_0.16_145/0.7)] transition-all duration-300 ease-out-quint cursor-pointer"
              >
                Get my price
                <ArrowRight className="h-5 w-5 transition-transform duration-300 ease-out-quint group-hover:translate-x-1" />
              </Link>
              <a
                href="tel:+12485550199"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[oklch(0.985_0.006_220/0.08)] hover:bg-[oklch(0.985_0.006_220/0.14)] text-[var(--surface)] font-semibold px-7 py-4 text-[15px] transition-all duration-300 ease-out-quint cursor-pointer"
              >
                <Phone className="h-4 w-4" />
                (248) 555-0199
              </a>
            </div>
          </div>

          <ul className="space-y-5 lg:pl-8 lg:border-l lg:border-[oklch(0.985_0.006_220/0.12)]">
            <Row icon={CalendarClock} label="Next available" value="Tomorrow 9 AM" />
            <Row icon={Sparkles} label="Today's slots" value="3 left" highlight />
            <Row icon={Phone} label="Average reply" value="Under 15 minutes" />
            <Row icon={ArrowRight} label="Time to book" value="60 seconds" />
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

function Row({
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
    <li className="flex items-center gap-4">
      <span
        className={`inline-flex h-11 w-11 flex-none items-center justify-center rounded-2xl ${
          highlight
            ? "bg-grass-500/25 text-grass-300"
            : "bg-[oklch(0.985_0.006_220/0.07)] text-[oklch(0.985_0.006_220/0.85)]"
        }`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <div className="leading-tight min-w-0">
        <div className="text-[10px] uppercase tracking-[0.14em] font-semibold text-[oklch(0.985_0.006_220/0.7)]">
          {label}
        </div>
        <div className="mt-0.5 font-display font-bold text-xl text-[var(--surface)]">
          {value}
        </div>
      </div>
    </li>
  );
}
