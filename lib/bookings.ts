import postgres from "postgres";
import type { Booking, BookingStatus, NewBooking } from "./booking-types";

export type { Booking, BookingStatus, NewBooking } from "./booking-types";
export { STATUS_FLOW, STATUS_META } from "./booking-types";

// ---- Storage layer ----

const DATABASE_URL = process.env.DATABASE_URL;

let sql: ReturnType<typeof postgres> | null = null;
let schemaReady: Promise<void> | null = null;

function getSql() {
  if (!DATABASE_URL) return null;
  if (!sql) sql = postgres(DATABASE_URL, { prepare: false, max: 5 });
  return sql;
}

async function ensureSchema() {
  const client = getSql();
  if (!client) return;
  if (!schemaReady) {
    schemaReady = client`
      CREATE TABLE IF NOT EXISTS bookings (
        id TEXT PRIMARY KEY,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        status TEXT NOT NULL DEFAULT 'new',
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        address TEXT NOT NULL,
        apt TEXT,
        notes TEXT,
        tier TEXT NOT NULL,
        bedrooms INT NOT NULL,
        bathrooms INT NOT NULL,
        sqft INT NOT NULL,
        floors INT NOT NULL DEFAULT 1,
        frequency TEXT NOT NULL,
        add_ons TEXT[] NOT NULL DEFAULT '{}',
        slot_date DATE NOT NULL,
        slot_window TEXT NOT NULL,
        price_subtotal INT NOT NULL,
        price_discount INT NOT NULL,
        price_total INT NOT NULL,
        assigned_to TEXT
      )
    `
      .then(() =>
        client`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS floors INT NOT NULL DEFAULT 1`
      )
      .then(() => undefined);
  }
  return schemaReady;
}

// In-memory fallback (dev / local preview without DATABASE_URL).
// Stashed on globalThis so the singleton survives Next.js module duplication
// across route bundles. Lost on every server restart, by design.
const globalRef = globalThis as unknown as {
  __spectreBookings?: Map<string, Booking>;
};
const memory: Map<string, Booking> =
  globalRef.__spectreBookings ?? new Map<string, Booking>();
globalRef.__spectreBookings = memory;

function makeId() {
  const chars = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
  let s = "";
  for (let i = 0; i < 6; i++)
    s += chars[Math.floor(Math.random() * chars.length)];
  return `SP-${s}`;
}

function rowToBooking(r: Record<string, unknown>): Booking {
  return {
    id: r.id as string,
    createdAt: (r.created_at as Date).toISOString(),
    status: r.status as BookingStatus,
    email: r.email as string,
    phone: r.phone as string,
    address: r.address as string,
    apt: (r.apt as string | null) ?? null,
    notes: (r.notes as string | null) ?? null,
    tier: r.tier as Booking["tier"],
    bedrooms: r.bedrooms as number,
    bathrooms: r.bathrooms as number,
    sqft: r.sqft as number,
    floors: (r.floors as number) ?? 1,
    frequency: r.frequency as Booking["frequency"],
    addOns: (r.add_ons as string[]) ?? [],
    slotDate:
      r.slot_date instanceof Date
        ? r.slot_date.toISOString().slice(0, 10)
        : (r.slot_date as string),
    slotWindow: r.slot_window as Booking["slotWindow"],
    priceSubtotal: r.price_subtotal as number,
    priceDiscount: r.price_discount as number,
    priceTotal: r.price_total as number,
    assignedTo: (r.assigned_to as string | null) ?? null,
  };
}

export async function createBooking(input: NewBooking): Promise<Booking> {
  const id = makeId();
  const client = getSql();
  if (client) {
    await ensureSchema();
    const rows = await client`
      INSERT INTO bookings (
        id, email, phone, address, apt, notes, tier,
        bedrooms, bathrooms, sqft, floors, frequency, add_ons,
        slot_date, slot_window, price_subtotal, price_discount, price_total
      ) VALUES (
        ${id}, ${input.email}, ${input.phone}, ${input.address},
        ${input.apt}, ${input.notes}, ${input.tier},
        ${input.bedrooms}, ${input.bathrooms}, ${input.sqft}, ${input.floors},
        ${input.frequency}, ${input.addOns},
        ${input.slotDate}, ${input.slotWindow},
        ${input.priceSubtotal}, ${input.priceDiscount}, ${input.priceTotal}
      )
      RETURNING *
    `;
    return rowToBooking(rows[0]);
  }
  const booking: Booking = {
    id,
    createdAt: new Date().toISOString(),
    status: "new",
    assignedTo: null,
    ...input,
  };
  memory.set(id, booking);
  return booking;
}

