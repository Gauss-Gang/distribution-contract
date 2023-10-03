// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {IERC20} from "./libraries/interfaces/IERC20.sol";
import {Ownable} from "./libraries/access/Ownable.sol";
import {Pausable} from "./libraries/security/Pausable.sol";
import {Math} from "./libraries/utils/Math.sol";


/**
 * Gauss Airdrop contract.
 * This Contract airdrops tokens to Gauss employees by distributing a percentage of the total amount
 * allocated on a set block interval.
 */
contract TokenAirdrop is Ownable, Pausable {
    
    address public tokenAddress;
    uint256 public totalAirdropAmount;
    uint256 public airdropIntervalBlocks;
    uint256 public lastAirdropBlock;
    uint256 public airdropCount;
    uint256 public totalAirdropCount;
    uint256 private immutable _precisionFactor = 10000;

    struct AirdropRecipient {
        address wallet;
        uint256 percentage;
        uint256 totalReceived;
    }

    AirdropRecipient[] public airdropRecipients;
    mapping(address => uint256) public totalTokensVested;

    event AirdropCompleted();
    event DistributionCalculated(uint256 remainingAirdrops, uint256 tokensToDistribute);
    event TokensDistributed(address recipient, uint256 tokensAmount);


    constructor(
        address _tokenAddress,
        uint256 _totalAirdropAmount,
        uint256 _airdropIntervalBlocks,
        address[] memory _recipientAddresses,
        uint256[] memory _percentages,
        uint256 _totalAirdropCount
    ) {
        
            require(_recipientAddresses.length == _percentages.length, "Number of addresses and percentages should match.");
            require(_recipientAddresses.length > 0, "There are no recipients to airdrop tokens to.");
            require(_percentages.length > 0, "There are no percentages provided.");

            tokenAddress = _tokenAddress;
            totalAirdropAmount = _totalAirdropAmount;
            airdropIntervalBlocks = _airdropIntervalBlocks;
            lastAirdropBlock = block.number;
            airdropCount = 0;
            totalAirdropCount = _totalAirdropCount;

            // Set the recipient addresses and their percentages
            for (uint256 i = 0; i < _recipientAddresses.length; i++) {
                airdropRecipients.push(
                    AirdropRecipient({
                        wallet: _recipientAddresses[i],
                        percentage: _percentages[i],
                        totalReceived: 0
                    })
                );

                // Calculate total tokens vested for this recipient
                totalTokensVested[_recipientAddresses[i]] = Math.mulDiv(
                    totalAirdropAmount,
                    _percentages[i],
                    _precisionFactor,
                    Math.Rounding.Trunc
                );
            }
    }


    // Fallback function to allow the contract to receives Native Currency 
    receive() external payable {}


    // Pause Token Trading and Transfers
    function pause() public onlyOwner {
        super._pause();
    }


    // Unpause Token Trading and Transfers
    function unpause() public onlyOwner {
        super._unpause();
    }


    // Function to update the list of recipients
    function updateRecipients(address[] memory recipientAddresses, uint256[] memory percentages) external onlyOwner {
        
        require(recipientAddresses.length == percentages.length, "Number of addresses and percentages should match.");
        require(recipientAddresses.length > 0, "There are no recipients to update.");

        // Clear the existing airdropRecipients array
        delete airdropRecipients;

        // Add the updated recipients to the airdropRecipients array
        for (uint256 i = 0; i < recipientAddresses.length; i++) {
            
            require(recipientAddresses[i] != address(0), "Invalid recipient address.");
            require(percentages[i] > 0, "Percentage must be greater than 0.");
            require(percentages[i] <= _precisionFactor, "Percentage cannot exceed 100%.");

            airdropRecipients.push(
                AirdropRecipient({
                    wallet: recipientAddresses[i],
                    percentage: percentages[i],
                    totalReceived: 0
                })
            );

            // Calculate total tokens vested for this recipient
            totalTokensVested[recipientAddresses[i]] = Math.mulDiv(
                totalAirdropAmount,
                percentages[i],
                _precisionFactor,
                Math.Rounding.Trunc
            );
        }
    }


    // Airdrops tokens to recipient wallets.
    function airdropTokens() external onlyOwner whenNotPaused() {
        
        // Transfer tokens to each recipient
        for (uint256 i = 0; i < airdropRecipients.length; i++) {
            address payable recipientWallet = payable(
                airdropRecipients[i].wallet
            );

            // Calculate tokens to send to this recipient
            uint256 tokensToSendPerRecipient = Math.ceilDiv(totalTokensVested[recipientWallet], totalAirdropCount);

            // Transfer tokens to the recipient
            recipientWallet.transfer(tokensToSendPerRecipient);

            // Subtract tokens sent from totalTokensVested
            totalTokensVested[recipientWallet] = totalTokensVested[recipientWallet] - tokensToSendPerRecipient;
        }

        // Update airdrop count
        airdropCount++;

        // Emit AirdropCompleted event
        emit AirdropCompleted();
    }


    // Function to distribute all remaining tokens in a single batch
    function distributeAllRemainingTokens() external onlyOwner whenNotPaused() {
        
        require(airdropCount < totalAirdropCount, "All airdrops have been completed.");

        // Transfer remaining tokens to each recipient
        for (uint256 i = 0; i < airdropRecipients.length; i++) {
            
            address payable recipientWallet = payable(airdropRecipients[i].wallet);

            // Transfer remaining tokens to the recipient
            uint256 remainingTokens = totalTokensVested[recipientWallet];
            recipientWallet.transfer(remainingTokens);

            // Subtract tokens sent from totalTokensVested
            totalTokensVested[recipientWallet] = totalTokensVested[recipientWallet] - remainingTokens;

            // Update total received for this recipient
            airdropRecipients[i].totalReceived = airdropRecipients[i].totalReceived + remainingTokens;
        }

        // Update airdrop count
        airdropCount = totalAirdropCount;

        // Emit AirdropCompleted event
        emit AirdropCompleted();
    }


    // Updates the interval between airdrops
    function updateAirdropIntervalBlocks(uint256 _airdropIntervalBlocks) external onlyOwner {
        airdropIntervalBlocks = _airdropIntervalBlocks;
    }


    // Updates the total airdrop count, essentially proloning the vesting period
    function updateTotalAirdropCount(uint256 _totalAirdropCount) external onlyOwner {
        totalAirdropCount = _totalAirdropCount;
    }


    // Sets the token address
    function setTokenAddress(address _tokenAddress) external onlyOwner {
        require(_tokenAddress != address(0), "Invalid token address.");
        tokenAddress = _tokenAddress;
    }


    // Gets the wallet addresses of the recipients
    function getRecipientAddresses() public view returns (address[] memory) {
        
        address[] memory addresses = new address[](airdropRecipients.length);

        for (uint256 i = 0; i < airdropRecipients.length; i++) {
            addresses[i] = airdropRecipients[i].wallet;
        }

        return addresses;
    }


    // Gets the contract balance
    function getContractBalance() external view returns (uint256) {
        IERC20 token = IERC20(tokenAddress);
        uint256 balance = token.balanceOf(address(this));
        return balance;
    }

    
    // Contract Owner can withdraw any Native Currency in the contract
    function nativeRecover(address recoveryWallet) external onlyOwner {
        payable(recoveryWallet).transfer(address(this).balance);
    }


    /* Withdrawl any ERC20 Token that are accidentally sent to this contract
            WARNING:    Interacting with unsafe tokens or smart contracts can 
                        result in stolen private keys, loss of funds, and drained
                        wallets. Use this function with trusted Tokens/Contracts only
    */
    function withdrawERC20(address tokenToWithdraw, address recoveryWallet) external onlyOwner {
        IERC20 token = IERC20(tokenToWithdraw);
        uint256 balance = token.balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");

        token.transfer(recoveryWallet, balance);
    }
}
