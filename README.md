# Next.js Currency Conversion Pro

A modern, high-performance currency conversion application built with Next.js 14+, TypeScript, and Tailwind CSS. Features real-time exchange rates, intelligent caching, and a responsive, accessible UI.

## Features

- ⚡ **Fast**: Sub-150ms interaction latency with debounced inputs
- 🔄 **Real-time Rates**: Live exchange rates with auto-refresh every 5 minutes
- 💾 **Smart Caching**: Two-tier cache (memory + localStorage) with 24-hour stale fallback
- 📱 **Responsive**: Optimized layouts for desktop, tablet, and mobile
- ♿ **Accessible**: WCAG 2.1 AA compliant with full keyboard navigation
- 🎨 **Modern UI**: Clean, intuitive interface with Tailwind CSS
- 🔒 **Type-Safe**: Strict TypeScript with comprehensive type definitions
- 🌐 **Offline-Ready**: Graceful degradation with cached rates

## Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) (strict mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Code Quality**: ESLint + Prettier

## Project Structure

```
nextjs-currency-pro/
├── app/                          # Next.js App Router
│   ├── api/rates/route.ts       # Server-side API proxy
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Main conversion page
│   ├── error.tsx                # Error boundary
│   ├── loading.tsx              # Loading state
│   └── globals.css              # Global styles
├── components/
│   ├── ui/                      # Base UI components
│   │   ├── Input.tsx
│   │   ├── Button.tsx
│   │   └── Select.tsx
│   └── conversion/              # Feature-specific components
│       ├── AmountInput.tsx
│       ├── CurrencySelect.tsx
│       ├── SwapButton.tsx
│       ├── ResultPanel.tsx
│       ├── PopularChips.tsx
│       ├── StatusBanner.tsx
│       └── ConversionContainer.tsx
├── lib/
│   ├── api/                     # API layer
│   │   ├── fetchRates.ts       # Rate fetching with retry
│   │   ├── rateCache.ts        # Cache management
│   │   └── index.ts            # Unified API
│   ├── conversion/              # Business logic
│   │   ├── calculate.ts        # Decimal-safe calculations
│   │   ├── crossRate.ts        # Cross-rate computation
│   │   ├── format.ts           # Currency formatting
│   │   ├── validate.ts         # Input validation
│   │   └── index.ts            # Conversion engine
│   ├── hooks/                   # Custom React hooks
│   │   ├── useDebounce.ts
│   │   ├── useRates.ts
│   │   ├── useConversion.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useCopyToClipboard.ts
│   │   └── useKeyboardNavigation.ts
│   ├── types/                   # TypeScript types
│   │   ├── index.ts
│   │   └── errors.ts
│   ├── constants/               # App constants
│   │   ├── currencies.ts
│   │   └── config.ts
│   └── utils/                   # Utility functions
│       ├── cn.ts                # Class name merger
│       └── date.ts              # Date formatting
├── public/                       # Static assets
├── .env.example                 # Environment variables template
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies

```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- An exchange rate API key (optional, some providers are free)

### Installation

1. **Clone the repository** (or navigate to the project directory):

```bash
cd nextjs-currency-pro
```

2. **Install dependencies**:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**:

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` and configure:

```env
# Exchange rate API endpoint
NEXT_PUBLIC_API_BASE_URL=https://api.exchangerate.host

# API Key (if required by provider)
API_KEY=your_api_key_here

