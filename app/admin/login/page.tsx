"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Lock, ArrowRight, FlaskConical } from "lucide-react";
import { SpectreMark } from "../../components/SpectreMark";

function LoginInner() {
  const params = useSearchParams();
  const next = params?.get("next") || "/admin";

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    fetch("/api/admin/mode")
      .then((r) => r.json())
      .then((d) => setDemoMode(Boolean(d.demo)))
      .catch(() => {});
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Wrong password");
      }
      // Hard navigation (not router.push): forces a fresh top-level request that
      // carries the just-set session cookie through middleware. The soft client
      // nav could race the cookie and bounce back to login ("nothing happens").
      const target =
        next.startsWith("/") && !next.startsWith("//") ? next : "/admin";
      window.location.assign(target);
      return; // leave submitting=true; the document is being replaced
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sign in failed");
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center">
          <span className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-br from-ink-900 to-ink-950 pl-3 pr-5 py-2.5 shadow-ring">
            <SpectreMark size={32} alt="Spectre Cleaning Solutions" />
            <span className="font-display font-bold text-xl text-white">
              Spectre<span className="font-medium text-accent-400"> Cleaning</span>
            </span>
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

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                autoComplete="current-password"
                className="w-full pl-10 pr-3.5 py-3 rounded-2xl border border-ink-200 bg-white text-ink-950 placeholder:text-ink-700/50 focus:border-ink-600 focus:ring-2 focus:ring-ink-600/20 outline-none transition-colors"
              />
            </span>
          </label>

          {error && (
            <div className="rounded-xl bg-[oklch(0.96_0.04_25)] text-[oklch(0.42_0.18_25)] text-sm font-medium px-3 py-2.5">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || password.length === 0}
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-ink-950 hover:bg-ink-800 disabled:bg-ink-300 disabled:cursor-not-allowed text-[var(--surface)] font-semibold px-5 py-3.5 transition-colors cursor-pointer"
          >
            {submitting ? "Signing in…" : "Sign in"}
            {!submitting && <ArrowRight className="h-4 w-4" />}
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
