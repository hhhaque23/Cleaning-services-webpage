// Unsplash photo IDs — every one of these has been downloaded and viewed.
// Theme: traditional MICHIGAN / Midwest-suburban home INTERIORS (warm wood,
// classic furnishings) + real OFFICE interiors. INTERIORS ONLY — no exterior /
// outside-of-building shots. ZERO people, zero faces, zero product shots, zero
// readable text/brand. If you add an ID, download and view it first, and check
// it crops well at the slot's aspect.

const hero = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=72`;
const mid = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=72`;
const portrait = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=72`;
const avatar = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=200&q=78`;
const thumb = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=480&q=70`;

// Verified traditional Midwest interiors + office interiors.
const ID = {
  // Living / great rooms
  livingArchVaultGrey: "1560185009-dddeb820c7b7",      // bright brick-arch vaulted, grey sofa
  livingArchVaultBeige: "1560185013-ead8277ef8ea",     // brick-arch vaulted, beige + blue chairs
  livingStoneFireplace: "1696814543693-31fcf942ccb7",  // stone fireplace, leather club chair
  livingWhiteStone: "1612031737124-28aeae3f2863",      // white stacked-stone fireplace
  livingStoneCorner: "1612152598218-9acf01c968e3",     // stone corner fireplace, bright
  livingMustardVintage: "1724026502211-ff953e813194",  // dark-wood trim, mustard velvet sofa
  livingWoodPanelFloral: "1635108198418-584af95a2b6f", // wood-panel great room, floral chairs
  livingTraditionalBrown: "1560449752-3fd4bdbe7df0",   // traditional, brown sofa, bookshelf

  // Kitchens
  kitchenCreamNavy: "1701421047855-d7bafd8d6f69",      // cream shaker + navy island
  kitchenFarmhouse: "1719569019031-ca8fb2911e2d",      // cream farmhouse, cafe curtains
  kitchenCreamGranite: "1588796460733-82d656bfbc49",   // classic cream + granite, pendants
  kitchenCharcoal: "1600489000022-c2086d79f9d4",       // charcoal lowers, subway tile

  // Bathrooms
  bathFarmhouseVanity: "1604769319166-010643ace337",   // shiplap, wood double vanity
  bathSubwayPedestal: "1560448075-bb485b067938",       // classic subway tile, pedestal sink
  bathMasterWood: "1507086182422-97bd7ca2413b",        // master bath, reclaimed-wood ceiling

  // Bedrooms
  bedBlueFourPoster: "1651766231012-8d8a4b2e20dc",     // light-blue master, wood four-poster
  bedGreyMaster: "1560185893-a55cbc8c57e8",            // grey master, warm wood floors
  bedVelvetSofa: "1600494448655-ae58f58bb945",         // bright bedroom, velvet sofa
  bedSunnyBay: "1499916078039-922301b0eb9b",           // sunny bay-window bedroom, plants

  // More interiors (dining, laundry, entry, library, hallway) — Michigan/Midwest
  diningTraditional: "1635108197332-54105c0ec888",     // traditional dining room, crystal chandelier
  laundryWhite: "1646592474094-342fbc28736c",          // bright white laundry room, utility sink
  entryStaircase: "1560185127-59e4420e2c93",           // entry hall, iron-baluster staircase
  libraryDen: "1739918075668-fc7844c6d921",            // warm wood-paneled home library / den
  hallwayClassic: "1771354959667-96360bf59eab",        // classic entry hall, wood + iron stairs

  // Offices / commercial
  officeOpenPlan: "1572521165329-b197f9ea3da6",        // bright open-plan office
  officeWorkstations: "1637665627832-dcd730049fbb",    // tidy white-desk workstations
  officeConferenceWood: "1497366811353-6870744d04b2",  // warm wood conference table
  officeConferenceBright: "1462826303086-329426d1aef5",// big bright conference room
} as const;

// Flat list for grids. Index-stable: do not reorder (RecentTransformations
// references specific indices). label is shown; sub is alt-text flavor only.
export const ALL_PHOTOS: { src: string; thumb: string; label: string; sub: string }[] = [
  { src: hero(ID.livingArchVaultGrey),   thumb: thumb(ID.livingArchVaultGrey),   label: "Living room", sub: "Standard · Ann Arbor" },
  { src: hero(ID.kitchenCreamNavy),      thumb: thumb(ID.kitchenCreamNavy),      label: "Kitchen",     sub: "Deep · Saline" },
  { src: hero(ID.bathFarmhouseVanity),   thumb: thumb(ID.bathFarmhouseVanity),   label: "Bathroom",    sub: "Deep · Dexter" },
  { src: hero(ID.bedBlueFourPoster),     thumb: thumb(ID.bedBlueFourPoster),     label: "Bedroom",     sub: "Biweekly · Chelsea" },
  { src: hero(ID.livingStoneFireplace),  thumb: thumb(ID.livingStoneFireplace),  label: "Living room", sub: "Weekly · Ypsilanti" },
  { src: hero(ID.kitchenFarmhouse),      thumb: thumb(ID.kitchenFarmhouse),      label: "Kitchen",     sub: "Standard · Saline" },
  { src: hero(ID.bathSubwayPedestal),    thumb: thumb(ID.bathSubwayPedestal),    label: "Bathroom",    sub: "Move-out · Milan" },
  { src: hero(ID.officeOpenPlan),        thumb: thumb(ID.officeOpenPlan),        label: "Office",      sub: "Recurring · Ann Arbor" },
  { src: hero(ID.bedGreyMaster),         thumb: thumb(ID.bedGreyMaster),         label: "Bedroom",     sub: "Weekly · Manchester" },
  { src: hero(ID.livingArchVaultBeige),  thumb: thumb(ID.livingArchVaultBeige),  label: "Living room", sub: "Biweekly · Pittsfield Twp" },
  { src: hero(ID.kitchenCreamGranite),   thumb: thumb(ID.kitchenCreamGranite),   label: "Kitchen",     sub: "Standard · Scio Twp" },
  { src: hero(ID.diningTraditional),     thumb: thumb(ID.diningTraditional),     label: "Dining room", sub: "Deep · Ann Arbor" },
  { src: hero(ID.livingMustardVintage),  thumb: thumb(ID.livingMustardVintage),  label: "Living room", sub: "Biweekly · Ypsilanti" },
  { src: hero(ID.bathMasterWood),        thumb: thumb(ID.bathMasterWood),        label: "Bathroom",    sub: "Deep · Whitmore Lake" },
  { src: hero(ID.kitchenCharcoal),       thumb: thumb(ID.kitchenCharcoal),       label: "Kitchen",     sub: "Move-out · Superior Twp" },
  { src: hero(ID.livingStoneCorner),     thumb: thumb(ID.livingStoneCorner),     label: "Living room", sub: "Standard · Saline" },
  { src: hero(ID.bedVelvetSofa),         thumb: thumb(ID.bedVelvetSofa),         label: "Bedroom",     sub: "Biweekly · Dexter" },
  { src: hero(ID.officeConferenceWood),  thumb: thumb(ID.officeConferenceWood),  label: "Office",      sub: "Recurring · Ann Arbor" },
  { src: hero(ID.livingWoodPanelFloral), thumb: thumb(ID.livingWoodPanelFloral), label: "Great room",  sub: "Deep · Chelsea" },
  { src: hero(ID.entryStaircase),        thumb: thumb(ID.entryStaircase),        label: "Entryway",    sub: "Move-out · Ann Arbor" },
  { src: hero(ID.bedSunnyBay),           thumb: thumb(ID.bedSunnyBay),           label: "Bedroom",     sub: "Deep · Manchester" },
  { src: hero(ID.livingTraditionalBrown),thumb: thumb(ID.livingTraditionalBrown),label: "Living room", sub: "Standard · Saline" },
  { src: hero(ID.laundryWhite),          thumb: thumb(ID.laundryWhite),          label: "Laundry room", sub: "Move-out · Ann Arbor" },
  { src: hero(ID.libraryDen),            thumb: thumb(ID.libraryDen),            label: "Home library", sub: "Standard · Ann Arbor" },
  { src: hero(ID.livingWhiteStone),      thumb: thumb(ID.livingWhiteStone),      label: "Living room", sub: "Weekly · Ann Arbor" },
  { src: hero(ID.hallwayClassic),        thumb: thumb(ID.hallwayClassic),        label: "Hallway",     sub: "Move-in · Dexter" },
  { src: hero(ID.officeWorkstations),    thumb: thumb(ID.officeWorkstations),    label: "Office",      sub: "Recurring · Ypsilanti" },
];

// PHOTOS retains the per-component named slots used across the site.
export const PHOTOS = {
  // Hero column photo + glass-card thumbnails
  hero: hero(ID.livingArchVaultGrey),
  heroAlt: "A bright, vaulted living room with a brick fireplace, freshly cleaned",
  heroThumb1: hero(ID.kitchenCreamNavy),
  heroThumb2: hero(ID.bathFarmhouseVanity),
  heroThumb3: hero(ID.bedBlueFourPoster),

  // Stats big photo tile + section-header photo
  statsBigTile: hero(ID.livingStoneFireplace),
  statsHeader: hero(ID.livingWhiteStone),

  // PhotoQuote
  photoQuote: hero(ID.livingArchVaultBeige),

  // AboutHero
  aboutHero: hero(ID.livingMustardVintage),

  // FAQ feature photo
  faqFeature: hero(ID.livingTraditionalBrown),

  // SubscriptionCallout 3-photo strip (kitchen, bathroom, bedroom)
  subOne: hero(ID.kitchenFarmhouse),
  subTwo: hero(ID.bathSubwayPedestal),
  subThree: hero(ID.bedGreyMaster),

  // FinalCTA 3-photo strip
  ctaOne: hero(ID.entryStaircase),
  ctaTwo: hero(ID.kitchenCreamGranite),
  ctaThree: hero(ID.libraryDen),

  // HowItWorks step strips
  step1a: hero(ID.kitchenCharcoal),
  step1b: hero(ID.bathSubwayPedestal),
  step2a: hero(ID.livingWhiteStone),
  step2b: hero(ID.livingArchVaultBeige),
  step3a: hero(ID.bedVelvetSofa),
  step3b: hero(ID.livingTraditionalBrown),

  // ServiceAreas HQ strip — 5 interior thumbnails
  hq1: thumb(ID.kitchenCreamGranite),
  hq2: thumb(ID.bathMasterWood),
  hq3: thumb(ID.livingWoodPanelFloral),
  hq4: thumb(ID.bedSunnyBay),
  hq5: thumb(ID.diningTraditional),

  // ServiceDetail per-tier photos (Standard / Deep / Move-out)
  standardHero: hero(ID.livingStoneFireplace),
  standardIncludes: hero(ID.kitchenCharcoal),
  deepHero: hero(ID.bathFarmhouseVanity),
  deepIncludes: hero(ID.livingArchVaultBeige),
  moveHero: hero(ID.livingStoneCorner),
  moveIncludes: hero(ID.bedVelvetSofa),

  // Office service page (commercial)
  officeHero: hero(ID.officeOpenPlan),
  officeWorkstations: hero(ID.officeWorkstations),
  officeConference: hero(ID.officeConferenceWood),
} as const;
