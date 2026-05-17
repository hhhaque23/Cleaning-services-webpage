// Unsplash URLs tuned for weight vs. clarity at the rendered breakpoints.
// auto=format gives AVIF/WebP when supported. w=N is the upstream resize.

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

// Curated home / interior photo IDs from Unsplash. Each one is distinct.
const HOME_IDS = {
  hero: "1583847268964-b28dc8f51f92",        // sunlit living room
  livingRoom: "1493663284031-b7e3aefcae8e",  // neutral living room
  bathroom: "1552321554-5fefe8c9ef14",       // bright bathroom
  bedroom: "1505691938895-1758d7feb511",     // morning bedroom
  emptyRoom: "1560448204-e02f11c3d0e2",      // empty room
  kitchen: "1556909114-f6e7ad7d3136",        // bright modern kitchen
  kitchenAlt: "1556912173-3bb406ef7e77",     // white kitchen counter
  diningRoom: "1574180566232-aaad1b5b8450",  // dining table light
  bathroomAlt: "1620626011761-996317b8d101", // tiled bathroom
  bedroomAlt: "1522708323590-d24dbb6b0267",  // bedroom warm light
  hallway: "1565183997392-2f6f122e5912",     // hallway
  loungeCorner: "1565538810643-b5bdb714032a", // bright corner interior
  windowSeat: "1493809842364-78817add7ffb",  // window seat light
  livingRoomAlt: "1502672260266-1c1ef2d93688", // mid-century living
  bathroomBright: "1560185009-5bf9f2849488", // bright bathroom alt
} as const;

export const PHOTOS = {
  hero: hero(HOME_IDS.hero),
  heroAlt: "Sunlit living room with white sofa and clean wood floors",

  kitchen: hero(HOME_IDS.kitchen),
  kitchenAlt: hero(HOME_IDS.kitchenAlt),
  bathroom: hero(HOME_IDS.bathroom),
  bathroomAlt: hero(HOME_IDS.bathroomAlt),
  bathroomBright: hero(HOME_IDS.bathroomBright),
  bedroom: hero(HOME_IDS.bedroom),
  bedroomAlt: hero(HOME_IDS.bedroomAlt),
  livingRoom: hero(HOME_IDS.livingRoom),
  livingRoomAlt: hero(HOME_IDS.livingRoomAlt),
  emptyRoom: hero(HOME_IDS.emptyRoom),
  diningRoom: hero(HOME_IDS.diningRoom),
  hallway: hero(HOME_IDS.hallway),
  loungeCorner: hero(HOME_IDS.loungeCorner),
  windowSeat: hero(HOME_IDS.windowSeat),

  // Smaller thumbnails for backdrop collage usage.
  collage: {
    kitchen: thumb(HOME_IDS.kitchen),
    kitchenAlt: thumb(HOME_IDS.kitchenAlt),
    bathroom: thumb(HOME_IDS.bathroom),
    bathroomAlt: thumb(HOME_IDS.bathroomAlt),
    bathroomBright: thumb(HOME_IDS.bathroomBright),
    bedroom: thumb(HOME_IDS.bedroom),
    bedroomAlt: thumb(HOME_IDS.bedroomAlt),
    livingRoom: thumb(HOME_IDS.livingRoom),
    livingRoomAlt: thumb(HOME_IDS.livingRoomAlt),
    diningRoom: thumb(HOME_IDS.diningRoom),
    hallway: thumb(HOME_IDS.hallway),
    loungeCorner: thumb(HOME_IDS.loungeCorner),
    windowSeat: thumb(HOME_IDS.windowSeat),
  },

  team: [
    {
      name: "Maya R.",
      role: "Lead cleaner · 4 yrs",
      photo: portrait("1494790108377-be9c29b29330"),
    },
    {
      name: "Jordan T.",
      role: "Deep clean specialist · 3 yrs",
      photo: portrait("1531123897727-8f129e1688ce"),
    },
    {
      name: "Priya S.",
      role: "Move-in/out · 5 yrs",
      photo: portrait("1607746882042-944635dfe10e"),
    },
    {
      name: "Marcus L.",
      role: "Recurring maintenance · 2 yrs",
      photo: portrait("1500648767791-00dcc994a43e"),
    },
    {
      name: "Sofia K.",
      role: "Eco specialist · 3 yrs",
      photo: portrait("1573496359142-b8d87734a5a2"),
    },
  ],

  reviewers: {
    sarah: avatar("1438761681033-6461ffad8d80"),
    daniel: avatar("1507003211169-0a1dd7228f2d"),
    lena: avatar("1544005313-94ddf0286df2"),
    aman: avatar("1506794778202-cad84cf45f1d"),
    chloe: avatar("1554151228-14d9def656e4"),
    nathan: avatar("1539571696357-5a69c17a67c6"),
    rachel: avatar("1487412720507-e7ab37603c6f"),
    omar: avatar("1500648767791-00dcc994a43e"),
  },

  // mid-size used by section feature photos
  midKitchen: mid(HOME_IDS.kitchen),
  midDining: mid(HOME_IDS.diningRoom),
} as const;
