const toDate = (value: Date | string | number): Date =>
  value instanceof Date ? value : new Date(value);

/** Formats a date as e.g. "Jul 20, 2026". */
export const formatDate = (date: Date | string | number): string =>
  toDate(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

/** Formats a date and time as e.g. "Jul 20, 2026, 2:30 PM". */
export const formatDateTime = (date: Date | string | number): string =>
  toDate(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
