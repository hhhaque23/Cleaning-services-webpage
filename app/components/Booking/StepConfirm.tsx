"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageSquare, Home, Check, AlertCircle } from "lucide-react";
import { EASE_OUT_QUINT } from "../motion/motion-primitives";

function isValid(label: string, value: string, required: boolean) {
  if (!required) return true;
  const v = value.trim();
  if (v.length === 0) return false;
  if (label.toLowerCase().startsWith("phone")) return v.replace(/\D/g, "").length >= 7;
  if (label.toLowerCase().startsWith("email")) return /^\S+@\S+\.\S+$/.test(v);
  return v.length >= 3;
}

export type Contact = {
  address: string;
  apt: string;
  phone: string;
  email: string;
  notes: string;
};

type Props = {
  contact: Contact;
  setContact: (c: Contact) => void;
};

export function StepConfirm({ contact, setContact }: Props) {
  const update = (patch: Partial<Contact>) => setContact({ ...contact, ...patch });

  return (
    <div className="space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-sm text-ink-800"
      >
        <span className="font-semibold text-ink-950">Last step.</span> We&apos;ll text you within 15
        minutes to lock it in. No charge until your clean is complete.
      </motion.div>

      <div className="grid sm:grid-cols-[1fr_140px] gap-3">
        <Field
          icon={MapPin}
          label="Street address"
          placeholder="123 Tienken Rd"
          value={contact.address}
          onChange={(v) => update({ address: v })}
          autoComplete="street-address"
          required
        />
        <Field
          icon={Home}
          label="Apt / unit"
          placeholder="Optional"
          value={contact.apt}
          onChange={(v) => update({ apt: v })}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <Field
          icon={Phone}
          label="Phone"
          placeholder="(248) 555-0199"
          value={contact.phone}
          onChange={(v) => update({ phone: v })}
          type="tel"
          autoComplete="tel"
          required
        />
        <Field
          icon={Mail}
          label="Email"
          placeholder="you@email.com"
          value={contact.email}
          onChange={(v) => update({ email: v })}
          type="email"
          autoComplete="email"
          required
        />
      </div>

      <Field
        icon={MessageSquare}
        label="Notes for your cleaner"
        placeholder="Gate code, pet quirks, where to start…"
        value={contact.notes}
        onChange={(v) => update({ notes: v })}
        textarea
      />

      <p className="text-xs text-ink-700/80 pt-1">
        By confirming you agree to our service terms and the 24-hour re-clean guarantee. We never
        share your info.
      </p>
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  autoComplete,
  textarea,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  textarea?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const filled = value.length > 0;
  const floating = focused || filled;
  const valid = isValid(label, value, !!required);
  const showInvalid = touched && !focused && !!required && !valid;
  const showValid = touched && !focused && !!required && valid;

  return (
    <label className="block">
      <div className="relative">
        <motion.span
          animate={
            focused
              ? { scale: [1, 1.15, 1], color: "oklch(0.52 0.16 145)" }
              : { scale: 1, color: filled ? "oklch(0.52 0.16 145)" : "oklch(0.43 0.04 230)" }
          }
          transition={{ duration: 0.35, ease: EASE_OUT_QUINT }}
          className="absolute left-3.5 top-3.5 pointer-events-none"
        >
          <Icon className="h-[18px] w-[18px]" />
        </motion.span>

        <motion.span
          animate={{
            y: floating ? -10 : 6,
            scale: floating ? 0.82 : 1,
            color: focused
              ? "oklch(0.52 0.16 145)"
              : filled
              ? "oklch(0.23 0.05 230)"
              : "oklch(0.43 0.04 230)",
          }}
          transition={{ duration: 0.22, ease: EASE_OUT_QUINT }}
          className="absolute left-10 top-3 origin-left text-sm font-semibold pointer-events-none bg-[var(--surface-elevated)] px-1 -ml-1"
        >
          {label}
          {required && <span className="text-grass-700"> *</span>}
        </motion.span>

        {textarea ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false);
              setTouched(true);
            }}
            placeholder={focused ? placeholder : undefined}
            rows={3}
            aria-invalid={showInvalid || undefined}
            className={`w-full pl-10 pr-10 pt-5 pb-3 rounded-2xl border bg-[var(--surface-elevated)] text-ink-950 placeholder:text-ink-700/50 resize-none focus:ring-2 outline-none transition-all ${
              showInvalid
                ? "border-[oklch(0.78_0.16_25)] focus:border-[oklch(0.65_0.18_25)] focus:ring-[oklch(0.78_0.16_25)]/20"
                : "border-line focus:border-grass-500 focus:ring-grass-500/20"
            }`}
          />
        ) : (
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false);
              setTouched(true);
            }}
            type={type}
            placeholder={focused ? placeholder : undefined}
            autoComplete={autoComplete}
            required={required}
            aria-invalid={showInvalid || undefined}
            className={`w-full pl-10 pr-10 pt-5 pb-3 rounded-2xl border bg-[var(--surface-elevated)] text-ink-950 placeholder:text-ink-700/50 focus:ring-2 outline-none transition-all ${
              showInvalid
                ? "border-[oklch(0.78_0.16_25)] focus:border-[oklch(0.65_0.18_25)] focus:ring-[oklch(0.78_0.16_25)]/20"
                : "border-line focus:border-grass-500 focus:ring-grass-500/20"
            }`}
          />
        )}

        <span
          className="absolute right-3.5 top-3.5 pointer-events-none h-[18px] w-[18px]"
          aria-hidden
        >
          <AnimatePresence mode="wait">
            {showValid && (
              <motion.span
                key="valid"
                initial={{ scale: 0, rotate: -30, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                className="absolute inset-0 inline-flex items-center justify-center text-grass-700"
              >
                <Check className="h-[18px] w-[18px]" strokeWidth={3} />
              </motion.span>
            )}
            {showInvalid && (
              <motion.span
                key="invalid"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, x: [0, -2, 2, -1, 1, 0] }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 inline-flex items-center justify-center text-[oklch(0.55_0.18_25)]"
              >
                <AlertCircle className="h-[18px] w-[18px]" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </div>
    </label>
  );
}
