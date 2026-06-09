import type { TrendPoint } from "@/lib/financial";
import { formatUSD } from "@/lib/money";

/**
 * Dependency-free stacked bar chart (plain divs, server-rendered). Each column
 * is one day; earned (solid accent) stacks under upcoming (light accent),
 * scaled to the series max. No charting library.
 */
export function RevenueBars({ points }: { points: TrendPoint[] }) {
  const max = Math.max(1, ...points.map((p) => p.earned + p.upcoming));
  const dense = points.length > 16; // a month — hide per-bar labels to avoid clutter

  return (
    <div>
      <div className="flex items-end gap-1.5 h-44">
        {points.map((p, i) => {
          const total = p.earned + p.upcoming;
          const hPct = (total / max) * 100;
          const earnedPct = total ? (p.earned / total) * 100 : 0;
          const title = `${p.label} — earned ${formatUSD(p.earned)}, upcoming ${formatUSD(p.upcoming)}`;
          return (
            <div key={p.date} className="group flex-1 min-w-0 h-full flex flex-col justify-end">
              <div
                className="w-full rounded-t-md overflow-hidden flex flex-col"
                style={{ height: `${hPct}%` }}
                title={title}
              >
                <div className="w-full bg-accent-300" style={{ height: `${100 - earnedPct}%` }} />
                <div className="w-full bg-accent-500" style={{ height: `${earnedPct}%` }} />
              </div>
              {!dense && (
                <span className="mt-1.5 block text-[9px] text-ink-500 tabular-nums text-center truncate">
                  {p.label}
                </span>
              )}
              {dense && (i === 0 || i === points.length - 1) && (
                <span className="mt-1.5 block text-[9px] text-ink-500 tabular-nums text-center truncate">
                  {p.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center gap-4 text-[11px] font-medium text-ink-600">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-accent-500" /> Earned
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-accent-300" /> Upcoming
        </span>
      </div>
    </div>
  );
}
