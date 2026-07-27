import type { Row } from "@tanstack/react-table";

/**
 * Pure, framework-free table logic for sorting, filtering and pagination.
 *
 * These functions are the tested core of the admin data tables. The
 * `DataTable` component delegates its global search to {@link globalTextFilter}
 * (which wraps {@link textMatches}), so the unit tests exercise the exact same
 * matching logic the UI uses.
 */

export type SortDirection = "asc" | "desc";
export type SortableValue = string | number | boolean | null | undefined;

/**
 * Comparator with sensible defaults:
 * - numbers compared numerically,
 * - strings compared case-insensitively with natural numeric ordering,
 * - nullish values sorted last.
 */
export function compareValues(a: SortableValue, b: SortableValue): number {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;

  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  }

  return String(a).localeCompare(String(b), undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

/** Returns a new array sorted by `accessor` in the given direction. */
export function sortRows<T>(
  rows: readonly T[],
  accessor: (row: T) => SortableValue,
  direction: SortDirection = "asc",
): T[] {
  const factor = direction === "desc" ? -1 : 1;
  return [...rows].sort(
    (a, b) => compareValues(accessor(a), accessor(b)) * factor,
  );
}

/** Case-insensitive substring match; an empty query matches everything. */
export function textMatches(value: unknown, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (q === "") return true;
  return String(value ?? "")
    .toLowerCase()
    .includes(q);
}

/**
 * Filters rows to those where at least one accessor's value matches `query`.
 * An empty/whitespace query returns all rows.
 */
export function filterRows<T>(
  rows: readonly T[],
  query: string,
  accessors: ReadonlyArray<(row: T) => SortableValue>,
): T[] {
  const q = query.trim();
  if (q === "") return [...rows];
  return rows.filter((row) =>
    accessors.some((accessor) => textMatches(accessor(row), q)),
  );
}

/** Total number of pages for a row count and page size (minimum 1). */
export function getPageCount(total: number, pageSize: number): number {
  if (pageSize <= 0) return 0;
  return Math.max(1, Math.ceil(total / pageSize));
}

/** Returns the slice of rows for a zero-based page index. */
export function getPage<T>(
  rows: readonly T[],
  pageIndex: number,
  pageSize: number,
): T[] {
  if (pageSize <= 0) return [];
  const start = Math.max(0, pageIndex) * pageSize;
  return rows.slice(start, start + pageSize);
}

/**
 * TanStack Table–compatible global filter function.
 * Used as the table's `globalFilterFn` so search behavior matches
 * {@link textMatches} exactly.
 */
export function globalTextFilter<T>(
  row: Row<T>,
  columnId: string,
  filterValue: string,
): boolean {
  return textMatches(row.getValue(columnId), filterValue);
}
