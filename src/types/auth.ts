/**
 * Authentication / authorization domain types.
 *
 * These are intentionally minimal and provider-agnostic so the mock auth layer
 * in `src/lib/auth` can later be swapped for a real backend (NextAuth, Clerk,
 * Stellar wallet auth, etc.) without touching the admin UI.
 */

export type UserRole = "admin" | "member";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
