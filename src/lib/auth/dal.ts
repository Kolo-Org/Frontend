import "server-only";

import { redirect } from "next/navigation";
import { cache } from "react";

import type { AuthUser } from "@/types/auth";

import { isAdmin } from "./roles";
import { readSessionUser } from "./session";

/**
 * Data Access Layer for auth (per the Next.js authentication guide).
 *
 * `getCurrentUser` is memoized for the duration of a render pass so multiple
 * components can call it without repeated cookie reads. `requireAdmin` is the
 * secure server-side guard: it runs close to the data/UI it protects and
 * redirects unauthorized requests before any admin markup is produced.
 */

export const getCurrentUser = cache(async (): Promise<AuthUser | null> => {
  return readSessionUser();
});

/**
 * Guarantees the caller is an authenticated admin, or redirects.
 * Returns the admin user so pages can use their details.
 */
export async function requireAdmin(): Promise<AuthUser> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?from=/admin");
  }

  if (!isAdmin(user)) {
    redirect("/login?from=/admin&error=forbidden");
  }

  return user;
}
