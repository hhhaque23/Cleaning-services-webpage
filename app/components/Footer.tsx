"use client";

import Link from "next/link";
import { Sparkles, Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

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

export function Footer() {
  return (
    <footer className="bg-ink-950 text-white pt-16 pb-10 mt-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 lg:gap-12">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 cursor-pointer">
              <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-ink-950">
                <Sparkles className="h-5 w-5" strokeWidth={2.4} />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-grass-500 ring-2 ring-ink-950" />
              </span>
              <span className="font-display font-bold text-lg">
                Pristine
                <span className="font-medium text-white/70"> Cleaning Co.</span>
              </span>
            </Link>
            <p className="mt-4 text-white/70 leading-relaxed max-w-sm">
              Rochester Hills&apos; no-friction home cleaning. Transparent pricing, vetted
              cleaners, same-day availability. Booked like a delivery.
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
            <div key={col.title}>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/60">
                {col.title}
              </div>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("tel:") ? (
                      <a
                        href={l.href}
                        className="text-white/85 hover:text-white text-sm cursor-pointer"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className="text-white/85 hover:text-white text-sm cursor-pointer"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
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
            <a
              href="#"
              aria-label="Instagram"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="text-xs text-white/60 hover:text-white cursor-pointer"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-xs text-white/60 hover:text-white cursor-pointer"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
