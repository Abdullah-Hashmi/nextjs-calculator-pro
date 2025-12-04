"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * useLocalStorage Hook
 *
 * Purpose:
 * - Syncs React state with localStorage
 * - Persists state across page reloads
 * - Handles JSON serialization/deserialization
 * - Gracefully handles localStorage errors (quota, privacy mode)
 *
 * Features:
 * - Type-safe with generics
 * - Automatic JSON parsing/stringifying
 * - SSR-safe (checks for window)
 * - Error handling for quota exceeded
 * - Fallback to in-memory state if localStorage unavailable
 *
 * @param key - The localStorage key
 * @param initialValue - Default value if key doesn't exist
 * @returns [value, setValue] tuple like useState
 *
 * @example
 * ```tsx
 * function PreferencesComponent() {
 *   const [theme, setTheme] = useLocalStorage("theme", "light");
 *   const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);
 *
 *   return (
 *     <div>
 *       <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
 *         Toggle theme (current: {theme})
 *       </button>
 *       <button onClick={() => setFavorites([...favorites, "USD"])}>
 *         Add USD to favorites
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    // TODO: Check if running in browser (SSR safety)
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      // TODO: Get from local storage by key
      // const item = window.localStorage.getItem(key);

      // TODO: Parse stored JSON or return initialValue
      // return item ? JSON.parse(item) : initialValue;

      // Placeholder
      return initialValue;
    } catch (error) {
      // TODO: Handle parse errors or localStorage access denied
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // TODO: Allow value to be a function so we have same API as useState
        // const valueToStore = value instanceof Function ? value(storedValue) : value;

        // TODO: Save state
        // setStoredValue(valueToStore);

        // TODO: Save to local storage
        // if (typeof window !== "undefined") {
        //   window.localStorage.setItem(key, JSON.stringify(valueToStore));
        // }

        // Placeholder
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
      } catch (error) {
        // TODO: Handle localStorage quota exceeded
        // Log error but don't throw (graceful degradation)
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}
