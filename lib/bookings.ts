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
        frequency TEXT NOT NULL,
        add_ons TEXT[] NOT NULL DEFAULT '{}',
        slot_date DATE NOT NULL,
        slot_window TEXT NOT NULL,
        price_subtotal INT NOT NULL,
        price_discount INT NOT NULL,
        price_total INT NOT NULL,
        assigned_to TEXT
      )
    `.then(() => undefined);
  }
  return schemaReady;
}

// In-memory fallback (dev / local preview without DATABASE_URL).
// Stashed on globalThis so the singleton survives Next.js module duplication
// across route bundles. Lost on every server restart, by design.
const globalRef = globalThis as unknown as {
  __pristineBookings?: Map<string, Booking>;
};
const memory: Map<string, Booking> =
  globalRef.__pristineBookings ?? new Map<string, Booking>();
globalRef.__pristineBookings = memory;

function makeId() {
  const chars = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
  let s = "";
  for (let i = 0; i < 6; i++)
    s += chars[Math.floor(Math.random() * chars.length)];
  return `PR-${s}`;
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
        bedrooms, bathrooms, sqft, frequency, add_ons,
        slot_date, slot_window, price_subtotal, price_discount, price_total
      ) VALUES (
        ${id}, ${input.email}, ${input.phone}, ${input.address},
        ${input.apt}, ${input.notes}, ${input.tier},
        ${input.bedrooms}, ${input.bathrooms}, ${input.sqft},
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
