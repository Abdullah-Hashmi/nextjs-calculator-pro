import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Base Button Component
 *
 * Purpose:
 * - Reusable, accessible button component with multiple variants
 * - Supports loading states with spinner
 * - Minimum 44x44px touch target for mobile accessibility
 * - WCAG AA compliant focus states and color contrast
 *
 * Variants:
 * - primary: Solid background, high emphasis (default)
 * - secondary: Outlined style, medium emphasis
 * - ghost: Minimal style, low emphasis
 *
 * Features:
 * - Loading state with spinner animation
 * - Disabled state with reduced opacity
 * - Keyboard accessible (Enter/Space)
 * - ARIA label support
 *
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleSubmit} loading={isSubmitting}>
 *   Convert
 * </Button>
 *
 * <Button variant="secondary" onClick={handleReset}>
 *   Reset
 * </Button>
 * ```
 */

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
  ariaLabel?: string;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  loading = false,
  ariaLabel,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      aria-label={ariaLabel}
      aria-busy={loading}
      disabled={isDisabled}
      className={cn(
        // Base styles
        "inline-flex items-center justify-center gap-2",
        "px-6 py-3 min-h-[44px]",
        "text-body font-medium",
        "rounded-lg",
        "transition-all duration-150",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",

        // Variant styles
        variant === "primary" && [
          "bg-primary-600 hover:bg-primary-700 active:bg-primary-800",
          "text-white",
          "shadow-sm hover:shadow-md",
          "focus:ring-primary-500",
        ],

        variant === "secondary" && [
          "bg-transparent hover:bg-neutral-100 active:bg-neutral-200",
          "dark:hover:bg-neutral-800 dark:active:bg-neutral-700",
          "border-2 border-neutral-300 dark:border-neutral-600",
          "text-neutral-700 dark:text-neutral-300",
          "focus:ring-neutral-500",
        ],

        variant === "ghost" && [
          "bg-transparent hover:bg-neutral-100 active:bg-neutral-200",
          "dark:hover:bg-neutral-800 dark:active:bg-neutral-700",
          "text-neutral-700 dark:text-neutral-300",
          "focus:ring-neutral-500",
        ],

        // Disabled state
        isDisabled && [
          "opacity-60 cursor-not-allowed",
          "hover:shadow-none",
          variant === "primary" && "hover:bg-primary-600",
          variant === "secondary" && "hover:bg-transparent",
          variant === "ghost" && "hover:bg-transparent",
        ],

        className
      )}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
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
      )}
      <span>{children}</span>
    </button>
  );
}
