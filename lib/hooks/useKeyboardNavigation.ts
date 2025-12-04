"use client";

import { useEffect } from "react";

/**
 * useKeyboardNavigation Hook
 *
 * Purpose:
 * - Attaches keyboard event listeners for navigation
 * - Handles common keyboard shortcuts (Enter, Escape, Arrow keys)
 * - Cleans up listeners on unmount
 *
 * Use Cases:
 * - Modal/dropdown keyboard controls
 * - Form navigation
 * - Custom keyboard shortcuts
 *
 * @param handlers - Object with callback functions for each key
 *
 * @example
 * ```tsx
 * function DropdownComponent() {
 *   const [isOpen, setIsOpen] = useState(false);
 *   const [selectedIndex, setSelectedIndex] = useState(0);
 *
 *   useKeyboardNavigation({
 *     onEnter: () => {
 *       if (isOpen) selectOption(selectedIndex);
 *     },
 *     onEscape: () => {
 *       setIsOpen(false);
 *     },
 *     onArrowDown: () => {
 *       if (isOpen) setSelectedIndex((prev) => Math.min(prev + 1, options.length - 1));
 *     },
 *     onArrowUp: () => {
 *       if (isOpen) setSelectedIndex((prev) => Math.max(prev - 1, 0));
 *     },
 *   });
 *
 *   return <div>...</div>;
 * }
 * ```
 */

export interface KeyboardNavigationHandlers {
  onEnter?: () => void;
  onEscape?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onSpace?: () => void;
  onTab?: () => void;
}

export function useKeyboardNavigation(handlers: KeyboardNavigationHandlers) {
  useEffect(() => {
    // TODO: Create keyboard event handler
    // Check event.key and call appropriate handler

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Enter":
          handlers.onEnter?.();
          break;
        case "Escape":
          handlers.onEscape?.();
          break;
        case "ArrowUp":
          event.preventDefault(); // Prevent scrolling
          handlers.onArrowUp?.();
          break;
        case "ArrowDown":
          event.preventDefault(); // Prevent scrolling
          handlers.onArrowDown?.();
          break;
        case "ArrowLeft":
          handlers.onArrowLeft?.();
          break;
        case "ArrowRight":
          handlers.onArrowRight?.();
          break;
        case " ": // Space
          handlers.onSpace?.();
          break;
        case "Tab":
          handlers.onTab?.();
          break;
        default:
          break;
      }
    };

    // TODO: Attach event listener
    // window.addEventListener("keydown", handleKeyDown);

    // TODO: Clean up on unmount
    // return () => window.removeEventListener("keydown", handleKeyDown);

    // Placeholder - no implementation yet
    return () => {
      // Cleanup will go here
    };
  }, [handlers]);
}
