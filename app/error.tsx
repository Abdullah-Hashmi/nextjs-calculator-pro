"use client";

/**
 * Error Boundary Component
 *
 * Purpose:
 * - Catches and handles catastrophic route-level errors
 * - Displays user-friendly error message
 * - Provides retry mechanism via reset() function
 * - Logs errors for debugging (console in dev, monitoring service in prod)
 *
 * This error boundary wraps the entire route and catches errors
 * that bubble up from child components.
 *
 * @param error - The error object that was thrown
 * @param reset - Function to attempt recovery by re-rendering the segment
 */

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  // TODO: Log error to monitoring service (e.g., Sentry) in production
  console.error("Route error:", error);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-error-100 dark:bg-error-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-error-600 dark:text-error-400"
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
          </div>
          <h2 className="text-heading font-bold text-neutral-900 dark:text-neutral-50 mb-2">
            Something went wrong
          </h2>
          <p className="text-body text-neutral-600 dark:text-neutral-400">
            We encountered an unexpected error. Please try again.
          </p>
        </div>

        <button
          onClick={reset}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
