"use client";

import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";

/**
 * Status Banner Component
 *
 * Purpose:
 * - Displays persistent banners for cached rates, network errors, warnings
 * - Provides retry functionality for errors
 * - Dismissible for non-critical messages
 *
 * Variants:
 * - info: Informational messages (blue) - e.g., "Using cached rates"
 * - warning: Warning messages (yellow) - e.g., "Rates may be outdated"
 * - error: Error messages (red) - e.g., "Failed to fetch rates"
 *
 * Features:
 * - Color-coded by message type
 * - Optional retry button for errors
 * - Optional dismiss button
 * - Icon indicators
 *
 * Accessibility:
 * - role="alert" for errors
 * - role="status" for info/warning
 * - ARIA labels on buttons
 *
 * @example
 * ```tsx
 * <StatusBanner
 *   type="warning"
 *   message="Using cached exchange rates from 2 hours ago"
 *   onDismiss={() => setShowBanner(false)}
 * />
 *
 * <StatusBanner
 *   type="error"
 *   message="Failed to fetch exchange rates. Please try again."
 *   onRetry={handleRetry}
 * />
 * ```
 */

export interface StatusBannerProps {
  type: "info" | "warning" | "error";
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
}

export function StatusBanner({
  type,
  message,
  onRetry,
  onDismiss,
}: StatusBannerProps) {
  const isError = type === "error";
  const role = isError ? "alert" : "status";

  return (
    <div
      role={role}
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg border-2 mb-6",

        // Type-specific styles
        type === "info" && [
          "bg-primary-50 dark:bg-primary-900/20",
          "border-primary-300 dark:border-primary-700",
          "text-primary-900 dark:text-primary-50",
        ],

        type === "warning" && [
          "bg-warning-50 dark:bg-warning-900/20",
          "border-warning-300 dark:border-warning-700",
          "text-warning-900 dark:text-warning-50",
        ],

        type === "error" && [
          "bg-error-50 dark:bg-error-900/20",
          "border-error-300 dark:border-error-700",
          "text-error-900 dark:text-error-50",
        ]
      )}
    >
      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5">
        {type === "info" && (
          <svg
            className="w-5 h-5 text-primary-600 dark:text-primary-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}

        {type === "warning" && (
          <svg
            className="w-5 h-5 text-warning-600 dark:text-warning-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        )}

        {type === "error" && (
          <svg
            className="w-5 h-5 text-error-600 dark:text-error-400"
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
        )}
      </div>

      {/* Message */}
      <div className="flex-1 min-w-0">
        <p className="text-body-sm font-medium">{message}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {onRetry && (
          <Button
            variant="ghost"
            onClick={onRetry}
            ariaLabel="Retry"
            className="!py-1 !px-3 !min-h-0 !text-xs"
          >
            Retry
          </Button>
        )}

        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss notification"
            className="p-1 hover:bg-neutral-900/10 dark:hover:bg-neutral-50/10 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-current"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
