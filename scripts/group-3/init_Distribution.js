// This Script handles Distributing GANG to the Team using the GANGDistribution Contract
const { ethers } = require("hardhat");

async function main() {

    // Following code is to use the contract at the deployed address.
    const deployedAddress = "0x945F842fB4Df193f7F3E62f908Bc906BbBCf0F6D"; // Replace with the actual contract address
    const GANGDistribution = await ethers.getContractFactory("GANGDistribution");
    const contract = await GANGDistribution.attach(deployedAddress);
   
    const [owner] = await ethers.getSigners();
    console.log("Interacting with contracts with the account:", owner.address);


    // Define your recipient addresses here
    // ex:   ["0xAddress1", "0xAddress2", "0xAddress3"], // List 1: Addresses
    const newRecipients = [
        "0xe5A66c73A1A549b5AcDeF3FcCfc8d2bc4d3269C4",
        "0x5d6836f641FfFe6a86799B51A4BDed07148760cA",
        "0x3eb9Ab7DE16B9D768E894a22E2E8B10EbA842954",
        "0x3654bE46c941D890505D4d3AF1F13FaE5D805149",
        "0x07d61671C4A12da2c02C69179e5f81f851614c4b",
        "0x59ce436890c241Bac964FDEBBcc0c4f1eF0C2deE",
        "0x4Ae1D228796837c0bbb08Ea09241Bc2b2A3fc9e3",
        "0xc09459DF0D717a7d0681b8fE6F7A115c21C58182",
        "0xBA3614e031EfCF5e7D841b9014108Eb9014f110c",
        "0x808985f7a7BB4202EB3c8E37719e8C9B3d36EDe7",
        "0x738608063b0664f0A1377F34ebDACBa8AD246a64",
        "0x6bd22EC59c7956cEA1F316843629Ace709d24A5c",
        "0x4Ae1D228796837c0bbb08Ea09241Bc2b2A3fc9e3",
        "0x2310a349E1936b6eFf35e2faf3e4f981C4f16365",
        "0xeCD7b5174fd150c375Abdcb6F7BF47BAcfb660AF",
        "0xF631938C3BAc0656eB8D25e6BA9e4a5433006654",
        "0xE73E1cBEa54A1b3f8D5543E9D255e9B0793a2607",
        "0xCf79aC2CEfb3Eb3BFd57b8f3d3c1f0cc26bD7034",
        "0xB6a423F6f0935d6B951c45b6572cBAB33D6359e2",
        "0xa3D00eBb5e384463Bf5e18BC76fa55E4823E8212",
        "0x9540f81A34A56e8A84A8ACDA49615DCc357A7593",
        "0x88Be8ed5D9d48C6A8024bC4eeB08258edFE42cd9",
        "0x7A727C4b191a02156E852201dC8BaFF69400f152",
        "0x73E659b2eEd6cb347F4cc8F36742AF2570E194FA",
        "0x73D3370B6088416AebbF486031Be3E1849810264",
        "0x673A08Ef71EEb6C238c050fAdf6C3Dd308DDD479",
        "0x588a2bC34FF05A21f5999F491280C8246D983523",
        "0x4B87B8037340Cd432b7583f82A5466F011C5CdC4",
        "0x3bc2DB8d5884EE0035fd7B6A86a1be027A3d4871",
        "0x15fB8860c342b857720A5B0411e0307cd1584578",
        "0x093b5d3cCa250FD85b5f9c7fD7DB8Ff4b0593E2b",
        "0x50b08000349525C10400ff31c39bDe3965709d32",
        "0xF76953C55d0Cd46fb775Ab269028362D67A6b40D",
        "0xf3F39A5d1f439d0a1a5bDc520177345FA0F331da",
        "0xeB0E8aeC5De2312788aEb352d3c4Baf105B26E8c",
        "0xe3E230516E3423C4F7dF7A34C8c3316e7800E615",
        "0xDDD924f42ACD939b7E63f44009a17b855e1c60a1",
        "0xD95C9cEd01D113B7086d8cf52790e10f01819394",
        "0xd28797fBF3212bCf0091C92d97169F9200d0D212",
        "0xcB4f9A94363D688E11f5F3d87814aA492092ff97",
        "0xc67505621eae3aA54A12DB52a6D101a3AbF2365c",
        "0xC610b045Ec1336381dB01810528CDEdc2299b8B5",
        "0xbC94A68d6484cbb70461673eF0bfe3605779d170",
        "0xb9D28C90ef1e5dEfF21d92aeBfe67cFd86c6B070",
        "0xb7a86A7cC4034e3D4c5B0D8bb9BF673560a12313",
        "0xAF69fB16Aa1d09e10eaCCcE7Da139Ac22194086C",
        "0xA8fba7d3Cbde5Dc8b9F45b493BbC76b95682B027",
        "0x9B2Cbc10165985c79B446e8Bcd4e87fb241e614A",
        "0x889b521105BeaF8BF5EcDE387c899aE206C30841",
        "0x8759450d6272505A128410e6477318c70D91472b",
        "0x82DBC67C8eeFcD4113cD3A717d3dBDD3D7878d01",
        "0x733f8254E6Db9EDdFe8aA242552F40c1138dC86C",
        "0x6f7e861b4Dfc55357360Ad2adA01BB8fC4Eec80f",
        "0x6E85929Cb0E92269E5ff5fd6a6cd3F378C41b316",
        "0x6c2b03A2fFE7C4FF8BAC97102C76914EC0A97AB5",
        "0x68774a38142D6d8fD582d9d5b02521a8b0e54803",
        "0x667662CfCCdE43380Ad7382966cAFd95add31A8b",
        "0x64535D0cBeeab04A7c2c5b09dFB0F22e57171279",
        "0x5A96d23915f341B27B6C19f228400D51ca1aFd3a",
        "0x57967be4B1778512b34f6dcd4344E30E62887Dde",
        "0x5385CdE5e38C57DD90C4aC7F79659dbCAa1d55d7",
        "0x521982d25E5DaE7a88557dA0851628c429b28ba9",
        "0x469D4107ad071C8C925dd937177D16181f40a957",
        "0x4216c6B468724e72b4791C6483a5eB5d29e75dEB",
        "0x417Ac092595cCAdabbB11086C020d16F14284fB8",
        "0x345b5aA7965c9174b2863a0539f814b5B37a711E",
        "0x326475CC33b6B03e71bef82B51586d0fd466cA42",
        "0x30b72c92a131cbeCd4d8f31C9226808cE78359C6",
        "0x2Af4962a1765198Ce599E59c2Ab325aD9D5f1d98",
        "0x29d6Bb1C67004e70a90bFd56609bCA1Ea1439566",
        "0x28E690b76a30fF912af2c5BBe90390f6BCB4D4dC",
        "0x1Ec10E6826b9343e13Ce0Cc71f5206b0C5cDa86e",
        "0x134B1a31f429BB8C4F1d7Aee40A2AB06b26d0801",
        "0x01F51d7BDE872A64D197A081934B601aB987b0d5",
        "0xd9ed5A0891f96b325216E3BF6551718DB6B77F6d",
        "0xD6827f8503883F2Ed067084596a426dc5228Ccdd",
        "0xc09459DF0D717a7d0681b8fE6F7A115c21C58182",
        "0x2310a349E1936b6eFf35e2faf3e4f981C4f16365",
        "0x1270781F79133e7d1EB6928aca40cD949af27dA8"
    ];


    // Define recipient percentages here
    // ex:   [100, 200, 300],
    const newPercentages = [
        19607,
        19607,
        19607,
        19607,
        19607,
        19607,
        19607,
        19607,
        19607,
        19607,
        19607,
        19607,
        19607,
        19607,
        17973,
        14705,
        14705,
        14705,
        14705,
        14705,
        14705,
        14705,
        14705,
        14705,
        14705,
        14705,
        14705,
        14705,
        14705,
        14705,
        14705,
        11437,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803,
        9803
    ];

    // Update Recipients Addresses and Percentages
    await contract.updateRecipients(newRecipients, newPercentages);
    console.log("Updated Recipients: ", new Date().toLocaleString());
        
    
    // Send the inital GANG to the contract for distributions
    await new Promise(resolve => setTimeout(resolve, 12000)); 

    console.log("Sending initial amount for distributions: ", new Date().toLocaleString());
    const transaction = {
        to: contract.getAddress(),
        value: ethers.parseEther("306000"),
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