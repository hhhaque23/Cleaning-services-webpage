import { NextResponse } from "next/server";
import { createBooking, countSlot, type NewBooking, type SlotWindow } from "@/lib/bookings";
import { getCapacity } from "@/lib/settings";
import { SLUG_TO_TIER } from "@/lib/tiers";
import { computePrice, ADDON_META, type AddOn } from "../../components/Booking/pricing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function bad(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

const clampInt = (v: unknown, lo: number, hi: number, dflt: number) => {
  const n = Math.round(Number(v));
  return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : dflt;
};

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return bad("Invalid JSON body");
  }

  const required = ["email", "phone", "address", "tier", "bedrooms", "bathrooms", "sqft", "floors", "frequency", "slotDate", "slotWindow"] as const;
  for (const k of required) {
    if (body[k] === undefined || body[k] === null || body[k] === "")
      return bad(`Missing field: ${k}`);
  }

  const email = String(body.email).trim();
  if (!email.includes("@")) return bad("Invalid email");
  const phone = String(body.phone).trim();
  if (phone.replace(/\D/g, "").length < 7) return bad("Invalid phone");

  const tierIn = String(body.tier);
  const tier = SLUG_TO_TIER[tierIn] ?? tierIn;
  if (!["Standard", "Deep", "MoveInOut"].includes(tier as string))
    return bad("Invalid tier");

  const freq = String(body.frequency);
  if (!["onetime", "monthly", "biweekly", "weekly"].includes(freq))
    return bad("Invalid frequency");

  const slotWindow = String(body.slotWindow);
  if (!["morning", "midday", "afternoon"].includes(slotWindow))
    return bad("Invalid slot window");

  const slotDate = String(body.slotDate);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(slotDate)) return bad("Invalid date");

  const validAddons = new Set(Object.keys(ADDON_META));
  const addOns = Array.isArray(body.addOns)
    ? body.addOns.map(String).filter((a) => validAddons.has(a))
    : [];

  const bedrooms = clampInt(body.bedrooms, 0, 8, 2);
  const bathrooms = clampInt(body.bathrooms, 1, 6, 1);
  const sqft = clampInt(body.sqft, 300, 20000, 1000);
  const floors = clampInt(body.floors, 1, 4, 1);

  // Price is computed SERVER-SIDE from the config — never trust client-sent prices.
  const price = computePrice({
    tier: tier as NewBooking["tier"],
    bedrooms,
    bathrooms,
    sqft,
    floors,
    frequency: freq as NewBooking["frequency"],
    addOns: addOns as AddOn[],
  });

  const input: NewBooking = {
    email,
    phone,
    address: String(body.address).trim(),
    apt: body.apt ? String(body.apt).trim() : null,
    notes: body.notes ? String(body.notes).trim() : null,
    tier: tier as NewBooking["tier"],
    bedrooms,
    bathrooms,
    sqft,
    floors,
    frequency: freq as NewBooking["frequency"],
    addOns,
    slotDate,
    slotWindow: slotWindow as NewBooking["slotWindow"],
    priceSubtotal: price.subtotal,
    priceDiscount: price.discount,
    priceTotal: price.total,
  };

  // Capacity / no-double-booking: a (date, window) can hold at most `capacity`
  // (= number of cleaners) non-cancelled jobs. Count-then-insert is not atomic;
  // acceptable at this volume (TODO: advisory lock if contention appears).
  const capacity = await getCapacity();
  const used = await countSlot(input.slotDate, input.slotWindow as SlotWindow);
  if (used >= capacity) {
    return bad("That slot just filled up — pick another time.", 409);
  }

  try {
    const booking = await createBooking(input);
    return NextResponse.json({ id: booking.id, status: booking.status });
  } catch (err) {
    console.error("createBooking failed", err);
    return bad("Storage failure", 500);
  }
}
