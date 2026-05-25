"use client";

import { Broadcast, CalendarBlank, Flame } from "@phosphor-icons/react";

/**
 * Persistent fan-page strip — always visible regardless of which
 * intervention is rendered. Adds energy and a "real sports site" feel.
 */
export function LiveStripe() {
  return (
    <div className="relative mb-5 overflow-hidden rounded-2xl bg-gradient-to-r from-ner-navy via-ner-navy-deep to-ner-navy text-white ring-1 ring-white/10 shadow-xl">
      <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-ner-red/30 blur-3xl" />
      <div className="absolute -left-10 -bottom-12 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="relative grid gap-2 px-5 py-4 sm:grid-cols-3">
        {/* Last result */}
        <div className="flex items-center gap-3">
          <div className="rounded-md bg-emerald-500/20 p-1.5">
            <Flame className="h-4 w-4 text-emerald-300" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/60">
              Last match · home win
            </div>
            <div className="text-sm font-semibold">
              Revs <span className="text-emerald-300">2</span> — Miami{" "}
              <span className="text-white/70">1</span>
            </div>
          </div>
        </div>

        {/* Next match countdown */}
        <div className="flex items-center gap-3">
          <div className="rounded-md bg-ner-red/20 p-1.5">
            <CalendarBlank className="h-4 w-4 text-ner-red-soft" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/60">
              Next at Gillette · in 2 days
            </div>
            <div className="text-sm font-semibold">
              vs. Inter Miami · Sat 7:30 PM
            </div>
          </div>
        </div>

        {/* Live world cup */}
        <div className="flex items-center gap-3">
          <div className="relative rounded-md bg-rose-500/20 p-1.5">
            <Broadcast className="h-4 w-4 text-rose-300" />
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 animate-ping rounded-full bg-rose-400" />
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-rose-500" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/60">
              WC live · Foxborough
            </div>
            <div className="text-sm font-semibold">
              Brazil 1 — Portugal 1 · 67&apos;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
