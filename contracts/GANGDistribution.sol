// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {IERC20} from "./libraries/interfaces/IERC20.sol";
import {Ownable} from "./libraries/access/Ownable.sol";
import {Pausable} from "./libraries/security/Pausable.sol";
import {Math} from "./libraries/utils/Math.sol";


/**
 * Gang Distribution contract.
 * This Contract airdrops GANG on Gauss by distributing a percentage, of the total amount
 * allocated to this contract, to each recipient in the list.
 */
contract GANGDistribution is Ownable, Pausable {
    
    uint256 public totalAirdropAmount;
    uint256 public airdropCount;
    uint256 public totalAirdropCount;
    uint256 private immutable _precisionFactor = 1000000;

    struct AirdropRecipient {
        address wallet;
        uint256 percentage;
        uint256 totalReceived;
    }

    AirdropRecipient[] private _airdropRecipients;

    event AirdropCompleted();
    event DistributionCalculated(uint256 remainingAirdrops, uint256 GANGToDistribute);
    event GANGDistributed(address recipient, uint256 GANGAmount);


    constructor(uint256 _totalAirdropAmount, uint256 _totalAirdropCount) {
            totalAirdropAmount = _totalAirdropAmount;
            totalAirdropCount = _totalAirdropCount;
            airdropCount = 0;
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


    // Airdrops GANG to recipient wallets.
    function airdropGANG() external onlyOwner whenNotPaused() {

        require(_airdropRecipients.length != 0, "No recipients to airdrop GANG to.");
        require(airdropCount < totalAirdropCount, "All airdrops have been completed.");

        // Calculate the total amount for one airdrop
        uint256 airdropAmount = getContractBalance() / (totalAirdropCount - airdropCount);
        uint256 amountTransfered = 0;

        // Transfer GANG to each recipient
        for (uint256 i = 0; i < _airdropRecipients.length; i++) {
            address payable recipientWallet = payable(_airdropRecipients[i].wallet);

            // Calculate GANG to send to this recipient
            uint256 amountOfGANG = Math.mulDiv(airdropAmount, _airdropRecipients[i].percentage, _precisionFactor, Math.Rounding.Trunc);
            uint256 checkTransfered = amountTransfered + amountOfGANG;

            // Transfer GANG to the recipient, with safety check for overflows.
            if (checkTransfered >= airdropAmount) {
                recipientWallet.transfer((airdropAmount - amountTransfered));
                amountTransfered = airdropAmount;

                i = _airdropRecipients.length;
            }
            else {
                recipientWallet.transfer(amountOfGANG);
                amountTransfered = amountTransfered + amountOfGANG;

            }
            
            // Update total received for this recipient
             _airdropRecipients[i].totalReceived = _airdropRecipients[i].totalReceived + amountOfGANG;
        }

        // Update airdrop count
        airdropCount++;

        // Emit AirdropCompleted event
        emit AirdropCompleted();
    }


    // Function to distribute all remaining GANG in a single batch
    function distributeAllRemainingGANG() external onlyOwner whenNotPaused() {

        require(_airdropRecipients.length != 0, "No recipients to distribute remaining GANG to.");
        require(airdropCount < totalAirdropCount, "All airdrops have been completed.");

        // Calculate the total amount for one airdrop
        uint256 airdropAmount = getContractBalance();
        uint256 amountTransfered = 0;


        // Transfer GANG to each recipient
        for (uint256 i = 0; i < _airdropRecipients.length; i++) {
            address payable recipientWallet = payable(_airdropRecipients[i].wallet);

            // Calculate GANG to send to this recipient
            uint256 amountOfGANG = Math.mulDiv(airdropAmount, _airdropRecipients[i].percentage, _precisionFactor, Math.Rounding.Trunc);
            uint256 checkTransfered = amountTransfered + amountOfGANG;

            // Transfer GANG to the recipient, with safety check for overflows.
            if (checkTransfered >= airdropAmount) {
                recipientWallet.transfer((airdropAmount - amountTransfered));
                amountTransfered = airdropAmount;
            }
            else {
                recipientWallet.transfer(amountOfGANG);
                amountTransfered = amountTransfered + amountOfGANG;
            }

            // Update total received for this recipient
            _airdropRecipients[i].totalReceived = _airdropRecipients[i].totalReceived + amountOfGANG;
        }

        // Update airdrop count
        airdropCount = totalAirdropCount;

        // Emit AirdropCompleted event
        emit AirdropCompleted();
    }


    // Gets the wallet addresses of the recipients
    function getRecipientAddresses() public view onlyOwner returns (address[] memory) {

        address[] memory addresses = new address[](_airdropRecipients.length);

        for (uint256 i = 0; i < _airdropRecipients.length; i++) {
            addresses[i] = _airdropRecipients[i].wallet;
        }

        return addresses;
    }


    // Gets the Percentages of the recipients
    function getRecipientPercentages() public view onlyOwner returns (uint256[] memory) {

        uint256[] memory percentages = new uint256[](_airdropRecipients.length);

        for (uint256 i = 0; i < _airdropRecipients.length; i++) {
            percentages[i] = _airdropRecipients[i].percentage;
        }

        return percentages;

    }


    // Gets the Total Received for each the recipient
    function getRecipientAmountReceived() public view onlyOwner returns (uint256[] memory) {

        uint256[] memory amountReceived = new uint256[](_airdropRecipients.length);

        for (uint256 i = 0; i < _airdropRecipients.length; i++) {
            amountReceived[i] = _airdropRecipients[i].totalReceived;
        }

        return amountReceived;
    }


    // Updates the total amount to distribute after sending GANG tokens to the contract
    function updateTotalAirdropAmount() public onlyOwner {
        totalAirdropAmount = address(this).balance;
    }


    // Updates the total airdrop count, essentially proloning the vesting period
    function updateTotalAirdropCount(uint256 _totalAirdropCount) external onlyOwner {
        totalAirdropCount = _totalAirdropCount;
    }


    // Function to update the list of recipients
    function updateRecipients(address[] memory recipientAddresses, uint256[] memory percentages) external onlyOwner {

        require(recipientAddresses.length == percentages.length, "Number of addresses and percentages should match.");
        require(recipientAddresses.length > 0, "There are no recipients to update.");

        // Clear the existing _airdropRecipients array
        delete _airdropRecipients;

        uint256 totalPercentages = 0;

        // Add the updated recipients to the _airdropRecipients array
        for (uint256 i = 0; i < recipientAddresses.length; i++) {

            require(recipientAddresses[i] != address(0), "Invalid recipient address.");
            require(percentages[i] > 0, "Percentage must be greater than 0.");
            require(percentages[i] <= _precisionFactor, "Percentage cannot exceed 100%.");

            _airdropRecipients.push(
                AirdropRecipient({
                    wallet: recipientAddresses[i],
                    percentage: percentages[i],
                    totalReceived: 0
                })
            );

            totalPercentages = totalPercentages + percentages[i];
        }

        // Ensure total percentage amount is equal to or less than 100% (we round down on math calculations to prevent overflows)
        require(totalPercentages <= _precisionFactor, "Total of Percentages must be <= 100%");
    }


    // Gets the contract balance
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
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
        require(tokenToWithdraw != address(0), "Zero address not valid token address");
        IERC20 token = IERC20(tokenToWithdraw);
        uint256 balance = token.balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");

        token.transfer(recoveryWallet, balance);
    }
}
