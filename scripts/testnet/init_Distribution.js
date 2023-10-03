// This Script handles Distributing GANG to the Team using the GANGDistribution Contract
const { ethers } = require("hardhat");

async function main() {

    // Following code is to use the contract at the deployed address.
    const deployedAddress = "0xB71Af08c8f367F6F0618D82141b503CED692d91d"; // Replace with the actual contract address
    const GANGDistribution = await ethers.getContractFactory("GANGDistribution");
    const contract = await GANGDistribution.attach(deployedAddress);
   
    const [owner] = await ethers.getSigners();
    console.log("Interacting with contracts with the account:", owner.address);


    // Define your recipient addresses here
    // ex:   ["0xAddress1", "0xAddress2", "0xAddress3"], // List 1: Addresses
    const newRecipients = [
        "0x54daA1379658f4ad9697a43426A9891E23e08051",
        "0xF973BE91CDE91B20f6925fCccb1C8207378B9d82",
        "0xC6b07b5D7693d9a817aDff569514eB784839500A",
        "0xE11e04A2E87C368910E3Cd78F98a9042DEc204e5",
        "0xBEbC6DfA31673F17C8b0Dd4af43b51eb1930Ce8f",
        "0x71cf9A0bb5a610CF7710AEC4eB96620EcaA476E5",
        "0x4a07c130C44B90Eb729C752EC44abC11aD5CF54B",
        "0x6C09CE40aF9fD70282186Dd8d4ACc76C5a51ff94",
        "0xfc7a68e09e16f19e13109a4d9151ca010a3d66ec",
        "0x7F1DCdb5adBcce0e19e65ED0E3f65B6c4EA7986E",
        "0xCD2e2cAc4961DA4020a346e63b7ccffF25d99791",
        "0xDbfBA8479234d6e84dbCC34271d4b2f000a0f2ea",
        "0xd08eA59Ed96564AF8a871eCA6b1FfAD8D31E654F",
        "0x4Ae1D228796837c0bbb08Ea09241Bc2b2A3fc9e3",
        "0x2D8967B967EEa882AA44f8924c5D5e6D6a0a1e9d",
        "0xFc7a68E09e16F19E13109a4D9151Ca010a3D66EC",
        "0xEdaba5a0FfB676eA196d19aa2A7FfDbAcE629847"
    ];


    // Define recipient percentages here
    // ex:   [100, 200, 300],
    const newPercentages = [
        109864,
        94169,
        84752,
        75570,
        73922,
        51793,
        51793,
        48497,
        47084,
        47084,
        47084,
        47084,
        47084,
        47084,
        47084,
        45201,
        34842
    ];

    // Update Recipients Addresses and Percentages
    await contract.updateRecipients(newRecipients, newPercentages);

    console.log("Updated Recipients: ", new Date().toLocaleString());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });