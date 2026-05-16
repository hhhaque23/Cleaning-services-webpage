"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Instagram, Facebook, Mail, Phone, MapPin, Star, ShieldCheck, Leaf, Clock } from "lucide-react";
import { EASE_OUT_QUINT } from "./motion/motion-primitives";

const NAV = [
  {
    title: "Services",
    links: [
      { label: "Standard clean", href: "/services/standard" },
      { label: "Deep clean", href: "/services/deep" },
      { label: "Move in / out", href: "/services/move-in-out" },
      { label: "Recurring plans", href: "/book" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "How it works", href: "/#how" },
      { label: "About us", href: "/about" },
      { label: "Reviews", href: "/about#reviews" },
      { label: "FAQ", href: "/about#faq" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Book a clean", href: "/book" },
      { label: "Reschedule", href: "tel:+12485550199" },
      { label: "Re-clean request", href: "tel:+12485550199" },
      { label: "Service areas", href: "/about#areas" },
    ],
  },
];

const MARQUEE_ITEMS = [
  { icon: Star, label: "4.9 average · 2,300+ reviews" },
  { icon: ShieldCheck, label: "Bonded · $2M insured" },
  { icon: MapPin, label: "Rochester Hills · metro Detroit" },
  { icon: Leaf, label: "EPA Safer Choice products" },
  { icon: Clock, label: "Same-day available" },
  { icon: Sparkles, label: "Booked like delivery" },
];

const MARQUEE_ROW = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

export function Footer() {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <footer className="relative bg-ink-950 text-white overflow-hidden mt-10">
      {/* Top marquee */}
      <div className="relative border-b border-white/10 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none bg-gradient-to-r from-ink-950 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none bg-gradient-to-l from-ink-950 to-transparent" />
        <div className="group flex py-4">
          <motion.div
            animate={reduce ? undefined : { x: ["0%", "-50%"] }}
            transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
            className="flex flex-none items-center gap-10 pr-10 group-hover:[animation-play-state:paused]"
            style={{ willChange: "transform" }}
          >
            {MARQUEE_ROW.map((it, i) => (
              <span
                key={`${it.label}-${i}`}
                className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-medium text-white/75 whitespace-nowrap"
              >
                <it.icon className="h-3.5 w-3.5 text-grass-400" />
                {it.label}
                <span className="inline-block h-1 w-1 rounded-full bg-white/20 ml-2" aria-hidden />
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Aurora background blob */}
      <div
        aria-hidden
        className="absolute top-1/3 -left-32 h-[20rem] w-[20rem] rounded-full bg-[oklch(0.4_0.08_230/0.35)] blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-0 right-0 h-[16rem] w-[16rem] rounded-full bg-[oklch(0.68_0.18_145/0.18)] blur-3xl pointer-events-none"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-16 pb-10">
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 lg:gap-12">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 cursor-pointer group">
              <motion.span
                whileHover={reduce ? undefined : { rotate: 12 }}
                transition={{ type: "spring", stiffness: 320, damping: 16 }}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-ink-950"
              >
                <Sparkles className="h-5 w-5" strokeWidth={2.4} />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-grass-500 ring-2 ring-ink-950" />
                <motion.span
                  aria-hidden
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: EASE_OUT_QUINT }}
                  className="absolute inset-0 rounded-xl ring-2 ring-grass-500/0 group-hover:ring-grass-500/60 transition-all duration-300"
                />
              </motion.span>
              <span className="font-display font-bold text-lg">
                Pristine
                <span className="font-medium text-white/70"> Cleaning Co.</span>
              </span>
            </Link>
            <p className="mt-4 text-white/70 leading-relaxed max-w-sm">
              Rochester Hills&apos; no-friction home cleaning. Transparent pricing, vetted cleaners,
              same-day availability. Booked like a delivery.
            </p>

            <ul className="mt-6 space-y-2 text-sm text-white/80">
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-grass-400" />
                <a href="tel:+12485550199" className="hover:text-white cursor-pointer">
                  (248) 555-0199
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-grass-400" />
                <a href="mailto:hi@pristine.example.com" className="hover:text-white cursor-pointer">
                  hi@pristine.example.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-grass-400" />
                <span>Rochester Hills, MI · serving metro Detroit</span>
              </li>
            </ul>
          </div>

          {NAV.map((col) => (
            <div key={col.title} onMouseLeave={() => setHovered(null)}>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/60">
                {col.title}
              </div>
              <ul className="mt-4 space-y-1">
                {col.links.map((l) => {
                  const key = `${col.title}-${l.label}`;
                  const isHovered = hovered === key;
                  return (
                    <li key={l.label} onMouseEnter={() => setHovered(key)} className="relative">
                      {isHovered && (
                        <motion.span
                          layoutId={`footer-hover-${col.title}`}
                          className="absolute -inset-x-2 -inset-y-1 rounded-md bg-white/5"
                          transition={{ type: "spring", stiffness: 340, damping: 30 }}
                        />
                      )}
                      {l.href.startsWith("tel:") ? (
                        <a
                          href={l.href}
                          className="relative inline-block text-white/85 hover:text-white text-sm py-1 cursor-pointer transition-colors"
                        >
                          {l.label}
                        </a>
                      ) : (
                        <Link
                          href={l.href}
                          className="relative inline-block text-white/85 hover:text-white text-sm py-1 cursor-pointer transition-colors"
                        >
                          {l.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <hr className="mt-12 border-white/10" />

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-white/60">
            © {new Date().getFullYear()} Pristine Cleaning Co. Bonded, insured, locally owned.
          </div>
          <div className="flex items-center gap-3">
            <motion.a
              href="#"
              aria-label="Instagram"
              whileHover={reduce ? undefined : { y: -2 }}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            >
              <Instagram className="h-4 w-4" />
            </motion.a>
            <motion.a
              href="#"
              aria-label="Facebook"
              whileHover={reduce ? undefined : { y: -2 }}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            >
              <Facebook className="h-4 w-4" />
            </motion.a>
            <a href="#" className="text-xs text-white/60 hover:text-white cursor-pointer">
              Privacy
            </a>
            <a href="#" className="text-xs text-white/60 hover:text-white cursor-pointer">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
