"use client";

import { Newspaper } from "@phosphor-icons/react";
import { HERO, NEWS } from "./images";

interface NewsArticle {
  category: string;
  headline: string;
  byline: string;
  snippet: string;
  img: string;
  color: string;
}

const ARTICLES: NewsArticle[] = [
  {
    category: "Match recap",
    headline: "Vrioni's late free-kick rescues a point at Gillette",
    byline: "Revs Newsroom · 2h ago",
    snippet: "A 89th-minute curler from the edge of the box salvaged a 1–1 draw against Cincinnati.",
    img: NEWS.recap,
    color: "bg-rose-500/20 text-rose-200 border-rose-400/30",
  },
  {
    category: "Feature",
    headline: "How MLS is leaning into the 2026 World Cup effect",
    byline: "Maya Cole · 5h ago",
    snippet: "Six clubs are running parallel WC programming. The Revs lead on local-cluster activations.",
    img: NEWS.feature,
    color: "bg-sky-500/20 text-sky-200 border-sky-400/30",
  },
  {
    category: "Community",
    headline: "Brazilian supporters pack Everett ahead of the derby",
    byline: "Joana Reis · 8h ago",
    snippet: "Watch parties spilled into Broadway. We sent the team to listen.",
    img: NEWS.community,
    color: "bg-emerald-500/20 text-emerald-200 border-emerald-400/30",
  },
  {
    category: "Academy",
    headline: "From a viral park clip to an academy contract in a week",
    byline: "Revs Youth · 1d ago",
    snippet: "What this signing says about how the club is sourcing talent post-pandemic.",
    img: NEWS.academy,
    color: "bg-amber-500/20 text-amber-200 border-amber-400/30",
  },
];

// World Cup-themed news feed used when /fan is in WC mode. Headlines and
// images are tournament-focused — no off-topic MLS / academy stories.
const WC_ARTICLES: NewsArticle[] = [
  {
    category: "Tournament recap",
    headline: "Brazil edge Portugal 2–1 in Gillette's opening fixture",
    byline: "Tournament desk · 1h ago",
    snippet: "A second-half flick decides the opener. Foxborough's first World Cup night didn't disappoint.",
    img: HERO.wc,
    color: "bg-amber-500/25 text-amber-100 border-amber-400/40",
  },
  {
    category: "Revs in the tournament",
    headline: "Three Revs walked out for their national sides this week",
    byline: "Revs Newsroom · 3h ago",
    snippet: "Where to watch each of them, what to look for, and when they're back in red and navy.",
    img: HERO.postwc,
    color: "bg-rose-500/25 text-rose-100 border-rose-400/40",
  },
  {
    category: "Around Boston",
    headline: "Watch parties pack the North End for opening weekend",
    byline: "City desk · 6h ago",
    snippet: "Eight neighborhoods, eight venues. We mapped where to go for each fixture.",
    img: HERO.event,
    color: "bg-emerald-500/25 text-emerald-100 border-emerald-400/40",
  },
  {
    category: "Tournament guide",
    headline: "Your week-by-week guide to the World Cup at Gillette",
    byline: "Editor's pick · today",
    snippet: "Seven matches, four groups, one host city. Dates, kickoff times, and what each round means.",
    img: HERO.wcDataPitch,
    color: "bg-sky-500/25 text-sky-100 border-sky-400/40",
  },
];

export function NewsStrip({ variant = "default" }: { variant?: "default" | "wc" } = {}) {
  const articles = variant === "wc" ? WC_ARTICLES : ARTICLES;
  const heading = variant === "wc"
    ? "World Cup · this week's reading"
    : "Latest from the newsroom";

  return (
    <section className="mb-6">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
        <Newspaper className="h-4 w-4 text-white/70" />
        {heading}
      </div>
      <div className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2 [scrollbar-width:thin]">
        {articles.map((a) => (
          <article
            key={a.headline}
            className="glass-card flex w-72 flex-shrink-0 snap-start flex-col overflow-hidden"
          >
            <div className="relative h-32 w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.img} alt="" className="h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span
                className={`absolute left-3 top-3 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur ${a.color}`}
              >
                {a.category}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4">
              <h3 className="text-sm font-semibold leading-snug text-white">
                {a.headline}
              </h3>
              <p className="text-xs leading-relaxed text-white/65">
                {a.snippet}
              </p>
              <div className="mt-auto pt-2 text-[10px] uppercase tracking-widest text-white/45">
                {a.byline}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
