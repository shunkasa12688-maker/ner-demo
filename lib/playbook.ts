import type {
  Bottleneck,
  CatalogEntry,
  InterventionKind,
  Segment,
  TimeWindow,
} from "./types";

export type { InterventionKind };

/**
 * Reason templates are code (not user-editable) because they substitute
 * runtime context like the segment cluster town. The editable text in the
 * cockpit's catalog is the `whyDefault` field of each CatalogEntry — used
 * directly when the template doesn't have segment-specific substitution.
 */
type ReasonCtx = { segment: Segment; whyDefault: string };

export const REASON_TEMPLATES: Record<InterventionKind, (ctx: ReasonCtx) => string> = {
  quiz: ({ whyDefault }) => whyDefault,
  "reaction-hub": ({ whyDefault }) => whyDefault,
  "event-invite": ({ segment, whyDefault }) => {
    const town = segment.localCluster?.town;
    if (!town) return whyDefault;
    return whyDefault.replace("{town}", town);
  },
  "wc-hub": ({ whyDefault }) => whyDefault,
  "post-wc-nudge": ({ whyDefault }) => whyDefault,
  "sponsor-premium": ({ whyDefault }) => whyDefault,
  "ticket-conversion": ({ whyDefault }) => whyDefault,
  "merchandise-uplift": ({ whyDefault }) => whyDefault,
  "marketing-savings": ({ whyDefault }) => whyDefault,
  "dynamic-pricing": ({ whyDefault }) => whyDefault,
  "insight-poll": ({ whyDefault }) => whyDefault,
  "wc-sponsor-rally": ({ whyDefault }) => whyDefault,
  "wc-merch-drop": ({ whyDefault }) => whyDefault,
  "wc-data-pitch": ({ whyDefault }) => whyDefault,
};

/**
 * The built-in fallback catalog. The cockpit can edit any of these via
 * `/api/catalog`; edits are persisted to `data/catalog.json`. If the user
 * `npm run reset`s, the catalog returns to this fallback.
 *
 * Adding a 6th intervention is one entry here + one component file +
 * one rule in selectIntervention() + one item in ROUTING_RULES.
 */
