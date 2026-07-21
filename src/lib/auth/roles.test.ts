import { describe, expect, it } from "vitest";

import type { AuthUser } from "@/types/auth";

import { hasRole, isAdmin } from "./roles";

const admin: AuthUser = {
  id: "a",
  name: "Admin",
  email: "a@kolo.africa",
  role: "admin",
};
const member: AuthUser = {
  id: "m",
  name: "Member",
  email: "m@kolo.africa",
  role: "member",
};

describe("isAdmin", () => {
  it("is true only for admin users", () => {
    expect(isAdmin(admin)).toBe(true);
    expect(isAdmin(member)).toBe(false);
  });

  it("is false for null/undefined users", () => {
    expect(isAdmin(null)).toBe(false);
    expect(isAdmin(undefined)).toBe(false);
  });
});

describe("hasRole", () => {
  it("matches the exact role", () => {
    expect(hasRole(member, "member")).toBe(true);
    expect(hasRole(member, "admin")).toBe(false);
  });
});
