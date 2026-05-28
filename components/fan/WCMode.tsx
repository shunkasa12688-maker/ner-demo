"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin, Trophy } from "@phosphor-icons/react";
import type { AppState, CatalogEntry, SampleData } from "@/lib/types";
import { resolveCatalog, selectIntervention } from "@/lib/playbook";
import { InterventionRouter } from "./InterventionRouter";
import { NewsStrip } from "./NewsStrip";

/**
 * /fan layout used when timeWindow=during-wc. Wraps the active playbook
 * content in a tournament-grade identity (gold + warm cream + off-black,
 * original CSS/SVG visuals, festive but professional). Distinct from the
 * standard /fan layout AND from the prior WorldCupSpecialEdition takeover.
 *
 * Design philosophy distilled from the UI/UX skill brief:
 *   - Match design to product category: sports / global tournament
 *   - Industry-aligned palette (championship gold, pitch emerald accent)
 *   - WCAG-conscious contrast (warm cream on off-black > 12:1)
 *   - Soft shadows, 200-300ms transitions, hover/focus states
 *   - Responsive (mobile-first, breakpoints at sm/md/lg)
 *   - Original visuals only — no third-party logos or FIFA marks
 */
export function WCMode({
  state,
  sample,
  catalog,
}: {
  state: AppState;
  sample: SampleData;
  catalog: CatalogEntry[] | null;
}) {
  const segment = sample.segments.find((s) => s.id === state.selectedSegment)!;
  const resolvedCatalog = resolveCatalog(catalog);
  const ruleResult = selectIntervention({
    bottleneck: state.perSegmentBottleneck[state.selectedSegment],
    segment,
    timeWindow: state.timeWindow,
    catalog: resolvedCatalog,
  });
  const activeKind = state.manualOverride ?? ruleResult.kind;
  const activeEntry = resolvedCatalog[activeKind];

  return (
    <div
      className="theme-fan relative min-h-[100dvh] overflow-x-hidden text-[#f4ecd8]"
      style={{ backgroundColor: "#0a0a0c" }}
    >
      <GrainOverlay />

      <TopBanner />
      <FixtureTicker />

      <main className="relative z-10 mx-auto max-w-[1400px] px-6 py-12 md:px-12 md:py-16">
        {/* WC-only news strip — tournament headlines, no MLS / academy items */}
        <NewsStrip variant="wc" />

        {/* Active-playbook eyebrow — small, oriented to the analyst's pick */}
        <div className="mb-6 mt-8 flex flex-wrap items-center justify-between gap-3 text-[10px] uppercase tracking-[0.32em] text-[#f4ecd8]/55">
          <span className="inline-flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-[#e8b86d]"
              style={{ animation: "wc-pulse 2.4s ease-in-out infinite" }}
            />
            Now showing · {activeEntry.title}
          </span>
          <span className="text-[#f4ecd8]/35">
            For {segment.label}
          </span>
        </div>

        {/* Tournament card frame — thin gold border around the playbook content */}
        <div className="relative">
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-[#e8b86d]/40 via-[#f4ecd8]/10 to-[#e8b86d]/30" />
          <div className="relative rounded-3xl bg-[#0c0c10] p-6 md:p-10">
            <InterventionRouter
              state={state}
              sample={sample}
              catalog={catalog}
            />
          </div>
        </div>
      </main>

      <Footer segmentLabel={segment.label} />

      <KeyframesScoped />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Top banner — full-bleed, gold gradient + original WC 26 wordmark    */

function TopBanner() {
  return (
    <section className="relative overflow-hidden border-b border-[#e8b86d]/25">
      {/* Gold gradient background, subtle shimmer */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #0a0a0c 0%, #1a160e 35%, #2d2516 60%, #0a0a0c 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(232,184,109,0.18) 50%, transparent 100%)",
          animation: "wc-shimmer 8s ease-in-out infinite",
        }}
      />
      {/* Flag-stripe accent across the top edge — 4 thin stripes */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 grid grid-cols-4 h-[3px]"
      >
        <span style={{ backgroundColor: "#c95641" }} />
        <span style={{ backgroundColor: "#3a6dc4" }} />
        <span style={{ backgroundColor: "#4a9466" }} />
        <span style={{ backgroundColor: "#e8b86d" }} />
      </div>

      <div className="relative mx-auto grid max-w-[1400px] gap-6 px-6 py-10 md:grid-cols-[1.4fr,1fr] md:items-end md:gap-12 md:px-12 md:py-14">
        {/* Wordmark — original lockup, no FIFA marks */}
        <div>
          <div
            className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.42em] text-[#e8b86d]"
            style={{ animation: "wc-fade-up 600ms 0ms both" }}
          >
            <Trophy weight="fill" className="h-3 w-3" />
            Summer 2026 · Boston is the venue
          </div>
          <h1
            className="mt-4 font-display tracking-[-0.045em] text-[#f4ecd8]"
            style={{ animation: "wc-fade-up 700ms 120ms both" }}
          >
            <span className="block text-5xl font-extrabold leading-[0.88] md:text-7xl lg:text-[7.5rem]">
              WORLD CUP
            </span>
            <span
              className="mt-1 block text-7xl font-black leading-[0.85] tabular-nums md:text-[8rem] lg:text-[10rem]"
              style={{ color: "#e8b86d" }}
            >
              26
            </span>
          </h1>
          <div
            className="mt-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.42em] text-[#f4ecd8]/85 md:text-sm"
            style={{ animation: "wc-fade-up 700ms 280ms both" }}
          >
            <span
              aria-hidden
              className="inline-block h-px w-10 bg-[#e8b86d] md:w-14"
            />
            Boston · Host city
            <span
              aria-hidden
              className="inline-block h-px w-10 bg-[#e8b86d] md:w-14"
            />
          </div>
        </div>

        {/* Presenter credit + cockpit link */}
        <div className="md:text-right">
          <div
            className="text-[10px] uppercase tracking-[0.32em] text-[#f4ecd8]/45"
            style={{ animation: "wc-fade-up 700ms 360ms both" }}
          >
            Presented by
          </div>
          <div
            className="mt-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#f4ecd8] md:text-base"
            style={{ animation: "wc-fade-up 700ms 440ms both" }}
          >
            New England Revolution
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3 md:justify-end">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e8b86d]/30 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.28em] text-[#e8b86d]">
              <MapPin weight="bold" className="h-3 w-3" />
              Foxborough
            </span>
            <Link
              href="/cockpit"
              target="_blank"
              className="group inline-flex items-center gap-1.5 rounded-full border border-[#f4ecd8]/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f4ecd8]/75 transition duration-200 hover:border-[#e8b86d]/60 hover:text-[#e8b86d]"
            >
              Cockpit
              <ArrowUpRight
                weight="bold"
                className="h-3 w-3 transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Fixture ticker — sticky strip with the week's WC matches            */

function FixtureTicker() {
  const items = [
    { when: "Sat 6/22 · 7:00 PM", match: "BRA — POR", venue: "Gillette" },
    { when: "Tue 6/26 · 8:00 PM", match: "MEX — ARG", venue: "Gillette" },
    { when: "Thu 6/28 · 6:30 PM", match: "USA — CRO", venue: "Gillette" },
    { when: "Sun 7/2 · 3:00 PM", match: "GER — FRA", venue: "Gillette" },
    { when: "Wed 7/9 · 7:00 PM", match: "ENG — ESP", venue: "Gillette" },
    { when: "Sat 7/12 · 8:00 PM", match: "NED — BEL", venue: "Gillette" },
  ];
  // Duplicate the items so the marquee scroll feels seamless
  const loop = [...items, ...items];
  return (
    <div className="relative border-b border-[#f4ecd8]/10 bg-[#0a0a0c]">
      <div className="absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#0a0a0c] to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#0a0a0c] to-transparent" />
      <div className="overflow-hidden py-3">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "wc-marquee 60s linear infinite" }}
        >
          {loop.map((item, i) => (
            <span
              key={`${item.when}-${i}`}
              className="inline-flex items-center gap-3 px-6 text-[11px] font-mono uppercase tracking-[0.22em] text-[#f4ecd8]/70"
            >
              <span
                aria-hidden
                className="inline-block h-1 w-1 flex-shrink-0 rounded-full bg-[#e8b86d]"
              />
              <span className="text-[#e8b86d]">{item.when}</span>
              <span className="text-[#f4ecd8]">{item.match}</span>
              <span className="text-[#f4ecd8]/45">{item.venue}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Footer — minimal, with WC-mode reminder + audience context          */

function Footer({ segmentLabel }: { segmentLabel: string }) {
  return (
    <footer className="relative z-10 mx-auto max-w-[1400px] space-y-3 border-t border-[#f4ecd8]/10 px-6 pb-10 pt-8 md:px-12 md:pb-14">
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#f4ecd8]/45">
        <span>WC mode active · driven by &ldquo;During WC&rdquo; in the cockpit</span>
        <span>Audience · {segmentLabel}</span>
      </div>
      <p className="max-w-3xl text-[11px] leading-relaxed text-[#f4ecd8]/30">
        New England Revolution prototype. All imagery on this page is
        generated in code — no FIFA emblem, official tournament mark, or
        third-party photography is used or implied. Match fixtures and
        numerics are illustrative. The Revolution&apos;s actual
        FIFA-tournament relationship, if any, is independent of this demo.
      </p>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Grain overlay — fixed pointer-events-none, SVG noise                */

function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.96 0 0 0 0 0.93 0 0 0 0 0.85 0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        opacity: 0.05,
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Scoped keyframes                                                    */

function KeyframesScoped() {
  return (
    <style>{`
      @keyframes wc-fade-up {
        0%   { opacity: 0; transform: translateY(14px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      @keyframes wc-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50%      { opacity: 0.45; transform: scale(0.85); }
      }
      @keyframes wc-shimmer {
        0%, 100% { transform: translateX(-15%); opacity: 0.25; }
        50%      { transform: translateX(15%);  opacity: 0.4;  }
      }
      @keyframes wc-marquee {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }
    `}</style>
  );
}
