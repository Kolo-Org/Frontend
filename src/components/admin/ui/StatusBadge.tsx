const TONE: Record<string, string> = {
  // positive
  active: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  success: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  healthy: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  completed: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  // warning
  pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  forming: "bg-amber-50 text-amber-700 ring-amber-600/20",
  paused: "bg-amber-50 text-amber-700 ring-amber-600/20",
  degraded: "bg-amber-50 text-amber-700 ring-amber-600/20",
  warning: "bg-amber-50 text-amber-700 ring-amber-600/20",
  // danger
  suspended: "bg-rose-50 text-rose-700 ring-rose-600/20",
  failed: "bg-rose-50 text-rose-700 ring-rose-600/20",
  down: "bg-rose-50 text-rose-700 ring-rose-600/20",
  critical: "bg-rose-50 text-rose-700 ring-rose-600/20",
  // informational
  deposit: "bg-sky-50 text-sky-700 ring-sky-600/20",
  payout: "bg-sky-50 text-sky-700 ring-sky-600/20",
  info: "bg-sky-50 text-sky-700 ring-sky-600/20",
};

const NEUTRAL = "bg-slate-50 text-slate-600 ring-slate-500/20";

/** Small pill that colour-codes a status/label string by semantic tone. */
export function StatusBadge({ status }: { status: string }) {
  const tone = TONE[status.toLowerCase()] ?? NEUTRAL;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ring-1 ring-inset ${tone}`}
    >
      {status}
    </span>
  );
}
