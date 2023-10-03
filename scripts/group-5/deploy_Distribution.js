// Deploys the Team GANG Distribution Contract.
const { ethers } = require("hardhat");

async function main() {

    const GANGDistribution = await ethers.getContractFactory("GANGDistribution");
    console.log('Deploying GANGDistribution Contract...');

    // Set the parameters needed to launch the GANGDistribution Contract
    const _totalAirdropAmount = 62455;
    const _totalAirdropCount = 7200;
    
    const contract = await GANGDistribution.deploy(_totalAirdropAmount, _totalAirdropCount);
    console.log("GANGDistribution deployed to:", await contract.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });