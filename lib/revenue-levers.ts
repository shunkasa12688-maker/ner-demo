/**
 * Commercial revenue levers shown on /cockpit (Revenue tab).
 *
 * These cards are deliberately read-only and illustrative — the chart data
 * is simulated, not forecast. WC-window emphasis is a visual narrative
 * device, not a prediction; real forecasting is out of scope here.
 */

export type RevenueLeverId =
  | "sponsor-premium"
  | "ticket-conversion"
  | "merchandise-uplift"
  | "marketing-savings";

export interface RevenueLever {
  id: RevenueLeverId;
  title: string;
  /** Short eyebrow shown above the title (matches diagnostic lever style). */
  subtitle: string;
  /** Annual base revenue (or cost, for savings) that the lever modifies. */
  baseAnnual: number;
  /** Human-readable uplift range, e.g. "15–25%" or "14–21 pp". */
  rangeLabel: string;
  /** Conservative annual outcome (lower bound). */
  floorAnnual: number;
  /** Ambitious annual outcome (upper bound). */
  potentialAnnual: number;
  /** Why this lever matters — paragraph shown on the card. */
  why: string;
  /** Hex color used for the chart series. */
  color: string;
  /** Seed used for deterministic per-lever chart data. */
  seed: number;
  /** True for cost-reduction levers; rendered with a "cost saving" hint. */
  isCostReduction?: boolean;
}

export const REVENUE_LEVERS: RevenueLever[] = [
  {
    id: "sponsor-premium",
    title: "Sponsor premium",
    subtitle: "Audience pricing",
    baseAnnual: 1_200_000,
    rangeLabel: "15–25%",
    floorAnnual: 180_000,
    potentialAnnual: 300_000,
    why: "Sponsors pay us for reach today — bodies in seats. Verified, segmented fan data lets us sell audiences instead, which commands a 15–25% premium. This is the fastest dollar: it reprices the roster we already have (Arbella, Santander, Mass General Brigham) before we recruit a single new sponsor.",
    color: "#f87171",
    seed: 1101,
  },
  {
    id: "ticket-conversion",
    title: "Ticket conversion",
    subtitle: "Renewal & retention",
    baseAnnual: 1_071_000,
    rangeLabel: "14–21 pp",
    floorAnnual: 150_000,
    potentialAnnual: 225_000,
    why: "Renewal is the compounding revenue line — same fan, repeat seat, no acquisition cost. Knowing who renews and why lifts renewal 14–21 points. We don't need more first-time buyers; we need to keep the ones we already have.",
    color: "#6aa1ff",
    seed: 2202,
  },
  {
    id: "merchandise-uplift",
    title: "Merchandise uplift",
    subtitle: "Per-fan digital",
    baseAnnual: 300_000,
    rangeLabel: "30–40%",
    floorAnnual: 90_000,
    potentialAnnual: 120_000,
    why: "When offers match behaviour, per-fan digital merch rises 30–40% (Manchester City's Cityzens precedent). Smaller in absolute dollars but high margin, and it scales with the fan database. The same fan spends more once we know what they want.",
    color: "#4ade80",
    seed: 3303,
  },
  {
    id: "marketing-savings",
    title: "Marketing savings",
    subtitle: "Targeting waste cut",
    baseAnnual: 175_000,
    rangeLabel: "40–60%",
    floorAnnual: 70_000,
    potentialAnnual: 105_000,
    why: "Broad Greater-Boston spend burns budget on segments that never convert. Targeting cuts 40–60% of that waste — a cost saving, so it drops straight to the bottom line. Knowing who NOT to spend on is worth as much as knowing who to.",
    color: "#fbbf24",
    seed: 4404,
    isCostReduction: true,
  },
];

export const PORTFOLIO_TOTALS = {
  floorAnnual: 490_000,
  potentialAnnual: 750_000,
} as const;

/** World Cup window: ~June–July 2026 = weeks 22–31 of a 52-week series. */
export const WC_WINDOW = { start: 22, end: 31 } as const;

