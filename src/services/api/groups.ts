import type { Group } from "@/types/group";
import type { Invite, InviteResolution } from "@/types/invite";
import { generateInviteCode } from "@/utils/invite";

/**
 * Mock groups service.
 *
 * The real Kolo backend does not exist yet, so this stands in for it using
 * `localStorage` for persistence. The shape of every method mirrors what a
 * real API client would expose (all async), so swapping in real network calls
 * later is a drop-in change at the `// TODO: replace with real API` seams.
 *
 * Because it relies on `localStorage`, every method is guarded for
 * server-side / no-`window` environments and should only be awaited from
 * client components.
 */

const INVITES_KEY = "kolo_invites";
const MEMBERSHIPS_KEY = "kolo_memberships";

/**
 * Seeded demo groups so the dashboard has something to invite people to.
 * TODO: replace with real API — GET /groups
 */
const SEED_GROUPS: Group[] = [
  {
    id: "g1",
    name: "Lagos Savers Circle",
    description: "Weekly ajo for the Lagos tech community.",
    memberCount: 8,
    currency: "NGN",
    contributionAmount: 10000,
  },
  {
    id: "g2",
    name: "Family Emergency Fund",
    description: "A safety net we build together, one month at a time.",
    memberCount: 5,
    currency: "NGN",
    contributionAmount: 25000,
  },
];

function hasWindow(): boolean {
  return typeof window !== "undefined";
}

function readMap(key: string): Record<string, string> {
  if (!hasWindow()) return {};
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

function writeMap(key: string, value: Record<string, string>): void {
  if (!hasWindow()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage may be unavailable (private mode, quota) — fail soft */
  }
}

export const groupsService = {
  /** TODO: replace with real API — GET /groups */
  async listGroups(): Promise<Group[]> {
    return SEED_GROUPS;
  },

  /** TODO: replace with real API — GET /groups/:id */
  async getGroup(id: string): Promise<Group | null> {
    return SEED_GROUPS.find((group) => group.id === id) ?? null;
  },

  /**
   * Generate a unique short invite code for a group and persist the mapping.
   * TODO: replace with real API — POST /groups/:id/invites
   */
  async createInvite(groupId: string): Promise<Invite> {
    const group = await this.getGroup(groupId);
    if (!group) {
      throw new Error(`Unknown group: ${groupId}`);
    }

    const invites = readMap(INVITES_KEY);

    let code = generateInviteCode();
    // Avoid the (astronomically unlikely) collision with an existing code.
    while (invites[code]) {
      code = generateInviteCode();
    }

    invites[code] = groupId;
    writeMap(INVITES_KEY, invites);

    return { code, groupId, createdAt: Date.now() };
  },

  /**
   * Resolve an invite code back to its group.
   * TODO: replace with real API — GET /invites/:code
   */
  async getInvite(code: string): Promise<InviteResolution | null> {
    const invites = readMap(INVITES_KEY);
    const groupId = invites[code];
    if (!groupId) return null;

    const group = await this.getGroup(groupId);
    if (!group) return null;

    return { code, group };
  },

  /**
   * Record the current user joining a group.
   * TODO: replace with real API — POST /groups/:id/members
   */
  async joinGroup(groupId: string): Promise<void> {
    const memberships = readMap(MEMBERSHIPS_KEY);
    memberships[groupId] = new Date().toISOString();
    writeMap(MEMBERSHIPS_KEY, memberships);
  },

  /** Whether the current browser has already joined a group. */
  async hasJoined(groupId: string): Promise<boolean> {
    const memberships = readMap(MEMBERSHIPS_KEY);
    return Boolean(memberships[groupId]);
  },
};
