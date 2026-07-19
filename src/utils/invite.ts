/**
 * Pure helpers for building and sharing group invite links.
 *
 * These are intentionally framework-agnostic so they can be reused by the
 * `InviteButton` component and by the mock `groupsService`. The only browser
 * dependency (`window.location.origin`) is opt-in via the `origin` argument.
 */

const CODE_ALPHABET =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/**
 * Generate a short, URL-safe invite code, e.g. "abc123xyz".
 *
 * Uses `crypto.getRandomValues` when available for good uniqueness, falling
 * back to `Math.random` in environments without the Web Crypto API.
 */
export function generateInviteCode(length = 9): string {
  const alphabetLength = CODE_ALPHABET.length;

  const cryptoObj =
    typeof globalThis !== "undefined" ? globalThis.crypto : undefined;

  if (cryptoObj?.getRandomValues) {
    const bytes = new Uint8Array(length);
    cryptoObj.getRandomValues(bytes);
    let code = "";
    for (let i = 0; i < length; i++) {
      code += CODE_ALPHABET[bytes[i] % alphabetLength];
    }
    return code;
  }

  let code = "";
  for (let i = 0; i < length; i++) {
    code += CODE_ALPHABET[Math.floor(Math.random() * alphabetLength)];
  }
  return code;
}

/**
 * Build the absolute invite URL for a code, e.g. "https://kolo.app/invite/abc123xyz".
 *
 * Pass `origin` on the server; on the client it defaults to the current origin.
 */
export function buildInviteUrl(code: string, origin?: string): string {
  const base =
    origin ??
    (typeof window !== "undefined"
      ? window.location.origin
      : "https://kolo.app");
  return `${base}/invite/${code}`;
}

/**
 * Build a WhatsApp share deep link that pre-fills the given message.
 * Works on both mobile (opens the app) and desktop (opens WhatsApp Web).
 */
export function buildWhatsAppShareUrl(url: string, text?: string): string {
  const message = text ? `${text} ${url}` : url;
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
