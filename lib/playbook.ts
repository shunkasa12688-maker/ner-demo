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
      "Gamified pre-match poll. Predict the score. Zero signup. Repeat visits before every match.",
    whyDefault:
      "Attention has slipped — give them a low-friction reason to come back before kickoff, and harvest interest signals for free.",
  },
  {
    kind: "reaction-hub",
    title: '"Last Night" Reaction Hub',
    blurb:
      "Post-match conversation: hot-or-not meter, top fan takes, and how the media spun it.",
    whyDefault:
      "They talk about every match online — keep that buzz on our page instead of letting it die on Twitter.",
  },
  {
    kind: "event-invite",
    title: "Local Fan-Session Event Invite",
    blurb:
      "Targeted watch party / meet-the-player / pickup game in a known cluster town. RSVP, no membership.",
    whyDefault:
      "They talk about games online but rarely show up, and we know where they live ({town}) — bring them together IRL.",
  },
  {
    kind: "wc-hub",
    title: 'World Cup "In Your Backyard" Hub',
    blurb:
      "Connects live World Cup moments back to the Revs while the tournament is on.",
    whyDefault:
      "The World Cup is pulling them in right now — bridge the heat onto the Revs before the moment passes.",
  },
  {
    kind: "post-wc-nudge",
    title: "Post-Spike Re-engagement Nudge",
    blurb:
      '"You were into this in June — here\'s what\'s next." Catches the audience the WC pulled in before it evaporates.',
    whyDefault:
      "Summer's over and they'd drift if we said nothing — remind them why they cared in June, point at what's next.",
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
