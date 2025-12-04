import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Base Input Component
 *
 * Purpose:
 * - Reusable, accessible text input component
 * - Supports error states with visual feedback
 * - Includes focus ring for keyboard navigation (WCAG AA compliant)
 * - Minimum 44x44px touch target for mobile accessibility
 *
 * Features:
 * - Label support with proper ARIA association
 * - Error message display with aria-describedby
 * - Customizable via className prop
 * - Full keyboard accessibility
 *
 * @example
 * ```tsx
 * <Input
 *   label="Amount"
 *   value={amount}
 *   onChange={(e) => setAmount(e.target.value)}
 *   error="Please enter a valid number"
 *   placeholder="0.00"
 * />
 * ```
 */

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  ariaLabel?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ariaLabel, className, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${inputId}-error`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-body-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          aria-label={ariaLabel || label}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            // Base styles
            "w-full px-4 py-3 min-h-[44px]",
            "text-body font-medium",
            "bg-white dark:bg-neutral-800",
            "border-2 rounded-lg",
            "transition-colors duration-150",

            // Border colors
            error
              ? "border-error-500 dark:border-error-600"
              : "border-neutral-300 dark:border-neutral-600",

            // Focus states
            "focus:outline-none focus:ring-2 focus:ring-offset-2",
            error
              ? "focus:ring-error-500 dark:focus:ring-error-600"
              : "focus:ring-primary-500 dark:focus:ring-primary-600",

            // Hover states
            !error &&
              "hover:border-neutral-400 dark:hover:border-neutral-500",

            // Disabled states
            "disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-neutral-100 dark:disabled:bg-neutral-900",

            // Text color
            "text-neutral-900 dark:text-neutral-50",
            "placeholder:text-neutral-400 dark:placeholder:text-neutral-500",

            className
          )}
          {...props}
        />

        {error && (
          <p
            id={errorId}
            role="alert"
            className="mt-2 text-body-sm text-error-600 dark:text-error-400"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
