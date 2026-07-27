"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SESSION_COOKIE } from "./constants";
import { DEMO_ADMIN_ID, DEMO_MEMBER_ID } from "./mock-users";

/**
 * Demo authentication actions.
 *
 * MOCK IMPLEMENTATION: these set/clear the session cookie so the authorization
 * flow can be exercised end-to-end without a real login backend. Replace with
 * credential verification + secure session creation when auth lands.
 */

async function setSession(userId: string): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function signInAsAdmin(): Promise<void> {
  await setSession(DEMO_ADMIN_ID);
  redirect("/admin");
}

export async function signInAsMember(): Promise<void> {
  await setSession(DEMO_MEMBER_ID);
  redirect("/dashboard");
}

export async function signOut(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/login");
}
