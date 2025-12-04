/**
 * Custom Error Classes
 *
 * Purpose:
 * - Define custom error types for different failure scenarios
 * - Include error codes and user-friendly messages
 * - Enable precise error handling and user feedback
 *
 * Error Types:
 * - RateFetchError: API fetch failures
 * - CacheError: Cache storage/retrieval failures
 * - ValidationError: Input validation failures
 */

/**
 * Base Application Error
 *
 * Base class for all custom errors in the application
 */
export class AppError extends Error {
  public readonly code: string;
  public readonly timestamp: number;

  constructor(message: string, code: string) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.timestamp = Date.now();

    // Maintains proper stack trace for where error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Rate Fetch Error
 *
 * Thrown when exchange rate API calls fail
 *
 * Error Codes:
 * - NETWORK_ERROR: Network connectivity issues
 * - API_ERROR: API returned an error response
 * - TIMEOUT: Request timed out
 * - INVALID_RESPONSE: Response schema validation failed
 * - RATE_LIMIT: API rate limit exceeded
 *
 * @example
 * ```ts
 * throw new RateFetchError("Failed to fetch rates", "NETWORK_ERROR");
 * ```
 */
export class RateFetchError extends AppError {
  constructor(
    message: string,
    code:
      | "NETWORK_ERROR"
      | "API_ERROR"
      | "TIMEOUT"
      | "INVALID_RESPONSE"
      | "RATE_LIMIT" = "API_ERROR"
  ) {
    super(message, code);
  }

  /**
   * Get user-friendly error message
   */
  getUserMessage(): string {
    switch (this.code) {
      case "NETWORK_ERROR":
        return "Unable to connect to the exchange rate service. Please check your internet connection.";
      case "TIMEOUT":
        return "The request took too long. Please try again.";
      case "RATE_LIMIT":
        return "Too many requests. Please wait a moment and try again.";
      case "INVALID_RESPONSE":
        return "Received invalid data from the exchange rate service.";
      default:
        return "Failed to fetch exchange rates. Please try again.";
    }
  }
}

/**
 * Cache Error
 *
 * Thrown when cache operations fail (localStorage quota, access denied, etc.)
 *
 * Error Codes:
 * - QUOTA_EXCEEDED: localStorage quota exceeded
 * - ACCESS_DENIED: localStorage access denied (privacy mode)
 * - PARSE_ERROR: Failed to parse cached data
 * - WRITE_ERROR: Failed to write to cache
 *
 * @example
 * ```ts
 * throw new CacheError("Storage quota exceeded", "QUOTA_EXCEEDED");
 * ```
 */
export class CacheError extends AppError {
  constructor(
    message: string,
    code:
      | "QUOTA_EXCEEDED"
      | "ACCESS_DENIED"
      | "PARSE_ERROR"
      | "WRITE_ERROR" = "WRITE_ERROR"
  ) {
    super(message, code);
  }

  /**
   * Get user-friendly error message
   */
  getUserMessage(): string {
    switch (this.code) {
      case "QUOTA_EXCEEDED":
        return "Browser storage is full. Clearing some data may help.";
      case "ACCESS_DENIED":
        return "Unable to access browser storage. This may be due to privacy settings.";
      case "PARSE_ERROR":
        return "Cached data is corrupted. It will be refreshed.";
      default:
        return "Unable to cache data locally.";
    }
  }
}

/**
 * Validation Error
 *
 * Thrown when user input validation fails
 *
 * Error Codes:
 * - INVALID_AMOUNT: Invalid numeric input
 * - NEGATIVE_AMOUNT: Negative numbers not allowed
 * - AMOUNT_TOO_LARGE: Amount exceeds maximum
 * - INVALID_CURRENCY: Invalid currency code
 *
 * @example
 * ```ts
 * throw new ValidationError("Amount cannot be negative", "NEGATIVE_AMOUNT");
 * ```
 */
export class ValidationError extends AppError {
  constructor(
    message: string,
    code:
      | "INVALID_AMOUNT"
      | "NEGATIVE_AMOUNT"
      | "AMOUNT_TOO_LARGE"
      | "INVALID_CURRENCY" = "INVALID_AMOUNT"
  ) {
    super(message, code);
  }

  /**
   * Get user-friendly error message
   */
  getUserMessage(): string {
    switch (this.code) {
      case "NEGATIVE_AMOUNT":
        return "Please enter a positive number.";
      case "AMOUNT_TOO_LARGE":
        return "The amount is too large. Please enter a smaller value.";
      case "INVALID_CURRENCY":
        return "Please select a valid currency.";
      default:
        return "Please enter a valid amount.";
    }
  }
}
