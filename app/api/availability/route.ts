import { NextResponse } from "next/server";
import { getBooking, slotUsage, type SlotWindow } from "@/lib/bookings";
import { getCapacity } from "@/lib/settings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOWS: SlotWindow[] = ["morning", "midday", "afternoon"];

const pad = (n: number) => String(n).padStart(2, "0");
// Local calendar date (NOT toISOString — that shifts to UTC and can be off-by-one).
const fmt = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
function addDaysISO(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + days);
  return fmt(dt);
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const startParam = url.searchParams.get("start");
  const start =
    startParam && /^\d{4}-\d{2}-\d{2}$/.test(startParam) ? startParam : fmt(new Date());
  const daysRaw = Number(url.searchParams.get("days") ?? 7);
  const days = Math.min(14, Math.max(1, Number.isFinite(daysRaw) ? Math.floor(daysRaw) : 7));
  const exclude = url.searchParams.get("exclude") || undefined;

  const dates: string[] = [];
  for (let i = 0; i < days; i++) dates.push(addDaysISO(start, i));

  const capacity = await getCapacity();
  const usage = await slotUsage(dates);

  // Ops reschedule: let a booking re-pick its own current slot by subtracting it.
  if (exclude) {
    const b = await getBooking(exclude);
    if (b && b.status !== "cancelled" && usage[b.slotDate]) {
      const win = b.slotWindow as SlotWindow;
      usage[b.slotDate][win] = Math.max(0, (usage[b.slotDate][win] ?? 0) - 1);
    }
  }

  const out = dates.map((date) => {
    const w = usage[date] ?? { morning: 0, midday: 0, afternoon: 0 };
    const windows: Record<string, { booked: number; capacity: number; open: number }> = {};
    for (const win of WINDOWS) {
      const booked = w[win] ?? 0;
      windows[win] = { booked, capacity, open: Math.max(0, capacity - booked) };
    }
    return { date, windows };
  });

  return NextResponse.json({ capacity, windows: WINDOWS, days: out });
}