export async function getBooking(id: string): Promise<Booking | null> {
  const client = getSql();
  if (client) {
    await ensureSchema();
    const rows = await client`SELECT * FROM bookings WHERE id = ${id} LIMIT 1`;
    return rows[0] ? rowToBooking(rows[0]) : null;
  }
  return memory.get(id) ?? null;
}

export async function listBookings(opts?: {
  status?: BookingStatus;
}): Promise<Booking[]> {
  const client = getSql();
  if (client) {
    await ensureSchema();
    const rows = opts?.status
      ? await client`SELECT * FROM bookings WHERE status = ${opts.status} ORDER BY created_at DESC`
      : await client`SELECT * FROM bookings ORDER BY created_at DESC`;
    return rows.map(rowToBooking);
  }
  const all = Array.from(memory.values()).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );
  return opts?.status ? all.filter((b) => b.status === opts.status) : all;
}

export async function updateBookingStatus(
  id: string,
  status: BookingStatus,
  assignedTo?: string | null
): Promise<Booking | null> {
  const client = getSql();
  if (client) {
    await ensureSchema();
    const rows =
      assignedTo === undefined
        ? await client`UPDATE bookings SET status = ${status} WHERE id = ${id} RETURNING *`
        : await client`UPDATE bookings SET status = ${status}, assigned_to = ${assignedTo} WHERE id = ${id} RETURNING *`;
    return rows[0] ? rowToBooking(rows[0]) : null;
  }
  const existing = memory.get(id);
  if (!existing) return null;
  const updated: Booking = {
    ...existing,
    status,
    assignedTo: assignedTo === undefined ? existing.assignedTo : assignedTo,
  };
  memory.set(id, updated);
  return updated;
}

export type SlotWindow = "morning" | "midday" | "afternoon";

const SLOT_WINDOWS: SlotWindow[] = ["morning", "midday", "afternoon"];

function emptyDay(): Record<SlotWindow, number> {
  return { morning: 0, midday: 0, afternoon: 0 };
}

function rowDateKey(v: unknown): string {
  return v instanceof Date ? v.toISOString().slice(0, 10) : String(v);
}

// Count NON-cancelled bookings per (date, window) for the given dates.
// Returns a complete grid (every requested date present, all windows zeroed).
export async function slotUsage(
  dateISOs: string[]
): Promise<Record<string, Record<SlotWindow, number>>> {
  const grid: Record<string, Record<SlotWindow, number>> = {};
  for (const d of dateISOs) grid[d] = emptyDay();
  if (dateISOs.length === 0) return grid;

  const client = getSql();
  if (client) {
    await ensureSchema();
    const rows = await client`
      SELECT slot_date, slot_window, COUNT(*)::int AS n
      FROM bookings
      WHERE status <> 'cancelled' AND slot_date = ANY(${dateISOs})
      GROUP BY slot_date, slot_window
    `;
    for (const r of rows) {
      const d = rowDateKey(r.slot_date);
      const w = r.slot_window as SlotWindow;
      if (grid[d] && SLOT_WINDOWS.includes(w)) grid[d][w] = Number(r.n);
    }
    return grid;
  }

  for (const b of memory.values()) {
    if (b.status === "cancelled") continue;
    const w = b.slotWindow as SlotWindow;
    if (grid[b.slotDate] && SLOT_WINDOWS.includes(w)) grid[b.slotDate][w] += 1;
  }
  return grid;
}

