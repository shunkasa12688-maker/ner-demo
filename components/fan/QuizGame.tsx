"use client";

import { useState } from "react";
import { Crown, Lightning, Trophy, UsersThree } from "@phosphor-icons/react";
import { HeroImage } from "./HeroImage";
import { PhotoCard } from "./PhotoCard";
import { HERO, TILE } from "./images";
import type { Segment } from "@/lib/types";

interface Question {
  q: string;
  opts: string[];
  crowd: number[];
  imgs?: (string | null)[];
}

const QUESTIONS: Question[] = [
  {
    q: "Predict the final score vs. Inter Miami",
    opts: ["Revs 2 – Miami 1", "1 – 1 draw", "Revs 1 – Miami 2", "Revs 3 – Miami 2"],
    crowd: [42, 23, 27, 8],
  },
  {
    q: "Who scores first?",
    opts: ["Vrioni", "Kessler header", "Off a set piece", "Miami forward"],
    crowd: [38, 19, 16, 27],
    imgs: [TILE.player3, TILE.player1, null, TILE.player2],
  },
];

export function QuizGame({ segment }: { segment: Segment }) {
  const [picked, setPicked] = useState<Record<number, number>>({});
  const total = QUESTIONS.length;
  const answered = Object.keys(picked).length;
  const pct = (answered / total) * 100;

  return (
    <div className="space-y-6">
      <HeroImage
        src="/images/hero-quiz.png"
        unsplash={HERO.quiz}
        alt="Match prediction game"
        badge="Predict & Play · pre-match"
        title="Got a hot take? Stake it before kickoff."
        subtitle="No signup. Two questions. Brag if you nail it."
        className="aspect-[16/8]"
      />

      <div className="grid grid-cols-3 gap-3">
        <Stat icon={<Lightning className="h-4 w-4 text-amber-300" />} value={`${answered}/${total}`} label="Locked in" />
        <Stat icon={<UsersThree className="h-4 w-4 text-sky-300" />} value="1,284" label="Fans played" />
        <Stat icon={<Crown className="h-4 w-4 text-emerald-300" />} value="68%" label="Crowd accuracy" />
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-ner-red to-amber-400 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="space-y-5">
        {QUESTIONS.map((q, i) => {
          const choice = picked[i];
          return (
            <div key={i} className="glass-card overflow-hidden">
              <div className="border-b border-white/10 bg-white/[0.03] px-5 py-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs uppercase tracking-widest text-white/55">
                    Question {i + 1} of {total}
                  </div>
                  {choice !== undefined && (
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                      ✓ Locked
                    </span>
                  )}
                </div>
                <div className="mt-1 text-base font-semibold text-white">
                  {q.q}
                </div>
              </div>

              <div className="grid gap-2 p-5 sm:grid-cols-2">
                {q.opts.map((opt, j) => {
                  const isPicked = choice === j;
                  const pct = q.crowd[j];
                  const tileImg = q.imgs?.[j];
                  return (
                    <button
                      key={opt}
                      onClick={() => setPicked((p) => ({ ...p, [i]: j }))}
                      className={`group relative overflow-hidden rounded-xl border px-3 py-3 text-left text-sm transition ${
                        isPicked
                          ? "border-ner-red bg-ner-red/15 text-white"
                          : "border-white/10 bg-white/[0.03] text-white/80 hover:border-white/25"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {tileImg ? (
                          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-white/10">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={tileImg} alt="" className="h-full w-full object-cover" />
                          </div>
                        ) : (
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-white/10 text-lg">
                            ⚽
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="font-semibold">{opt}</div>
                          {choice !== undefined && (
                            <div className="mt-1 text-[11px] text-white/55">
                              {pct}% of fans
                            </div>
                          )}
                        </div>
                      </div>
                      {choice !== undefined && (
                        <div
                          className={`absolute inset-x-0 bottom-0 h-1 ${
                            isPicked ? "bg-ner-red" : "bg-white/20"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {answered === total ? (
        <div className="relative overflow-hidden rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-400/20 via-amber-400/10 to-transparent p-6">
          <Trophy className="absolute right-4 top-4 h-10 w-10 text-amber-300/70" />
          <div className="text-xs uppercase tracking-widest text-amber-200">
            Locked in
          </div>
          <div className="mt-1 text-xl font-bold text-amber-100">
            We’ll show your scoreboard after the match.
          </div>
          <div className="mt-1 text-sm text-amber-200/80">
            No signup needed — just keep this tab open or bookmark the page.
          </div>
        </div>
      ) : (
        <PhotoCard
          src={TILE.crowd}
          alt="Stadium crowd"
          caption="Lock in your picks before kickoff · Sat 7:30 PM"
          ratio="aspect-[16/6]"
        />
      )}

      <div className="border-t border-white/10 pt-4 text-[11px] text-white/45">
        Audience seen by the cockpit:{" "}
        <span className="font-semibold text-white/75">{segment.label}</span>
      </div>
    </div>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="glass-card p-4">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-lg font-bold text-white tabular-nums">{value}</span>
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-widest text-white/55">
        {label}
      </div>
    </div>
  );
}
