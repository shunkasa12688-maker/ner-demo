"use client";

import {
  Calendar,
  Lightning,
  MapPin,
  Star,
  Trophy,
  Users,
} from "@phosphor-icons/react";
import { HeroImage } from "./HeroImage";
import { HERO } from "./images";
import type { Segment } from "@/lib/types";

/**
 * Customer-facing WC explainer. Friendly, plain-language guide to what's
 * happening this summer in Boston — what to expect, where to go, how the
 * Revolution fits in. No platform / case-study / revenue-line jargon.
 */
export function WCDataPitch({ segment }: { segment: Segment }) {
  return (
    <div className="space-y-6">
      <HeroImage
        src="/images/hero-wc-welcome.png"
        unsplash={HERO.wcDataPitch}
        alt="Your World Cup, your summer"
        badge="Your guide · Summer 2026"
        title="The World Cup is here. In Boston."
        subtitle="Seven matches at Gillette. Three Revolution players on rosters. One unforgettable summer of soccer in your city. Here's what's happening."
        className="aspect-[16/8]"
      />

      {/* Welcome — friendly intro */}
      <div className="glass-card p-6 md:p-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-ner-red-soft">
          <Trophy weight="fill" className="h-3.5 w-3.5" />
          Welcome
        </div>
        <p className="mt-4 text-lg leading-relaxed text-white/90 md:text-xl">
          Every four years, the world plays one tournament — and this
          summer, part of it happens here. Boston is one of the host cities.
          Gillette Stadium is hosting seven matches between June and July.
          And the Revolution — your hometown team — is in the middle of all
          of it.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">
          You don't need a passport to be part of the tournament. You just
          need to know what's coming.
        </p>
      </div>

      {/* When + where */}
      <div className="grid gap-4 md:grid-cols-2">
        <FactCard
          icon={<Calendar weight="light" className="h-5 w-5" />}
          label="When"
          headline="June – July 2026"
          body="The group stage runs through June. Knockout matches happen in early July. Gillette gets seven tournament matches in total."
        />
        <FactCard
          icon={<MapPin weight="light" className="h-5 w-5" />}
          label="Where"
          headline="Gillette Stadium · Foxborough"
          body="Same pitch the Revolution plays on. Easy ride from Boston on match day — the commuter rail runs special service for every fixture."
        />
      </div>

      {/* Matches at Gillette — simple list, no jargon */}
      <div>
        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/55">
            <Star weight="light" className="h-4 w-4" />
            Matches at Gillette
          </div>
          <span className="text-[11px] text-white/45">All times Eastern</span>
        </div>
        <ul className="space-y-2">
          {[
            { date: "Sat · Jun 22", match: "Brazil vs Portugal", time: "7:00 PM" },
            { date: "Tue · Jun 26", match: "Mexico vs Argentina", time: "8:00 PM" },
            { date: "Thu · Jun 28", match: "USA vs Croatia", time: "6:30 PM" },
            { date: "Sun · Jul 2", match: "Germany vs France", time: "3:00 PM" },
            { date: "Wed · Jul 9", match: "Round of 16 · TBD", time: "7:00 PM" },
            { date: "Sat · Jul 12", match: "Quarterfinal · TBD", time: "8:00 PM" },
            { date: "Sat · Jul 19", match: "Quarterfinal · TBD", time: "8:00 PM" },
          ].map((m) => (
            <li
              key={m.date}
              className="grid grid-cols-[88px,1fr,auto] items-center gap-4 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 md:grid-cols-[120px,1fr,auto] md:gap-6 md:px-5 md:py-4"
            >
              <span className="font-mono text-xs uppercase tracking-wider text-ner-red-soft md:text-sm">
                {m.date}
              </span>
              <span className="text-sm font-semibold text-white md:text-base">
                {m.match}
              </span>
              <span className="font-mono text-xs text-white/55 md:text-sm">
                {m.time}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* The Revs connection — friendly explainer */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-ner-navy via-ner-navy-deep to-ner-red/20 p-6 text-white ring-1 ring-white/10 md:p-8">
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-ner-red/30 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/70">
            <Users weight="fill" className="h-3.5 w-3.5" />
            The Revs in the tournament
          </div>
          <h3 className="mt-3 text-2xl font-bold leading-tight md:text-3xl">
            Three of our players are playing for their countries.
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/80 md:text-base">
            You'll see them in different colors this summer — and then
            you'll see them right back here, in red and navy, when the
            Revolution returns to Gillette in September.
          </p>
          <div className="mt-5 grid grid-cols-3 gap-3 text-center text-[11px] uppercase tracking-widest text-white/65">
            <div className="rounded-lg border border-white/15 bg-white/5 px-3 py-3">
              <div className="font-display text-xl font-bold tabular-nums text-white">
                #10
              </div>
              <div className="mt-1">Brazil</div>
            </div>
            <div className="rounded-lg border border-white/15 bg-white/5 px-3 py-3">
              <div className="font-display text-xl font-bold tabular-nums text-white">
                #07
              </div>
              <div className="mt-1">USA</div>
            </div>
            <div className="rounded-lg border border-white/15 bg-white/5 px-3 py-3">
              <div className="font-display text-xl font-bold tabular-nums text-white">
                #04
              </div>
              <div className="mt-1">Portugal</div>
            </div>
          </div>
        </div>
      </div>

      {/* How to be part of it */}
      <div>
        <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-3 text-xs font-semibold uppercase tracking-widest text-white/55">
          <Lightning weight="fill" className="h-3.5 w-3.5 text-ner-red-soft" />
          How to be part of it
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <SimpleCard
            title="Catch a match at Gillette"
            body="Tickets go on sale through the official channel. We'll send you a heads-up when seats open near you."
          />
          <SimpleCard
            title="Watch with your neighborhood"
            body="We're hosting watch parties at local spots for every Gillette match — bring a friend, first drink on us."
          />
          <SimpleCard
            title="Wear the summer"
            body="Limited-run World Cup x Revolution scarves, kits, and pins drop the week the tournament opens."
          />
        </div>
      </div>

      {/* Post-WC bridge */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
        <div className="text-xs font-semibold uppercase tracking-widest text-ner-red-soft">
          And after the tournament
        </div>
        <p className="mt-3 text-base leading-relaxed text-white/85 md:text-lg">
          When the world goes home in mid-July, the season comes back. The
          Revolution returns to Gillette on September 14 — same field, same
          crew, the team you watched from March now playing the back half
          of the year. We'll see you there.
        </p>
      </div>

      <div className="border-t border-white/10 pt-4 text-[11px] text-white/45">
        Audience seen by the cockpit:{" "}
        <span className="font-semibold text-white/75">{segment.label}</span>
      </div>
    </div>
  );
}

function FactCard({
  icon,
  label,
  headline,
  body,
}: {
  icon: React.ReactNode;
  label: string;
  headline: string;
  body: string;
}) {
  return (
    <div className="glass-card flex flex-col gap-2 p-5">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/55">
        {icon} {label}
      </div>
      <div className="text-base font-semibold text-white md:text-lg">
        {headline}
      </div>
      <p className="text-sm leading-relaxed text-white/65">{body}</p>
    </div>
  );
}

function SimpleCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="glass-card flex flex-col gap-2 p-5">
      <div className="text-sm font-semibold text-white">{title}</div>
      <p className="text-[13px] leading-relaxed text-white/65">{body}</p>
    </div>
  );
}