// Count NON-cancelled bookings in a single (date, window), optionally excluding
// one booking id (used by ops reschedule so a booking never conflicts with itself).
export async function countSlot(
  dateISO: string,
  window: SlotWindow,
  excludeId?: string
): Promise<number> {
  const client = getSql();
  if (client) {
    await ensureSchema();
    const rows = excludeId
      ? await client`SELECT COUNT(*)::int AS n FROM bookings WHERE status <> 'cancelled' AND slot_date = ${dateISO} AND slot_window = ${window} AND id <> ${excludeId}`
      : await client`SELECT COUNT(*)::int AS n FROM bookings WHERE status <> 'cancelled' AND slot_date = ${dateISO} AND slot_window = ${window}`;
    return Number(rows[0]?.n ?? 0);
  }
  let n = 0;
  for (const b of memory.values()) {
    if (b.status === "cancelled") continue;
    if (b.slotDate === dateISO && b.slotWindow === window && b.id !== excludeId) n++;
  }
  return n;
}

export async function listBookingsInRange(
  startISO: string,
  endISO: string
): Promise<Booking[]> {
  const client = getSql();
  if (client) {
    await ensureSchema();
    const rows = await client`
      SELECT * FROM bookings
      WHERE slot_date BETWEEN ${startISO} AND ${endISO}
      ORDER BY slot_date, slot_window, created_at
    `;
    return rows.map(rowToBooking);
  }
  return Array.from(memory.values())
    .filter((b) => b.slotDate >= startISO && b.slotDate <= endISO)
    .sort((a, b) =>
      a.slotDate === b.slotDate
        ? a.slotWindow.localeCompare(b.slotWindow)
        : a.slotDate.localeCompare(b.slotDate)
    );
}

export type BookingPatch = Partial<{
  slotDate: string;
  slotWindow: SlotWindow;
  address: string;
  apt: string | null;
  notes: string | null;
  tier: Booking["tier"];
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  floors: number;
  frequency: Booking["frequency"];
  addOns: string[];
  priceSubtotal: number;
  priceDiscount: number;
  priceTotal: number;
  status: BookingStatus;
  assignedTo: string | null;
}>;

const PATCH_COL: Record<string, string> = {
  slotDate: "slot_date",
  slotWindow: "slot_window",
  address: "address",
  apt: "apt",
  notes: "notes",
  tier: "tier",
  bedrooms: "bedrooms",
  bathrooms: "bathrooms",
  sqft: "sqft",
  floors: "floors",
  frequency: "frequency",
  addOns: "add_ons",
  priceSubtotal: "price_subtotal",
  priceDiscount: "price_discount",
  priceTotal: "price_total",
  status: "status",
  assignedTo: "assigned_to",
};

// General-purpose admin update: reschedule, edit details, status, assignment.
export async function updateBooking(
  id: string,
  patch: BookingPatch
): Promise<Booking | null> {
  const keys = (Object.keys(patch) as (keyof BookingPatch)[]).filter(
    (k) => k in PATCH_COL
  );
  if (keys.length === 0) return getBooking(id);

  const client = getSql();
  if (client) {
    await ensureSchema();
    const snake: Record<string, unknown> = {};
    for (const k of keys) snake[PATCH_COL[k as string]] = patch[k];
    const rows = await client`
      UPDATE bookings SET ${client(snake)} WHERE id = ${id} RETURNING *
    `;
    return rows[0] ? rowToBooking(rows[0]) : null;
  }
  const existing = memory.get(id);
  if (!existing) return null;
  const updated: Booking = { ...existing, ...(patch as Partial<Booking>) };
  memory.set(id, updated);
  return updated;
}

export async function bookingStats(): Promise<{
  todayCount: number;
  weekCount: number;
  newCount: number;
  weekRevenue: number;
}> {
  const all = await listBookings();
  const now = new Date();
  const todayISO = now.toISOString().slice(0, 10);
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const todayCount = all.filter((b) => b.createdAt.slice(0, 10) === todayISO)
    .length;
  const weekItems = all.filter((b) => new Date(b.createdAt) >= weekAgo);
  return {
    todayCount,
    weekCount: weekItems.length,
    newCount: all.filter((b) => b.status === "new").length,
    weekRevenue: weekItems
      .filter((b) => b.status !== "cancelled")
      .reduce((sum, b) => sum + b.priceTotal, 0),
  };
}

export function isDbConfigured() {
  return Boolean(DATABASE_URL);
}
