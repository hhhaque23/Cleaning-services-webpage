import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service · Spectre Cleaning Solutions",
  description:
    "The simple terms that apply when you book a cleaning with Spectre Cleaning Solutions.",
};

export default function TermsPage() {
  return (
    <main className="relative">
      <Navbar />
      <article className="mx-auto max-w-3xl px-5 sm:px-8 pt-32 sm:pt-36 pb-24">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-700 hover:text-ink-950 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>
        <h1 className="mt-6 font-display font-extrabold text-display-1 text-ink-950 tracking-[-0.022em]">
          Terms of Service
        </h1>
        <p className="mt-3 text-ink-600 text-sm">
          Last updated June 2026 · {SITE.name}, {SITE.area}
        </p>

        <div className="mt-8 space-y-6 text-ink-700 leading-relaxed [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-xl [&_h2]:text-ink-950 [&_h2]:mt-9 [&_h2]:mb-2 [&_h2]:tracking-[-0.01em] [&_a]:text-accent-600 [&_a]:font-semibold [&_a]:hover:underline">
          <p>
            These terms apply when you book a cleaning with {SITE.name}, a locally
            owned company serving {SITE.area}. By booking, you agree to them.
          </p>

          <h2>Booking and scheduling</h2>
          <p>
            You can book online in a couple of minutes. We confirm your
            appointment by email. Arrival windows are estimates; if our timing
            changes we will let you know as early as we can.
          </p>

          <h2>Pricing and payment</h2>
          <p>
            The price you see before you book is the price you pay, with no hidden
            fees. Payment is handled securely through our booking and payment
            provider for each visit.
          </p>

          <h2>Our 24-hour re-clean guarantee</h2>
          <p>
            We want you happy with the result. If we miss a spot, tell us within
            24 hours and we will come back and re-clean that area free of charge.
          </p>

          <h2>Rescheduling and cancellation</h2>
          <p>
            Plans change. Please give us at least 24 hours notice to reschedule or
            cancel at no charge so we can offer the slot to someone else.
          </p>

          <h2>Access and your home</h2>
          <p>
            Let us know how to access your home and tell us in advance about pets,
            alarms, or fragile and valuable items so we can take extra care. We
            treat every home with respect; please secure cash, jewelry, and
            irreplaceable items before your appointment.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms? Email us any time at{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
        </div>
      </article>
      <Footer />
    </main>
  );
}
