"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { ArrowLeft, ArrowRight, Calculator, Receipt, ShieldCheck, Sparkles, Check } from "lucide-react";
import {
  computePrice,
  FREQUENCY_META,
  TIER_META,
  type BookingConfig,
  type Frequency,
} from "./pricing";
import { SLUG_TO_TIER } from "@/lib/tiers";
import { PriceTicker } from "./PriceTicker";
import { StepConfigure } from "./StepConfigure";
import { StepSchedule, type Slot } from "./StepSchedule";
import { StepConfirm, type Contact } from "./StepConfirm";
import { StepSuccess } from "./StepSuccess";
import { MagneticButton } from "../motion/MagneticButton";
import { SplitText } from "../motion/SplitText";
import { EASE_OUT_QUINT } from "../motion/motion-primitives";

const VALID_FREQUENCIES: Frequency[] = ["onetime", "monthly", "biweekly", "weekly"];

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
  const params = useSearchParams();
  const initialConfig = useMemo<BookingConfig>(() => {
    const tierSlug = params?.get("tier");
    const freqParam = params?.get("frequency") as Frequency | null;
    return {
      ...DEFAULT_CONFIG,
      tier: (tierSlug && SLUG_TO_TIER[tierSlug]) || DEFAULT_CONFIG.tier,
      frequency:
        freqParam && VALID_FREQUENCIES.includes(freqParam)
          ? freqParam
          : DEFAULT_CONFIG.frequency,
    };
  }, [params]);

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [config, setConfig] = useState<BookingConfig>(initialConfig);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [contact, setContact] = useState<Contact>(DEFAULT_CONTACT);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const formCardRef = useRef<HTMLDivElement | null>(null);

  // When the step changes, scroll the form card back to the top so the user
  // always sees the new step starting from its header, not from where they
  // left off scrolling on the previous step.
  useEffect(() => {
    if (step === 1) return;
    const el = formCardRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 24;
    window.scrollTo({ top, behavior: "smooth" });
  }, [step]);

  // Deterministic unlock of the Continue/Back button after a step change.
  // We used to rely on AnimatePresence's onExitComplete, but that callback
  // can be swallowed in React 18 strict mode or when an exit animation is
  // interrupted, leaving the button stuck disabled. A timer keyed on `step`
  // guarantees the lock clears.
  useEffect(() => {
    if (!isTransitioning) return;
    const t = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(t);
  }, [step, isTransitioning]);

  async function submitBooking() {
    if (!slot) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...contact,
          tier: config.tier,
          bedrooms: config.bedrooms,
          bathrooms: config.bathrooms,
          sqft: config.sqft,
          frequency: config.frequency,
          addOns: config.addOns,
          slotDate: slot.dateISO,
          slotWindow: slot.window,
          priceSubtotal: price.subtotal,
          priceDiscount: price.discount,
          priceTotal: price.total,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Could not submit booking");
      setBookingId(data.id);
      setStep(4);
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Network error");
    } finally {
      setSubmitting(false);
    }
  }

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
    <section id="booking" className="relative py-20 sm:py-28 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full bg-grass-500/12 text-grass-700 text-xs font-semibold px-3 py-1.5 uppercase tracking-wider">
            <Calculator className="h-3.5 w-3.5" /> Live pricing
          </div>
          <h2 className="mt-4 font-display font-extrabold text-display-1 tracking-[-0.022em] text-ink-950 leading-[1.05]">
            <SplitText mode="word" trigger="view" stagger={0.06}>
              {"Build your booking in 60 seconds."}
            </SplitText>
          </h2>
          <p className="mt-3 text-ink-800/80 text-lg">
            Move the sliders. Watch the price land. Pick a slot. Done.
          </p>
        </motion.div>

        <div className="mt-12 grid lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-8 items-start">
          <motion.div
            ref={formCardRef}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="relative scroll-mt-24 rounded-3xl bg-[var(--surface-elevated)] border border-line shadow-card overflow-hidden"
          >
            <div className="px-5 sm:px-7 pt-5 sm:pt-7">
              <ProgressRail step={step} />
            </div>

            <div className="px-5 sm:px-7 py-6 sm:py-8 min-h-[28rem]">
              {/* Keyed remount (no AnimatePresence) so `animate` always fires
                  after a step change. AnimatePresence + mode="wait" was
                  intermittently leaving the entering wrapper stuck at
                  `initial: opacity 0`, rendering the panel body blank. */}
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.28, ease: EASE_OUT_QUINT }}
              >
                {step === 1 && <StepConfigure config={config} setConfig={setConfig} />}
                {step === 2 && <StepSchedule selected={slot} onSelect={setSlot} />}
                {step === 3 && <StepConfirm contact={contact} setContact={setContact} />}
                {step === 4 && (
                  <StepSuccess
                    contact={contact}
                    slot={slot}
                    total={price.total}
                    bookingId={bookingId}
                  />
                )}
              </motion.div>
            </div>

            {step !== 4 && (
              <div className="border-t border-line bg-ink-50/60 px-5 sm:px-7 py-4">
                <div aria-live="polite" aria-atomic="true" className="sr-only">
                  {submitting ? "Sending your booking" : submitError ?? ""}
                </div>
                {submitError && step === 3 && (
                  <motion.div
                    role="alert"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: [0, -6, 6, -3, 3, 0] }}
                    transition={{ duration: 0.45 }}
                    className="mb-3 rounded-xl bg-[oklch(0.96_0.05_25)] text-[oklch(0.42_0.18_25)] text-sm font-medium px-3 py-2.5"
                  >
                    {submitError}
                  </motion.div>
                )}
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (step <= 1) return;
                      setIsTransitioning(true);
                      setStep((s) => ((s - 1) as 1 | 2 | 3));
                    }}
                    disabled={step === 1 || submitting || isTransitioning}
                    className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-ink-800 hover:bg-[var(--surface)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <MagneticButton as="div" radius={110} strength={0.22}>
                    <button
                      type="button"
                      disabled={!canAdvance() || submitting || isTransitioning}
                      aria-busy={submitting}
                      onClick={() => {
                        if (step === 3) {
                          submitBooking();
                          return;
                        }
                        setIsTransitioning(true);
                        setStep((s) => ((s + 1) as 1 | 2 | 3 | 4));
                      }}
                      className="group relative inline-flex items-center gap-1.5 rounded-2xl bg-ink-950 hover:bg-ink-800 disabled:bg-ink-300 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-3 shadow-lift transition-all cursor-pointer overflow-hidden"
                    >
                      <span
                        aria-hidden
                        className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-grass-500/0 via-grass-500/30 to-grass-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                      />
                      <span className="relative">
                        {step === 3 ? (submitting ? "Sending…" : "Confirm booking") : "Continue"}
                      </span>
                      {!submitting && <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />}
                    </button>
                  </MagneticButton>
                </div>
              </div>
            )}
          </motion.div>

          <SidebarPricing
            price={price}
            config={config}
            tierLabel={tierLabel}
            freq={freq}
            slot={slot}
          />
        </div>
      </div>
    </section>
  );
}

