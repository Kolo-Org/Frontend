"use client";

import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import type { GroupStatus, GroupStatusDatum } from "@/types/admin";

const STATUS_COLOR: Record<GroupStatus, string> = {
  active: "#006c49",
  forming: "#f59e0b",
  completed: "#0ea5e9",
  paused: "#94a3b8",
};

/** Donut chart showing the distribution of savings groups by status. */
export function GroupStatusChart({ data }: { data: GroupStatusDatum[] }) {
  // Per-slice colour via a `fill` field on each datum (v3-friendly, avoids the
  // deprecated <Cell> child API).
  const chartData = data.map((entry) => ({
    ...entry,
    fill: STATUS_COLOR[entry.status],
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="count"
          nameKey="status"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={2}
        />
        <Tooltip
          contentStyle={{
            borderRadius: 12,
            border: "1px solid #e2e8f0",
            fontSize: 12,
            textTransform: "capitalize",
          }}
        />
        <Legend
          iconType="circle"
          formatter={(value: string) => (
            <span className="text-xs capitalize text-slate-500">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
