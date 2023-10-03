const hre = require("hardhat");

async function main() {

    const [distributionWallet] = await ethers.getSigners();
    console.log("Interacting with the account:", distributionWallet.address);

    const distributionWalletAddress = distributionWallet.address; // Replace with the Distribution Wallet Address
    
    // Adjust the delay time (in milliseconds) as needed between batches
    const delayMilliseconds = 6000;

    // Define your recipient addresses here
    // ex:   ["0xAddress1", "0xAddress2", "0xAddress3"],
    const batchAddresses = [
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
    ]

    // Define recipient amounts here
    // ex:   [100, 200, 300]
    const batchAmounts = [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1
    ]

    // Manually set gas price and gas limit
    const gasPrice = 0;
    const gasLimit = 21000;


    // Check if the account has enough GANG to cover transactions
    var totalDistributionAmount = 0;
    
    for (let i=0; i < batchAmounts.length; i++) {
        totalDistributionAmount = totalDistributionAmount + batchAmounts[i];
    }

    async function getWalletBalance() {
        return await ethers.provider.getBalance(distributionWalletAddress)
    }


    if (totalDistributionAmount <= await getWalletBalance()) {

        if (batchAddresses.length == batchAmounts.length) {
            for (let i = 0; i < batchAddresses.length; i++) {
        
                try {
                    console.log(`Sending ${batchAmounts[i].toString()} GANG to ${batchAddresses[i]}`);
                    const tx = await distributionWallet.sendTransaction({
                        to: batchAddresses[i],
                        value: batchAmounts[i]
                    //    gasPrice: gasPrice,
                    //    gasLimit: gasLimit,
                    });

                    await tx.wait();
                    console.log(`Transaction hash: ${tx.hash}`);
                    await new Promise(resolve => setTimeout(resolve, delayMilliseconds));
                } 
                catch (error) {
                    console.error(`Error sending GANG to ${batchAddresses[i]}: ${error.message}`);
                }
            }
        }
    }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });