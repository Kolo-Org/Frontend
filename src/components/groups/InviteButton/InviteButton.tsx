"use client";

import { useState } from "react";
import type { Group } from "@/types/group";
import { groupsService } from "@/services/api/groups";
import { buildInviteUrl, buildWhatsAppShareUrl } from "@/utils/invite";

interface InviteButtonProps {
  group: Group;
}

type Status = "idle" | "generating" | "ready" | "error";

/**
 * "Invite Member" button for the Group Dashboard.
 *
 * Generates a unique short invite link for the group, then offers the best
 * available share affordance: the native Web Share sheet on supported
 * (mobile) devices, plus explicit WhatsApp and copy-to-clipboard fallbacks.
 */
export function InviteButton({ group }: InviteButtonProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const shareText = `Join my Kolo savings group "${group.name}" 💰`;

  async function handleGenerate() {
    setStatus("generating");
    setCopied(false);
    try {
      const invite = await groupsService.createInvite(group.id);
      setUrl(buildInviteUrl(invite.code));
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }

  async function handleNativeShare() {
    // `navigator.share` is only available on secure origins, mostly mobile.
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "Kolo", text: shareText, url });
      } catch {
        /* user dismissed the share sheet — nothing to do */
      }
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the link is still visible for manual copy */
    }
  }

  const canNativeShare =
    typeof navigator !== "undefined" && Boolean(navigator.share);

  return (
    <div className="w-full">
      {status !== "ready" && (
        <button
          type="button"
          onClick={handleGenerate}
          disabled={status === "generating"}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M19 8v6M22 11h-6" />
          </svg>
          {status === "generating" ? "Generating…" : "Invite Member"}
        </button>
      )}

      {status === "error" && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          Couldn&apos;t generate an invite link. Please try again.
        </p>
      )}

      {status === "ready" && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <label
            htmlFor={`invite-url-${group.id}`}
            className="text-xs font-medium text-slate-500"
          >
            Invite link
          </label>
          <div className="mt-1 flex items-center gap-2">
            <input
              id={`invite-url-${group.id}`}
              readOnly
              value={url}
              onFocus={(event) => event.currentTarget.select()}
              className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {canNativeShare && (
              <button
                type="button"
                onClick={handleNativeShare}
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <path d="m8.59 13.51 6.83 3.98M15.41 6.51 8.59 10.49" />
                </svg>
                Share
              </button>
            )}
            <a
              href={buildWhatsAppShareUrl(url, shareText)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366] px-3 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24.044 12.045.044 5.463.044.116 5.391.113 11.986c0 2.096.546 4.142 1.588 5.945L.056 24l6.304-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.582 0 11.928-5.347 11.931-11.942a11.9 11.9 0 0 0-3.463-8.404" />
              </svg>
              WhatsApp
            </a>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Anyone with this link can request to join{" "}
            <span className="font-medium text-slate-500">{group.name}</span>.
          </p>
        </div>
      )}
    </div>
  );
}
