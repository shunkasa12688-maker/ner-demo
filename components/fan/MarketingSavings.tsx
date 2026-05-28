"use client";

import { Crosshair, Megaphone, UsersThree } from "@phosphor-icons/react";
import { HeroImage } from "./HeroImage";
import { HERO } from "./images";
import type { Segment } from "@/lib/types";

export function MarketingSavings({ segment }: { segment: Segment }) {
  return (
    <div className="space-y-6">
      <HeroImage
        src="/images/hero-targeting.png"
        unsplash={HERO.targeting}
        alt="Right place, right fan"
        badge="Right place, right fan"
        title="You're not the everyone."
        subtitle="You're seeing this because we knew it would fit you — not because we spent ten dollars to reach a hundred people who'd never show up."
        className="aspect-[16/8]"
      />

      <div className="grid gap-3 md:grid-cols-3">
        <Stat
          icon={<Crosshair className="h-4 w-4" />}
          headline="40–60%"
          label="of broad ad-spend never converts"
          body="That's the waste targeting cuts. Money that used to chase strangers across Greater Boston now funds the experience you're seeing."
        />
        <Stat
          icon={<Megaphone className="h-4 w-4" />}
          headline="Five segments"
          label="that we actually act on"
          body="Instead of one giant audience, the club runs five — and serves each one a page built for it. You're reading the page for yours."
        />
        <Stat
          icon={<UsersThree className="h-4 w-4" />}
          headline="One friend"
          label="is the whole ask"
          body="The cheapest acquisition is a referral. If this fits, send it to one person who'd also be a fan. That's it."
        />
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-ner-navy via-ner-navy-deep to-ner-red/20 p-6 text-white ring-1 ring-white/10">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-ner-red/40 blur-3xl" />
        <div className="relative">
          <div className="text-xs uppercase tracking-widest text-white/70">
            The pitch
          </div>
          <div className="mt-3 text-xl font-bold">
            Bring one friend. We'll handle the rest.
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/75">
            Knowing who NOT to spend on is worth as much as knowing who
            to. We saved the budget by skipping the wrong audience —
            now we put it where you can feel it: better seats, smarter
            offers, less noise. Share with one person you'd actually
            go to a match with.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <button className="rounded-xl bg-ner-red px-5 py-3 text-base font-semibold text-white shadow transition hover:bg-ner-red-soft">
              Share with one friend
            </button>
            <button className="rounded-xl border border-white/30 bg-white/5 px-5 py-3 text-base font-semibold text-white transition hover:bg-white/10">
              How the targeting works
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

function Stat({
  icon,
  headline,
  label,
  body,
}: {
  icon: React.ReactNode;
  headline: string;
  label: string;
  body: string;
}) {
  return (
    <div className="glass-card flex flex-col p-5">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/55">
        {icon} {label}
      </div>
      <div className="mt-2 text-2xl font-semibold tabular-nums text-white">
        {headline}
      </div>
      <p className="mt-2 text-[13px] leading-relaxed text-white/65">{body}</p>
    </div>
  );
}
