import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  Building2,
  ArrowRight,
  Check,
  Sparkles,
  ShieldCheck,
  MapPin,
  Users,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { FinalCTA } from "../components/FinalCTA";
import { PHOTOS } from "@/lib/unsplash";
import { SITE } from "@/lib/site";
import { TIER_META, type Tier } from "../components/Booking/pricing";
import { TIER_SLUG } from "@/lib/tiers";

export const metadata: Metadata = {
  title: "Services · Spectre Cleaning Solutions",
  description:
    "A new, locally-owned Canton crew cleaning both homes and businesses across Wayne & Washtenaw County — recurring or one-time, transparent pricing.",
};

const HOME_TIERS: { tier: Tier; blurb: string }[] = [
  { tier: "Standard", blurb: "Recurring upkeep for an already-tidy home." },
  { tier: "Deep", blurb: "Top-to-bottom reset — first cleans and seasonal refreshes." },
  { tier: "MoveInOut", blurb: "Empty-home detail for moving day, ready for keys or listing." },
];

const HOME_INCLUDES = [
  "Kitchens & bathrooms",
  "Living spaces & bedrooms",
  "Floors, dusting & surfaces",
  "Add-ons: oven, fridge, windows & more",
];

const OFFICE_INCLUDES = [
  "Workstations & common areas",
  "Restrooms & break rooms",
  "Floors & high-traffic lanes",
  "Recurring or one-time, on your hours",
];

