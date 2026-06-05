import Link from "next/link";
import {
  bookingStats,
  isDbConfigured,
  listBookings,
  STATUS_META,
  type Booking,
  type BookingStatus,
} from "@/lib/bookings";
import { getCapacity } from "@/lib/settings";
import { FREQUENCY_META, TIER_META } from "../components/Booking/pricing";
import {
  CalendarClock,
  ArrowRight,
  AlertTriangle,
  CalendarDays,
  TrendingUp,
  Inbox,
  CheckCheck,
  Repeat,
} from "lucide-react";

const pad = (n: number) => String(n).padStart(2, "0");
const ymd = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const WINDOW_SHORT: Record<string, string> = {
  morning: "Morning · 8–11",
  midday: "Midday · 11–2",
  afternoon: "Afternoon · 2–5",
};

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
  const filter = (searchParams?.status as FilterId) ?? "all";

  const allBookings = await listBookings();
  const stats = await bookingStats();
  const capacity = await getCapacity();
  const todayISO = ymd(new Date());

  const filtered =
    filter === "all"
      ? allBookings
      : filter === "recurring"
      ? allBookings.filter((b) => b.frequency !== "onetime")
      : allBookings.filter((b) => b.status === (filter as BookingStatus));

  const todayJobs = allBookings.filter(
    (b) => b.slotDate === todayISO && b.status !== "cancelled",
  );
  const byWindow: Record<string, Booking[]> = { morning: [], midday: [], afternoon: [] };
  for (const b of todayJobs) byWindow[b.slotWindow]?.push(b);
  const bookedOutToday = (["morning", "midday", "afternoon"] as const).filter(
    (w) => byWindow[w].length >= capacity,
  ).length;

  const newJobs = allBookings.filter((b) => b.status === "new");
  const upcoming = allBookings
    .filter(
      (b) =>
        (b.status === "confirmed" || b.status === "scheduled") && b.slotDate >= todayISO,
    )
    .sort((a, b) => a.slotDate.localeCompare(b.slotDate));

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 py-10">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-ink-600 font-semibold">
            Operations
          </div>
          <h1 className="mt-2 font-display font-extrabold text-3xl sm:text-4xl text-ink-950 tracking-tight">
            Your day at a glance
          </h1>
          <p className="mt-1 text-sm text-ink-700">
            Today&apos;s jobs, what needs action, and what&apos;s coming up.
          </p>
        </div>
        <Link
          href="/admin/calendar"
          className="inline-flex items-center gap-1.5 rounded-xl bg-ink-950 hover:bg-ink-800 text-white text-sm font-semibold px-4 py-2.5 cursor-pointer transition-colors"
        >
          <CalendarDays className="h-4 w-4" /> Open calendar
        </Link>
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

      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat icon={Inbox} label="New, pending" value={stats.newCount} tone="amber" />
        <Stat icon={CalendarClock} label="Booked today" value={stats.todayCount} tone="ink" />
        <Stat
          icon={AlertTriangle}
          label="Booked-out windows today"
          value={`${bookedOutToday}/3`}
          tone={bookedOutToday > 0 ? "amber" : "grass"}
        />
        <Stat
          icon={TrendingUp}
          label="This week revenue"
          value={`$${stats.weekRevenue.toLocaleString()}`}
          tone="grass"
        />
      </div>

      <div className="mt-10 flex items-center gap-2 overflow-x-auto scrollbar-none">
        {FILTERS.map((f) => {
          const active = filter === f.id;
          return (
            <Link
              key={f.id}
              href={f.id === "all" ? "/admin" : `/admin?status=${f.id}`}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                active
                  ? "bg-ink-950 text-[var(--surface)]"
                  : "bg-[var(--surface-elevated)] border border-line text-ink-700 hover:text-ink-950 hover:border-ink-300"
              }`}
            >
              {f.label}
            </Link>
          );
        })}
      </div>

      {filter !== "all" ? (
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
      ) : (
        <div className="mt-8 space-y-10">
          <section>
            <SectionHead
              title="Today"
              count={todayJobs.length}
              sub={`${capacity} ${capacity === 1 ? "cleaner" : "cleaners"} · up to ${capacity} per window`}
            />
            {todayJobs.length === 0 ? (
              <p className="mt-3 text-sm text-ink-600">No jobs scheduled today.</p>
            ) : (
              <div className="mt-4 grid lg:grid-cols-3 gap-5">
                {(["morning", "midday", "afternoon"] as const).map((w) => (
                  <div key={w}>
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-wider font-semibold text-ink-700 mb-2">
                      <span>{WINDOW_SHORT[w]}</span>
                      <span
                        className={
                          byWindow[w].length >= capacity ? "text-red-600" : "text-ink-500"
                        }
                      >
                        {byWindow[w].length}/{capacity}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {byWindow[w].length === 0 ? (
                        <li className="text-xs text-ink-500 italic">Open</li>
                      ) : (
                        byWindow[w].map((b) => <CompactRow key={b.id} booking={b} />)
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </section>

          {newJobs.length > 0 && (
            <section>
              <SectionHead title="New — needs action" count={newJobs.length} />
              <ul className="mt-4 grid gap-3">
                {newJobs.slice(0, 8).map((b) => (
                  <BookingRow key={b.id} booking={b} />
                ))}
              </ul>
              {newJobs.length > 8 && <ViewAll status="new" />}
            </section>
          )}

          <section>
            <SectionHead title="Upcoming" count={upcoming.length} />
            {upcoming.length === 0 ? (
              <p className="mt-3 text-sm text-ink-600">Nothing scheduled yet.</p>
            ) : (
              <ul className="mt-4 grid gap-3">
                {upcoming.slice(0, 8).map((b) => (
                  <BookingRow key={b.id} booking={b} />
                ))}
              </ul>
            )}
            {upcoming.length > 8 && <ViewAll status="scheduled" />}
          </section>
        </div>
      )}
    </div>
  );
}

function SectionHead({ title, count, sub }: { title: string; count: number; sub?: string }) {
  return (
    <div className="flex items-end justify-between gap-3 flex-wrap">
      <div className="flex items-center gap-2.5">
        <h2 className="font-display font-extrabold text-xl text-ink-950">{title}</h2>
        <span className="inline-flex items-center rounded-full bg-ink-100 text-ink-700 text-xs font-bold px-2 py-0.5 tabular-nums">
          {count}
        </span>
      </div>
      {sub && <span className="text-xs text-ink-600">{sub}</span>}
    </div>
  );
}

function CompactRow({ booking }: { booking: Booking }) {
  const meta = STATUS_META[booking.status];
  return (
    <li>
      <Link
        href={`/admin/${booking.id}`}
        className="flex items-center gap-2 rounded-xl bg-white ring-1 ring-line hover:ring-ink-300 px-3 py-2 cursor-pointer transition-all"
      >
        <StatusDot tone={meta.tone} />
        <span className="font-mono text-[11px] font-bold text-ink-950">
          {booking.id.replace("SP-", "")}
        </span>
        <span className="text-xs text-ink-700 truncate flex-1 min-w-0">{booking.address}</span>
        {booking.assignedTo && (
          <span className="hidden sm:inline text-[10px] text-ink-500 truncate max-w-[5rem]">
            {booking.assignedTo}
          </span>
        )}
        <span className="text-xs font-semibold text-ink-950 tabular-nums">
          ${booking.priceTotal}
        </span>
      </Link>
    </li>
  );
}

function ViewAll({ status }: { status: string }) {
  return (
    <Link
      href={`/admin?status=${status}`}
      className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-ink-700 hover:text-ink-950 cursor-pointer"
    >
      View all <ArrowRight className="h-3.5 w-3.5" />
    </Link>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Inbox;
  label: string;
  value: string | number;
  tone: "ink" | "grass" | "amber";
}) {
  const ring = {
    ink: "ring-line",
    grass: "ring-grass-500/30",
    amber: "ring-[oklch(0.8_0.1_75)]",
  }[tone];
  const iconBg = {
    ink: "bg-ink-100 text-ink-800",
    grass: "bg-grass-500/15 text-grass-700",
    amber: "bg-[oklch(0.95_0.08_75)] text-[oklch(0.55_0.16_70)]",
  }[tone];
  return (
    <div className={`rounded-2xl bg-white ring-1 ${ring} px-5 py-4 shadow-soft`}>
      <div className="flex items-center justify-between">
        <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${iconBg}`}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-3 font-display font-extrabold text-3xl text-ink-950 tabular-nums">
        {value}
      </div>
      <div className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-ink-700">
        {label}
      </div>
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
  const win = {
    morning: "AM",
    midday: "Mid",
    afternoon: "PM",
  }[booking.slotWindow];
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
        className="group block rounded-2xl bg-white ring-1 ring-line hover:ring-ink-300 hover:shadow-card transition-all px-5 py-4 cursor-pointer"
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

        <div className="mt-2 text-[11px] text-ink-faint">
          Received {created}
        </div>
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
