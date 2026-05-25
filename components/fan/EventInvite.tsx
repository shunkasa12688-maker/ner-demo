"use client";

import { CalendarBlank, MapPin, Sparkle, Ticket, UsersThree } from "@phosphor-icons/react";
import { HeroImage } from "./HeroImage";
import { PhotoCard } from "./PhotoCard";
import { HERO, TILE } from "./images";
import type { Segment } from "@/lib/types";

const AVATARS = ["AM", "JS", "RC", "LV", "DK", "EM", "TF", "BO"];

export function EventInvite({ segment }: { segment: Segment }) {
  const town = segment.localCluster?.town ?? "your neighborhood";

  return (
    <div className="space-y-6">
      <HeroImage
        src="/images/hero-event.png"
        unsplash={HERO.event}
        alt="Watch party invite"
        badge={`For ${town}`}
        title={`Watch party in ${town}. We bring the room.`}
        subtitle="Match on the big screen. Cold drinks. One player drops by at halftime. RSVP, no membership."
        className="aspect-[16/8]"
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <PhotoCard src={TILE.watchparty} alt="Big screen watch party" caption="Match on the big screen" ratio="aspect-[4/3]" />
        <PhotoCard src={TILE.player1} alt="Player meet-and-greet" caption="Halftime player Q&A" ratio="aspect-[4/3]" />
        <PhotoCard src={TILE.bar} alt="Local bar setup" caption="First round on us" ratio="aspect-[4/3]" />
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <Fact icon={<CalendarBlank className="h-4 w-4" />} label="When" value="Saturday · 7:00 PM kickoff" />
        <Fact icon={<MapPin className="h-4 w-4" />} label="Where" value={`Brassica Bar · ${town}`} />
        <Fact icon={<Sparkle weight="light" className="h-4 w-4" />} label="Cost" value="Free. First drink on us." />
      </div>

      <div className="glass-card p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <UsersThree className="h-4 w-4 text-white/70" /> Who else is in
          </div>
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
            42 confirmed
          </span>
        </div>
        <div className="mt-4 flex items-center">
          <div className="flex -space-x-2">
            {AVATARS.map((a, i) => (
              <div
                key={a}
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#02060f] bg-gradient-to-br from-ner-navy to-ner-red text-[11px] font-bold text-white shadow"
                style={{ zIndex: AVATARS.length - i }}
              >
                {a}
              </div>
            ))}
            <div className="ml-1 flex h-9 items-center rounded-full bg-white/8 px-3 text-xs font-semibold text-white/75">
              +34 more
            </div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-3 text-center text-xs text-white/60">
          <Bit value="28" label="Avg age" />
          <Bit value="18" label="First-timers" />
          <Bit value="80" label="Capacity" />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-ner-navy via-ner-navy-deep to-ner-red/20 p-6 text-white ring-1 ring-white/10">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-ner-red/40 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/70">
            <Ticket className="h-3.5 w-3.5" /> Easy in. No app. No membership.
          </div>
          <div className="mt-3 text-2xl font-bold">Bring a friend. Save a seat.</div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <button className="rounded-xl bg-ner-red px-5 py-3 text-base font-semibold text-white shadow transition hover:bg-ner-red-soft">
              RSVP — count me in
            </button>
            <button className="rounded-xl border border-white/30 bg-white/5 px-5 py-3 text-base font-semibold text-white transition hover:bg-white/10">
              Bring a friend (+1)
            </button>
          </div>
          <div className="mt-3 text-xs text-white/60">
            We text you a reminder the day-of, that’s it.
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-4 text-[11px] text-white/45">
        Audience seen by the cockpit:{" "}
        <span className="font-semibold text-white/75">{segment.label}</span>{" "}
        · Cluster town: <span className="font-semibold text-white/75">{town}</span>
      </div>
    </div>
  );
}

function Fact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="glass-card p-4">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/60">
        {icon} {label}
      </div>
      <div className="mt-2 text-sm font-semibold text-white">{value}</div>
    </div>
  );
}

function Bit({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-white/5 px-2 py-2">
      <div className="text-lg font-semibold text-white tabular-nums">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-white/55">{label}</div>
    </div>
  );
}
