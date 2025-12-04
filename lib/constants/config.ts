/**
 * Application Configuration Constants
 *
 * Purpose:
 * - Centralized configuration for app behavior
 * - Defines timeouts, limits, and thresholds
 * - Easy to adjust without touching business logic
 *
 * Key Constants:
 * - Cache durations and thresholds
 * - API retry configuration
 * - Input validation limits
 * - Performance targets
 */

/**
 * Rate Cache Duration
 *
 * How long exchange rates are considered fresh (5 minutes)
 * After this duration, rates will be refreshed from the API
 */
export const RATE_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Stale Cache Threshold
 *
 * Maximum age for cached rates to be used as fallback (24 hours)
 * Beyond this, cached rates are considered too old to use
 */
export const STALE_CACHE_THRESHOLD = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Debounce Delay
 *
 * Delay for debouncing amount input changes (100ms)
 * Prevents excessive conversion calculations while typing
 */
export const DEBOUNCE_DELAY = 100; // milliseconds

/**
 * Retry Configuration
 *
 * Number of retry attempts for failed API calls
 */
export const RETRY_ATTEMPTS = 2;

/**
 * Retry Delays
 *
 * Exponential backoff delays for retries (200ms, 400ms)
 * [first retry, second retry]
 */
export const RETRY_DELAYS = [200, 400]; // milliseconds

/**
 * API Timeout
 *
 * Maximum time to wait for API response (5 seconds)
 */
export const API_TIMEOUT = 5000; // milliseconds

/**
 * Input Validation
 *
 * Maximum input length for amount field (15 digits before decimal)
 */
export const MAX_INPUT_LENGTH = 15;

/**
 * Decimal Precision
 *
 * Internal decimal precision for calculations (6 decimal places)
 * Display precision is determined by currency minor unit
 */
export const DECIMAL_PRECISION = 6;

/**
 * API Refresh Interval
 *
 * How often to auto-refresh rates when tab is active (5 minutes)
 */
export const API_REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Local Storage Keys
 *
 * Keys for storing data in localStorage
 */
export const STORAGE_KEYS = {
  RATE_CACHE: "currency_converter_rate_cache",
  USER_PREFERENCES: "currency_converter_preferences",
} as const;

/**
 * Performance Targets
 *
 * Performance metrics to achieve
 */
export const PERFORMANCE_TARGETS = {
  /**
   * Maximum time for input-to-result UI update (150ms)
   */
  INPUT_RESPONSE_TIME: 150,

  /**
   * Maximum time for conversion recompute (50ms)
   */
  CONVERSION_TIME: 50,

  /**
   * Target Time to First Byte on 4G (200ms)
   */
  TTFB: 200,

  /**
   * Maximum rate fetch time p95 on 4G (500ms)
   */
  RATE_FETCH_P95: 500,
} as const;

/**
 * Feature Flags
 *
 * Toggle features on/off for development or gradual rollout
 */
export const FEATURE_FLAGS = {
  /**
   * Enable conversion history tracking (future feature)
   */
  ENABLE_HISTORY: false,

  /**
   * Enable offline mode with IndexedDB (future feature)
   */
  ENABLE_OFFLINE_MODE: false,

  /**
   * Enable dark mode toggle (future feature)
   */
  ENABLE_DARK_MODE: false,
} as const;
