"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, LogOut } from "lucide-react";
import { useTransition } from "react";
import { SpectreMark } from "../components/SpectreMark";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [pending, start] = useTransition();
  const isLogin = pathname === "/admin/login";

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    start(() => {
      router.push("/admin/login");
      router.refresh();
    });
  }

  if (isLogin) {
    return <div className="min-h-screen bg-[var(--surface)]">{children}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface)]">
      <header className="sticky top-0 z-40 bg-[var(--surface)]/85 backdrop-blur-md border-b border-line">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
          <Link href="/admin" className="flex items-center gap-2.5 cursor-pointer">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-ink-900 to-ink-950 shadow-ring">
              <SpectreMark size={22} alt="Spectre Cleaning Solutions" />
            </span>
            <span className="leading-tight">
              <span className="block text-[10px] uppercase tracking-[0.18em] text-ink-600 font-semibold">
                Spectre
              </span>
              <span className="block font-display font-bold text-base text-ink-950">Operations</span>
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            <Link
              href="/admin"
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                pathname === "/admin"
                  ? "bg-ink-100 text-ink-950"
                  : "text-ink-700 hover:bg-ink-50 hover:text-ink-950"
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Bookings
            </Link>
            <button
              type="button"
              onClick={logout}
              disabled={pending}
              className="ml-2 inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg text-ink-700 hover:bg-ink-50 hover:text-ink-950 transition-colors cursor-pointer disabled:opacity-50"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}
