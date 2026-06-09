import Link from "next/link";
import {
  isDbConfigured,
  listBookings,
  STATUS_META,
  type Booking,
  type BookingStatus,
} from "@/lib/bookings";
import { getCleaners } from "@/lib/settings";
import { businessToday } from "@/lib/dates";
import { FREQUENCY_META, TIER_META } from "../components/Booking/pricing";
import { OpsBoard } from "./_OpsBoard";
import {
  ArrowRight,
  AlertTriangle,
  CalendarDays,
  Repeat,
  CheckCheck,
  ListFilter,
} from "lucide-react";

export const dynamic = "force-dynamic";

type FilterId = BookingStatus | "all" | "recurring";

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "recurring", label: "Recurring" },
  { id: "new", label: "New" },
  { id: "confirmed", label: "Confirmed" },
  { id: "scheduled", label: "Scheduled" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
];

type Props = { searchParams: { status?: string } };

export default async function AdminDashboard({ searchParams }: Props) {
  const dbReady = isDbConfigured();
  const statusParam = searchParams?.status;
  // No ?status -> the animated pipeline board. With ?status -> the full
  // filterable bookings list (preserves every existing /admin?status=… URL).
  const showQueue = statusParam === undefined;
  const filter = (statusParam as FilterId) ?? "all";

  const allBookings = await listBookings();
  const cleaners = await getCleaners();
  const todayISO = businessToday();

  const filtered = showQueue
    ? []
    : filter === "all"
    ? allBookings
    : filter === "recurring"
    ? allBookings.filter((b) => b.frequency !== "onetime")
    : allBookings.filter((b) => b.status === (filter as BookingStatus));

  // Cards that live on the board: anything needing action or still ahead of us.
  const boardItems = allBookings.filter(
    (b) =>
      b.status === "new" ||
      ((b.status === "confirmed" || b.status === "scheduled") && b.slotDate >= todayISO),
  );

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 py-10">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-ink-600 font-semibold">
            Operations
          </div>
          <h1 className="mt-2 font-display font-extrabold text-3xl sm:text-4xl text-ink-950 tracking-tight">
            {showQueue ? "Action board" : "All bookings"}
          </h1>
          <p className="mt-1 text-sm text-ink-700">
            {showQueue
              ? "Move each booking left to right — confirm, schedule, done."
              : "Filter and review every booking."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {showQueue ? (
            <Link
              href="/admin?status=all"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--surface-elevated)] ring-1 ring-line hover:ring-ink-300 text-ink-800 text-sm font-semibold px-4 py-2.5 cursor-pointer transition-all"
            >
              <ListFilter className="h-4 w-4" /> All bookings
            </Link>
          ) : (
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--surface-elevated)] ring-1 ring-line hover:ring-ink-300 text-ink-800 text-sm font-semibold px-4 py-2.5 cursor-pointer transition-all"
            >
              <ArrowRight className="h-4 w-4 rotate-180" /> Back to board
            </Link>
          )}
          <Link
            href="/admin/calendar"
            className="inline-flex items-center gap-1.5 rounded-xl bg-ink-950 hover:bg-ink-800 text-white text-sm font-semibold px-4 py-2.5 cursor-pointer transition-colors"
          >
            <CalendarDays className="h-4 w-4" /> Open calendar
          </Link>
        </div>
      </div>

      {!dbReady && (
        <div className="mt-6 rounded-2xl border border-[oklch(0.78_0.12_75)] bg-[oklch(0.97_0.05_75)] px-5 py-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 flex-none text-[oklch(0.55_0.18_70)] mt-0.5" />
          <div className="text-sm text-[oklch(0.35_0.12_70)] leading-relaxed">
            <strong className="font-semibold">DATABASE_URL is not set.</strong> Bookings
            are being stored in memory and will reset on every deploy. Provision Postgres
            on Railway (Add Service → Database → PostgreSQL) and re-deploy.
          </div>
        </div>
      )}

      {showQueue ? (
        <div className="mt-8">
          <OpsBoard initial={boardItems} cleaners={cleaners} todayISO={todayISO} />
        </div>
      ) : (
        <div className="mt-8">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            {FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <Link
                  key={f.id}
                  href={`/admin?status=${f.id}`}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                    active
                      ? "bg-ink-950 text-[var(--surface)] shadow-soft"
                      : "bg-[var(--surface-elevated)]/70 text-ink-600 hover:text-ink-950 hover:bg-[var(--surface-elevated)]"
                  }`}
                >
                  {f.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-6">
            {filtered.length === 0 ? (
              <EmptyState filter={filter} />
            ) : (
              <ul className="grid gap-3">
                {filtered.map((b) => (
                  <BookingRow key={b.id} booking={b} />
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function BookingRow({ booking }: { booking: Booking }) {
  const tier = TIER_META[booking.tier];
  const freq = FREQUENCY_META[booking.frequency];
  const isRecurring = booking.frequency !== "onetime";
  const date = new Date(booking.slotDate + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const win = { morning: "AM", midday: "Mid", afternoon: "PM" }[booking.slotWindow];
  const meta = STATUS_META[booking.status];
  const created = new Date(booking.createdAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <li>
      <Link
        href={`/admin/${booking.id}`}
        className="group block rounded-2xl bg-white ring-1 ring-line shadow-soft hover:ring-ink-300 hover:shadow-card transition-all px-5 py-4 cursor-pointer"
      >
        <div className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1.4fr_1fr_1fr_auto] gap-4 items-center">
          <StatusDot tone={meta.tone} />

          <div className="min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold text-ink-950 tabular-nums">
                {booking.id}
              </span>
              <span className="text-xs text-ink-faint">·</span>
              <span className="text-xs text-ink-700 truncate">{tier.label}</span>
              {isRecurring && (
                <span className="inline-flex items-center gap-1 rounded-full bg-grass-500/15 text-grass-700 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5">
                  <Repeat className="h-2.5 w-2.5" strokeWidth={2.8} />
                  {freq.label}
                </span>
              )}
            </div>
            <div className="mt-1 text-sm font-semibold text-ink-950 truncate">
              {booking.address}
              {booking.apt ? `, ${booking.apt}` : ""}
            </div>
            <div className="mt-0.5 text-xs text-ink-700">
              {booking.bedrooms} bd · {booking.bathrooms} ba · {booking.sqft.toLocaleString()} sqft
              {booking.floors > 1 ? ` · ${booking.floors} fl` : ""}
            </div>
          </div>

          <div className="hidden sm:block">
            <div className="text-[11px] uppercase tracking-wider font-semibold text-ink-700">
              Slot
            </div>
            <div className="mt-0.5 text-sm font-semibold text-ink-950">
              {date} <span className="text-ink-700 font-normal">{win}</span>
            </div>
          </div>

          <div className="hidden sm:block">
            <div className="text-[11px] uppercase tracking-wider font-semibold text-ink-700">
              Price
            </div>
            <div className="mt-0.5 font-display font-bold text-lg text-ink-950 tabular-nums">
              ${booking.priceTotal}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <StatusBadge status={booking.status} />
            <ArrowRight className="hidden sm:block h-4 w-4 text-ink-400 group-hover:text-ink-700 transition-colors" />
          </div>
        </div>

        <div className="mt-2 text-[11px] text-ink-faint">Received {created}</div>
      </Link>
    </li>
  );
}

function StatusDot({ tone }: { tone: "ink" | "grass" | "amber" | "rose" }) {
  const bg = {
    grass: "bg-grass-500",
    ink: "bg-ink-500",
    amber: "bg-[oklch(0.7_0.16_70)]",
    rose: "bg-[oklch(0.6_0.18_25)]",
  }[tone];
  return <span className={`inline-block h-2.5 w-2.5 rounded-full ${bg}`} />;
}

function StatusBadge({ status }: { status: BookingStatus }) {
  const meta = STATUS_META[status];
  const cls = {
    grass: "bg-grass-500/15 text-grass-700",
    ink: "bg-ink-100 text-ink-900",
    amber: "bg-[oklch(0.95_0.08_75)] text-[oklch(0.42_0.16_70)]",
    rose: "bg-[oklch(0.95_0.05_25)] text-[oklch(0.45_0.18_25)]",
  }[meta.tone];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${cls}`}
    >
      {meta.label}
    </span>
  );
}

function EmptyState({ filter }: { filter: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-line bg-[var(--surface-elevated)] px-6 py-16 text-center">
      <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-ink-100 text-ink-700">
        <CheckCheck className="h-6 w-6" />
      </span>
      <h2 className="mt-5 font-display font-bold text-xl text-ink-950">
        Nothing in {filter === "all" ? "the queue" : filter} yet.
      </h2>
      <p className="mt-1 text-sm text-ink-700 max-w-sm mx-auto">
        New bookings from{" "}
        <Link href="/book" className="underline underline-offset-4 hover:text-ink-950">
          /book
        </Link>{" "}
        land here in real time.
      </p>
    </div>
  );
}
