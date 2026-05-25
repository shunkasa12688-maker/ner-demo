"use client";

import type {
  AppState,
  Bottleneck,
  Segment,
  SegmentId,
  TimeWindow,
} from "@/lib/types";
import { ALL_TIME_WINDOWS } from "@/lib/types";

const TIME_LABELS: Record<TimeWindow, string> = {
  "before-wc": "Before WC",
  "during-wc": "During WC",
  "after-wc": "After WC",
};

const BOTTLENECKS: { key: Bottleneck; label: string }[] = [
  { key: "heat", label: "Heat" },
  { key: "growth", label: "Growth" },
  { key: "retention", label: "Retention" },
];

/**
 * The sticky-feeling top bar: segment switch, time window, and the
 * critical bottleneck radio — always one click away, always visible.
 * This is the "flip-it-live" surface during the demo.
 */
export function TopBar({
  state,
  segments,
  onPatch,
}: {
  state: AppState;
  segments: Segment[];
  onPatch: (patch: Partial<AppState>) => void;
}) {
  const currentBottleneck = state.perSegmentBottleneck[state.selectedSegment];

  return (
    <div className="bi-card-hi sticky top-3 z-20 grid gap-3 px-5 py-3 md:grid-cols-[1fr,auto,auto] md:items-center">
      {/* Segment dropdown */}
      <label className="flex items-center gap-3">
        <span className="text-[10px] uppercase tracking-[0.18em] text-bi-text-dim">
          Segment
        </span>
        <select
          value={state.selectedSegment}
          onChange={(e) => onPatch({ selectedSegment: e.target.value as SegmentId })}
          className="flex-1 rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-medium text-bi-text outline-none transition focus:border-bi-accent"
        >
          {segments.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </label>

      {/* Time window pills */}
      <div className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] p-0.5">
        {ALL_TIME_WINDOWS.map((w) => (
          <button
            key={w}
            onClick={() => onPatch({ timeWindow: w })}
            className={`tab-pill rounded px-3 py-1 text-xs font-medium ${
              state.timeWindow === w
                ? "bg-bi-accent text-[#0a1024]"
                : "text-bi-text-dim hover:text-bi-text"
            }`}
          >
            {TIME_LABELS[w]}
          </button>
        ))}
      </div>

      {/* Bottleneck radio cards */}
      <div className="inline-flex items-center gap-1 rounded-md border border-ner-red/30 bg-ner-red/5 p-0.5">
        {BOTTLENECKS.map((b) => (
          <button
            key={b.key}
            onClick={() =>
              onPatch({
                perSegmentBottleneck: {
                  ...state.perSegmentBottleneck,
                  [state.selectedSegment]: b.key,
                },
              })
            }
            className={`tab-pill rounded px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
              currentBottleneck === b.key
                ? "bg-ner-red text-white"
                : "text-bi-text-dim hover:text-bi-text"
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>
    </div>
  );
}
