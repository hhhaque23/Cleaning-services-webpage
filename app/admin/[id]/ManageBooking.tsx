"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { User, CalendarClock, Pencil, Check } from "lucide-react";
import {
  computePrice,
  TIER_META,
  ADDON_META,
  FREQUENCY_META,
  type AddOn,
  type Frequency,
  type Tier,
} from "../../components/Booking/pricing";
import type { Booking } from "@/lib/booking-types";

const WINDOWS = [
  { id: "morning" as const, label: "Morning", range: "8–11 AM" },
  { id: "midday" as const, label: "Midday", range: "11 AM–2 PM" },
  { id: "afternoon" as const, label: "Afternoon", range: "2–5 PM" },
];
type Win = "morning" | "midday" | "afternoon";

const pad = (n: number) => String(n).padStart(2, "0");
const ymd = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
function nextDates(n: number) {
  const out: Date[] = [];
  const d = new Date();
  for (let i = 0; i < n; i++) out.push(new Date(d.getFullYear(), d.getMonth(), d.getDate() + i));
  return out;
}

type PutFn = (patch: Record<string, unknown>) => Promise<boolean>;

export function ManageBooking({ booking, cleaners }: { booking: Booking; cleaners: string[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const put = useCallback<PutFn>(
    async (patch) => {
      setBusy(true);
      setMsg(null);
      try {
        const res = await fetch(`/api/bookings/${booking.id}`, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(patch),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Save failed");
        setMsg({ ok: true, text: "Saved" });
        router.refresh();
        return true;
      } catch (e) {
        setMsg({ ok: false, text: e instanceof Error ? e.message : "Save failed" });
        return false;
      } finally {
        setBusy(false);
      }
    },
    [booking.id, router],
  );

  return (
    <section className="rounded-2xl bg-white ring-1 ring-line shadow-soft p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-base text-ink-950">Manage booking</h2>
        {msg && (
          <span
            className={`inline-flex items-center gap-1 text-xs font-medium ${
              msg.ok ? "text-grass-700" : "text-red-600"
            }`}
          >
            {msg.ok && <Check className="h-3.5 w-3.5" />}
            {msg.text}
          </span>
        )}
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold text-ink-700 mb-1.5">
          <User className="h-3.5 w-3.5" /> Assigned cleaner
        </label>
        <select
          defaultValue={booking.assignedTo ?? ""}
          disabled={busy}
          onChange={(e) => put({ assignedTo: e.target.value || null })}
          className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink-950 outline-none focus:border-ink-500 cursor-pointer disabled:opacity-60"
        >
          <option value="">Unassigned</option>
          {cleaners.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <Reschedule booking={booking} put={put} busy={busy} />
      <EditDetails booking={booking} put={put} busy={busy} />
    </section>
  );
}

function Reschedule({ booking, put, busy }: { booking: Booking; put: PutFn; busy: boolean }) {
  const dates = useMemo(() => nextDates(14), []);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(booking.slotDate);
  const [win, setWin] = useState<Win>(booking.slotWindow as Win);
  const [byDate, setByDate] = useState<Record<string, Record<Win, number>>>({});
  const [loadErr, setLoadErr] = useState(false);

  const loadAvail = useCallback(() => {
    setLoadErr(false);
    fetch(`/api/availability?start=${ymd(new Date())}&days=14&exclude=${booking.id}`)
      .then((r) => {
        if (!r.ok) throw new Error("bad");
        return r.json();
      })
      .then((d) => {
        const map: Record<string, Record<Win, number>> = {};
        for (const day of d.days as { date: string; windows: Record<Win, { open: number }> }[]) {
          map[day.date] = {
            morning: day.windows.morning.open,
            midday: day.windows.midday.open,
            afternoon: day.windows.afternoon.open,
          };
        }
        setByDate(map);
      })
      .catch(() => setLoadErr(true));
  }, [booking.id]);

  useEffect(() => {
    if (open) loadAvail();
  }, [open, loadAvail]);

  const openFor = (dt: string, w: Win) =>
    byDate[dt]?.[w] ?? (dt === booking.slotDate && w === booking.slotWindow ? 1 : 0);
  const changed = date !== booking.slotDate || win !== booking.slotWindow;

  return (
    <div className="border-t border-line pt-5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-[11px] uppercase tracking-wider font-semibold text-ink-700 cursor-pointer"
      >
        <span className="flex items-center gap-1.5">
          <CalendarClock className="h-3.5 w-3.5" /> Reschedule
        </span>
        <span className="text-ink-600 normal-case tracking-normal font-medium">
          {open ? "Hide" : "Change date/time"}
        </span>
      </button>
      {open && (
        <div className="mt-3 space-y-3">
          {loadErr && (
            <div className="flex items-center justify-between gap-2 rounded-lg bg-[oklch(0.96_0.04_25)] text-[oklch(0.42_0.18_25)] text-xs px-2.5 py-2">
              <span>Couldn&apos;t load availability.</span>
              <button
                type="button"
                onClick={loadAvail}
                className="font-semibold underline cursor-pointer"
              >
                Retry
              </button>
            </div>
          )}
          <div className="grid grid-cols-7 gap-1.5">
            {dates.map((d) => {
              const iso = ymd(d);
              const active = date === iso;
              const dayOpen = WINDOWS.reduce((s, w) => s + openFor(iso, w.id), 0);
              const full = dayOpen === 0;
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={full}
                  onClick={() => {
                    setDate(iso);
                    const w = WINDOWS.find((w) => openFor(iso, w.id) > 0)?.id;
                    if (w) setWin(w);
                  }}
                  className={`rounded-lg px-1 py-1.5 text-center text-[11px] transition-colors ${
                    active
                      ? "bg-ink-950 text-white"
                      : full
                      ? "bg-[var(--surface)] text-ink-400 cursor-not-allowed"
                      : "bg-[var(--surface)] ring-1 ring-line hover:ring-ink-300 cursor-pointer"
                  }`}
                >
                  <div className="font-semibold">
                    {d.toLocaleDateString("en-US", { weekday: "short" }).slice(0, 2)}
                  </div>
                  <div className="font-display font-bold tabular-nums">{d.getDate()}</div>
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {WINDOWS.map((w) => {
              const left = openFor(date, w.id);
              const active = win === w.id;
              const disabled = left === 0;
              return (
                <button
                  key={w.id}
                  type="button"
                  disabled={disabled}
                  onClick={() => setWin(w.id)}
                  className={`rounded-lg px-2 py-2 text-left transition-all ${
                    active
                      ? "bg-grass-500/12 ring-2 ring-grass-500"
                      : "bg-[var(--surface)] ring-1 ring-line hover:ring-ink-300"
                  } ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div className="text-xs font-semibold text-ink-950">{w.label}</div>
                  <div className={`text-[10px] ${disabled ? "text-red-600" : "text-ink-600"}`}>
                    {disabled ? "Full" : `${left} open`}
                  </div>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            disabled={busy || !changed}
            onClick={() => put({ slotDate: date, slotWindow: win })}
            className="w-full rounded-xl bg-ink-950 hover:bg-ink-800 disabled:bg-ink-300 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 cursor-pointer transition-colors"
          >
            {changed ? "Save new time" : "No change yet"}
          </button>
        </div>
      )}
    </div>
  );
}

const numField =
  "w-full rounded-lg border border-line bg-white px-2.5 py-2 text-sm text-ink-950 outline-none focus:border-ink-500";

function EditDetails({ booking, put, busy }: { booking: Booking; put: PutFn; busy: boolean }) {
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({
    address: booking.address,
    apt: booking.apt ?? "",
    notes: booking.notes ?? "",
    tier: booking.tier as Tier,
    bedrooms: booking.bedrooms,
    bathrooms: booking.bathrooms,
    floors: booking.floors,
    sqft: booking.sqft,
    frequency: booking.frequency as Frequency,
    addOns: booking.addOns as AddOn[],
  });

  const price = computePrice({
    tier: f.tier,
    bedrooms: f.bedrooms,
    bathrooms: f.bathrooms,
    sqft: f.sqft,
    floors: f.floors,
    frequency: f.frequency,
    addOns: f.addOns,
  });

  const toggleAddon = (a: AddOn) =>
    setF((s) => ({
      ...s,
      addOns: s.addOns.includes(a) ? s.addOns.filter((x) => x !== a) : [...s.addOns, a],
    }));

  return (
    <div className="border-t border-line pt-5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-[11px] uppercase tracking-wider font-semibold text-ink-700 cursor-pointer"
      >
        <span className="flex items-center gap-1.5">
          <Pencil className="h-3.5 w-3.5" /> Edit details
        </span>
        <span className="text-ink-600 normal-case tracking-normal font-medium">
          {open ? "Hide" : "Edit"}
        </span>
      </button>
      {open && (
        <div className="mt-3 space-y-3">
          <input
            value={f.address}
            onChange={(e) => setF({ ...f, address: e.target.value })}
            placeholder="Address"
            className={numField}
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              value={f.apt}
              onChange={(e) => setF({ ...f, apt: e.target.value })}
              placeholder="Apt / unit"
              className={numField}
            />
            <select
              value={f.tier}
              onChange={(e) => setF({ ...f, tier: e.target.value as Tier })}
              className={`${numField} cursor-pointer`}
            >
              {(Object.keys(TIER_META) as Tier[]).map((t) => (
                <option key={t} value={t}>
                  {TIER_META[t].label}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <label className="text-[10px] uppercase font-semibold text-ink-600">
              Beds
              <input
                type="number"
                min={0}
                max={8}
                value={f.bedrooms}
                onChange={(e) => setF({ ...f, bedrooms: Number(e.target.value) })}
                className={`${numField} mt-0.5`}
              />
            </label>
            <label className="text-[10px] uppercase font-semibold text-ink-600">
              Baths
              <input
                type="number"
                min={1}
                max={6}
                value={f.bathrooms}
                onChange={(e) => setF({ ...f, bathrooms: Number(e.target.value) })}
                className={`${numField} mt-0.5`}
              />
            </label>
            <label className="text-[10px] uppercase font-semibold text-ink-600">
              Floors
              <input
                type="number"
                min={1}
                max={4}
                value={f.floors}
                onChange={(e) => setF({ ...f, floors: Number(e.target.value) })}
                className={`${numField} mt-0.5`}
              />
            </label>
            <label className="text-[10px] uppercase font-semibold text-ink-600">
              Sq ft
              <input
                type="number"
                min={300}
                step={100}
                value={f.sqft}
                onChange={(e) => setF({ ...f, sqft: Number(e.target.value) })}
                className={`${numField} mt-0.5`}
              />
            </label>
          </div>
          <select
            value={f.frequency}
            onChange={(e) => setF({ ...f, frequency: e.target.value as Frequency })}
            className={`${numField} cursor-pointer`}
          >
            {(Object.keys(FREQUENCY_META) as Frequency[]).map((fr) => (
              <option key={fr} value={fr}>
                {FREQUENCY_META[fr].label}
              </option>
            ))}
          </select>
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(ADDON_META) as AddOn[]).map((a) => {
              const on = f.addOns.includes(a);
              return (
                <button
                  key={a}
                  type="button"
                  onClick={() => toggleAddon(a)}
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-medium ring-1 cursor-pointer transition-colors ${
                    on
                      ? "bg-grass-500/12 ring-grass-500 text-grass-700"
                      : "bg-white ring-line text-ink-700 hover:ring-ink-300"
                  }`}
                >
                  {ADDON_META[a].label}
                </button>
              );
            })}
          </div>
          <textarea
            value={f.notes}
            onChange={(e) => setF({ ...f, notes: e.target.value })}
            placeholder="Notes"
            rows={2}
            className={`${numField} resize-none`}
          />
          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="text-sm text-ink-700">
              New total{" "}
              <span className="font-display font-bold text-ink-950">${price.total}</span>
            </div>
            <button
              type="button"
              disabled={busy}
              onClick={() =>
                put({
                  address: f.address,
                  apt: f.apt,
                  notes: f.notes,
                  tier: f.tier,
                  bedrooms: f.bedrooms,
                  bathrooms: f.bathrooms,
                  floors: f.floors,
                  sqft: f.sqft,
                  frequency: f.frequency,
                  addOns: f.addOns,
                })
              }
              className="rounded-xl bg-ink-950 hover:bg-ink-800 disabled:bg-ink-300 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 cursor-pointer transition-colors"
            >
              Save details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
