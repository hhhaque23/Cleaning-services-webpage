"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calculator, Receipt, ShieldCheck, Sparkles } from "lucide-react";
import {
  computePrice,
  FREQUENCY_META,
  TIER_META,
  type BookingConfig,
} from "./pricing";
import { PriceTicker } from "./PriceTicker";
import { StepConfigure } from "./StepConfigure";
import { StepSchedule, type Slot } from "./StepSchedule";
import { StepConfirm, type Contact } from "./StepConfirm";
import { StepSuccess } from "./StepSuccess";

const STEPS = [
  { id: 1, label: "Configure", icon: Calculator },
  { id: 2, label: "Schedule", icon: Sparkles },
  { id: 3, label: "Confirm", icon: Receipt },
] as const;

const DEFAULT_CONFIG: BookingConfig = {
  tier: "Deep",
  bedrooms: 2,
  bathrooms: 1,
  sqft: 1400,
  frequency: "biweekly",
  addOns: [],
};

const DEFAULT_CONTACT: Contact = {
  address: "",
  apt: "",
  phone: "",
  email: "",
  notes: "",
};

export function BookingFlow() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [config, setConfig] = useState<BookingConfig>(DEFAULT_CONFIG);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [contact, setContact] = useState<Contact>(DEFAULT_CONTACT);

  const price = useMemo(() => computePrice(config), [config]);

  const canAdvance = () => {
    if (step === 1) return true;
    if (step === 2) return slot !== null;
    if (step === 3)
      return (
        contact.address.trim().length > 3 &&
        contact.phone.trim().length >= 7 &&
        contact.email.includes("@")
      );
    return false;
  };

  const tierLabel = TIER_META[config.tier].label;
  const freq = FREQUENCY_META[config.frequency];

  return (
    <section
      id="booking"
      className="relative py-16 sm:py-24 scroll-mt-24"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-50/60 via-transparent to-ink-50/60" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full bg-grass-500/12 text-grass-700 text-xs font-semibold px-3 py-1.5 uppercase tracking-wider">
            <Calculator className="h-3.5 w-3.5" /> Live pricing
          </div>
          <h2 className="mt-4 font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-ink-950">
            Build your booking in 60 seconds.
          </h2>
          <p className="mt-3 text-ink-800/80 text-lg">
            Move the sliders. Watch the price land. Pick a slot. Done.
          </p>
        </motion.div>

        <div className="mt-10 grid lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl bg-white border border-ink-200/70 shadow-card overflow-hidden"
          >
            <div className="px-5 sm:px-7 pt-5 sm:pt-6">
              <Stepper step={step} />
            </div>

            <div className="px-5 sm:px-7 py-6 sm:py-7 min-h-[26rem]">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="s1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <StepConfigure config={config} setConfig={setConfig} />
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div
                    key="s2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <StepSchedule selected={slot} onSelect={setSlot} />
                  </motion.div>
                )}
                {step === 3 && (
                  <motion.div
                    key="s3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <StepConfirm contact={contact} setContact={setContact} />
                  </motion.div>
                )}
                {step === 4 && (
                  <motion.div
                    key="s4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <StepSuccess contact={contact} slot={slot} total={price.total} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {step !== 4 && (
              <div className="border-t border-ink-200/70 bg-ink-50/60 px-5 sm:px-7 py-4 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3) : s))}
                  disabled={step === 1}
                  className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-ink-800 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <button
                  type="button"
                  disabled={!canAdvance()}
                  onClick={() =>
                    setStep((s) =>
                      s === 3 ? 4 : ((s + 1) as 1 | 2 | 3 | 4)
                    )
                  }
                  className="inline-flex items-center gap-1.5 rounded-2xl bg-ink-950 hover:bg-ink-800 disabled:bg-ink-300 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-3 shadow-[0_10px_24px_-10px_rgba(8,51,68,0.6)] transition-all cursor-pointer"
                >
                  {step === 3 ? "Confirm booking" : "Continue"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="lg:sticky lg:top-24"
          >
            <div className="rounded-3xl bg-ink-950 text-white p-6 sm:p-7 shadow-glow relative overflow-hidden">
              <div className="absolute inset-0 noise opacity-50 pointer-events-none" />
              <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-grass-500/25 blur-3xl" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-ink-100/70">
                    Your price
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/10 text-white text-[11px] font-semibold px-2.5 py-1">
                    <ShieldCheck className="h-3 w-3" />
                    Guaranteed
                  </span>
                </div>
                <div className="mt-1.5 flex items-baseline gap-1.5">
                  <PriceTicker
                    value={price.total}
                    className="font-display font-extrabold text-5xl sm:text-6xl tracking-tight text-white"
                  />
                  <span className="text-ink-100/70 text-sm">/ visit</span>
                </div>
                {price.discount > 0 && (
                  <div className="mt-1 inline-flex items-center gap-1.5 text-grass-400 text-sm font-semibold">
                    <span className="line-through text-ink-100/50 font-normal">
                      ${price.subtotal}
                    </span>
                    <span>−${price.discount} {freq.label.toLowerCase()} savings</span>
                  </div>
                )}

                <hr className="my-5 border-white/10" />

                <ul className="space-y-2.5 text-sm">
                  <SumRow label="Service" value={tierLabel} />
                  <SumRow
                    label="Home size"
                    value={`${config.bedrooms} bd · ${config.bathrooms} ba · ${config.sqft.toLocaleString()} sqft`}
                  />
                  <SumRow label="Frequency" value={freq.label} />
                  <SumRow
                    label="Add-ons"
                    value={
                      config.addOns.length === 0
                        ? "None"
                        : `${config.addOns.length} selected`
                    }
                  />
                  {slot && (
                    <SumRow
                      label="Slot"
                      value={`${new Date(slot.dateISO + "T00:00:00").toLocaleDateString(
                        "en-US",
                        { weekday: "short", month: "short", day: "numeric" }
                      )} · ${slot.window}`}
                    />
                  )}
                </ul>

                <div className="mt-6 rounded-2xl bg-white/5 border border-white/10 p-4 text-sm text-ink-100/80 leading-relaxed">
                  No charge until your home is clean. If anything&apos;s missed, we
                  return within 24 hours, free.
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function Stepper({ step }: { step: 1 | 2 | 3 | 4 }) {
  return (
    <ol className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-none">
      {STEPS.map((s, i) => {
        const active = step === s.id;
        const done = step > s.id;
        return (
          <li key={s.id} className="flex items-center gap-2 sm:gap-3 flex-none">
            <span
              className={`inline-flex h-8 w-8 items-center justify-center rounded-xl text-[13px] font-bold transition-colors ${
                done
                  ? "bg-grass-500 text-white"
                  : active
                  ? "bg-ink-950 text-white"
                  : "bg-ink-100 text-ink-700"
              }`}
            >
              {done ? "✓" : s.id}
            </span>
            <span
              className={`text-sm font-semibold transition-colors ${
                active || done ? "text-ink-950" : "text-ink-700/70"
              }`}
            >
              {s.label}
            </span>
            {i < STEPS.length - 1 && (
              <span
                className={`hidden sm:block h-px w-10 transition-colors ${
                  done ? "bg-grass-500" : "bg-ink-200"
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function SumRow({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-center justify-between gap-3">
      <span className="text-ink-100/70">{label}</span>
      <span className="font-semibold text-white text-right truncate max-w-[60%]">{value}</span>
    </li>
  );
}
