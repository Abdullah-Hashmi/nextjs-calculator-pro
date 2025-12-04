"use client";

import { useState, useCallback } from "react";

/**
 * useCopyToClipboard Hook
 *
 * Purpose:
 * - Provides copy-to-clipboard functionality
 * - Uses modern Clipboard API with fallback
 * - Manages copied state with auto-reset
 *
 * Features:
 * - Modern navigator.clipboard API
 * - Fallback to document.execCommand for older browsers
 * - Automatic "copied" state reset after 2 seconds
 * - Error handling
 *
 * @returns Object with copy function, copied state, and error
 *
 * @example
 * ```tsx
 * function CopyButton() {
 *   const { copy, copied, error } = useCopyToClipboard();
 *
 *   return (
 *     <div>
 *       <button onClick={() => copy("Text to copy")}>
 *         {copied ? "Copied!" : "Copy"}
 *       </button>
 *       {error && <span>Failed to copy: {error}</span>}
 *     </div>
 *   );
 * }
 * ```
 */
export function useCopyToClipboard() {
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Copy text to clipboard
   */
  const copy = useCallback(async (text: string) => {
    try {
      // TODO: Try modern Clipboard API first
      // if (navigator.clipboard && navigator.clipboard.writeText) {
      //   await navigator.clipboard.writeText(text);
      //   setCopied(true);
      //   setError(null);
      // }

      // TODO: Fallback to execCommand for older browsers
      // else {
      //   const textarea = document.createElement("textarea");
      //   textarea.value = text;
      //   textarea.style.position = "fixed";
      //   textarea.style.opacity = "0";
      //   document.body.appendChild(textarea);
      //   textarea.select();
      //   const success = document.execCommand("copy");
      //   document.body.removeChild(textarea);
      //
      //   if (success) {
      //     setCopied(true);
      //     setError(null);
      //   } else {
      //     throw new Error("Copy command failed");
      //   }
      // }

      // TODO: Auto-reset copied state after 2 seconds
      // setTimeout(() => setCopied(false), 2000);

      // Placeholder
      setCopied(false);
      setError("useCopyToClipboard not implemented");
    } catch (err) {
      // TODO: Handle errors
      setCopied(false);
      setError(err instanceof Error ? err.message : "Failed to copy");
    }
  }, []);

  return {
    copy,
    copied,
    error,
  };
}
