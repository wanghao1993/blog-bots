'use client';

import { useAccount, useSwitchChain, useChainId } from 'wagmi';
import { ChevronDown, Check } from 'lucide-react';
import { useState } from 'react';

const SUPPORTED_CHAINS = [
  { id: 11155111, name: 'Sepolia', testnet: true },
  { id: 80001, name: 'Mumbai', testnet: true },
  { id: 1, name: 'Ethereum', testnet: false },
  { id: 137, name: 'Polygon', testnet: false },
];

export function NetworkSwitcher() {
  const { isConnected } = useAccount();
  const { chains, switchChain } = useSwitchChain();
  const chainId = useChainId();
  const [isOpen, setIsOpen] = useState(false);

  if (!isConnected) return null;

  const currentChain = SUPPORTED_CHAINS.find(chain => chain.id === chainId) || SUPPORTED_CHAINS[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${currentChain.testnet ? 'bg-yellow-500' : 'bg-green-500'}`} />
          <span className="font-medium text-gray-900 dark:text-white">
            {currentChain.name}
          </span>
        </div>
        <ChevronDown size={16} className="text-gray-500 dark:text-gray-400" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Select Network
              </div>
              {SUPPORTED_CHAINS.map((chain) => (
                <button
                  key={chain.id}
                  onClick={() => {
                    switchChain({ chainId: chain.id });
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-between w-full px-3 py-2 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${chain.testnet ? 'bg-yellow-500' : 'bg-green-500'}`} />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {chain.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {chain.testnet ? 'Testnet' : 'Mainnet'}
                      </div>
                    </div>
                  </div>
                  {chain.id === chainId && (
                    <Check size={16} className="text-blue-500" />
                  )}
                </button>
              ))}
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 p-3">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2" />
                  Testnet - Free minting
                </div>
                <div className="flex items-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                  Mainnet - Real tokens
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}