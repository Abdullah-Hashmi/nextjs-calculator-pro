/**
 * Date Formatting Utilities
 *
 * Purpose:
 * - Format timestamps for user-friendly display
 * - Handle relative time ("2 minutes ago")
 * - Locale-aware date/time formatting
 */

/**
 * Format Timestamp
 *
 * Purpose:
 * - Converts Unix timestamp to readable date/time string
 * - Uses Intl.DateTimeFormat for locale awareness
 *
 * @param timestamp - Unix timestamp in milliseconds
 * @param format - Format type ('short', 'long', 'time', 'date')
 * @returns Formatted date/time string
 *
 * @example
 * ```ts
 * formatTimestamp(1700000000000, "short");
 * // Returns: "11/14/23, 10:13 PM"
 *
 * formatTimestamp(1700000000000, "long");
 * // Returns: "November 14, 2023 at 10:13:20 PM"
 *
 * formatTimestamp(1700000000000, "time");
 * // Returns: "10:13 PM"
 * ```
 */
export function formatTimestamp(
  timestamp: number,
  format: "short" | "long" | "time" | "date" = "short"
): string {
  // TODO: Create Date object from timestamp
  // TODO: Use Intl.DateTimeFormat based on format type
  // TODO: Return formatted string

  // Placeholder
  return new Date(timestamp).toLocaleString();
}

/**
 * Get Relative Time
 *
 * Purpose:
 * - Returns human-readable relative time ("2 minutes ago", "just now")
 * - Useful for showing age of cached data
 *
 * @param timestamp - Unix timestamp in milliseconds
 * @returns Relative time string
 *
 * @example
 * ```ts
 * getRelativeTime(Date.now() - 30000);
 * // Returns: "30 seconds ago"
 *
 * getRelativeTime(Date.now() - 120000);
 * // Returns: "2 minutes ago"
 *
 * getRelativeTime(Date.now() - 7200000);
 * // Returns: "2 hours ago"
 * ```
 */
export function getRelativeTime(timestamp: number): string {
  // TODO: Calculate time difference from now
  // TODO: Return appropriate string based on difference
  // - < 60s: "just now"
  // - < 60min: "X minutes ago"
  // - < 24h: "X hours ago"
  // - < 7d: "X days ago"
  // - else: format as date

  // Placeholder
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
}

/**
 * Is Stale
 *
 * Purpose:
 * - Checks if a timestamp is older than a threshold
 * - Useful for cache validation
 *
 * @param timestamp - Unix timestamp in milliseconds
 * @param thresholdMs - Age threshold in milliseconds
 * @returns true if timestamp is older than threshold
 *
 * @example
 * ```ts
 * const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
 * isStale(fiveMinutesAgo, 10 * 60 * 1000); // false (not older than 10 min)
 * isStale(fiveMinutesAgo, 2 * 60 * 1000);  // true (older than 2 min)
 * ```
 */
export function isStale(timestamp: number, thresholdMs: number): boolean {
  return Date.now() - timestamp > thresholdMs;
}
