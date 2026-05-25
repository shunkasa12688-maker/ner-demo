"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowSquareOut, Trophy } from "@phosphor-icons/react";
import { useAppState } from "@/lib/use-app-state";
import { PrototypeBadge } from "@/components/PrototypeBadge";
import { Backdrop } from "@/components/Backdrop";
import { InterventionRouter } from "@/components/fan/InterventionRouter";
import { LiveStripe } from "@/components/fan/LiveStripe";
import { NewsStrip } from "@/components/fan/NewsStrip";
import { RotatingHero } from "@/components/fan/RotatingHero";
import { HERO_BG } from "@/components/fan/images";

export default function FanPage() {
  const { state, sample, catalog } = useAppState({ pollMs: 1000 });

  useEffect(() => {
    document.body.classList.add("theme-fan");
    return () => document.body.classList.remove("theme-fan");
  }, []);

  if (!state || !sample) {
    return (
      <div className="theme-fan flex min-h-[100dvh] items-center justify-center text-white/50">
        Loading…
      </div>
    );
  }

  return (
    <div className="theme-fan relative min-h-[100dvh]">
      <Backdrop variant="fan" />

      <div className="relative z-10">
        {/* Hero — premium scale, 1080p-tuned. Rotating editorial photos
            crossfade behind the headline; cycle: 35s, ken-burns zoom. */}
        <section className="relative overflow-hidden">
          <RotatingHero images={HERO_BG} className="absolute inset-0" />

          <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-[1400px] flex-col px-8 pb-24 pt-10 md:px-12">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-ner-red to-ner-red-soft shadow-[0_8px_30px_-8px_rgba(221,31,45,0.55)] ring-1 ring-white/10">
                <Trophy weight="fill" className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-white/45">
                  New England Revolution · fan hub
                </div>
                <div className="text-sm font-medium text-white/85">
                  Match week
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <PrototypeBadge />
              <Link
                href="/cockpit"
                target="_blank"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs text-white/85 backdrop-blur transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-ner-red/60 hover:bg-white/[0.08] hover:text-white"
              >
                Open cockpit
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white/10 transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowSquareOut weight="light" className="h-3 w-3" />
                </span>
              </Link>
            </div>
          </header>

          {/* Headline block — anchored bottom-left of hero */}
          <div className="mt-auto max-w-5xl pt-32">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-white/70 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-ner-red shadow-[0_0_10px_rgba(221,31,45,0.9)]" />
              World Cup 2026 · Boston hosts
            </span>
            <h1 className="font-display mt-6 text-6xl font-extrabold leading-[0.94] tracking-[-0.04em] text-white sm:text-7xl md:text-[5.5rem] xl:text-[6.5rem]">
              The Revs, the
              <br />
              World Cup, and
              <br />
              <span className="bg-gradient-to-r from-white via-white to-ner-red-soft bg-clip-text text-transparent">
                your weekend.
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
              Live scores. Reaction hubs. Watch parties one neighborhood over.
              What you see below is decided by the strategy cockpit — flip a
              control there and this page swaps.
            </p>
          </div>
          </div>
        </section>

        {/* Body — wider canvas, generous gaps */}
        <main className="mx-auto max-w-[1400px] space-y-16 px-8 pb-32 md:px-12">
          <LiveStripe />
          <NewsStrip />
          <div className="mx-auto max-w-3xl">
            <InterventionRouter state={state} sample={sample} catalog={catalog} />
          </div>
        </main>

        <footer className="mx-auto mb-3 max-w-[1400px] space-y-2 px-8 pb-6 text-center text-[11px] text-white/35 md:px-12">
          <div>
            What you see on this page is decided by the cockpit&apos;s current
            diagnosis. Flip a control there to swap this view.
          </div>
          <div className="text-white/30">
            <strong className="text-white/45">Sources & attribution.</strong>{" "}
            Class consulting prototype themed around the New England Revolution
            (Major League Soccer). On-screen editorial photos and tile artwork
            are linked from the team&apos;s official site at{" "}
            <a
              href="https://www.revolutionsoccer.net"
              className="underline transition hover:text-white/60"
            >
              revolutionsoccer.net
            </a>{" "}
            (CDN: images.mlssoccer.com) — used for educational, non-commercial
            reference only; all rights remain with MLS and the club. Crest
            stickers and any club-styled marks shown here are original
            illustrations for this demo and do not reproduce the club&apos;s
            trademarked logo. Match data, fan quotes, news headlines, and
            statistics are illustrative.
          </div>
        </footer>
      </div>
    </div>
  );
}
