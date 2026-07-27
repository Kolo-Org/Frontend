import type { Group } from "./group";

/** A single-use-ish invite mapping a short code to a group. */
export interface Invite {
  code: string;
  groupId: string;
  /** Epoch milliseconds the invite was created. */
  createdAt: number;
}

/** A resolved invite: the short code paired with its target group. */
export interface InviteResolution {
  code: string;
  group: Group;
}
