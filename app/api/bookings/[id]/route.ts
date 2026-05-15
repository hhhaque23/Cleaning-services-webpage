import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getBooking,
  updateBookingStatus,
  type BookingStatus,
} from "@/lib/bookings";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

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
  return NextResponse.json({
    id: booking.id,
    status: booking.status,
    createdAt: booking.createdAt,
    slotDate: booking.slotDate,
    slotWindow: booking.slotWindow,
    tier: booking.tier,
    priceTotal: booking.priceTotal,
    address: booking.address,
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
