Stablecoin Subscription Payment System

📌 Project Overview

This project is a Solidity-based subscription payment system that enables users to subscribe to services using stablecoins (USDC, USDT) on the Polygon network. It integrates smart contracts, a .NET backend, and a React frontend to provide a seamless Web3 subscription experience.

🛠 Tech Stack

Solidity (Smart contract development)

Hardhat (Development & testing framework)

Polygon Mumbai Testnet (Deployment & testing)

Ethers.js / Web3.js (Blockchain interactions)

React (Vite/Next.js) (Frontend development)

.NET (C#) (Backend API)

🚀 Getting Started

1️⃣ Prerequisites

Ensure you have the following installed:

Node.js (LTS version recommended)

MetaMask (Browser extension)

Hardhat

Visual Studio Code (or any preferred IDE)

.NET SDK (for backend)

2️⃣ Setup Development Environment

Clone the Repository:

 git clone https://github.com/yourusername/stablecoin-subscriptions.git
 cd stablecoin-subscriptions

Install Dependencies:

 npm install  # For frontend & Hardhat setup

Configure MetaMask & Polygon Mumbai Testnet:

Open MetaMask

Go to Settings > Networks > Add Network

Add the following details:

Network Name: Polygon Mumbai

New RPC URL: https://rpc-mumbai.maticvigil.com/

Chain ID: 80001

Currency Symbol: MATIC

Block Explorer URL: https://mumbai.polygonscan.com/

Get test MATIC from the Mumbai faucet

3️⃣ Run the Project

Start Hardhat Node:

npx hardhat node

Deploy Smart Contract (Local Testnet):

npx hardhat run scripts/deploy.js --network localhost

Start React Frontend:

cd frontend
npm run dev

📅 Project Milestones

Week 1: Smart Contract Development & Testing

Week 2: Backend API & Payment Processing

Week 3: Frontend UI & Full Integration

🤝 Contributing

Fork the repository

Create a new feature branch

Commit your changes

Submit a pull request

📜 License

This project is licensed under the MIT License.
