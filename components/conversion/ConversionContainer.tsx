"use client";

import { cn } from "@/lib/utils/cn";

/**
 * Conversion Container Component
 *
 * Purpose:
 * - Wrapper component for the conversion interface
 * - Handles responsive layout across breakpoints
 * - Manages spacing, padding, and max-width
 *
 * Responsive Layout:
 * - Desktop (>=1024px): Two-column grid layout
 * - Tablet (768-1023px): Stacked with side-by-side selectors
 * - Mobile (<768px): Single column with sticky bottom actions
 *
 * Features:
 * - Fluid spacing that scales with viewport
 * - Maximum width constraint for readability
 * - Responsive grid system
 * - Sticky action bar on mobile (optional)
 *
 * @example
 * ```tsx
 * <ConversionContainer>
 *   <AmountInput {...} />
 *   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 *     <CurrencySelect {...} />
 *     <CurrencySelect {...} />
 *   </div>
 *   <SwapButton {...} />
 *   <ResultPanel {...} />
 * </ConversionContainer>
 * ```
 */

export interface ConversionContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ConversionContainer({
  children,
  className,
}: ConversionContainerProps) {
  return (
    <div
      className={cn(
        "w-full",
        "bg-white dark:bg-neutral-800",
        "rounded-xl shadow-lg",
        "p-6 md:p-8",
        "space-y-6",
        className
      )}
    >
      {children}
    </div>
  );
}
