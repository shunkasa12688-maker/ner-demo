"use client";

import {
  PORTFOLIO_TOTALS,
  REVENUE_LEVERS,
  formatPotential,
} from "@/lib/revenue-levers";
import { RevenueLeverCard } from "./RevenueLeverCard";

/**
 * Analytics view — illustrative annual outcome for the four revenue
 * levers. No /fan wiring: these cards are read-only narrative + charts.
 */
export function RevenuePanel({ wcMode }: { wcMode: boolean }) {
  return (
    <div className="space-y-5">
      {/* Header row: portfolio total — no in-panel toggle (lives in TopBar now) */}
      <div className="bi-card-hi flex flex-col gap-2 p-5 md:flex-row md:items-baseline md:justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-bi-text-dim">
            Playbook portfolio · annual outcome
          </div>
          <div className="mt-0.5 font-display-cockpit text-2xl font-semibold tabular-nums text-white">
            {formatPotential(PORTFOLIO_TOTALS.floorAnnual)}
            <span className="mx-2 text-bi-text-dim">→</span>
            {formatPotential(PORTFOLIO_TOTALS.potentialAnnual)}
          </div>
        </div>
        <div className="max-w-md text-[11px] leading-relaxed text-bi-text-dim">
          Floor → potential across the four commercial revenue levers.
          Illustrative analysis — these numbers don't drive any live UI.
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {REVENUE_LEVERS.map((lever) => (
          <RevenueLeverCard key={lever.id} lever={lever} wcMode={wcMode} />
        ))}
      </div>
    </div>
  );
}
