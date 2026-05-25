"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, SquaresFour, Trophy } from "@phosphor-icons/react";
import { PrototypeBadge } from "@/components/PrototypeBadge";

export default function Home() {
  return (
    <div className="theme-cockpit min-h-screen overflow-hidden">
      {/* Hero background */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/hero-landing.png"
          alt=""
          fill
          priority
          className="object-cover opacity-25"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-bi-bg/60 via-bi-bg/85 to-bi-bg"
        />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-8 py-10">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-md bg-ner-red" />
            <div>
              <div className="text-sm uppercase tracking-widest text-bi-text-dim">
                New England Revolution
              </div>
              <div className="text-base font-semibold">
                Capitalization Demo
              </div>
            </div>
          </div>
          <PrototypeBadge />
        </header>

        <main className="flex flex-1 flex-col justify-center">
          <p className="text-bi-accent text-sm uppercase tracking-[0.2em]">
            Class deliverable · 2026
          </p>
          <h1 className="mt-3 max-w-3xl text-5xl font-semibold leading-tight tracking-tight md:text-6xl">
            A strategy cockpit that <span className="text-ner-red">picks the play</span> — and a fan page that <span className="text-bi-accent">runs it</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-bi-text-dim">
            Change the diagnosis on the left; watch the fan page on the right
            swap to a different engagement intervention — with the reasoning
            read out loud. The interventions are samples of an open catalog;
            the system is the (metrics → rule → action) pipeline.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Link
              href="/cockpit"
              className="group bi-card flex items-center justify-between p-6 transition hover:border-bi-accent"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-bi-surface-hi p-3">
                  <SquaresFour className="h-6 w-6 text-bi-accent" />
                </div>
                <div>
                  <div className="text-lg font-semibold">Strategy Cockpit</div>
                  <div className="text-sm text-bi-text-dim">
                    The diagnosis side. Read the levers, fire the rule.
                  </div>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-bi-text-dim transition group-hover:translate-x-1 group-hover:text-bi-accent" />
            </Link>

            <Link
              href="/fan"
              className="group bi-card flex items-center justify-between p-6 transition hover:border-ner-red"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-bi-surface-hi p-3">
                  <Trophy className="h-6 w-6 text-ner-red-soft" />
                </div>
                <div>
                  <div className="text-lg font-semibold">Fan Site</div>
                  <div className="text-sm text-bi-text-dim">
                    What the audience actually sees. Driven by the cockpit.
                  </div>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-bi-text-dim transition group-hover:translate-x-1 group-hover:text-ner-red-soft" />
            </Link>
          </div>

          <div className="mt-12 text-sm text-bi-text-dim">
            Tip: open both routes in two side-by-side browser tabs to demo the
            live swap.
          </div>
        </main>
      </div>
    </div>
  );
}
