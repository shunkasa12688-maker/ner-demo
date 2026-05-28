"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Eye, Lightning } from "@phosphor-icons/react";
import {
  resolveCatalog,
  selectIntervention,
  type InterventionKind,
} from "@/lib/playbook";
import type { AppState, CatalogEntry, SampleData } from "@/lib/types";
import { QuizGame } from "./QuizGame";
import { ReactionHub } from "./ReactionHub";
import { EventInvite } from "./EventInvite";
import { WorldCupHub } from "./WorldCupHub";
import { PostWCNudge } from "./PostWCNudge";
import { SponsorPremium } from "./SponsorPremium";
import { TicketConversion } from "./TicketConversion";
import { MerchandiseUplift } from "./MerchandiseUplift";
import { MarketingSavings } from "./MarketingSavings";
import { DynamicPricing } from "./DynamicPricing";
import { InsightPoll } from "./InsightPoll";
import { WCSponsorRally } from "./WCSponsorRally";
import { WCMerchDrop } from "./WCMerchDrop";
import { WCDataPitch } from "./WCDataPitch";

export function InterventionRouter({
  state,
  sample,
  catalog,
}: {
  state: AppState;
  sample: SampleData;
  catalog: CatalogEntry[] | null;
}) {
  const segment = sample.segments.find((s) => s.id === state.selectedSegment)!;
  const bottleneck = state.perSegmentBottleneck[state.selectedSegment];
  const resolved = resolveCatalog(catalog);
  const ruleResult = selectIntervention({
    bottleneck,
    segment,
    timeWindow: state.timeWindow,
    catalog: resolved,
  });

  const overrideActive = !!state.manualOverride;
  const kind: InterventionKind = overrideActive
    ? state.manualOverride!
    : ruleResult.kind;
  const entry = resolved[kind];
  const why = overrideActive
    ? entry.whyDefault.replace(
        "{town}",
        segment.localCluster?.town ?? "their neighborhood",
      )
    : ruleResult.why;

  return (
    <>
      {/* The "why" caption — links the fan page back to the cockpit decision */}
      <div
        className={`mb-5 rounded-xl border px-4 py-3 text-xs backdrop-blur ${
          overrideActive
            ? "border-sky-500/40 bg-sky-500/10 text-white/85"
            : "border-white/10 bg-white/5 text-white/75"
        }`}
      >
        <span
          className={`mr-1 inline-flex items-center gap-1 font-semibold uppercase tracking-widest ${
            overrideActive ? "text-sky-300" : "text-ner-red-soft"
          }`}
        >
          {overrideActive ? (
            <>
              <Eye className="h-3 w-3" /> Cockpit preview
            </>
          ) : (
            <>
              <Lightning className="h-3 w-3" /> Why you’re seeing this:
            </>
          )}
        </span>{" "}
        {why}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${kind}-${segment.id}`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.35 }}
        >
          {kind === "quiz" && <QuizGame segment={segment} />}
          {kind === "reaction-hub" && <ReactionHub segment={segment} />}
          {kind === "event-invite" && <EventInvite segment={segment} />}
          {kind === "wc-hub" && <WorldCupHub segment={segment} />}
          {kind === "post-wc-nudge" && <PostWCNudge segment={segment} />}
          {kind === "sponsor-premium" && <SponsorPremium segment={segment} />}
          {kind === "ticket-conversion" && <TicketConversion segment={segment} />}
          {kind === "merchandise-uplift" && <MerchandiseUplift segment={segment} />}
          {kind === "marketing-savings" && <MarketingSavings segment={segment} />}
          {kind === "dynamic-pricing" && <DynamicPricing segment={segment} />}
          {kind === "insight-poll" && <InsightPoll segment={segment} />}
          {kind === "wc-sponsor-rally" && <WCSponsorRally segment={segment} />}
          {kind === "wc-merch-drop" && <WCMerchDrop segment={segment} />}
          {kind === "wc-data-pitch" && <WCDataPitch segment={segment} />}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
