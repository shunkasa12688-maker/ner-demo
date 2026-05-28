import type { Lever } from "./types";

/**
 * Deterministic 12-month sparkline series for the diagnostic levers
 * (Heat / Growth / Retention / Money). High-volatility "price chart"
 * shape: starts low, drifts up across the year, spikes during the
 * World Cup window (~weeks 22-31), settles into an elevated plateau.
 *
 * Per-lever seed so each chart is identical on every reload and the
 * four levers visibly differ from each other.
 */

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

interface LeverProfile {
  /** Seed used for deterministic noise. */
  seed: number;
  /** Where the line starts (weekly score, 0-100). */
  floor: number;
  /** Where the year-end plateau lands (weekly score, 0-100). */
  potential: number;
  /** Bonus added at the WC peak so the spike reads as a story moment. */
  wcSpikeBoost: number;
}

const LEVER_PROFILES: Record<Lever, LeverProfile> = {
  heat: { seed: 9101, floor: 28, potential: 84, wcSpikeBoost: 14 },
  growth: { seed: 9202, floor: 34, potential: 78, wcSpikeBoost: 10 },
  retention: { seed: 9303, floor: 42, potential: 88, wcSpikeBoost: 8 },
  money: { seed: 9404, floor: 31, potential: 81, wcSpikeBoost: 12 },
};

export interface SparkPoint {
  /** Week index 0..51. */
  w: number;
  /** Month tick label, only present on month-start weeks. */
  monthLabel: string;
  /** Raw value 0..100. */
  v: number;
}

const MONTH_TICKS: Array<{ week: number; label: string }> = [
  { week: 0, label: "Jan" },
  { week: 13, label: "Apr" },
  { week: 26, label: "Jul" },
  { week: 39, label: "Oct" },
];

/** WC window weeks (Jun–Jul of a 52-week year). */
const WC_START = 22;
const WC_END = 31;

/**
 * Build the 52-week series for a diagnostic lever. Output values are
 * clamped to [4, 99] so the line doesn't kiss the axes on the noise
 * spikes.
 */
export function buildLeverSparkline(lever: Lever): SparkPoint[] {
  const profile = LEVER_PROFILES[lever];
  const rand = mulberry32(profile.seed);
  const span = profile.potential - profile.floor;

  const data: SparkPoint[] = [];

  for (let w = 0; w < 52; w++) {
    // Sigmoid ramp from floor → potential, mostly complete by week ~40.
    const x = (w - 22) / 8;
    const sigmoid = 1 / (1 + Math.exp(-x));
    let trend = profile.floor + span * (0.1 + 0.78 * sigmoid);

    // WC window peaks around week 27.
    if (w >= WC_START - 2 && w <= WC_END + 2) {
      const peakDist = Math.abs(w - 27);
      const spike = Math.max(0, 1 - peakDist / 6);
      trend += profile.wcSpikeBoost * spike;
    }

    // Post-WC settle so the plateau hangs near `potential` not above it.
    if (w > WC_END) {
      trend = trend * 0.85 + profile.potential * 0.15;
    }

    // ±15–20% high-frequency noise. Slight per-week jitter amplitude so
    // some weeks are calmer and some are choppy — reads as real volatility.
    const amp = 0.15 + rand() * 0.05;
    const noise = (rand() * 2 - 1) * amp;
    const v = trend * (1 + noise);

    const month = MONTH_TICKS.find((m) => m.week === w);
    data.push({
      w,
      monthLabel: month?.label ?? "",
      v: Math.max(4, Math.min(99, Math.round(v))),
    });
  }

  return data;
}

export const SPARKLINE_MONTH_TICKS = MONTH_TICKS.map((m) => m.week);
