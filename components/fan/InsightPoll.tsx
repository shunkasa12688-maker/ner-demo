"use client";

import { Brain, ChartBar, ForkKnife, MusicNote } from "@phosphor-icons/react";
import { HeroImage } from "./HeroImage";
import { HERO } from "./images";
import type { Segment } from "@/lib/types";

interface PollItem {
  icon: React.ReactNode;
  label: string;
  prompt: string;
  scale: string[];
}

const POLL: PollItem[] = [
  {
    icon: <ForkKnife className="h-4 w-4" />,
    label: "Concourse · F&B",
    prompt: "How were the queues, prices, and what you found at the stands tonight?",
    scale: ["Bad", "Fine", "Good", "Loved it"],
  },
  {
    icon: <MusicNote className="h-4 w-4" />,
    label: "Programming",
    prompt: "Warm-up, music, pre-match, halftime — how did the matchday programming land?",
    scale: ["Bad", "Fine", "Good", "Loved it"],
  },
  {
    icon: <ChartBar className="h-4 w-4" />,
    label: "Atmosphere",
    prompt: "Crowd energy, stadium feel, gameday vibe overall.",
    scale: ["Bad", "Fine", "Good", "Loved it"],
  },
];

export function InsightPoll({ segment }: { segment: Segment }) {
  return (
    <div className="space-y-6">
      <HeroImage
        src="/images/hero-poll.png"
        unsplash={HERO.insightPoll}
        alt="Three questions, thirty seconds"
        badge="Tonight · 30 seconds"
        title="Tell us what worked. We fix the rest."
        subtitle="Three questions about tonight at Gillette. Your answers don't sit in a dashboard — they shape what gets changed before the next match."
        className="aspect-[16/8]"
      />

      <div className="glass-card flex items-start gap-3 p-4">
        <Brain weight="light" className="mt-0.5 h-5 w-5 flex-shrink-0 text-ner-red-soft" />
        <div className="text-sm leading-relaxed text-white/85">
          <span className="font-semibold text-white">Operational, not cosmetic.</span>{" "}
          The numbers below land with the matchday ops crew Monday morning.
          Low scores get a redesign, not a thank-you note.
        </div>
      </div>

      {/* The three questions */}
      <div className="space-y-3">
        {POLL.map((q, i) => (
          <div key={q.label} className="glass-card p-5">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/55">
              {q.icon}
              <span className="font-semibold tracking-[0.18em] text-white/70">
                Q{i + 1} · {q.label}
              </span>
            </div>
            <p className="mt-2 text-sm font-medium leading-relaxed text-white/90">
              {q.prompt}
            </p>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {q.scale.map((s, j) => (
                <button
                  key={s}
                  className={`rounded-lg border px-2 py-2 text-[11px] font-semibold uppercase tracking-wider transition ${
                    j === q.scale.length - 1
                      ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-200 hover:border-emerald-400 hover:bg-emerald-500/20"
                      : j === 0
                        ? "border-ner-red/40 bg-ner-red/10 text-ner-red-soft hover:border-ner-red hover:bg-ner-red/20"
                        : "border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="w-full rounded-xl bg-ner-red px-5 py-3 text-base font-semibold text-white shadow transition hover:bg-ner-red-soft">
        Send my three answers
      </button>

      <div className="border-t border-white/10 pt-4 text-[11px] text-white/45">
        Audience seen by the cockpit:{" "}
        <span className="font-semibold text-white/75">{segment.label}</span>
      </div>
    </div>
  );
}
