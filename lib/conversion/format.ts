import { CurrencyCode } from "@/lib/types";
import { CURRENCY_MAP } from "@/lib/constants/currencies";

/**
 * Currency Formatting Utilities
 *
 * Purpose:
 * - Format numbers as currency strings with proper symbols and decimals
 * - Use Intl.NumberFormat for locale-aware formatting
 * - Prevent scientific notation in UI display
 *
 * Features:
 * - Currency-specific minor units (2 for USD, 0 for JPY, 3 for BHD)
 * - Locale-aware thousands separators and decimal points
 * - Scientific notation prevention
 * - Symbol display
 */

/**
 * Format Currency
 *
 * Purpose:
 * - Formats a numeric amount as a currency string
 * - Uses Intl.NumberFormat with currency-specific rules
 * - Displays currency symbol and proper decimal places
 *
 * @param amount - The numeric amount to format
 * @param currencyCode - ISO 4217 currency code
 * @param minorUnit - Optional override for decimal places
 * @returns Formatted currency string
 *
 * @example
 * ```ts
 * formatCurrency(1234.56, "USD");     // Returns "$1,234.56"
 * formatCurrency(1234.56, "EUR");     // Returns "€1,234.56"
 * formatCurrency(1234.56, "JPY");     // Returns "¥1,235"
 * formatCurrency(0.000001, "USD");    // Returns "$0.00" (not "1e-6")
 * ```
 */
export function formatCurrency(
  amount: number,
  currencyCode: CurrencyCode,
  minorUnit?: number
): string {
  // TODO: Get currency metadata from CURRENCY_MAP
  // Use minorUnit from currency or override parameter

  // TODO: Handle very small numbers (prevent scientific notation)
  // If amount is very small (e.g., 1e-7), format as 0.00

  // TODO: Use Intl.NumberFormat to format
  // Create formatter with:
  // - style: 'currency'
  // - currency: currencyCode
  // - minimumFractionDigits: minorUnit
  // - maximumFractionDigits: minorUnit

  // TODO: Fallback if Intl not available (unlikely in modern browsers)
  // Manually format with symbol + roundToMinorUnit

  // Placeholder - basic formatting
  const currency = CURRENCY_MAP[currencyCode];
  if (!currency) {
    return `${amount.toFixed(2)}`;
  }

  return `${currency.symbol}${amount.toFixed(currency.minorUnit)}`;
}

/**
 * Format Exchange Rate
 *
 * Purpose:
 * - Formats an exchange rate for display
 * - Shows more precision than currency amounts (typically 4-6 decimals)
 * - Prevents scientific notation
 *
 * @param rate - The exchange rate to format
 * @param decimals - Number of decimal places (default 4)
 * @returns Formatted rate string
 *
 * @example
 * ```ts
 * formatRate(0.935);           // Returns "0.9350"
 * formatRate(141.25678, 2);    // Returns "141.26"
 * formatRate(0.00001234, 6);   // Returns "0.000012"
 * ```
 */
export function formatRate(rate: number, decimals: number = 4): string {
  // TODO: Check for very small or large rates
  // Prevent scientific notation (e.g., 1e-7)

  // TODO: Use Intl.NumberFormat or toFixed
  // Format with specified decimals

  // Placeholder
  return rate.toFixed(decimals);
}

/**
 * Format Number
 *
 * Purpose:
 * - Formats a number with locale-aware thousands separators
 * - No currency symbol
 * - Useful for displaying amounts before conversion
 *
 * @param value - The number to format
 * @param decimals - Number of decimal places
 * @returns Formatted number string
 *
 * @example
 * ```ts
 * formatNumber(1234567.89, 2);  // Returns "1,234,567.89"
 * formatNumber(1000, 0);        // Returns "1,000"
 * ```
 */
export function formatNumber(value: number, decimals: number = 2): string {
  // TODO: Use Intl.NumberFormat with style: 'decimal'

  // Placeholder
  return value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Parse Currency Input
 *
 * Purpose:
 * - Parses user input string to number
 * - Handles locale-specific thousands separators and decimal points
 * - Sanitizes input for calculation
 *
 * @param input - The user input string
 * @returns Parsed number or NaN if invalid
 *
 * @example
 * ```ts
 * parseCurrencyInput("1,234.56");  // Returns 1234.56
 * parseCurrencyInput("1.234,56");  // Returns 1234.56 (European format)
 * parseCurrencyInput("$100");      // Returns 100
 * parseCurrencyInput("abc");       // Returns NaN
 * ```
 */
export function parseCurrencyInput(input: string): number {
  // TODO: Remove currency symbols and thousands separators
  // Handle both comma and period as decimal separator
  // Parse to float
  // Return NaN if invalid

  // Placeholder - basic parse
  const cleaned = input.replace(/[^0-9.-]/g, "");
  return parseFloat(cleaned);
}
