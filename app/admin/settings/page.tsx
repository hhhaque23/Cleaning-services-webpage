import { getCleaners, isDbConfigured } from "@/lib/settings";
import { countBookings } from "@/lib/bookings";
import { CleanersManager } from "./CleanersManager";
import { ClearBookings } from "./ClearBookings";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const cleaners = await getCleaners();
  const dbReady = isDbConfigured();
  const bookingCount = await countBookings();

  return (
    <div className="mx-auto max-w-2xl px-5 sm:px-8 py-10">
      <div className="text-[11px] uppercase tracking-[0.14em] text-ink-600 font-semibold">
        Settings
      </div>
      <h1 className="mt-2 font-display font-extrabold text-3xl text-ink-950 tracking-tight">
        Cleaners &amp; capacity
      </h1>
      <p className="mt-1 text-sm text-ink-700 max-w-lg">
        Each daily window (Morning / Midday / Afternoon) can hold one job per cleaner. When a
        window is full it shows as &ldquo;Booked out&rdquo; and customers can&apos;t pick it.
      </p>

      {!dbReady && (
        <div className="mt-6 rounded-2xl border border-[oklch(0.78_0.12_75)] bg-[oklch(0.97_0.05_75)] px-5 py-4 text-sm text-[oklch(0.35_0.12_70)] leading-relaxed">
          <strong className="font-semibold">DATABASE_URL is not set.</strong> Settings are stored
          in memory and reset on every deploy. Provision Postgres on Railway to persist them.
        </div>
      )}

      <div className="mt-8">
        <CleanersManager initial={cleaners} />
      </div>

      <ClearBookings count={bookingCount} />
    </div>
  );
}
