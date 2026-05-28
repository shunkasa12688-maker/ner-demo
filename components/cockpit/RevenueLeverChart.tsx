"use client";

import { useMemo } from "react";
import {
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  WC_WINDOW,
  buildLeverSeries,
  formatDollarsK,
  type RevenueLever,
} from "@/lib/revenue-levers";

export function RevenueLeverChart({
  lever,
  wcMode,
  height = 200,
}: {
  lever: RevenueLever;
  wcMode: boolean;
  height?: number;
}) {
  const data = useMemo(() => buildLeverSeries(lever), [lever]);

  const maxRaw = data.reduce((m, d) => Math.max(m, d.raw), 0);
  // Clean y-axis ceiling: round up to nearest $1k step.
  const yMax = Math.ceil((maxRaw * 1.08) / 1000) * 1000;

  // X-axis ticks limited to month starts.
  const monthTicks = data.filter((d) => d.monthLabel !== "").map((d) => d.w);

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 8, right: 12, bottom: 4, left: 4 }}
        >
          <CartesianGrid
            stroke="rgba(255,255,255,0.07)"
            strokeDasharray="3 3"
            vertical={false}
          />
          <XAxis
            dataKey="w"
            ticks={monthTicks}
            tickFormatter={(w) => data[w as number]?.monthLabel ?? ""}
            stroke="rgba(255,255,255,0.25)"
            tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 10 }}
            tickLine={false}
            axisLine={{ stroke: "rgba(255,255,255,0.12)" }}
            interval={0}
          />
          <YAxis
            domain={[0, yMax]}
            tickFormatter={(v) => formatDollarsK(v as number)}
            stroke="rgba(255,255,255,0.25)"
            tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            width={48}
          />
          <Tooltip
            contentStyle={{
              background: "#11172a",
              border: "1px solid #243057",
              borderRadius: 6,
              color: "#e6ebff",
              fontSize: 12,
              padding: "6px 8px",
            }}
            labelFormatter={(w) => {
              const point = data[w as number];
              const monthLabel = point?.monthLabel || `Week ${(w as number) + 1}`;
              return `${monthLabel} · week ${(w as number) + 1}`;
            }}
            formatter={(value, name) => [
              formatDollarsK(value as number),
              name === "raw" ? "Weekly (simulated)" : "5-wk average",
            ]}
          />

          {wcMode && (
            <ReferenceArea
              x1={WC_WINDOW.start}
              x2={WC_WINDOW.end}
              y1={0}
              y2={yMax}
              fill={lever.color}
              fillOpacity={0.08}
              stroke={lever.color}
              strokeOpacity={0.25}
              strokeDasharray="3 3"
              ifOverflow="visible"
              label={{
                value: "World Cup 2026 · simulated",
                position: "insideTop",
                fill: "rgba(255,255,255,0.7)",
                fontSize: 10,
                offset: 6,
              }}
            />
          )}

          {/* Raw weekly series — thin, lower opacity */}
          <Line
            type="monotone"
            dataKey="raw"
            stroke={lever.color}
            strokeWidth={1}
            strokeOpacity={0.4}
            dot={false}
            isAnimationActive={false}
          />

          {/* Moving-average overlay — bold, the eye reads trend first */}
          <Line
            type="monotone"
            dataKey="ma"
            stroke={lever.color}
            strokeWidth={2.5}
            dot={false}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
