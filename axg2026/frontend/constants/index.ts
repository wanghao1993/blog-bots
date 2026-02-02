// App constants
export const APP_NAME = 'AXG2026 NFT Mint';
export const APP_DESCRIPTION = 'Mint your employee NFT for AXG2026 organization';

// Network constants
export const SUPPORTED_CHAINS = [
  { id: 11155111, name: 'Sepolia', testnet: true, symbol: 'ETH' },
  { id: 80001, name: 'Mumbai', testnet: true, symbol: 'MATIC' },
  { id: 1, name: 'Ethereum', testnet: false, symbol: 'ETH' },
  { id: 137, name: 'Polygon', testnet: false, symbol: 'MATIC' },
];

// Contract constants
export const DEFAULT_CONTRACT_CONFIG = {
  name: 'AXG2026',
  symbol: 'AXG',
  mintPrice: '0 ETH',
};

// UI constants
export const COLORS = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
};

// App URLs
export const URLS = {
  github: 'https://github.com/your-username/axg2026',
  documentation: 'https://docs.axg2026.com',
  twitter: 'https://twitter.com/axg2026',
  discord: 'https://discord.gg/axg2026',
};