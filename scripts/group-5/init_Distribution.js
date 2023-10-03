// This Script handles Distributing GANG to the Team using the GANGDistribution Contract
const { ethers } = require("hardhat");

async function main() {

    // Following code is to use the contract at the deployed address.
    const deployedAddress = "0x4A882Cb9EB1fA6A41d5729A73b04Ad79F858740d"; // Replace with the actual contract address
    const GANGDistribution = await ethers.getContractFactory("GANGDistribution");
    const contract = await GANGDistribution.attach(deployedAddress);
   
    const [owner] = await ethers.getSigners();
    console.log("Interacting with contracts with the account:", owner.address);


    // Define your recipient addresses here
    // ex:   ["0xAddress1", "0xAddress2", "0xAddress3"], // List 1: Addresses
    const newRecipients = [
        "0x791510F103AC73770ec19e80D8Ca3Ef0Fd4e54ED",
        "0x74458119e9c12860f437B0A93681A5794bCBFC09",
        "0x7173eE579e670ECD5c2bc2b521e802C4d3860948",
        "0x6E98797a3b0a6B02819a46975F3aaC8d8b19604E",
        "0x6bd22EC59c7956cEA1F316843629Ace709d24A5c",
        "0x693B7c6bceD40c1bEA99A4737870D6384B2315d4",
        "0x5C8a014Ef57f5649D95FcE6Ced4aC9005A6aF8AB",
        "0x5b600856c7555DD90436C61141d00dBAd2EE9d2a",
        "0x56a0d5c062e090fa22B9357053C1D071f791eb83",
        "0x550B11Dfb10C6e4764b09EDaB0562822e5B74C36",
        "0x54943f7F82b689bb4315AD42392883c6a0C93713",
        "0x52CAeD46A473a4473527B2BCf38B04444c23bAB2",
        "0x52187EF81f52a282c4a3F743b023198a40AFd293",
        "0x49fb97cD2c812d06728eA8f79A7A846dDc4C6c90",
        "0x47D574e85DF71a059Ec442cAd8DeE2224F58b0D8",
        "0x46E9b39248b8eDBC78CD8ee550f71875e5297319",
        "0x43Ca5320BAbF6B2f2328a6dE5C1d97C794d41aBd",
        "0x43aD69276e46D0de63Ae9C34510E0982E628bc26",
        "0x3FfA11Acc1B21D44ddc39416f072c57e0b6aC957",
        "0x3D387D3db4c4C99C72E685bAb4aa7015f994CC7E",
        "0x3CEDDf30635361C871Fc76a051982F4872597B2D",
        "0x3A05848ab49F27B04e0bcFEe5888a14a60Df3439",
        "0x34E3793D17855F453A7c0FFA32F82b4e3F1bC925",
        "0x346077d6355B14ceC5c63C0491736b7704c70991",
        "0x3401840D207e5D456aE0B6cEe559C072C974A206",
        "0x32d3e21b38992cdF859c7211Cea49BD95791Fe7f",
        "0x2F7E5D16E00C2dB6033cF5bCaB39D84c521A7eb5",
        "0x2c3f71f01276Ed3230D79F9033D4aB73F86Be4E8",
        "0x2a34fe43E8aBD22A41971014F3ecAb9BEf6937a3",
        "0x224bC9fe2924C82aceeA6B3881C91Ee262ba4aAA",
        "0x15305921e415fEE6AA0B10658a3b25577911e3cF",
        "0x15042f8A211991A003075dD1978b95A8b86cf31C",
        "0x13285463F7eC210454B56fde2c84Ed3a78620770",
        "0x12D9771CDE173bE7D9a08ba174573b57bc15f1b6",
        "0x0C911eFaA532d5eaF1C0c86D3a34370496645e88",
        "0x0B85Ac6a7cFa64ce36EFF359d19350C9EdEA7841",
        "0x0ac6f8dE228b998AcF901b1e9f22D3dE407B5110",
        "0x0933EFE1B4BE9a9E15a8d6469ef453E405BEF526",
        "0x0817387ace6654eed1D350e989301ca00B72f68E",
        "0x05734eBb790732734B48F4a464aD21BDe659758f",
        "0x0494BA7e357d34678978e4450fc10f429b9e25F2",
        "0x6da2799752E5114747efC8f2f1b731812600609a",
        "0xB4127E45C5B4e25EF4dc893047087c051Eb54EEa",
        "0x3CBf2111fC6872f425EdCc0008F2fd488AE687e9"
    ];


    // Define recipient percentages here
    // ex:   [100, 200, 300],
    const newPercentages = [
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        24017,
        6404,
        6004,
        2882
    ];

    // Update Recipients Addresses and Percentages
    await contract.updateRecipients(newRecipients, newPercentages);
    console.log("Updated Recipients: ", new Date().toLocaleString());


    // Send the inital GANG to the contract for distributions
    await new Promise(resolve => setTimeout(resolve, 12000)); 

    console.log("Sending initial amount for distributions: ", new Date().toLocaleString());
    const transaction = {
        to: contract.getAddress(),
        value: ethers.parseEther("62455"),
    };
        
    // Send the transaction
    const tx = await owner.sendTransaction(transaction);
        
    // Wait for the transaction to be mined
    await tx.wait();

    await new Promise(resolve => setTimeout(resolve, 12000)); 


    // Transfer Ownership to new Wallet
    const newOwner = "0xc09459DF0D717a7d0681b8fE6F7A115c21C58182";

    console.log("Transfering Ownership of Contract to: ", newOwner);

    await contract.transferOwnership(newOwner);

    await new Promise(resolve => setTimeout(resolve, 10000)); 

    console.log("Transfer Successful");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });