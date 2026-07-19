"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface AuthFormProps {
  mode: "register" | "login";
}

/**
 * Mock signup / login form.
 *
 * On submit it starts a mock session and honours a `?redirect=` query param so
 * invite deep links return the user to the group Join confirmation after
 * onboarding. Replace `login()` with a real auth call when auth lands.
 *
 * Reads `useSearchParams`, so it must be rendered inside a <Suspense> boundary
 * (a Next.js requirement).
 */
export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isRegister = mode === "register";
  const redirect = safeRedirect(searchParams.get("redirect"));

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    login({
      name: name.trim() || undefined,
      email: email.trim() || undefined,
    });
    router.replace(redirect ?? "/dashboard");
  }

  const otherHref = isRegister ? "/login" : "/register";
  const otherLabel = isRegister ? "Log in" : "Sign up";
  // Preserve the invite context when switching between login and signup.
  const otherHrefWithRedirect = redirect
    ? `${otherHref}?redirect=${encodeURIComponent(redirect)}`
    : otherHref;

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
        <h1 className="font-display text-2xl font-bold text-slate-900">
          {isRegister ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {isRegister
            ? "Join Kolo and start saving with your community."
            : "Log in to continue saving with your groups."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {isRegister && (
            <Field
              id="name"
              label="Full name"
              type="text"
              value={name}
              onChange={setName}
              autoComplete="name"
            />
          )}
          <Field
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            autoComplete="email"
            required
          />
          <Field
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            autoComplete={isRegister ? "new-password" : "current-password"}
            required
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
          >
            {isRegister ? "Sign up" : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          {isRegister ? "Already have an account? " : "New to Kolo? "}
          <Link
            href={otherHrefWithRedirect}
            className="font-semibold text-emerald-600 hover:text-emerald-700"
          >
            {otherLabel}
          </Link>
        </p>
      </div>
    </main>
  );
}

/** Only allow same-site relative redirects to avoid open-redirect issues. */
function safeRedirect(value: string | null): string | null {
  if (!value) return null;
  return value.startsWith("/") && !value.startsWith("//") ? value : null;
}

interface FieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  required?: boolean;
}

function Field({
  id,
  label,
  type,
  value,
  onChange,
  autoComplete,
  required,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
      />
    </div>
  );
}
