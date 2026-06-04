/**
 * Single source of truth for Spectre Cleaning brand facts & external links.
 * Sourced from the owner's business doc — update here, not inline.
 */
export const SITE = {
  name: "Spectre Cleaning Solutions",
  shortName: "Spectre Cleaning",
  email: "owner@spectrecleaningsolutions.com",
  /** Thumbtack profile — real reviews live here. */
  reviewsUrl:
    "https://www.thumbtack.com/profile/services/580837431035707392/reviews",
  /** BookingKoala instant-quote calculator. */
  calculatorUrl: "https://storied-sherbet-1cc616.netlify.app/",
  area: "Oakland County, MI",
  areaLong: "Oakland County · serving metro Detroit",
} as const;
