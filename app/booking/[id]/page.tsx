import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { getBooking } from "@/lib/bookings";
import { STATUS_META, type BookingStatus } from "@/lib/booking-types";
import { TIER_META } from "../../components/Booking/pricing";
import { CalendarClock, MapPin, Phone, Mail, Hash, ArrowRight, Sparkles } from "lucide-react";

type Props = { params: { id: string } };

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: `Booking ${params.id} · Pristine Cleaning Co.`,
    robots: { index: false, follow: false },
  };
}

const WINDOW_LABEL: Record<string, string> = {
  morning: "8 to 11 AM",
  midday: "11 AM to 2 PM",
  afternoon: "2 to 5 PM",
};

export default async function BookingPage({ params }: Props) {
  const booking = await getBooking(params.id.toUpperCase());
  if (!booking) notFound();

  const statusMeta = STATUS_META[booking.status];
  const tier = TIER_META[booking.tier];
  const date = new Date(booking.slotDate + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="relative">
      <Navbar />

      <section className="relative pt-32 sm:pt-36 pb-16">
        <div className="absolute inset-0 -z-10 bg-grid-faint bg-grid-32 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_70%)]" />

        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-ink-600 font-semibold">
            <Hash className="h-3.5 w-3.5" />
            <span className="font-mono tabular-nums">{booking.id}</span>
          </div>

          <h1 className="mt-3 font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-ink-950 text-balance">
            Your clean is{" "}
            <span className={toneText(statusMeta.tone)}>
              {statusMeta.label.toLowerCase()}
            </span>
            .
          </h1>

          <p className="mt-4 text-lg text-ink-700 max-w-xl">
            {statusBlurb(booking.status)}
          </p>

          <div className="mt-10 rounded-3xl bg-white border border-line shadow-card overflow-hidden">
            <div className="px-6 py-5 bg-ink-50/60 border-b border-line flex items-center justify-between gap-3">
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

            <ul className="divide-y divide-ink-100">
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
            </ul>
          </div>

          <div className="mt-10 grid sm:grid-cols-[1fr_auto] gap-4 items-center">
            <p className="text-sm text-ink-700">
              Bookmark this page. We&apos;ll update it as your clean moves through the day.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-ink-950 hover:bg-ink-800 text-[var(--surface)] font-semibold px-5 py-3 text-sm transition-colors cursor-pointer"
            >
              Back home
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 rounded-2xl border border-line bg-[var(--surface-elevated)] p-5">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-grass-500/15 text-grass-700">
                <Sparkles className="h-4 w-4" />
              </span>
              <div className="text-sm text-ink-800 leading-relaxed">
                <span className="font-semibold text-ink-950">Need to change or cancel?</span>{" "}
                Text or call{" "}
                <a href="tel:+12485550199" className="font-semibold text-ink-950 underline underline-offset-4">
                  (248) 555-0199
                </a>{" "}
                and quote{" "}
                <span className="font-mono font-semibold text-ink-950">{booking.id}</span>.
                We re-clean for free within 24 hours if anything was missed.
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function statusBlurb(s: BookingStatus) {
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

function StatusPill({ status }: { status: BookingStatus }) {
  const meta = STATUS_META[status];
  const tone = {
    grass: "bg-grass-500/15 text-grass-700 ring-grass-500/30",
    ink: "bg-ink-100 text-ink-900 ring-ink-300/40",
    amber: "bg-[oklch(0.94_0.08_75)] text-[oklch(0.42_0.16_70)] ring-[oklch(0.78_0.12_75)]",
    rose: "bg-[oklch(0.94_0.05_25)] text-[oklch(0.45_0.18_25)] ring-[oklch(0.8_0.1_25)]",
  }[meta.tone];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider ring-1 ${tone}`}
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
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
    <li className="flex items-center gap-3 px-6 py-4">
      <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-ink-100 text-ink-700">
        <Icon className="h-4 w-4" />
      </span>
      <div className="leading-tight min-w-0">
        <div className="text-[11px] uppercase tracking-wider font-semibold text-ink-700">
          {label}
        </div>
        <div className="text-sm font-semibold text-ink-950 truncate">{value}</div>
      </div>
    </li>
  );
}
