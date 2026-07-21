/**
 * Shared auth constants.
 *
 * Kept free of `server-only` and of any Node/Next request APIs so it can be
 * imported from both the Proxy (edge-ish request pipeline) and server-only
 * modules without pulling server code into the wrong bundle.
 */

/** Name of the cookie that holds the (mock) session identifier. */
export const SESSION_COOKIE = "kolo_session";

/** Routes that require an authenticated session. */
export const PROTECTED_PREFIXES = ["/admin", "/dashboard"] as const;
