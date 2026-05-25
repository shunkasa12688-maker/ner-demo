"use client";

import { CalendarBlank, Heart, Sun } from "@phosphor-icons/react";
import { HeroImage } from "./HeroImage";
import { PhotoCard } from "./PhotoCard";
import { HERO, TILE } from "./images";
import type { Segment } from "@/lib/types";

const NEXT_UP = [
  {
    title: "Revs vs. Columbus",
    sub: "Fri Sep 13 · Gillette · Latin Heritage night",
    img: TILE.crowd,
    cta: "Tickets from $22",
    primary: true,
  },
  {
    title: "Pickup game · East Boston park",
    sub: "Sat Sep 21 · free · RSVP only",
    img: TILE.pickup,
    cta: "Count me in",
    primary: false,
  },
  {
    title: "Watch party at Brassica",
    sub: "Sat Sep 27 · same crowd as June",
    img: TILE.bar,
    cta: "RSVP",
    primary: false,
  },
];

export function PostWCNudge({ segment }: { segment: Segment }) {
  return (
    <div className="space-y-6">
      <HeroImage
        src="/images/hero-postwc.png"
        unsplash={HERO.postwc}
        alt="Post World Cup re-engagement"
        badge="Hey, you were here in June"
        title="The summer was real. Don’t let it just evaporate."
        subtitle="The match nights, the watch parties, the group chats. Here’s what’s on if you want to keep the feeling going."
        className="aspect-[16/8]"
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="glass-card p-5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/55">
            <Heart className="h-3.5 w-3.5 text-ner-red-soft" /> Your June at a glance
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <Bit value="6" label="Matches" />
            <Bit value="14" label="Reactions" />
            <Bit value="2" label="Friends" />
          </div>
          <div className="mt-3 text-[10px] italic text-white/40">
            Numbers shown are illustrative.
          </div>
        </div>
        <PhotoCard src={TILE.crowd} alt="Summer stadium" caption="Foxborough in June felt different." ratio="aspect-square" />
        <PhotoCard src={TILE.bar} alt="Watch party" caption="Your watch-party crew." ratio="aspect-square" />
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <CalendarBlank weight="light" className="h-4 w-4 text-white/70" /> What&apos;s on in the next month
        </div>
        {NEXT_UP.map((n) => (
          <div
            key={n.title}
            className="glass-card flex items-stretch overflow-hidden"
          >
            <div className="relative h-28 w-28 flex-shrink-0 sm:h-32 sm:w-40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={n.img} alt={n.title} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-1 flex-col justify-between p-4">
              <div>
                <div className="text-base font-semibold text-white">{n.title}</div>
                <div className="mt-0.5 text-xs text-white/60">{n.sub}</div>
              </div>
              <button
                className={`mt-3 self-start rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                  n.primary
                    ? "bg-ner-red text-white hover:bg-ner-red-soft"
                    : "border border-white/30 text-white hover:bg-white/10"
                }`}
              >
                {n.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-400/15 to-amber-400/5 p-6">
        <Sun className="absolute right-4 top-4 h-12 w-12 text-amber-300/40" />
        <div className="text-xs uppercase tracking-widest text-amber-200">
          Honest pitch
        </div>
        <div className="mt-2 max-w-md text-base text-amber-100">
          You don’t need a membership. Just <strong>one match in person</strong>{" "}
          before October — that’s the only thing that decides if this becomes a
          habit for you.
        </div>
      </div>

      <div className="border-t border-white/10 pt-4 text-[11px] text-white/45">
        Audience seen by the cockpit:{" "}
        <span className="font-semibold text-white/75">{segment.label}</span>{" "}
        · Window: after-WC
      </div>
    </div>
  );
}

function Bit({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-white/5 px-2 py-2">
      <div className="text-xl font-bold text-white tabular-nums">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-white/55">
        {label}
      </div>
    </div>
  );
}
