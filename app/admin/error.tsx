"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

// Segment error boundary for the whole /admin console. A transient failure
// (e.g. the database being briefly unreachable) renders a recoverable card
// instead of a blank page, and never shows the customer a stack trace.
export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface to server logs / future error tracking, not to the user.
    console.error("Admin error boundary:", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-md px-5 py-24 text-center">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[oklch(0.96_0.05_25)] text-[oklch(0.5_0.18_25)]">
        <AlertTriangle className="h-6 w-6" />
      </span>
      <h1 className="mt-5 font-display font-bold text-2xl text-ink-950">
        Something went wrong
      </h1>
      <p className="mt-2 text-sm text-ink-700 leading-relaxed">
        The operations console hit a temporary error. This is usually a brief
        database hiccup — try again. If it keeps happening, check that the
        database is reachable.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-ink-950 hover:bg-ink-800 text-white font-semibold px-5 py-3 text-sm transition-colors cursor-pointer"
      >
        <RotateCcw className="h-4 w-4" />
        Try again
      </button>
    </div>
  );
}
