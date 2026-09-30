import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getBooking } from "@/lib/bookings";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { sendEmail, bookingConfirmationEmail } from "@/lib/email";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST = (re)send the customer's booking confirmation email (admin only). For
// customers whose original confirmation failed, e.g. while the sending domain
// was unverified.
export async function POST(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const booking = await getBooking(params.id);
  if (!booking) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { subject, html, text } = bookingConfirmationEmail(booking);
  const r = await sendEmail({
    to: booking.email,
    subject,
    html,
    text,
    replyTo: SITE.email,
  });
  if (!r.ok) {
    const error = r.skipped
      ? "Email isn't configured (RESEND_API_KEY is not set)."
      : r.error || "Send failed";
    return NextResponse.json({ ok: false, error }, { status: 502 });
  }
  return NextResponse.json({ ok: true, to: booking.email });
}