/** Local deterministic RNG. Same algorithm as lib/seed.ts mulberry32. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface WeekPoint {
  /** 0-indexed week number (0..51). */
  w: number;
  /** Month label for the X-axis tick — only set on month starts, "" otherwise. */
  monthLabel: string;
  /** Raw simulated weekly $ (in dollars, not $k). */
  raw: number;
  /** Centred 5-week moving average over `raw`, in dollars. */
  ma: number;
}

const MONTH_TICKS: Array<{ week: number; label: string }> = [
  { week: 0, label: "Jan" },
  { week: 4, label: "Feb" },
  { week: 8, label: "Mar" },
  { week: 13, label: "Apr" },
  { week: 17, label: "May" },
  { week: 22, label: "Jun" },
  { week: 26, label: "Jul" },
  { week: 30, label: "Aug" },
  { week: 35, label: "Sep" },
  { week: 39, label: "Oct" },
  { week: 43, label: "Nov" },
  { week: 48, label: "Dec" },
];

/**
 * Build the 52-week simulated series for a lever.
 *
 * Shape (per upstream brief):
 *   - start near floorAnnual / 52
 *   - ramp upward across the year
 *   - clear elevated band over the WC window (weeks 22–31)
 *   - settle into an elevated plateau near potentialAnnual / 52 by year-end
 *
 * Noise is ±15–20% of the local trend, applied via a seeded RNG so the
 * chart is identical on every reload (no reshuffling mid-presentation).
 */
export function buildLeverSeries(lever: RevenueLever): WeekPoint[] {
  const rand = mulberry32(lever.seed);
  const floorWeekly = lever.floorAnnual / 52;
  const potentialWeekly = lever.potentialAnnual / 52;
  const span = potentialWeekly - floorWeekly;

  const trend: number[] = [];
  for (let w = 0; w < 52; w++) {
    // Sigmoid ramp from floor → potential, mostly complete by ~week 40.
    const x = (w - 18) / 7;
    const sigmoid = 1 / (1 + Math.exp(-x));
    let base = floorWeekly + span * (0.15 + 0.7 * sigmoid);

    // Pre-WC build-up + WC spike (weeks 22–31, peak around week 27).
    if (w >= WC_WINDOW.start - 2 && w <= WC_WINDOW.end + 1) {
      const peakDist = Math.abs(w - 27);
      const spike = Math.max(0, 1 - peakDist / 6);
      base += span * 0.35 * spike;
    }

    // Soft post-WC settle so year-end lands near (slightly below) potential.
    if (w > WC_WINDOW.end) {
      base = base * 0.92 + potentialWeekly * 0.08;
    }

    trend.push(base);
  }

  const monthLabelFor = (w: number) =>
    MONTH_TICKS.find((m) => m.week === w)?.label ?? "";

  // Apply ±25–30% noise to the trend.
  const raw: number[] = trend.map((t) => {
    const amp = 0.25 + rand() * 0.05;
    const noise = (rand() * 2 - 1) * amp;
    return Math.max(0, t * (1 + noise));
  });

  // Centred 9-week moving average over the raw series — wide enough to read
  // as a distinct trend line above the noisier raw series.
  const ma: number[] = raw.map((_, i) => {
    const lo = Math.max(0, i - 4);
    const hi = Math.min(raw.length - 1, i + 4);
    let sum = 0;
    let n = 0;
    for (let j = lo; j <= hi; j++) {
      sum += raw[j];
      n++;
    }
    return sum / n;
  });

  return raw.map((v, w) => ({
    w,
    monthLabel: monthLabelFor(w),
    raw: Math.round(v),
    ma: Math.round(ma[w]),
  }));
}

/** Format a dollar amount as a compact "$Nk" string. Used for axis ticks. */
export function formatDollarsK(value: number): string {
  if (value === 0) return "$0";
  const k = value / 1000;
  if (Math.abs(k) >= 100) return `$${Math.round(k)}k`;
  if (Math.abs(k) >= 10) return `$${k.toFixed(0)}k`;
  return `$${k.toFixed(1)}k`;
}

/** Format an annual dollar amount as "$300k". */
export function formatPotential(value: number): string {
  const k = Math.round(value / 1000);
  return `$${k}k / yr`;
}
