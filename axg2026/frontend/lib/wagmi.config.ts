import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia, polygonMumbai, mainnet, polygon } from 'wagmi/chains';
import { http } from 'wagmi';

// Contract addresses (update these after deployment)
export const CONTRACT_ADDRESSES = {
  [sepolia.id]: process.env.NEXT_PUBLIC_SEPOLIA_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
  [polygonMumbai.id]: process.env.NEXT_PUBLIC_MUMBAI_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
  [mainnet.id]: process.env.NEXT_PUBLIC_ETHEREUM_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
  [polygon.id]: process.env.NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
};

// Get contract address for current chain
export function getContractAddress(chainId: number): `0x${string}` {
  return CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES] as `0x${string}` || '0x0000000000000000000000000000000000000000';
}

// RainbowKit configuration
export const config = getDefaultConfig({
  appName: 'AXG2026 NFT Mint',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [sepolia, polygonMumbai, mainnet, polygon],
  transports: {
    [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || 'https://sepolia.infura.io/v3/YOUR_INFURA_KEY'),
    [polygonMumbai.id]: http(process.env.NEXT_PUBLIC_MUMBAI_RPC_URL || 'https://polygon-mumbai.infura.io/v3/YOUR_INFURA_KEY'),
    [mainnet.id]: http(process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL || 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY'),
    [polygon.id]: http(process.env.NEXT_PUBLIC_POLYGON_RPC_URL || 'https://polygon-mainnet.infura.io/v3/YOUR_INFURA_KEY'),
  },
  ssr: true,
});