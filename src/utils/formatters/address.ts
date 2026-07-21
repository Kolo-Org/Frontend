/**
 * Truncates a long address / hash for display, keeping the leading and
 * trailing characters, e.g. "GABC...WXYZ".
 *
 * @param address - The full address or transaction hash.
 * @param chars - Number of characters to keep on each side (default 4).
 */
export const formatAddress = (address: string, chars = 4): string => {
  if (address.length <= chars * 2 + 1) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};