export const BUILTIN_CATALOG: CatalogEntry[] = [
  {
    kind: "quiz",
    title: "Match Prediction Quiz",
    blurb:
      "A quick game before kickoff — predict the final score, come back after to see how you did.",
    whyDefault:
      "Match day's coming. Take 30 seconds to predict the score, then come back after the whistle to see how it played out.",
  },
  {
    kind: "reaction-hub",
    title: "Post-Match Reactions",
    blurb:
      "What fans are saying after the match — quick votes, hot takes, and how the night actually played out.",
    whyDefault:
      "The match is done. Here's what the rest of the crowd thought — and your turn to weigh in.",
  },
  {
    kind: "event-invite",
    title: "Watch Party Invite",
    blurb:
      "An invite to watch the match with other Revs fans in your neighborhood. Free, no signup, first drink on us.",
    whyDefault:
      "There's a watch party in {town} this weekend. Big screen, cold drinks, the match on at kickoff — bring a friend, first drink on us.",
  },
  {
    kind: "wc-hub",
    title: "World Cup at Gillette",
    blurb:
      "What's happening at Gillette this week — match schedule, the Revs angle, and where to watch with friends.",
    whyDefault:
      "The World Cup is here. Boston is hosting. Here's what's happening at Gillette this week.",
  },
  {
    kind: "post-wc-nudge",
    title: "After the World Cup",
    blurb:
      "Once the tournament wraps — a reminder of what's coming back to Gillette this fall, picked for fans who showed up in June.",
    whyDefault:
      "You were here in June for the tournament. The season starts back up at Gillette this fall — here's what's coming.",
  },
  {
    kind: "sponsor-premium",
    title: "Meet Our Partners",
    blurb:
      "Three local brands the Revs partner with — and the offers they've put together for fans like you.",
    whyDefault:
      "These are the brands that back the Revs. They've put together offers picked for you, not the catalog everyone else sees.",
  },
  {
    kind: "ticket-conversion",
    title: "Renew Your Seat",
    blurb:
      "Pick up where you left off — your last match, the next home match, and a simple way to renew without re-signing up.",
    whyDefault:
      "Your seat is still here. Here's the next match at Gillette and what renewing costs from today.",
  },
  {
    kind: "merchandise-uplift",
    title: "Made For You",
    blurb:
      "Three pieces of merch picked for you, not the whole catalog — based on what we know about your stripe of being a fan.",
    whyDefault:
      "Three pieces we think you'd actually wear. Skip the rest — the other 200 aren't built for you.",
  },
  {
    kind: "marketing-savings",
    title: "Right Place, Right Fan",
    blurb:
      "You're seeing this because the system picked you — not because we blanketed all of Greater Boston. Pass it along if it fits.",
    whyDefault:
      "You're here because we picked you out, not blanketed every Boston address. If this fits, share it with one person.",
  },
  {
    kind: "dynamic-pricing",
    title: "Personal Ticket Offer",
    blurb:
      "A ticket price built for you — based on where you sat last time and what you usually pay. Better than the walk-up rate.",
    whyDefault:
      "Here's a ticket price built for you — based on your last seat and what you usually pay. Better than the walk-up rate.",
  },
  {
    kind: "insight-poll",
    title: "Quick Match Feedback",
    blurb:
      "Three quick questions about tonight at Gillette. Your answers go to the people who shape matchday — they fix what doesn't work.",
    whyDefault:
      "Three questions, 30 seconds. Your answers go straight to the people who fix matchday — they listen.",
  },
  {
    kind: "wc-sponsor-rally",
    title: "Meet Our World Cup Partners",
    blurb:
      "The local brands joining the Revs for the tournament — and the offers they're running for fans this summer.",
    whyDefault:
      "These are the brands joining the Revs for the tournament. They've put together offers built specifically for fans like you — not generic ads.",
  },
  {
    kind: "wc-merch-drop",
    title: "World Cup Merch Picks",
    blurb:
      "Three limited-edition pieces picked for you — scarves, kits, and pins made only for the tournament window.",
    whyDefault:
      "Three World Cup pieces picked for you. Limited to the tournament — once they're gone, they're gone.",
  },
  {
    kind: "wc-data-pitch",
    title: "Your World Cup Guide",
    blurb:
      "Everything you need to know about the World Cup in Boston — when it's happening, where, and how to be part of it.",
    whyDefault:
      "The World Cup is here. Seven matches at Gillette, three Revs on rosters, and one summer of soccer in your city. Here's what to know.",
  },
];

/** Build a kind-keyed map from a (possibly partial) catalog array. */
export function resolveCatalog(
  catalog: CatalogEntry[] | null | undefined,
): Record<InterventionKind, CatalogEntry> {
  const merged: Record<InterventionKind, CatalogEntry> = Object.fromEntries(
    BUILTIN_CATALOG.map((e) => [e.kind, e]),
  ) as Record<InterventionKind, CatalogEntry>;
  for (const entry of catalog ?? []) {
    if (entry?.kind) merged[entry.kind] = { ...merged[entry.kind], ...entry };
  }
  return merged;
}

export interface PlaybookResult {
  kind: InterventionKind;
  entry: CatalogEntry;
  why: string;
  ruleText: string;
}

/**
 * Rule table: bottleneck × local-cluster × time-window → one of 5 kinds.
 * Returns the catalog entry for that kind + the rule text + the substituted "why".
 */
