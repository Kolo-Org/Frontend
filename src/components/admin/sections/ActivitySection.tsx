import type { ActivityLogEntry } from "@/types/admin";
import { formatDateTime } from "@/utils/formatters/date";

import { SectionCard } from "../ui/SectionCard";

const SEVERITY_DOT: Record<ActivityLogEntry["severity"], string> = {
  info: "bg-sky-500",
  warning: "bg-amber-500",
  critical: "bg-rose-500",
};

/** Activity-log tab: a chronological feed of administrative actions. */
export function ActivitySection({
  activity,
}: {
  activity: ActivityLogEntry[];
}) {
  return (
    <SectionCard
      title="Activity Log"
      description="Recent administrative and system events"
    >
      <ol className="relative space-y-5 border-l border-slate-100 pl-6">
        {activity.map((entry) => (
          <li key={entry.id} className="relative">
            <span
              className={`absolute -left-[27px] top-1 h-3 w-3 rounded-full ring-4 ring-white ${SEVERITY_DOT[entry.severity]}`}
              aria-hidden
            />
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <p className="text-sm text-slate-700">
                <span className="font-medium text-slate-900">
                  {entry.actor}
                </span>{" "}
                {entry.action}{" "}
                <span className="font-mono text-xs text-slate-500">
                  {entry.target}
                </span>
              </p>
              <time className="text-xs text-slate-400">
                {formatDateTime(entry.createdAt)}
              </time>
            </div>
          </li>
        ))}
      </ol>
    </SectionCard>
  );
}
