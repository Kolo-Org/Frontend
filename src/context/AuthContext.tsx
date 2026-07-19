"use client";

import { createContext, useMemo, useSyncExternalStore } from "react";

/**
 * Minimal mock auth.
 *
 * Real authentication does not exist in the app yet, so this is a lightweight
 * stand-in backed by `localStorage` (`kolo_auth`). It is enough to power the
 * invite deep-link onboarding flow (route unauthenticated users through signup,
 * then back to the group). Replace `login`/`logout`/`readUser` with real session
 * calls once auth lands — the `useAuth` consumer contract can stay the same.
 *
 * The persisted session is exposed through `useSyncExternalStore` so it hydrates
 * safely (server renders "loading", client reads storage) and stays in sync
 * across tabs — without calling `setState` inside an effect.
 */

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  /** True until the persisted session has been read on the client. */
  isLoading: boolean;
  login: (user?: Partial<AuthUser>) => void;
  logout: () => void;
}

interface AuthSnapshot {
  user: AuthUser | null;
  isLoading: boolean;
}

const STORAGE_KEY = "kolo_auth";

export const AuthContext = createContext<AuthContextValue | null>(null);

// --- External auth store (module singleton) ---------------------------------

const listeners = new Set<() => void>();

// Cached so `getSnapshot` returns a stable reference until storage changes,
// which `useSyncExternalStore` requires to avoid infinite re-renders.
let cachedRaw: string | null = null;
let clientSnapshot: AuthSnapshot = { user: null, isLoading: false };
const serverSnapshot: AuthSnapshot = { user: null, isLoading: true };

function getClientSnapshot(): AuthSnapshot {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    raw = null;
  }
  if (raw !== cachedRaw || clientSnapshot.isLoading) {
    cachedRaw = raw;
    let user: AuthUser | null = null;
    try {
      user = raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      user = null;
    }
    clientSnapshot = { user, isLoading: false };
  }
  return clientSnapshot;
}

function getServerSnapshot(): AuthSnapshot {
  return serverSnapshot;
}

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function emit(): void {
  listeners.forEach((listener) => listener());
}

function login(partial?: Partial<AuthUser>): void {
  // TODO: replace with real API — POST /auth/register|login
  const nextUser: AuthUser = {
    id: partial?.id ?? "u1",
    name: partial?.name ?? "Kolo Member",
    email: partial?.email ?? "member@kolo.app",
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
  } catch {
    /* fail soft if storage is unavailable */
  }
  emit();
}

function logout(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* fail soft */
  }
  emit();
}

// ---------------------------------------------------------------------------

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const snapshot = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user: snapshot.user,
      isAuthenticated: snapshot.user !== null,
      isLoading: snapshot.isLoading,
      login,
      logout,
    }),
    [snapshot],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}
