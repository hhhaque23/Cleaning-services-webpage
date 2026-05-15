"use client";

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
  const update = (patch: Partial<Contact>) =>
    setContact({ ...contact, ...patch });

  return (
    <div className="space-y-4">
      <div className="text-sm text-ink-800">
        <span className="font-semibold text-ink-950">Last step.</span> We&apos;ll
        text you within 15 minutes to lock it in. No charge until your clean is
        complete.
      </div>

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
        By confirming you agree to our service terms and the 24-hour re-clean guarantee.
        We never share your info.
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
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-ink-700/80 mb-1.5">
        {label}
        {required && <span className="text-grass-700"> *</span>}
      </span>
      <span className="relative block">
        <span className="absolute left-3.5 top-3.5 text-ink-600 pointer-events-none">
          <Icon className="h-4.5 w-4.5" />
        </span>
        {textarea ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={3}
            className="w-full pl-10 pr-3.5 py-3 rounded-2xl border border-ink-200 bg-white text-ink-950 placeholder:text-ink-700/50 resize-none focus:border-ink-600 focus:ring-2 focus:ring-ink-600/20 outline-none transition-colors"
          />
        ) : (
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            required={required}
            className="w-full pl-10 pr-3.5 py-3 rounded-2xl border border-ink-200 bg-white text-ink-950 placeholder:text-ink-700/50 focus:border-ink-600 focus:ring-2 focus:ring-ink-600/20 outline-none transition-colors"
          />
        )}
      </span>
    </label>
  );
}
