"use client";

import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { useCallback, useRef } from "react";
import {
  CalendarClock,
  MapPin,
  Phone,
  Mail,
  Hash,
  ArrowRight,
  Sparkles,
  Check,
} from "lucide-react";
import {
  STATUS_FLOW,
  STATUS_META,
  type Booking,
  type BookingStatus,
} from "@/lib/booking-types";
import { TIER_META } from "@/app/components/Booking/pricing";
import { SplitText } from "@/app/components/motion/SplitText";
import { MagneticButton } from "@/app/components/motion/MagneticButton";
import { Confetti } from "@/app/components/motion/Confetti";
import { EASE_OUT_QUINT } from "@/app/components/motion/motion-primitives";

const WINDOW_LABEL: Record<string, string> = {
  morning: "8 to 11 AM",
  midday: "11 AM to 2 PM",
  afternoon: "2 to 5 PM",
};

function statusBlurb(s: BookingStatus): string {
  switch (s) {
    case "new":
      return "We've got your request. You'll get a text from a real person within 15 minutes with your cleaner's name.";
    case "confirmed":
      return "A cleaner is locked in. You'll get a 30-minute heads up before they arrive.";
    case "scheduled":
      return "You're on the route for today. Watch for a text when the cleaner is on their way.";
    case "completed":
      return "Hope your place feels like it should. Reply to our text within 24 hours if anything needs another pass, free.";
    case "cancelled":
      return "This booking was cancelled. If that's not what you wanted, give us a call and we'll re-open it.";
  }
}

function toneText(tone: "ink" | "grass" | "amber" | "rose") {
  switch (tone) {
    case "grass":
      return "text-grass-700";
    case "amber":
      return "text-[oklch(0.62_0.16_70)]";
    case "rose":
      return "text-[oklch(0.55_0.18_25)]";
    default:
      return "text-ink-700 italic font-medium";
  }
}

