import { ethers, network, run } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  console.log(`Deploying AXG2026 NFT contract to ${network.name}...`);

  // Get contract factory
  const AXG2026 = await ethers.getContractFactory("AXG2026");
  
  // Configuration from environment variables
  const contractName = process.env.CONTRACT_NAME || "AXG2026";
  const contractSymbol = process.env.CONTRACT_SYMBOL || "AXG";
  const baseTokenURI = process.env.BASE_TOKEN_URI || "https://axg2026.com/metadata/";
  const ownerAddress = process.env.OWNER_ADDRESS || (await ethers.getSigners())[0].address;
  
  console.log("Configuration:");
  console.log(`- Name: ${contractName}`);
  console.log(`- Symbol: ${contractSymbol}`);
  console.log(`- Base URI: ${baseTokenURI}`);
  console.log(`- Owner: ${ownerAddress}`);
  
  // Deploy contract
  const axg2026 = await AXG2026.deploy(
    contractName,
    contractSymbol,
    baseTokenURI,
    ownerAddress
  );
  
  await axg2026.waitForDeployment();
  const contractAddress = await axg2026.getAddress();
  
  console.log(`✅ Contract deployed to: ${contractAddress}`);
  console.log(`   Transaction hash: ${axg2026.deploymentTransaction()?.hash}`);
  
  // Wait for a few blocks to be mined
  console.log("Waiting for block confirmations...");
  await axg2026.deploymentTransaction()?.wait(5);
  
  // Verify contract on Etherscan/Polygonscan
  if (network.name !== "hardhat" && network.name !== "localhost") {
    console.log(`Verifying contract on ${network.name}...`);
    try {
      await run("verify:verify", {
        address: contractAddress,
        constructorArguments: [
          contractName,
          contractSymbol,
          baseTokenURI,
          ownerAddress
        ],
      });
      console.log("✅ Contract verified successfully!");
    } catch (error) {
      console.log("⚠️ Contract verification failed:", error);
    }
  }
  
  // Log contract information
  console.log("\n📋 Contract Information:");
  console.log(`- Name: ${contractName} (${contractSymbol})`);
  console.log(`- Address: ${contractAddress}`);
  console.log(`- Network: ${network.name} (chainId: ${network.config.chainId})`);
  console.log(`- Owner: ${ownerAddress}`);
  console.log(`- Base URI: ${baseTokenURI}`);
  console.log(`- Mint Price: ${await axg2026.mintPrice()} wei`);
  console.log(`- Minting Open: ${await axg2026.mintingOpen()}`);
  
  // Save deployment info to file
  const deploymentInfo = {
    network: network.name,
    chainId: network.config.chainId,
    contractAddress,
    contractName,
    contractSymbol,
    baseTokenURI,
    ownerAddress,
    deployer: (await ethers.getSigners())[0].address,
    deploymentTransaction: axg2026.deploymentTransaction()?.hash,
    timestamp: new Date().toISOString(),
  };
  
  const fs = require("fs");
  const deploymentsDir = "./deployments";
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir);
  }
  
  const deploymentFile = `${deploymentsDir}/${network.name}.json`;
  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
  console.log(`\n📄 Deployment info saved to: ${deploymentFile}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});