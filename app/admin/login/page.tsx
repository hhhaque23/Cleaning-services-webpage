"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Lock, ArrowRight, FlaskConical } from "lucide-react";
import { BrandLockup } from "../../components/BrandLockup";

function LoginInner() {
  const params = useSearchParams();
  const next = params?.get("next") || "/admin";
  const hasError = Boolean(params?.get("error"));
  const [demoMode, setDemoMode] = useState(false);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    fetch("/api/admin/mode")
      .then((r) => r.json())
      .then((d) => {
        setDemoMode(Boolean(d.demo));
        setLocked(Boolean(d.locked));
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center">
          <span className="inline-flex items-center rounded-2xl bg-gradient-to-br from-ink-900 to-ink-950 px-4 py-3 shadow-ring">
            <BrandLockup size="lg" />
          </span>
        </div>
        <div className="mt-5 text-center">
          <h1 className="font-display font-extrabold text-3xl text-ink-950 tracking-tight">
            Operations
          </h1>
          <p className="mt-2 text-sm text-ink-700">
            Sign in to see today&apos;s bookings and manage the queue.
          </p>
        </div>

        {demoMode && (
          <div className="mt-6 rounded-2xl bg-[oklch(0.97_0.06_75)] ring-1 ring-[oklch(0.78_0.12_75)] px-4 py-3 flex items-start gap-3">
            <FlaskConical className="h-4 w-4 flex-none text-[oklch(0.55_0.16_70)] mt-0.5" />
            <div className="text-xs text-[oklch(0.38_0.13_70)] leading-relaxed">
              <strong className="font-semibold">Demo mode.</strong> Type anything,
              you&apos;re in. Set <code className="font-mono">ADMIN_PASSWORD</code> on
              Railway to lock this down.
            </div>
          </div>
        )}

        {locked && (
          <div className="mt-6 rounded-2xl bg-[oklch(0.96_0.05_25)] ring-1 ring-[oklch(0.8_0.1_25)] px-4 py-3 flex items-start gap-3">
            <Lock className="h-4 w-4 flex-none text-[oklch(0.5_0.18_25)] mt-0.5" />
            <div className="text-xs text-[oklch(0.42_0.16_25)] leading-relaxed">
              <strong className="font-semibold">Admin is disabled.</strong> Set{" "}
              <code className="font-mono">ADMIN_PASSWORD</code> on the server to enable sign-in.
            </div>
          </div>
        )}

        {/* Native browser form POST → /api/admin/login returns a 303 with the
            session cookie set on the same response. No fetch / client nav, so
            nothing can race the cookie before the redirect to /admin. */}
        <form method="POST" action="/api/admin/login" className="mt-8 space-y-4">
          <input type="hidden" name="next" defaultValue={next} key={next} />
          <label className="block">
            <span className="block text-xs font-semibold uppercase tracking-wider text-ink-700/80 mb-1.5">
              Admin password
            </span>
            <span className="relative block">
              <span className="absolute left-3.5 top-3.5 text-ink-600 pointer-events-none">
                <Lock className="h-4 w-4" />
              </span>
              <input
                type="password"
                name="password"
                required
                autoFocus
                autoComplete="current-password"
                className="w-full pl-10 pr-3.5 py-3 rounded-2xl border border-ink-200 bg-white text-ink-950 placeholder:text-ink-700/50 focus:border-ink-600 focus:ring-2 focus:ring-ink-600/20 outline-none transition-colors"
              />
            </span>
          </label>

          {hasError && (
            <div className="rounded-xl bg-[oklch(0.96_0.04_25)] text-[oklch(0.42_0.18_25)] text-sm font-medium px-3 py-2.5">
              Wrong password
            </div>
          )}

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-ink-950 hover:bg-ink-800 text-[var(--surface)] font-semibold px-5 py-3.5 transition-colors cursor-pointer"
          >
            Sign in
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}
