"use client";

import { motion } from "framer-motion";
import { Minus, Plus, Bed, Bath, Ruler, Sparkles, Hammer, KeyRound } from "lucide-react";
import {
  ADDON_META,
  FREQUENCY_META,
  TIER_META,
  type AddOn,
  type BookingConfig,
  type Frequency,
  type Tier,
} from "./pricing";

const TIER_ICONS: Record<Tier, typeof Sparkles> = {
  Standard: Sparkles,
  Deep: Hammer,
  MoveInOut: KeyRound,
};

type Props = {
  config: BookingConfig;
  setConfig: (c: BookingConfig) => void;
};

function Stepper({
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
    <div className="flex items-center justify-between rounded-2xl border border-ink-200/70 bg-white px-4 py-3.5 shadow-card">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-ink-100 text-ink-700">
          <Icon className="h-4.5 w-4.5" />
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
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-ink-200 bg-white text-ink-800 hover:bg-ink-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-8 text-center font-display font-bold text-lg tabular-nums text-ink-950">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`Increase ${label}`}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-ink-950 text-white hover:bg-ink-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function StepConfigure({ config, setConfig }: Props) {
  const update = (patch: Partial<BookingConfig>) => setConfig({ ...config, ...patch });

  const toggleAddon = (a: AddOn) => {
    update({
      addOns: config.addOns.includes(a)
        ? config.addOns.filter((x) => x !== a)
        : [...config.addOns, a],
    });
  };

  return (
    <div className="space-y-6 sm:space-y-7">
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
              <button
                key={t}
                type="button"
                onClick={() => update({ tier: t })}
                className={`group rounded-2xl px-3 sm:px-4 py-3.5 text-left transition-all cursor-pointer ${
                  active
                    ? "bg-ink-950 text-white shadow-glow"
                    : "bg-white border border-ink-200/70 hover:border-ink-400 hover:shadow-card"
                }`}
              >
                <Icon
                  className={`h-4.5 w-4.5 ${
                    active ? "text-grass-400" : "text-ink-700"
                  }`}
                />
                <div
                  className={`mt-2 text-sm font-semibold ${
                    active ? "text-white" : "text-ink-950"
                  }`}
                >
                  {meta.label}
                </div>
                <div
                  className={`text-[11px] leading-tight ${
                    active ? "text-ink-100/80" : "text-ink-700/80"
                  }`}
                >
                  {meta.tagline}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
        <Stepper
          label="Bedrooms"
          icon={Bed}
          value={config.bedrooms}
          onChange={(n) => update({ bedrooms: n })}
          min={0}
          max={8}
        />
        <Stepper
          label="Bathrooms"
          icon={Bath}
          value={config.bathrooms}
          onChange={(n) => update({ bathrooms: n })}
          min={1}
          max={6}
        />
      </div>

      <div className="rounded-2xl border border-ink-200/70 bg-white px-4 py-4 shadow-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-ink-100 text-ink-700">
              <Ruler className="h-4.5 w-4.5" />
            </span>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-ink-950">Square footage</div>
              <div className="text-xs text-ink-700/80">Approximate is fine</div>
            </div>
          </div>
          <div className="font-display font-bold text-lg tabular-nums text-ink-950">
            {config.sqft.toLocaleString()} <span className="text-ink-700/70 font-medium text-sm">sqft</span>
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
              <button
                key={f}
                type="button"
                onClick={() => update({ frequency: f })}
                className={`relative rounded-2xl px-3 py-3 text-left transition-all cursor-pointer ${
                  active
                    ? "bg-grass-500/10 ring-2 ring-grass-500 text-ink-950"
                    : "bg-white border border-ink-200/70 hover:border-grass-500 text-ink-900"
                }`}
              >
                <div className="text-sm font-semibold">{meta.label}</div>
                <div
                  className={`text-[11px] mt-0.5 ${
                    meta.discount > 0
                      ? "text-grass-700 font-semibold"
                      : "text-ink-700/80"
                  }`}
                >
                  {meta.sub}
                </div>
              </button>
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
                whileTap={{ scale: 0.96 }}
                className={`group inline-flex items-center gap-2 rounded-full pl-3 pr-4 py-2 text-sm font-medium transition-all cursor-pointer ${
                  active
                    ? "bg-ink-950 text-white shadow-card"
                    : "bg-white border border-ink-200 text-ink-800 hover:border-ink-500"
                }`}
              >
                <span
                  className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
                    active ? "bg-grass-500 text-white" : "bg-ink-100 text-ink-700"
                  }`}
                >
                  {active ? "✓" : "+"}
                </span>
                <span>{meta.label}</span>
                <span
                  className={`text-xs font-semibold ${
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
