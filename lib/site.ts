/**
 * Single source of truth for Spectre Cleaning brand facts & external links.
 * Sourced from the owner's business doc — update here, not inline.
 */
export const SITE = {
  name: "Spectre Cleaning Solutions",
  shortName: "Spectre Cleaning",
  email: "owner@spectrecleaningsolutions.com",
  area: "Wayne & Washtenaw County",
  areaLong: "Canton, Wayne & Washtenaw County",
  /** Where the business is based. */
  hq: "Canton, MI",
  /**
   * Canonical public origin. Drives metadataBase, robots, and sitemap so they
   * never disagree. Set NEXT_PUBLIC_SITE_URL on the host once the real domain
   * (or the Railway URL) is decided.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://spectrecleaningsolutions.com").replace(/\/+$/, ""),
} as const;
