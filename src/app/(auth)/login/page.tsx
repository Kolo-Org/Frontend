import Link from "next/link";

import { signInAsAdmin, signInAsMember } from "@/lib/auth/actions";

/**
 * Demo login page.
 *
 * The real credential form is out of scope for the admin dashboard issue, so
 * this provides two one-click demo sessions that exercise the authorization
 * flow: sign in as an admin (can reach `/admin`) or as a member (cannot).
 */
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const forbidden = params.error === "forbidden";
  const from = typeof params.from === "string" ? params.from : undefined;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f3f5] px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-[8px_8px_24px_0px_#d1d5db,-8px_-8px_24px_0px_#ffffff]">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#006c49]"
        >
          ← Back to home
        </Link>

        <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-slate-900">
          Sign in to Kolo
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          This is a demo sign-in used while real authentication is being built.
          Choose a role to explore the app.
        </p>

        {forbidden && (
          <div
            role="alert"
            className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
          >
            You need an <span className="font-semibold">admin</span> account to
            view <span className="font-mono">{from ?? "that page"}</span>. Sign
            in as an admin below.
          </div>
        )}

        <div className="mt-6 space-y-3">
          <form action={signInAsAdmin}>
            <button
              type="submit"
              className="w-full rounded-xl bg-[#006c49] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#005238]"
            >
              Continue as Admin
            </button>
          </form>

          <form action={signInAsMember}>
            <button
              type="submit"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Continue as Member
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Admin sessions can access the administrative dashboard at{" "}
          <span className="font-mono">/admin</span>.
        </p>
      </div>
    </main>
  );
}
