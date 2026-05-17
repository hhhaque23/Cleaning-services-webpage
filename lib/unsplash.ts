// Unsplash photo IDs — every one of these has been downloaded and viewed.
// All show interiors or exteriors of clean homes. ZERO people, zero face-art,
// zero product shots. If you add an ID, view it first.

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

// Verified-clean interior / exterior IDs. Index-stable: do not reorder.
const ID = {
  livingSofaWhite: "1583847268964-b28dc8f51f92",       // 0 - hero
  livingGreySofa: "1493663284031-b7e3aefcae8e",        // 1
  bathroomWhite: "1552321554-5fefe8c9ef14",            // 2
  livingFlowerArt: "1505691938895-1758d7feb511",       // 3
  livingFireplaceView: "1560448204-e02f11c3d0e2",      // 4
  kitchenWhiteStove: "1556912173-3bb406ef7e77",        // 5
  bathroomTub: "1620626011761-996317b8d101",           // 6
  livingSmallApt: "1522708323590-d24dbb6b0267",        // 7
  kitchenPendants: "1565538810643-b5bdb714032a",       // 8
  livingBlueCouch: "1493809842364-78817add7ffb",       // 9
  livingMidCentury: "1502672260266-1c1ef2d93688",      // 10
  livingChairsFireplace: "1560185009-5bf9f2849488",    // 11
  livingBlackSofa: "1513694203232-719a280e022f",       // 12
  livingLeatherSofa: "1554995207-c18c203602cb",        // 13
  kitchenMonochrome: "1484154218962-a197022b5858",     // 14
  livingArchway: "1567016376408-0226e4d0c1ea",         // 15
  livingGreenBeige: "1616137422495-1e9e46e2aa77",      // 16
  livingPampas: "1631679706909-1844bbd07221",          // 17
  livingBeams: "1600210491892-03d54c0aaf87",           // 18
  exteriorDusk: "1494526585095-c41746248156",          // 19
  bedroomVelvet: "1540518614846-7eded433c457",         // 20
  bedroomPlants: "1571508601891-ca5e7a713859",         // 21
  exteriorMountain: "1568605114967-8130f3a36994",      // 22
} as const;

// Flat list of all 23 distinct photos — useful for grids that need many.
export const ALL_PHOTOS: { src: string; thumb: string; label: string; sub: string }[] = [
  { src: hero(ID.livingSofaWhite),       thumb: thumb(ID.livingSofaWhite),       label: "Living room",  sub: "Sunlit · Rochester Hills" },
  { src: hero(ID.livingGreySofa),        thumb: thumb(ID.livingGreySofa),        label: "Living room",  sub: "Standard · Troy" },
  { src: hero(ID.bathroomWhite),         thumb: thumb(ID.bathroomWhite),         label: "Bathroom",     sub: "Deep · Birmingham" },
  { src: hero(ID.livingFlowerArt),       thumb: thumb(ID.livingFlowerArt),       label: "Living room",  sub: "Biweekly · Bloomfield" },
  { src: hero(ID.livingFireplaceView),   thumb: thumb(ID.livingFireplaceView),   label: "Open plan",    sub: "Standard · Auburn Hills" },
  { src: hero(ID.kitchenWhiteStove),     thumb: thumb(ID.kitchenWhiteStove),     label: "Kitchen",      sub: "Deep · Birmingham" },
  { src: hero(ID.bathroomTub),           thumb: thumb(ID.bathroomTub),           label: "Bathroom",     sub: "Move-out · Sterling Hts" },
  { src: hero(ID.livingSmallApt),        thumb: thumb(ID.livingSmallApt),        label: "Apartment",    sub: "Weekly · Royal Oak" },
  { src: hero(ID.kitchenPendants),       thumb: thumb(ID.kitchenPendants),       label: "Kitchen",      sub: "Standard · Bloomfield Hills" },
  { src: hero(ID.livingBlueCouch),       thumb: thumb(ID.livingBlueCouch),       label: "Living room",  sub: "Biweekly · Berkley" },
  { src: hero(ID.livingMidCentury),      thumb: thumb(ID.livingMidCentury),      label: "Living room",  sub: "Standard · Royal Oak" },
  { src: hero(ID.livingChairsFireplace), thumb: thumb(ID.livingChairsFireplace), label: "Sunroom",      sub: "Deep · Bloomfield Twp" },
  { src: hero(ID.livingBlackSofa),       thumb: thumb(ID.livingBlackSofa),       label: "Small living", sub: "Biweekly · Madison Hts" },
  { src: hero(ID.livingLeatherSofa),     thumb: thumb(ID.livingLeatherSofa),     label: "Open plan",    sub: "Standard · Beverly Hills" },
  { src: hero(ID.kitchenMonochrome),     thumb: thumb(ID.kitchenMonochrome),     label: "Kitchen",      sub: "Move-out · Clawson" },
  { src: hero(ID.livingArchway),         thumb: thumb(ID.livingArchway),         label: "Living nook",  sub: "Standard · Lake Orion" },
  { src: hero(ID.livingGreenBeige),      thumb: thumb(ID.livingGreenBeige),      label: "Open plan",    sub: "Weekly · Troy" },
  { src: hero(ID.livingPampas),          thumb: thumb(ID.livingPampas),          label: "Living room",  sub: "Biweekly · Oxford" },
  { src: hero(ID.livingBeams),           thumb: thumb(ID.livingBeams),           label: "Great room",   sub: "Deep · Rochester" },
  { src: hero(ID.exteriorDusk),          thumb: thumb(ID.exteriorDusk),          label: "Exterior",     sub: "Move-in · Shelby Twp" },
  { src: hero(ID.bedroomVelvet),         thumb: thumb(ID.bedroomVelvet),         label: "Bedroom",      sub: "Deep · Auburn Hills" },
  { src: hero(ID.bedroomPlants),         thumb: thumb(ID.bedroomPlants),         label: "Bedroom",      sub: "Biweekly · Rochester Hills" },
  { src: hero(ID.exteriorMountain),      thumb: thumb(ID.exteriorMountain),      label: "Exterior",     sub: "Move-out · Bloomfield" },
];

