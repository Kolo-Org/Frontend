import type { Metadata } from "next";

import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminDashboardData } from "@/lib/admin/mock-data";
import { requireAdmin } from "@/lib/auth/dal";

export const metadata: Metadata = {
  title: "Admin Dashboard — Kolo",
  description:
    "Platform metrics, user management and analytics for Kolo admins.",
};

/**
 * Admin dashboard entry point.
 *
 * `requireAdmin()` is the secure server-side guard: it runs before any markup
 * is produced and redirects non-admins away, so the dashboard only ever renders
 * for authenticated admin users. Data is fetched on the server and streamed to
 * the client shell as serializable props.
 */
export default async function AdminPage() {
  const user = await requireAdmin();
  const data = await getAdminDashboardData();

  return <AdminShell user={user} data={data} />;
}
