// Financial metrics for the ops Financial tab. Pure functions over a prefetched
// Booking[] (one listBookings() per page load), so they're storage-agnostic
// (work the same against Postgres or the in-memory fallback).
//
// Definitions:
//   earned   = status 'completed'              (revenue realized)
//   upcoming = status 'confirmed' | 'scheduled' (pipeline)
//   'new'    = awaiting confirmation — a COUNT, never revenue
//   cancelled = lost revenue
// Everything buckets by slotDate (the SERVICE date), so the numbers line up with
// the calendar.

import { listBookings, type Booking } from "./bookings";
import { businessToday } from "./dates";

export type Period = "today" | "week" | "month";
export type Tier = Booking["tier"];

export type RevenueSummary = {
  earned: number;
  upcoming: number;
  awaitingCount: number;
  jobsEarned: number;
};
export type TierRow = { tier: Tier; earned: number; upcoming: number; jobs: number };
export type Bucket = { earned: number; upcoming: number; jobs: number };
export type RecurringSplit = { recurring: Bucket; onetime: Bucket };
export type JobValueStats = {
  avgJobValue: number;
  totalDiscounts: number;
  lostToCancellations: number;
};
export type TrendPoint = { date: string; label: string; earned: number; upcoming: number };

export type FinancialOverview = {
  period: Period;
  range: { start: string; end: string };
  summary: RevenueSummary;
  monthEarned: number;
  tiers: TierRow[];
  recurring: RecurringSplit;
  jobValue: JobValueStats;
  trend: TrendPoint[];
};

// --- Date helpers: UTC math on YYYY-MM-DD so day/month offsets are DST-proof.
// The anchor (businessToday) is already in the business timezone; here we only
// do calendar arithmetic on that fixed string.
function parseISO(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}
function fmtISO(dt: Date): string {
  return dt.toISOString().slice(0, 10);
}
function addDays(iso: string, n: number): string {
  const dt = parseISO(iso);
  dt.setUTCDate(dt.getUTCDate() + n);
  return fmtISO(dt);
}
function weekRange(todayISO: string): { start: string; end: string } {
  const dow = parseISO(todayISO).getUTCDay(); // 0=Sun..6=Sat
  const sinceMonday = (dow + 6) % 7;
  const start = addDays(todayISO, -sinceMonday);
  return { start, end: addDays(start, 6) };
}
function monthRange(todayISO: string): { start: string; end: string } {
  const [y, m] = todayISO.split("-").map(Number);
  const mm = String(m).padStart(2, "0");
  const lastDay = new Date(Date.UTC(y, m, 0)).getUTCDate();
  return { start: `${y}-${mm}-01`, end: `${y}-${mm}-${String(lastDay).padStart(2, "0")}` };
}
export function rangeFor(period: Period, todayISO: string): { start: string; end: string } {
  if (period === "today") return { start: todayISO, end: todayISO };
  if (period === "week") return weekRange(todayISO);
  return monthRange(todayISO);
}

const inWin = (b: Booking, start: string, end: string) =>
  b.slotDate >= start && b.slotDate <= end;
const isEarned = (b: Booking) => b.status === "completed";
const isUpcoming = (b: Booking) => b.status === "confirmed" || b.status === "scheduled";

export function revenueSummary(all: Booking[], start: string, end: string): RevenueSummary {
  let earned = 0,
    upcoming = 0,
    awaitingCount = 0,
    jobsEarned = 0;
  for (const b of all) {
    if (!inWin(b, start, end)) continue;
    if (isEarned(b)) {
      earned += b.priceTotal;
      jobsEarned++;
    } else if (isUpcoming(b)) {
      upcoming += b.priceTotal;
    } else if (b.status === "new") {
      awaitingCount++;
    }
  }
  return { earned, upcoming, awaitingCount, jobsEarned };
}

export function tierBreakdown(all: Booking[], start: string, end: string): TierRow[] {
  const order: Tier[] = ["Standard", "Deep", "MoveInOut"];
  return order.map((tier) => {
    let earned = 0,
      upcoming = 0,
      jobs = 0;
    for (const b of all) {
      if (b.tier !== tier || !inWin(b, start, end)) continue;
      if (isEarned(b)) {
        earned += b.priceTotal;
        jobs++;
      } else if (isUpcoming(b)) {
        upcoming += b.priceTotal;
        jobs++;
      }
    }
    return { tier, earned, upcoming, jobs };
  });
}

export function recurringSplit(all: Booking[], start: string, end: string): RecurringSplit {
  const mk = (): Bucket => ({ earned: 0, upcoming: 0, jobs: 0 });
  const recurring = mk();
  const onetime = mk();
  for (const b of all) {
    if (!inWin(b, start, end)) continue;
    const bucket = b.frequency !== "onetime" ? recurring : onetime;
    if (isEarned(b)) {
      bucket.earned += b.priceTotal;
      bucket.jobs++;
    } else if (isUpcoming(b)) {
      bucket.upcoming += b.priceTotal;
      bucket.jobs++;
    }
  }
  return { recurring, onetime };
}

export function jobValueStats(all: Booking[], start: string, end: string): JobValueStats {
  let earnedSum = 0,
    jobs = 0,
    totalDiscounts = 0,
    lost = 0;
  for (const b of all) {
    if (!inWin(b, start, end)) continue;
    if (isEarned(b)) {
      earnedSum += b.priceTotal;
      jobs++;
    }
    if (b.status !== "cancelled") totalDiscounts += b.priceDiscount;
    if (b.status === "cancelled") lost += b.priceTotal;
  }
  return {
    avgJobValue: jobs ? Math.round(earnedSum / jobs) : 0,
    totalDiscounts,
    lostToCancellations: lost,
  };
}

// Trend always spans a useful window: the current week for today/week, the full
// month for month — so the chart never collapses to a single bar.
export function trendSeries(all: Booking[], period: Period, todayISO: string): TrendPoint[] {
  const { start, end } = period === "month" ? monthRange(todayISO) : weekRange(todayISO);
  const map: Record<string, { earned: number; upcoming: number }> = {};
  const days: string[] = [];
  for (let cur = start; cur <= end; cur = addDays(cur, 1)) {
    days.push(cur);
    map[cur] = { earned: 0, upcoming: 0 };
  }
  for (const b of all) {
    const slot = map[b.slotDate];
    if (!slot) continue;
    if (isEarned(b)) slot.earned += b.priceTotal;
    else if (isUpcoming(b)) slot.upcoming += b.priceTotal;
  }
  return days.map((d) => {
    const [, m, day] = d.split("-");
    return {
      date: d,
      label: `${Number(m)}/${Number(day)}`,
      earned: map[d].earned,
      upcoming: map[d].upcoming,
    };
  });
}

export async function financialOverview(period: Period): Promise<FinancialOverview> {
  const all = await listBookings();
  const todayISO = businessToday();
  const { start, end } = rangeFor(period, todayISO);
  const month = monthRange(todayISO);
  return {
    period,
    range: { start, end },
    summary: revenueSummary(all, start, end),
    monthEarned: revenueSummary(all, month.start, month.end).earned,
    tiers: tierBreakdown(all, start, end),
    recurring: recurringSplit(all, start, end),
    jobValue: jobValueStats(all, start, end),
    trend: trendSeries(all, period, todayISO),
  };
}
