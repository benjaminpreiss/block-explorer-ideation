# Ethereum Block Explorer

A modern, responsive Ethereum blockchain explorer built with Next.js, TypeScript, and React Query. This application provides real-time insights into Ethereum network activity and detailed wallet analytics.

**Demo**

-   [Mobile: https://lvpr.tv?v=6c2bqux3l0j7isns](https://lvpr.tv?v=6c2bqux3l0j7isns)
-   [Desktop: https://lvpr.tv/?v=e532bqrnztevgvk5](https://lvpr.tv/?v=e532bqrnztevgvk5)

## 🚀 Features

### Network Analytics Dashboard

-   **Real-time Block Monitoring**: View the most recent finalized blocks with automatic updates every 12 seconds
-   **Transaction Volume Trends**: Interactive 30-day chart showing daily transaction counts using Dune Analytics data
-   **Live Block Details**: Expandable block information including transactions, gas usage, and timestamps
-   **Dynamic Time Tracking**: Real-time "time since" indicators for all blockchain events

### Wallet Analytics

-   **Address Search**: Instant validation and navigation to wallet details
-   **Balance Display**: Current ETH balance with precision formatting
-   **Transaction History**: Paginated transaction list with detailed information
-   **Transaction Analysis**: Direction indicators (sent/received) and fee calculations

### Technical Features

-   **Responsive Design**: Mobile-first approach with Tailwind CSS
-   **Real-time Updates**: Automatic data refreshing and sync indicators
-   **Error Handling**: Comprehensive error states and loading indicators
-   **Performance Optimized**: React Query caching and parallel API requests
-   **Type Safety**: Full TypeScript implementation with strict typing

## 🛠 Tech Stack

-   **Framework**: Next.js 15.3.2 with App Router
-   **Language**: TypeScript 5
-   **Styling**: Tailwind CSS 4
-   **State Management**: TanStack React Query v5
-   **Charts**: Recharts with D3.js integration
-   **Blockchain Integration**:
    -   Viem for Ethereum interactions
    -   Moralis Web3 API for transaction data
    -   DRPC for RPC calls
    -   Dune Analytics for network statistics
-   **Testing**: Vitest with React Testing Library
-   **Package Manager**: pnpm

## 🏗 Architecture

### API Routes

-   [`/api/get-latest-finalized-block`](src/app/api/get-latest-finalized-block/route.ts) - Latest block number
-   [`/api/get-block-by-number`](src/app/api/get-block-by-number/route.ts) - Block details with transactions
-   [`/api/get-balance-by-address`](src/app/api/get-balance-by-address/route.ts) - Wallet ETH balance
-   [`/api/get-txns-by-wallet`](src/app/api/get-txns-by-wallet/route.ts) - Paginated transaction history
-   [`/api/get-daily-transaction-counts-30-days`](src/app/api/get-daily-transaction-counts-30-days/route.ts) - Network analytics

### Key Components

-   [`Block`](src/components/Block.tsx) - Interactive block display with transaction details
-   [`AccountTxn`](src/components/AccountTxn.tsx) - Transaction list item with direction indicators
-   [`Search`](src/components/Search.tsx) - Modal search interface with address validation
-   [`Time`](src/components/Time.tsx) - Dynamic timestamp component
-   [`Card`](src/components/Card.tsx) - Reusable UI container with variants

### Utilities

-   [`eth.ts`](src/utils/eth.ts) - Blockchain interaction utilities and API clients
-   [`formatting.ts`](src/utils/formatting.ts) - Data formatting helpers

## 🚀 Getting Started

### Prerequisites

-   Node.js 18+
-   pnpm package manager

### Environment Variables

Create a `.env.local` file with the following variables:

```bash
DRPC_API_KEY=your_drpc_api_key
MORALIS_API_KEY=your_moralis_api_key
DUNE_API_KEY=your_dune_analytics_api_key
```

### Installation & Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run tests
pnpm test

# Lint code
pnpm lint
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📱 Usage

### Homepage

-   View real-time network statistics and recent blocks
-   Monitor daily transaction volume trends
-   Access the search functionality to explore specific addresses

### Wallet Pages

Navigate to `/wallet/[address]` to view:

-   Current ETH balance
-   Complete transaction history with pagination
-   Transaction details including fees, amounts, and timestamps

### Search

-   Click the search input or use the modal overlay
-   Enter any valid Ethereum address (0x...)
-   Automatic validation and navigation to wallet details

## 🧪 Testing

The project includes comprehensive testing setup:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests with coverage
pnpm test --coverage
```

Test files are located alongside source files with `.test.ts` extension.

## 🏗 Development

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API route handlers
│   ├── wallet/[address]/  # Dynamic wallet pages
│   └── page.tsx           # Homepage
├── components/            # Reusable React components
└── utils/                # Utility functions and helpers
```

### Code Quality

-   ESLint configuration for code consistency
-   TypeScript strict mode enabled
-   Comprehensive error handling
-   Performance optimizations with React Query

## 🤝 Contributing

This is a demonstration project. For questions or feedback, please contact the development team.

---

Built with ❤️ using modern web technologies for optimal performance and user experience.
