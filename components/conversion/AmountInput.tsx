"use client";

import { Input } from "@/components/ui/Input";

/**
 * Amount Input Component
 *
 * Purpose:
 * - Specialized numeric input for currency amounts
 * - Real-time validation with inline error display
 * - Debounced onChange for performance (100ms)
 * - Locale-aware number formatting
 * - Max length enforcement (15 digits before decimal)
 *
 * Validation Rules:
 * - No negative numbers
 * - Only numeric characters (and decimal point/comma)
 * - Maximum 15 digits before decimal point
 * - Sanitizes thousands separators
 *
 * Accessibility:
 * - ARIA label: "Amount to convert"
 * - Error messages announced to screen readers
 * - Minimum 44x44px touch target
 *
 * @example
 * ```tsx
 * <AmountInput
 *   amount="100.50"
 *   onAmountChange={setAmount}
 *   error="Please enter a valid amount"
 *   disabled={loading}
 * />
 * ```
 */

export interface AmountInputProps {
  amount: string;
  onAmountChange: (amount: string) => void;
  error?: string;
  disabled?: boolean;
}

export function AmountInput({
  amount,
  onAmountChange,
  error,
  disabled = false,
}: AmountInputProps) {
  // TODO: Implement debounced onChange (100ms)
  // TODO: Implement real-time validation
  // TODO: Sanitize input (remove thousands separators, handle locale)
  // TODO: Prevent negative numbers
  // TODO: Enforce max length (15 digits)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Basic validation will be implemented here
    // For now, pass through to parent
    onAmountChange(value);
  };

  return (
    <Input
      type="text"
      inputMode="decimal"
      label="Amount"
      value={amount}
      onChange={handleChange}
      error={error}
      disabled={disabled}
      placeholder="0.00"
      ariaLabel="Amount to convert"
      autoComplete="off"
    />
  );
}
