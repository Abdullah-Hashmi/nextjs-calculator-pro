"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

/**
 * Result Panel Component
 *
 * Purpose:
 * - Displays the conversion result with formatting
 * - Shows exchange rate, timestamp, and helper text ("1 FROM = X TO")
 * - Includes copy-to-clipboard functionality
 * - Handles loading and error states
 *
 * Features:
 * - Large, readable result display
 * - Formatted currency with proper minor units
 * - Exchange rate display (e.g., "1 USD = 0.93 EUR")
 * - Timestamp of rate data
 * - Copy-to-clipboard button
 * - Skeleton loading state
 * - Error display
 *
 * Accessibility:
 * - ARIA live region for result updates
 * - Screen reader announcements when result changes
 * - Copy button with ARIA label
 *
 * @example
 * ```tsx
 * <ResultPanel
 *   result={{
 *     amount: 93.50,
 *     rate: 0.935,
 *     timestamp: 1700000000,
 *     formatted: "€93.50"
 *   }}
 *   fromCurrency="USD"
 *   toCurrency="EUR"
 *   onCopy={handleCopy}
 *   loading={false}
 *   error={null}
 * />
 * ```
 */

export interface ConversionResult {
  amount: number;
  rate: number;
  timestamp: number;
  formatted: string;
}

export interface ResultPanelProps {
  result: ConversionResult | null;
  fromCurrency?: string;
  toCurrency?: string;
  loading?: boolean;
  error?: string | null;
  onCopy?: () => void;
}

export function ResultPanel({
  result,
  fromCurrency,
  toCurrency,
  loading = false,
  error = null,
  onCopy,
}: ResultPanelProps) {
  // TODO: Format timestamp to readable date/time
  // TODO: Implement copy-to-clipboard logic

  if (loading) {
    return (
      <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-6 border-2 border-neutral-200 dark:border-neutral-700">
        <div className="space-y-4">
          <div className="h-12 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
          <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-2/3 animate-pulse" />
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2 animate-pulse" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-error-50 dark:bg-error-900/20 rounded-lg p-6 border-2 border-error-300 dark:border-error-700"
        role="alert"
      >
        <div className="flex items-start gap-3">
          <svg
            className="w-6 h-6 text-error-600 dark:text-error-400 flex-shrink-0 mt-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 className="font-medium text-error-900 dark:text-error-50 mb-1">
              Conversion Error
            </h3>
            <p className="text-body-sm text-error-700 dark:text-error-300">
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-6 border-2 border-dashed border-neutral-300 dark:border-neutral-600 text-center">
        <p className="text-neutral-500 dark:text-neutral-400">
          Enter an amount to see the conversion result
        </p>
      </div>
    );
  }

  return (
    <div
      className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-lg p-6 border-2 border-primary-200 dark:border-primary-700"
      role="region"
      aria-live="polite"
      aria-label="Conversion result"
    >
      {/* Main result */}
      <div className="mb-4">
        <div className="text-display font-bold text-neutral-900 dark:text-neutral-50 mb-2">
          {result.formatted}
        </div>

        {/* Exchange rate helper text */}
        {fromCurrency && toCurrency && (
          <div className="text-body text-neutral-600 dark:text-neutral-300">
            1 {fromCurrency} = {result.rate.toFixed(4)} {toCurrency}
          </div>
        )}
      </div>

      {/* Metadata */}
      <div className="flex items-center justify-between pt-4 border-t border-primary-200 dark:border-primary-700">
        <div className="text-body-sm text-neutral-500 dark:text-neutral-400">
          {/* TODO: Format timestamp */}
          Updated: {new Date(result.timestamp).toLocaleTimeString()}
        </div>

        {onCopy && (
          <Button
            variant="secondary"
            onClick={onCopy}
            ariaLabel="Copy result to clipboard"
            className="!py-2 !px-4 !min-h-0"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Copy
          </Button>
        )}
      </div>
    </div>
  );
}
