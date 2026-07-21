import type { ContractHealthIndicator } from "@/types/admin";
import { formatAddress } from "@/utils/formatters/address";
import { formatCompactNumber } from "@/utils/formatters/currency";
import { formatDateTime } from "@/utils/formatters/date";

import { SectionCard } from "../ui/SectionCard";
import { StatusBadge } from "../ui/StatusBadge";

const STATUS_DOT: Record<ContractHealthIndicator["status"], string> = {
  healthy: "bg-emerald-500",
  degraded: "bg-amber-500",
  down: "bg-rose-500",
};

/** Smart-contract health tab: per-contract uptime / latency indicators. */
export function ContractHealthSection({
  contracts,
}: {
  contracts: ContractHealthIndicator[];
}) {
  return (
    <SectionCard
      title="Smart Contract Health"
      description="Live Soroban contract indicators"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {contracts.map((contract) => (
          <div
            key={contract.id}
            className="rounded-xl border border-slate-100 p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${STATUS_DOT[contract.status]}`}
                  aria-hidden
                />
                <span className="font-medium text-slate-800">
                  {contract.name}
                </span>
              </div>
              <StatusBadge status={contract.status} />
            </div>

            <p className="mt-1 font-mono text-xs text-slate-400">
              {formatAddress(contract.contractId, 6)} · {contract.network}
            </p>

            <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div>
                <dt className="text-xs text-slate-400">Uptime</dt>
                <dd className="text-sm font-semibold text-slate-800">
                  {contract.uptimePct.toFixed(1)}%
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">Latency</dt>
                <dd className="text-sm font-semibold text-slate-800">
                  {contract.avgLatencyMs}ms
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">24h Calls</dt>
                <dd className="text-sm font-semibold text-slate-800">
                  {formatCompactNumber(contract.invocations24h)}
                </dd>
              </div>
            </dl>

            <p className="mt-3 text-xs text-slate-400">
              Last invocation {formatDateTime(contract.lastInvocationAt)}
            </p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
