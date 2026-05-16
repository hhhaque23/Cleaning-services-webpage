export default function Loading() {
  return (
    <main className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 -z-10 bg-grid-faint bg-grid-32 [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_60%)]" />
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-10 w-10">
          <span className="absolute inset-0 rounded-full bg-grass-500/20 animate-pulse-ring" />
          <span className="absolute inset-2 rounded-full bg-grass-500 animate-pulse" />
        </div>
        <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-ink-faint">
          Loading
        </span>
      </div>
    </main>
  );
}