export function selectIntervention(args: {
  bottleneck: Bottleneck;
  segment: Segment;
  timeWindow: TimeWindow;
  catalog: Record<InterventionKind, CatalogEntry>;
}): PlaybookResult {
  const { bottleneck, segment, timeWindow, catalog } = args;

  let kind: InterventionKind;
  let ruleText: string;

  if (bottleneck === "heat") {
    kind = "quiz";
    ruleText = "Heat → Match Prediction Quiz";
  } else if (bottleneck === "growth") {
    if (segment.localCluster) {
      kind = "event-invite";
      ruleText = "Growth + local cluster → Local Fan-Session Event Invite";
    } else {
      kind = "reaction-hub";
      ruleText = 'Growth (no local cluster) → "Last Night" Reaction Hub';
    }
  } else if (timeWindow === "during-wc") {
    kind = "wc-hub";
    ruleText = "Retention + during-WC → World Cup Hub";
  } else {
    kind = "post-wc-nudge";
    ruleText = "Retention + (before|after)-WC → Post-Spike Re-engagement";
  }

  const entry = catalog[kind];
  const why = REASON_TEMPLATES[kind]({ segment, whyDefault: entry.whyDefault });
  return { kind, entry, why, ruleText };
}

/**
 * Per-playbook hero copy for the standard /fan page. The hero swaps
 * as soon as a playbook becomes active (either by rule or by manual
 * override from the cockpit) so the audience sees an immediate change.
 *
 * `lines[2]` (the last line) is rendered with the accent colour so each
 * headline lands with a visible payoff word. Eyebrow is the small pill
 * caption above the headline.
 */
export interface PlaybookHero {
  eyebrow: string;
  lines: [string, string, string];
}

export const PLAYBOOK_HEROES: Record<InterventionKind, PlaybookHero> = {
  quiz: {
    eyebrow: "Match week · predict the score",
    lines: ["Play our match", "prediction quiz —", "win a gift."],
  },
  "reaction-hub": {
    eyebrow: "Last night · what fans are saying",
    lines: ["Check out the", "latest takes", "fans are sharing."],
  },
  "event-invite": {
    eyebrow: "Tonight · one neighborhood over",
    lines: ["There's a", "watch party", "near you tonight."],
  },
  "wc-hub": {
    eyebrow: "World Cup 2026 · Boston hosts",
    lines: ["The World Cup", "is on our pitch.", "Watch it with us."],
  },
  "post-wc-nudge": {
    eyebrow: "Post-tournament · pick up the thread",
    lines: ["You were here", "in June.", "Here's what's next."],
  },
  "sponsor-premium": {
    eyebrow: "Partners · verified audience",
    lines: ["The brands", "the Revs run with —", "picked for you."],
  },
  "ticket-conversion": {
    eyebrow: "Renewal · same seat, same fans",
    lines: ["Your seat is", "still here.", "Pick up the season."],
  },
  "merchandise-uplift": {
    eyebrow: "Shop · made for you",
    lines: ["Three pieces.", "Picked for you.", "Skip the rest."],
  },
  "marketing-savings": {
    eyebrow: "Smart targeting · right place",
    lines: ["You're here", "because we", "knew you'd fit."],
  },
  "dynamic-pricing": {
    eyebrow: "A ticket price built for you",
    lines: ["Your seat,", "your price,", "this Saturday."],
  },
  "insight-poll": {
    eyebrow: "Three quick questions · 30 seconds",
    lines: ["Tell us", "what worked.", "We fix the rest."],
  },
  "wc-sponsor-rally": {
    eyebrow: "Meet our World Cup partners",
    lines: ["The brands", "joining the Revs", "for the summer."],
  },
  "wc-merch-drop": {
    eyebrow: "World Cup gear · made for you",
    lines: ["Three pieces.", "Made for", "this tournament."],
  },
  "wc-data-pitch": {
    eyebrow: "Your guide · the World Cup in Boston",
    lines: ["The World Cup", "is here.", "In Boston."],
  },
};

export const ROUTING_RULES: string[] = [
  "IF bottleneck = Heat → Match Prediction Quiz",
  "IF bottleneck = Growth  AND  local cluster = no → \"Last Night\" Reaction Hub",
  "IF bottleneck = Growth  AND  local cluster = yes → Local Fan-Session Event Invite",
  "IF bottleneck = Retention  AND  time window = during-WC → World Cup Hub",
  "IF bottleneck = Retention  AND  time window = before|after-WC → Post-Spike Re-engagement",
];

export const RULE_TO_KIND: InterventionKind[] = [
  "quiz",
  "reaction-hub",
  "event-invite",
  "wc-hub",
  "post-wc-nudge",
];
