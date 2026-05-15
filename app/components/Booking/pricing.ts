export type Tier = "Standard" | "Deep" | "MoveInOut";

export type Frequency = "onetime" | "monthly" | "biweekly" | "weekly";

export type AddOn =
  | "oven"
  | "fridge"
  | "windows"
  | "petHair"
  | "laundry"
  | "baseboards";

export const TIER_META: Record<
  Tier,
  { label: string; tagline: string; base: number; perBedroom: number; perBathroom: number }
> = {
  Standard: {
    label: "Standard",
    tagline: "Recurring maintenance",
    base: 89,
    perBedroom: 15,
    perBathroom: 12,
  },
  Deep: {
    label: "Deep clean",
    tagline: "First-time & seasonal",
    base: 159,
    perBedroom: 25,
    perBathroom: 20,
  },
  MoveInOut: {
    label: "Move in / out",
    tagline: "Empty home, top to bottom",
    base: 229,
    perBedroom: 35,
    perBathroom: 30,
  },
};

export const ADDON_META: Record<
  AddOn,
  { label: string; price: number; hint: string }
> = {
  oven: { label: "Inside oven", price: 25, hint: "Grease, racks, glass" },
  fridge: { label: "Inside fridge", price: 25, hint: "Shelves & drawers" },
  windows: { label: "Interior windows", price: 35, hint: "Glass & sills" },
  petHair: { label: "Pet hair", price: 20, hint: "Furniture & corners" },
  laundry: { label: "Laundry load", price: 15, hint: "Wash, dry, fold" },
  baseboards: { label: "Baseboards", price: 30, hint: "Hand-wiped" },
};

export const FREQUENCY_META: Record<
  Frequency,
  { label: string; sub: string; discount: number }
> = {
  onetime: { label: "One-time", sub: "No commitment", discount: 0 },
  monthly: { label: "Monthly", sub: "Save 10%", discount: 0.1 },
  biweekly: { label: "Biweekly", sub: "Save 15%", discount: 0.15 },
  weekly: { label: "Weekly", sub: "Save 20%", discount: 0.2 },
};

export type BookingConfig = {
  tier: Tier;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  frequency: Frequency;
  addOns: AddOn[];
};

export function computePrice(config: BookingConfig) {
  const tier = TIER_META[config.tier];
  const sqftMultiplier = 1 + Math.max(0, (config.sqft - 1000) / 1000) * 0.1;
  const roomCost =
    tier.base +
    tier.perBedroom * config.bedrooms +
    tier.perBathroom * config.bathrooms;
  const addOnCost = config.addOns.reduce((sum, a) => sum + ADDON_META[a].price, 0);
  const subtotal = roomCost * sqftMultiplier + addOnCost;
  const discount = FREQUENCY_META[config.frequency].discount;
  const total = subtotal * (1 - discount);
  return {
    subtotal: Math.round(subtotal),
    discount: Math.round(subtotal * discount),
    total: Math.round(total),
  };
}

export function startingPrice(tier: Tier) {
  return computePrice({
    tier,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 1000,
    frequency: "onetime",
    addOns: [],
  }).total;
}
