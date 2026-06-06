import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getBooking,
  updateBookingStatus,
  updateBooking,
  deleteBooking,
  countSlot,
  type Booking,
  type BookingStatus,
  type BookingPatch,
  type SlotWindow,
} from "@/lib/bookings";
import { getCapacity, getCleaners } from "@/lib/settings";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { SLUG_TO_TIER } from "@/lib/tiers";
import {
  computePrice,
  ADDON_META,
  type AddOn,
  type BookingConfig,
} from "../../../components/Booking/pricing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID: BookingStatus[] = [
  "new",
  "confirmed",
  "scheduled",
  "completed",
  "cancelled",
];

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const booking = await getBooking(params.id);
  if (!booking)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  // Public, unauthenticated read — status only, NO customer PII.
  return NextResponse.json({
    id: booking.id,
    status: booking.status,
    createdAt: booking.createdAt,
    slotDate: booking.slotDate,
    slotWindow: booking.slotWindow,
    tier: booking.tier,
    priceTotal: booking.priceTotal,
  });
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const status = String(body.status) as BookingStatus;
  if (!VALID.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  const assignedTo =
    body.assignedTo === undefined
      ? undefined
      : body.assignedTo === null || body.assignedTo === ""
      ? null
      : String(body.assignedTo);

  const updated = await updateBookingStatus(params.id, status, assignedTo);
  if (!updated)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ id: updated.id, status: updated.status });
}

// DELETE = permanently remove the booking (admin only). Distinct from a status
// change to "cancelled", which keeps the row.
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const ok = await deleteBooking(params.id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

const TIERS = ["Standard", "Deep", "MoveInOut"];
const FREQS = ["onetime", "monthly", "biweekly", "weekly"];
const SLOT_WINDOWS = ["morning", "midday", "afternoon"];
const clampInt = (v: unknown, lo: number, hi: number, dflt: number) => {
  const n = Math.round(Number(v));
  return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : dflt;
};

// PUT = the rich ops edit: reschedule (capacity re-checked), edit details
// (price recomputed server-side), assign a cleaner, and/or status.
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await getBooking(params.id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const patch: BookingPatch = {};

  if (body.status !== undefined) {
    const status = String(body.status) as BookingStatus;
    if (!VALID.includes(status))
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    patch.status = status;
  }
  if (body.address !== undefined) {
    const address = String(body.address).trim();
    if (address.length < 3)
      return NextResponse.json({ error: "Address too short" }, { status: 400 });
    patch.address = address;
  }
  if (body.apt !== undefined) patch.apt = body.apt ? String(body.apt).trim() : null;
  if (body.notes !== undefined) patch.notes = body.notes ? String(body.notes).trim() : null;

  if (body.tier !== undefined) {
    const t = SLUG_TO_TIER[String(body.tier)] ?? String(body.tier);
    if (!TIERS.includes(t))
      return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
    patch.tier = t as Booking["tier"];
  }
  if (body.frequency !== undefined) {
    const f = String(body.frequency);
    if (!FREQS.includes(f))
      return NextResponse.json({ error: "Invalid frequency" }, { status: 400 });
    patch.frequency = f as Booking["frequency"];
  }
  if (body.bedrooms !== undefined) patch.bedrooms = clampInt(body.bedrooms, 0, 8, existing.bedrooms);
  if (body.bathrooms !== undefined) patch.bathrooms = clampInt(body.bathrooms, 1, 6, existing.bathrooms);
  if (body.floors !== undefined) patch.floors = clampInt(body.floors, 1, 4, existing.floors);
  if (body.sqft !== undefined) patch.sqft = clampInt(body.sqft, 300, 20000, existing.sqft);
  if (body.addOns !== undefined) {
    const valid = new Set(Object.keys(ADDON_META));
    patch.addOns = Array.isArray(body.addOns)
      ? body.addOns.map(String).filter((a) => valid.has(a))
      : [];
  }

  if (body.assignedTo !== undefined) {
    if (body.assignedTo === null || body.assignedTo === "") {
      patch.assignedTo = null;
    } else {
      const name = String(body.assignedTo);
      const cleaners = await getCleaners();
      if (!cleaners.includes(name))
        return NextResponse.json({ error: "Unknown cleaner" }, { status: 400 });
      patch.assignedTo = name;
    }
  }

  let targetDate = existing.slotDate;
  let targetWindow = existing.slotWindow as SlotWindow;
  if (body.slotDate !== undefined) {
    const sd = String(body.slotDate);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(sd))
      return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    patch.slotDate = sd;
    targetDate = sd;
  }
  if (body.slotWindow !== undefined) {
    const sw = String(body.slotWindow);
    if (!SLOT_WINDOWS.includes(sw))
      return NextResponse.json({ error: "Invalid window" }, { status: 400 });
    patch.slotWindow = sw as SlotWindow;
    targetWindow = sw as SlotWindow;
  }

  const slotChanged =
    (patch.slotDate && patch.slotDate !== existing.slotDate) ||
    (patch.slotWindow && patch.slotWindow !== existing.slotWindow);
  if (slotChanged) {
    const cap = await getCapacity();
    const used = await countSlot(targetDate, targetWindow, existing.id);
    if (used >= cap)
      return NextResponse.json({ error: "That window is fully booked." }, { status: 409 });
  }

  const pricingKeys = ["tier", "bedrooms", "bathrooms", "sqft", "floors", "frequency", "addOns"];
  if (pricingKeys.some((k) => k in patch)) {
    const config: BookingConfig = {
      tier: patch.tier ?? existing.tier,
      bedrooms: patch.bedrooms ?? existing.bedrooms,
      bathrooms: patch.bathrooms ?? existing.bathrooms,
      sqft: patch.sqft ?? existing.sqft,
      floors: patch.floors ?? existing.floors,
      frequency: patch.frequency ?? existing.frequency,
      addOns: (patch.addOns ?? existing.addOns) as AddOn[],
    };
    const price = computePrice(config);
    patch.priceSubtotal = price.subtotal;
    patch.priceDiscount = price.discount;
    patch.priceTotal = price.total;
  }

  const updated = await updateBooking(params.id, patch);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({
    id: updated.id,
    status: updated.status,
    slotDate: updated.slotDate,
    slotWindow: updated.slotWindow,
    priceTotal: updated.priceTotal,
  });
}
