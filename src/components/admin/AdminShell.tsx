"use client";

import { useState } from "react";

import { signOut } from "@/lib/auth/actions";
import type { AuthUser } from "@/types/auth";
import type { AdminDashboardData } from "@/types/admin";

import { ActivitySection } from "./sections/ActivitySection";
import { ContractHealthSection } from "./sections/ContractHealthSection";
import { GroupsSection } from "./sections/GroupsSection";
import { OverviewSection } from "./sections/OverviewSection";
import { TransactionsSection } from "./sections/TransactionsSection";
import { UsersSection } from "./sections/UsersSection";

type TabId =
  | "overview"
  | "users"
  | "groups"
  | "transactions"
  | "contracts"
  | "activity";

const TABS: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "users", label: "Users" },
  { id: "groups", label: "Groups" },
  { id: "transactions", label: "Transactions" },
  { id: "contracts", label: "Contracts" },
  { id: "activity", label: "Activity" },
];

interface AdminShellProps {
  user: AuthUser;
  data: AdminDashboardData;
}

/** Client shell owning tab state and the admin layout (sidebar + topbar). */
export function AdminShell({ user, data }: AdminShellProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const activeLabel =
    TABS.find((tab) => tab.id === activeTab)?.label ?? "Overview";
  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex min-h-screen bg-[#f6f3f5] text-slate-900">
      {/* Sidebar (md and up) */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-slate-200 bg-white p-5 md:flex">
        <div className="mb-8 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#006c49] font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-white">
            K
          </span>
          <span className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold">
            Kolo
          </span>
        </div>
        <nav className="flex flex-col gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-current={activeTab === tab.id ? "page" : undefined}
              className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-[#006c49]/10 text-[#006c49]"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="flex flex-col gap-4 border-b border-slate-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold">
              {activeLabel}
            </h1>
            <p className="text-sm text-slate-500">Administrative dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#006c49]/10 text-sm font-semibold text-[#006c49]">
                {initials}
              </span>
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium leading-tight">{user.name}</p>
                <p className="text-xs capitalize text-slate-400">{user.role}</p>
              </div>
            </div>
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
              >
                Sign out
              </button>
            </form>
          </div>
        </header>

        {/* Mobile tab bar */}
        <nav className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-white px-3 py-2 md:hidden">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-current={activeTab === tab.id ? "page" : undefined}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-[#006c49]/10 text-[#006c49]"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden p-5">
          {activeTab === "overview" && <OverviewSection data={data} />}
          {activeTab === "users" && <UsersSection users={data.users} />}
          {activeTab === "groups" && <GroupsSection groups={data.groups} />}
          {activeTab === "transactions" && (
            <TransactionsSection transactions={data.transactions} />
          )}
          {activeTab === "contracts" && (
            <ContractHealthSection contracts={data.contracts} />
          )}
          {activeTab === "activity" && (
            <ActivitySection activity={data.activity} />
          )}
        </main>
      </div>
    </div>
  );
}
