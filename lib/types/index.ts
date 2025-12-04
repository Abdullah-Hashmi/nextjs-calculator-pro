/**
 * Type Definitions
 *
 * Purpose:
 * - Centralized TypeScript type definitions for the entire application
 * - Defines interfaces for API responses, currency data, conversion results
 * - Provides type safety across components and utilities
 *
 * Key Exports:
 * - CurrencyCode: Union type or branded string for currency codes
 * - Currency: Currency metadata (code, name, symbol, minor units)
 * - ExchangeRate: API response shape for exchange rates
 * - CachedRates: Cached rate data with expiration
 * - ConversionResult: Result of a currency conversion
 * - ApiResponse/ApiError: API communication types
 */

/**
 * Currency Code Type
 *
 * Represents ISO 4217 currency codes (e.g., "USD", "EUR", "GBP")
 * For production, consider using a union of literal types for top currencies
 * or a branded type for additional type safety.
 */
export type CurrencyCode = string;

/**
 * Currency Metadata Interface
 *
 * Contains all information needed to display and format a currency
 *
 * @property code - ISO 4217 currency code (e.g., "USD")
 * @property name - Full currency name (e.g., "United States Dollar")
 * @property symbol - Currency symbol (e.g., "$", "€", "¥")
 * @property minorUnit - Number of decimal places (e.g., 2 for USD, 0 for JPY, 3 for BHD)
 * @property flag - Optional emoji flag or path to flag icon
 */
export interface Currency {
  code: CurrencyCode;
  name: string;
  symbol: string;
  minorUnit: number;
  flag?: string;
}

/**
 * Exchange Rate Response Interface
 *
 * Standard format for exchange rate data from API
 *
 * @property base - Base currency code (all rates are relative to this)
 * @property timestamp - Unix timestamp (milliseconds) when rates were fetched
 * @property rates - Map of currency codes to exchange rates
 *
 * @example
 * ```ts
 * {
 *   base: "USD",
 *   timestamp: 1700000000000,
 *   rates: {
 *     "EUR": 0.93,
 *     "GBP": 0.81,
 *     "JPY": 141.25
 *   }
 * }
 * ```
 */
export interface ExchangeRate {
  base: CurrencyCode;
  timestamp: number;
  rates: Record<CurrencyCode, number>;
}

/**
 * Cached Rates Interface
 *
 * Wraps exchange rate data with caching metadata
 *
 * @property data - The exchange rate data
 * @property cachedAt - Unix timestamp when data was cached
 * @property expiresAt - Unix timestamp when cache expires
 */
export interface CachedRates {
  data: ExchangeRate;
  cachedAt: number;
  expiresAt: number;
}

/**
 * Conversion Result Interface
 *
 * Result of a currency conversion calculation
 *
 * @property amount - Converted amount (numeric)
 * @property rate - Exchange rate used for conversion
 * @property timestamp - Unix timestamp of the rate data
 * @property formatted - Formatted string with currency symbol
 *
 * @example
 * ```ts
 * {
 *   amount: 93.50,
 *   rate: 0.935,
 *   timestamp: 1700000000000,
 *   formatted: "€93.50"
 * }
 * ```
 */
export interface ConversionResult {
  amount: number;
  rate: number;
  timestamp: number;
  formatted: string;
}

/**
 * Currency Pair Type
 *
 * Represents a pair of currencies for conversion
 */
export interface CurrencyPair {
  from: CurrencyCode;
  to: CurrencyCode;
}

/**
 * API Response Type
 *
 * Generic wrapper for successful API responses
 */
export interface ApiResponse<T> {
  data: T;
  source: "memory" | "cache" | "network" | "stale";
}

/**
 * API Error Type
 *
 * Standard error format for API failures
 */
export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

/**
 * Rate Source Type
 *
 * Indicates where exchange rate data came from
 */
export type RateSource = "memory" | "cache" | "network" | "stale";

/**
 * Validation Result Type
 *
 * Result of input validation
 */
export interface ValidationResult {
  valid: boolean;
  error?: string;
  value?: number;
}
