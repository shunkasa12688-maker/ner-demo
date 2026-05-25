"use client";

import { Bookmark, ChatCircle, Flame, Newspaper, Share, ThumbsDown, ThumbsUp } from "@phosphor-icons/react";
import { HeroImage } from "./HeroImage";
import { PhotoCard } from "./PhotoCard";
import { HERO, TILE } from "./images";
import type { Segment } from "@/lib/types";

const TAKES = [
  { who: "@bostondan_", time: "2h", text: "That second half was the most complete soccer we've played all year." },
  { who: "@revs4ever", time: "3h", text: "Kessler header goes on my kid's bedroom wall. End of debate." },
  { who: "@gillettecrowd", time: "5h", text: "Vrioni back to the bench again and I’m logging off the season." },
];

export function ReactionHub({ segment }: { segment: Segment }) {
  return (
    <div className="space-y-6">
      <HeroImage
        src="/images/hero-reaction.png"
        unsplash={HERO.reaction}
        alt="Post-match reaction hub"
        badge="Last night · Full time"
        title="Revs 2 — Miami 1. They cried offside. The clip says otherwise."
        subtitle="Highlights, hot takes, and the call that won the game."
        className="aspect-[16/8]"
      />

      {/* Score + highlights row */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="glass-card-strong relative overflow-hidden p-5 text-white">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-ner-red/40 blur-2xl" />
          <div className="relative">
            <div className="text-[10px] uppercase tracking-widest text-white/60">
              Full time · Gillette · Sat
            </div>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-4xl font-bold tabular-nums">2</span>
              <span className="text-white/50">—</span>
              <span className="text-3xl text-white/70">1</span>
            </div>
            <div className="mt-3 flex gap-2 text-[11px]">
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-emerald-300">
                W · 3 pts
              </span>
              <span className="rounded bg-white/10 px-2 py-0.5 text-white/70">
                xG 2.4 — 1.1
              </span>
            </div>
          </div>
        </div>
        <PhotoCard
          src={TILE.goal}
          alt="Kessler header goal"
          caption="Kessler header · 67'"
          topRight="0:48"
          showPlay
        />
        <PhotoCard
          src={TILE.save}
          alt="Petrović 1-v-1 save"
          caption="Petrović 1-v-1 · 84'"
          topRight="0:22"
          showPlay
        />
      </div>

      {/* Hot or not meter */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Flame className="h-4 w-4 text-ner-red-soft" />
              Hot or not? Rate this win.
            </div>
            <div className="mt-1 text-xs text-white/60">
              1,284 fans voted · 79% say heated.
            </div>
          </div>
          <div className="hidden gap-2 sm:flex">
            <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-[10px] font-semibold text-rose-300">
              🔥 79%
            </span>
            <span className="rounded-full bg-sky-500/20 px-2 py-0.5 text-[10px] font-semibold text-sky-300">
              ❄️ 21%
            </span>
          </div>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <button className="flex items-center justify-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/20">
            <ThumbsUp className="h-4 w-4" />
            🔥 Heated win
          </button>
          <button className="flex items-center justify-center gap-2 rounded-xl border border-sky-500/40 bg-sky-500/10 px-4 py-3 text-sm font-semibold text-sky-200 transition hover:bg-sky-500/20">
            <ThumbsDown className="h-4 w-4" />
            ❄️ Limped over the line
          </button>
        </div>
      </div>

      {/* Fan takes */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <ChatCircle className="h-4 w-4 text-white/70" /> What fans are saying
        </div>
        <ul className="mt-3 space-y-3">
          {TAKES.map((t) => (
            <li key={t.who} className="flex gap-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-ner-navy to-ner-red text-xs font-bold text-white">
                {t.who.slice(1, 3).toUpperCase()}
              </div>
              <div className="flex-1 rounded-2xl rounded-tl-sm bg-white/5 px-3 py-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-semibold text-white">
                    {t.who}
                  </span>
                  <span className="text-[10px] text-white/45">{t.time}</span>
                </div>
                <div className="mt-0.5 text-sm text-white/85">{t.text}</div>
              </div>
            </li>
          ))}
        </ul>
        <button className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-ner-red-soft">
          Drop your hot take →
        </button>
      </div>

      {/* Media spin */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 backdrop-blur">
        <div className="flex items-center gap-2 text-sm font-semibold text-amber-200">
          <Newspaper className="h-4 w-4" />
          How the wires spun it · and why they’re wrong
        </div>
        <blockquote className="mt-3 border-l-4 border-amber-300/40 pl-3 text-sm italic text-amber-100/85">
          “Miami unlucky as defensive lapse hands Revs three points.”
          <span className="ml-2 text-[10px] uppercase tracking-widest text-amber-200/60">
            — wire copy
          </span>
        </blockquote>
        <p className="mt-3 text-sm font-medium text-amber-100">
          Translation: we pressed for 90 minutes, they cracked. That’s not luck.
        </p>
      </div>

      {/* CTA bar */}
      <div className="flex flex-col gap-2 rounded-2xl bg-gradient-to-r from-ner-navy to-ner-navy-deep p-5 ring-1 ring-white/10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-xs uppercase tracking-widest text-white/60">
            Sat 7:30 PM · vs. Inter Miami
          </div>
          <div className="mt-0.5 text-lg font-semibold text-white">
            Stay in the conversation when the next match drops.
          </div>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20">
            <Bookmark className="h-4 w-4" />
            Remind me
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-xl bg-ner-red px-4 py-2 text-sm font-semibold text-white transition hover:bg-ner-red-soft">
            <Share className="h-4 w-4" />
            Share
          </button>
        </div>
      </div>

      <FanFooter segment={segment} />
    </div>
  );
}

function FanFooter({ segment }: { segment: Segment }) {
  return (
    <div className="border-t border-white/10 pt-4 text-[11px] text-white/45">
      Audience seen by the cockpit:{" "}
      <span className="font-semibold text-white/75">{segment.label}</span>
    </div>
  );
}
