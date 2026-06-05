import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  Building2,
  Calculator,
  Mail,
  Check,
  Monitor,
  Trash2,
  CookingPot,
  Sparkles,
  DoorOpen,
  Footprints,
} from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { FinalCTA } from "../../components/FinalCTA";
import { PHOTOS } from "@/lib/unsplash";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Office cleaning · Spectre Cleaning Solutions",
  description:
    "Commercial and office cleaning across Washtenaw County. Recurring or one-time, custom-quoted for your space. Get an instant estimate or email us.",
};

const COVERED = [
  {
    icon: Monitor,
    title: "Workstations & desks",
    body: "Surfaces sanitized, monitors and phones wiped, clutter squared away.",
  },
  {
    icon: Sparkles,
    title: "Restrooms",
    body: "Fully sanitized and restocked — fixtures, mirrors, floors, supplies.",
  },
  {
    icon: CookingPot,
    title: "Kitchen & break rooms",
    body: "Counters, sinks, exterior of appliances, tables, and trash.",
  },
  {
    icon: Footprints,
    title: "Floors",
    body: "Vacuumed and mopped, with high-traffic lanes given extra detail.",
  },
  {
    icon: DoorOpen,
    title: "Common areas",
    body: "Reception, conference rooms, glass doors, and shared surfaces.",
  },
  {
    icon: Trash2,
    title: "Trash & recycling",
    body: "Emptied, relined, and taken to your designated pickup point.",
  },
];

export default function OfficeServicePage() {
  return (
    <main className="relative">
      <Navbar />

      <section className="relative overflow-hidden pt-32 sm:pt-36 lg:pt-44 pb-16 sm:pb-20">
        <div className="absolute inset-0 -z-10 bg-grid-faint bg-grid-32 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_70%)]" />

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-ink-100 text-ink-800 text-xs font-semibold px-3 py-1.5 uppercase tracking-wider">
                <Building2 className="h-3.5 w-3.5" /> Commercial & office
              </div>

              <h1 className="mt-4 font-display font-extrabold text-hero text-balance text-ink-950">
                Office cleaning.
              </h1>

              <p className="mt-5 max-w-xl text-lead text-ink-700 leading-relaxed text-pretty">
                Recurring or one-time cleans for offices, suites, and small commercial
                spaces across Washtenaw County. Every space is priced for its size and
                schedule, so you get a quote that fits — not a generic rate.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href={SITE.calculatorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-accent-500 hover:bg-accent-600 text-white font-semibold px-7 py-3.5 text-[15px] shadow-commit transition-all duration-300 ease-out-quint cursor-pointer"
                >
                  <Calculator className="h-4 w-4" />
                  Get an instant quote
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out-quint group-hover:translate-x-1" />
                </a>
                <a
                  href={`mailto:${SITE.email}?subject=Office%20cleaning%20quote`}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--surface-elevated)] hover:bg-white border border-line text-ink-950 font-semibold px-7 py-3.5 text-[15px] transition-all duration-300 ease-out-quint cursor-pointer"
                >
                  <Mail className="h-4 w-4" />
                  Email for a quote
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-lift border border-line-strong/30">
                <Image
                  src={PHOTOS.moveHero}
                  alt="A bright, freshly cleaned commercial space ready for the work day"
                  fill
                  priority
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[oklch(0.11_0.04_230/0.45)] via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative pt-12 sm:pt-16 pb-20 sm:pb-24 border-t border-line">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-accent-700">
              What&apos;s covered
            </div>
            <h2 className="mt-3 font-display font-extrabold text-display-1 text-ink-950 text-balance">
              A workplace that&apos;s ready before the team arrives.
            </h2>
            <p className="mt-4 text-ink-700 leading-relaxed">
              Built around your hours — early mornings, evenings, or weekends — so the
              clean never gets in the way of the work.
            </p>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {COVERED.map((it) => (
              <div key={it.title} className="card p-5 sm:p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[oklch(0.72_0.12_233/0.12)] text-accent-700">
                  <it.icon className="h-5 w-5" />
                </span>
                <div className="mt-4 font-display font-bold text-lg text-ink-950">
                  {it.title}
                </div>
                <p className="mt-1.5 text-[15px] text-ink-700 leading-relaxed">
                  {it.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 card p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 mt-0.5 flex-none text-accent-700" strokeWidth={3} />
              <p className="text-[15px] text-ink-800 leading-relaxed max-w-xl">
                Recurring schedules get a locked rate and the same crew each visit.
                Every clean is backed by our 24-hour re-clean guarantee.
              </p>
            </div>
            <a
              href={SITE.calculatorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 self-start rounded-xl bg-ink-950 hover:bg-ink-900 text-white text-sm font-semibold px-5 py-3 whitespace-nowrap transition-colors cursor-pointer"
            >
              <Calculator className="h-4 w-4" /> Estimate my office
            </a>
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
