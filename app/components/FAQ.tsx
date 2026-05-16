"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, MessageCircleQuestion } from "lucide-react";
import { EASE_OUT_QUINT } from "./motion/motion-primitives";

const FAQS = [
  {
    q: "Is the price I see online really the price I pay?",
    a: "Yes, to the dollar. The calculator runs the same math we charge. The only way the price changes is if you change the booking yourself before the cleaner arrives.",
  },
  {
    q: "What cleaning products do you use?",
    a: "Our default kit is EPA Safer Choice certified: non-toxic, pet-safe, and low-fume. If you have allergies or prefer fragrance-free, leave a note at booking and we'll match it.",
  },
  {
    q: "Do I have to be home during the clean?",
    a: "Not at all. Leave a key, a code, or a note. Most of our recurring clients aren't home; we let ourselves in, lock up, and text you when we're done.",
  },
  {
    q: "What does the 24-hour guarantee actually mean?",
    a: "If anything's missed or below standard, text or call us within 24 hours. We send a cleaner back the next day to redo it. No charge, no negotiation.",
  },
  {
    q: "How does subscription billing work?",
    a: "Same flat rate, charged automatically after each clean. You'll get a receipt by text and email. Pause, skip, or cancel any time. No contracts, no fees.",
  },
  {
    q: "Are you really insured and bonded?",
    a: "Yes: $2M liability, full bonding, and workers' comp on every cleaner. We can email a certificate to you or your landlord on request.",
  },
  {
    q: "What if my cleaner is late or cancels?",
    a: "We text proactively the moment anything changes. If we can't make a slot within your window, we reschedule with a 25% credit toward your next clean.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-24 sm:py-32 scroll-mt-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="max-w-xl"
        >
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-ink-600 font-semibold">
            <MessageCircleQuestion className="h-3.5 w-3.5" /> Questions, answered
          </div>
          <h2 className="mt-3 font-display font-extrabold text-display-1 text-ink-950 text-balance leading-[1.05]">
            Everything you&apos;d ask{" "}
            <span className="italic font-medium text-ink-700">before booking.</span>
          </h2>
        </motion.div>

        <ul className="mt-12 divide-y divide-line">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.li
                key={f.q}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className="group/item"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="relative w-full py-5 sm:py-6 flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <span
                    className={`absolute inset-y-0 -inset-x-2 rounded-xl bg-grass-500/0 transition-colors duration-300 group-hover/item:bg-grass-500/[0.04] ${
                      isOpen ? "bg-grass-500/[0.06]" : ""
                    }`}
                  />
                  <span className="relative font-display font-bold text-ink-950 text-lg sm:text-[1.25rem] group-hover/item:text-grass-700 transition-colors">
                    {f.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    className={`relative inline-flex h-9 w-9 flex-none items-center justify-center rounded-full transition-colors ${
                      isOpen
                        ? "bg-ink-950 text-[var(--surface)]"
                        : "bg-transparent text-ink-700 ring-1 ring-line-strong/60"
                    }`}
                  >
                    <Plus className="h-4 w-4" strokeWidth={2.5} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { type: "spring", stiffness: 220, damping: 26 },
                        opacity: { duration: 0.2 },
                      }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: 8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 4, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE_OUT_QUINT, delay: 0.05 }}
                        className="pb-6 pr-12 text-ink-800 leading-relaxed text-[15px] sm:text-base max-w-xl"
                      >
                        {f.a}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
