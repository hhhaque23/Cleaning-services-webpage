"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageSquare, Home } from "lucide-react";

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
  const filled = value.length > 0;
  const floating = focused || filled;

  return (
    <label className="block">
      <div className="relative">
        <motion.span
          animate={
            focused
              ? { scale: [1, 1.15, 1], color: "oklch(0.52 0.16 145)" }
              : { scale: 1, color: filled ? "oklch(0.52 0.16 145)" : "oklch(0.43 0.04 230)" }
          }
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
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
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
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
            onBlur={() => setFocused(false)}
            placeholder={focused ? placeholder : undefined}
            rows={3}
            className="w-full pl-10 pr-3.5 pt-5 pb-3 rounded-2xl border border-line bg-[var(--surface-elevated)] text-ink-950 placeholder:text-ink-700/50 resize-none focus:border-grass-500 focus:ring-2 focus:ring-grass-500/20 outline-none transition-all"
          />
        ) : (
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            type={type}
            placeholder={focused ? placeholder : undefined}
            autoComplete={autoComplete}
            required={required}
            className="w-full pl-10 pr-3.5 pt-5 pb-3 rounded-2xl border border-line bg-[var(--surface-elevated)] text-ink-950 placeholder:text-ink-700/50 focus:border-grass-500 focus:ring-2 focus:ring-grass-500/20 outline-none transition-all"
          />
        )}
      </div>
    </label>
  );
}
