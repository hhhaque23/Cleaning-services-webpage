// Unsplash photo IDs — every one of these has been downloaded and viewed.
// Theme: traditional MICHIGAN / Midwest-suburban homes (brick colonials, warm
// wood, classic interiors, fall/winter exteriors) + real OFFICES. ZERO people,
// zero faces, zero product shots, zero readable text/brand. If you add an ID,
// download and view it first, and check it crops well at the slot's aspect.

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

// Verified traditional Midwest interiors/exteriors + offices.
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

  // Exteriors (Michigan suburban)
  extStoneColonial: "1688307193832-a6f711942705",      // stone/brick colonial, white columns
  extBrickPorch: "1601041597271-71988152f98b",         // red brick, white columned porch
  extCraftsmanFall: "1605450195878-3b5c4e70163c",      // craftsman in autumn foliage
  extBrickTurret: "1635823316459-dcdf55edb133",        // red brick home with turret
  extSnowClapboard: "1520099823969-e9c747f601a4",      // white clapboard house in snow

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
  { src: hero(ID.extStoneColonial),      thumb: thumb(ID.extStoneColonial),      label: "Exterior",    sub: "Move-in · Ann Arbor" },
  { src: hero(ID.livingMustardVintage),  thumb: thumb(ID.livingMustardVintage),  label: "Living room", sub: "Biweekly · Ypsilanti" },
  { src: hero(ID.bathMasterWood),        thumb: thumb(ID.bathMasterWood),        label: "Bathroom",    sub: "Deep · Whitmore Lake" },
  { src: hero(ID.kitchenCharcoal),       thumb: thumb(ID.kitchenCharcoal),       label: "Kitchen",     sub: "Move-out · Superior Twp" },
  { src: hero(ID.livingStoneCorner),     thumb: thumb(ID.livingStoneCorner),     label: "Living room", sub: "Standard · Saline" },
  { src: hero(ID.bedVelvetSofa),         thumb: thumb(ID.bedVelvetSofa),         label: "Bedroom",     sub: "Biweekly · Dexter" },
  { src: hero(ID.officeConferenceWood),  thumb: thumb(ID.officeConferenceWood),  label: "Office",      sub: "Recurring · Ann Arbor" },
  { src: hero(ID.livingWoodPanelFloral), thumb: thumb(ID.livingWoodPanelFloral), label: "Great room",  sub: "Deep · Chelsea" },
  { src: hero(ID.extCraftsmanFall),      thumb: thumb(ID.extCraftsmanFall),      label: "Exterior",    sub: "Move-out · Ann Arbor" },
  { src: hero(ID.bedSunnyBay),           thumb: thumb(ID.bedSunnyBay),           label: "Bedroom",     sub: "Deep · Manchester" },
  { src: hero(ID.livingTraditionalBrown),thumb: thumb(ID.livingTraditionalBrown),label: "Living room", sub: "Standard · Saline" },
  { src: hero(ID.extBrickTurret),        thumb: thumb(ID.extBrickTurret),        label: "Exterior",    sub: "Move-out · Ann Arbor" },
  { src: hero(ID.extBrickPorch),         thumb: thumb(ID.extBrickPorch),         label: "Exterior",    sub: "Standard · Ann Arbor" },
  { src: hero(ID.livingWhiteStone),      thumb: thumb(ID.livingWhiteStone),      label: "Living room", sub: "Weekly · Ann Arbor" },
  { src: hero(ID.extSnowClapboard),      thumb: thumb(ID.extSnowClapboard),      label: "Exterior",    sub: "Move-in · Dexter" },
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

  // Guarantee
  guarantee: hero(ID.livingStoneCorner),

  // FAQ feature photo
  faqFeature: hero(ID.livingTraditionalBrown),

  // SubscriptionCallout 3-photo strip (kitchen, bathroom, bedroom)
  subOne: hero(ID.kitchenFarmhouse),
  subTwo: hero(ID.bathSubwayPedestal),
  subThree: hero(ID.bedGreyMaster),

  // FinalCTA 3-photo strip
  ctaOne: hero(ID.extCraftsmanFall),
  ctaTwo: hero(ID.kitchenCreamGranite),
  ctaThree: hero(ID.extBrickPorch),

  // HowItWorks step strips
  step1a: hero(ID.kitchenCharcoal),
  step1b: hero(ID.bathSubwayPedestal),
  step2a: hero(ID.livingWhiteStone),
  step2b: hero(ID.livingArchVaultBeige),
  step3a: hero(ID.bedVelvetSofa),
  step3b: hero(ID.livingTraditionalBrown),

  // ServiceAreas HQ strip — 5 thumbnails (hq5 is a Michigan exterior)
  hq1: thumb(ID.kitchenCreamGranite),
  hq2: thumb(ID.bathMasterWood),
  hq3: thumb(ID.livingWoodPanelFloral),
  hq4: thumb(ID.bedSunnyBay),
  hq5: thumb(ID.extStoneColonial),

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
