import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { BookingFlow } from "../components/Booking/BookingFlow";
import { TrustBar } from "../components/TrustBar";

export const metadata: Metadata = {
  title: "Book a clean · Pristine Cleaning Co.",
  description:
    "Build your booking in under a minute. Transparent pricing, same-day slots, no phone calls.",
};

export default function BookPage() {
  return (
    <main className="relative">
      <Navbar />
      <div className="pt-28 sm:pt-32 lg:pt-36">
        <Suspense fallback={<div className="min-h-[60vh]" aria-hidden="true" />}>
          <BookingFlow />
        </Suspense>
      </div>
      <TrustBar />
      <Footer />
    </main>
  );
}
