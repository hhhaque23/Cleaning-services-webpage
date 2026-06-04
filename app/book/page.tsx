import type { Metadata } from "next";
import { Suspense } from "react";
import { Calculator } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { BookingFlow } from "../components/Booking/BookingFlow";
import { TrustBar } from "../components/TrustBar";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a clean · Spectre Cleaning Solutions",
  description:
    "Build your booking in under a minute. Transparent pricing, same-day slots, no phone calls.",
};

export default function BookPage() {
  return (
    <main className="relative">
      <Navbar />
      <div className="pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 mb-6">
          <div className="card-tint flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:px-5">
            <p className="text-sm text-ink-700">
              Prefer a quick estimate first? Run the numbers in our instant pricing
              calculator.
            </p>
            <a
              href={SITE.calculatorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 self-start rounded-xl bg-ink-950 hover:bg-ink-900 text-white text-sm font-semibold px-4 py-2.5 whitespace-nowrap transition-colors cursor-pointer"
            >
              <Calculator className="h-4 w-4" /> Open calculator
            </a>
          </div>
        </div>
        <Suspense fallback={<div className="min-h-[60vh]" aria-hidden="true" />}>
          <BookingFlow />
        </Suspense>
      </div>
      <TrustBar />
      <Footer />
    </main>
  );
}
