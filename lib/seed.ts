import type {
  ClubBenchmark,
  EventRow,
  InterventionRow,
  Lever,
  MatchRow,
  PersonRow,
  SampleData,
  Segment,
  SegmentId,
  SegmentReadings,
} from "./types";

/**
 * Deterministic pseudo-random generator so the seed is reproducible
 * across `npm run reset` invocations.
 */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(2026);
const pick = <T>(arr: T[]) => arr[Math.floor(rand() * arr.length)];
const int = (lo: number, hi: number) =>
  Math.floor(lo + rand() * (hi - lo + 1));

const SEGMENTS: Segment[] = [
  {
    id: "ne-regulars",
    label: "NE Soccer Regulars",
    language: "en",
    localCluster: null,
    shortNarrative:
      "Season-ticket-leaning core. Show up reliably, but attention fades when results dip.",
  },
  {
    id: "wc-watchers",
    label: "World Cup Watchers",
    language: "en",
    localCluster: null,
    shortNarrative:
      "Casual soccer fans pulled in by the 2026 tournament. Big spike, no MLS habit yet.",
  },
  {
    id: "boston-loyalists",
    label: "Boston Loyalists",
    language: "en",
    localCluster: null,
    shortNarrative:
      "Bandwagon-but-local. Watch Boston teams across sports; soccer is the side dish.",
  },
  {
    id: "brazilian-lusophone",
    label: "Brazilian / Lusophone",
    language: "pt",
    localCluster: { town: "Everett / Somerville" },
    shortNarrative:
      "Talk about every match online in Portuguese. Rarely buy a ticket.",
  },
  {
    id: "central-american",
    label: "Central American",
    language: "es",
    localCluster: { town: "East Boston" },
    shortNarrative:
      "Tight community, deep soccer culture. Watches at home or at bars together.",
  },
];

const OPPONENTS = [
  "Inter Miami",
  "NYCFC",
  "Philadelphia Union",
  "Atlanta United",
  "Toronto FC",
  "Columbus Crew",
  "DC United",
  "Cincinnati",
  "Charlotte FC",
  "Nashville SC",
  "Orlando City",
  "Chicago Fire",
];

function makeMatches(): MatchRow[] {
  const rows: MatchRow[] = [];
  const dates = [
    "2026-04-12", "2026-04-19", "2026-05-03", "2026-05-17",
    "2026-06-07", "2026-06-21", "2026-07-04", "2026-07-19",
    "2026-08-02", "2026-08-23", "2026-09-13", "2026-09-27",
  ];
  for (let i = 0; i < dates.length; i++) {
    const home = i % 2 === 0;
    const ourGoals = int(0, 3);
    const oppGoals = int(0, 3);
    rows.push({
      match_id: `m-${(i + 1).toString().padStart(3, "0")}`,
      date: dates[i],
      opponent: OPPONENTS[i % OPPONENTS.length],
      home_away: home ? "home" : "away",
      kickoff_time: home ? "19:30" : "20:00",
      result: ourGoals > oppGoals ? "W" : ourGoals < oppGoals ? "L" : "D",
      score: `${ourGoals}-${oppGoals}`,
    });
  }
  return rows;
}

function makePeople(): PersonRow[] {
  const bands: PersonRow["age_band"][] = [
    "13-17", "18-24", "25-34", "35-44", "45-54", "55+",
  ];
  const rows: PersonRow[] = [];
  // Roughly 120 people across segments, weighted realistically
  const distribution: Record<SegmentId, number> = {
    "ne-regulars": 35,
    "wc-watchers": 30,
    "boston-loyalists": 20,
    "brazilian-lusophone": 20,
    "central-american": 15,
  };
  let id = 1;
  for (const seg of SEGMENTS) {
    for (let i = 0; i < distribution[seg.id]; i++) {
      rows.push({
        person_id: `p-${id.toString().padStart(4, "0")}`,
        segment: seg.id,
        age_band: pick(bands),
        join_date: `202${int(3, 6)}-${(int(1, 12)).toString().padStart(2, "0")}-${int(1, 28).toString().padStart(2, "0")}`,
      });
      id++;
    }
  }
  return rows;
}

