"use client";

import { DataTag } from "@/components/DataTag";
import {
  formatPotential,
  type RevenueLever,
} from "@/lib/revenue-levers";
import { RevenueLeverChart } from "./RevenueLeverChart";

export function RevenueLeverCard({
  lever,
  wcMode,
}: {
  lever: RevenueLever;
  wcMode: boolean;
}) {
  return (
    <div className="bi-card flex h-full flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-bi-text-dim">
            {lever.subtitle}
          </div>
          <div className="mt-0.5 text-base font-semibold text-white">
            {lever.title}
          </div>
        </div>
        <div className="text-right">
          <div
            className="font-display-cockpit text-2xl font-semibold tabular-nums"
            style={{ color: lever.color }}
          >
            {formatPotential(lever.potentialAnnual)}
          </div>
          <div className="mt-0.5 text-[10px] uppercase tracking-wider text-bi-text-dim">
            potential{lever.isCostReduction ? " · cost saving" : ""}
          </div>
        </div>
      </div>

      <p className="mt-4 text-[13px] leading-relaxed text-white/90">
        {lever.why}
      </p>

      <div className="mt-5">
        <RevenueLeverChart lever={lever} wcMode={wcMode} />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[10px] text-bi-text-dim">
        <span>
          Floor {formatPotential(lever.floorAnnual)}
        </span>
        <span className="inline-flex items-center">
          Illustrative — simulated 12-month projection
          <DataTag kind="modeled" />
        </span>
      </div>
    </div>
  );
}
