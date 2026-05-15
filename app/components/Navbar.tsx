"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

const LINKS = [
  { href: "/book", label: "Get a price" },
  { href: "/about", label: "About" },
  { href: "/about#reviews", label: "Reviews" },
  { href: "/about#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 z-50"
      >
        <div
          className={`mx-auto max-w-6xl rounded-2xl transition-all duration-300 ${
            scrolled
              ? "glass shadow-card"
              : "bg-white/40 backdrop-blur-md border border-white/40"
          }`}
        >
          <div className="flex items-center justify-between px-4 sm:px-5 py-2.5">
            <Link
              href="/"
              className="flex items-center gap-2 group cursor-pointer"
              aria-label="Pristine Cleaning Co. home"
            >
              <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-ink-600 to-ink-800 text-white shadow-ring">
                <Sparkles className="h-4 w-4" strokeWidth={2.4} />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-grass-500 ring-2 ring-white" />
              </span>
              <span className="font-display font-bold text-[15px] sm:text-base tracking-tight text-ink-950">
                Pristine
                <span className="font-medium text-ink-700"> Cleaning Co.</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="px-3 py-2 text-sm font-medium text-ink-900/80 hover:text-ink-950 rounded-lg hover:bg-ink-100/60 transition-colors cursor-pointer"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href="tel:+12485550199"
                className="hidden sm:inline-flex text-sm font-medium text-ink-800/80 hover:text-ink-950 px-3 py-2 rounded-lg transition-colors cursor-pointer"
              >
                (248) 555-0199
              </a>
              <Link
                href="/book"
                className="inline-flex items-center gap-1.5 rounded-xl bg-grass-500 hover:bg-grass-600 text-white text-sm font-semibold px-4 py-2.5 shadow-[0_8px_24px_-8px_oklch(0.68_0.18_145/0.55)] hover:shadow-[0_12px_30px_-10px_oklch(0.68_0.18_145/0.65)] transition-all cursor-pointer"
              >
                Book now
              </Link>
              <button
                type="button"
                aria-label="Open menu"
                onClick={() => setOpen(true)}
                className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-900 hover:bg-ink-100/60 transition-colors cursor-pointer"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm cursor-pointer"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 360, damping: 36 }}
              className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-ink-950">Menu</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-ink-100 cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="mt-6 flex flex-col gap-1">
                {LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 rounded-xl text-base font-medium text-ink-900 hover:bg-ink-100/60 transition-colors cursor-pointer"
                  >
                    {l.label}
                  </Link>
                ))}
                <Link
                  href="/book"
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex items-center justify-center rounded-xl bg-grass-500 hover:bg-grass-600 text-white text-base font-semibold px-4 py-3.5 shadow-[0_10px_24px_-8px_oklch(0.68_0.18_145/0.55)] transition-all cursor-pointer"
                >
                  Book now
                </Link>
                <a
                  href="tel:+12485550199"
                  className="mt-2 text-center text-sm text-ink-700 hover:text-ink-950 cursor-pointer"
                >
                  Or call (248) 555-0199
                </a>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
