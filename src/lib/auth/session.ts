import "server-only";

import { cookies } from "next/headers";

import type { AuthUser } from "@/types/auth";

import { SESSION_COOKIE } from "./constants";
import { MOCK_USERS } from "./mock-users";

/**
 * Reads the current session user from the session cookie.
 *
 * MOCK IMPLEMENTATION: the cookie stores a mock user id which is resolved
 * against {@link MOCK_USERS}. Replace the body of this function with a real
 * session lookup (decrypt a JWT, hit a database, call an auth provider) to go
 * live — the rest of the app depends only on the returned {@link AuthUser}.
 */
export async function readSessionUser(): Promise<AuthUser | null> {
  const store = await cookies();
  const id = store.get(SESSION_COOKIE)?.value;
  if (!id) return null;
  return MOCK_USERS[id] ?? null;
}
