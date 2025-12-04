import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Class Name Utility (cn)
 *
 * Purpose:
 * - Combines clsx and tailwind-merge for optimal className handling
 * - Merges Tailwind classes intelligently (prevents conflicts)
 * - Handles conditional classes with clsx
 *
 * Why use this:
 * - clsx: Conditionally join classNames together
 * - tailwind-merge: Intelligently merges Tailwind classes, removing conflicts
 *
 * Example conflicts that twMerge handles:
 * - cn("px-4 px-6") → "px-6" (keeps last)
 * - cn("text-red-500 text-blue-500") → "text-blue-500"
 *
 * @param inputs - Class values (strings, objects, arrays)
 * @returns Merged className string
 *
 * @example
 * ```tsx
 * // Basic usage
 * cn("px-4 py-2", "bg-blue-500")
 * // Returns: "px-4 py-2 bg-blue-500"
 *
 * // Conditional classes
 * cn("px-4 py-2", {
 *   "bg-blue-500": isActive,
 *   "bg-gray-500": !isActive
 * })
 *
 * // Resolving conflicts
 * cn("px-4", someCondition && "px-6")
 * // Returns: "px-6" (if someCondition is true)
 *
 * // Component usage
 * <div className={cn(
 *   "base-class",
 *   variant === "primary" && "primary-styles",
 *   className // Allow prop override
 * )}>
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
