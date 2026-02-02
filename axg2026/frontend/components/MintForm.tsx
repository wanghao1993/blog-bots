'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { parseEther } from 'viem';
import { CONTRACT_ABI } from '@/lib/contract';

export function MintForm() {
  const { isConnected, address } = useAccount();
  const [employeeName, setEmployeeName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string>('');

  // This would come from actual contract deployment
  const contractAddress = '0x0000000000000000000000000000000000000000';

  const { data: hash, writeContractAsync, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash });

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeName.trim() || !isConnected) return;

    setIsLoading(true);
    setMintSuccess(false);

    try {
      // In a real implementation, you would use the actual contract address and ABI
      // This is a placeholder implementation
      console.log(`Minting NFT for: ${employeeName}`);
      
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setMintSuccess(true);
      setTransactionHash('0x' + Math.random().toString(16).slice(2));
      
      // Reset form after successful mint
      setEmployeeName('');
    } catch (error) {
      console.error('Minting failed:', error);
      alert('Failed to mint NFT. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="text-center py-8">
        <div className="mb-4 text-gray-500 dark:text-gray-400">
          Connect your wallet to mint your employee NFT
        </div>
        <ConnectButton />
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleMint} className="space-y-6">
        <div>
          <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Full Name
          </label>
          <input
            id="employeeName"
            type="text"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            placeholder="Enter your full name (e.g., John Doe)"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={isLoading}
          />
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            This name will be permanently associated with your NFT.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Important Information
              </h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Each employee can only mint one NFT</li>
                  <li>Your name will be permanently stored on the blockchain</li>
                  <li>Minting is currently free (no gas fee required)</li>
                  <li>You will receive a unique ERC-721 token</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !employeeName.trim()}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Minting NFT...
            </span>
          ) : (
            'Mint Employee NFT'
          )}
        </button>
      </form>

      {mintSuccess && (
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                NFT Minted Successfully!
              </h3>
              <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                <p>Your employee NFT has been minted successfully.</p>
                <p className="mt-1 font-mono text-xs break-all">
                  Transaction: {transactionHash}
                </p>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="text-sm font-medium text-green-800 dark:text-green-200 hover:text-green-900 dark:hover:text-green-100"
                  onClick={() => window.open(`https://sepolia.etherscan.io/tx/${transactionHash}`, '_blank')}
                >
                  View on Explorer →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}