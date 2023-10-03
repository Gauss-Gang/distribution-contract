// This Script handles Distributing GANG to the Team using the GANGDistribution Contract
const { ethers } = require("hardhat");

async function main() {

    // Following code is to use the contract at the deployed address.
    const deployedAddress = "0xB71Af08c8f367F6F0618D82141b503CED692d91d"; // Replace with the actual contract address
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


/*
    //TESTING ONLY:
    console.log("Sending initial amount for distributions: ", new Date().toLocaleString());
    const transaction = {
        to: contract.getAddress(),
        value: ethers.parseEther("15929"),
    };
        
    // Send the transaction
    const tx = await owner.sendTransaction(transaction);
        
    // Wait for the transaction to be mined
    await tx.wait();
*/


    console.log("Starting Distribution Bot: ", new Date().toLocaleString());

    for (let i = 0; i < 7199; i++) {
        console.log("Currently on run: ", (i+1));
        await distributeGANG();
        await new Promise(resolve => setTimeout(resolve, 6000)); 
    }

    console.log("Distribution Bot finished: ", new Date().toLocaleString());


    console.log("Checking if Distribution was successful: ");

    const finalAmountsReceived = await getAmountsReceived();
    const recipientAddresses = await getRecipientAddresses();


    for (let i = 0; i < finalAmountsReceived.length; i++) {
        let finalAmount = finalAmountsReceived[i];
        let balance = await getBalance(recipientAddresses[i]);

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