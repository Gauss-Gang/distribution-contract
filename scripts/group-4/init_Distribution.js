// This Script handles Distributing GANG to the Team using the GANGDistribution Contract
const { ethers } = require("hardhat");

async function main() {

    // Following code is to use the contract at the deployed address.
    const deployedAddress = "0x24259398F1Fc73D89318f3904f207E5eCE0cb02C"; // Replace with the actual contract address
    const GANGDistribution = await ethers.getContractFactory("GANGDistribution");
    const contract = await GANGDistribution.attach(deployedAddress);
   
    const [owner] = await ethers.getSigners();
    console.log("Interacting with contracts with the account:", owner.address);


    // Define your recipient addresses here
    // ex:   ["0xAddress1", "0xAddress2", "0xAddress3"], // List 1: Addresses
    const newRecipients = [
        "0xd9c045ddb2fec70383AfD550d00695C3168D25A8",
        "0x6E01e5e4BAfBb366D7eAeeC5Ade695989AaD7d8d",
        "0xF897C272513FB2ABB25f4142796a379A69B28097",
        "0x4529054AB4bA35DA86798c6f499011f93D7c59B3",
        "0x24491c8E9158B1B18Ed0A82c6Db1D90c002BF2e6",
        "0xfde25e4a3B64A7470E55705A02Dc3d2628602773",
        "0xFdADeb3AB07F7Ec4C66770339679eA6C28cD0A88",
        "0xFd5EACdE8D00dD48F2993581cCD302441666F938",
        "0xF99220eBC04de3488E4d3BC1b104e83A75bB137a",
        "0xF8a6dbc20876FD5657C791be24C92F2ba8C9b634",
        "0xf532651735713E8671FE418124703ab662088C75",
        "0xF50E16E74C46Bd64998B4B2642a15C724E11a298",
        "0xF0b72D808a8639c37cd4a9839Ab19EB84150365e",
        "0xef547b4629f5F369ceD63EB9C9E7847f723BE4C4",
        "0xebEb87c42C4eA344c1b5493283e610FeE2429292",
        "0xE9FCAFff808F539A65adA7774cBf3bf54d047980",
        "0xE922399AaF629DEA63987F2157b0cA7C44f4De90",
        "0xE575dD18c6aE6C5A4Ea544897f48c30ba18E75b0",
        "0xE0BfaBB7546849E0fE3d9A205fe0809d1EF7ACa2",
        "0xDC4c7e0c78Db8fb1BeaF0a300d1A04D4B408737e",
        "0xdB968ba83200aE3Cf39c673CEa89E1A91D50d97f",
        "0xdA38Bb65C07A1e33ED98944095f39bF431B6770a",
        "0xd9ed5A0891f96b325216E3BF6551718DB6B77F6d",
        "0xD6827f8503883F2Ed067084596a426dc5228Ccdd",
        "0xD327b1B0106CBDa9F8d61850ECB18456b4aeD805",
        "0xcD9b25C804419980f677196e948b8a431a1A398c",
        "0xCb339726C2EE68f5EB399B12061F30D6b6679F20",
        "0xc31351Ae2de6dD4b28eDe52BD58B0628Ce3B8Cf5",
        "0xC2c0F933f53dcc060E8eEbf275e656402acd5550",
        "0xbB2E93F8F7809ecba24D26317EDa6CF5eBf6db71",
        "0xB824a716E5b8B6Cc28B15aaF04d424D50Aa75C99",
        "0xb4aa9E7F8893fb30abfa4B23F11E8CB47C30738C",
        "0xae6AC4CDD6fB5d0C8b11313B8a1a6A5b90eEA534",
        "0xA9F5bFF117DCFA12341b5834daBCd048a67930CC",
        "0xa67a78BF7A23c0504441138fa9c64f816F9e1414",
        "0xA22524573349434b061Db5fdAe0C5b99768B640c",
        "0x9A25ba57c02c7c0Af0099f876DA29C6051B16795",
        "0x9729C5A53a0514Fd124a74c9fc83Fc2E8b8161FB",
        "0x93953F26C713627B6d6f413954a3994A22b69E4C",
        "0x90091297bbCB35C8c76A7aae7784D0B038b54c46",
        "0x8fdA1EAd2709923C058217B441EF5a5Bf09f4022",
        "0x8C25632048Fde94511Ba7DA5785CBfCa179f6b77",
        "0x85e0035eDF04cf36f074f5d24625B95C54636bc6",
        "0x8418626867183397355AFB3eBA16442c1eCC23c9",
        "0x82C46c62538533769642b7E8b9525F7754f6965f",
        "0x824914a506C5B6690Cb7B822eE46150fB16EE0A8",
        "0x814B283f07B26c13CFB1A31df0306475060018CC",
        "0x808985f7a7BB4202EB3c8E37719e8C9B3d36EDe7",
        "0x7d00F88Da8cB5f098f091FF50621A8C3Adc0B2E9",
        "0x7B3fc8884f69A30bea47013961E06c54fC003Ad3",
        "0x7b0F9B85Cb9B28FFAE9AE52EC578FB5102D7c922"
    ];


    // Define recipient percentages here
    // ex:   [100, 200, 300],
    const newPercentages = [
        26534,
        25575,
        23976,
        22378,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181,
        19181
    ];

    // Update Recipients Addresses and Percentages
    await contract.updateRecipients(newRecipients, newPercentages);
    console.log("Updated Recipients: ", new Date().toLocaleString());

    
    // Send the inital GANG to the contract for distributions
    await new Promise(resolve => setTimeout(resolve, 12000)); 

    console.log("Sending initial amount for distributions: ", new Date().toLocaleString());
    const transaction = {
        to: contract.getAddress(),
        value: ethers.parseEther("78200"),
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