"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, CalendarDays, Settings, LogOut, Home } from "lucide-react";
import { useTransition } from "react";
import { BrandLockup } from "../components/BrandLockup";

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
    return <div className="relative z-10 min-h-screen bg-[var(--surface)]">{children}</div>;
  }

  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      {/* Branded backdrop: opaque base gradient (so the marketing ribbons don't
          bleed through) + a soft brand glow up top + a faint dot texture, so the
          cards float on a textured surface instead of a flat slab. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 40% at 50% -8%, oklch(0.58 0.15 238 / 0.07), transparent 70%), linear-gradient(180deg, var(--surface-elevated) 0%, var(--surface) 38%, var(--surface-tint) 160%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 topo-lines opacity-70" />

      <header className="sticky top-0 z-40 bg-[var(--surface)]/85 backdrop-blur-md border-b border-line">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
          <Link href="/admin" className="flex items-center gap-2.5 cursor-pointer">
            <BrandLockup framed />
            <span className="hidden sm:block text-sm font-semibold text-ink-700">Operations</span>
          </Link>

          <nav className="flex items-center gap-1">
            <NavLink href="/admin" active={pathname === "/admin"} icon={LayoutDashboard} label="Bookings" />
            <NavLink href="/admin/calendar" active={pathname === "/admin/calendar"} icon={CalendarDays} label="Calendar" />
            <NavLink href="/admin/settings" active={pathname === "/admin/settings"} icon={Settings} label="Settings" />
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-sm font-medium rounded-lg text-ink-700 hover:bg-ink-50 hover:text-ink-950 transition-colors cursor-pointer"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">View site</span>
            </Link>
            <button
              type="button"
              onClick={logout}
              disabled={pending}
              className="ml-2 inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg text-ink-700 hover:bg-ink-50 hover:text-ink-950 transition-colors cursor-pointer disabled:opacity-50"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}

function NavLink({
  href,
  active,
  icon: Icon,
  label,
}: {
  href: string;
  active: boolean;
  icon: typeof LayoutDashboard;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
        active ? "bg-ink-100 text-ink-950" : "text-ink-700 hover:bg-ink-50 hover:text-ink-950"
      }`}
    >
      <Icon className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}
