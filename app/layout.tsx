import type { Metadata } from "next";
import "./globals.css";

/**
 * Root Layout Component
 *
 * Purpose:
 * - Defines the root HTML structure for the entire application
 * - Includes global metadata (title, description, OG tags)
 * - Loads global styles (Tailwind CSS)
 * - Sets up the base font and theme
 *
 * This layout wraps all pages in the application.
 */

export const metadata: Metadata = {
  title: "Currency Conversion Pro - Fast & Accurate Currency Converter",
  description:
    "Convert currencies with real-time exchange rates. Fast, accurate, and works offline. Built with Next.js for optimal performance.",
  keywords: [
    "currency converter",
    "exchange rates",
    "forex",
    "currency conversion",
  ],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Currency Conversion Pro",
    description:
      "Convert currencies with real-time exchange rates. Fast, accurate, and works offline.",
    type: "website",
    // TODO: Add OG image URL
    // images: [{ url: '/og-image.png' }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Currency Conversion Pro",
    description: "Fast & accurate currency converter with real-time rates",
    // TODO: Add Twitter image URL
    // images: ['/twitter-image.png'],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50">
        {children}
      </body>
    </html>
  );
}
