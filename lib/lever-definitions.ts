import type { Lever } from "./types";

export interface LeverDefinition {
  lever: Lever;
  title: string;
  subtitle: string;
  definition: string;
  inputs: string[];
  formulaPlain: string;
  pseudocode: string;
  thresholds: { low: string; ok: string; high: string };
  /** What this lever signals and what action follows from it — replaces math in the dialog. */
  whyThisMatters: string;
  /** Whether the underlying number is something we'd actually have at run time. */
  measuredOrModeled: "measured" | "modeled";
}

export const LEVER_DEFINITIONS: Record<Lever, LeverDefinition> = {
  heat: {
    lever: "heat",
    title: "Heat",
    subtitle: "Attention",
    definition:
      "How loudly this segment is paying attention right now. High Heat means they're watching, talking, sharing — even if they aren't buying anything yet.",
    inputs: [
      "events.action ∈ { viewed, share, comment } weighted by recency",
      "Social mention proxy (illustrative, modeled)",
      "Baseline = trailing 8 time-windows for the same segment",
    ],
    formulaPlain:
      "Take this segment's recent activity, compare it against its own trailing 8-window baseline using a weighted z-score, then map the result onto a 0–100 scale.",
    pseudocode:
      "heat = zscore( weighted_sum(viewed, share*1.5, comment*1.5),\n               baseline = trailing8(segment) )\n     |> rescale(0, 100)",
    thresholds: {
      low: "< 40 — attention slipping; we're losing them",
      ok: "40–70 — present but not loud",
      high: "> 70 — they're hot; capture this energy before it cools",
    },
    whyThisMatters:
      "Heat tells you whether a segment is paying attention right now versus its own recent baseline. When heat spikes, that audience is reachable — emails get opened, push gets clicked, content travels. When it fades, even strong offers go unnoticed. It's the leading indicator: nothing else moves until attention does.",
    measuredOrModeled: "modeled",
  },
  growth: {
    lever: "growth",
    title: "Growth",
    subtitle: "Conversion",
    definition:
      "Are we turning attention into platform engagement? Growth catches segments who watch a lot but barely act — the silent-fan problem.",
    inputs: [
      "events.action ∈ { rsvp, preorder, comment, share } — engagement actions",
      "events.action = viewed — denominator (people who showed up at all)",
      "MLS-median engagement-ratio benchmark for normalization",
    ],
    formulaPlain:
      "Divide the count of engagement actions by the count of views, multiply by 100, then normalize against the MLS-median engagement-ratio to scale to 0–100.",
    pseudocode:
      "growth = (count(engage_actions) / count(viewed)) * 100\n       |> normalize_to(mls_median_engage_ratio)",
    thresholds: {
      low: "< 35 — eyes on, hands off; they're a conversion problem",
      ok: "35–65 — turning some attention into action",
      high: "> 65 — high-converting; the engine is working",
    },
    whyThisMatters:
      "Growth is what share of attention turns into action — RSVPs, preorders, comments, shares. It's the funnel between awareness and commitment. High heat with low growth means the message landed but didn't move anyone; that's a creative problem, not a reach problem.",
    measuredOrModeled: "modeled",
  },
  retention: {
    lever: "retention",
    title: "Retention",
    subtitle: "Stickiness",
    definition:
      "Of the people who engaged this window, how many came back the next. Low Retention means we're leaking the audience we earned.",
    inputs: [
      "events.person_id — distinct active people per window",
      "Two consecutive time-windows compared",
    ],
    formulaPlain:
      "Take the set of people active in the prior window. Compute the fraction of them who are also active in the current window. Express as 0–100.",
    pseudocode:
      "retention = | active(w) ∩ active(w-1) |\n          / | active(w-1) |   *  100",
    thresholds: {
      low: "< 45 — they liked it once; they're not coming back",
      ok: "45–70 — typical churn",
      high: "> 70 — they keep showing up",
    },
    whyThisMatters:
      "Retention is the share of last window's engaged fans who showed up again this window. It's the leakiest part of the bucket — acquisition is loud, churn is silent. A weak retention number means every campaign starts from scratch and we never compound the audiences we already built.",
    measuredOrModeled: "measured",
  },
  money: {
    lever: "money",
    title: "Money",
    subtitle: "Revenue per fan",
    definition:
      "Modeled revenue contribution per active fan, indexed against MLS-median. The lever the long-term club-economics story rides on (stadium, sponsorship, premium products).",
    inputs: [
      "Matchday revenue per match (modeled estimate)",
      "Unique active fans this window",
      "MLS-median revenue-per-fan benchmark",
    ],
    formulaPlain:
      "Divide matchday revenue by the count of unique active fans, then index against the MLS-median revenue-per-fan benchmark and rescale to 0–100.",
    pseudocode:
      "money = ($_matchday / unique_active_fans)\n      |> index_against(mls_median_rev_per_fan)\n      |> rescale(0, 100)",
    thresholds: {
      low: "< 35 — yield is the bottleneck; volume alone won't close it",
      ok: "35–65 — yield is on-trend with the league",
      high: "> 65 — punching above weight on revenue per fan",
    },
    whyThisMatters:
      "Money is what each active fan is worth today, indexed against the MLS median. High attention with low money means we're filling the room but underpricing the experience. This is the lever the long-term club-economics story rides on — stadium, sponsorship, and premium products all sit downstream of revenue per fan.",
    measuredOrModeled: "modeled",
  },
};
