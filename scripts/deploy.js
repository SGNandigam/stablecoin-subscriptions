const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Deploy Mock USDC
  const MockStablecoin = await hre.ethers.getContractFactory("MockStablecoin");
  const mockUSDC = await MockStablecoin.deploy("Mock USDC", "USDC", 6);
  await mockUSDC.waitForDeployment();
  const usdcAddress = await mockUSDC.getAddress();
  console.log("Mock USDC deployed to:", usdcAddress);

  // Deploy Mock USDT
  const mockUSDT = await MockStablecoin.deploy("Mock USDT", "USDT", 6);
  await mockUSDT.waitForDeployment();
  const usdtAddress = await mockUSDT.getAddress();
  console.log("Mock USDT deployed to:", usdtAddress);

  // Deploy SubscriptionManager
  const SubscriptionManager = await hre.ethers.getContractFactory("SubscriptionManager");
  const subscriptionManager = await SubscriptionManager.deploy(deployer.address);
  await subscriptionManager.waitForDeployment();
  const managerAddress = await subscriptionManager.getAddress();
  console.log("SubscriptionManager deployed to:", managerAddress);

  // Add supported stablecoins
  await subscriptionManager.addStablecoin(usdcAddress);
  console.log("Added USDC as supported stablecoin");
  await subscriptionManager.addStablecoin(usdtAddress);
  console.log("Added USDT as supported stablecoin");

  // Mint test tokens to deployer
  const mintAmount = hre.ethers.parseUnits("10000", 6);
  await mockUSDC.mint(deployer.address, mintAmount);
  await mockUSDT.mint(deployer.address, mintAmount);
  console.log("Minted 10,000 USDC and USDT to deployer");

  console.log("\n--- Deployment Summary ---");
  console.log("Mock USDC:           ", usdcAddress);
  console.log("Mock USDT:           ", usdtAddress);
  console.log("SubscriptionManager: ", managerAddress);
  console.log("Treasury:            ", deployer.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
