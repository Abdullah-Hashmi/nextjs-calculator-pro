# Next.js Currency Conversion Pro — Product Requirements Document

## 1. Product Overview
- **Description**: A web-first currency conversion experience built with Next.js App Router that delivers accurate, low-latency conversions, intuitive UX, and resilient offline-aware behavior. Supports desktop, tablet, and mobile with responsive layouts and strong accessibility defaults.
- **Target users**: Travelers, online shoppers, freelancers, finance teams, and developers needing quick, accurate currency conversions in-browser.
- **Problem statement**: Existing converters are either slow, cluttered, or unreliable under poor network conditions. Users need a trustworthy, fast, and clear conversion experience that works everywhere.
- **Value proposition**: Accurate rates with validation and caching, sub-150 ms interactions, clear UI with popular pairs, keyboard-first controls, and graceful fallbacks when APIs degrade.
- **Why it matters (UX + performance + reliability)**: High usability and speed reduce user frustration, increase trust for financial decisions, and ensure continuity when the primary rate source is unavailable.

## 2. Goals & Non-Goals
- **Primary goals**: Accurate currency conversion; <150 ms input-to-result UI updates; resilient API handling with caching/fallback; responsive, accessible UI; clear errors and states.
- **Secondary goals**: Conversion history (local only), inline tips, popular currency shortcuts, swap interaction, copy result.
- **Non-goals**: Account creation/auth; payments/remittances; storing PII; multi-leg FX hedging; advanced analytics; server-side trading or order execution.

## 3. Success Metrics
- **Accuracy**: Rates within 0.1 percent of source provider; rounding rules enforced to currency minor unit; validation on fetch.
- **Performance**: First input response <150 ms (client-side after initial load); conversion recompute <50 ms; page TTFB <200 ms on 4G.
- **API reliability**: 99.9 percent successful conversions with caching/fallback; auto-retry up to 2 times with exponential backoff (200 ms, 400 ms).
- **Lighthouse targets**: Desktop >= 95 (Performance, Accessibility, Best Practices, SEO); Mobile >= 90 for same categories.
- **Conversion latency**: Rate fetch under 500 ms p95 on 4G; cached conversions under 50 ms.

## 4. User Stories
- **Basic conversion**: As a user, I want to enter an amount and instantly see the converted value so I can make decisions quickly.
- **Switching currencies**: As a user, I want a swap control to flip From/To currencies so I can correct my selection fast.
- **Real-time updates**: As a user, I want results to update as I type so I do not have to click a button.
- **Popular currencies**: As a user, I want one-tap popular currency chips so I can select common pairs quickly.
- **Keyboard input**: As a user, I want full keyboard navigation (tab, arrows, enter, escape) so I can operate without a mouse.
- **Responsive use**: As a user, I want the layout to adapt to desktop, tablet, and mobile so it stays readable and usable.
- **Error states**: As a user, I want clear messages when rates are unavailable or my network is down so I know what to try next.
- **Accessibility**: As a screen-reader user, I want semantic labels and focus states so I can understand and operate the app.

## 5. Functional Requirements

### 5.1 Conversion Engine
- **Live rates fetch**: Retrieve latest rates via HTTPS from primary FX API; include base currency, timestamp, and rate map.
- **Rate caching**: Cache rates per base currency in memory (client state) and in localStorage with a timestamp. Use cached rates if fresher than 5 minutes or until next successful fetch.
- **Fallback behavior**: If primary API fails (network or non-2xx), retry twice; on failure use last valid cached rates (<=24 hours old) and show “Using cached rates” banner; if no cache, show blocking error with retry CTA.
- **Precision**: Support up to 6 decimal places internally; display according to target currency minor units (default 2 decimals) with bankers rounding. Prevent scientific notation in UI.
- **Validation**: Reject negative amounts; max input length 15 digits (before decimals); sanitize non-numeric input; handle thousands separators gracefully.