export function TrackingView({ booking }: { booking: Booking }) {
  const statusMeta = STATUS_META[booking.status];
  const tier = TIER_META[booking.tier];
  const date = new Date(booking.slotDate + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const cardRef = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(50);
  const my = useMotionValue(35);

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduce) return;
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      mx.set(((e.clientX - rect.left) / rect.width) * 100);
      my.set(((e.clientY - rect.top) / rect.height) * 100);
    },
    [mx, my, reduce],
  );

  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, oklch(0.65 0.13 220 / 0.18), transparent 65%)`;

  const isCompleted = booking.status === "completed";
  const isCancelled = booking.status === "cancelled";

  return (
    <section className="relative pt-32 sm:pt-36 pb-20 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid-faint bg-grid-32 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_70%)]" />

      <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-ink-600 font-semibold"
        >
          <Hash className="h-3.5 w-3.5" />
          <span className="font-mono tabular-nums">{booking.id}</span>
        </motion.div>

        <h1 className="mt-3 font-display font-extrabold text-4xl sm:text-5xl tracking-[-0.022em] text-ink-950 text-balance leading-[1.05]">
          <SplitText mode="word" trigger="view" stagger={0.05}>
            {"Your clean is"}
          </SplitText>{" "}
          <SplitText
            mode="word"
            trigger="view"
            stagger={0.05}
            delay={0.5}
            className={`${toneText(statusMeta.tone)} not-italic font-extrabold`}
          >
            {`${statusMeta.label.toLowerCase()}.`}
          </SplitText>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85 }}
          className="mt-4 text-lg text-ink-700 max-w-xl leading-relaxed"
        >
          {statusBlurb(booking.status)}
        </motion.p>

        <StatusTimeline status={booking.status} />

        <motion.div
          ref={cardRef}
          onMouseMove={handleMove}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05, ease: EASE_OUT_QUINT }}
          className="relative mt-10 rounded-3xl bg-[var(--surface-elevated)] border border-line shadow-card overflow-hidden"
        >
          <motion.div
            aria-hidden
            style={{ background: spotlight }}
            className="absolute inset-0 pointer-events-none"
          />
          <div className="relative px-6 py-5 bg-ink-50/60 border-b border-line flex items-center justify-between gap-3">
            <div>
              <div className="text-[11px] uppercase tracking-[0.12em] font-semibold text-ink-700">
                {tier.label}
              </div>
              <div className="mt-0.5 font-display font-extrabold text-2xl text-ink-950 tabular-nums">
                ${booking.priceTotal.toLocaleString()}
              </div>
            </div>
            <StatusPill status={booking.status} />
          </div>

          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 1.2 } } }}
            className="relative divide-y divide-ink-100"
          >
            <Row
              icon={CalendarClock}
              label="When"
              value={`${date} · ${WINDOW_LABEL[booking.slotWindow] ?? booking.slotWindow}`}
            />
            <Row
              icon={MapPin}
              label="Where"
              value={`${booking.address}${booking.apt ? `, ${booking.apt}` : ""}`}
            />
            <Row icon={Phone} label="Text" value={booking.phone} />
            <Row icon={Mail} label="Email" value={booking.email} />
          </motion.ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="mt-10 grid sm:grid-cols-[1fr_auto] gap-4 items-center"
        >
          <p className="text-sm text-ink-700">
            Bookmark this page. We&apos;ll update it as your clean moves through the day.
          </p>
          <MagneticButton as="div" radius={110} strength={0.25}>
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-ink-950 hover:bg-ink-800 text-[var(--surface)] font-semibold px-5 py-3 text-sm transition-colors cursor-pointer"
            >
              Back home
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.65 }}
          className="mt-12 rounded-2xl border border-line bg-[var(--surface-elevated)] p-5"
        >
          <div className="flex items-start gap-3">
            <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-grass-500/15 text-grass-700">
              <Sparkles className="h-4 w-4" />
            </span>
            <div className="text-sm text-ink-800 leading-relaxed">
              <span className="font-semibold text-ink-950">Need to change or cancel?</span> Text or
              call{" "}
              <a
                href="tel:+12485550199"
                className="font-semibold text-ink-950 underline underline-offset-4 hover:text-grass-700"
              >
                (248) 555-0199
              </a>{" "}
              and quote{" "}
              <span className="font-mono font-semibold text-ink-950">{booking.id}</span>. We re-clean
              for free within 24 hours if anything was missed.
            </div>
          </div>
        </motion.div>

        {isCompleted && (
          <div className="pointer-events-none fixed inset-0 flex items-start justify-center z-30">
            <Confetti count={50} duration={2.2} spread={400} />
          </div>
        )}
      </div>
    </section>
  );
}

function StatusTimeline({ status }: { status: BookingStatus }) {
  const isCancelled = status === "cancelled";
  const currentIdx = isCancelled
    ? -1
    : STATUS_FLOW.indexOf(status as (typeof STATUS_FLOW)[number]);
  const progress = isCancelled ? 0 : Math.max(0, currentIdx / (STATUS_FLOW.length - 1));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.95, ease: EASE_OUT_QUINT }}
      className="mt-10 relative"
    >
      <div className="flex items-center justify-between relative">
        <div className="absolute left-4 right-4 top-3.5 h-px bg-ink-200" aria-hidden />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `calc(${progress * 100}% - ${progress * 32}px)` }}
          transition={{ duration: 1, ease: EASE_OUT_QUINT, delay: 1.1 }}
          className="absolute left-4 top-3.5 h-px bg-gradient-to-r from-grass-500 to-grass-600"
          aria-hidden
        />

        {STATUS_FLOW.map((s, i) => {
          const done = !isCancelled && currentIdx > i;
          const current = !isCancelled && currentIdx === i;
          const meta = STATUS_META[s];

          return (
            <div key={s} className="relative z-10 flex flex-col items-center gap-1.5">
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 1.1 + i * 0.1,
                  ease: EASE_OUT_QUINT,
                }}
                className={`relative inline-flex h-7 w-7 items-center justify-center rounded-full ring-4 ring-[var(--surface)] ${
                  done
                    ? "bg-grass-500 text-white"
                    : current
                    ? "bg-ink-950 text-white"
                    : isCancelled
                    ? "bg-ink-100 text-ink-faint"
                    : "bg-ink-100 text-ink-faint"
                }`}
              >
                {done ? (
                  <Check className="h-3.5 w-3.5" strokeWidth={3.2} />
                ) : (
                  <span className="text-[10px] font-bold">{i + 1}</span>
                )}
                {current && (
                  <motion.span
                    aria-hidden
                    animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full bg-ink-950"
                  />
                )}
              </motion.span>
              <span
                className={`text-[10px] font-bold uppercase tracking-[0.1em] ${
                  done || current ? "text-ink-950" : "text-ink-faint"
                }`}
              >
                {meta.label}
              </span>
            </div>
          );
        })}
      </div>
      {isCancelled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[oklch(0.94_0.05_25)] text-[oklch(0.45_0.18_25)] text-xs font-semibold px-3 py-1.5"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
          This booking was cancelled
        </motion.div>
      )}
    </motion.div>
  );
}

function StatusPill({ status }: { status: BookingStatus }) {
  const meta = STATUS_META[status];
  const reduce = useReducedMotion();
  const tone = {
    grass: "bg-grass-500/15 text-grass-700 ring-grass-500/30",
    ink: "bg-ink-100 text-ink-900 ring-ink-300/40",
    amber: "bg-[oklch(0.94_0.08_75)] text-[oklch(0.42_0.16_70)] ring-[oklch(0.78_0.12_75)]",
    rose: "bg-[oklch(0.94_0.05_25)] text-[oklch(0.45_0.18_25)] ring-[oklch(0.8_0.1_25)]",
  }[meta.tone];

  const showPulse = !reduce && (status === "new" || status === "scheduled");

  return (
    <span
      className={`relative inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider ring-1 ${tone}`}
    >
      <span className="relative inline-flex h-1.5 w-1.5">
        {showPulse && (
          <motion.span
            animate={{ scale: [1, 2.2, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-full bg-current"
          />
        )}
        <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-current" />
      </span>
      {meta.label}
    </span>
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
        hidden: { opacity: 0, x: -8 },
        show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE_OUT_QUINT } },
      }}
      className="flex items-center gap-3 px-6 py-4"
    >
      <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-ink-100 text-ink-700">
        <Icon className="h-4 w-4" />
      </span>
      <div className="leading-tight min-w-0">
        <div className="text-[11px] uppercase tracking-wider font-semibold text-ink-700">
          {label}
        </div>
        <div className="text-sm font-semibold text-ink-950 truncate">{value}</div>
      </div>
    </motion.li>
  );
}
