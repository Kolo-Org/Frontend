import type {
  ActivityLogEntry,
  ActivitySeverity,
  AdminDashboardData,
  AdminUserRecord,
  AccountStatus,
  ContractHealthIndicator,
  GroupStatus,
  GroupStatusDatum,
  PlatformMetric,
  SavingsGroupRecord,
  TimeSeriesPoint,
  TransactionRecord,
  TransactionStatus,
  TransactionType,
} from "@/types/admin";

/**
 * Deterministic mock data for the admin dashboard.
 *
 * There is no backend yet, so this module fabricates realistic fixtures. It
 * uses a seeded PRNG (rather than `Math.random`) and a fixed base timestamp so
 * the generated data is identical on every build — this keeps snapshots and
 * server/client rendering stable. Replace `getAdminDashboardData` with real
 * API calls when the backend is available; the return shape is the contract.
 */

// --- Deterministic helpers -------------------------------------------------

function mulberry32(seed: number): () => number {
  let state = seed;
  return function () {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const BASE_TIME = Date.parse("2026-07-20T12:00:00.000Z");
const DAY_MS = 86_400_000;

const rand = mulberry32(20260720);
const int = (min: number, max: number): number =>
  min + Math.floor(rand() * (max - min + 1));
const pick = <T>(items: readonly T[]): T => items[int(0, items.length - 1)];
const chance = (probability: number): boolean => rand() < probability;
const isoDaysAgo = (days: number): string =>
  new Date(BASE_TIME - days * DAY_MS).toISOString();
const isoDaysAhead = (days: number): string =>
  new Date(BASE_TIME + days * DAY_MS).toISOString();
const hashOf = (index: number): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let out = "";
  for (let i = 0; i < 56; i++) out += chars[int(0, chars.length - 1)];
  return `${out.slice(0, 4)}${index}${out.slice(4)}`;
};

// --- Source pools ----------------------------------------------------------

const FIRST_NAMES = [
  "Ada",
  "Femi",
  "Chidi",
  "Amara",
  "Kwame",
  "Zainab",
  "Tunde",
  "Ngozi",
  "Kofi",
  "Aisha",
  "Emeka",
  "Fatima",
  "Sipho",
  "Lerato",
  "Yusuf",
  "Halima",
  "Obi",
  "Nala",
  "Kojo",
  "Wanjiru",
  "Musa",
  "Thandiwe",
  "Bola",
  "Ifeoma",
  "Dayo",
  "Chioma",
  "Kunle",
  "Amina",
  "Sekou",
  "Zola",
] as const;

const LAST_NAMES = [
  "Okafor",
  "Adeyemi",
  "Mensah",
  "Njoroge",
  "Dlamini",
  "Bello",
  "Owusu",
  "Achebe",
  "Mwangi",
  "Diallo",
  "Nkosi",
  "Abara",
  "Kamau",
  "Sow",
  "Eze",
  "Mokoena",
  "Baptiste",
  "Osei",
  "Yakubu",
  "Molefe",
] as const;

const COUNTRIES = [
  "Nigeria",
  "Kenya",
  "Ghana",
  "South Africa",
  "Uganda",
  "Tanzania",
  "Rwanda",
  "Senegal",
  "Ethiopia",
  "Côte d'Ivoire",
] as const;

const GROUP_PREFIXES = [
  "Lagos",
  "Nairobi",
  "Accra",
  "Kigali",
  "Kampala",
  "Dakar",
  "Ibadan",
  "Mombasa",
  "Kumasi",
  "Abuja",
  "Enugu",
  "Soweto",
  "Arusha",
  "Jos",
] as const;

const GROUP_SUFFIXES = [
  "Savers Circle",
  "Market Women",
  "Tech Collective",
  "Family Fund",
  "Youth Cooperative",
  "Traders Union",
  "Builders Chama",
  "Alumni Pool",
] as const;

const ACCOUNT_STATUSES: AccountStatus[] = ["active", "suspended", "pending"];
const GROUP_STATUSES: GroupStatus[] = [
  "active",
  "forming",
  "completed",
  "paused",
];
const TX_TYPES: TransactionType[] = ["deposit", "withdrawal", "payout", "fee"];
const TX_STATUSES: TransactionStatus[] = ["success", "pending", "failed"];
const SEVERITIES: ActivitySeverity[] = ["info", "warning", "critical"];

// --- Generators ------------------------------------------------------------

function makeUsers(count: number): AdminUserRecord[] {
  const users: AdminUserRecord[] = [];
  for (let i = 0; i < count; i++) {
    const first = pick(FIRST_NAMES);
    const last = pick(LAST_NAMES);
    const name = `${first} ${last}`;
    const joinedDaysAgo = int(1, 540);
    users.push({
      id: `usr_${(1000 + i).toString()}`,
      name,
      email: `${first}.${last}${i}`.toLowerCase() + "@example.com",
      role: chance(0.06) ? "admin" : "member",
      status: chance(0.82)
        ? "active"
        : pick(ACCOUNT_STATUSES.filter((s) => s !== "active")),
      country: pick(COUNTRIES),
      groupsCount: int(0, 6),
      totalSaved: int(0, 9800) * 5,
      joinedAt: isoDaysAgo(joinedDaysAgo),
      lastActiveAt: isoDaysAgo(int(0, Math.min(joinedDaysAgo, 40))),
    });
  }
  return users;
}

function makeGroups(count: number): SavingsGroupRecord[] {
  const groups: SavingsGroupRecord[] = [];
  for (let i = 0; i < count; i++) {
    const status = chance(0.55)
      ? "active"
      : pick(GROUP_STATUSES.filter((s) => s !== "active"));
    const target = int(4, 40) * 1000;
    const progress =
      status === "completed" ? 1 : status === "forming" ? rand() * 0.2 : rand();
    groups.push({
      id: `grp_${(200 + i).toString()}`,
      name: `${pick(GROUP_PREFIXES)} ${pick(GROUP_SUFFIXES)}`,
      status,
      members: int(4, 24),
      targetAmount: target,
      savedAmount: Math.round(target * progress),
      contributionCycle: pick(["weekly", "biweekly", "monthly"] as const),
      nextPayoutAt: isoDaysAhead(int(1, 45)),
      createdAt: isoDaysAgo(int(20, 420)),
    });
  }
  return groups;
}

function makeTransactions(
  count: number,
  users: AdminUserRecord[],
  groups: SavingsGroupRecord[],
): TransactionRecord[] {
  const txns: TransactionRecord[] = [];
  for (let i = 0; i < count; i++) {
    const type = pick(TX_TYPES);
    const status = chance(0.86)
      ? "success"
      : pick(TX_STATUSES.filter((s) => s !== "success"));
    txns.push({
      id: `txn_${(5000 + i).toString()}`,
      hash: hashOf(i),
      type,
      status,
      user: pick(users).name,
      group: pick(groups).name,
      amount: type === "fee" ? int(1, 25) : int(10, 2500),
      asset: chance(0.7) ? "USDC" : "XLM",
      createdAt: isoDaysAgo(int(0, 29)),
    });
  }
  return txns;
}

function makeContracts(): ContractHealthIndicator[] {
  const definitions = [
    "SavingsPool",
    "PayoutRouter",
    "ContributionVault",
    "GroupRegistry",
    "FeeCollector",
  ];
  return definitions.map((name, i) => {
    const status = i === 1 ? "degraded" : chance(0.1) ? "down" : "healthy";
    return {
      id: `ctr_${(30 + i).toString()}`,
      name,
      contractId: `C${hashOf(i).slice(0, 20).toUpperCase()}`,
      network: "testnet" as const,
      status,
      uptimePct:
        status === "healthy" ? 99 + rand() : status === "degraded" ? 96 : 82,
      avgLatencyMs: status === "healthy" ? int(120, 320) : int(400, 900),
      invocations24h: int(200, 5200),
      lastInvocationAt: isoDaysAgo(0),
    };
  });
}

function makeActivity(count: number): ActivityLogEntry[] {
  const templates: Array<{
    action: string;
    target: string;
    severity: ActivitySeverity;
  }> = [
    {
      action: "approved group payout",
      target: "Lagos Savers Circle",
      severity: "info",
    },
    { action: "suspended account", target: "usr_1042", severity: "warning" },
    { action: "flagged transaction", target: "txn_5031", severity: "critical" },
    {
      action: "updated contract config",
      target: "PayoutRouter",
      severity: "warning",
    },
    {
      action: "created group",
      target: "Kigali Youth Cooperative",
      severity: "info",
    },
    { action: "resolved dispute", target: "grp_212", severity: "info" },
    { action: "reset member PIN", target: "usr_1099", severity: "info" },
    {
      action: "exported analytics report",
      target: "transactions-q2",
      severity: "info",
    },
  ];
  const actors = ["Ada Okafor", "System", "Kwame Owusu", "Fatima Bello"];
  const entries: ActivityLogEntry[] = [];
  for (let i = 0; i < count; i++) {
    const t = pick(templates);
    entries.push({
      id: `act_${(9000 + i).toString()}`,
      actor: pick(actors),
      action: t.action,
      target: t.target,
      severity: chance(0.7) ? t.severity : pick(SEVERITIES),
      createdAt: isoDaysAgo(int(0, 14)),
    });
  }
  return entries.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

function makeSeries(
  months: number,
  start: number,
  growth: number,
): TimeSeriesPoint[] {
  const labels = [
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
  ];
  const points: TimeSeriesPoint[] = [];
  let value = start;
  for (let i = 0; i < months; i++) {
    value = Math.round(value * (1 + growth) + rand() * start * 0.05);
    points.push({ label: labels[i % labels.length], value });
  }
  return points;
}

function statusBreakdown(groups: SavingsGroupRecord[]): GroupStatusDatum[] {
  return GROUP_STATUSES.map((status) => ({
    status,
    count: groups.filter((g) => g.status === status).length,
  }));
}

const METRICS: PlatformMetric[] = [
  {
    id: "users",
    label: "Total Users",
    value: "8,420",
    changePct: 12.4,
    trend: "up",
    hint: "vs. last 30 days",
  },
  {
    id: "saved",
    label: "Total Value Saved",
    value: "$1.24M",
    changePct: 8.1,
    trend: "up",
    hint: "across all groups",
  },
  {
    id: "groups",
    label: "Active Groups",
    value: "342",
    changePct: 5.2,
    trend: "up",
    hint: "currently contributing",
  },
  {
    id: "txns",
    label: "24h Transactions",
    value: "1,203",
    changePct: 3.7,
    trend: "up",
    hint: "on-chain settlements",
  },
  {
    id: "success",
    label: "Success Rate",
    value: "98.6%",
    changePct: 0.4,
    trend: "up",
    hint: "transaction success",
  },
  {
    id: "avg-size",
    label: "Avg. Group Size",
    value: "7.8",
    changePct: 1.2,
    trend: "down",
    hint: "members per group",
  },
];

// --- Assembly --------------------------------------------------------------

const users = makeUsers(42);
const groups = makeGroups(14);
const transactions = makeTransactions(64, users, groups);
const contracts = makeContracts();
const activity = makeActivity(22);

const dashboardData: AdminDashboardData = {
  metrics: METRICS,
  users,
  groups,
  transactions,
  contracts,
  activity,
  savingsGrowth: makeSeries(12, 42000, 0.14),
  transactionVolume: makeSeries(12, 3200, 0.09),
  userGrowth: makeSeries(12, 3600, 0.11),
  groupStatusBreakdown: statusBreakdown(groups),
};

/**
 * Returns the fully assembled admin dashboard dataset.
 * Async to mirror the eventual real (network-backed) implementation.
 */
export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  return dashboardData;
}
