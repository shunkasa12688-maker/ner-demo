"use client";

import { ArrowDownRight, ArrowUpRight, Info, Minus } from "@phosphor-icons/react";
import type { Lever, LeverReading } from "@/lib/types";
import { DataTag } from "@/components/DataTag";
import { TrendChart } from "./TrendChart";

const LEVER_META: Record<Lever, { title: string; subtitle: string; color: string }> = {
  heat: { title: "Heat", subtitle: "Attention", color: "#f87171" },
  growth: { title: "Growth", subtitle: "New fans / conversion", color: "#6aa1ff" },
  retention: { title: "Retention", subtitle: "Keeping them", color: "#4ade80" },
  money: { title: "Money", subtitle: "Revenue per fan", color: "#fbbf24" },
};

export function LeverPanel({
  lever,
  reading,
  isBottleneck,
  onOpen,
}: {
  lever: Lever;
  reading: LeverReading;
  isBottleneck?: boolean;
  onOpen?: (lever: Lever) => void;
}) {
  const m = LEVER_META[lever];
  const trend = reading.changeLabel.trim();
  const isPos = trend.startsWith("+");
  const isNeg = trend.startsWith("−") || trend.startsWith("-");
  const TrendIcon = isPos ? ArrowUpRight : isNeg ? ArrowDownRight : Minus;
  const trendColor = isPos
    ? "text-bi-pos"
    : isNeg
      ? "text-bi-neg"
      : "text-bi-text-dim";
  const Tag = onOpen ? "button" : "div";
  return (
    <Tag
      onClick={onOpen ? () => onOpen(lever) : undefined}
      type={onOpen ? "button" : undefined}
      className={`bi-card group relative w-full p-4 text-left transition ${
        onOpen ? "cursor-pointer hover:border-bi-accent/60" : ""
      } ${
        isBottleneck
          ? "ring-2 ring-ner-red/70 shadow-[0_0_24px_-4px_rgba(221,31,45,0.5)]"
          : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-bi-text-dim">
            {m.subtitle}
          </div>
          <div className="text-base font-semibold">{m.title}</div>
        </div>
        <div className="flex items-center gap-1.5">
          {isBottleneck && (
            <span className="rounded-full bg-ner-red/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ner-red-soft">
              Bottleneck
            </span>
          )}
          {onOpen && (
            <span className="inline-flex items-center gap-1 rounded-md border border-bi-border bg-bi-bg/40 px-1.5 py-0.5 text-[10px] text-bi-text-dim opacity-0 transition group-hover:opacity-100">
              <Info className="h-3 w-3" />
              How it&apos;s calculated
            </span>
          )}
        </div>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl font-semibold tabular-nums">
          {reading.score}
        </span>
        <span className="text-xs text-bi-text-dim">/100</span>
        <span className={`ml-auto inline-flex items-center gap-0.5 text-sm ${trendColor}`}>
          <TrendIcon className="h-4 w-4" />
          {trend}
        </span>
      </div>
      <div className="mt-3">
        <TrendChart data={reading.history} color={m.color} />
      </div>
      <div className="mt-2 text-[10px] text-bi-text-dim">
        Past 8 windows
        <DataTag kind="modeled" />
      </div>
    </Tag>
  );
}
