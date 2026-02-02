import { ConnectButton } from "@rainbow-me/rainbowkit";
import { MintForm } from "@/components/MintForm";
import { EmployeeList } from "@/components/EmployeeList";
import { ContractInfo } from "@/components/ContractInfo";
import { NetworkSwitcher } from "@/components/NetworkSwitcher";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                AXG2026
              </span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold rounded-full">
                NFT
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <NetworkSwitcher />
              <ConnectButton 
                showBalance={false}
                accountStatus="full"
                chainStatus="icon"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Employee <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">NFT Collection</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Mint your unique employee NFT for the AXG2026 organization. 
            Each NFT is tied to your name and represents your membership.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">1,000</div>
              <div className="text-gray-500 dark:text-gray-400">Total NFTs</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">FREE</div>
              <div className="text-gray-500 dark:text-gray-400">Mint Price</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">ERC-721</div>
              <div className="text-gray-500 dark:text-gray-400">Standard</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Mint Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Mint Your Employee NFT
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Enter your full name to mint a unique NFT. Each employee can only mint one NFT.
            </p>
            <MintForm />
          </div>

          {/* Right Column - Contract Info & Employees */}
          <div className="space-y-8">
            <ContractInfo />
            <EmployeeList />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            AXG2026 Employee NFT Collection • Built with ❤️ using Next.js, RainbowKit, and Hardhat
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Contract
            </a>
            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Documentation
            </a>
            <a href="#" className="text-gray-500 dark:text-gray-color hover:text-gray-900 dark:hover:text-white">
              GitHub
            </a>
            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}