"use client";

import { CalendarBlank, MapPin, SealCheck, Ticket } from "@phosphor-icons/react";
import { HeroImage } from "./HeroImage";
import { PhotoCard } from "./PhotoCard";
import { HERO, TILE } from "./images";
import type { Segment } from "@/lib/types";

const BENEFITS = [
  "Same seat, every match. Lock it now for the rest of the season.",
  "Pre-sale on all playoff and cup matches.",
  "Member-only entry gate. No queue at the turnstile.",
  "Drink + scarf credit on your first match back.",
];

export function TicketConversion({ segment }: { segment: Segment }) {
  return (
    <div className="space-y-6">
      <HeroImage
        src="/images/hero-renewal.png"
        unsplash={HERO.ticket}
        alt="Pick up where you left off"
        badge="Welcome back"
        title="Your seat is still here."
        subtitle="Skip the recap — we know you. Here's the next match, your bench, and what renewing costs from today."
        className="aspect-[16/8]"
      />

      <div className="grid gap-3 md:grid-cols-2">
        <div className="glass-card p-5">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/55">
            <CalendarBlank className="h-4 w-4" /> Last time you were here
          </div>
          <div className="mt-2 text-base font-semibold text-white">
            Revs 2 — 1 Charlotte FC
          </div>
          <div className="mt-1 text-[13px] text-white/65">
            Section 142 · Row 14 · Seat 12. Big finish. You stayed for the
            full whistle.
          </div>
        </div>
        <div className="glass-card p-5">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/55">
            <MapPin className="h-4 w-4" /> Next home match
          </div>
          <div className="mt-2 text-base font-semibold text-white">
            Revs vs. Columbus Crew · Sat 7:30 PM
          </div>
          <div className="mt-1 text-[13px] text-white/65">
            Same seat available. Kickoff in 9 days.
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <PhotoCard src={TILE.goal} alt="Match action" caption="That goal" ratio="aspect-[4/3]" />
        <PhotoCard src={TILE.crowd} alt="Match crowd" caption="That crowd" ratio="aspect-[4/3]" />
        <PhotoCard src={TILE.boston} alt="Boston skyline" caption="Your team" ratio="aspect-[4/3]" />
      </div>

      <div className="glass-card p-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <SealCheck weight="fill" className="h-4 w-4 text-ner-red-soft" />
          Member benefits — picked up automatically when you renew
        </div>
        <ul className="mt-4 space-y-2">
          {BENEFITS.map((b) => (
            <li key={b} className="flex items-start gap-2 text-[13px] text-white/80">
              <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-ner-red-soft" />
              {b}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-ner-navy via-ner-navy-deep to-ner-red/20 p-6 text-white ring-1 ring-white/10">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-ner-red/40 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/70">
            <Ticket className="h-3.5 w-3.5" /> Renew · same seat · same price
          </div>
          <div className="mt-3 text-2xl font-bold">Pick up the season.</div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <button className="rounded-xl bg-ner-red px-5 py-3 text-base font-semibold text-white shadow transition hover:bg-ner-red-soft">
              Renew my seat — $0 down
            </button>
            <button className="rounded-xl border border-white/30 bg-white/5 px-5 py-3 text-base font-semibold text-white transition hover:bg-white/10">
              See the schedule first
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-4 text-[11px] text-white/45">
        Audience seen by the cockpit:{" "}
        <span className="font-semibold text-white/75">{segment.label}</span>
      </div>
    </div>
  );
}
