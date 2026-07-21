"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

import type { SavingsGroupRecord } from "@/types/admin";
import { formatCurrency } from "@/utils/formatters/currency";
import { formatDate } from "@/utils/formatters/date";

import { DataTable } from "../DataTable";
import { SectionCard } from "../ui/SectionCard";
import { StatusBadge } from "../ui/StatusBadge";

/** Active savings groups tab: a sortable, filterable, paginated group table. */
export function GroupsSection({ groups }: { groups: SavingsGroupRecord[] }) {
  const columns = useMemo<ColumnDef<SavingsGroupRecord>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Group",
        cell: ({ row }) => (
          <span className="font-medium text-slate-800">
            {row.original.name}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
      { accessorKey: "members", header: "Members" },
      {
        accessorKey: "savedAmount",
        header: "Progress",
        cell: ({ row }) => {
          const { savedAmount, targetAmount } = row.original;
          const pct =
            targetAmount > 0
              ? Math.min(100, Math.round((savedAmount / targetAmount) * 100))
              : 0;
          return (
            <div className="min-w-40">
              <div className="mb-1 flex justify-between text-xs text-slate-500">
                <span>{formatCurrency(savedAmount)}</span>
                <span>{pct}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-100">
                <div
                  className="h-1.5 rounded-full bg-[#006c49]"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "contributionCycle",
        header: "Cycle",
        cell: ({ row }) => (
          <span className="capitalize">{row.original.contributionCycle}</span>
        ),
      },
      {
        accessorKey: "nextPayoutAt",
        header: "Next Payout",
        cell: ({ row }) => formatDate(row.original.nextPayoutAt),
      },
    ],
    [],
  );

  return (
    <SectionCard
      title="Active Savings Groups"
      description={`${groups.length} community savings groups`}
    >
      <DataTable
        data={groups}
        columns={columns}
        searchPlaceholder="Search by group name…"
        initialPageSize={8}
      />
    </SectionCard>
  );
}
