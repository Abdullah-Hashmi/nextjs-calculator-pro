"use client";

import { useState, useEffect } from "react";

/**
 * useDebounce Hook
 *
 * Purpose:
 * - Debounces a rapidly changing value
 * - Delays updating the debounced value until changes stop
 * - Prevents excessive API calls or expensive calculations
 *
 * Use Cases:
 * - Debouncing search input (wait for user to stop typing)
 * - Debouncing amount input (wait before recalculating conversion)
 * - Throttling resize/scroll events
 *
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default 500ms)
 * @returns Debounced value
 *
 * @example
 * ```tsx
 * function SearchComponent() {
 *   const [searchTerm, setSearchTerm] = useState("");
 *   const debouncedSearch = useDebounce(searchTerm, 300);
 *
 *   useEffect(() => {
 *     // This only runs 300ms after user stops typing
 *     if (debouncedSearch) {
 *       fetchSearchResults(debouncedSearch);
 *     }
 *   }, [debouncedSearch]);
 *
 *   return <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />;
 * }
 * ```
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // TODO: Set up a timer to update debounced value after delay
    // Use setTimeout to delay the update

    // TODO: Clean up timer on value change or unmount
    // Return cleanup function that calls clearTimeout

    // Placeholder - no debouncing yet
    setDebouncedValue(value);
  }, [value, delay]);

  return debouncedValue;
}
