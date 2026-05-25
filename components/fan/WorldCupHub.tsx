"use client";

import { Globe, MapPin, Television } from "@phosphor-icons/react";
import { HeroImage } from "./HeroImage";
import { PhotoCard } from "./PhotoCard";
import { HERO, TILE } from "./images";
import type { Segment } from "@/lib/types";

const TONIGHT = [
  { when: "Wed · 7pm", venue: "At Gillette", label: "Brazil vs. Portugal", live: true },
  { when: "Fri · 8pm", venue: "At Gillette", label: "Mexico vs. Argentina", live: false },
  { when: "Sat · 3pm", venue: "Away (ESPN)", label: "USA vs. Croatia", live: false },
];

const MATCH_IMGS = [TILE.brazil, TILE.argentina, TILE.usa];

const WATCH_SPOTS = [
  { name: "The Banshee", neighborhood: "Dorchester", style: "Irish soccer pub" },
  { name: "Phoenix Landing", neighborhood: "Cambridge", style: "European bar" },
  { name: "Trillium", neighborhood: "Fort Point", style: "Brewery patio" },
];

export function WorldCupHub({ segment }: { segment: Segment }) {
  return (
    <div className="space-y-6">
      <HeroImage
        src="/images/hero-wc.png"
        unsplash={HERO.wc}
        alt="World Cup in your backyard"
        badge="WC 2026 · in your backyard"
        title="Boston is hosting. The Revs are your local team."
        subtitle="Every match this week tied to a Revs storyline you already half-know. Skim it in 90 seconds."
        className="aspect-[16/8]"
      />

      <div>
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
          <Television weight="light" className="h-4 w-4 text-white/70" /> This week at Gillette & on TV
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {TONIGHT.map((m, i) => (
            <PhotoCard
              key={m.label}
              src={MATCH_IMGS[i]}
              alt={m.label}
              caption={m.label}
              topRight={m.live ? "LIVE · 67'" : m.when}
              ratio="aspect-[4/3]"
            />
          ))}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-ner-navy to-ner-navy-deep p-5 ring-1 ring-white/10">
          <Globe weight="light" className="absolute right-4 top-4 h-10 w-10 text-white/10" />
          <div className="text-xs uppercase tracking-widest text-white/60">
            Did you know
          </div>
          <div className="mt-2 text-3xl font-bold leading-none text-ner-red-soft">
            3
          </div>
          <div className="mt-2 text-sm text-white/85">
            <strong className="text-white">Revs players</strong> are on WC rosters this summer. Watch
            them this week — watch them at Gillette in September.
          </div>
          <button className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-ner-red-soft">
            See the three →
          </button>
        </div>
        <div className="glass-card p-5">
          <div className="text-xs uppercase tracking-widest text-white/55">
            The handoff
          </div>
          <div className="mt-2 text-sm text-white/85">
            The crowd packing Foxborough this month is the same audience for
            our home games in September. We&apos;re updating this hub daily
            through the tournament — keep the tab.
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-ner-navy to-ner-navy-deep p-6 ring-1 ring-white/10">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/70">
          <MapPin className="h-3.5 w-3.5" /> Boston watch spots tonight
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {WATCH_SPOTS.map((s) => (
            <div key={s.name} className="rounded-xl bg-white/8 px-3 py-3 backdrop-blur">
              <div className="text-sm font-semibold text-white">{s.name}</div>
              <div className="mt-0.5 text-[11px] text-white/65">
                {s.neighborhood} · {s.style}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 pt-4 text-[11px] text-white/45">
        Audience seen by the cockpit:{" "}
        <span className="font-semibold text-white/75">{segment.label}</span>{" "}
        · Window: during-WC
      </div>
    </div>
  );
}
