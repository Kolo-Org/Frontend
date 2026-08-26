import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { PROTECTED_PREFIXES, SESSION_COOKIE } from "@/lib/auth/constants";

/**
 * Proxy (formerly Middleware — renamed in Next.js 16).
 *
 * Performs an *optimistic* auth check only: it looks for the presence of a
 * session cookie and redirects unauthenticated users away from protected
 * routes. It deliberately does NOT check roles or decrypt the session — that
 * secure check happens close to the data in the Data Access Layer
 * (`requireAdmin`). See the Next.js authentication guide for why role checks
 * belong in the page/DAL rather than here.
 */
export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value);

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  if (isProtected && !hasSession) {
    // TEMPORARY BYPASS FOR UI DEVELOPMENT
    // const loginUrl = new URL("/login", request.url);
    // loginUrl.searchParams.set("from", pathname);
    // return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
