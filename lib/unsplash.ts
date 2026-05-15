// Higher-quality Unsplash URLs. w=2400 gives crisp retina rendering for hero
// crops; q=85 trades a small bandwidth bump for visibly sharper grain.
// Avatars at w=400 stay small (faces only need ~40px display).

const hero = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2400&q=85`;
const portrait = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=85`;
const avatar = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=400&q=85`;

export const PHOTOS = {
  hero: hero("1583847268964-b28dc8f51f92"),
  heroAlt: "Sunlit living room with white sofa and clean wood floors",

  kitchen: hero("1556909114-f6e7ad7d3136"),
  bathroom: hero("1552321554-5fefe8c9ef14"),
  bedroom: hero("1505691938895-1758d7feb511"),
  livingRoom: hero("1493663284031-b7e3aefcae8e"),
  emptyRoom: hero("1560448204-e02f11c3d0e2"),

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
} as const;
