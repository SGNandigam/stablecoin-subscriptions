# StablePay — Project Walkthrough

## Access Link

> **http://localhost:5173/**

The dev server is running. Open the link above in your browser.

---

## What Was Built

### 🔗 Smart Contracts

| File | Purpose |
|---|---|
| [SubscriptionManager.sol](file:///Users/saigopinandigam/stablecoin-subscription-v2/stablecoin-subscriptions/contracts/SubscriptionManager.sol) | Core contract: plan management, subscribe/renew/cancel, transaction tracking |
| [MockStablecoin.sol](file:///Users/saigopinandigam/stablecoin-subscription-v2/stablecoin-subscriptions/contracts/MockStablecoin.sol) | ERC-20 mock token (USDC/USDT) with faucet for testing |
| [hardhat.config.js](file:///Users/saigopinandigam/stablecoin-subscription-v2/stablecoin-subscriptions/hardhat.config.js) | Hardhat config for local + Polygon Mumbai |
| [deploy.js](file:///Users/saigopinandigam/stablecoin-subscription-v2/stablecoin-subscriptions/scripts/deploy.js) | Deployment script with auto-configuration |

### 🎨 Frontend (React + Vite)

````carousel
![Landing Page — Hero with gradient text, stats, and CTA buttons](/Users/saigopinandigam/.gemini/antigravity/brain/3e3a83ab-c77b-4d66-86a3-b6f25d978034/landing_page_top_1770847633337.png)
<!-- slide -->
![Features section — 6 feature cards with glassmorphism effect](/Users/saigopinandigam/.gemini/antigravity/brain/3e3a83ab-c77b-4d66-86a3-b6f25d978034/landing_page_features_1770847638846.png)
<!-- slide -->
![Plans page — Basic $10, Premium $20, Enterprise $50 subscription cards](/Users/saigopinandigam/.gemini/antigravity/brain/3e3a83ab-c77b-4d66-86a3-b6f25d978034/plans_page_1770847674681.png)
<!-- slide -->
![Dashboard — Subscription status, stats, and transaction history](/Users/saigopinandigam/.gemini/antigravity/brain/3e3a83ab-c77b-4d66-86a3-b6f25d978034/dashboard_page_connected_1770847723796.png)
<!-- slide -->
![Analytics — Revenue chart, plan distribution, AI insights](/Users/saigopinandigam/.gemini/antigravity/brain/3e3a83ab-c77b-4d66-86a3-b6f25d978034/analytics_page_connected_1770847756935.png)
````

**Pages built:**
- **Landing** — Hero section, 6 feature cards, 3-step "How It Works"
- **Plans** — 3 subscription tiers with subscribe buttons
- **Dashboard** — Subscription status, 4 stat cards, 8-row transaction table
- **Analytics** — Revenue bar chart, plan/coin donut charts, AI insight cards

**Design:**
- Dark theme with purple/blue/cyan gradient accents
- Glassmorphism card effects with backdrop blur
- Animated background orbs with floating animation
- Inter font from Google Fonts
- Fully responsive (desktop → mobile)
- Mock wallet connection flow (MetaMask / WalletConnect / Coinbase)
- Toast notifications for user feedback

### 🐍 Python Scripts Fixed
- Migrated all 3 scripts to OpenAI v1.x client API
- Added `python-dotenv` for secure API key loading
- Added `.env.example` template

## Demo Recording

![Full app walkthrough](/Users/saigopinandigam/.gemini/antigravity/brain/3e3a83ab-c77b-4d66-86a3-b6f25d978034/plans_dashboard_check_1770847667725.webp)
