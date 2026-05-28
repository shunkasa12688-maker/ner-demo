"use client";

import { Handshake, SealCheck, TrendUp } from "@phosphor-icons/react";
import { HeroImage } from "./HeroImage";
import { HERO } from "./images";
import type { Segment } from "@/lib/types";

const PARTNERS = [
  {
    name: "Arbella Insurance",
    pitch: "Built for Massachusetts drivers — extra for Revs season holders during the WC window.",
    offer: "First two months free + WC scarf bundle.",
  },
  {
    name: "Santander",
    pitch: "Banking with international muscle. Stays with you across the tournament and home matches.",
    offer: "Zero fees on cross-border WC travel for the next 90 days.",
  },
  {
    name: "Mass General Brigham",
    pitch: "Same sports-med team that treats the Revolution. Priority access for active fans.",
    offer: "Same-day appointment slots reserved for verified members.",
  },
];

export function WCSponsorRally({ segment }: { segment: Segment }) {
  return (
    <div className="space-y-6">
      <HeroImage
        src="/images/hero-wc-sponsors.png"
        unsplash={HERO.wcSponsorRally}
        alt="Partners at the World Cup"
        badge="Verified audience · WC window"
        title="The brands who showed up for the world."
        subtitle="Sponsors don't pay for eyeballs anymore — they pay for audiences. Verified, segmented, opted-in. Here are the three running with us this summer."
        className="aspect-[16/8]"
      />

      <div className="glass-card flex items-start gap-3 p-4">
        <SealCheck weight="light" className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-300" />
        <div className="text-sm leading-relaxed text-white/85">
          <span className="font-semibold text-white">
            Offers picked for you, not blasted at everyone.
          </span>{" "}
          Each partner below put together something specific for fans
          like <span className="font-semibold text-white">{segment.label}</span>{" "}
          — not the same coupon the whole city gets.
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {PARTNERS.map((p) => (
          <div
            key={p.name}
            className="glass-card flex flex-col p-5"
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/55">
              <Handshake className="h-4 w-4" />
              WC partner
            </div>
            <div className="mt-2 text-base font-semibold text-white">
              {p.name}
            </div>
            <p className="mt-1 text-[13px] leading-relaxed text-white/70">
              {p.pitch}
            </p>
            <div className="mt-auto pt-4">
              <div className="rounded-lg border border-ner-red/30 bg-ner-red/10 px-3 py-2 text-[12px] font-medium text-ner-red-soft">
                {p.offer}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Numbers strip — simple summer-by-the-numbers */}
      <div className="grid grid-cols-3 gap-4 border-y border-white/10 py-6">
        <Stat headline="3" label="Local partners at the tournament" />
        <Stat headline="07" label="World Cup matches at Gillette" />
        <Stat headline="—" label="Offers picked for you" />
      </div>

      <div className="border-t border-white/10 pt-4 text-[11px] text-white/45">
        Audience seen by the cockpit:{" "}
        <span className="font-semibold text-white/75">{segment.label}</span>
      </div>
    </div>
  );
}

function Stat({ headline, label }: { headline: string; label: string }) {
  return (
    <div className="text-center">
      <div className="flex items-baseline justify-center gap-1">
        <span className="font-display text-3xl font-bold tabular-nums text-white">
          {headline}
        </span>
        <TrendUp weight="bold" className="h-4 w-4 text-emerald-300" />
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-widest text-white/55">
        {label}
      </div>
    </div>
  );
}
