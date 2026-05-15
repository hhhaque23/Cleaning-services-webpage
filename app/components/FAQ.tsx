"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, MessageCircleQuestion } from "lucide-react";

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
    <section id="faq" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full bg-ink-100 text-ink-800 text-xs font-semibold px-3 py-1.5 uppercase tracking-wider">
            <MessageCircleQuestion className="h-3.5 w-3.5" /> Questions, answered
          </div>
          <h2 className="mt-4 font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-ink-950">
            Everything you&apos;d ask before booking.
          </h2>
        </motion.div>

        <ul className="mt-10 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.li
                key={f.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="rounded-2xl bg-white border border-ink-200/70 overflow-hidden shadow-card"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-ink-50/40 transition-colors"
                >
                  <span className="font-semibold text-ink-950 text-base sm:text-[17px]">
                    {f.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`inline-flex h-9 w-9 flex-none items-center justify-center rounded-xl transition-colors ${
                      isOpen ? "bg-ink-950 text-white" : "bg-ink-100 text-ink-700"
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
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 text-ink-800/90 leading-relaxed text-[15px]">
                        {f.a}
                      </div>
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
