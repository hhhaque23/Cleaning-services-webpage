"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import { SplitText } from "./components/motion/SplitText";
import { MagneticButton } from "./components/motion/MagneticButton";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative">
      <section className="relative pt-36 sm:pt-44 pb-24 min-h-[80vh] overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-grid-faint bg-grid-32 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_70%)]" />

        <div className="relative mx-auto max-w-3xl px-5 sm:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[oklch(0.94_0.08_75)] text-[oklch(0.42_0.16_70)] text-xs font-semibold px-3 py-1.5 uppercase tracking-wider">
            <AlertTriangle className="h-3.5 w-3.5" />
            Something went wrong
          </div>

          <h1 className="mt-5 font-display font-extrabold text-hero text-balance text-ink-950 leading-[1.02] tracking-[-0.028em]">
            <SplitText as="span" mode="word" trigger="load" stagger={0.06}>
              {"That wasn't the clean finish."}
            </SplitText>
          </h1>

          <p className="mt-6 max-w-xl mx-auto text-lead text-ink-700 leading-relaxed text-pretty">
            Something on our end hit a snag. Try again, or head home and we&apos;ll pick up where
            you left off.
          </p>

          {error?.digest && (
            <p className="mt-3 text-xs text-ink-faint font-mono">Ref: {error.digest}</p>
          )}

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <MagneticButton as="div" radius={130} strength={0.3}>
              <button
                type="button"
                onClick={() => reset()}
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-ink-950 hover:bg-ink-900 text-[var(--surface)] font-semibold px-7 py-3.5 text-[15px] shadow-lift transition-all duration-300 ease-out-quint cursor-pointer"
              >
                <RotateCcw className="h-4 w-4 transition-transform group-hover:-rotate-45" />
                Try again
              </button>
            </MagneticButton>
            <MagneticButton as="div" radius={100} strength={0.22}>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--surface-elevated)] hover:bg-[var(--surface)] border border-line text-ink-950 font-semibold px-7 py-3.5 text-[15px] transition-all duration-300 ease-out-quint cursor-pointer"
              >
                <Home className="h-4 w-4" />
                Back home
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>
    </main>
  );
}
