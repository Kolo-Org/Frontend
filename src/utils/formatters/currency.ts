/**
 * Formats a numeric amount as a localized currency string.
 *
 * @param amount - The value to format.
 * @param currency - ISO 4217 currency code (defaults to USD).
 */
export const formatCurrency = (amount: number, currency = "USD"): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);

/** Formats a large number compactly, e.g. 12_500 -> "12.5K". */
export const formatCompactNumber = (value: number): string =>
  new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
