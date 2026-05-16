"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  CalendarClock,
  MapPin,
  Hash,
  ArrowRight,
  Copy,
  Check,
} from "lucide-react";
import type { Contact } from "./StepConfirm";
import type { Slot } from "./StepSchedule";
import { SuccessCheck } from "./SuccessCheck";
import { Confetti } from "../motion/Confetti";
import { SplitText } from "../motion/SplitText";
import { EASE_OUT_QUINT } from "../motion/motion-primitives";
import { MagneticButton } from "../motion/MagneticButton";

type Props = {
  contact: Contact;
  slot: Slot | null;
  total: number;
  bookingId: string | null;
};

export function StepSuccess({ contact, slot, total, bookingId }: Props) {
  const [copied, setCopied] = useState(false);
  const date = slot?.dateISO
    ? new Date(slot.dateISO + "T00:00:00").toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "·";
  const windowLabel: Record<Slot["window"], string> = {
    morning: "8 – 11 AM",
    midday: "11 AM – 2 PM",
    afternoon: "2 – 5 PM",
  };

  const handleCopy = async () => {
    if (!bookingId) return;
    try {
      await navigator.clipboard.writeText(bookingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, ease: EASE_OUT_QUINT }}
      className="relative text-center py-2"
    >
      <div className="relative">
        <SuccessCheck />
        <Confetti count={42} duration={1.8} spread={280} />
      </div>

      <h3 className="mt-6 font-display font-extrabold text-3xl text-ink-950 tracking-tight">
        <SplitText mode="word" trigger="load" stagger={0.05}>
          {"Your clean is locked in."}
        </SplitText>
      </h3>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-2 text-ink-800/85 max-w-md mx-auto"
      >
        We&apos;ll text{" "}
        <span className="font-semibold text-ink-950">{contact.phone || "you"}</span> within 15
        minutes with your cleaner&apos;s photo and arrival window.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.85, ease: EASE_OUT_QUINT }}
        className="mt-7 max-w-md mx-auto text-left rounded-2xl bg-[var(--surface)] border border-line shadow-card overflow-hidden"
      >
        <div className="px-5 py-4 bg-ink-50 border-b border-line flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-ink-700">
              Booking summary
            </div>
            <div className="mt-1 font-display font-bold text-xl text-ink-950">
              ${total.toLocaleString()}
              <span className="text-sm text-ink-700 font-medium"> · charged after the clean</span>
            </div>
          </div>
          {bookingId && (
            <div className="text-right">
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-600">
                Confirmation
              </div>
              <div className="mt-0.5 font-mono text-sm font-bold text-ink-950 tabular-nums flex items-center gap-1.5 justify-end">
                <SplitText mode="char" trigger="load" stagger={0.04} delay={1.1}>
                  {bookingId}
                </SplitText>
                <button
                  type="button"
                  onClick={handleCopy}
                  aria-label="Copy booking ID"
                  className="relative inline-flex h-7 w-7 items-center justify-center rounded-md hover:bg-ink-100 text-ink-700 hover:text-ink-950 transition-colors cursor-pointer"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {copied ? (
                      <motion.span
                        key="copied"
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 320, damping: 18 }}
                      >
                        <Check className="h-3.5 w-3.5 text-grass-700" strokeWidth={3} />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          )}
        </div>
        <motion.ul
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 1.1 } } }}
          className="divide-y divide-ink-100"
        >
          <Row icon={CalendarClock} label="When" value={`${date} · ${slot ? windowLabel[slot.window] : ""}`} />
          <Row icon={MapPin} label="Where" value={`${contact.address}${contact.apt ? `, ${contact.apt}` : ""}`} />
          <Row icon={Phone} label="Text" value={contact.phone} />
          <Row icon={Mail} label="Email" value={contact.email} />
        </motion.ul>
        {bookingId && (
          <MagneticButton as="div" radius={120} strength={0.18} className="block">
            <Link
              href={`/booking/${bookingId}`}
              className="flex items-center justify-between gap-3 px-5 py-4 border-t border-line hover:bg-ink-50/70 transition-colors cursor-pointer group"
            >
              <span className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-grass-500/15 text-grass-700">
                  <Hash className="h-4 w-4" />
                </span>
                <span className="leading-tight text-left">
                  <span className="block text-[11px] uppercase tracking-wider font-semibold text-ink-700">
                    Track this booking
                  </span>
                  <span className="block text-sm font-semibold text-ink-950">
                    Status updates and contact info
                  </span>
                </span>
              </span>
              <ArrowRight className="h-4 w-4 text-ink-700 transition-transform group-hover:translate-x-1" />
            </Link>
          </MagneticButton>
        )}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.4 }}
        className="mt-5 text-sm text-ink-700"
      >
        Need to change something? Reply STOP-free to our text or call{" "}
        <a
          href="tel:+12485550199"
          className="font-semibold text-ink-950 underline underline-offset-4 hover:text-grass-700 cursor-pointer"
        >
          (248) 555-0199
        </a>
        .
      </motion.p>
    </motion.div>
  );
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
}) {
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, x: -10 },
        show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE_OUT_QUINT } },
      }}
      className="flex items-center gap-3 px-5 py-3"
    >
      <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-ink-100 text-ink-700">
        <Icon className="h-4 w-4" />
      </span>
      <div className="leading-tight min-w-0">
        <div className="text-[11px] uppercase tracking-wider font-semibold text-ink-700">{label}</div>
        <div className="text-sm font-semibold text-ink-950 truncate">{value || "·"}</div>
      </div>
    </motion.li>
  );
}
