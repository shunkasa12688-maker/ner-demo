import type { ClubBenchmark } from "@/lib/types";
import { DataTag } from "@/components/DataTag";

export function KpiStrip({ benchmarks }: { benchmarks: ClubBenchmark[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
      {benchmarks.map((b) => (
        <div
          key={b.metric}
          className="bi-card p-4"
        >
          <div className="text-[11px] uppercase tracking-wider text-bi-text-dim">
            {b.metric}
          </div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-2xl font-semibold tabular-nums">
              {typeof b.value === "number"
                ? b.value.toLocaleString()
                : b.value}
            </span>
            {b.unit && (
              <span className="text-sm text-bi-text-dim">{b.unit}</span>
            )}
          </div>
          <div className="mt-2 text-[10px] text-bi-text-dim">
            {b.source}
            <DataTag kind={b.measured_or_modeled} />
          </div>
        </div>
      ))}
    </div>
  );
}
