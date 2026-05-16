import Link from "next/link";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Aurora } from "./components/motion/Aurora";
import { SplitText } from "./components/motion/SplitText";
import { MagneticButton } from "./components/motion/MagneticButton";
import { ArrowRight, Home, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative">
      <Navbar />
      <section className="relative pt-36 sm:pt-44 pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-grid-faint bg-grid-32 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_70%)]" />
        <Aurora palette="mixed" intensity="subtle" blur={120} blobs={2} />

        <div className="relative mx-auto max-w-3xl px-5 sm:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-grass-500/12 text-grass-700 text-xs font-semibold px-3 py-1.5 uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" /> 404
          </div>

          <h1 className="mt-5 font-display font-extrabold text-hero text-balance text-ink-950 leading-[1.02] tracking-[-0.028em]">
            <SplitText as="span" mode="word" trigger="load" stagger={0.06}>
              {"Page not pristine."}
            </SplitText>
          </h1>

          <p className="mt-6 max-w-xl mx-auto text-lead text-ink-700 leading-relaxed text-pretty">
            Whatever you were looking for isn&apos;t here. Probably moved, possibly never existed.
            Either way, we still clean homes.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <MagneticButton as="div" radius={130} strength={0.3}>
              <Link
                href="/"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-ink-950 hover:bg-ink-900 text-[var(--surface)] font-semibold px-7 py-3.5 text-[15px] shadow-lift transition-all duration-300 ease-out-quint cursor-pointer"
              >
                <Home className="h-4 w-4" />
                Back home
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </MagneticButton>
            <MagneticButton as="div" radius={100} strength={0.22}>
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-grass-500 hover:bg-grass-600 text-white font-semibold px-7 py-3.5 text-[15px] shadow-commit hover:shadow-commit-glow transition-all duration-300 ease-out-quint cursor-pointer"
              >
                Book a clean instead
                <ArrowRight className="h-4 w-4" />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
