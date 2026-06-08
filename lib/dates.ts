// Business-timezone date helpers.
//
// The server (Railway) runs in UTC, so `new Date().getDate()` / `toISOString()`
// give the UTC calendar date — which flips ~8pm local and makes "today" and
// "this week" wrong for an evening booking. Slot dates are stored as plain
// YYYY-MM-DD calendar dates, so anything comparing them against "now" must use
// the BUSINESS timezone, not the server's.
//
// Default is America/Detroit (Canton / metro Detroit). Override with the
// BUSINESS_TZ env var if the service area ever moves.

const BUSINESS_TZ = process.env.BUSINESS_TZ || "America/Detroit";

// en-CA formats as YYYY-MM-DD, which is exactly our slot-date shape.
const fmt = new Intl.DateTimeFormat("en-CA", {
  timeZone: BUSINESS_TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** The current calendar date in the business timezone, as YYYY-MM-DD. */
export function businessToday(): string {
  return fmt.format(new Date());
}

/** The business-timezone calendar date (YYYY-MM-DD) for any instant. */
export function toBusinessDate(d: Date | string): string {
  return fmt.format(typeof d === "string" ? new Date(d) : d);
}
