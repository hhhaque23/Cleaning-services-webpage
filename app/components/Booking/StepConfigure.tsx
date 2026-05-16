"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus, Bed, Bath, Ruler, Sparkles, Hammer, KeyRound, Check } from "lucide-react";
import {
  ADDON_META,
  FREQUENCY_META,
  TIER_META,
  type AddOn,
  type BookingConfig,
  type Frequency,
  type Tier,
} from "./pricing";
import { MagneticButton } from "../motion/MagneticButton";
import { EASE_OUT_QUINT } from "../motion/motion-primitives";

const TIER_ICONS: Record<Tier, typeof Sparkles> = {
  Standard: Sparkles,
  Deep: Hammer,
  MoveInOut: KeyRound,
};

type Props = {
  config: BookingConfig;
  setConfig: (c: BookingConfig) => void;
};

function NumberStepper({
  label,
  icon: Icon,
  value,
  onChange,
  min,
  max,
}: {
  label: string;
  icon: typeof Bed;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-line bg-[var(--surface)] px-4 py-3.5 shadow-soft hover:shadow-card transition-shadow">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-ink-100 text-ink-700">
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-ink-950">{label}</div>
          <div className="text-xs text-ink-700/80">Pick a number</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-[var(--surface)] text-ink-800 hover:bg-ink-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer active:scale-95"
        >
          <Minus className="h-4 w-4" />
        </button>
        <div className="relative w-10 h-8 overflow-hidden">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={value}
              initial={{ y: -28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 28, opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE_OUT_QUINT }}
              className="absolute inset-0 flex items-center justify-center font-display font-bold text-lg tabular-nums text-ink-950"
            >
              {value}
            </motion.span>
          </AnimatePresence>
        </div>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`Increase ${label}`}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-ink-950 text-white hover:bg-ink-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer active:scale-95"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function StepConfigure({ config, setConfig }: Props) {
  const reduce = useReducedMotion();
  const update = (patch: Partial<BookingConfig>) => setConfig({ ...config, ...patch });

  const toggleAddon = (a: AddOn) => {
    update({
      addOns: config.addOns.includes(a)
        ? config.addOns.filter((x) => x !== a)
        : [...config.addOns, a],
    });
  };

  const sqftPct = ((config.sqft - 500) / (5000 - 500)) * 100;

  return (
    <div className="space-y-7">
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-ink-700/80 mb-3">
          Service tier
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {(Object.keys(TIER_META) as Tier[]).map((t) => {
            const meta = TIER_META[t];
            const Icon = TIER_ICONS[t];
            const active = config.tier === t;
            return (
              <motion.button
                key={t}
                type="button"
                onClick={() => update({ tier: t })}
                whileHover={reduce ? undefined : { y: -2 }}
                whileTap={reduce ? undefined : { scale: 0.97 }}
                animate={{ y: active ? -4 : 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
                className={`relative rounded-2xl px-3 sm:px-4 py-3.5 text-left transition-all cursor-pointer overflow-hidden ${
                  active
                    ? "bg-ink-950 text-white shadow-lift"
                    : "bg-[var(--surface)] border border-line hover:border-line-strong hover:shadow-card"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="tier-glow"
                    className="absolute -inset-px rounded-2xl pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at top right, oklch(0.68 0.18 145 / 0.35), transparent 70%)",
                    }}
                  />
                )}
                <Icon
                  className={`relative h-[18px] w-[18px] ${
                    active ? "text-grass-400" : "text-ink-700"
                  }`}
                />
                <div
                  className={`relative mt-2 text-sm font-semibold ${
                    active ? "text-white" : "text-ink-950"
                  }`}
                >
                  {meta.label}
                </div>
                <div
                  className={`relative text-[11px] leading-tight ${
                    active ? "text-ink-100/85" : "text-ink-700/80"
                  }`}
                >
                  {meta.tagline}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
        <NumberStepper
          label="Bedrooms"
          icon={Bed}
          value={config.bedrooms}
          onChange={(n) => update({ bedrooms: n })}
          min={0}
          max={8}
        />
        <NumberStepper
          label="Bathrooms"
          icon={Bath}
          value={config.bathrooms}
          onChange={(n) => update({ bathrooms: n })}
          min={1}
          max={6}
        />
      </div>

      <div className="rounded-2xl border border-line bg-[var(--surface)] px-4 py-4 shadow-soft">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-ink-100 text-ink-700">
              <Ruler className="h-[18px] w-[18px]" />
            </span>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-ink-950">Square footage</div>
              <div className="text-xs text-ink-700/80">Approximate is fine</div>
            </div>
          </div>
          <div className="font-display font-bold text-lg tabular-nums text-ink-950">
            {config.sqft.toLocaleString()}{" "}
            <span className="text-ink-700/70 font-medium text-sm">sqft</span>
          </div>
        </div>
        <input
          type="range"
          min={500}
          max={5000}
          step={100}
          value={config.sqft}
          onChange={(e) => update({ sqft: Number(e.target.value) })}
          className="mt-4 w-full accent-ink-600 cursor-pointer"
          style={{ "--range-pct": `${sqftPct}%` } as React.CSSProperties}
        />
        <div className="mt-1 flex justify-between text-[11px] text-ink-700/70 font-medium">
          <span>500</span>
          <span>2,000</span>
          <span>3,500</span>
          <span>5,000+</span>
        </div>
      </div>

      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-ink-700/80 mb-3">
          Frequency
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {(Object.keys(FREQUENCY_META) as Frequency[]).map((f) => {
            const meta = FREQUENCY_META[f];
            const active = config.frequency === f;
            return (
              <motion.button
                key={f}
                type="button"
                onClick={() => update({ frequency: f })}
                whileHover={reduce ? undefined : { y: -2 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
                className={`relative rounded-2xl px-3 py-3 text-left transition-all cursor-pointer ${
                  active
                    ? "bg-grass-500/10 ring-2 ring-grass-500 text-ink-950 shadow-soft"
                    : "bg-[var(--surface)] border border-line hover:border-grass-500/40 text-ink-900"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="freq-active"
                    aria-hidden
                    className="absolute inset-0 -z-10 rounded-2xl pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, oklch(0.68 0.18 145 / 0.08), transparent 70%)",
                    }}
                  />
                )}
                <div className="text-sm font-semibold">{meta.label}</div>
                <div
                  className={`text-[11px] mt-0.5 ${
                    meta.discount > 0 ? "text-grass-700 font-semibold" : "text-ink-700/80"
                  }`}
                >
                  {meta.sub}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-ink-700/80 mb-3">
          Add-ons (optional)
        </div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(ADDON_META) as AddOn[]).map((a) => {
            const meta = ADDON_META[a];
            const active = config.addOns.includes(a);
            return (
              <motion.button
                key={a}
                type="button"
                onClick={() => toggleAddon(a)}
                layout
                whileTap={reduce ? undefined : { scale: 0.95 }}
                whileHover={reduce ? undefined : { y: -2 }}
                className={`group relative inline-flex items-center gap-2 rounded-full pl-2.5 pr-4 py-2 text-sm font-medium transition-all cursor-pointer ${
                  active
                    ? "bg-ink-950 text-white shadow-card"
                    : "bg-[var(--surface)] border border-line text-ink-800 hover:border-ink-500"
                }`}
              >
                <motion.span
                  layout
                  className={`relative inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold overflow-hidden ${
                    active ? "bg-grass-500 text-white" : "bg-ink-100 text-ink-700"
                  }`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {active ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 320, damping: 18 }}
                      >
                        <Check className="h-3.5 w-3.5" strokeWidth={3.2} />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="plus"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        <Plus className="h-3.5 w-3.5" strokeWidth={2.8} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.span>
                <span>{meta.label}</span>
                <span
                  className={`text-xs font-semibold tabular-nums ${
                    active ? "text-grass-400" : "text-ink-600"
                  }`}
                >
                  +${meta.price}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
