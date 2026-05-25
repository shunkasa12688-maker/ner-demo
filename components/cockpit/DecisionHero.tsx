"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Eye, Lightning, Sparkle } from "@phosphor-icons/react";
import type { Segment, SegmentReadings } from "@/lib/types";
import type { PlaybookResult } from "@/lib/playbook";

/**
 * The cockpit's center-of-attention. Combines the reasoning chain and
 * the active intervention preview in one big macOS-style glass card so
 * the demo's punchline (metrics → rule → action) is always above the fold.
 */
export function DecisionHero({
  segment,
  readings,
  result,
  overrideKind,
  activeTitle,
}: {
  segment: Segment;
  readings: SegmentReadings;
  result: PlaybookResult;
  overrideKind: string | null;
  activeTitle: string;
}) {
  const isOverride = !!overrideKind;
  const traceKey = `${segment.id}-${result.kind}-${activeTitle}-${isOverride}`;

  const signals = [
    { key: "Heat", val: readings.heat.score, dir: readings.heat.status },
    { key: "Growth", val: readings.growth.score, dir: readings.growth.status },
    { key: "Retention", val: readings.retention.score, dir: readings.retention.status },
    {
      key: "Local cluster",
      val: segment.localCluster ? "yes" : "no",
      dir: segment.localCluster ? "high" as const : "low" as const,
    },
  ];

  return (
    <div className="bi-card-hi relative overflow-hidden p-7">
      {/* Soft glow accent */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-ner-red/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-44 w-44 rounded-full bg-bi-accent/15 blur-3xl" />

      <div className="relative">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-bi-text-dim">
          <Sparkle weight="light" className="h-3.5 w-3.5 text-bi-accent" />
          Reasoning chain · {segment.label}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={traceKey}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
            className="mt-4 grid gap-6 md:grid-cols-[1.2fr,1fr]"
          >
            {/* Left: trace lines */}
            <div className="space-y-5">
              <div>
                <Label>Signals</Label>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {signals.map((s) => (
                    <span
                      key={s.key}
                      className={`rounded-md border px-2 py-1 text-xs ${
                        s.dir === "high"
                          ? "border-bi-pos/40 bg-bi-pos/10 text-bi-pos"
                          : s.dir === "low"
                            ? "border-bi-neg/40 bg-bi-neg/10 text-bi-neg"
                            : "border-white/15 bg-white/5 text-bi-text-dim"
                      }`}
                    >
                      <span className="opacity-80">{s.key}</span>{" "}
                      <span className="font-semibold tabular-nums">{s.val}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <Label>Diagnosis</Label>
                <p className="mt-1 text-base text-bi-text">
                  {segment.shortNarrative}
                </p>
              </div>

              <div>
                <Label>Rule fired</Label>
                <p className="mt-1 font-mono text-xs text-bi-text">
                  {result.ruleText}
                </p>
              </div>
            </div>

            {/* Right: active intervention card */}
            <div
              className={`relative overflow-hidden rounded-2xl border p-5 ${
                isOverride
                  ? "border-sky-500/50 bg-sky-500/10"
                  : "border-ner-red/40 bg-ner-red/10"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${
                    isOverride
                      ? "bg-sky-500 text-white"
                      : "bg-ner-red text-white"
                  }`}
                >
                  {isOverride ? (
                    <>
                      <Eye className="h-3 w-3" /> Cockpit preview
                    </>
                  ) : (
                    <>
                      <Lightning weight="fill" className="h-3 w-3" /> Rule output
                    </>
                  )}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-bi-text-dim">
                  Showing on fan page
                </span>
              </div>
              <div className="font-display-cockpit mt-4 text-2xl font-bold leading-tight text-bi-text">
                {activeTitle}
              </div>
              <div className="mt-3 text-sm leading-relaxed text-bi-text-dim">
                “{result.why}”
              </div>
              <div className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-widest text-bi-text-dim">
                Why this one fired <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] uppercase tracking-[0.18em] text-bi-text-dim">
      {children}
    </div>
  );
}