export default function ServicesPage() {
  return (
    <main className="relative">
      <Navbar />

      {/* Hero — the dual-market promise */}
      <section className="relative overflow-hidden pt-32 sm:pt-36 lg:pt-44 pb-16 sm:pb-20">
        <div className="absolute inset-0 -z-10 bg-grid-faint bg-grid-32 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_70%)]" />

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-grass-500/12 text-grass-700 text-xs font-semibold px-3 py-1.5 uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" /> New in the Canton area
              </div>

              <h1 className="mt-4 font-display font-extrabold text-hero text-balance text-ink-950 leading-[1.02] tracking-[-0.028em]">
                Homes <span className="italic font-medium text-ink-700">and</span> businesses,
                cleaned right.
              </h1>

              <p className="mt-5 max-w-xl text-lead text-ink-700 leading-relaxed text-pretty">
                Spectre Cleaning is a new, locally-owned crew based in Canton. We clean houses{" "}
                <span className="font-semibold text-ink-900">and</span> commercial spaces across
                Wayne &amp; Washtenaw County — the same vetted team and the same care, whether it&apos;s your
                living room or your lobby.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/book"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-grass-500 hover:bg-grass-600 text-white font-semibold px-7 py-3.5 text-[15px] shadow-commit transition-all duration-300 ease-out-quint cursor-pointer"
                >
                  <Home className="h-4 w-4" />
                  Book a home clean
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out-quint group-hover:translate-x-1" />
                </Link>
                <a
                  href={`mailto:${SITE.email}?subject=Office%20cleaning%20quote`}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--surface-elevated)] hover:bg-white border border-line text-ink-950 font-semibold px-7 py-3.5 text-[15px] transition-colors cursor-pointer"
                >
                  <Building2 className="h-4 w-4" />
                  Get an office quote
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[5/6] rounded-[2rem] overflow-hidden shadow-lift">
                <Image
                  src={PHOTOS.statsHeader}
                  alt="A bright, freshly cleaned living room in a metro Detroit home"
                  fill
                  priority
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[oklch(0.11_0.04_230/0.45)] via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two ways we help — residential vs commercial */}
      <section className="relative pt-4 pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            <PathwayCard
              eyebrow="For your home"
              icon={Home}
              title="Houses & apartments"
              photo={PHOTOS.standardHero}
              alt="A tidy, sunlit living room after a Spectre home clean"
              includes={HOME_INCLUDES}
              ctaHref="/book"
              ctaLabel="Get a price in 60 seconds"
            />
            <PathwayCard
              eyebrow="For your business"
              icon={Building2}
              title="Offices & commercial"
              photo={PHOTOS.officeHero}
              alt="A bright, freshly cleaned office ready for the work day"
              includes={OFFICE_INCLUDES}
              ctaHref="/services/office"
              ctaLabel="See office cleaning"
            />
          </div>
        </div>
      </section>

      {/* Home cleaning options */}
      <section className="relative pb-16 sm:pb-20 border-t border-line pt-14 sm:pt-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-grass-700">
              Home cleaning
            </div>
            <h2 className="mt-3 font-display font-extrabold text-display-1 text-ink-950 text-balance">
              The clean your home needs.
            </h2>
            <p className="mt-4 text-ink-700 leading-relaxed">
              No fixed packages — just regular upkeep, a top-to-bottom deep clean, or a move-out
              detail. Tell us about your home and your exact price is built in Get a price. Recurring
              plans save up to 20%.
            </p>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {HOME_TIERS.map(({ tier, blurb }) => {
              const meta = TIER_META[tier];
              return (
                <Link
                  key={tier}
                  href={`/services/${TIER_SLUG[tier]}`}
                  className="card group p-6 flex flex-col cursor-pointer transition-shadow hover:shadow-card"
                >
                  <div className="text-[11px] uppercase tracking-[0.12em] font-semibold text-ink-600">
                    {meta.tagline}
                  </div>
                  <div className="mt-1 font-display font-extrabold text-2xl text-ink-950">
                    {meta.label}
                  </div>
                  <p className="mt-2 text-[15px] text-ink-700 leading-relaxed flex-1">{blurb}</p>
                  <div className="mt-5 flex items-center justify-end">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-grass-700 group-hover:gap-2 transition-all">
                      What&apos;s included <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-8">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 rounded-2xl bg-grass-500 hover:bg-grass-600 text-white font-semibold px-6 py-3.5 text-[15px] shadow-commit transition-colors cursor-pointer"
            >
              Build your price
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="relative pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="card p-6 sm:p-7 flex flex-wrap items-center gap-x-8 gap-y-3">
            <TrustItem icon={Users} label="New & locally owned" />
            <TrustItem icon={ShieldCheck} label="Vetted local cleaners" />
            <TrustItem icon={MapPin} label="Serving Wayne & Washtenaw" />
            <TrustItem icon={Check} label="Upfront custom pricing" />
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  );
}

function PathwayCard({
  eyebrow,
  icon: Icon,
  title,
  photo,
  alt,
  includes,
  ctaHref,
  ctaLabel,
}: {
  eyebrow: string;
  icon: typeof Home;
  title: string;
  photo: string;
  alt: string;
  includes: string[];
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <div className="card overflow-hidden flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={photo} alt={alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.11_0.04_230/0.35)] via-transparent to-transparent" />
      </div>
      <div className="p-6 sm:p-7 flex flex-col flex-1">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[oklch(0.72_0.12_233/0.12)] text-accent-700">
            <Icon className="h-5 w-5" />
          </span>
          <span className="text-[11px] uppercase tracking-[0.12em] font-semibold text-ink-600">
            {eyebrow}
          </span>
        </div>
        <h3 className="mt-3 font-display font-extrabold text-2xl text-ink-950">{title}</h3>
        <ul className="mt-4 space-y-2 flex-1">
          {includes.map((it) => (
            <li key={it} className="flex items-start gap-2.5 text-[15px] text-ink-800">
              <Check className="h-4 w-4 mt-0.5 flex-none text-grass-600" strokeWidth={3} />
              {it}
            </li>
          ))}
        </ul>
        <Link
          href={ctaHref}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-ink-950 hover:bg-ink-800 text-white font-semibold px-5 py-3.5 text-[15px] transition-colors cursor-pointer"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function TrustItem({ icon: Icon, label }: { icon: typeof Users; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 text-sm text-ink-800">
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-grass-500/12 text-grass-700">
        <Icon className="h-3.5 w-3.5" strokeWidth={2.4} />
      </span>
      <span className="font-medium">{label}</span>
    </div>
  );
}
