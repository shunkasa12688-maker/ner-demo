"use client";

import { ShoppingBag, Sparkle, TShirt } from "@phosphor-icons/react";
import { HeroImage } from "./HeroImage";
import { HERO } from "./images";
import type { Segment, SegmentId } from "@/lib/types";

interface MerchTile {
  label: string;
  reason: string;
  price: string;
}

const PICKS_BY_SEGMENT: Record<SegmentId, MerchTile[]> = {
  "ne-regulars": [
    { label: "Season scarf — 2026 edition", reason: "You wore last season's. This year's stripe is darker.", price: "$45" },
    { label: "Tifo-print hoodie", reason: "Same artwork as the matchday tifo. Limited run.", price: "$78" },
    { label: "Home kit — your name on the back", reason: "Quickest custom in the shop. Two-day turnaround.", price: "$120" },
  ],
  "wc-watchers": [
    { label: "World Cup × Revs scarf", reason: "Two crests, one scarf. Wear it through the tournament.", price: "$45" },
    { label: "Boston-hosts tee", reason: "Boston hosts the WC. This says so without screaming.", price: "$35" },
    { label: "Crest-only cap", reason: "Quietest piece in the shop. Wear it anywhere.", price: "$32" },
  ],
  "boston-loyalists": [
    { label: "Boston-skyline crest tee", reason: "Looks like a city tee. Reads like a Revs fan.", price: "$35" },
    { label: "Bruins-style varsity jacket", reason: "Cut you already know. Red where the gold would be.", price: "$165" },
    { label: "Three-team scarf bundle", reason: "Revs · Sox · Pats colorway. One scarf, three loyalties.", price: "$60" },
  ],
  "brazilian-lusophone": [
    { label: "Brasil × Revs hybrid kit", reason: "Yellow/green sleeves, Revs body. One-of-one drop.", price: "$130" },
    { label: "Carioca-stripe scarf", reason: "Stripe pattern from Rio's most-worn club, in Revs red.", price: "$50" },
    { label: "Portuguese-language hoodie", reason: '"Força Revs" across the chest. Limited.', price: "$78" },
  ],
  "central-american": [
    { label: "CONCACAF heritage scarf", reason: "Honduras / Costa Rica / El Salvador / Revs corners.", price: "$50" },
    { label: "Spanish-language matchday tee", reason: '"Día de partido" front, schedule on the back.', price: "$35" },
    { label: "Family-pack t-shirt bundle", reason: "Three sizes. One household. One discount.", price: "$85" },
  ],
};

export function MerchandiseUplift({ segment }: { segment: Segment }) {
  const picks = PICKS_BY_SEGMENT[segment.id];

  return (
    <div className="space-y-6">
      <HeroImage
        src="/images/hero-merch.png"
        unsplash={HERO.merch}
        alt="Made for you"
        badge="Made for you"
        title="Three pieces. Picked for you."
        subtitle="Not the whole shop — what fits your stripe of being a Revs fan. Skip the rest."
        className="aspect-[16/8]"
      />

      <div className="glass-card flex items-start gap-3 p-4">
        <Sparkle weight="fill" className="mt-0.5 h-5 w-5 flex-shrink-0 text-ner-red-soft" />
        <div className="text-sm text-white/85">
          Based on what we know about{" "}
          <span className="font-semibold text-white">{segment.label}</span>{" "}
          — the three items below are the ones that historically convert
          for fans like you. We hid the other 200 SKUs.
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {picks.map((tile) => (
          <div
            key={tile.label}
            className="glass-card flex flex-col p-5"
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/55">
              <TShirt className="h-4 w-4" /> Pick
            </div>
            <div className="mt-2 text-base font-semibold text-white">
              {tile.label}
            </div>
            <div className="mt-1 text-[13px] leading-relaxed text-white/65">
              {tile.reason}
            </div>
            <div className="mt-auto flex items-center justify-between pt-4">
              <span className="text-lg font-semibold text-white tabular-nums">
                {tile.price}
              </span>
              <button className="rounded-lg bg-ner-red px-3 py-2 text-xs font-semibold text-white transition hover:bg-ner-red-soft">
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-ner-navy via-ner-navy-deep to-ner-red/20 p-6 text-white ring-1 ring-white/10">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-ner-red/40 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/70">
            <ShoppingBag className="h-3.5 w-3.5" /> Cityzens-style precision
          </div>
          <div className="mt-3 text-xl font-bold">
            Smaller shop. Bigger basket.
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/75">
            Manchester City's Cityzens program lifted per-fan digital
            merch 30–40% by showing fewer, more-relevant SKUs. We're
            running the same play here — your three picks beat the
            scrollable catalogue.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 pt-4 text-[11px] text-white/45">
        Audience seen by the cockpit:{" "}
        <span className="font-semibold text-white/75">{segment.label}</span>
      </div>
    </div>
  );
}
