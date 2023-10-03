// This Script handles Distributing GANG to the Team using the GANGDistribution Contract
const { ethers } = require("hardhat");

async function main() {

    // Following code is to use the contract at the deployed address.
    const deployedAddress = "0x3A65F3237F77d737268E07041Eb2E61cA207Ea0E"; // Replace with the actual contract address
    const GANGDistribution = await ethers.getContractFactory("GANGDistribution");
    const contract = await GANGDistribution.attach(deployedAddress);
   
    const [owner] = await ethers.getSigners();
    console.log("Interacting with contracts with the account:", owner.address);

    const ownerAddress = owner.address; // Replace with the Service Account Address

    async function getOwnerBalance() {
        return await ethers.provider.getBalance(ownerAddress)
    }

    async function distributeGANG() {
        await contract.airdropGANG();
    }

    async function getRecipientAddresses() {
        return await contract.getRecipientAddresses();
    }

    async function getAmountsReceived() {
        return await contract.getRecipientAmountReceived();
    }

    async function getBalance(address) {
        return await ethers.provider.getBalance(address)
    }


    //TESTING ONLY:
    console.log("Sending initial amount for distributions: ", new Date().toLocaleString());
    const transaction = {
        to: contract.getAddress(),
        value: ethers.parseEther("78200"),
    };
        
    // Send the transaction
    const tx = await owner.sendTransaction(transaction);
        
    // Wait for the transaction to be mined
    await tx.wait();

    await new Promise(resolve => setTimeout(resolve, 10000)); 


    console.log("Starting Distribution Bot: ", new Date().toLocaleString());

    for (let i = 0; i < 7200; i++) {
        console.log("Currently on run: ", (i+1));
        await distributeGANG();
        await new Promise(resolve => setTimeout(resolve, 6000)); 
    }

    console.log("Distribution Bot finished: ", new Date().toLocaleString());


    console.log("Checking if Distribution was successful: ");

    const finalAmountsReceived = await getAmountsReceived();
    await new Promise(resolve => setTimeout(resolve, 6000)); 
    const recipientAddresses = await getRecipientAddresses();
    await new Promise(resolve => setTimeout(resolve, 6000)); 


    for (let i = 0; i < finalAmountsReceived.length; i++) {
        let finalAmount = finalAmountsReceived[i];
        let balance = await getBalance(recipientAddresses[i]);

        await new Promise(resolve => setTimeout(resolve, 6000)); 

        console.log("Total Airdrop  [", (i+1), "]: ", finalAmount.toString());
        console.log("Balance amount [", (i+1), "]: ", balance.toString());
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });