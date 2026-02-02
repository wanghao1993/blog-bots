/**
 * Format Ethereum address
 */
export function formatAddress(address: string, startLength = 6, endLength = 4): string {
  if (!address || address.length < startLength + endLength) return address;
  return `${address.substring(0, startLength)}...${address.substring(address.length - endLength)}`;
}

/**
 * Format token ID
 */
export function formatTokenId(tokenId: string | number): string {
  return `#${tokenId}`;
}

/**
 * Format date
 */
export function formatDate(date: Date | string | number): string {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Copy to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy:', error);
    return false;
  }
}

/**
 * Shorten large numbers
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

/**
 * Validate employee name
 */
export function isValidEmployeeName(name: string): boolean {
  return name.trim().length > 0 && name.trim().length <= 100;
}

/**
 * Get explorer URL for transaction
 */
export function getExplorerUrl(txHash: string, chainId: number): string {
  const explorers: Record<number, string> = {
    1: 'https://etherscan.io/tx',
    11155111: 'https://sepolia.etherscan.io/tx',
    137: 'https://polygonscan.com/tx',
    80001: 'https://mumbai.polygonscan.com/tx',
  };
  const base = explorers[chainId] || explorers[11155111];
  return `${base}/${txHash}`;
}

/**
 * Get explorer URL for address
 */
export function getExplorerAddressUrl(address: string, chainId: number): string {
  const explorers: Record<number, string> = {
    1: 'https://etherscan.io/address',
    11155111: 'https://sepolia.etherscan.io/address',
    137: 'https://polygonscan.com/address',
    80001: 'https://mumbai.polygonscan.com/address',
  };
  const base = explorers[chainId] || explorers[11155111];
  return `${base}/${address}`;
}