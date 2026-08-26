import { groupsService } from "@/services/api/groups";
import { InviteButton } from "@/components/groups/InviteButton";
import Link from "next/link";

export default async function Groups() {
  const groups = await groupsService.listGroups();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="font-display text-2xl font-bold text-slate-900">
          Your Groups
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your savings circles and invite new members.
        </p>
      </header>

      <ul className="space-y-4">
        {groups.map((group) => (
          <li
            key={group.id}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <Link href={`/groups/${group.id}`} className="block flex-1 group">
                <h2 className="font-display text-lg font-semibold text-slate-900 group-hover:text-green-600 transition-colors">
                  {group.name}
                </h2>
                {group.description && (
                  <p className="mt-1 text-sm text-slate-500">
                    {group.description}
                  </p>
                )}
                {typeof group.memberCount === "number" && (
                  <p className="mt-2 text-xs font-medium text-slate-400">
                    {group.memberCount} members
                  </p>
                )}
              </Link>
            </div>

            <div className="mt-4 border-t border-slate-100 pt-4">
              <InviteButton group={group} />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
