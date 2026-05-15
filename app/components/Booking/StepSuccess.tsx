"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Phone, Mail, CalendarClock, MapPin } from "lucide-react";
import type { Contact } from "./StepConfirm";
import type { Slot } from "./StepSchedule";

type Props = {
  contact: Contact;
  slot: Slot | null;
  total: number;
};

export function StepSuccess({ contact, slot, total }: Props) {
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="text-center py-2"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 14 }}
        className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full bg-grass-500/15 text-grass-700"
      >
        <CheckCircle2 className="h-10 w-10" strokeWidth={2.2} />
      </motion.div>

      <h3 className="mt-5 font-display font-extrabold text-3xl text-ink-950 tracking-tight">
        Your clean is locked in.
      </h3>
      <p className="mt-2 text-ink-800/85 max-w-md mx-auto">
        We&apos;ll text <span className="font-semibold text-ink-950">{contact.phone || "you"}</span> within 15 minutes
        with your cleaner&apos;s photo and arrival window.
      </p>

      <div className="mt-7 max-w-md mx-auto text-left rounded-2xl bg-white border border-ink-200/70 shadow-card overflow-hidden">
        <div className="px-5 py-4 bg-ink-50 border-b border-ink-200/70">
          <div className="text-xs font-semibold uppercase tracking-wider text-ink-700">
            Booking summary
          </div>
          <div className="mt-1 font-display font-bold text-xl text-ink-950">
            ${total.toLocaleString()}
            <span className="text-sm text-ink-700 font-medium"> · charged after the clean</span>
          </div>
        </div>
        <ul className="divide-y divide-ink-100">
          <Row icon={CalendarClock} label="When" value={`${date} · ${slot ? windowLabel[slot.window] : ""}`} />
          <Row icon={MapPin} label="Where" value={`${contact.address}${contact.apt ? `, ${contact.apt}` : ""}`} />
          <Row icon={Phone} label="Text" value={contact.phone} />
          <Row icon={Mail} label="Email" value={contact.email} />
        </ul>
      </div>

      <p className="mt-5 text-sm text-ink-700">
        Need to change something? Reply STOP-free to our text or call{" "}
        <a href="tel:+12485550199" className="font-semibold text-ink-950 underline underline-offset-4 hover:text-grass-700 cursor-pointer">
          (248) 555-0199
        </a>.
      </p>
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
    <li className="flex items-center gap-3 px-5 py-3">
      <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-ink-100 text-ink-700">
        <Icon className="h-4 w-4" />
      </span>
      <div className="leading-tight min-w-0">
        <div className="text-[11px] uppercase tracking-wider font-semibold text-ink-700">
          {label}
        </div>
        <div className="text-sm font-semibold text-ink-950 truncate">{value || "·"}</div>
      </div>
    </li>
  );
}
