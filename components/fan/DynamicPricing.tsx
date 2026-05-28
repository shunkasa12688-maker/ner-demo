"use client";

import { CalendarBlank, MapPin, Ticket, TrendUp } from "@phosphor-icons/react";
import { HeroImage } from "./HeroImage";
import { HERO } from "./images";
import type { Segment, SegmentId } from "@/lib/types";

interface SegmentOffer {
  price: number;
  seat: string;
  reason: string;
  comparison: string;
}

const OFFERS: Record<SegmentId, SegmentOffer> = {
  "ne-regulars": {
    price: 38,
    seat: "Sec 142 · Row 14",
    reason: "Same row you sat in last March. Walk-up rate is $54.",
    comparison: "$54 walk-up",
  },
  "wc-watchers": {
    price: 42,
    seat: "Sec 119 · Row 22",
    reason: "First Revolution match since your June trip. Soft renewal hook.",
    comparison: "$58 walk-up",
  },
  "boston-loyalists": {
    price: 35,
    seat: "Sec 108 · Row 9",
    reason: "End-line, in your league. Best value seat for first-time Revs fans.",
    comparison: "$48 walk-up",
  },
  "brazilian-lusophone": {
    price: 32,
    seat: "Sec 134 · Row 16 (Brazilian group block)",
    reason: "Block held for the Lusophone supporter group. Matches your last purchase pattern.",
    comparison: "$54 walk-up",
  },
  "central-american": {
    price: 36,
    seat: "Sec 127 · Row 12",
    reason: "Family-pack adjacent rows held. Two-seat minimum, three available.",
    comparison: "$54 walk-up",
  },
};

export function DynamicPricing({ segment }: { segment: Segment }) {
  const offer = OFFERS[segment.id];

  return (
    <div className="space-y-6">
      <HeroImage
        src="/images/hero-pricing.png"
        unsplash={HERO.dynamicPricing}
        alt="Your seat, your price"
        badge="Your offer"
        title={`Your seat at $${offer.price}.`}
        subtitle="Not the catalog price. Not the walk-up rate. The number our system thinks fits your history — calibrated, not negotiated."
        className="aspect-[16/8]"
      />

      {/* The single offer card — big, confident */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-ner-navy via-ner-navy-deep to-ner-red/20 p-6 text-white ring-1 ring-white/10 md:p-8">
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-ner-red/40 blur-3xl" />
        <div className="relative grid gap-6 md:grid-cols-[1.4fr,1fr] md:items-end">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/70">
              <Ticket className="h-3.5 w-3.5" />
              Personal offer — held for 24 hours
            </div>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-display text-6xl font-extrabold tabular-nums leading-none">
                ${offer.price}
              </span>
              <span className="text-base font-medium text-white/65 line-through">
                {offer.comparison}
              </span>
            </div>
            <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
              <TrendUp weight="bold" className="h-3 w-3" />
              Built for {segment.label}
            </div>
            <div className="mt-5 flex flex-wrap gap-4 text-sm text-white/80">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-white/55" />
                {offer.seat}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarBlank className="h-4 w-4 text-white/55" />
                Saturday · 7:30 PM
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <button className="w-full rounded-xl bg-ner-red px-5 py-3 text-base font-semibold text-white shadow transition hover:bg-ner-red-soft">
              Claim this seat
            </button>
            <button className="w-full rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              See nearby seats
            </button>
          </div>
        </div>
      </div>

      {/* Why this price — short reasoning chain */}
      <div className="glass-card p-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-bi-text-dim">
          Why this price
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-white/85">
          {offer.reason}
        </p>
        <ul className="mt-3 grid gap-2 text-[12px] text-white/65">
          <li className="flex gap-2">
            <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-ner-red-soft" />
            Segment: {segment.label} — converts at 2.4× the unsegmented Greater-Boston pool.
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-ner-red-soft" />
            Spend history: last visit + price band you've previously paid.
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-ner-red-soft" />
            Real-time inventory: same row had two empty seats at last match.
          </li>
        </ul>
      </div>

      <div className="border-t border-white/10 pt-4 text-[11px] text-white/45">
        Audience seen by the cockpit:{" "}
        <span className="font-semibold text-white/75">{segment.label}</span>
      </div>
    </div>
  );
}
