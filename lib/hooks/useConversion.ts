"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { CurrencyCode, ConversionResult } from "@/lib/types";
import {
  DEFAULT_BASE_CURRENCY,
  DEFAULT_TARGET_CURRENCY,
} from "@/lib/constants/currencies";
import { useRates } from "./useRates";
import { useDebounce } from "./useDebounce";
import { performConversion } from "@/lib/conversion";
import { DEBOUNCE_DELAY } from "@/lib/constants/config";

/**
 * useConversion Hook
 *
 * Purpose:
 * - Manages all state for currency conversion
 * - Handles amount input, currency selection, and result calculation
 * - Provides swap function to exchange currencies
 * - Debounces amount changes for performance
 *
 * Features:
 * - Integrated rate fetching via useRates
 * - Debounced conversion calculation (100ms)
 * - Automatic result update when inputs change
 * - Swap currencies function
 * - Prevents identical from/to currencies
 *
 * @returns Object with all conversion state and handlers
 *
 * @example
 * ```tsx
 * function ConversionPage() {
 *   const {
 *     amount,
 *     setAmount,
 *     fromCurrency,
 *     setFromCurrency,
 *     toCurrency,
 *     setToCurrency,
 *     result,
 *     error,
 *     loading,
 *     rateSource,
 *     swap,
 *     refetchRates
 *   } = useConversion();
 *
 *   return (
 *     <div>
 *       <input value={amount} onChange={(e) => setAmount(e.target.value)} />
 *       <CurrencySelect value={fromCurrency} onChange={setFromCurrency} />
 *       <button onClick={swap}>Swap</button>
 *       <CurrencySelect value={toCurrency} onChange={setToCurrency} />
 *       {result && <div>{result.formatted}</div>}
 *     </div>
 *   );
 * }
 * ```
 */
export function useConversion() {
  // Input state
  const [amount, setAmount] = useState<string>("");
  const [fromCurrency, setFromCurrency] =
    useState<CurrencyCode>(DEFAULT_BASE_CURRENCY);
  const [toCurrency, setToCurrency] = useState<CurrencyCode>(
    DEFAULT_TARGET_CURRENCY
  );

  // Result state
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [conversionError, setConversionError] = useState<string | null>(null);

  // Fetch rates for the base currency
  const {
    data: ratesData,
    loading: ratesLoading,
    error: ratesError,
    source: rateSource,
    refetch: refetchRates,
  } = useRates(fromCurrency);

  // Debounce amount input to avoid excessive calculations
  const debouncedAmount = useDebounce(amount, DEBOUNCE_DELAY);

  /**
   * Swap currencies
   * Exchanges from and to currencies while retaining amount
   */
  const swap = useCallback(() => {
    // TODO: Swap fromCurrency and toCurrency
    // Use a temporary variable to swap values
    // This should also trigger a re-fetch of rates for the new base currency

    // Placeholder
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }, [fromCurrency, toCurrency]);

  /**
   * Prevent setting identical from/to currencies
   */
  const handleFromCurrencyChange = useCallback(
    (newCurrency: CurrencyCode) => {
      // TODO: If new currency === toCurrency, swap instead
      // This prevents identical currencies

      // Placeholder
      if (newCurrency === toCurrency) {
        swap();
      } else {
        setFromCurrency(newCurrency);
      }
    },
    [toCurrency, swap]
  );

  const handleToCurrencyChange = useCallback(
    (newCurrency: CurrencyCode) => {
      // TODO: If new currency === fromCurrency, swap instead

      // Placeholder
      if (newCurrency === fromCurrency) {
        swap();
      } else {
        setToCurrency(newCurrency);
      }
    },
    [fromCurrency, swap]
  );

  /**
   * Calculate conversion result
   * Runs whenever amount, currencies, or rates change (debounced)
   */
  useEffect(() => {
    // TODO: Check if we have all required data
    // - debouncedAmount is not empty
    // - ratesData is available
    // - fromCurrency and toCurrency are set

    // TODO: Parse amount to number
    // If invalid, set conversionError and clear result

    // TODO: Perform conversion
    // Use performConversion from lib/conversion
    // Update result state
    // Clear conversionError on success

    // TODO: Handle conversion errors
    // Set conversionError if conversion fails
    // Clear result on error

    // Placeholder - clear result if no amount
    if (!debouncedAmount || !ratesData) {
      setResult(null);
      setConversionError(null);
      return;
    }

    try {
      // TODO: Implement actual conversion
      // const parsedAmount = parseFloat(debouncedAmount);
      // const conversionResult = performConversion(
      //   parsedAmount,
      //   fromCurrency,
      //   toCurrency,
      //   ratesData
      // );
      // setResult(conversionResult);
      // setConversionError(null);
    } catch (error) {
      // TODO: Handle error
      // setConversionError(error.message);
      // setResult(null);
    }
  }, [debouncedAmount, fromCurrency, toCurrency, ratesData]);

  // Combine loading states
  const loading = ratesLoading && !ratesData;

  // Combine errors
  const error = ratesError || conversionError;

  return {
    // Input state
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency: handleFromCurrencyChange,
    toCurrency,
    setToCurrency: handleToCurrencyChange,

    // Result state
    result,
    error,
    loading,
    rateSource,

    // Actions
    swap,
    refetchRates,
  };
}
