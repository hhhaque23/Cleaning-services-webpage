import Link from "next/link";
import { isDbConfigured } from "@/lib/bookings";
import { financialOverview, type Period } from "@/lib/financial";
import { formatUSD } from "@/lib/money";
import { TIER_META } from "../../components/Booking/pricing";
import { RevenueBars } from "./RevenueBars";
import { AlertTriangle, TrendingUp, Clock, Repeat, Percent, XCircle } from "lucide-react";

export const dynamic = "force-dynamic";

const PERIODS: { id: Period; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "week", label: "This week" },
  { id: "month", label: "This month" },
];
const PERIOD_LABEL: Record<Period, string> = {
  today: "today",
  week: "this week",
  month: "this month",
};

type Props = { searchParams: { period?: string } };

export default async function FinancialPage({ searchParams }: Props) {
  const dbReady = isDbConfigured();
  const period: Period = (["today", "week", "month"] as const).includes(
    searchParams?.period as Period,
  )
    ? (searchParams!.period as Period)
    : "week";
  const pl = PERIOD_LABEL[period];

  const data = await financialOverview(period);
  const { summary, monthEarned, tiers, recurring, jobValue, trend } = data;

  const maxTier = Math.max(
    1,
    ...tiers.map((t) => t.earned + t.upcoming),
  );
  const recTotal = recurring.recurring.earned + recurring.recurring.upcoming;
  const oneTotal = recurring.onetime.earned + recurring.onetime.upcoming;
  const splitSum = recTotal + oneTotal;
  const recPct = splitSum ? Math.round((recTotal / splitSum) * 100) : 0;

  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8 py-10">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-ink-600 font-semibold">
            Operations
          </div>
          <h1 className="mt-2 font-display font-extrabold text-3xl sm:text-4xl text-ink-950 tracking-tight">
            Financial
          </h1>
          <p className="mt-1 text-sm text-ink-700">
            Revenue earned vs upcoming, by service, and what each job is worth.
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          {PERIODS.map((p) => {
            const active = period === p.id;
            return (
              <Link
                key={p.id}
                href={`/admin/financial?period=${p.id}`}
                className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                  active
                    ? "bg-ink-950 text-[var(--surface)] shadow-soft"
                    : "bg-[var(--surface-elevated)]/70 text-ink-600 hover:text-ink-950 hover:bg-[var(--surface-elevated)]"
                }`}
              >
                {p.label}
              </Link>
            );
          })}
        </div>
      </div>

      {!dbReady && (
        <div className="mt-6 rounded-2xl border border-[oklch(0.78_0.12_75)] bg-[oklch(0.97_0.05_75)] px-5 py-4 text-sm text-[oklch(0.35_0.12_70)] leading-relaxed">
          <strong className="font-semibold">DATABASE_URL is not set.</strong> These figures
          come from in-memory data and reset on every deploy. Provision Postgres on Railway to
          persist them.
        </div>
      )}

      {/* Section 1 — Earned vs upcoming */}
      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        <StatCard
          accent
          label={`Earned · ${pl}`}
          value={formatUSD(summary.earned)}
          sub={`${summary.jobsEarned} ${summary.jobsEarned === 1 ? "job" : "jobs"} completed`}
          icon={TrendingUp}
        />
        <StatCard
          label={`Upcoming · ${pl}`}
          value={formatUSD(summary.upcoming)}
          sub="Confirmed + scheduled"
          icon={Clock}
          tone="upcoming"
        />
        <StatCard
          label="Earned · this month"
          value={formatUSD(monthEarned)}
          sub="Completed so far"
          icon={TrendingUp}
        />
      </div>

      {summary.awaitingCount > 0 && (
        <Link
          href="/admin?status=new"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-[oklch(0.95_0.08_75)] text-[oklch(0.42_0.16_70)] px-4 py-2 text-sm font-semibold hover:brightness-95 transition cursor-pointer"
        >
          <Clock className="h-4 w-4" />
          {summary.awaitingCount} booking{summary.awaitingCount === 1 ? "" : "s"} awaiting
          confirmation
        </Link>
      )}

      <div className="mt-6 rounded-2xl bg-white ring-1 ring-line shadow-card p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display font-bold text-base text-ink-950">
            Earned vs upcoming
          </h2>
          <span className="text-xs text-ink-600">
            {period === "month" ? "This month, by day" : "This week, by day"}
          </span>
        </div>
        <div className="mt-5">
          <RevenueBars points={trend} />
        </div>
      </div>

      {/* Section 2 — By service & recurring */}
      <div className="mt-10 grid lg:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white ring-1 ring-line shadow-card p-5 sm:p-6">
          <h2 className="font-display font-bold text-base text-ink-950">By service</h2>
          <div className="mt-4 space-y-4">
            {tiers.map((t) => {
              const total = t.earned + t.upcoming;
              return (
                <div key={t.tier}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-semibold text-ink-950">
                      {TIER_META[t.tier].label}
                    </span>
                    <span className="text-sm tabular-nums text-ink-800">
                      {formatUSD(total)}{" "}
                      <span className="text-ink-500 font-normal">
                        · {t.jobs} {t.jobs === 1 ? "job" : "jobs"}
                      </span>
                    </span>
                  </div>
                  <div className="mt-1.5 h-2.5 rounded-full bg-ink-100 overflow-hidden flex">
                    <div
                      className="h-full bg-accent-500"
                      style={{ width: `${(t.earned / maxTier) * 100}%` }}
                    />
                    <div
                      className="h-full bg-accent-300"
                      style={{ width: `${(t.upcoming / maxTier) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
            {tiers.every((t) => t.earned + t.upcoming === 0) && (
              <p className="text-sm text-ink-600">No revenue in this period yet.</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-white ring-1 ring-line shadow-card p-5 sm:p-6">
          <h2 className="font-display font-bold text-base text-ink-950 flex items-center gap-2">
            <Repeat className="h-4 w-4 text-accent-600" /> Recurring vs one-time
          </h2>
          <div className="mt-5">
            <div className="h-3.5 rounded-full bg-ink-100 overflow-hidden flex">
              <div className="h-full bg-accent-500" style={{ width: `${recPct}%` }} />
              <div className="h-full bg-steel-300" style={{ width: `${100 - recPct}%` }} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <SplitStat
                swatch="bg-accent-500"
                label="Recurring"
                pct={recPct}
                value={formatUSD(recTotal)}
                jobs={recurring.recurring.jobs}
              />
              <SplitStat
                swatch="bg-steel-300"
                label="One-time"
                pct={splitSum ? 100 - recPct : 0}
                value={formatUSD(oneTotal)}
                jobs={recurring.onetime.jobs}
              />
            </div>
            <p className="mt-4 text-xs text-ink-600 leading-relaxed">
              Recurring plans lock in repeat revenue — the higher this share, the steadier your
              week-to-week income.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3 — Job value & discounts */}
      <div className="mt-10">
        <h2 className="font-display font-bold text-base text-ink-950">Job value &amp; discounts</h2>
        <div className="mt-4 grid sm:grid-cols-3 gap-4">
          <StatCard
            label="Avg job value"
            value={formatUSD(jobValue.avgJobValue)}
            sub="Per completed job"
            icon={TrendingUp}
          />
          <StatCard
            label="Discounts given"
            value={formatUSD(jobValue.totalDiscounts)}
            sub="Recurring savings"
            icon={Percent}
          />
          <StatCard
            label="Lost to cancellations"
            value={formatUSD(jobValue.lostToCancellations)}
            sub="Cancelled bookings"
            icon={XCircle}
            tone="warn"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent,
  tone,
}: {
  label: string;
  value: string;
  sub: string;
  icon: typeof TrendingUp;
  accent?: boolean;
  tone?: "upcoming" | "warn";
}) {
  const iconCls = accent
    ? "bg-accent-500/15 text-accent-700"
    : tone === "warn"
    ? "bg-[oklch(0.95_0.08_75)] text-[oklch(0.5_0.16_70)]"
    : tone === "upcoming"
    ? "bg-accent-300/25 text-accent-600"
    : "bg-ink-100 text-ink-700";
  return (
    <div
      className={`rounded-2xl bg-white px-5 py-5 shadow-card ring-1 ${
        accent ? "ring-accent-500/30" : "ring-line"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-600">
          {label}
        </span>
        <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${iconCls}`}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-3 font-display font-extrabold text-3xl text-ink-950 tabular-nums">
        {value}
      </div>
      <div className="mt-0.5 text-xs text-ink-600">{sub}</div>
    </div>
  );
}

function SplitStat({
  swatch,
  label,
  pct,
  value,
  jobs,
}: {
  swatch: string;
  label: string;
  pct: number;
  value: string;
  jobs: number;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-xs font-semibold text-ink-700">
        <span className={`inline-block h-2.5 w-2.5 rounded-sm ${swatch}`} />
        {label}
        <span className="text-ink-500 font-normal tabular-nums">{pct}%</span>
      </div>
      <div className="mt-1 font-display font-bold text-lg text-ink-950 tabular-nums">{value}</div>
      <div className="text-[11px] text-ink-500 tabular-nums">
        {jobs} {jobs === 1 ? "job" : "jobs"}
      </div>
    </div>
  );
}