### 5.2 UI/UX Interface
- **Amount input**: Numeric input with locale-aware formatting; debounced 100 ms; supports keyboard and paste; shows inline error for invalid entries.
- **From-currency selector**: Searchable dropdown with currency code, name, and flag icon; highlights current selection; keyboard navigable.
- **To-currency selector**: Mirrors From selector; prevents identical From/To by auto-swapping or blocking selection with tooltip.
- **Swap button**: Single action to exchange From/To values; animates direction change; retains amount.
- **Popular currencies row**: Configurable list of top 6 codes; tapping selects for the currently focused selector context.
- **Conversion result panel**: Shows converted amount, rate used, timestamp, and “1 FROM = X TO” helper line; copy-to-clipboard control.
- **Loading indicators**: Inline spinner or shimmer on result panel during fetch; skeleton for initial load.
- **Error messages**: Inline, specific (e.g., “Rate service unavailable, retrying…”); persistent banner when using cached data; retry button.
- **Mobile-first layout**: Single-column stack; large tap targets (min 44x44 px); sticky action bar for swap and copy.

### 5.3 API Integration
- **Primary endpoint**: `GET /latest?base={code}` returning `base`, `timestamp` (epoch), `rates` object keyed by currency code.
- **Response schema**: `{ "base": "USD", "timestamp": 1700000000, "rates": { "EUR": 0.93, "JPY": 141.25 } }`.
- **Fluctuations**: If provider supports change deltas, ignore for v1; only consume spot rates.
- **Refresh interval**: Auto-refresh rates every 5 minutes when tab is active; pause on hidden tab; resume on focus with immediate refresh.
- **Validation rules**: Reject responses missing timestamp or rates; ensure timestamp within 24 hours; ensure rate values are finite numbers >0.

### 5.4 Accessibility Requirements
- **Keyboard navigation**: All controls focusable; dropdowns support arrow navigation and escape; swap button focus-visible.
- **Screen reader**: ARIA labels for inputs, selectors, swap, copy, and result; live region for result updates; descriptive error text.
- **Tap areas**: Minimum 44x44 px interactive targets.
- **Contrast**: Minimum WCAG AA (4.5:1) for text and icons on backgrounds; focus outline 3:1 contrast.

### 5.5 Responsive Design Requirements
- **Desktop (>=1024px)**: Two-column layout with selectors side-by-side; result panel aligned to the right; persistent popular row.
- **Tablet (768-1023px)**: Two columns collapsing to stacked result; popular row wraps; sticky bottom actions optional.
- **Mobile (<768px)**: Single column; sticky bottom swap/copy; condensed header; reduced padding but preserved touch targets.
- **Breakpoint rules**: Use CSS clamp for typography; fluid spacing that scales between breakpoints; hide non-critical metadata on small screens while keeping rate and timestamp visible.

## 6. Technical Requirements
- **Framework**: Next.js 13+ with App Router.
- **File/folder structure**:
  - `app/` for routes; `app/(routes)/page.tsx` for main UI.
  - `app/api/rates/route.ts` for server-side proxy (optional) to secure API key.
  - `components/` for UI pieces (AmountInput, CurrencySelect, SwapButton, ResultPanel, PopularChips, Banner).
  - `lib/api/` for fetch client; `lib/conversion/` for math and precision; `lib/hooks/` for shared hooks (useRates, useDebounce).
  - `styles/` for global Tailwind config or CSS Modules.
- **Component hierarchy**: Page -> Layout -> ConversionContainer -> AmountInput + CurrencySelect (from) + SwapButton + CurrencySelect (to) + PopularChips + ResultPanel + StatusBanner.
- **State management**: Local React state with derived values; no global store. useReducer or zustand only if complexity grows; keep pure functions for conversion.
- **API abstraction**: Single fetcher with typed response, error mapping, retry, and stale cache handling; optional serverless proxy to hide API keys.
- **Caching strategy**: Client memory cache + localStorage for rate snapshots keyed by base currency and timestamp; ISR/Next revalidation not required for client-only fetch but available for server proxy (revalidate 300s).
- **Error boundaries**: Route-level error.tsx for catastrophic failures; component-level graceful states with fallback UI.
- **Styling**: Tailwind CSS preferred for speed and consistency; justify: utility-first, responsive-ready, design tokens via theme config; avoid inline styles except dynamic width/position.
- **TypeScript conventions**: Strict mode on; explicit types for API responses and component props; no `any`; utility types for currency code union; ESLint with Next.js defaults.

