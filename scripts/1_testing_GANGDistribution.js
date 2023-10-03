// This Script handles Distributing GANG to the Team using the GANGDistribution Contract
const { ethers } = require("hardhat");

async function main() {

    // Following code is to use the contract at the deployed address.
    const deployedAddress = "0xA0Fb4b56001F7F82db6a9E00Dc914c8564E26aB4"; // Replace with the actual contract address
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
        value: ethers.parseEther("1592875"),
    };
        
    // Send the transaction
    const tx = await owner.sendTransaction(transaction);
        
    // Wait for the transaction to be mined
    await tx.wait();



    console.log("Starting Distribution Bot: ", new Date().toLocaleString());

    for (let i = 0; i < 7200; i++) {
        console.log("Currently on run: ", (i+1));
        await distributeGANG();
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