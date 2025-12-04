"use client";

import { cn } from "@/lib/utils/cn";

/**
 * Swap Button Component
 *
 * Purpose:
 * - Single-action button to exchange From/To currencies
 * - Animates 180° rotation on click
 * - Retains amount value during swap
 * - Fully keyboard accessible
 *
 * Features:
 * - Bidirectional arrow icon (↕)
 * - 180° rotation animation on click
 * - Respects prefers-reduced-motion
 * - Minimum 44x44px touch target
 * - Loading and disabled states
 *
 * Accessibility:
 * - ARIA label: "Swap currencies"
 * - Keyboard accessible (Enter/Space)
 * - Focus-visible outline
 *
 * @example
 * ```tsx
 * <SwapButton
 *   onSwap={handleSwap}
 *   disabled={loading}
 * />
 * ```
 */

export interface SwapButtonProps {
  onSwap: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function SwapButton({
  onSwap,
  disabled = false,
  loading = false,
}: SwapButtonProps) {
  // TODO: Implement rotation animation state
  // TODO: Reset animation after completion

  return (
    <button
      type="button"
      onClick={onSwap}
      disabled={disabled || loading}
      aria-label="Swap currencies"
      className={cn(
        // Base styles
        "inline-flex items-center justify-center",
        "w-12 h-12 min-h-[44px] min-w-[44px]",
        "bg-primary-600 hover:bg-primary-700 active:bg-primary-800",
        "text-white",
        "rounded-full",
        "shadow-md hover:shadow-lg",
        "transition-all duration-150",

        // Focus state
        "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",

        // Disabled state
        disabled && "opacity-60 cursor-not-allowed hover:bg-primary-600",

        // Animation - will be enhanced with rotation logic
        "motion-safe:transition-transform motion-safe:duration-300"
      )}
    >
      {loading ? (
        <svg
          className="animate-spin h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
          />
        </svg>
      )}
    </button>
  );
}
