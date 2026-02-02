// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

/**
 * @title AXG2026 Employee NFT
 * @dev ERC721 token representing employee membership for AXG2026.
 * Each employee can mint one NFT with their name.
 */
contract AXG2026 is ERC721, Ownable {
    using Strings for uint256;
    
    // Counter for token IDs
    uint256 private _nextTokenId;
    
    // Mapping from employee name hash to token ID
    mapping(bytes32 => uint256) private _nameToTokenId;
    
    // Mapping from token ID to employee name
    mapping(uint256 => string) private _tokenIdToName;
    
    // Mapping from token ID to mint timestamp
    mapping(uint256 => uint256) private _mintTimestamp;
    
    // Base URI for token metadata
    string private _baseTokenURI;
    
    // Mint price (can be zero for free mint)
    uint256 public mintPrice;
    
    // Whether minting is open to public
    bool public mintingOpen;
    
    // Events
    event EmployeeMinted(
        address indexed employee,
        uint256 indexed tokenId,
        string employeeName,
        uint256 timestamp
    );
    
    event MintingStatusChanged(bool status);
    event MintPriceChanged(uint256 newPrice);
    
    /**
     * @dev Constructor
     * @param name_ Token name
     * @param symbol_ Token symbol
     * @param baseURI_ Base URI for token metadata
     * @param initialOwner Initial contract owner
     */
    constructor(
        string memory name_,
        string memory symbol_,
        string memory baseURI_,
        address initialOwner
    ) ERC721(name_, symbol_) Ownable(initialOwner) {
        _nextTokenId = 1;
        _baseTokenURI = baseURI_;
        mintPrice = 0; // Free mint by default
        mintingOpen = true;
    }
    
    /**
     * @dev Mint NFT for an employee
     * @param employeeName Full name of the employee
     */
    function mintEmployeeNFT(string memory employeeName) external payable {
        require(mintingOpen, "Minting is not open");
        require(msg.value >= mintPrice, "Insufficient payment");
        require(bytes(employeeName).length > 0, "Employee name cannot be empty");
        
        bytes32 nameHash = keccak256(abi.encodePacked(employeeName));
        require(_nameToTokenId[nameHash] == 0, "Employee already has an NFT");
        
        uint256 tokenId = _nextTokenId;
        _nextTokenId++;
        
        _safeMint(msg.sender, tokenId);
        
        _nameToTokenId[nameHash] = tokenId;
        _tokenIdToName[tokenId] = employeeName;
        _mintTimestamp[tokenId] = block.timestamp;
        
        emit EmployeeMinted(msg.sender, tokenId, employeeName, block.timestamp);
    }
    
    /**
     * @dev Batch mint NFTs for multiple employees (owner only)
     * @param employeeNames Array of employee names
     * @param recipients Array of recipient addresses
     */
    function batchMint(
        string[] memory employeeNames,
        address[] memory recipients
    ) external onlyOwner {
        require(employeeNames.length == recipients.length, "Arrays length mismatch");
        
        for (uint256 i = 0; i < employeeNames.length; i++) {
            bytes32 nameHash = keccak256(abi.encodePacked(employeeNames[i]));
            require(_nameToTokenId[nameHash] == 0, "Employee already has an NFT");
            
            uint256 tokenId = _nextTokenId;
            _nextTokenId++;
            
            _safeMint(recipients[i], tokenId);
            
            _nameToTokenId[nameHash] = tokenId;
            _tokenIdToName[tokenId] = employeeNames[i];
            _mintTimestamp[tokenId] = block.timestamp;
            
            emit EmployeeMinted(recipients[i], tokenId, employeeNames[i], block.timestamp);
        }
    }
    
    /**
     * @dev Get token ID for an employee name
     * @param employeeName Employee name
     * @return tokenId The token ID for the employee, 0 if not minted
     */
    function getTokenIdByName(string memory employeeName) external view returns (uint256) {
        bytes32 nameHash = keccak256(abi.encodePacked(employeeName));
        return _nameToTokenId[nameHash];
    }
    
    /**
     * @dev Get employee name for a token ID
     * @param tokenId Token ID
     * @return employeeName The employee name
     */
    function getEmployeeName(uint256 tokenId) external view returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return _tokenIdToName[tokenId];
    }
    
    /**
     * @dev Get mint timestamp for a token
     * @param tokenId Token ID
     * @return timestamp The mint timestamp
     */
    function getMintTimestamp(uint256 tokenId) external view returns (uint256) {
        require(_exists(tokenId), "Token does not exist");
        return _mintTimestamp[tokenId];
    }
    
    /**
     * @dev Check if an employee name has been minted
     * @param employeeName Employee name
     * @return True if the employee has an NFT
     */
    function isEmployeeMinted(string memory employeeName) external view returns (bool) {
        bytes32 nameHash = keccak256(abi.encodePacked(employeeName));
        return _nameToTokenId[nameHash] != 0;
    }
    
    /**
     * @dev Override tokenURI to provide on-chain metadata
     * @param tokenId Token ID
     * @return The token URI
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        
        string memory employeeName = _tokenIdToName[tokenId];
        uint256 mintTime = _mintTimestamp[tokenId];
        
        // Create on-chain metadata
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        employeeName,
                        ' - AXG2026 Employee",',
                        '"description": "Official employee NFT for AXG2026. This NFT represents ',
                        employeeName,
                        '\\'s membership in the AXG2026 organization.",',
                        '"image": "',
                        _baseTokenURI,
                        '",',
                        '"attributes": [',
                        '{"trait_type": "Employee Name", "value": "',
                        employeeName,
                        '"},',
                        '{"trait_type": "Mint Date", "display_type": "date", "value": ',
                        Strings.toString(mintTime),
                        '},',
                        '{"trait_type": "Token ID", "value": ',
                        Strings.toString(tokenId),
                        '}',
                        ']}'
                    )
                )
            )
        );
        
        return string(abi.encodePacked("data:application/json;base64,", json));
    }
    
    /**
     * @dev Set base token URI (owner only)
     * @param baseURI New base URI
     */
    function setBaseURI(string memory baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }
    
    /**
     * @dev Set minting status (owner only)
     * @param status New minting status
     */
    function setMintingOpen(bool status) external onlyOwner {
        mintingOpen = status;
        emit MintingStatusChanged(status);
    }
    
    /**
     * @dev Set mint price (owner only)
     * @param newPrice New mint price in wei
     */
    function setMintPrice(uint256 newPrice) external onlyOwner {
        mintPrice = newPrice;
        emit MintPriceChanged(newPrice);
    }
    
    /**
     * @dev Withdraw contract balance (owner only)
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        payable(owner()).transfer(balance);
    }
    
    /**
     * @dev Get total minted tokens
     * @return Total number of minted tokens
     */
    function totalSupply() external view returns (uint256) {
        return _nextTokenId - 1;
    }
}