"use client";

import { useState } from "react";

export interface TabDef {
  id: string;
  label: string;
  badge?: string | number;
}

export function Tabs({
  tabs,
  initial,
  children,
  className = "",
}: {
  tabs: TabDef[];
  initial?: string;
  children: (active: string) => React.ReactNode;
  className?: string;
}) {
  const [active, setActive] = useState(initial ?? tabs[0]?.id);
  return (
    <div className={className}>
      <div className="bi-card-hi inline-flex gap-1 p-1">
        {tabs.map((t) => {
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`tab-pill inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${
                isActive
                  ? "bg-white/15 text-white shadow-sm"
                  : "text-bi-text-dim hover:bg-white/5 hover:text-white"
              }`}
            >
              {t.label}
              {t.badge !== undefined && (
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                    isActive ? "bg-white/20 text-white" : "bg-white/10 text-bi-text-dim"
                  }`}
                >
                  {t.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-4">{children(active)}</div>
    </div>
  );
}
