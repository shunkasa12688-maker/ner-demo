"use client";

import { useState } from "react";
import { CaretDown, CaretRight } from "@phosphor-icons/react";
import { ROUTING_RULES } from "@/lib/playbook";
import type { InterventionKind } from "@/lib/playbook";

const RULE_TO_KIND: InterventionKind[] = [
  "quiz",
  "reaction-hub",
  "event-invite",
  "wc-hub",
  "post-wc-nudge",
];

export function RoutingRules({ activeKind }: { activeKind: InterventionKind }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="bi-card p-5">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 text-left"
      >
        {open ? (
          <CaretDown className="h-4 w-4 text-bi-text-dim" />
        ) : (
          <CaretRight className="h-4 w-4 text-bi-text-dim" />
        )}
        <div className="text-xs uppercase tracking-wider text-bi-text-dim">
          Routing rules — visible to the audience
        </div>
      </button>
      {open && (
        <div className="mt-3 space-y-1 font-mono text-[12px] leading-relaxed">
          {ROUTING_RULES.map((rule, i) => {
            const isFired = RULE_TO_KIND[i] === activeKind;
            return (
              <div
                key={rule}
                className={`rounded px-2 py-1 transition ${
                  isFired
                    ? "bg-ner-red/15 text-ner-red-soft"
                    : "text-bi-text-dim"
                }`}
              >
                <span className="mr-2 inline-block w-3">{isFired ? "▶" : ""}</span>
                {rule}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
