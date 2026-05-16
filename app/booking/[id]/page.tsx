import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { getBooking } from "@/lib/bookings";
import { TrackingView } from "./_TrackingView";

type Props = { params: { id: string } };

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: `Booking ${params.id} · Pristine Cleaning Co.`,
    robots: { index: false, follow: false },
  };
}

export default async function BookingPage({ params }: Props) {
  const booking = await getBooking(params.id.toUpperCase());
  if (!booking) notFound();

  return (
    <main className="relative">
      <Navbar />
      <TrackingView booking={booking} />
      <Footer />
    </main>
  );
}
