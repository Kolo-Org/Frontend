import type { AuthUser, UserRole } from "@/types/auth";

/**
 * Pure, framework-free authorization predicates.
 *
 * These are the single source of truth for "can this user do X" decisions and
 * are unit-tested in isolation. Keeping them pure means both the server guard
 * (`requireAdmin`) and any client UI can share identical logic.
 */

export function hasRole(
  user: AuthUser | null | undefined,
  role: UserRole,
): boolean {
  return user?.role === role;
}

export function isAdmin(user: AuthUser | null | undefined): boolean {
  return hasRole(user, "admin");
}
