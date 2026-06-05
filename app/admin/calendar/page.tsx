import {
  listBookingsInRange,
  type Booking,
  type BookingStatus,
} from "@/lib/bookings";
import { getCapacity } from "@/lib/settings";
import { TIER_META, FREQUENCY_META } from "../../components/Booking/pricing";
import { CalendarGrid } from "./CalendarGrid";

export const dynamic = "force-dynamic";

const WINDOWS = [
  { id: "morning" as const, label: "Morning", range: "8–11 AM" },
  { id: "midday" as const, label: "Midday", range: "11 AM–2 PM" },
  { id: "afternoon" as const, label: "Afternoon", range: "2–5 PM" },
];

const pad = (n: number) => String(n).padStart(2, "0");
const fmt = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseISO = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const addDays = (d: Date, n: number) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};
function mondayOf(d: Date) {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const off = (x.getDay() + 6) % 7; // 0 = Monday
  x.setDate(x.getDate() - off);
  return x;
}

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: { week?: string };
}) {
  const wk = searchParams?.week;
  const base = wk && /^\d{4}-\d{2}-\d{2}$/.test(wk) ? parseISO(wk) : new Date();
  const monday = mondayOf(base);
  const days = Array.from({ length: 7 }, (_, i) => addDays(monday, i));
  const startISO = fmt(days[0]);
  const endISO = fmt(days[6]);
  const todayISO = fmt(new Date());

  const [bookings, capacity] = await Promise.all([
    listBookingsInRange(startISO, endISO),
    getCapacity(),
  ]);

  const byKey: Record<string, Booking[]> = {};
  for (const b of bookings) (byKey[`${b.slotDate}|${b.slotWindow}`] ??= []).push(b);

  const week = days.map((d) => {
    const date = fmt(d);
    const cells = WINDOWS.map((win) => {
      const jobs = byKey[`${date}|${win.id}`] ?? [];
      const active = jobs.filter((j) => j.status !== "cancelled");
      return {
        window: win.id,
        booked: active.length,
        open: Math.max(0, capacity - active.length),
        jobs: jobs
          .slice()
          .sort(
            (a, b2) =>
              (a.status === "cancelled" ? 1 : 0) - (b2.status === "cancelled" ? 1 : 0),
          )
          .map((b) => ({
            id: b.id,
            address: b.address,
            apt: b.apt,
            tierLabel: TIER_META[b.tier].label,
            freqLabel: FREQUENCY_META[b.frequency].label,
            priceTotal: b.priceTotal,
            status: b.status as BookingStatus,
            assignedTo: b.assignedTo,
            bedrooms: b.bedrooms,
            bathrooms: b.bathrooms,
          })),
      };
    });
    return {
      date,
      weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
      dayNum: d.getDate(),
      isToday: date === todayISO,
      cells,
    };
  });

  const monthLabel = `${days[0].toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  })} – ${days[6].toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })}`;

  return (
    <CalendarGrid
      week={week}
      capacity={capacity}
      windows={WINDOWS}
      monthLabel={monthLabel}
      prevWeek={fmt(addDays(monday, -7))}
      nextWeek={fmt(addDays(monday, 7))}
      thisWeek={fmt(mondayOf(new Date()))}
    />
  );
}