function SidebarPricing({
  price,
  config,
  tierLabel,
  freq,
  slot,
}: {
  price: ReturnType<typeof computePrice>;
  config: BookingConfig;
  tierLabel: string;
  freq: { label: string; sub: string; discount: number };
  slot: Slot | null;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(50);
  const my = useMotionValue(35);

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduce) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      mx.set(((e.clientX - rect.left) / rect.width) * 100);
      my.set(((e.clientY - rect.top) / rect.height) * 100);
    },
    [mx, my, reduce],
  );

  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${mx}% ${my}%, oklch(0.65 0.13 220 / 0.32), transparent 70%)`;

  return (
    <motion.aside
      ref={ref}
      onMouseMove={handleMove}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: 0.08 }}
      className="lg:sticky lg:top-24"
    >
      <div className="rounded-3xl bg-ink-950 text-white p-6 sm:p-7 shadow-glow relative overflow-hidden">
        <motion.div
          aria-hidden
          style={{ background: spotlight }}
          className="absolute inset-0 pointer-events-none"
        />
        <div className="absolute inset-0 noise opacity-40 pointer-events-none" />
        <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-grass-500/25 blur-3xl pointer-events-none" />

        <div className="relative">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-100/85">
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
            <span className="text-ink-100/85 text-sm">/ visit</span>
          </div>
          {price.discount > 0 && (
            <motion.div
              key={`${price.discount}-${freq.label}`}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-1 inline-flex items-center gap-1.5 text-grass-400 text-sm font-semibold"
            >
              <span className="line-through text-ink-100/75 font-normal">${price.subtotal}</span>
              <span>−${price.discount} {freq.label.toLowerCase()} savings</span>
            </motion.div>
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
              key={config.addOns.length}
              label="Add-ons"
              value={config.addOns.length === 0 ? "None" : `${config.addOns.length} selected`}
            />
            {slot && (
              <SumRow
                label="Slot"
                value={`${new Date(slot.dateISO + "T00:00:00").toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })} · ${slot.window}`}
              />
            )}
          </ul>

          <div className="mt-6 rounded-2xl bg-white/5 border border-white/10 p-4 text-sm text-ink-100/85 leading-relaxed flex items-start gap-2.5">
            <Check className="h-4 w-4 flex-none mt-0.5 text-grass-400" strokeWidth={3} />
            <span>
              No charge until your home is clean. If anything&apos;s missed, we return within 24 hours, free.
            </span>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

function ProgressRail({ step }: { step: 1 | 2 | 3 | 4 }) {
  const stepCount = STEPS.length;
  const progress = step >= 4 ? 1 : (step - 1) / (stepCount - 1);

  return (
    <div className="relative">
      <div className="relative h-1.5 rounded-full bg-ink-100 overflow-hidden">
        <motion.div
          animate={{ width: `${progress * 100}%` }}
          transition={{ type: "spring", stiffness: 220, damping: 26 }}
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-grass-500 to-grass-600"
        />
      </div>
      <ol className="mt-3 flex items-center justify-between">
        {STEPS.map((s) => {
          const active = step === s.id;
          const done = step > s.id;
          return (
            <li key={s.id} className="flex items-center gap-2">
              <motion.span
                animate={{
                  scale: active ? 1.05 : 1,
                  backgroundColor: done
                    ? "oklch(0.68 0.18 145)"
                    : active
                    ? "oklch(0.15 0.045 230)"
                    : "oklch(0.94 0.018 220)",
                  color: done || active ? "#fff" : "oklch(0.43 0.04 230)",
                }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="relative inline-flex h-7 w-7 items-center justify-center rounded-lg text-[12px] font-bold"
              >
                <AnimatePresence mode="wait">
                  {done ? (
                    <motion.span
                      key="check"
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 280, damping: 18 }}
                    >
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="num"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      {s.id}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.span>
              <span
                className={`text-sm font-semibold transition-colors ${
                  active || done ? "text-ink-950" : "text-ink-700/70"
                }`}
              >
                {s.label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function SumRow({ label, value }: { label: string; value: string }) {
  return (
    <motion.li
      layout
      className="flex items-center justify-between gap-3"
    >
      <span className="text-ink-100/85">{label}</span>
      <span className="font-semibold text-white text-right truncate max-w-[60%]">{value}</span>
    </motion.li>
  );
}
