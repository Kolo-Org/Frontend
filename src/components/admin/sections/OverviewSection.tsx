import type { AdminDashboardData } from "@/types/admin";

import { SavingsGrowthChart } from "../charts/SavingsGrowthChart";
import { GroupStatusChart } from "../charts/GroupStatusChart";
import { TransactionVolumeChart } from "../charts/TransactionVolumeChart";
import { UserGrowthChart } from "../charts/UserGrowthChart";
import { MetricCard } from "../ui/MetricCard";
import { SectionCard } from "../ui/SectionCard";

/** Overview tab: headline KPIs plus platform trend charts. */
export function OverviewSection({ data }: { data: AdminDashboardData }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {data.metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <SectionCard
          title="Total Value Saved"
          description="Cumulative savings across all groups"
          className="lg:col-span-2"
        >
          <SavingsGrowthChart data={data.savingsGrowth} />
        </SectionCard>
        <SectionCard
          title="Groups by Status"
          description="Current distribution"
        >
          <GroupStatusChart data={data.groupStatusBreakdown} />
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SectionCard
          title="Transaction Volume"
          description="Monthly settlements"
        >
          <TransactionVolumeChart data={data.transactionVolume} />
        </SectionCard>
        <SectionCard title="User Growth" description="New members per month">
          <UserGrowthChart data={data.userGrowth} />
        </SectionCard>
      </div>
    </div>
  );
}