function makeEvents(matches: MatchRow[], people: PersonRow[]): EventRow[] {
  const rows: EventRow[] = [];
  const actions: EventRow["action"][] = [
    "viewed", "clicked", "quiz", "rsvp", "preorder", "comment", "share",
  ];
  const channels: EventRow["channel"][] = ["web", "social", "email", "irl"];
  // ~400 events
  for (let i = 0; i < 400; i++) {
    const match = pick(matches);
    const person = rand() < 0.7 ? pick(people) : null;
    const date = new Date(match.date);
    date.setMinutes(date.getMinutes() + int(-180, 360));
    rows.push({
      event_id: `e-${(i + 1).toString().padStart(4, "0")}`,
      timestamp: date.toISOString(),
      session_id: `s-${int(1, 600)}`,
      person_id: person?.person_id ?? null,
      match_id: match.match_id,
      action: pick(actions),
      channel: pick(channels),
      value: rand() < 0.3 ? Math.round(rand() * 50) : 1,
    });
  }
  return rows;
}

function makeInterventions(matches: MatchRow[]): InterventionRow[] {
  const types: InterventionRow["type"][] = [
    "quiz", "reaction-hub", "event-invite", "wc-hub", "post-wc-nudge",
  ];
  const segs: (SegmentId | "all")[] = [
    "all", "brazilian-lusophone", "central-american", "wc-watchers",
  ];
  const levers: InterventionRow["target_lever"][] = ["heat", "growth", "retention"];
  return matches.slice(0, 10).map((m, i) => ({
    intervention_id: `i-${(i + 1).toString().padStart(3, "0")}`,
    type: types[i % types.length],
    target_segment: segs[i % segs.length],
    target_lever: levers[i % levers.length],
    match_id: m.match_id,
    date: m.date,
  }));
}

const CLUB_BENCHMARKS: ClubBenchmark[] = [
  { metric: "Annual revenue", value: 65, unit: "$M", source: "MLS reporting / Forbes (illustrative)", measured_or_modeled: "modeled" },
  { metric: "Avg attendance", value: 24800, unit: "fans", source: "MLS box scores", measured_or_modeled: "measured" },
  { metric: "Club valuation", value: 685, unit: "$M", source: "Forbes (illustrative)", measured_or_modeled: "modeled" },
  { metric: "Top-club revenue gap", value: "−$80M to −$160M", source: "Top-5 MLS benchmark (illustrative)", measured_or_modeled: "modeled" },
  { metric: "Revenue per fan (avg)", value: 220, unit: "$", source: "Internal estimate", measured_or_modeled: "modeled" },
];

/**
 * Build the lever readings table.
 *
 * Each lever for each segment gets a *scripted* 8-window history so the
 * trend chart actually tells a story: spikes during the World Cup,
 * decay afterward, sustained slumps, etc. The final value of the history
 * is the segment's *current* score; the changeLabel is computed from the
 * start-to-end delta so it reflects the chart you can see.
 *
 * Segment stories told by the data:
 *   - brazilian-lusophone: HEAT explodes during WC, GROWTH actually drops
 *     (talk a lot, never show up). The conversion bottleneck is visible.
 *   - wc-watchers: rocket then crash. Acquired during WC, leaking after.
 *   - central-american: steady upward trajectory peaking mid-WC.
 *   - ne-regulars: stable on most levers but RETENTION sliding — the
 *     "quietly losing the diehards" story.
 *   - boston-loyalists: flat. The "indifferent" segment. Hard to crack.
 */

type Story = readonly number[]; // 8 values, 0..100

