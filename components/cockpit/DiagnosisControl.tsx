"use client";

import { ArrowRight, MapPin } from "@phosphor-icons/react";
import type {
  AppState,
  Bottleneck,
  Segment,
  SegmentId,
  SegmentReadings,
  TimeWindow,
} from "@/lib/types";
import { ALL_TIME_WINDOWS } from "@/lib/types";
import type { PlaybookResult } from "@/lib/playbook";

const TIME_LABELS: Record<TimeWindow, string> = {
  "before-wc": "Before WC",
  "during-wc": "During WC",
  "after-wc": "After WC",
};

const TIME_SUB: Record<TimeWindow, string> = {
  "before-wc": "Spring 2026 lead-in",
  "during-wc": "Tournament window",
  "after-wc": "Fall + drift",
};

const BOTTLENECKS: { key: Bottleneck; label: string; subtitle: string }[] = [
  { key: "heat", label: "Heat", subtitle: "Attention" },
  { key: "growth", label: "Growth", subtitle: "Conversion" },
  { key: "retention", label: "Retention", subtitle: "Stickiness" },
];

export function DiagnosisControl({
  state,
  segments,
  readingsBySegment,
  playbook,
  onPatch,
}: {
  state: AppState;
  segments: Segment[];
  readingsBySegment: Record<SegmentId, SegmentReadings>;
  playbook: PlaybookResult;
  onPatch: (patch: Partial<AppState>) => void;
}) {
  const seg = segments.find((s) => s.id === state.selectedSegment)!;
  const currentBottleneck = state.perSegmentBottleneck[state.selectedSegment];
  const segReadings = readingsBySegment[state.selectedSegment];

  function setSegment(id: SegmentId) {
    onPatch({ selectedSegment: id });
  }
  function setTimeWindow(w: TimeWindow) {
    onPatch({ timeWindow: w });
  }
  function setBottleneck(b: Bottleneck) {
    onPatch({
      perSegmentBottleneck: {
        ...state.perSegmentBottleneck,
        [state.selectedSegment]: b,
      },
    });
  }

  return (
    <div className="bi-card overflow-hidden">
      <div className="border-b border-bi-border bg-bi-surface-hi px-5 py-3 text-xs uppercase tracking-widest text-bi-text-dim">
        Diagnosis builder
      </div>

      {/* Step 1: segment tiles */}
      <Step
        n="1"
        title="Pick a segment to analyze"
        sub="Each tile shows the segment's current Heat score for a quick scan."
      >
        <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
          {segments.map((s) => {
            const r = readingsBySegment[s.id];
            const active = s.id === state.selectedSegment;
            return (
              <button
                key={s.id}
                onClick={() => setSegment(s.id)}
                className={`flex flex-col items-start gap-2 rounded-lg border p-3 text-left transition ${
                  active
                    ? "border-ner-red bg-ner-red/10 shadow-[0_0_24px_-6px_rgba(221,31,45,0.5)]"
                    : "border-bi-border bg-bi-surface-hi hover:border-bi-accent/40"
                }`}
              >
                <div className="text-xs font-semibold leading-tight text-bi-text">
                  {s.label}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold tabular-nums">
                    {r.heat.score}
                  </span>
                  <span className="text-[10px] text-bi-text-dim">heat</span>
                </div>
                {s.localCluster && (
                  <div className="inline-flex items-center gap-1 text-[10px] text-bi-text-dim">
                    <MapPin className="h-3 w-3" />
                    {s.localCluster.town}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </Step>

      {/* Step 2: time window stepper */}
      <Step
        n="2"
        title="Time window"
        sub="Different windows fire different rules — Retention before vs. during vs. after WC swaps to a different intervention."
      >
        <div className="grid grid-cols-3 gap-2">
          {ALL_TIME_WINDOWS.map((w) => {
            const active = state.timeWindow === w;
            return (
              <button
                key={w}
                onClick={() => setTimeWindow(w)}
                className={`flex flex-col items-start gap-1 rounded-lg border p-3 text-left transition ${
                  active
                    ? "border-bi-accent bg-bi-accent/10 text-bi-text shadow-[0_0_24px_-6px_rgba(106,161,255,0.5)]"
                    : "border-bi-border bg-bi-surface-hi text-bi-text-dim hover:border-bi-accent/40 hover:text-bi-text"
                }`}
              >
                <div className="text-sm font-semibold">{TIME_LABELS[w]}</div>
                <div className="text-[10px] text-bi-text-dim">
                  {TIME_SUB[w]}
                </div>
              </button>
            );
          })}
        </div>
      </Step>

      {/* Step 3: bottleneck radio cards */}
      <Step
        n="3"
        title="What's bottlenecking this segment?"
        sub={`Each card shows ${seg.label}'s current score on that lever.`}
      >
        <div className="grid gap-2 md:grid-cols-3">
          {BOTTLENECKS.map((b) => {
            const r = segReadings[b.key];
            const active = currentBottleneck === b.key;
            const statusColor =
              r.status === "low"
                ? "text-bi-neg"
                : r.status === "high"
                  ? "text-bi-pos"
                  : "text-bi-warn";
            return (
              <button
                key={b.key}
                onClick={() => setBottleneck(b.key)}
                className={`flex items-start gap-3 rounded-lg border p-3 text-left transition ${
                  active
                    ? "border-ner-red bg-ner-red/10 shadow-[0_0_24px_-6px_rgba(221,31,45,0.5)]"
                    : "border-bi-border bg-bi-surface-hi hover:border-ner-red/50"
                }`}
              >
                <span
                  className={`mt-0.5 h-3.5 w-3.5 flex-shrink-0 rounded-full border-2 ${
                    active
                      ? "border-ner-red bg-ner-red"
                      : "border-bi-text-dim"
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-semibold text-bi-text">
                      {b.label}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-bi-text-dim">
                      {b.subtitle}
                    </span>
                  </div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-base font-bold tabular-nums text-bi-text">
                      {r.score}
                    </span>
                    <span className="text-[10px] text-bi-text-dim">
                      / 100
                    </span>
                    <span className={`text-[10px] font-semibold uppercase tracking-wide ${statusColor}`}>
                      {r.status}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </Step>

      {/* "Fires" footer */}
      <div className="flex items-center justify-between gap-3 border-t border-bi-border bg-bi-surface-hi px-5 py-3 text-sm">
        <div className="flex items-center gap-2 text-bi-text-dim">
          <span className="text-[10px] uppercase tracking-widest">
            This combination fires
          </span>
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-ner-red-soft">
            {playbook.entry.title}
          </div>
          <div className="font-mono text-[10px] text-bi-text-dim">
            {playbook.ruleText}
          </div>
        </div>
      </div>
    </div>
  );
}

function Step({
  n,
  title,
  sub,
  children,
}: {
  n: string;
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-bi-border p-5 last:border-b-0">
      <div className="mb-3 flex items-baseline gap-3">
        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-bi-accent/15 text-[11px] font-bold text-bi-accent">
          {n}
        </div>
        <div>
          <div className="text-sm font-semibold text-bi-text">{title}</div>
          <div className="text-[11px] text-bi-text-dim">{sub}</div>
        </div>
      </div>
      {children}
    </div>
  );
}
