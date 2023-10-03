
const { ethers } = require("hardhat");

async function main() {

    // Following code is to use the contract at the deployed address.
    const deployedAddress = ""; // Replace with the actual contract address
    const GANGDistribution = await ethers.getContractFactory("GANGDistribution");
    const contract = await GANGDistribution.attach(deployedAddress);
   
    const [owner] = await ethers.getSigners();
    console.log("Interacting with contracts with the account:", owner.address);


    console.log("Checking if Distribution was successful: ");

    async function getRecipientAddresses() {
        return await contract.getRecipientAddresses();
    }

    async function getAmountsReceived() {
        return await contract.getRecipientAmountReceived();
    }

    async function getBalance(address) {
        return await ethers.provider.getBalance(address)
    }

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