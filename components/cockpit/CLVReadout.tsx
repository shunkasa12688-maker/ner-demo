"use client";

import type { Bottleneck, SegmentReadings } from "@/lib/types";
import { DataTag } from "@/components/DataTag";

/**
 * "Transparent calculator" CLV view broken into the three classic stages.
 * Heights are tied to the lever scores so the bottleneck reads visually.
 */
export function CLVReadout({
  readings,
  bottleneck,
}: {
  readings: SegmentReadings;
  bottleneck: Bottleneck;
}) {
  const acquire = readings.heat.score;
  const keep = readings.retention.score;
  const monetize = readings.money.score;

  const stages: {
    key: Bottleneck | "money";
    label: string;
    sub: string;
    value: number;
  }[] = [
    { key: "heat", label: "Acquire", sub: "drives Heat", value: acquire },
    { key: "retention", label: "Keep", sub: "drives Retention", value: keep },
    { key: "money", label: "Monetize", sub: "drives Money", value: monetize },
  ];
  // The cockpit's chosen bottleneck wins the highlight; Growth maps under
  // "Acquire" because Growth and Heat sit together in the funnel.
  const flaggedStageKey: Bottleneck | "money" =
    bottleneck === "growth" ? "heat" : bottleneck === "retention" ? "retention" : "heat";

  return (
    <div className="bi-card p-5">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-bi-text-dim">
            Customer value (transparent calculator)
          </div>
          <div className="mt-0.5 text-sm text-bi-text">
            Acquire <span className="text-bi-text-dim">→</span> Keep{" "}
            <span className="text-bi-text-dim">→</span> Monetize
          </div>
        </div>
        <div className="text-[10px] text-bi-text-dim">
          Becomes predictive once renewal data flows in
          <DataTag kind="modeled" />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 items-end gap-3">
        {stages.map((s) => {
          const isFlag = s.key === flaggedStageKey;
          return (
            <div key={s.key} className="flex flex-col items-stretch">
              <div className="relative h-32 w-full overflow-hidden rounded-md border border-bi-border bg-bi-surface-hi">
                <div
                  className={`absolute bottom-0 w-full transition-all ${
                    isFlag ? "bg-ner-red/80" : "bg-bi-accent/70"
                  }`}
                  style={{ height: `${s.value}%` }}
                />
                {isFlag && (
                  <div className="absolute inset-x-0 top-1 text-center text-[10px] font-bold uppercase tracking-wider text-ner-red-soft">
                    Bottleneck
                  </div>
                )}
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <div>
                  <div className="text-sm font-semibold">{s.label}</div>
                  <div className="text-[10px] text-bi-text-dim">{s.sub}</div>
                </div>
                <div className="text-sm tabular-nums text-bi-text">{s.value}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
