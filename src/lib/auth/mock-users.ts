import type { AuthUser } from "@/types/auth";

/**
 * Mock user directory.
 *
 * Placeholder for a real user store / auth provider. The session cookie holds
 * one of these ids; swapping in a real backend means replacing `readSessionUser`
 * in `session.ts` — nothing else in the admin feature needs to change.
 */
export const MOCK_USERS: Record<string, AuthUser> = {
  "admin-1": {
    id: "admin-1",
    name: "Ada Okafor",
    email: "ada.okafor@kolo.africa",
    role: "admin",
  },
  "member-1": {
    id: "member-1",
    name: "Femi Adeyemi",
    email: "femi.adeyemi@kolo.africa",
    role: "member",
  },
};

export const DEMO_ADMIN_ID = "admin-1";
export const DEMO_MEMBER_ID = "member-1";
