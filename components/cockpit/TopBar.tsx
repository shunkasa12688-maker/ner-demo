"use client";

import type { AppState, Segment, SegmentId, TimeWindow } from "@/lib/types";
import { ALL_TIME_WINDOWS } from "@/lib/types";

const TIME_LABELS: Record<TimeWindow, string> = {
  "before-wc": "Before WC",
  "during-wc": "During WC",
  "after-wc": "After WC",
};

/**
 * The sticky-feeling top bar: segment switch + time window. Bottleneck
 * control lives inside the Diagnosis builder (Customer Value tab) to avoid
 * duplicating the radio surface across two places.
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
  return (
    <div className="bi-card-hi sticky top-3 z-20 grid gap-3 px-5 py-3 md:grid-cols-[1fr,auto] md:items-center">
      {/* Segment dropdown */}
      <label className="flex items-center gap-3">
        <span className="text-[10px] uppercase tracking-[0.18em] text-bi-text-dim">
          Segment
        </span>
        <select
          value={state.selectedSegment}
          onChange={(e) => onPatch({ selectedSegment: e.target.value as SegmentId })}
          className="flex-1 rounded-md border border-white/15 bg-white px-3 py-1.5 text-sm font-medium text-black outline-none transition focus:border-bi-accent"
        >
          {segments.map((s) => (
            <option key={s.id} value={s.id} className="bg-white text-black">
              {s.label}
            </option>
          ))}
        </select>
      </label>

      {/* Time window pills — "During WC" drives WC mode on /fan */}
      <div
        className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] p-0.5"
        title="During WC switches /fan to the World Cup Special Edition"
      >
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
    </div>
  );
}
