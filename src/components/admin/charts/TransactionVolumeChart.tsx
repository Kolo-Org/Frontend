"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { TimeSeriesPoint } from "@/types/admin";
import { formatCompactNumber } from "@/utils/formatters/currency";

/** Bar chart of monthly on-chain transaction counts. */
export function TransactionVolumeChart({ data }: { data: TimeSeriesPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#f1f5f9"
          vertical={false}
        />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 12, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
          width={52}
          tickFormatter={(value: number) => formatCompactNumber(value)}
        />
        <Tooltip
          formatter={(value) => [
            formatCompactNumber(Number(value ?? 0)),
            "Transactions",
          ]}
          cursor={{ fill: "#f8fafc" }}
          contentStyle={{
            borderRadius: 12,
            border: "1px solid #e2e8f0",
            fontSize: 12,
          }}
        />
        <Bar
          dataKey="value"
          fill="#006c49"
          radius={[6, 6, 0, 0]}
          maxBarSize={36}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
