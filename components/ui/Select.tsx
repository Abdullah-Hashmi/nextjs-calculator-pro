"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Base Select/Dropdown Component
 *
 * Purpose:
 * - Accessible, searchable dropdown/select component
 * - Supports keyboard navigation (Arrow keys, Enter, Escape)
 * - Custom rendering for options via renderOption prop
 * - Filterable options via search input
 *
 * Features:
 * - Full keyboard accessibility (WCAG AA compliant)
 * - Search/filter functionality when searchable=true
 * - Custom option rendering
 * - Focus management and escape key handling
 * - Click-outside-to-close behavior
 * - Minimum 44x44px touch targets
 *
 * Keyboard Navigation:
 * - Tab: Focus dropdown trigger
 * - Enter/Space: Open dropdown
 * - Arrow Up/Down: Navigate options
 * - Enter: Select highlighted option
 * - Escape: Close dropdown
 *
 * @example
 * ```tsx
 * <Select
 *   options={currencies}
 *   value={selectedCurrency}
 *   onChange={setSelectedCurrency}
 *   searchable
 *   renderOption={(currency) => (
 *     <span>{currency.code} - {currency.name}</span>
 *   )}
 *   ariaLabel="Select currency"
 * />
 * ```
 */

export interface SelectOption {
  value: string;
  label: string;
  [key: string]: unknown; // Allow additional properties
}

export interface SelectProps<T extends SelectOption> {
  options: T[];
  value: string;
  onChange: (value: string) => void;
  searchable?: boolean;
  renderOption?: (option: T) => React.ReactNode;
  placeholder?: string;
  ariaLabel?: string;
  disabled?: boolean;
  className?: string;
}

export function Select<T extends SelectOption>({
  options,
  value,
  onChange,
  searchable = false,
  renderOption,
  placeholder = "Select an option",
  ariaLabel,
  disabled = false,
  className,
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Find selected option
  const selectedOption = options.find((opt) => opt.value === value);

  // Filter options based on search query
  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  // TODO: Implement click-outside-to-close behavior
  // TODO: Implement keyboard navigation (Arrow keys, Enter, Escape)
  // TODO: Implement focus management when opening/closing

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={cn(
          "w-full px-4 py-3 min-h-[44px]",
          "flex items-center justify-between gap-2",
          "text-body font-medium text-left",
          "bg-white dark:bg-neutral-800",
          "border-2 border-neutral-300 dark:border-neutral-600",
          "rounded-lg",
          "transition-colors duration-150",
          "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
          "hover:border-neutral-400 dark:hover:border-neutral-500",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          isOpen && "border-primary-500 dark:border-primary-600"
        )}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={cn(
            "w-5 h-5 text-neutral-500 transition-transform",
            isOpen && "rotate-180"
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div
          role="listbox"
          aria-label={ariaLabel}
          className="absolute z-10 w-full mt-2 bg-white dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-600 rounded-lg shadow-lg max-h-60 overflow-auto"
        >
          {/* Search input */}
          {searchable && (
            <div className="p-2 border-b border-neutral-200 dark:border-neutral-700">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full px-3 py-2 text-body bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          )}

          {/* Options list */}
          <div className="py-1">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-body text-neutral-500">
                No options found
              </div>
            ) : (
              filteredOptions.map((option, index) => (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={option.value === value}
                  onClick={() => handleSelectOption(option.value)}
                  className={cn(
                    "w-full px-4 py-3 text-left text-body",
                    "hover:bg-neutral-100 dark:hover:bg-neutral-700",
                    "focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-700",
                    option.value === value &&
                      "bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300",
                    index === highlightedIndex &&
                      "bg-neutral-100 dark:bg-neutral-700"
                  )}
                >
                  {renderOption ? renderOption(option) : option.label}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
