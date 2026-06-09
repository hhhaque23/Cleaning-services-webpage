// Whole-dollar currency formatting. Prices across the app are stored as integer
// dollars (no cents), so we round defensively and group thousands.
export function formatUSD(dollars: number): string {
  return `$${Math.round(dollars).toLocaleString("en-US")}`;
}