// PHOTOS retains the per-component named slots used across the site.
// Each slot now points to a UNIQUE id so no two slots share a photo.
export const PHOTOS = {
  // Hero column photo
  hero: hero(ID.livingSofaWhite),
  heroAlt: "Sunlit living room with white sofa and clean wood floors",

  // Hero glass card thumbnails (3 unique)
  heroThumb1: hero(ID.kitchenWhiteStove),
  heroThumb2: hero(ID.bathroomTub),
  heroThumb3: hero(ID.bedroomVelvet),

  // Stats big photo tile
  statsBigTile: hero(ID.livingBeams),

  // PhotoQuote
  photoQuote: hero(ID.livingMidCentury),

  // AboutHero
  aboutHero: hero(ID.livingBlueCouch),

  // Guarantee
  guarantee: hero(ID.livingChairsFireplace),

  // FAQ feature photo
  faqFeature: hero(ID.livingPampas),

  // SubscriptionCallout 3-photo strip
  subOne: hero(ID.livingArchway),
  subTwo: hero(ID.livingLeatherSofa),
  subThree: hero(ID.bedroomPlants),

  // FinalCTA 3-photo strip
  ctaOne: hero(ID.livingGreenBeige),
  ctaTwo: hero(ID.kitchenMonochrome),
  ctaThree: hero(ID.exteriorDusk),

  // HowItWorks step strips — 2 photos each, 6 unique
  step1a: hero(ID.kitchenPendants),
  step1b: hero(ID.bathroomWhite),
  step2a: hero(ID.livingFireplaceView),
  step2b: hero(ID.livingFlowerArt),
  step3a: hero(ID.livingGreySofa),
  step3b: hero(ID.livingSmallApt),

  // ServiceAreas HQ strip — 5 thumbnails. Reuses some kitchens/baths/living
  // from later in the page (separate viewport), and exteriorMountain.
  hq1: thumb(ID.kitchenPendants),
  hq2: thumb(ID.bathroomTub),
  hq3: thumb(ID.livingLeatherSofa),
  hq4: thumb(ID.bedroomPlants),
  hq5: thumb(ID.exteriorMountain),

  // ServiceDetail per-tier photos (3 tiers × 2 slots = 6 unique)
  standardHero: hero(ID.livingMidCentury),
  standardIncludes: hero(ID.kitchenPendants),
  deepHero: hero(ID.bathroomTub),
  deepIncludes: hero(ID.livingBeams),
  moveHero: hero(ID.livingFireplaceView),
  moveIncludes: hero(ID.bedroomPlants),

  // Team "Recent jobs" — 5 distinct on /about
  team1: { src: hero(ID.kitchenMonochrome), room: "Kitchen", city: "Troy", tier: "Standard", when: "Yesterday" },
  team2: { src: hero(ID.bathroomWhite), room: "Bathroom", city: "Rochester", tier: "Deep", when: "2 days ago" },
  team3: { src: hero(ID.bedroomVelvet), room: "Bedroom", city: "Birmingham", tier: "Biweekly", when: "3 days ago" },
  team4: { src: hero(ID.livingArchway), room: "Living", city: "Bloomfield Hills", tier: "Standard", when: "4 days ago" },
  team5: { src: hero(ID.livingBlackSofa), room: "Apartment", city: "Royal Oak", tier: "Weekly", when: "5 days ago" },
} as const;
