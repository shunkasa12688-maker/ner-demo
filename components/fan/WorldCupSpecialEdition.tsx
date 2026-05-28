"use client";

import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import type { AppState, SampleData } from "@/lib/types";

/**
 * World Cup Special Edition takeover for /fan, gated on
 * `state.timeWindow === "during-wc"`. Structurally distinct from the
 * standard fan hub:
 *   - Asymmetric editorial grid (wordmark left column / SVG composition right)
 *   - Original "WORLD CUP 26 · BOSTON" wordmark as the dominant identity;
 *     "New England Revolution" appears as a small presenter line
 *   - All imagery generated in CSS/SVG (no third-party photos, no FIFA marks)
 *   - Off-black canvas + single desaturated gold accent
 *   - Subtle perpetual motion (globe rotation, stat-dot pulse, stagger fade-in)
 */
export function WorldCupSpecialEdition({
  state,
  sample,
}: {
  state: AppState;
  sample: SampleData;
}) {
  const segment = sample.segments.find((s) => s.id === state.selectedSegment)!;

  return (
    <div
      className="theme-fan relative min-h-[100dvh] overflow-x-hidden text-[#f4ecd8]"
      style={{ backgroundColor: "#0a0a0c" }}
    >
      <GrainOverlay />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 pt-8 pb-20 md:px-12 md:pt-12 md:pb-32">
        <TopStripe segmentLabel={segment.label} />

        <Wordmark />

        <Hero />

        <StatStrip />

        <Fixtures />

        <RevsAngle />

        <Handoff />

        <Footer />
      </div>

      <KeyframesScoped />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Top stripe — minimalist, no Trophy logo lockup like the standard hub */

function TopStripe({ segmentLabel }: { segmentLabel: string }) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-[#f4ecd8]/10 pb-5">
      <div className="space-y-1">
        <div className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#d4a957]">
          NER · Host city presenter
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#f4ecd8]/45">
          Audience read · {segmentLabel}
        </div>
      </div>
      <div className="flex items-start gap-3">
        <div className="space-y-1 text-right">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.32em] text-[#f4ecd8]/60">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor: "#d4a957",
                animation: "wc-blink 2.4s ease-in-out infinite",
              }}
            />
            Illustrative
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#f4ecd8]/35">
            Sample data
          </div>
        </div>
        <Link
          href="/cockpit"
          target="_blank"
          className="group inline-flex items-center gap-1.5 border border-[#f4ecd8]/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#f4ecd8]/70 transition hover:border-[#d4a957]/60 hover:text-[#d4a957]"
        >
          Cockpit
          <ArrowUpRight weight="bold" className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Wordmark — stacked single-word lines, deliberately NOT a sentence  */

function Wordmark() {
  return (
    <div className="mt-10 md:mt-14">
      <div
        className="text-[10px] font-medium uppercase tracking-[0.42em] text-[#d4a957]"
        style={{ animation: "wc-fade-up 600ms 0ms both" }}
      >
        — Summer 2026 ——
      </div>
      <h1 className="mt-4 font-display font-extrabold leading-[0.82] tracking-[-0.045em]">
        <span
          className="block text-7xl text-[#f4ecd8] md:text-[9rem] lg:text-[11rem]"
          style={{ animation: "wc-fade-up 700ms 80ms both" }}
        >
          WORLD
        </span>
        <span
          className="block text-7xl text-[#f4ecd8] md:text-[9rem] lg:text-[11rem]"
          style={{ animation: "wc-fade-up 700ms 200ms both" }}
        >
          CUP
        </span>
        <span
          className="mt-1 block text-7xl font-black tabular-nums text-[#d4a957] md:text-[9rem] lg:text-[11rem]"
          style={{ animation: "wc-fade-up 700ms 320ms both" }}
        >
          26
        </span>
      </h1>
      <div
        className="mt-6 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.42em] text-[#f4ecd8]/85 md:text-sm"
        style={{ animation: "wc-fade-up 700ms 460ms both" }}
      >
        <span
          aria-hidden
          className="inline-block h-px w-12 bg-[#d4a957] md:w-16"
        />
        Boston · Host city
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero — asymmetric two-column: pitch geometry left, globe SVG right  */

function Hero() {
  return (
    <section className="mt-14 grid gap-10 md:mt-20 md:grid-cols-[1.05fr,1fr] md:gap-16 md:items-center">
      {/* Left: editorial paragraphs sitting on a thin rule */}
      <div className="space-y-6">
        <div className="h-px w-full bg-[#f4ecd8]/12" />
        <p className="max-w-md text-xl font-light leading-[1.35] text-[#f4ecd8]/85 md:text-2xl">
          Seven matches at Gillette.
          <br />
          Three Revolution players on rosters.
          <br />
          One host city <span className="text-[#d4a957]">— ours.</span>
        </p>
        <p className="max-w-md text-sm leading-relaxed text-[#f4ecd8]/55">
          The tournament moves through Foxborough this summer. The crowd
          packing the stands is the same audience walking back through the
          gates in September. The Revolution presents the world's game on
          our pitch — and what comes next.
        </p>
        <div className="h-px w-full bg-[#f4ecd8]/12" />
      </div>

      {/* Right: SVG globe composition */}
      <div className="relative mx-auto w-full max-w-[420px] aspect-square">
        <GlobeSVG />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Globe — original SVG: latitude rings, longitude curves, abstract    */
/* continent polygons in muted flag colors, slow rotation               */

function GlobeSVG() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <radialGradient id="globe-bg" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#16161a" />
          <stop offset="100%" stopColor="#0a0a0c" />
        </radialGradient>
        <linearGradient id="rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d4a957" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#f4ecd8" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#d4a957" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Outer frame — square crop marks */}
      <g stroke="#f4ecd8" strokeOpacity="0.18" strokeWidth="1" fill="none">
        <path d="M0 14 L0 0 L14 0" />
        <path d="M386 0 L400 0 L400 14" />
        <path d="M400 386 L400 400 L386 400" />
        <path d="M14 400 L0 400 L0 386" />
      </g>

      {/* Globe — wrapped in a g that rotates */}
      <g style={{ transformOrigin: "200px 200px", animation: "wc-globe-rotate 90s linear infinite" }}>
        {/* Sphere fill */}
        <circle cx="200" cy="200" r="150" fill="url(#globe-bg)" />

        {/* Latitude rings (ellipses tightening toward poles) */}
        <g fill="none" stroke="#f4ecd8" strokeOpacity="0.18" strokeWidth="1">
          <ellipse cx="200" cy="200" rx="150" ry="36" />
          <ellipse cx="200" cy="200" rx="150" ry="72" />
          <ellipse cx="200" cy="200" rx="150" ry="108" />
          <ellipse cx="200" cy="200" rx="150" ry="144" />
        </g>

        {/* Longitude curves (vertical ellipses) */}
        <g fill="none" stroke="#f4ecd8" strokeOpacity="0.13" strokeWidth="1">
          <ellipse cx="200" cy="200" rx="36" ry="150" />
          <ellipse cx="200" cy="200" rx="72" ry="150" />
          <ellipse cx="200" cy="200" rx="108" ry="150" />
        </g>

        {/* Abstract continent polygons — muted flag colors, irregular shapes */}
        <g>
          <polygon
            points="120,118 168,108 184,148 152,176 118,166 110,140"
            fill="#c95641"
            fillOpacity="0.55"
          />
          <polygon
            points="232,128 282,124 286,170 254,184 230,168"
            fill="#3a6dc4"
            fillOpacity="0.5"
          />
          <polygon
            points="148,224 206,212 232,246 218,278 168,282 138,254"
            fill="#4a9466"
            fillOpacity="0.55"
          />
          <polygon
            points="244,232 296,230 304,266 272,278 246,262"
            fill="#d4a957"
            fillOpacity="0.6"
          />
          <polygon
            points="184,290 224,302 200,328 168,316"
            fill="#f4ecd8"
            fillOpacity="0.18"
          />
        </g>

        {/* Outer sphere stroke on top */}
        <circle
          cx="200"
          cy="200"
          r="150"
          fill="none"
          stroke="url(#rim)"
          strokeWidth="1.5"
        />
      </g>

      {/* Static overlay — orbit ring around the globe (counter-rotates) */}
      <g
        fill="none"
        stroke="#d4a957"
        strokeOpacity="0.32"
        strokeWidth="1"
        style={{
          transformOrigin: "200px 200px",
          animation: "wc-orbit-rotate 60s linear infinite",
        }}
      >
        <ellipse cx="200" cy="200" rx="180" ry="180" strokeDasharray="2 8" />
        <circle cx="200" cy="20" r="3" fill="#d4a957" stroke="none" />
      </g>

      {/* Crosshair tick at center */}
      <g stroke="#f4ecd8" strokeOpacity="0.4" strokeWidth="0.75">
        <line x1="200" y1="195" x2="200" y2="205" />
        <line x1="195" y1="200" x2="205" y2="200" />
      </g>

      {/* Coordinate label */}
      <text
        x="200"
        y="370"
        textAnchor="middle"
        fontSize="10"
        fontFamily="ui-monospace, monospace"
        fill="#f4ecd8"
        fillOpacity="0.45"
        letterSpacing="2"
      >
        42.0909°N · 71.2643°W
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Stat strip — newspaper-statistic row, thin rules between, no cards  */

function StatStrip() {
  const stats = [
    { num: "07", label: "Matches", sub: "at Gillette Stadium" },
    { num: "03", label: "Revs players", sub: "on national rosters" },
    { num: "32", label: "Nations", sub: "in the tournament" },
    { num: "01", label: "Host city", sub: "Boston, USA" },
  ];
  return (
    <section className="mt-20 grid grid-cols-2 gap-y-10 border-y border-[#f4ecd8]/12 py-10 md:mt-28 md:grid-cols-4 md:py-12">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`relative px-2 md:px-6 ${
            i > 0 ? "md:border-l md:border-[#f4ecd8]/10" : ""
          }`}
        >
          <div className="font-mono text-5xl font-light tabular-nums leading-none text-[#f4ecd8] md:text-6xl">
            {s.num}
          </div>
          <div className="mt-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#d4a957]">
            {s.label}
          </div>
          <div className="mt-1 text-xs text-[#f4ecd8]/45">{s.sub}</div>
        </div>
      ))}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Fixtures — financial-paper listing style, no images, color bars only*/

function Fixtures() {
  const rows = [
    { date: "JUN 22", group: "Group D", left: "BRA", right: "POR", time: "7:00 PM", leftColor: "#1a8d3f", rightColor: "#d33a3a" },
    { date: "JUN 26", group: "Group C", left: "MEX", right: "ARG", time: "8:00 PM", leftColor: "#1d6b3f", rightColor: "#4a8fd6" },
    { date: "JUL 02", group: "Group A", left: "USA", right: "CRO", time: "3:00 PM", leftColor: "#2c5fa3", rightColor: "#d33a3a" },
    { date: "JUL 09", group: "R16", left: "GER", right: "FRA", time: "7:00 PM", leftColor: "#1a1a1a", rightColor: "#2c5fa3" },
    { date: "JUL 14", group: "QF", left: "ENG", right: "ESP", time: "7:00 PM", leftColor: "#dde", rightColor: "#d33a3a" },
  ];
  return (
    <section className="mt-20 md:mt-28">
      <div className="flex items-baseline justify-between border-b border-[#f4ecd8]/12 pb-5">
        <h2 className="text-2xl font-extrabold tracking-tight text-[#f4ecd8] md:text-3xl">
          The fixtures.
        </h2>
        <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#f4ecd8]/45">
          Gillette · Foxborough
        </div>
      </div>
      <ul className="mt-2 divide-y divide-[#f4ecd8]/8">
        {rows.map((r) => (
          <li
            key={`${r.date}-${r.left}-${r.right}`}
            className="grid grid-cols-[68px,72px,1fr,auto] items-center gap-4 py-5 transition hover:bg-[#f4ecd8]/[0.02] md:grid-cols-[88px,96px,1fr,auto] md:gap-6 md:py-6"
          >
            <div className="font-mono text-sm tabular-nums text-[#d4a957]">
              {r.date}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#f4ecd8]/45">
              {r.group}
            </div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="inline-block h-3 w-3 flex-shrink-0 rounded-[2px]"
                style={{ backgroundColor: r.leftColor }}
              />
              <span className="font-display text-xl font-bold tracking-tight text-[#f4ecd8] md:text-2xl">
                {r.left}
              </span>
              <span className="font-mono text-xs text-[#f4ecd8]/35">v</span>
              <span className="font-display text-xl font-bold tracking-tight text-[#f4ecd8] md:text-2xl">
                {r.right}
              </span>
              <span
                aria-hidden
                className="inline-block h-3 w-3 flex-shrink-0 rounded-[2px]"
                style={{ backgroundColor: r.rightColor }}
              />
            </div>
            <div className="font-mono text-xs tabular-nums text-[#f4ecd8]/55 md:text-sm">
              {r.time}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Revs angle — magazine-spread zigzag: big number left, paragraph right*/

function RevsAngle() {
  return (
    <section className="mt-24 grid gap-8 md:mt-32 md:grid-cols-[1fr,1.4fr] md:gap-16">
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#d4a957]">
          The Revs angle
        </div>
        <div className="mt-4 flex items-baseline gap-4">
          <span className="font-display text-[7rem] font-extrabold leading-[0.85] tracking-[-0.05em] text-[#f4ecd8] md:text-[10rem]">
            03
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.32em] text-[#f4ecd8]/45">
            on rosters
          </span>
        </div>
      </div>
      <div className="space-y-5">
        <p className="text-lg font-light leading-[1.5] text-[#f4ecd8]/85 md:text-xl">
          Three Revolution players join their national sides for the
          tournament. You'll watch them in red, gold, and white — then watch
          them here, in red and navy, when the league resumes.
        </p>
        <div className="grid grid-cols-3 gap-3">
          {["10 MID · BRA", "07 FWD · USA", "04 DEF · POR"].map((p) => (
            <div
              key={p}
              className="border-l border-[#d4a957] py-2 pl-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#f4ecd8]/70"
            >
              {p}
            </div>
          ))}
        </div>
        <p className="text-sm leading-relaxed text-[#f4ecd8]/45">
          Player numbers and assignments are illustrative for this prototype.
          Real call-up announcements happen closer to the tournament window.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Handoff — full-width pitch geometry SVG behind a statement headline */

function Handoff() {
  return (
    <section className="relative mt-24 overflow-hidden border-y border-[#f4ecd8]/12 py-16 md:mt-32 md:py-24">
      <PitchGeometry />
      <div className="relative">
        <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#d4a957]">
          The handoff
        </div>
        <h2 className="mt-5 font-display text-4xl font-extrabold leading-[0.95] tracking-[-0.04em] text-[#f4ecd8] md:text-6xl lg:text-7xl">
          When the world leaves,
          <br />
          the season begins.
        </h2>
        <div className="mt-8 flex flex-wrap items-baseline gap-4">
          <span
            aria-hidden
            className="inline-block h-px w-12 bg-[#d4a957] md:w-16"
          />
          <span className="font-mono text-sm uppercase tracking-[0.32em] text-[#f4ecd8]/75">
            September 14 · Gillette · Revs return
          </span>
        </div>
      </div>
    </section>
  );
}

/* Pitch lines — desaturated, low contrast — sit behind the handoff text */

function PitchGeometry() {
  return (
    <svg
      viewBox="0 0 1200 360"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <g
        fill="none"
        stroke="#f4ecd8"
        strokeOpacity="0.07"
        strokeWidth="1.5"
      >
        {/* Touchlines */}
        <rect x="40" y="30" width="1120" height="300" />
        {/* Halfway line */}
        <line x1="600" y1="30" x2="600" y2="330" />
        {/* Center circle */}
        <circle cx="600" cy="180" r="60" />
        <circle cx="600" cy="180" r="2" fill="#f4ecd8" fillOpacity="0.18" />
        {/* Penalty areas */}
        <rect x="40" y="90" width="120" height="180" />
        <rect x="1040" y="90" width="120" height="180" />
        {/* Six-yard boxes */}
        <rect x="40" y="135" width="50" height="90" />
        <rect x="1110" y="135" width="50" height="90" />
        {/* Arcs (corner-ish, decorative) */}
        <path d="M 40 30 A 14 14 0 0 1 54 44" />
        <path d="M 1160 30 A 14 14 0 0 0 1146 44" />
        <path d="M 40 330 A 14 14 0 0 0 54 316" />
        <path d="M 1160 330 A 14 14 0 0 1 1146 316" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Footer — minimal, single line of disclaimer                        */

function Footer() {
  return (
    <footer className="mt-20 space-y-3 border-t border-[#f4ecd8]/10 pt-8 md:mt-28">
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#f4ecd8]/45">
        <span>WC mode · driven by "During WC" in the cockpit</span>
        <span>NER Capitalization Demo · Illustrative prototype</span>
      </div>
      <p className="text-[11px] leading-relaxed text-[#f4ecd8]/30">
        Class consulting prototype themed around the New England Revolution
        (Major League Soccer). All imagery on this page is generated in
        code — no FIFA emblem, official World Cup mark, or third-party
        photography is used or implied. Match fixtures, player numbers,
        and headline numerics are illustrative. The Revolution's actual
        FIFA-tournament relationship, if any, is independent of this demo.
      </p>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Grain overlay — fixed full-screen SVG noise, pointer-events: none   */

function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.96 0 0 0 0 0.93 0 0 0 0 0.85 0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        opacity: 0.06,
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Scoped keyframes — kept inline so they live with the component      */

function KeyframesScoped() {
  return (
    <style>{`
      @keyframes wc-fade-up {
        0%   { opacity: 0; transform: translateY(14px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      @keyframes wc-globe-rotate {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }
      @keyframes wc-orbit-rotate {
        from { transform: rotate(0deg); }
        to   { transform: rotate(-360deg); }
      }
      @keyframes wc-blink {
        0%, 100% { opacity: 1; }
        50%      { opacity: 0.35; }
      }
    `}</style>
  );
}
