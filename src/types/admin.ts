import type { UserRole } from "./auth";

/** Direction of a metric's period-over-period change. */
export type TrendDirection = "up" | "down" | "flat";

/** A headline platform metric shown as a card on the overview. */
export interface PlatformMetric {
  id: string;
  label: string;
  /** Preformatted display value, e.g. "$1.2M" or "8,420". */
  value: string;
  /** Percentage change vs. the previous period. */
  changePct: number;
  trend: TrendDirection;
  hint: string;
}

export type AccountStatus = "active" | "suspended" | "pending";

/** A platform user, as seen in the admin user-management table. */
export interface AdminUserRecord {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: AccountStatus;
  country: string;
  groupsCount: number;
  /** Lifetime amount saved, in USD. */
  totalSaved: number;
  /** ISO date string. */
  joinedAt: string;
  /** ISO date-time string. */
  lastActiveAt: string;
}

export type GroupStatus = "active" | "forming" | "completed" | "paused";
export type ContributionCycle = "weekly" | "biweekly" | "monthly";

/** An active or historical community savings group (Chama). */
export interface SavingsGroupRecord {
  id: string;
  name: string;
  status: GroupStatus;
  members: number;
  targetAmount: number;
  savedAmount: number;
  contributionCycle: ContributionCycle;
  /** ISO date string. */
  nextPayoutAt: string;
  /** ISO date string. */
  createdAt: string;
}

export type TransactionType = "deposit" | "withdrawal" | "payout" | "fee";
export type TransactionStatus = "success" | "pending" | "failed";
export type AssetCode = "USDC" | "XLM";

/** A single on-chain transaction for the analytics table. */
export interface TransactionRecord {
  id: string;
  hash: string;
  type: TransactionType;
  status: TransactionStatus;
  user: string;
  group: string;
  amount: number;
  asset: AssetCode;
  /** ISO date-time string. */
  createdAt: string;
}

export type ContractStatus = "healthy" | "degraded" | "down";

/** Health snapshot for a deployed Soroban smart contract. */
export interface ContractHealthIndicator {
  id: string;
  name: string;
  contractId: string;
  network: "testnet" | "mainnet";
  status: ContractStatus;
  uptimePct: number;
  avgLatencyMs: number;
  invocations24h: number;
  /** ISO date-time string. */
  lastInvocationAt: string;
}

export type ActivitySeverity = "info" | "warning" | "critical";

/** An entry in the administrative activity / audit log. */
export interface ActivityLogEntry {
  id: string;
  actor: string;
  action: string;
  target: string;
  severity: ActivitySeverity;
  /** ISO date-time string. */
  createdAt: string;
}

/** A single point in a time series used by the overview charts. */
export interface TimeSeriesPoint {
  label: string;
  value: number;
}

/** Count of groups in a given status, for the status breakdown chart. */
export interface GroupStatusDatum {
  status: GroupStatus;
  count: number;
}

/** Everything the admin dashboard needs, assembled server-side. */
export interface AdminDashboardData {
  metrics: PlatformMetric[];
  users: AdminUserRecord[];
  groups: SavingsGroupRecord[];
  transactions: TransactionRecord[];
  contracts: ContractHealthIndicator[];
  activity: ActivityLogEntry[];
  savingsGrowth: TimeSeriesPoint[];
  transactionVolume: TimeSeriesPoint[];
  userGrowth: TimeSeriesPoint[];
  groupStatusBreakdown: GroupStatusDatum[];
}