## 7. Non-Functional Requirements
- **Security**: Use HTTPS only; never expose API keys client-side (proxy if needed); sanitize inputs; disallow script injection in pasted values.
- **Reliability**: Graceful degradation with cached rates and retries; idempotent fetches; monitor error banners.
- **Code quality**: ESLint + Prettier; type-safe APIs; unit tests for conversion logic and fetch handling; component tests for critical flows.
- **Maintainability**: Modular components; single source of truth for currency metadata; documented utilities; avoid premature abstractions.
- **Scalability**: Support up to 200 currencies; efficient renders via memoization; minimal bundle size (<150 KB JS after gzip target).
- **Browser compatibility**: Evergreen browsers, Safari 14+, Chrome/Edge/Firefox last 2 versions; graceful fallback for Intl APIs via polyfill if needed.
- **Animations**: Reduce-motion aware; micro animations <150 ms for swap and loading transitions; no blocking animations.
- **Interaction latency**: UI interactions (input, swap, select) respond within 150 ms on p95 mobile hardware.

## 8. Competitive Analysis
- **Google**: Fast and clean but limited controls; lacks caching and explicit reliability messaging; opportunity for richer states and keyboard support.
- **XE**: Comprehensive but cluttered ads and slower loads; opportunity for lightweight, focused experience with better performance.
- **Wise**: Trustworthy rates and mid-market focus but oriented to transfers; opportunity for simpler, non-transactional UI with offline-aware caching.
- **OFX**: Good data but dated UI; opportunity for modern, responsive layout with accessible controls and clear feedback.
- **Opportunities**: Superior latency, explicit reliability cues, offline-aware cached rates, strong keyboard/screen-reader support, and copy/share tools.

## 9. Design Requirements
- **Spacing scale**: 4px base; use 4-8-12-16-24-32 increments; section padding clamp(16px, 4vw, 32px).
- **Typography**: Display: clamp(24px, 3vw, 32px); Body: clamp(14px, 2vw, 16px); Mono for numbers optional. Use a modern, legible sans (e.g., Satoshi, or system fallback if unavailable).
- **Color system**: Neutral background (#0F172A or light equivalent), primary accent (e.g., teal or blue), success/alert states; ensure WCAG AA.
- **Visual hierarchy**: Emphasize amount input and result panel; secondary emphasis on selectors; tertiary on metadata and tips.
- **Interaction states**: Hover, focus-visible outlines, active press depth, disabled opacity 60 percent; reduce-motion friendly.
- **Buttons**: Primary (convert/swap) solid; secondary (copy, retry) outlined; loading shows spinner and disables interaction.
- **States**: Error banner with icon and retry; loading skeleton for result; disabled selectors when data pending; cached-state badge.
- **Compact vs expanded**: Compact mode collapses metadata and history; expanded shows full timestamp, rate, and banner; toggle via responsive breakpoints.

## 10. Future Enhancements Roadmap
- Currency trends mini-chart with sparkline.
- Multi-currency batch conversion (one-to-many).
- Offline mode with indexedDB cache and warning when stale.
- Saved favorite pairs and quick recall.
- Historical rate lookup with date picker.
- Dark/light theme switcher.
- AI-powered pair suggestions based on location or history.

## 11. Constraints & Risks
- **API rate limits**: Mitigate with caching, 5-minute refresh, and debounced fetches; consider server proxy to centralize calls.
- **Network dependency**: Provide cached fallback and explicit offline messaging; retry logic with backoff.
- **Decimal precision**: Use decimal-safe math (no floating errors); test across currencies with varying minor units.
- **Small screens**: Risk of layout overflow; enforce responsive clamps and ellipsis; ensure controls wrap.
- **Mitigations**: Contract tests for API schema; monitoring for fetch failures; feature flags for new endpoints; guardrails on input length.

## 12. Appendix
- **Glossary**: Base currency (currency used to quote rates); Quote currency (currency received); Minor unit (number of decimal places for a currency); Mid-market rate (average of buy/sell).
- **Sample API response**: `{"base":"USD","timestamp":1700000000,"rates":{"EUR":0.93,"GBP":0.81,"JPY":141.25}}`.
- **Conversion rules**: Converted amount = amount * rate; rate = rates[to] if base = from; if base differs, compute cross rate via base; round to target minor unit.
- **References**: WCAG 2.1 AA; Next.js App Router docs; ISO 4217 currency codes.
