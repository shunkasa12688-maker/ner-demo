/**
 * Image URLs sourced from the official New England Revolution site
 * (https://www.revolutionsoccer.net) — hosted on the MLS Cloudinary CDN at
 * images.mlssoccer.com. Hot-linked here for an educational class-consulting
 * prototype with attribution in the fan-page footer. The URLs are real
 * soccer / NER content, which fixes the earlier problem of random Unsplash
 * IDs returning the wrong sport.
 *
 * Replace these freely as the site rotates its hero photos.
 */
const ner = (publicId: string, w = 1200) =>
  `https://images.mlssoccer.com/image/private/c_fill,w_${w},f_auto,q_auto/${publicId}`;

// Editorial / hero photographs scraped from revolutionsoccer.net
const EDITORIAL_HERO = ner("mls-ner/rhkoib1klaeqkvyp6ahw", 1600);
const EDITORIAL_SCHEDULE = ner("v1773777619/mls-ner/gso0carnwdwckpor7m5f", 1600);

// Larger, 16:9-cropped variants for full-bleed rotating hero background
const heroBg = (publicId: string) =>
  `https://images.mlssoccer.com/image/private/c_fill,w_1920,h_1080,g_auto,f_auto,q_auto/${publicId}`;

export const HERO_BG: string[] = [
  heroBg("mls-ner/rhkoib1klaeqkvyp6ahw"),
  heroBg("v1773777619/mls-ner/gso0carnwdwckpor7m5f"),
  heroBg("mls-ner/lcxcumzlhghqvx7ny64x"),
  heroBg("mls-ner/pzds0kv915uj1n3fh04u"),
  heroBg("v1777908917/mls-ner/l70vltemlbr6mgh3g4hs"),
];

// Promo banners (keep-aspect-ratio art) — used as tile backgrounds where
// editorial photos aren't a fit
const BANNER_A = ner("mls-ner/lcxcumzlhghqvx7ny64x", 1200);
const BANNER_B = ner("mls-ner/pzds0kv915uj1n3fh04u", 1200);
const BANNER_C = ner("mls-ner/u8b57zrjjfejilkahau4", 1200);
const BANNER_D = ner("v1777908917/mls-ner/l70vltemlbr6mgh3g4hs", 1200);
const BANNER_E = ner("mls-ner-prd/sxw45yw7eqyaqm4gmvpr", 1200);

// Hero images per intervention
export const HERO = {
  quiz: BANNER_D,
  reaction: EDITORIAL_HERO,
  event: BANNER_B,
  wc: EDITORIAL_SCHEDULE,
  postwc: BANNER_A,
};

// Smaller tile images for inline cards
export const TILE = {
  goal: EDITORIAL_HERO,
  save: EDITORIAL_SCHEDULE,
  fans: BANNER_A,
  crowd: EDITORIAL_HERO,
  boston: BANNER_C,
  bar: BANNER_E,
  ball: BANNER_B,

  brazil: BANNER_C,
  argentina: BANNER_D,
  usa: BANNER_E,

  player1: BANNER_A,
  player2: BANNER_B,
  player3: BANNER_C,

  watchparty: BANNER_E,
  pickup: BANNER_D,
};

export const NEWS = {
  recap: EDITORIAL_HERO,
  feature: EDITORIAL_SCHEDULE,
  community: BANNER_A,
  academy: BANNER_C,
};

/**
 * Optional next-iteration upgrade: if you set FIRECRAWL_API_KEY and run
 * `npm run fetch:images`, scripts/fetch-images.mjs will use the Firecrawl
 * scrape API to refresh this list with the latest editorial photos.
 */
