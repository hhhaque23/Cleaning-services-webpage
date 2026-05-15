import type { Tier } from "@/app/components/Booking/pricing";

export const TIER_SLUG: Record<Tier, string> = {
  Standard: "standard",
  Deep: "deep",
  MoveInOut: "move-in-out",
};

export const SLUG_TO_TIER: Record<string, Tier> = {
  standard: "Standard",
  deep: "Deep",
  "move-in-out": "MoveInOut",
};

export const TIER_SLUGS = Object.keys(SLUG_TO_TIER);
