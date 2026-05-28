"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PencilSimple, Play, Plus, X } from "@phosphor-icons/react";
import { type InterventionKind } from "@/lib/playbook";
import type { CatalogEntry } from "@/lib/types";
import { CatalogEditDialog } from "./CatalogEditDialog";

export function InterventionCatalog({
  catalog,
  order,
  activeKind,
  overrideKind,
  onPreview,
  onClearOverride,
  onEdit,
}: {
  catalog: Record<InterventionKind, CatalogEntry>;
  order: InterventionKind[];
  activeKind: InterventionKind;
  overrideKind: InterventionKind | null;
  onPreview: (kind: InterventionKind) => void;
  onClearOverride: () => void;
  onEdit: (
    kind: InterventionKind,
    delta: Partial<Omit<CatalogEntry, "kind">>,
  ) => Promise<void> | void;
}) {
  const [editKind, setEditKind] = useState<InterventionKind | null>(null);

  return (
    <div className="bi-card p-5">
      <div className="flex items-baseline justify-between">
        <div className="text-xs uppercase tracking-wider text-bi-text-dim">
          Intervention catalog
        </div>
        <div className="text-[11px] text-bi-text-dim">
          {order.length} of N · click ▶ to preview · ✎ to edit
        </div>
      </div>

      {overrideKind && (
        <div className="mt-3 flex items-center justify-between rounded-lg border border-sky-500/40 bg-sky-500/10 px-3 py-2 text-sm">
          <div className="text-sky-200">
            <span className="font-semibold uppercase tracking-wider text-sky-300">
              Manual override active:
            </span>{" "}
            showing{" "}
            <strong>{catalog[overrideKind].title}</strong> on the fan page
            instead of the rule output.
          </div>
          <button
            onClick={onClearOverride}
            className="inline-flex items-center gap-1 rounded-md border border-sky-500/40 px-2 py-1 text-xs text-sky-200 transition hover:bg-sky-500/15"
          >
            <X className="h-3 w-3" /> Clear
          </button>
        </div>
      )}

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {order.map((kind) => {
          const meta = catalog[kind];
          const isRuleActive = kind === activeKind && !overrideKind;
          const isOverride = kind === overrideKind;
          return (
            <motion.div
              key={kind}
              layout
              animate={{
                scale: isRuleActive || isOverride ? 1.0 : 0.98,
                opacity: isRuleActive || isOverride ? 1 : 0.7,
              }}
              transition={{ duration: 0.25 }}
              className={`group relative rounded-lg border p-3 transition ${
                isOverride
                  ? "border-sky-500 bg-sky-500/10 shadow-[0_0_24px_-4px_rgba(56,189,248,0.55)]"
                  : isRuleActive
                    ? "border-ner-red bg-ner-red/10 shadow-[0_0_24px_-4px_rgba(221,31,45,0.5)]"
                    : "border-bi-border bg-bi-surface-hi hover:border-bi-accent/40"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm font-semibold leading-tight">
                  {meta.title}
                </div>
                <div className="flex items-center gap-1">
                  {isRuleActive && (
                    <span className="rounded-full bg-ner-red px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      Rule
                    </span>
                  )}
                  {isOverride && (
                    <span className="rounded-full bg-sky-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      Preview
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-1 line-clamp-3 text-[11px] leading-relaxed text-bi-text-dim">
                {meta.blurb}
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => onPreview(kind)}
                  disabled={isOverride}
                  className="inline-flex flex-1 items-center justify-center gap-1 rounded-md border border-bi-border bg-bi-bg/40 px-2 py-1.5 text-[11px] font-semibold text-bi-text transition hover:border-sky-500/60 hover:bg-sky-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Play className="h-3 w-3" />
                  {isOverride ? "Previewing" : "Preview on fan page"}
                </button>
                <button
                  onClick={() => setEditKind(kind)}
                  className="inline-flex items-center justify-center rounded-md border border-bi-border bg-bi-bg/40 px-2 py-1.5 text-[11px] text-bi-text-dim transition hover:border-bi-accent/60 hover:text-bi-text"
                  aria-label={`Edit ${meta.title}`}
                >
                  <PencilSimple weight="light" className="h-3 w-3" />
                </button>
              </div>
            </motion.div>
          );
        })}

        {/* "+ Add new" — the openness signal */}
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-bi-border p-3 text-bi-text-dim">
          <Plus className="h-5 w-5" />
          <div className="text-xs">Add a new intervention</div>
          <div className="text-[10px]">One file + one rule</div>
        </div>
      </div>

      {editKind && (
        <CatalogEditDialog
          entry={catalog[editKind]}
          onClose={() => setEditKind(null)}
          onSave={async (delta) => {
            await onEdit(editKind, delta);
            setEditKind(null);
          }}
        />
      )}
    </div>
  );
}
