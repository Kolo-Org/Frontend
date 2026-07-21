"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Group } from "@/types/group";
import { groupsService } from "@/services/api/groups";
import { useAuth } from "@/hooks/useAuth";

interface InviteConfirmProps {
  code: string;
}

type Phase = "loading" | "invalid" | "redirecting" | "confirm" | "joined";

/**
 * The onboarding router for an invite deep link (`/invite/[code]`).
 *
 * 1. Resolves the invite code to its group.
 * 2. Unknown / expired code -> friendly error.
 * 3. Valid code + unauthenticated visitor -> routed through signup first,
 *    carrying the invite in `?redirect=` so we can return here afterwards.
 * 4. Authenticated visitor -> group Join confirmation, then a success state.
 */
export function InviteConfirm({ code }: InviteConfirmProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const [phase, setPhase] = useState<Phase>("loading");
  const [group, setGroup] = useState<Group | null>(null);
  const [joining, setJoining] = useState(false);
  const [joinError, setJoinError] = useState<string | null>(null);

  // Resolve the invite once the auth session has hydrated.
  useEffect(() => {
    if (authLoading) return;

    let active = true;

    groupsService
      .getInvite(code)
      .then((resolution) => {
        if (!active) return;

        if (!resolution) {
          setPhase("invalid");
          return;
        }

        setGroup(resolution.group);

        if (!isAuthenticated) {
          // Preserve context: come straight back here after signup.
          // Encode the whole path so codes containing &/=/# survive the round-trip.
          setPhase("redirecting");
          router.replace(
            `/register?redirect=${encodeURIComponent(`/invite/${code}`)}`,
          );
          return;
        }

        setPhase("confirm");
      })
      .catch(() => {
        // Don't leave the screen spinning forever if resolution fails.
        if (!active) return;
        setPhase("invalid");
      });

    return () => {
      active = false;
    };
  }, [authLoading, isAuthenticated, code, router]);

  async function handleJoin() {
    if (!group) return;
    setJoining(true);
    setJoinError(null);
    try {
      await groupsService.joinGroup(group.id);
      setPhase("joined");
    } catch {
      // Keep the user on the confirm screen so they can retry.
      setJoinError("Something went wrong joining the group. Please try again.");
    } finally {
      setJoining(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
        {(phase === "loading" || phase === "redirecting") && (
          <div className="text-center">
            <Spinner />
            <p className="mt-4 text-sm text-slate-500">
              {phase === "redirecting"
                ? "Taking you to sign up…"
                : "Loading your invite…"}
            </p>
          </div>
        )}

        {phase === "invalid" && (
          <div className="text-center">
            <h1 className="font-display text-xl font-bold text-slate-900">
              Invite not found
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              This invite link is invalid or has expired. Ask the group admin
              for a fresh link.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
            >
              Back to home
            </Link>
          </div>
        )}

        {phase === "confirm" && group && (
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
              <span className="font-display text-xl font-bold text-emerald-600">
                {group.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              You&apos;ve been invited to join
            </p>
            <h1 className="mt-1 font-display text-xl font-bold text-slate-900">
              {group.name}
            </h1>
            {group.description && (
              <p className="mt-2 text-sm text-slate-500">{group.description}</p>
            )}
            {typeof group.memberCount === "number" && (
              <p className="mt-2 text-xs font-medium text-slate-400">
                {group.memberCount} members already saving together
              </p>
            )}
            <button
              type="button"
              onClick={handleJoin}
              disabled={joining}
              className="mt-6 w-full rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {joining ? "Joining…" : "Join Group"}
            </button>
            {joinError && (
              <p className="mt-3 text-sm text-red-500" role="alert">
                {joinError}
              </p>
            )}
          </div>
        )}

        {phase === "joined" && group && (
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
              <svg
                className="h-7 w-7 text-emerald-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h1 className="mt-4 font-display text-xl font-bold text-slate-900">
              Welcome to {group.name}!
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              You&apos;re all set. Head to your dashboard to start contributing.
            </p>
            <Link
              href="/dashboard"
              className="mt-6 inline-block w-full rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
            >
              Go to dashboard
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

function Spinner() {
  return (
    <svg
      className="mx-auto h-8 w-8 animate-spin text-emerald-500"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
