// This Script handles Distributing GANG to the Team using the GANGDistribution Contract
const { ethers } = require("hardhat");

async function main() {

    // Following code is to use the contract at the deployed address.
    const deployedAddress = "0x9a78D4E7967857B76C4163aef2877C7AB14F2F88"; // Replace with the actual contract address
    const GANGDistribution = await ethers.getContractFactory("GANGDistribution");
    const contract = await GANGDistribution.attach(deployedAddress);
   
    const [owner] = await ethers.getSigners();
    console.log("Interacting with contracts with the account:", owner.address);


    // Define your recipient addresses here
    // ex:   ["0xAddress1", "0xAddress2", "0xAddress3"], // List 1: Addresses
    const newRecipients = [
        "0x377AC2A3adA0952e54F538e51865DfC5FABcAEd7",
        "0xE066dA3d20735948FFCd9D584D5918a51a1f9F6C",
        "0x3e2B020BD116b33D69771F745ec989adDCF63849",
        "0xaD485B130deFBD384E54DAC47e8651EC1bb2bd7f",
        "0x2310a349E1936b6eFf35e2faf3e4f981C4f16365",
        "0x14d475a64d57fa7c941319fdf3ea52a2e94f767e",
        "0xf1bF108E81DD7257D491a6cd2575156B8afe25cB",
        "0xCD2e2cAc4961DA4020a346e63b7ccffF25d99791",
        "0x7F1DCdb5adBcce0e19e65ED0E3f65B6c4EA7986E",
        "0x049CC7022a82015C408C69407Fe833897A687B25",
        "0x2F6F40da6DBA834D6Ab6f62a93bC606733737Fd5",
        "0xFC110131F24c3cD7094FAf9E51635a22Be30D8A0",
        "0xeAE1323B2aCcc6DEE36fAa34e52Ba2faF6D62566",
        "0x896762ae02A74F1ed452D00A356c8144CE4Ef4f2",
        "0xf5908c56FB645ED954bD26c784F4A1439ebF4dB8",
        "0xeF0DB78BcdC50651864B71e6324b08569477B80a",
        "0xe38c39c63b20Fc130bA179f18939778a0EC9E581",
        "0xdF721168aba9E53fd440c650Fc960F6A616592F9",
        "0xDC5b5CA71e53fd2672D46e26b7A949DffD933246",
        "0xC19b22945fb4CEe4FFA784ac0187B4a5c91D2B38",
        "0xbbfa0a6db68bC4Dd4D443f1E161702D747923E22",
        "0xBA3614e031EfCF5e7D841b9014108Eb9014f110c",
        "0xAb771BE5Df69b8f5820bC44F2dF14cFf04Ea90A3",
        "0xa3f0416e7aa28342bc241f9e1Bbc5C4C8c646E39",
        "0x9Ec8CdAC8F8833B1895578e7f8dfcAE02E2503F5",
        "0x978C94F0aAbEb9609AAf3C6a0e668F3e49981dF0",
        "0x8C6377fa24786CdA16Fdc68566CCca68A55fF09B",
        "0x897Ba4a9385F101a737f3E508eA347Ef28DA4B97",
        "0x81116984aD9938202E1a45A6057C2fc872aDaa29",
        "0x7dA576e5AEA2eFF590b0621927B58d6C9d7B8A2c",
        "0x6Fb8d531294Cdd7D664D25589917196975444310",
        "0x6D469BE4Dc8DA9aA7AF735D5E097A458dfeffb19",
        "0x693145eeAFd4096334577263Fb7e6A33A28d2861",
        "0x6290408C3Aa8F323FD9a059DDfdc625458FE07c2",
        "0x5959b0D9d9f7995747582E66E9A42D69ae356FBC",
        "0x57a8E5FC7B79E9eF99d6964ED80639ea2c8993f2",
        "0x53668Bc34Ee6716D09C66Dc99ED1cBd64c44a160",
        "0x642A395777E11032F68bF1503100320B09ac5ae7",
        "0x28984CCE11c0950C26FfF1c377cC795815493E00",
        "0x2425756033EF4F7315107d7CbeAdD65aAB26FC7d",
        "0xD421B58af6e1DdEc7d0C0c3ACeE67EDeD59FAE84",
        "0x2f587A25f56F5aaf30cE5213f0d3870699916881",
        "0xe575c21aD65adCbCb1df8d805C9E3004f78C3A1E",
        "0x5AeF6343324e0441315a9C96946f828F90C8626f",
        "0x4B45AF7CA432065533CC5243C41B3eBf1F9Fa702",
        "0x61d2B74b491c45bc6C694BA8d5B398e4c55e915F",
        "0xF06b4EB15Ae807E822022D5432a7F06a100e6AD4",
        "0x843766ba62FB95Ee77b5132bCaE8746dE56ECFF8",
        "0xE804558d4b31b7D05f567ae200cEE98a7364E0A8",
        "0xb86dD34283457e9aF9AB12f03e434858BDbdA916",
        "0xb728c346cb6076F28c09724893457EbE9C8BAee3",
        "0xa1090738b0Af70A60a62a19De9aAE0D9639EAf64",
        "0x824dbDB7a4411eCf31A4258b22CDa93E983c6DBC",
        "0x7212c5027D40AF7a2b2f93Ea38498be7Bc7E7DFc",
        "0x68Af36cE3670FeC12ce53dbc8efbdE3Ab87a96f3",
        "0x60fa9AF30Aecfc7D27d093A4160174Ef94C50d2c",
        "0x579a995A6e4FD1138E879E85Ce45455EA1B0547D",
        "0x501520041Cd2C1Ea37A82b14A903C2F388F9Cb2e",
        "0x2385233abb910357e2b97A16D40e0443e53d0769",
        "0x207250D8222881750017b43800330Bdb098B7013",
        "0x20266F5bC7a5639Ef7A570456E5047CE18714eF9",
        "0x06b6b236C095e477C61bDdA545a2b6Db12881Ec5",
        "0xAdbB5096EF9d2f7307B7CfD3f9CBE9e889Fa6384"
    ];


    // Define recipient percentages here
    // ex:   [100, 200, 300],
    const newPercentages = [
        44238,
        38608,
        38608,
        32173,
        32173,
        24151,
        24130,
        24130,
        24130,
        22521,
        20912,
        19304,
        19304,
        17695,
        16086,
        16086,
        16086,
        16086,
        16086,
        16086,
        16086,
        16086,
        16086,
        16086,
        16086,
        16086,
        16086,
        16086,
        16086,
        16086,
        16086,
        16086,
        16086,
        16086,
        16086,
        16086,
        16086,
        14478,
        14478,
        14478,
        12735,
        12065,
        11260,
        11260,
        11260,
        9652,
        8043,
        8043,
        8043,
        8043,
        8043,
        8043,
        8043,
        8043,
        8043,
        8043,
        8043,
        8043,
        8043,
        8043,
        8043,
        8043,
        7560
    ];

    // Update Recipients Addresses and Percentages
    await contract.updateRecipients(newRecipients, newPercentages);
    console.log("Updated Recipients: ", new Date().toLocaleString());
    
    
    // Send the inital GANG to the contract for distributions
    await new Promise(resolve => setTimeout(resolve, 12000)); 

    console.log("Sending initial amount for distributions: ", new Date().toLocaleString());
    const transaction = {
        to: contract.getAddress(),
        value: ethers.parseEther("932445"),
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