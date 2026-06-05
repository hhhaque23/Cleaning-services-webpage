import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy · Spectre Cleaning Solutions",
  description:
    "How Spectre Cleaning Solutions collects, uses, and protects the information you share when booking a cleaning.",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="mt-3 text-ink-600 text-sm">
          Last updated June 2026 · {SITE.name}, {SITE.area}
        </p>

        <div className="mt-8 space-y-6 text-ink-700 leading-relaxed [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-xl [&_h2]:text-ink-950 [&_h2]:mt-9 [&_h2]:mb-2 [&_h2]:tracking-[-0.01em] [&_a]:text-accent-600 [&_a]:font-semibold [&_a]:hover:underline">
          <p>
            {SITE.name} is a locally owned cleaning company serving {SITE.area}.
            This policy explains, in plain language, what information we collect
            when you book with us and how we use it.
          </p>

          <h2>What we collect</h2>
          <p>
            Only what we need to schedule and complete your cleaning: your name,
            the contact details you give us (email, and a phone number if you
            choose to share one), your service address, and the details of the
            cleaning you request. Payments are processed by our booking and
            payment provider, so we do not store your full card number on our own
            systems.
          </p>

          <h2>How we use it</h2>
          <p>
            To confirm and schedule your booking, to send a cleaner to the right
            place, and to contact you about your appointment. That is it. We do not
            sell your information, and we do not send marketing you did not ask for.
          </p>

          <h2>Who we share it with</h2>
          <p>
            Your details are shared only with the cleaner assigned to your job
            and with the booking and payment services we use to run the business.
            We may disclose information if the law requires it.
          </p>

          <h2>Your choices</h2>
          <p>
            You can ask us what we have on file, correct it, or have it deleted.
            Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> and we will
            take care of it.
          </p>

          <h2>Changes</h2>
          <p>
            If we update this policy we will change the date above. Questions? Reach
            us any time at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
        </div>
      </article>
      <Footer />
    </main>
  );
}
