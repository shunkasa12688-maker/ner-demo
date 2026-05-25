"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowSquareOut, Trophy } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useAppState } from "@/lib/use-app-state";
import { resolveCatalog, selectIntervention } from "@/lib/playbook";
import { PrototypeBadge } from "@/components/PrototypeBadge";
import { Backdrop } from "@/components/Backdrop";
import { KpiStrip } from "@/components/cockpit/KpiStrip";
import { LeverPanel } from "@/components/cockpit/LeverPanel";
import { CLVReadout } from "@/components/cockpit/CLVReadout";
import { DiagnosisControl } from "@/components/cockpit/DiagnosisControl";
import { InterventionCatalog } from "@/components/cockpit/InterventionCatalog";
import { RoutingRules } from "@/components/cockpit/RoutingRules";
import { LeverDetailDialog } from "@/components/cockpit/LeverDetailDialog";
import { TopBar } from "@/components/cockpit/TopBar";
import { DecisionHero } from "@/components/cockpit/DecisionHero";
import { Tabs } from "@/components/cockpit/Tabs";
import type { Lever, InterventionKind } from "@/lib/types";

const LEVERS: Lever[] = ["heat", "growth", "retention", "money"];

export default function CockpitPage() {
  const { state, sample, catalog, patch, editCatalogEntry, setManualOverride } =
    useAppState({ pollMs: 1000 });
  const [openLever, setOpenLever] = useState<Lever | null>(null);

  useEffect(() => {
    document.body.classList.add("theme-cockpit");
    return () => document.body.classList.remove("theme-cockpit");
  }, []);

  const resolvedCatalog = useMemo(() => resolveCatalog(catalog), [catalog]);

  if (!state || !sample) {
    return (
      <div className="theme-cockpit flex min-h-[100dvh] items-center justify-center text-bi-text-dim">
        Loading cockpit…
      </div>
    );
  }

  const segment = sample.segments.find(
    (s) => s.id === state.selectedSegment,
  )!;
  const readings = sample.readings[state.selectedSegment];
  const bottleneck = state.perSegmentBottleneck[state.selectedSegment];
  const playbook = selectIntervention({
    bottleneck,
    segment,
    timeWindow: state.timeWindow,
    catalog: resolvedCatalog,
  });
  const activeKind: InterventionKind = state.manualOverride ?? playbook.kind;
  const activeEntry = resolvedCatalog[activeKind];
  const bottleneckLever: Lever = bottleneck;

  async function handleCatalogEdit(
    kind: InterventionKind,
    delta: Parameters<typeof editCatalogEntry>[1],
  ) {
    const updated = await editCatalogEntry(kind, delta);
    if (updated) toast.success(`Updated · ${updated.title}`);
  }

  function handlePreview(kind: InterventionKind) {
    setManualOverride(kind);
    toast(`Previewing ${resolvedCatalog[kind].title} on the fan page`);
  }

  function handleClearOverride() {
    setManualOverride(null);
    toast("Override cleared — back to the rule output");
  }

  return (
    <div className="theme-cockpit relative min-h-[100dvh]">
      <Backdrop variant="cockpit" />
      <div className="relative z-10 mx-auto max-w-[1400px] px-8 py-10 md:px-12">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-ner-red to-ner-red-soft shadow-[0_8px_30px_-8px_rgba(221,31,45,0.55)] ring-1 ring-white/10">
              <Trophy weight="fill" className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-bi-text-dim">
                NER · Strategy Cockpit
              </div>
              <div className="font-display-cockpit text-base font-semibold tracking-tight text-bi-text">
                {segment.label}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <PrototypeBadge />
            <Link
              href="/fan"
              target="_blank"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs text-bi-text backdrop-blur transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-ner-red/60 hover:bg-white/[0.08]"
            >
              Open fan site
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white/10 transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowSquareOut weight="light" className="h-3 w-3" />
              </span>
            </Link>
          </div>
        </header>

        {/* Sticky top control bar */}
        <div className="mt-8">
          <TopBar state={state} segments={sample.segments} onPatch={patch} />
        </div>

        {/* Hero decision card */}
        <section className="mt-8">
          <DecisionHero
            segment={segment}
            readings={readings}
            result={playbook}
            overrideKind={state.manualOverride}
            activeTitle={activeEntry.title}
          />
        </section>

        {/* Tabs — secondary detail */}
        <section className="mt-12">
          <Tabs
            tabs={[
              { id: "levers", label: "Levers" },
              { id: "value", label: "Customer Value" },
              { id: "playbook", label: "Playbook", badge: 5 },
              { id: "kpi", label: "Club KPIs" },
            ]}
          >
            {(active) => {
              if (active === "levers") {
                return (
                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {LEVERS.map((l) => (
                      <LeverPanel
                        key={l}
                        lever={l}
                        reading={readings[l]}
                        isBottleneck={l === bottleneckLever}
                        onOpen={setOpenLever}
                      />
                    ))}
                  </div>
                );
              }
              if (active === "value") {
                return (
                  <div className="grid gap-5 lg:grid-cols-2">
                    <CLVReadout readings={readings} bottleneck={bottleneck} />
                    <DiagnosisControl
                      state={state}
                      segments={sample.segments}
                      readingsBySegment={sample.readings}
                      playbook={playbook}
                      onPatch={patch}
                    />
                  </div>
                );
              }
              if (active === "playbook") {
                return (
                  <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
                    <InterventionCatalog
                      catalog={resolvedCatalog}
                      activeKind={playbook.kind}
                      overrideKind={state.manualOverride}
                      onPreview={handlePreview}
                      onClearOverride={handleClearOverride}
                      onEdit={handleCatalogEdit}
                    />
                    <RoutingRules activeKind={activeKind} />
                  </div>
                );
              }
              return <KpiStrip benchmarks={sample.club_benchmarks} />;
            }}
          </Tabs>
        </section>

        <footer className="mt-20 mb-6 text-center text-[11px] text-bi-text-dim">
          The system is the pipeline, not the catalog — add a rule, add a card.
        </footer>
      </div>

      {openLever && (
        <LeverDetailDialog
          lever={openLever}
          reading={readings[openLever]}
          onClose={() => setOpenLever(null)}
        />
      )}
    </div>
  );
}
