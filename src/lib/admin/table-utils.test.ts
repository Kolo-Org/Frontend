import { describe, expect, it } from "vitest";

import {
  compareValues,
  filterRows,
  getPage,
  getPageCount,
  sortRows,
  textMatches,
} from "./table-utils";

interface Row {
  name: string;
  amount: number;
  joinedAt: string;
  note?: string | null;
}

const rows: Row[] = [
  { name: "Charlie", amount: 300, joinedAt: "2026-03-01", note: "vip" },
  { name: "alice", amount: 100, joinedAt: "2026-01-15", note: null },
  { name: "Bob", amount: 200, joinedAt: "2026-02-20" },
];

describe("compareValues", () => {
  it("orders numbers numerically", () => {
    expect(compareValues(2, 10)).toBeLessThan(0);
    expect(compareValues(10, 2)).toBeGreaterThan(0);
    expect(compareValues(5, 5)).toBe(0);
  });

  it("orders strings case-insensitively", () => {
    expect(compareValues("apple", "Banana")).toBeLessThan(0);
    expect(compareValues("Banana", "apple")).toBeGreaterThan(0);
  });

  it("uses natural numeric ordering for numeric strings", () => {
    expect(compareValues("item2", "item10")).toBeLessThan(0);
  });

  it("sorts nullish values last regardless of direction", () => {
    expect(compareValues(null, 5)).toBeGreaterThan(0);
    expect(compareValues(5, null)).toBeLessThan(0);
    expect(compareValues(undefined, undefined)).toBe(0);
  });
});

describe("sortRows", () => {
  it("sorts ascending by a numeric accessor", () => {
    const sorted = sortRows(rows, (r) => r.amount, "asc");
    expect(sorted.map((r) => r.amount)).toEqual([100, 200, 300]);
  });

  it("sorts descending by a numeric accessor", () => {
    const sorted = sortRows(rows, (r) => r.amount, "desc");
    expect(sorted.map((r) => r.amount)).toEqual([300, 200, 100]);
  });

  it("sorts by a string accessor case-insensitively", () => {
    const sorted = sortRows(rows, (r) => r.name, "asc");
    expect(sorted.map((r) => r.name)).toEqual(["alice", "Bob", "Charlie"]);
  });

  it("sorts ISO date strings chronologically", () => {
    const sorted = sortRows(rows, (r) => r.joinedAt, "asc");
    expect(sorted.map((r) => r.name)).toEqual(["alice", "Bob", "Charlie"]);
  });

  it("does not mutate the input array", () => {
    const original = [...rows];
    sortRows(rows, (r) => r.amount, "desc");
    expect(rows).toEqual(original);
  });

  it("defaults to ascending", () => {
    const sorted = sortRows(rows, (r) => r.amount);
    expect(sorted.map((r) => r.amount)).toEqual([100, 200, 300]);
  });
});

describe("textMatches", () => {
  it("matches case-insensitive substrings", () => {
    expect(textMatches("Charlie", "har")).toBe(true);
    expect(textMatches("Charlie", "HAR")).toBe(true);
  });

  it("returns false when there is no match", () => {
    expect(textMatches("Charlie", "xyz")).toBe(false);
  });

  it("treats an empty or whitespace query as matching everything", () => {
    expect(textMatches("anything", "")).toBe(true);
    expect(textMatches("anything", "   ")).toBe(true);
  });

  it("handles nullish values without throwing", () => {
    expect(textMatches(null, "a")).toBe(false);
    expect(textMatches(undefined, "")).toBe(true);
  });

  it("matches against stringified numbers", () => {
    expect(textMatches(1200, "20")).toBe(true);
  });
});

describe("filterRows", () => {
  const accessors = [(r: Row) => r.name, (r: Row) => r.amount];

  it("keeps rows matching any accessor", () => {
    const result = filterRows(rows, "ali", accessors);
    expect(result.map((r) => r.name)).toEqual(["alice"]);
  });

  it("matches on a numeric accessor too", () => {
    const result = filterRows(rows, "200", accessors);
    expect(result.map((r) => r.name)).toEqual(["Bob"]);
  });

  it("returns all rows (as a copy) for an empty query", () => {
    const result = filterRows(rows, "  ", accessors);
    expect(result).toHaveLength(rows.length);
    expect(result).not.toBe(rows);
  });

  it("returns an empty array when nothing matches", () => {
    expect(filterRows(rows, "zzz", accessors)).toEqual([]);
  });
});

describe("getPageCount", () => {
  it("computes pages, rounding up", () => {
    expect(getPageCount(20, 8)).toBe(3);
    expect(getPageCount(16, 8)).toBe(2);
  });

  it("returns at least 1 page for zero rows", () => {
    expect(getPageCount(0, 8)).toBe(1);
  });

  it("returns 0 for a non-positive page size", () => {
    expect(getPageCount(20, 0)).toBe(0);
  });
});

describe("getPage", () => {
  const data = [1, 2, 3, 4, 5, 6, 7];

  it("returns the correct slice for a page index", () => {
    expect(getPage(data, 0, 3)).toEqual([1, 2, 3]);
    expect(getPage(data, 1, 3)).toEqual([4, 5, 6]);
    expect(getPage(data, 2, 3)).toEqual([7]);
  });

  it("returns an empty array past the last page", () => {
    expect(getPage(data, 5, 3)).toEqual([]);
  });

  it("clamps a negative page index to the first page", () => {
    expect(getPage(data, -1, 3)).toEqual([1, 2, 3]);
  });
});
