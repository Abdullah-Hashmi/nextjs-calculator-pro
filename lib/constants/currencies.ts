import { Currency, CurrencyCode } from "@/lib/types";

/**
 * Currency Constants
 *
 * Purpose:
 * - Central repository for currency metadata
 * - Provides O(1) lookup for currency information
 * - Defines popular currencies for quick access
 *
 * Key Exports:
 * - CURRENCIES: Array of all supported currencies
 * - CURRENCY_MAP: Map for O(1) currency lookup by code
 * - POPULAR_CURRENCIES: Top 6 most-used currencies
 * - DEFAULT_BASE_CURRENCY: Default base currency (USD)
 */

/**
 * Supported Currencies
 *
 * Complete list of currencies supported by the application.
 * Each currency includes:
 * - code: ISO 4217 currency code
 * - name: Full currency name
 * - symbol: Currency symbol
 * - minorUnit: Number of decimal places
 * - flag: Emoji flag (optional)
 *
 * TODO: Add remaining currencies (currently showing top 30 for initial implementation)
 * TODO: Add flag emojis or SVG paths
 */
export const CURRENCIES: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$", minorUnit: 2, flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", minorUnit: 2, flag: "🇪🇺" },
  {
    code: "GBP",
    name: "British Pound",
    symbol: "£",
    minorUnit: 2,
    flag: "🇬🇧",
  },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", minorUnit: 0, flag: "🇯🇵" },
  {
    code: "CAD",
    name: "Canadian Dollar",
    symbol: "CA$",
    minorUnit: 2,
    flag: "🇨🇦",
  },
  {
    code: "AUD",
    name: "Australian Dollar",
    symbol: "A$",
    minorUnit: 2,
    flag: "🇦🇺",
  },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF", minorUnit: 2, flag: "🇨🇭" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", minorUnit: 2, flag: "🇨🇳" },
  {
    code: "INR",
    name: "Indian Rupee",
    symbol: "₹",
    minorUnit: 2,
    flag: "🇮🇳",
  },
  {
    code: "SGD",
    name: "Singapore Dollar",
    symbol: "S$",
    minorUnit: 2,
    flag: "🇸🇬",
  },
  {
    code: "NZD",
    name: "New Zealand Dollar",
    symbol: "NZ$",
    minorUnit: 2,
    flag: "🇳🇿",
  },
  {
    code: "HKD",
    name: "Hong Kong Dollar",
    symbol: "HK$",
    minorUnit: 2,
    flag: "🇭🇰",
  },
  {
    code: "SEK",
    name: "Swedish Krona",
    symbol: "kr",
    minorUnit: 2,
    flag: "🇸🇪",
  },
  {
    code: "NOK",
    name: "Norwegian Krone",
    symbol: "kr",
    minorUnit: 2,
    flag: "🇳🇴",
  },
  {
    code: "DKK",
    name: "Danish Krone",
    symbol: "kr",
    minorUnit: 2,
    flag: "🇩🇰",
  },
  {
    code: "KRW",
    name: "South Korean Won",
    symbol: "₩",
    minorUnit: 0,
    flag: "🇰🇷",
  },
  {
    code: "MXN",
    name: "Mexican Peso",
    symbol: "MX$",
    minorUnit: 2,
    flag: "🇲🇽",
  },
  {
    code: "BRL",
    name: "Brazilian Real",
    symbol: "R$",
    minorUnit: 2,
    flag: "🇧🇷",
  },
  {
    code: "ZAR",
    name: "South African Rand",
    symbol: "R",
    minorUnit: 2,
    flag: "🇿🇦",
  },
  {
    code: "RUB",
    name: "Russian Ruble",
    symbol: "₽",
    minorUnit: 2,
    flag: "🇷🇺",
  },
  {
    code: "TRY",
    name: "Turkish Lira",
    symbol: "₺",
    minorUnit: 2,
    flag: "🇹🇷",
  },
  {
    code: "THB",
    name: "Thai Baht",
    symbol: "฿",
    minorUnit: 2,
    flag: "🇹🇭",
  },
  {
    code: "IDR",
    name: "Indonesian Rupiah",
    symbol: "Rp",
    minorUnit: 2,
    flag: "🇮🇩",
  },
  {
    code: "MYR",
    name: "Malaysian Ringgit",
    symbol: "RM",
    minorUnit: 2,
    flag: "🇲🇾",
  },
  {
    code: "PHP",
    name: "Philippine Peso",
    symbol: "₱",
    minorUnit: 2,
    flag: "🇵🇭",
  },
  { code: "PLN", name: "Polish Zloty", symbol: "zł", minorUnit: 2, flag: "🇵🇱" },
  {
    code: "CZK",
    name: "Czech Koruna",
    symbol: "Kč",
    minorUnit: 2,
    flag: "🇨🇿",
  },
  {
    code: "ILS",
    name: "Israeli Shekel",
    symbol: "₪",
    minorUnit: 2,
    flag: "🇮🇱",
  },
  {
    code: "AED",
    name: "UAE Dirham",
    symbol: "د.إ",
    minorUnit: 2,
    flag: "🇦🇪",
  },
  {
    code: "SAR",
    name: "Saudi Riyal",
    symbol: "﷼",
    minorUnit: 2,
    flag: "🇸🇦",
  },
  // TODO: Add more currencies as needed
];

/**
 * Currency Map
 *
 * O(1) lookup map for currency information by code
 * Generated from CURRENCIES array
 *
 * @example
 * ```ts
 * const usd = CURRENCY_MAP["USD"];
 * console.log(usd.symbol); // "$"
 * ```
 */
export const CURRENCY_MAP: Record<CurrencyCode, Currency> = CURRENCIES.reduce(
  (map, currency) => {
    map[currency.code] = currency;
    return map;
  },
  {} as Record<CurrencyCode, Currency>
);

/**
 * Popular Currencies
 *
 * Top 6 most commonly used currencies for quick access chips
 * These appear as quick-select buttons in the UI
 */
export const POPULAR_CURRENCIES: CurrencyCode[] = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "CAD",
  "AUD",
];

/**
 * Default Base Currency
 *
 * Default currency for conversions (US Dollar)
 */
export const DEFAULT_BASE_CURRENCY: CurrencyCode = "USD";

/**
 * Default Target Currency
 *
 * Default target currency for conversions (Euro)
 */
export const DEFAULT_TARGET_CURRENCY: CurrencyCode = "EUR";
