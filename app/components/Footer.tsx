"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, MapPin, Star, ShieldCheck, Leaf, Clock, Sparkles, Pin, Calculator } from "lucide-react";
import { EASE_OUT_QUINT } from "./motion/motion-primitives";
import { SpectreMark } from "./SpectreMark";
import { SITE } from "@/lib/site";

type FooterLink = { label: string; href: string; external?: boolean };

const NAV: { title: string; links: FooterLink[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Standard clean", href: "/services/standard" },
      { label: "Deep clean", href: "/services/deep" },
      { label: "Move in / out", href: "/services/move-in-out" },
      { label: "Office cleaning", href: "/services/office" },
      { label: "Recurring plans", href: "/book" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "How it works", href: "/#how" },
      { label: "About us", href: "/about" },
      { label: "Reviews", href: SITE.reviewsUrl, external: true },
      { label: "FAQ", href: "/about#faq" },
    ],
  },
  {
    title: "Get started",
    links: [
      { label: "Book a clean", href: "/book" },
      { label: "Instant quote", href: SITE.calculatorUrl, external: true },
      { label: "Email us", href: `mailto:${SITE.email}` },
      { label: "Service areas", href: "/about#areas" },
    ],
  },
];

const MARQUEE_ITEMS = [
  { icon: Star, label: "Top-rated on Thumbtack" },
  { icon: ShieldCheck, label: "Bonded · $2M insured" },
  { icon: MapPin, label: "Oakland County · metro Detroit" },
  { icon: Leaf, label: "EPA Safer Choice products" },
  { icon: Clock, label: "Same-day available" },
  { icon: Sparkles, label: "Booked like delivery" },
];

const MARQUEE_ROW = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

function FooterAnchor({ link }: { link: FooterLink }) {
  const cls = "relative inline-block text-white/85 hover:text-white text-sm py-1 cursor-pointer transition-colors";
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {link.label}
      </a>
    );
  }
  if (link.href.startsWith("mailto:") || link.href.startsWith("tel:")) {
    return (
      <a href={link.href} className={cls}>
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={cls}>
      {link.label}
    </Link>
  );
}

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
                <it.icon className="h-3.5 w-3.5 text-accent-400" />
                {it.label}
                <span className="inline-block h-1 w-1 rounded-full bg-white/20 ml-2" aria-hidden />
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-16 pb-10">
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 lg:gap-12">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 cursor-pointer group">
              <motion.span
                whileHover={reduce ? undefined : { rotate: 8 }}
                transition={{ type: "spring", stiffness: 320, damping: 16 }}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 text-white"
              >
                <SpectreMark size={24} className="text-white" />
              </motion.span>
              <span className="font-display font-bold text-lg">
                Spectre
                <span className="font-medium text-white/70"> Cleaning</span>
              </span>
            </Link>
            <p className="mt-4 text-white/70 leading-relaxed max-w-sm">
              {SITE.area}&apos;s no-friction home &amp; office cleaning. Transparent
              pricing, vetted cleaners, fast turnaround. Booked like a delivery.
            </p>

            <ul className="mt-6 space-y-2 text-sm text-white/80">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-accent-400 shrink-0" />
                <a href={`mailto:${SITE.email}`} className="hover:text-white cursor-pointer break-all">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Pin className="h-4 w-4 text-accent-400 shrink-0" />
                <a
                  href={SITE.reviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white cursor-pointer"
                >
                  Read our reviews on Thumbtack
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-accent-400 shrink-0" />
                <span>{SITE.areaLong}</span>
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
                      <FooterAnchor link={l} />
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
            © {new Date().getFullYear()} {SITE.name}. Bonded, insured, locally owned.
          </div>
          <div className="flex items-center gap-3">
            <motion.a
              href={SITE.calculatorUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduce ? undefined : { y: -2 }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer px-3 py-2 text-xs font-medium"
            >
              <Calculator className="h-4 w-4" />
              Instant quote
            </motion.a>
            <motion.a
              href={SITE.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Reviews on Thumbtack"
              whileHover={reduce ? undefined : { y: -2 }}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            >
              <Pin className="h-4 w-4" />
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
