// This Script handles Distributing GANG to the Team using the GANGDistribution Contract
const { ethers } = require("hardhat");

async function main() {

    // Following code is to use the contract at the deployed address.
    const deployedAddress = ""; // Replace with the actual contract address
    const GANGDistribution = await ethers.getContractFactory("GANGDistribution");
    const contract = await GANGDistribution.attach(deployedAddress);
   
    const [owner] = await ethers.getSigners();
    console.log("Interacting with contracts with the account:", owner.address);

    const ownerAddress = owner.address; // Replace with the Service Account Address

    async function getOwnerBalance() {
        return await ethers.provider.getBalance(ownerAddress)
    }

    async function distributeAirdrop() {
        await contract.airdropGANG();
    }

    if ((await getOwnerBalance()) >= 500000000000000) {

        console.log("Starting Distribution Bot: ", new Date().toLocaleString());

        await distributeAirdrop();

        console.log("Distribution Bot finished: ", new Date().toLocaleString());
    }

    else {
        console.log("Warning: Bot does not have enough gas to run, please supply at least 0.005 GANG to Owner Account");
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });