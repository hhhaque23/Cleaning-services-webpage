import { NextResponse } from "next/server";
import { createBooking, type NewBooking } from "@/lib/bookings";
import { SLUG_TO_TIER } from "@/lib/tiers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function bad(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return bad("Invalid JSON body");
  }

  const required = ["email", "phone", "address", "tier", "bedrooms", "bathrooms", "sqft", "frequency", "slotDate", "slotWindow", "priceSubtotal", "priceDiscount", "priceTotal"] as const;
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

  const addOns = Array.isArray(body.addOns) ? body.addOns.map(String) : [];

  const input: NewBooking = {
    email,
    phone,
    address: String(body.address).trim(),
    apt: body.apt ? String(body.apt).trim() : null,
    notes: body.notes ? String(body.notes).trim() : null,
    tier: tier as NewBooking["tier"],
    bedrooms: Number(body.bedrooms),
    bathrooms: Number(body.bathrooms),
    sqft: Number(body.sqft),
    frequency: freq as NewBooking["frequency"],
    addOns,
    slotDate: String(body.slotDate),
    slotWindow: slotWindow as NewBooking["slotWindow"],
    priceSubtotal: Number(body.priceSubtotal),
    priceDiscount: Number(body.priceDiscount),
    priceTotal: Number(body.priceTotal),
  };

  try {
    const booking = await createBooking(input);
    return NextResponse.json({ id: booking.id, status: booking.status });
  } catch (err) {
    console.error("createBooking failed", err);
    return bad("Storage failure", 500);
  }
}
