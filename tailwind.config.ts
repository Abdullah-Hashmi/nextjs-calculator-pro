import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neutral palette
        neutral: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        // Primary accent color (teal/blue)
        primary: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
          950: "#042f2e",
        },
        // Success state
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          500: "#22c55e",
          700: "#15803d",
        },
        // Error state
        error: {
          50: "#fef2f2",
          100: "#fee2e2",
          500: "#ef4444",
          700: "#b91c1c",
        },
        // Warning state
        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          500: "#f59e0b",
          700: "#b45309",
        },
      },
      spacing: {
        // Custom spacing scale: 4-8-12-16-24-32
        "4": "4px",
        "8": "8px",
        "12": "12px",
        "16": "16px",
        "24": "24px",
        "32": "32px",
        "48": "48px",
        "64": "64px",
      },
      fontSize: {
        // Fluid typography with clamp
        "display-lg": "clamp(28px, 3.5vw, 36px)",
        "display": "clamp(24px, 3vw, 32px)",
        "heading": "clamp(20px, 2.5vw, 24px)",
        "body-lg": "clamp(16px, 2.2vw, 18px)",
        "body": "clamp(14px, 2vw, 16px)",
        "body-sm": "clamp(12px, 1.8vw, 14px)",
        "caption": "clamp(11px, 1.5vw, 12px)",
      },
      borderRadius: {
        "sm": "4px",
        "md": "8px",
        "lg": "12px",
        "xl": "16px",
      },
      boxShadow: {
        "focus": "0 0 0 3px rgba(20, 184, 166, 0.3)",
        "focus-error": "0 0 0 3px rgba(239, 68, 68, 0.3)",
      },
      keyframes: {
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "swap": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(180deg)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 1s linear infinite",
        "swap": "swap 0.3s ease-in-out",
        "shimmer": "shimmer 2s infinite linear",
      },
    },
  },
  plugins: [],
};

export default config;
