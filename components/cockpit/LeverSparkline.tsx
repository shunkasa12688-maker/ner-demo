"use client";

import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  buildLeverSparkline,
  SPARKLINE_MONTH_TICKS,
} from "@/lib/lever-sparkline";
import type { Lever } from "@/lib/types";

export function LeverSparkline({
  lever,
  color,
  height = 76,
}: {
  lever: Lever;
  color: string;
  height?: number;
}) {
  const data = useMemo(() => buildLeverSparkline(lever), [lever]);

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 4, right: 2, bottom: 0, left: 0 }}
        >
          <CartesianGrid
            stroke="rgba(255,255,255,0.05)"
            strokeDasharray="2 4"
            vertical={false}
          />
          <XAxis
            dataKey="w"
            ticks={SPARKLINE_MONTH_TICKS}
            tickFormatter={(w) => data[w as number]?.monthLabel ?? ""}
            stroke="rgba(255,255,255,0.18)"
            tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9 }}
            tickLine={false}
            axisLine={false}
            interval={0}
            height={14}
          />
          <YAxis
            domain={[0, 100]}
            ticks={[0, 50, 100]}
            tickFormatter={(v) => `${v}`}
            stroke="rgba(255,255,255,0.18)"
            tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 9 }}
            tickLine={false}
            axisLine={false}
            width={20}
          />
          <Line
            type="linear"
            dataKey="v"
            stroke={color}
            strokeWidth={1.4}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