const STORIES: Record<SegmentId, Record<Lever, Story>> = {
  "brazilian-lusophone": {
    // Heat: low → climb → WC explosion → sustained high (with a small dip)
    heat: [38, 44, 52, 71, 89, 95, 92, 87],
    // Growth: small WC bump then INVERTS — they consume more but show up less
    growth: [21, 18, 24, 31, 27, 19, 14, 12],
    // Retention: slow steady decay; people watch then ghost
    retention: [54, 51, 48, 44, 41, 36, 31, 28],
    // Money: small WC ticket spike, then fizzles back
    money: [22, 21, 23, 27, 32, 28, 23, 20],
  },
  "wc-watchers": {
    // Heat: rocket then crash — the textbook WC-tourist curve
    heat: [10, 14, 32, 68, 94, 88, 56, 32],
    // Growth: tracks heat but lower amplitude — half of them clicked, fewer engaged
    growth: [13, 17, 28, 48, 56, 42, 26, 16],
    // Retention: very low throughout — they came for WC, not for us
    retention: [6, 9, 16, 32, 28, 19, 13, 10],
    // Money: short revenue blip, then nothing
    money: [10, 13, 21, 36, 42, 28, 17, 12],
  },
  "central-american": {
    // Heat: steady climb through WC, gentle decline
    heat: [44, 50, 58, 71, 83, 79, 72, 67],
    // Growth: modest but slipping — local cluster but ticket prices a barrier
    growth: [29, 32, 35, 38, 37, 32, 28, 24],
    // Retention: actually OK — community is sticky
    retention: [56, 58, 60, 62, 63, 61, 59, 57],
    // Money: low — yield is the issue, not interest
    money: [30, 32, 34, 38, 41, 37, 33, 30],
  },
  "ne-regulars": {
    // Heat: stable — they always show up at a steady level
    heat: [64, 62, 68, 72, 74, 69, 63, 60],
    // Growth: solid baseline
    growth: [54, 57, 60, 62, 61, 57, 54, 51],
    // Retention: the quiet alarm — losing some diehards
    retention: [56, 53, 49, 46, 42, 38, 35, 33],
    // Money: best on this lever, slight WC bump
    money: [68, 70, 71, 73, 75, 73, 71, 69],
  },
  "boston-loyalists": {
    // Heat: indifferent baseline with a tiny WC blip
    heat: [33, 31, 32, 36, 41, 36, 30, 28],
    growth: [21, 22, 25, 27, 26, 24, 22, 21],
    // Retention: roughly flat — they don't churn but don't grow
    retention: [49, 50, 49, 51, 53, 51, 49, 49],
    money: [44, 45, 46, 48, 49, 47, 45, 44],
  },
};

function statusFromScore(score: number): "low" | "ok" | "high" {
  if (score < 40) return "low";
  if (score > 70) return "high";
  return "ok";
}

function changeLabel(history: Story): string {
  const start = history[0];
  const end = history[history.length - 1];
  if (start === 0) return "+∞%";
  const delta = ((end - start) / start) * 100;
  const sign = delta > 0 ? "+" : "−";
  return `${sign}${Math.abs(Math.round(delta))}%`;
}

function makeReadings(): Record<SegmentId, SegmentReadings> {
  function reading(history: Story): SegmentReadings[Lever] {
    const score = history[history.length - 1];
    return {
      score,
      history: [...history],
      changeLabel: changeLabel(history),
      status: statusFromScore(score),
    };
  }
  const out = {} as Record<SegmentId, SegmentReadings>;
  for (const segId of Object.keys(STORIES) as SegmentId[]) {
    const s = STORIES[segId];
    out[segId] = {
      heat: reading(s.heat),
      growth: reading(s.growth),
      retention: reading(s.retention),
      money: reading(s.money),
    };
  }
  return out;
}

export function buildSampleData(): SampleData {
  const matches = makeMatches();
  const people = makePeople();
  const events = makeEvents(matches, people);
  const interventions = makeInterventions(matches);
  return {
    matches,
    events,
    people,
    interventions,
    club_benchmarks: CLUB_BENCHMARKS,
    segments: SEGMENTS,
    readings: makeReadings(),
  };
}
