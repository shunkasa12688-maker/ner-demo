/**
 * Image URLs hot-linked from two sources, both for educational
 * non-commercial use with attribution in the fan-page footer:
 *
 *   1. revolutionsoccer.net → images.mlssoccer.com (MLS Cloudinary CDN).
 *      Scraped from the homepage and schedule pages. Editorial photos and
 *      promotional banners published by the club.
 *
 *   2. commons.wikimedia.org → upload.wikimedia.org.
 *      Public-domain / CC-licensed photos of Gillette Stadium and a
 *      classic Soccerball.svg. Verified via the Wikimedia imageinfo API.
 *
 * HERO_SETS maps each intervention kind to its themed background rotation,
 * so the fan-page hero changes character with the cockpit's diagnosis.
 */
import type { InterventionKind } from "./../../lib/playbook";

const ner = (publicId: string, w = 1920, h = 1080) =>
  `https://images.mlssoccer.com/image/private/c_fill,w_${w},h_${h},g_auto,f_auto,q_auto/${publicId}`;

// ───── NER (revolutionsoccer.net via MLS Cloudinary) ─────
const NER_EDITORIAL_HERO = ner("mls-ner/rhkoib1klaeqkvyp6ahw");
const NER_EDITORIAL_SCHEDULE = ner("v1773777619/mls-ner/gso0carnwdwckpor7m5f");
const NER_PORTRAIT = ner("mls-ner/fvayfzuvf4jklhurdb2c");

const NER_BANNER_A = ner("mls-ner/lcxcumzlhghqvx7ny64x");
const NER_BANNER_B = ner("mls-ner/pzds0kv915uj1n3fh04u");
const NER_BANNER_C = ner("v1779801726/mls-ner/u8b57zrjjfejilkahau4");
const NER_BANNER_D = ner("v1777908917/mls-ner/l70vltemlbr6mgh3g4hs");
const NER_BANNER_E = ner("mls-ner-prd/sxw45yw7eqyaqm4gmvpr");

// ───── Wikimedia Commons (public domain / CC) ─────
const WM_STADIUM_AERIAL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Gillette_Stadium02.jpg/1920px-Gillette_Stadium02.jpg";
const WM_STADIUM_SUNSET =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Gillette_Stadium_Sunset%2C_7.06.2013.jpg/1920px-Gillette_Stadium_Sunset%2C_7.06.2013.jpg";
const WM_MATCH_IN_PROGRESS =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/New_England_Revolution_Game%3B_7.06.2013%3B_745pm.JPG/1920px-New_England_Revolution_Game%3B_7.06.2013%3B_745pm.JPG";
const WM_STADIUM_OUTDOOR =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Gillette_Stadium_Outdoor.jpg/1920px-Gillette_Stadium_Outdoor.jpg";
const WM_STADIUM_FOXBORO =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Gillette_Stadium_Foxborough.jpg/1920px-Gillette_Stadium_Foxborough.jpg";
const WM_SOCCERBALL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Soccerball.svg/1920px-Soccerball.svg.png";

// ───── Per-category background sets ─────
/**
 * Each intervention kind gets its own ordered rotation. When the cockpit
 * picks a different intervention (rule output or manual override), the
 * fan-page <RotatingHero> swaps to the matching set.
 *
 * Theming intent (cannot be visually confirmed from URLs, picked by name):
 *   - quiz          → pre-match anticipation; stadium exterior + ball
 *   - reaction-hub  → in-action match shots + editorial hero
 *   - event-invite  → community / portrait / outdoor gathering feel
 *   - wc-hub        → big stage; aerial stadium + editorial
 *   - post-wc-nudge → golden hour / nostalgic / what-comes-next
 */
export const HERO_SETS: Record<InterventionKind, string[]> = {
  quiz: [
    WM_SOCCERBALL,
    NER_BANNER_D,
    WM_STADIUM_FOXBORO,
    NER_EDITORIAL_HERO,
  ],
  "reaction-hub": [
    WM_MATCH_IN_PROGRESS,
    NER_EDITORIAL_HERO,
    NER_EDITORIAL_SCHEDULE,
    NER_BANNER_B,
  ],
  "event-invite": [
    NER_PORTRAIT,
    WM_STADIUM_OUTDOOR,
    NER_BANNER_A,
    NER_BANNER_C,
  ],
  "wc-hub": [
    WM_STADIUM_AERIAL,
    NER_EDITORIAL_HERO,
    NER_EDITORIAL_SCHEDULE,
    NER_BANNER_E,
  ],
  "post-wc-nudge": [
    WM_STADIUM_SUNSET,
    NER_PORTRAIT,
    WM_STADIUM_FOXBORO,
    NER_BANNER_C,
  ],
};

// Default rotation (used as a fallback / pre-state-load)
export const HERO_BG: string[] = HERO_SETS["reaction-hub"];

// Smaller-ratio tiles used inline by intervention components
export const HERO = {
  quiz: NER_BANNER_D,
  reaction: NER_EDITORIAL_HERO,
  event: NER_BANNER_B,
  wc: NER_EDITORIAL_SCHEDULE,
  postwc: NER_BANNER_A,
};

export const TILE = {
  goal: NER_EDITORIAL_HERO,
  save: NER_EDITORIAL_SCHEDULE,
  fans: NER_BANNER_A,
  crowd: WM_MATCH_IN_PROGRESS,
  boston: NER_BANNER_C,
  bar: NER_BANNER_E,
  ball: WM_SOCCERBALL,

  brazil: NER_BANNER_C,
  argentina: NER_BANNER_D,
  usa: NER_BANNER_E,

  player1: NER_PORTRAIT,
  player2: NER_BANNER_B,
  player3: NER_BANNER_C,

  watchparty: NER_BANNER_E,
  pickup: NER_BANNER_D,
};

export const NEWS = {
  recap: NER_EDITORIAL_HERO,
  feature: NER_EDITORIAL_SCHEDULE,
  community: NER_BANNER_A,
  academy: NER_BANNER_C,
};
