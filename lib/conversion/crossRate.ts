import { CurrencyCode } from "@/lib/types";

/**
 * Cross-Rate Calculator
 *
 * Purpose:
 * - Calculates exchange rates when converting between non-base currencies
 * - Handles three cases: direct rate, inverse rate, cross rate
 *
 * Cross-Rate Formula:
 * - If FROM = BASE: rate = rates[TO]
 * - If TO = BASE: rate = 1 / rates[FROM]
 * - Otherwise: rate = rates[TO] / rates[FROM]
 *
 * Example:
 * - Base: USD
 * - Rates: { EUR: 0.93, GBP: 0.81 }
 * - EUR to GBP: 0.81 / 0.93 = 0.8709...
 *
 * @example
 * ```ts
 * const rates = { EUR: 0.93, GBP: 0.81, JPY: 141.25 };
 * const rate = calculateCrossRate("EUR", "GBP", rates, "USD");
 * // Returns: 0.8709... (GBP per EUR)
 * ```
 */

/**
 * Calculate Cross Rate
 *
 * Purpose:
 * - Computes the exchange rate between two currencies
 * - Uses base currency rates to derive cross rates
 *
 * @param fromCurrency - Source currency code
 * @param toCurrency - Target currency code
 * @param rates - Map of currency codes to rates (relative to base)
 * @param baseCurrency - The base currency for the rates
 * @returns Exchange rate from FROM to TO
 * @throws Error if rates are missing or invalid
 *
 * @example
 * ```ts
 * // Direct rate (FROM = BASE)
 * calculateCrossRate("USD", "EUR", { EUR: 0.93 }, "USD");
 * // Returns: 0.93
 *
 * // Inverse rate (TO = BASE)
 * calculateCrossRate("EUR", "USD", { EUR: 0.93 }, "USD");
 * // Returns: 1.0752... (1 / 0.93)
 *
 * // Cross rate (neither = BASE)
 * calculateCrossRate("EUR", "GBP", { EUR: 0.93, GBP: 0.81 }, "USD");
 * // Returns: 0.8709... (0.81 / 0.93)
 * ```
 */
export function calculateCrossRate(
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode,
  rates: Record<CurrencyCode, number>,
  baseCurrency: CurrencyCode
): number {
  // TODO: Handle case where FROM = TO (return 1)

  // TODO: Case 1 - Direct rate (FROM = BASE)
  // If fromCurrency === baseCurrency, return rates[toCurrency]

  // TODO: Case 2 - Inverse rate (TO = BASE)
  // If toCurrency === baseCurrency, return 1 / rates[fromCurrency]

  // TODO: Case 3 - Cross rate (neither = BASE)
  // Return rates[toCurrency] / rates[fromCurrency]

  // TODO: Validate rates exist and are valid numbers
  // Check rates[fromCurrency] and rates[toCurrency] exist
  // Check they are finite numbers > 0
  // Handle division by zero

  // Placeholder
  throw new Error("calculateCrossRate not implemented");
}

/**
 * Get Direct Rate
 *
 * Purpose:
 * - Gets the direct rate for a currency from the rates map
 * - Validates rate exists and is valid
 *
 * @param currency - The currency code
 * @param rates - Map of currency codes to rates
 * @returns The exchange rate
 * @throws Error if rate is missing or invalid
 */
function getRate(
  currency: CurrencyCode,
  rates: Record<CurrencyCode, number>
): number {
  // TODO: Check if rate exists in map
  // TODO: Validate rate is a finite number > 0
  // TODO: Throw error if invalid

  // Placeholder
  throw new Error("getRate not implemented");
}
