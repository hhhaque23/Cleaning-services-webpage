"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Lock, ArrowRight, Sparkles, FlaskConical } from "lucide-react";

function LoginInner() {
  const router = useRouter();
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
      router.push(next);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sign in failed");
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center">
          <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-ink-800 to-ink-950 text-[var(--surface)]">
            <Sparkles className="h-5 w-5" strokeWidth={2.4} />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-grass-500 ring-2 ring-[var(--surface)]" />
          </span>
        </div>
        <div className="mt-5 text-center">
          <div className="text-[11px] uppercase tracking-[0.18em] text-ink-600 font-semibold">
            Pristine
          </div>
          <h1 className="mt-1 font-display font-extrabold text-3xl text-ink-950 tracking-tight">
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