# Use server-side proxy (recommended for securing API keys)
USE_API_PROXY=true
```

**Recommended Free API Providers**:
- [ExchangeRate-API.com](https://www.exchangerate-api.com/) (1,500 requests/month free)
- [ExchangeRate.host](https://exchangerate.host/) (Free, no key required)
- [Fixer.io](https://fixer.io/) (100 requests/month free)

4. **Run the development server**:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**:

Navigate to [http://localhost:3000](http://localhost:3000)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Code Style

This project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript strict mode** for type safety

Run formatting before committing:

```bash
npm run format
```

### Adding a New Currency

1. Open `lib/constants/currencies.ts`
2. Add currency to the `CURRENCIES` array:

```typescript
{
  code: "XXX",
  name: "Currency Name",
  symbol: "X",
  minorUnit: 2,
  flag: "🏳️"
}
```

3. Optionally add to `POPULAR_CURRENCIES` for quick access

## Implementation Roadmap

This project is currently scaffolded with comprehensive file structure and JSDoc comments. Follow these phases to implement functionality:

### Phase 1: Core Utilities (Start Here)
- [ ] Implement `lib/conversion/validate.ts`
- [ ] Implement `lib/conversion/calculate.ts`
- [ ] Implement `lib/conversion/format.ts`
- [ ] Implement `lib/conversion/crossRate.ts`
- [ ] Implement `lib/conversion/index.ts`

### Phase 2: API Layer
- [ ] Implement `lib/api/fetchRates.ts`
- [ ] Implement `lib/api/rateCache.ts`
- [ ] Implement `lib/api/index.ts`
- [ ] Implement `app/api/rates/route.ts`

### Phase 3: Custom Hooks
- [ ] Implement `lib/hooks/useDebounce.ts`
- [ ] Implement `lib/hooks/useRates.ts`
- [ ] Implement `lib/hooks/useConversion.ts`
- [ ] Implement `lib/hooks/useLocalStorage.ts`
- [ ] Implement `lib/hooks/useCopyToClipboard.ts`

### Phase 4: UI Components
- [ ] Finalize base UI components (Input, Button, Select)
- [ ] Complete conversion components
- [ ] Wire up components to hooks

### Phase 5: Main Page
- [ ] Integrate all components in `app/page.tsx`
- [ ] Implement responsive layouts
- [ ] Add error and loading states

### Phase 6: Polish
- [ ] Accessibility testing and improvements
- [ ] Performance optimization
- [ ] Cross-browser testing
- [ ] Mobile device testing

## Configuration

### Tailwind Theme

Custom theme colors, spacing, and typography are defined in `tailwind.config.ts`. Modify as needed:

```typescript
theme: {
  extend: {
    colors: {
      primary: { ... },
      neutral: { ... },
    },
    spacing: { ... },
    fontSize: { ... },
  }
}
```

### Cache Duration

Adjust cache settings in `lib/constants/config.ts`:

```typescript
export const RATE_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
export const STALE_CACHE_THRESHOLD = 24 * 60 * 60 * 1000; // 24 hours
```

## API Integration

### Using Server Proxy (Recommended)

Set `USE_API_PROXY=true` in `.env.local`. This keeps your API key secure on the server.

1. Configure API key in `.env.local`
2. Implement `/app/api/rates/route.ts`
3. Client calls `/api/rates?base=USD`

### Direct Client Calls

Set `USE_API_PROXY=false` for public APIs that don't require keys.

1. Configure API URL in `.env.local`
2. Client directly calls `NEXT_PUBLIC_API_BASE_URL`

## Performance Targets

- **Interaction Latency**: <150ms (input to result update)
- **Conversion Calculation**: <50ms
- **Lighthouse Performance**: ≥95 (desktop), ≥90 (mobile)
- **Lighthouse Accessibility**: ≥95
- **Bundle Size**: <150KB JS (gzipped)

## Accessibility

This project follows WCAG 2.1 AA guidelines:

- ✅ Full keyboard navigation
- ✅ Screen reader support with ARIA labels
- ✅ Minimum 4.5:1 color contrast
- ✅ Minimum 44x44px touch targets
- ✅ Focus-visible indicators
- ✅ Reduce motion support

Test with:
- **Keyboard**: Tab, Arrow keys, Enter, Escape
- **Screen readers**: VoiceOver (macOS), NVDA (Windows)
- **Tools**: Lighthouse, axe DevTools

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari 14+
- Modern mobile browsers

## Deployment

### Vercel (Recommended)

1. Push code to GitHub/GitLab
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Other Platforms

Build the production bundle:

```bash
npm run build
npm run start
```

Deploy the `.next` folder and `node_modules` to your hosting provider.

## Troubleshooting

### API Errors

- **Issue**: "Failed to fetch exchange rates"
- **Solution**: Check API key and base URL in `.env.local`

### Cache Not Working

- **Issue**: Rates fetched every time despite caching
- **Solution**: Check browser localStorage is enabled (not in privacy mode)

### Type Errors

- **Issue**: TypeScript errors during build
- **Solution**: Run `npm run type-check` and fix errors

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Exchange rate data from [ExchangeRate.host](https://exchangerate.host/)
- Currency codes based on [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html)
- Built with [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS](https://tailwindcss.com/)

---

**Ready to start building?** Begin with Phase 1 (Core Utilities) and follow the implementation roadmap. Each file has comprehensive JSDoc comments with TODOs to guide you.

For questions or issues, please open an issue on GitHub.
