"use client";

import { cn } from "@/lib/utils/cn";

/**
 * Popular Currency Chips Component
 *
 * Purpose:
 * - Displays a row of popular currency chips for quick selection
 * - One-tap selection for common currencies
 * - Highlights currently selected currency
 * - Responsive: wraps on smaller screens
 *
 * Features:
 * - Configurable list of popular currencies
 * - Visual feedback for current selection
 * - Minimum 44x44px touch targets
 * - Keyboard accessible
 * - Wraps gracefully on mobile
 *
 * Accessibility:
 * - ARIA label: "Popular currencies"
 * - Each chip is keyboard accessible
 * - Current selection indicated with aria-pressed
 *
 * @example
 * ```tsx
 * <PopularChips
 *   popularCurrencies={["USD", "EUR", "GBP", "JPY", "CAD", "AUD"]}
 *   currentCurrency="USD"
 *   onSelect={handleCurrencySelect}
 * />
 * ```
 */

export interface PopularChipsProps {
  popularCurrencies: string[];
  currentCurrency?: string;
  onSelect: (currencyCode: string) => void;
  label?: string;
}

export function PopularChips({
  popularCurrencies,
  currentCurrency,
  onSelect,
  label = "Popular currencies",
}: PopularChipsProps) {
  return (
    <div className="w-full">
      <label className="block text-body-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
        {label}
      </label>

      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Popular currencies"
      >
        {popularCurrencies.map((currencyCode) => {
          const isSelected = currencyCode === currentCurrency;

          return (
            <button
              key={currencyCode}
              type="button"
              onClick={() => onSelect(currencyCode)}
              aria-pressed={isSelected}
              className={cn(
                // Base styles
                "px-4 py-2 min-h-[44px]",
                "text-body-sm font-medium",
                "rounded-lg",
                "border-2",
                "transition-all duration-150",
                "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",

                // Selected state
                isSelected
                  ? [
                      "bg-primary-600 hover:bg-primary-700",
                      "border-primary-600 hover:border-primary-700",
                      "text-white",
                      "shadow-md",
                    ]
                  : [
                      "bg-white dark:bg-neutral-800",
                      "border-neutral-300 dark:border-neutral-600",
                      "text-neutral-700 dark:text-neutral-300",
                      "hover:border-primary-400 dark:hover:border-primary-600",
                      "hover:bg-neutral-50 dark:hover:bg-neutral-700",
                    ]
              )}
            >
              {currencyCode}
            </button>
          );
        })}
      </div>
    </div>
  );
}
