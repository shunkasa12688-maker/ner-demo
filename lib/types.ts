export type Bottleneck = "heat" | "growth" | "retention";
export type TimeWindow = "before-wc" | "during-wc" | "after-wc";
export type Lever = "heat" | "growth" | "retention" | "money";
export type Language = "en" | "pt" | "es";

export type DataTagKind = "measured" | "modeled";

export type SegmentId =
  | "ne-regulars"
  | "wc-watchers"
  | "boston-loyalists"
  | "brazilian-lusophone"
  | "central-american";

export interface Segment {
  id: SegmentId;
  label: string;
  language: Language;
  localCluster: { town: string } | null;
  /** Headline narrative for the cockpit reasoning trace, in plain language. */
  shortNarrative: string;
}

export interface LeverReading {
  /** 0-100 normalized score */
  score: number;
  /** Per-time-window historical points (~8 points). */
  history: number[];
  /** "+12%", "-4%", etc. */
  changeLabel: string;
  /** Direction relative to a healthy band. */
  status: "low" | "ok" | "high";
}

export type SegmentReadings = Record<Lever, LeverReading>;

export interface MatchRow {
  match_id: string;
  date: string; // ISO
  opponent: string;
  home_away: "home" | "away";
  kickoff_time: string;
  result: "W" | "L" | "D";
  score: string; // "2-1"
}

export interface EventRow {
  event_id: string;
  timestamp: string;
  session_id: string;
  person_id: string | null;
  match_id: string | null;
  action:
    | "viewed"
    | "clicked"
    | "quiz"
    | "rsvp"
    | "preorder"
    | "comment"
    | "share";
  channel: "web" | "social" | "email" | "irl";
  value: number;
}

export interface PersonRow {
  person_id: string;
  segment: SegmentId;
  age_band: "13-17" | "18-24" | "25-34" | "35-44" | "45-54" | "55+";
  join_date: string;
}

export interface InterventionRow {
  intervention_id: string;
  type:
    | "quiz"
    | "reaction-hub"
    | "event-invite"
    | "wc-hub"
    | "post-wc-nudge"
    | "sponsor-premium"
    | "ticket-conversion"
    | "merchandise-uplift"
    | "marketing-savings"
    | "dynamic-pricing"
    | "insight-poll"
    | "wc-sponsor-rally"
    | "wc-merch-drop"
    | "wc-data-pitch";
  target_segment: SegmentId | "all";
  target_lever: Lever;
  match_id: string | null;
  date: string;
}

export interface ClubBenchmark {
  metric: string;
  value: number | string;
  unit?: string;
  source: string;
  measured_or_modeled: DataTagKind;
}

export interface SampleData {
  matches: MatchRow[];
  events: EventRow[];
  people: PersonRow[];
  interventions: InterventionRow[];
  club_benchmarks: ClubBenchmark[];
  segments: Segment[];
  readings: Record<SegmentId, SegmentReadings>;
}

export type InterventionKind =
  | "quiz"
  | "reaction-hub"
  | "event-invite"
  | "wc-hub"
  | "post-wc-nudge"
  | "sponsor-premium"
  | "ticket-conversion"
  | "merchandise-uplift"
  | "marketing-savings"
  | "dynamic-pricing"
  | "insight-poll"
  | "wc-sponsor-rally"
  | "wc-merch-drop"
  | "wc-data-pitch";

export interface CatalogEntry {
  kind: InterventionKind;
  title: string;
  blurb: string;
  /** Editable plain-language "why" used in the reasoning trace + fan-page caption. */
  whyDefault: string;
}

export interface AppState {
  selectedSegment: SegmentId;
  timeWindow: TimeWindow;
  perSegmentBottleneck: Record<SegmentId, Bottleneck>;
  /** When set, fan page shows this kind and ignores the rule-based selection. */
  manualOverride: InterventionKind | null;
  /** Audience-detectable update counter; bumps on every POST. */
  rev: number;
}

export const ALL_SEGMENT_IDS: SegmentId[] = [
  "ne-regulars",
  "wc-watchers",
  "boston-loyalists",
  "brazilian-lusophone",
  "central-american",
];

export const ALL_TIME_WINDOWS: TimeWindow[] = [
  "before-wc",
  "during-wc",
  "after-wc",
];
