/**
 * Loading Component
 *
 * Purpose:
 * - Displays loading UI for Suspense boundaries
 * - Shown during initial page load or when navigating between routes
 * - Matches the layout of the main conversion page to prevent layout shift
 *
 * This component uses skeleton placeholders to indicate loading state
 * while maintaining the structure of the final rendered page.
 */

export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header skeleton */}
        <header className="text-center mb-8">
          <div className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded-lg w-3/4 mx-auto mb-3 animate-pulse" />
          <div className="h-5 bg-neutral-200 dark:bg-neutral-700 rounded-lg w-1/2 mx-auto animate-pulse" />
        </header>

        {/* Conversion interface skeleton */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6">
          <div className="space-y-6">
            {/* Amount input skeleton */}
            <div className="h-14 bg-neutral-100 dark:bg-neutral-700 rounded-lg animate-pulse" />

            {/* Currency selectors skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-14 bg-neutral-100 dark:bg-neutral-700 rounded-lg animate-pulse" />
              <div className="h-14 bg-neutral-100 dark:bg-neutral-700 rounded-lg animate-pulse" />
            </div>

            {/* Result panel skeleton */}
            <div className="h-32 bg-neutral-100 dark:bg-neutral-700 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </main>
  );
}
