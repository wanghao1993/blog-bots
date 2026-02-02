'use client';

import { useAccount, useReadContract } from 'wagmi';
import { Copy, ExternalLink } from 'lucide-react';

// This would come from actual contract deployment
const CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000';

export function ContractInfo() {
  const { isConnected } = useAccount();
  
  // Placeholder contract data - in real app, use useReadContract hooks
  const contractData = {
    totalSupply: 156,
    mintPrice: '0 ETH',
    mintingOpen: true,
    owner: '0x742d35Cc6634C0532925a3b844Bc9e...',
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Show toast notification in real app
    alert('Copied to clipboard!');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Contract Information
      </h2>
      
      <div className="space-y-4">
        <div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            Contract Address
          </div>
          <div className="flex items-center justify-between">
            <code className="text-sm font-mono text-gray-900 dark:text-gray-100 truncate">
              {CONTRACT_ADDRESS}
            </code>
            <div className="flex space-x-2">
              <button
                onClick={() => copyToClipboard(CONTRACT_ADDRESS)}
                className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <Copy size={16} />
              </button>
              <a
                href={`https://sepolia.etherscan.io/address/${CONTRACT_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Total Minted
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {contractData.totalSupply}
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Mint Price
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {contractData.mintPrice}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            Minting Status
          </div>
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${contractData.mintingOpen ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="font-medium text-gray-900 dark:text-white">
              {contractData.mintingOpen ? 'Open' : 'Closed'}
            </span>
          </div>
        </div>

        <div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            Contract Owner
          </div>
          <div className="flex items-center justify-between">
            <code className="text-sm font-mono text-gray-900 dark:text-gray-100 truncate">
              {contractData.owner}
            </code>
            <button
              onClick={() => copyToClipboard(contractData.owner)}
              className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <Copy size={16} />
            </button>
          </div>
        </div>

        {!isConnected && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Connect wallet to view real-time contract data
            </p>
          </div>
        )}
      </div>
    </div>
  );
}