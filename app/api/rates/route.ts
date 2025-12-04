import { NextRequest, NextResponse } from "next/server";

/**
 * Exchange Rates API Proxy Route
 *
 * Purpose:
 * - Server-side proxy for exchange rate API calls
 * - Secures API keys by keeping them server-side only
 * - Adds caching headers for optimal performance (5-minute cache)
 * - Validates and forwards requests to the external exchange rate provider
 *
 * Endpoint: GET /api/rates?base={currencyCode}
 *
 * Query Parameters:
 * - base: The base currency code (e.g., USD, EUR, GBP)
 *
 * Response:
 * - Success: { base: string, timestamp: number, rates: Record<string, number> }
 * - Error: { error: string, message: string }
 *
 * Caching Strategy:
 * - Cache-Control: public, s-maxage=300 (5 minutes), stale-while-revalidate=60
 * - This allows CDN and browser caching while ensuring fresh data
 *
 * Example Usage:
 * ```
 * fetch('/api/rates?base=USD')
 *   .then(res => res.json())
 *   .then(data => console.log(data.rates));
 * ```
 */

export async function GET(request: NextRequest) {
  try {
    // Extract base currency from query parameters
    const searchParams = request.nextUrl.searchParams;
    const baseCurrency = searchParams.get("base") || "USD";

    // TODO: Validate base currency format (3-letter ISO code)

    // Get API configuration from environment variables
    const apiBaseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://api.exchangerate.host";
    const apiKey = process.env.API_KEY;

    // TODO: Construct API URL with base currency
    // TODO: Add API key to headers or query params (depending on provider)
    // TODO: Fetch exchange rates from external API
    // TODO: Validate response schema
    // TODO: Transform response to our standard format

    // Placeholder response
    return NextResponse.json(
      {
        error: "NOT_IMPLEMENTED",
        message: "API route implementation pending",
      },
      {
        status: 501,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );

    // TODO: Return successful response with caching headers:
    // return NextResponse.json(
    //   { base: baseCurrency, timestamp: Date.now(), rates: {...} },
    //   {
    //     headers: {
    //       'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
    //     },
    //   }
    // );
  } catch (error) {
    // TODO: Log error to monitoring service
    console.error("API route error:", error);

    return NextResponse.json(
      {
        error: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch exchange rates",
      },
      { status: 500 }
    );
  }
}
