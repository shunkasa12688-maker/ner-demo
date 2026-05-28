"use client";

import { ShoppingBag, Sparkle, Tag, TShirt } from "@phosphor-icons/react";
import { HeroImage } from "./HeroImage";
import { HERO } from "./images";
import type { Segment, SegmentId } from "@/lib/types";

interface DropPick {
  label: string;
  reason: string;
  price: string;
  stock: string;
}

const DROP: Record<SegmentId, DropPick[]> = {
  "ne-regulars": [
    { label: "Revs × WC ribbon scarf", reason: "Home stripe meets tournament-week colorway. Wear it through the summer.", price: "$48", stock: "Edition of 500" },
    { label: "Foxborough-stamp tee", reason: "Boston-hosts grid print across the chest. Quiet WC nod.", price: "$36", stock: "Edition of 800" },
    { label: "Match-day pin three-pack", reason: "Three of the seven Gillette WC dates, enamelled.", price: "$22", stock: "Edition of 1,000" },
  ],
  "wc-watchers": [
    { label: "Crest-fade WC scarf", reason: "Half Revs crest, half tournament emblem (original). One scarf, two stories.", price: "$48", stock: "Edition of 500" },
    { label: "Boston-Hosts cap", reason: "Quietest piece in the drop. Date stamp on the back.", price: "$34", stock: "Edition of 1,200" },
    { label: "WC fixture poster set", reason: "Three Gillette match posters, original art, ready to frame.", price: "$28", stock: "Edition of 600" },
  ],
  "boston-loyalists": [
    { label: "Skyline-stripe tee", reason: "Boston skyline as the chest stripe. Reads like a city tee, signals like a Revs one.", price: "$36", stock: "Edition of 800" },
    { label: "Three-team scarf bundle", reason: "Revs · Sox · Pats colorway. WC summer, one scarf.", price: "$64", stock: "Edition of 400" },
    { label: "Foxborough enamel pin", reason: "Site marker for everyone who showed up to Gillette this summer.", price: "$14", stock: "Edition of 1,500" },
  ],
  "brazilian-lusophone": [
    { label: "Brasil × Revs hybrid kit", reason: "Yellow-green sleeves, Revs body. Tournament-only drop.", price: "$130", stock: "Edition of 300" },
    { label: "Carioca-stripe scarf", reason: "Rio club stripe pattern, Revs red. Worn over a kit, perfect.", price: "$52", stock: "Edition of 500" },
    { label: "Lusophone matchday tee", reason: '"Força Revs" front, schedule on the back. WC-window only.', price: "$38", stock: "Edition of 700" },
  ],
  "central-american": [
    { label: "CONCACAF heritage scarf", reason: "Four-corner colorway — Honduras / Costa Rica / El Salvador / Revs.", price: "$52", stock: "Edition of 500" },
    { label: "Spanish-language fixture tee", reason: '"Día de partido" across the chest, WC schedule on the sleeve.', price: "$36", stock: "Edition of 700" },
    { label: "Family-three-pack tee", reason: "Three sizes. One household. One discount.", price: "$88", stock: "Edition of 300" },
  ],
};

export function WCMerchDrop({ segment }: { segment: Segment }) {
  const picks = DROP[segment.id];

  return (
    <div className="space-y-6">
      <HeroImage
        src="/images/hero-wc-merch.png"
        unsplash={HERO.wcMerchDrop}
        alt="Made for this tournament"
        badge="WC drop · made for your stripe"
        title="Three pieces. Made for this tournament."
        subtitle="Limited to the WC window. Picked for who you are, not who the store thinks the average fan is. Skip the rest of the shop."
        className="aspect-[16/8]"
      />

      <div className="glass-card flex items-start gap-3 p-4">
        <Sparkle weight="fill" className="mt-0.5 h-5 w-5 flex-shrink-0 text-ner-red-soft" />
        <div className="text-sm leading-relaxed text-white/85">
          The three pieces below are picked for{" "}
          <span className="font-semibold text-white">{segment.label}</span>{" "}
          — the gear we think you'd actually wear. The rest of the shop is
          one click away if you want it.
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {picks.map((p) => (
          <div key={p.label} className="glass-card flex flex-col p-5">
            <div className="flex items-center justify-between gap-2 text-xs uppercase tracking-widest text-white/55">
              <span className="inline-flex items-center gap-1">
                <TShirt className="h-4 w-4" />
                Drop
              </span>
              <span className="inline-flex items-center gap-1 text-ner-red-soft">
                <Tag className="h-3 w-3" />
                {p.stock}
              </span>
            </div>
            <div className="mt-2 text-base font-semibold text-white">
              {p.label}
            </div>
            <div className="mt-1 text-[13px] leading-relaxed text-white/65">
              {p.reason}
            </div>
            <div className="mt-auto flex items-center justify-between pt-4">
              <span className="text-lg font-semibold tabular-nums text-white">
                {p.price}
              </span>
              <button className="rounded-lg bg-ner-red px-3 py-2 text-xs font-semibold text-white transition hover:bg-ner-red-soft">
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 pt-4 text-[11px] text-white/45">
        Audience seen by the cockpit:{" "}
        <span className="font-semibold text-white/75">{segment.label}</span>
      </div>
    </div>
  );
}
