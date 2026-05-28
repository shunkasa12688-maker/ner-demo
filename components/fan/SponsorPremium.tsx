"use client";

import { Handshake, ShieldCheck, Sparkle } from "@phosphor-icons/react";
import { HeroImage } from "./HeroImage";
import { HERO } from "./images";
import type { Segment } from "@/lib/types";

const PARTNERS = [
  {
    name: "Arbella Insurance",
    tagline: "Home & auto — coverage built for Massachusetts.",
    offer: "Two months free on a Revs-fan policy.",
  },
  {
    name: "Santander",
    tagline: "Banking that travels with the team.",
    offer: "Zero fees on your first season-ticket installment.",
  },
  {
    name: "Mass General Brigham",
    tagline: "Sports medicine — same team that treats the Revs.",
    offer: "Priority scheduling for season members.",
  },
];

export function SponsorPremium({ segment }: { segment: Segment }) {
  return (
    <div className="space-y-6">
      <HeroImage
        src="/images/hero-sponsors.png"
        unsplash={HERO.sponsor}
        alt="Meet our partners"
        badge="For the audience that fits"
        title="The brands the Revs run with."
        subtitle="Three partners pulled because they actually match your segment — not the catalogue of everyone we sell to."
        className="aspect-[16/8]"
      />

      <div className="glass-card flex items-start gap-3 p-4">
        <ShieldCheck weight="light" className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-300" />
        <div className="text-sm text-white/85">
          <span className="font-semibold text-white">Verified audience.</span>{" "}
          You're in a segment our partners pay extra to reach because we know
          who you are. That means the offers below were picked for{" "}
          <span className="font-semibold text-white">{segment.label}</span>{" "}
          — not blasted at every Boston-area inbox.
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {PARTNERS.map((p) => (
          <div
            key={p.name}
            className="glass-card flex flex-col p-5"
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/55">
              <Handshake className="h-4 w-4" /> Partner
            </div>
            <div className="mt-2 text-base font-semibold text-white">
              {p.name}
            </div>
            <div className="mt-1 text-[13px] leading-relaxed text-white/70">
              {p.tagline}
            </div>
            <div className="mt-auto pt-4">
              <div className="rounded-lg border border-ner-red/30 bg-ner-red/10 px-3 py-2 text-[12px] font-medium text-ner-red-soft">
                <Sparkle weight="fill" className="mr-1 inline h-3 w-3" />
                {p.offer}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-ner-navy via-ner-navy-deep to-ner-red/20 p-6 text-white ring-1 ring-white/10">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-ner-red/40 blur-3xl" />
        <div className="relative">
          <div className="text-xs uppercase tracking-widest text-white/70">
            How this works
          </div>
          <div className="mt-3 text-xl font-bold">
            Audience pricing, not eyeball pricing.
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/75">
            Sponsors used to pay us for bodies in seats. Today they pay to
            reach the right people — verified, segmented, opted-in. That
            premium funds better experiences for fans like you, so the
            sponsor pitch you see is short and relevant instead of
            everywhere and ignored.
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
