"use client";

import { useState, useEffect, useCallback } from "react";
import { CurrencyCode, ExchangeRate, RateSource } from "@/lib/types";
import { getRates, refreshRates } from "@/lib/api";
import { API_REFRESH_INTERVAL } from "@/lib/constants/config";

/**
 * useRates Hook
 *
 * Purpose:
 * - Manages exchange rate fetching and caching
 * - Handles auto-refresh on interval (5 minutes)
 * - Pauses refresh when tab is hidden
 * - Provides refetch function for manual refresh
 *
 * Features:
 * - Automatic data fetching on mount
 * - Auto-refresh every 5 minutes (when tab active)
 * - Pause/resume on visibility change
 * - Manual refetch with loading state
 * - Error handling with retry
 *
 * @param baseCurrency - The base currency for exchange rates
 * @returns Object with data, loading, error, source, and refetch function
 *
 * @example
 * ```tsx
 * function ConversionComponent() {
 *   const { data, loading, error, source, refetch } = useRates("USD");
 *
 *   if (loading) return <div>Loading rates...</div>;
 *   if (error) return <div>Error: {error} <button onClick={refetch}>Retry</button></div>;
 *   if (source === "stale") {
 *     // Show "Using cached rates" banner
 *   }
 *
 *   return <div>Rate for EUR: {data?.rates.EUR}</div>;
 * }
 * ```
 */
export function useRates(baseCurrency: CurrencyCode) {
  const [data, setData] = useState<ExchangeRate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<RateSource>("network");

  /**
   * Fetch rates from API/cache
   */
  const fetchRates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // TODO: Call getRates with baseCurrency
      // This handles cache fallback automatically

      // TODO: Update state with response
      // setData(response.data)
      // setSource(response.source)

      // Placeholder
      // const response = await getRates(baseCurrency);
      // setData(response.data);
      // setSource(response.source);
    } catch (err) {
      // TODO: Handle error
      // Extract user-friendly message
      // Set error state
      setError(
        err instanceof Error ? err.message : "Failed to fetch exchange rates"
      );
    } finally {
      setLoading(false);
    }
  }, [baseCurrency]);

  /**
   * Manual refetch function
   * Forces a fresh fetch from API, bypassing cache
   */
  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // TODO: Call refreshRates to force fresh fetch
      // const freshData = await refreshRates(baseCurrency);
      // setData(freshData);
      // setSource("network");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to refresh exchange rates"
      );
    } finally {
      setLoading(false);
    }
  }, [baseCurrency]);

  // Initial fetch on mount or baseCurrency change
  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  // Auto-refresh on interval (when tab is active)
  useEffect(() => {
    // TODO: Set up interval to refresh rates every API_REFRESH_INTERVAL (5 min)
    // Only refresh if document is visible

    // TODO: Set up visibility change listener
    // Pause interval when tab is hidden
    // Resume and immediately refresh when tab becomes visible

    // TODO: Clean up interval and listener on unmount

    // Placeholder - no auto-refresh yet
    return () => {
      // Cleanup will go here
    };
  }, [baseCurrency, fetchRates]);

  return {
    data,
    loading,
    error,
    source,
    refetch,
  };
}
