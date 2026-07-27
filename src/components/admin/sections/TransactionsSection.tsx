"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

import type { TransactionRecord } from "@/types/admin";
import { formatAddress } from "@/utils/formatters/address";
import { formatDateTime } from "@/utils/formatters/date";

import { DataTable } from "../DataTable";
import { SectionCard } from "../ui/SectionCard";
import { StatusBadge } from "../ui/StatusBadge";

/** Transaction-analytics tab: a sortable, filterable, paginated ledger. */
export function TransactionsSection({
  transactions,
}: {
  transactions: TransactionRecord[];
}) {
  const columns = useMemo<ColumnDef<TransactionRecord>[]>(
    () => [
      {
        accessorKey: "hash",
        header: "Tx Hash",
        cell: ({ row }) => (
          <span className="font-mono text-xs text-slate-500">
            {formatAddress(row.original.hash, 6)}
          </span>
        ),
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => <StatusBadge status={row.original.type} />,
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => (
          <span className="font-medium text-slate-800">
            {row.original.amount.toLocaleString()} {row.original.asset}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
      { accessorKey: "user", header: "User" },
      { accessorKey: "group", header: "Group" },
      {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => formatDateTime(row.original.createdAt),
      },
    ],
    [],
  );

  return (
    <SectionCard
      title="Transaction Analytics"
      description={`${transactions.length} recent on-chain transactions`}
    >
      <DataTable
        data={transactions}
        columns={columns}
        searchPlaceholder="Search by user, group, hash…"
        initialPageSize={10}
      />
    </SectionCard>
  );
}
