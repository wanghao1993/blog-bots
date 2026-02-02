# AXG2026 NFT Smart Contracts

Smart contracts for the AXG2026 Employee NFT project. Each employee can mint a unique NFT with their name.

## Features

- **ERC721 Standard**: Fully compliant with ERC721 NFT standard
- **Employee-based Minting**: Each employee can mint one NFT with their name
- **On-chain Metadata**: Token metadata generated on-chain with employee information
- **Batch Minting**: Owner can batch mint NFTs for multiple employees
- **Configurable**: Adjustable mint price, minting status, and base URI
- **Verification**: Easy verification on Etherscan/Polygonscan

## Contract Details

### Contract Name
AXG2026

### Contract Symbol
AXG

### Functions

#### Public Functions
- `mintEmployeeNFT(string employeeName)` - Mint an NFT for an employee
- `getTokenIdByName(string employeeName)` - Get token ID for an employee name
- `getEmployeeName(uint256 tokenId)` - Get employee name for a token ID
- `isEmployeeMinted(string employeeName)` - Check if an employee has minted
- `totalSupply()` - Get total number of minted tokens

#### Owner Functions
- `batchMint(string[] employeeNames, address[] recipients)` - Batch mint NFTs
- `setBaseURI(string baseURI)` - Set base token URI
- `setMintingOpen(bool status)` - Enable/disable minting
- `setMintPrice(uint256 newPrice)` - Set mint price
- `withdraw()` - Withdraw contract balance

## Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Hardhat
- MetaMask or other Ethereum wallet

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd axg2026/contracts
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Edit `.env` with your configuration:
- Set RPC URLs for your networks
- Add your private key for deployment
- Add Etherscan/Polygonscan API keys for verification

### Compilation

```bash
npm run compile
```

### Testing

```bash
npm run test
```

For gas usage report:
```bash
npm run gas
```

### Deployment

#### Local Network
```bash
# Start local node
npm run node

# In another terminal
npm run deploy:local
```

#### Test Networks
```bash
# Sepolia (Ethereum testnet)
npm run deploy:sepolia

# Mumbai (Polygon testnet)
npm run deploy:mumbai
```

#### Main Networks
```bash
# Ethereum Mainnet
npm run deploy:mainnet

# Polygon Mainnet
npm run deploy:polygon
```

### Verification

After deployment, verify the contract:
```bash
# Sepolia
npm run verify:sepolia <contract-address> <constructor-args>

# Mumbai
npm run verify:mumbai <contract-address> <constructor-args>
```

## Contract Architecture

### Storage Variables
- `_nextTokenId`: Counter for token IDs
- `_nameToTokenId`: Mapping from employee name hash to token ID
- `_tokenIdToName`: Mapping from token ID to employee name
- `_mintTimestamp`: Mapping from token ID to mint timestamp
- `_baseTokenURI`: Base URI for token metadata
- `mintPrice`: Price to mint an NFT (in wei)
- `mintingOpen`: Whether minting is open to public

### Events
- `EmployeeMinted`: Emitted when an NFT is minted
- `MintingStatusChanged`: Emitted when minting status changes
- `MintPriceChanged`: Emitted when mint price changes

## Security Considerations

1. **Access Control**: Owner-only functions are protected with OpenZeppelin's `Ownable`
2. **Input Validation**: Employee names cannot be empty, duplicates are prevented
3. **Payment Handling**: Proper checks for mint price payments
4. **Withdrawal Pattern**: Secure withdrawal function for contract owner

## Network Support

- **Localhost**: Development and testing
- **Sepolia**: Ethereum testnet
- **Mumbai**: Polygon testnet
- **Ethereum Mainnet**: Production deployment
- **Polygon Mainnet**: Production deployment (recommended for lower gas fees)

## License

MIT