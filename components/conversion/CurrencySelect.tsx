"use client";

import { Select, SelectOption } from "@/components/ui/Select";

/**
 * Currency Select Component
 *
 * Purpose:
 * - Specialized dropdown for selecting currencies
 * - Displays currency code, name, and flag icon
 * - Searchable by code or name
 * - Prevents selecting the same currency as the opposite selector
 *
 * Features:
 * - Flag icon display (emoji or SVG)
 * - Keyboard navigable
 * - Auto-swap prevention via excludeCurrency prop
 * - ARIA label for screen readers
 *
 * @example
 * ```tsx
 * <CurrencySelect
 *   value="USD"
 *   onChange={setFromCurrency}
 *   currencies={CURRENCIES}
 *   excludeCurrency={toCurrency}
 *   label="From"
 * />
 * ```
 */

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag?: string; // Emoji flag or path to SVG
}

export interface CurrencySelectProps {
  value: string;
  onChange: (code: string) => void;
  currencies: Currency[];
  excludeCurrency?: string;
  label?: string;
  disabled?: boolean;
}

export function CurrencySelect({
  value,
  onChange,
  currencies,
  excludeCurrency,
  label = "Currency",
  disabled = false,
}: CurrencySelectProps) {
  // Filter out excluded currency
  const availableCurrencies = excludeCurrency
    ? currencies.filter((c) => c.code !== excludeCurrency)
    : currencies;

  // Convert to SelectOption format
  const options: SelectOption[] = availableCurrencies.map((currency) => ({
    value: currency.code,
    label: `${currency.code} - ${currency.name}`,
    currency, // Pass full currency object for custom rendering
  }));

  // TODO: Implement custom renderOption to show flag + code + name
  // TODO: Handle excludeCurrency auto-swap (if trying to select same as opposite)
  // TODO: Add tooltip when currency is excluded

  return (
    <div className="w-full">
      {label && (
        <label className="block text-body-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          {label}
        </label>
      )}

      <Select
        options={options}
        value={value}
        onChange={onChange}
        searchable
        disabled={disabled}
        ariaLabel={`Select ${label.toLowerCase()} currency`}
        placeholder="Select currency"
        renderOption={(option) => {
          const currency = (option as SelectOption & { currency: Currency })
            .currency;
          return (
            <div className="flex items-center gap-3">
              {/* Flag placeholder - will be implemented with actual flags */}
              <span className="text-xl">{currency.flag || "🏳️"}</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-neutral-900 dark:text-neutral-50">
                  {currency.code}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                  {currency.name}
                </div>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
