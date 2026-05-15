import { notFound } from "next/navigation";
import Link from "next/link";
import { getBooking, STATUS_META } from "@/lib/bookings";
import { ADDON_META, FREQUENCY_META, TIER_META } from "../../components/Booking/pricing";
import {
  ArrowLeft,
  CalendarClock,
  Mail,
  MapPin,
  Phone,
  StickyNote,
  ExternalLink,
} from "lucide-react";
import { StatusActions } from "./StatusActions";

type Props = { params: { id: string } };

export const dynamic = "force-dynamic";

const WINDOW_LABEL: Record<string, string> = {
  morning: "8 to 11 AM",
  midday: "11 AM to 2 PM",
  afternoon: "2 to 5 PM",
};

export default async function AdminBookingDetail({ params }: Props) {
  const id = params.id.toUpperCase();
  const booking = await getBooking(id);
  if (!booking) notFound();

  const tier = TIER_META[booking.tier];
  const freq = FREQUENCY_META[booking.frequency];
  const meta = STATUS_META[booking.status];
  const date = new Date(booking.slotDate + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const created = new Date(booking.createdAt).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8 py-10">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-700 hover:text-ink-950 transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        All bookings
      </Link>

      <div className="mt-6 flex items-start justify-between gap-6 flex-wrap">
        <div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-ink-600 font-semibold font-mono">
            {booking.id}
          </div>
          <h1 className="mt-1 font-display font-extrabold text-3xl sm:text-4xl text-ink-950 tracking-tight">
            {tier.label}
          </h1>
          <p className="mt-1 text-sm text-ink-700">Received {created}</p>
        </div>

        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider ${badge(meta.tone)}`}>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
            {meta.label}
          </span>
          <Link
            href={`/booking/${booking.id}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-700 hover:text-ink-950 cursor-pointer"
          >
            Customer view
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <div className="mt-8 grid lg:grid-cols-[1.4fr_1fr] gap-6">
        <div className="space-y-6">
          <section className="rounded-2xl bg-white ring-1 ring-line shadow-soft">
            <header className="px-6 py-4 border-b border-line">
              <h2 className="font-display font-bold text-base text-ink-950">
                Customer
              </h2>
            </header>
            <ul className="divide-y divide-ink-100">
              <Row icon={MapPin} label="Address">
                {booking.address}
                {booking.apt && <>, <span className="font-normal text-ink-700">{booking.apt}</span></>}
              </Row>
              <Row icon={Phone} label="Phone">
                <a href={`tel:${booking.phone}`} className="hover:underline">
                  {booking.phone}
                </a>
              </Row>
              <Row icon={Mail} label="Email">
                <a href={`mailto:${booking.email}`} className="hover:underline">
                  {booking.email}
                </a>
              </Row>
              {booking.notes && (
                <Row icon={StickyNote} label="Notes">
                  <span className="font-normal text-ink-800 whitespace-pre-wrap">
                    {booking.notes}
                  </span>
                </Row>
              )}
            </ul>
          </section>

          <section className="rounded-2xl bg-white ring-1 ring-line shadow-soft">
            <header className="px-6 py-4 border-b border-line">
              <h2 className="font-display font-bold text-base text-ink-950">
                Job details
              </h2>
            </header>
            <div className="p-6 grid sm:grid-cols-2 gap-x-6 gap-y-5">
              <Field label="When">
                {date}
                <div className="mt-0.5 text-sm font-normal text-ink-700">
                  {WINDOW_LABEL[booking.slotWindow]}
                </div>
              </Field>
              <Field label="Frequency">{freq.label}</Field>
              <Field label="Home">
                {booking.bedrooms} bd · {booking.bathrooms} ba
                <div className="mt-0.5 text-sm font-normal text-ink-700">
                  {booking.sqft.toLocaleString()} sqft
                </div>
              </Field>
              <Field label="Add-ons">
                {booking.addOns.length === 0 ? (
                  <span className="text-ink-700 font-normal">None</span>
                ) : (
                  <ul className="space-y-0.5">
                    {booking.addOns.map((a) => (
                      <li key={a} className="text-sm font-normal text-ink-800">
                        · {ADDON_META[a as keyof typeof ADDON_META]?.label ?? a}
                      </li>
                    ))}
                  </ul>
                )}
              </Field>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl bg-ink-950 text-[var(--surface)] p-6 shadow-card relative overflow-hidden">
            <div className="absolute inset-0 noise opacity-30 pointer-events-none" />
            <div className="relative">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-[oklch(0.985_0.006_220/0.7)]">
                Total
              </div>
              <div className="mt-1 font-display font-extrabold text-5xl tabular-nums">
                ${booking.priceTotal}
              </div>
              {booking.priceDiscount > 0 && (
                <div className="mt-2 text-sm text-grass-300">
                  ${booking.priceSubtotal} subtotal · −${booking.priceDiscount} {freq.label.toLowerCase()}
                </div>
              )}
              <div className="mt-4 text-[11px] uppercase tracking-wider font-semibold text-[oklch(0.985_0.006_220/0.6)]">
                Billed after the clean
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white ring-1 ring-line shadow-soft p-6">
            <h2 className="font-display font-bold text-base text-ink-950">
              Move this booking forward
            </h2>
            <p className="mt-1 text-sm text-ink-700">
              Each transition updates the customer&apos;s tracking page.
            </p>
            <div className="mt-5">
              <StatusActions id={booking.id} current={booking.status} />
            </div>
          </section>

          <section className="rounded-2xl bg-[var(--surface-elevated)] ring-1 ring-line p-5">
            <div className="flex items-start gap-3">
              <CalendarClock className="h-4 w-4 text-ink-700 mt-0.5 flex-none" />
              <div className="text-sm text-ink-800 leading-relaxed">
                <span className="font-semibold text-ink-950">Reach the customer</span> at{" "}
                <a href={`tel:${booking.phone}`} className="font-semibold text-ink-950 underline underline-offset-2">
                  {booking.phone}
                </a>{" "}
                within 15 minutes of receipt for the best conversion.
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function badge(tone: "ink" | "grass" | "amber" | "rose") {
  return {
    grass: "bg-grass-500/15 text-grass-700 ring-1 ring-grass-500/30",
    ink: "bg-ink-100 text-ink-900 ring-1 ring-ink-300/40",
    amber: "bg-[oklch(0.95_0.08_75)] text-[oklch(0.42_0.16_70)] ring-1 ring-[oklch(0.78_0.12_75)]",
    rose: "bg-[oklch(0.95_0.05_25)] text-[oklch(0.45_0.18_25)] ring-1 ring-[oklch(0.8_0.1_25)]",
  }[tone];
}

function Row({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Mail;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3 px-6 py-4">
      <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-ink-100 text-ink-700 mt-0.5">
        <Icon className="h-4 w-4" />
      </span>
      <div className="leading-tight min-w-0 flex-1">
        <div className="text-[11px] uppercase tracking-wider font-semibold text-ink-700">
          {label}
        </div>
        <div className="mt-0.5 text-sm font-semibold text-ink-950">{children}</div>
      </div>
    </li>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider font-semibold text-ink-700">
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-ink-950">{children}</div>
    </div>
  );
}
