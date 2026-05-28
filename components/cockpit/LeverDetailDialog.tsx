"use client";

import { X } from "@phosphor-icons/react";
import type { Lever, LeverReading } from "@/lib/types";
import { LEVER_DEFINITIONS } from "@/lib/lever-definitions";
import { DataTag } from "@/components/DataTag";
import { TrendChart } from "./TrendChart";

const LEVER_COLOR: Record<Lever, string> = {
  heat: "#f87171",
  growth: "#6aa1ff",
  retention: "#4ade80",
  money: "#fbbf24",
};

export function LeverDetailDialog({
  lever,
  reading,
  onClose,
}: {
  lever: Lever;
  reading: LeverReading;
  onClose: () => void;
}) {
  const def = LEVER_DEFINITIONS[lever];
  const statusLabel =
    reading.status === "low" ? "Low" : reading.status === "high" ? "High" : "OK";
  const statusColor =
    reading.status === "low"
      ? "bg-bi-neg/15 text-bi-neg border-bi-neg/40"
      : reading.status === "high"
        ? "bg-bi-pos/15 text-bi-pos border-bi-pos/40"
        : "bg-bi-warn/15 text-bi-warn border-bi-warn/40";

  return (
    <div
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-surface flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-bi-text-dim">
              Lever · {def.subtitle}
            </div>
            <div className="mt-0.5 flex items-baseline gap-3">
              <span className="text-2xl font-bold">{def.title}</span>
              <span
                className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${statusColor}`}
              >
                {statusLabel} · {reading.score}/100
              </span>
              <DataTag kind={def.measuredOrModeled} />
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-bi-text-dim transition hover:bg-white/10 hover:text-bi-text"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body — single column so the narrative reads top to bottom:
            Definition → Inputs → Thresholds → Diagram → Formula */}
        <div className="flex-1 space-y-5 overflow-y-auto p-5">
          <Section title="Definition">
            <p className="text-sm leading-relaxed text-bi-text">
              {def.definition}
            </p>
          </Section>

          <Section title="Inputs">
            <ul className="space-y-1.5 text-sm text-bi-text">
              {def.inputs.map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-bi-accent" />
                  <span className="text-bi-text-dim">{line}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Thresholds">
            <div className="grid gap-2 text-[12px] sm:grid-cols-3">
              <ThresholdTile color="neg" label="Low" body={def.thresholds.low} />
              <ThresholdTile color="warn" label="OK" body={def.thresholds.ok} />
              <ThresholdTile color="pos" label="High" body={def.thresholds.high} />
            </div>
          </Section>

          <Section title="Recent windows">
            <div className="rounded-lg border border-white/10 bg-black/20 p-3">
              <TrendChart
                data={reading.history}
                color={LEVER_COLOR[lever]}
                height={140}
              />
              <div className="mt-2 flex items-baseline justify-between text-xs">
                <span className="text-bi-text-dim">8-window history</span>
                <span className="font-mono tabular-nums text-bi-text">
                  Δ {reading.changeLabel}
                </span>
              </div>
            </div>
          </Section>

          <Section title="Why this matters">
            <p className="text-sm leading-relaxed text-white/90">
              {def.whyThisMatters}
            </p>
            <div className="mt-3 text-[11px] leading-relaxed text-bi-text-dim">
              The numbers shown are{" "}
              <span className="font-semibold text-bi-text">illustrative</span>{" "}
              — generated from a deterministic seed for the demo.
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 text-[10px] uppercase tracking-widest text-bi-text-dim">
        {title}
      </div>
      {children}
    </div>
  );
}

function ThresholdTile({
  color,
  label,
  body,
}: {
  color: "neg" | "warn" | "pos";
  label: string;
  body: string;
}) {
  const colorClasses = {
    neg: "border-bi-neg/40 bg-bi-neg/10 text-bi-neg",
    warn: "border-bi-warn/40 bg-bi-warn/10 text-bi-warn",
    pos: "border-bi-pos/40 bg-bi-pos/10 text-bi-pos",
  }[color];
  return (
    <div className="rounded-lg border border-white/10 bg-black/20 p-3">
      <div
        className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${colorClasses}`}
      >
        {label}
      </div>
      <div className="mt-2 text-[12px] leading-snug text-bi-text">{body}</div>
    </div>
  );
}

