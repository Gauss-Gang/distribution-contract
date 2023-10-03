const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GANG Distribution Contract - Unit Testing", function () {
    let owner;
    let recipient1;
    let recipient2;
    let contract;

    beforeEach(async function () {
        [owner, recipient1, recipient2] = await ethers.getSigners();

        const GANGDistribution = await ethers.getContractFactory("GANGDistribution");
        contract = await GANGDistribution.deploy(100000, 10); // Replace with your desired initial values

        return {contract, owner, recipient1, recipient2};
    });


    async function calculateTotalPercentages() {
      const recipientPercentages = await contract.getRecipientPercentages();
  
      let totalPercentages = 0n;
  
      for (let i = 0; i < recipientPercentages.length; i++) {
        totalPercentages = totalPercentages + recipientPercentages[i];
      }
    
        return totalPercentages;
    }


    it("Should deploy with the correct initial values", async function () {
        expect(await contract.totalAirdropAmount()).to.equal(100000);
        expect(await contract.totalAirdropCount()).to.equal(10);
    });
    

    it("Should update recipients correctly", async function () {
        await contract.connect(owner).updateRecipients([recipient1.address, recipient2.address], [500000, 500000]);
        const recipientAddresses = await contract.getRecipientAddresses();
        const totalPercentages = await calculateTotalPercentages();
    
        expect(recipientAddresses[0]).to.equal(recipient1.address);
        expect(recipientAddresses[1]).to.equal(recipient2.address);
        expect(totalPercentages).to.equal(1000000); // Total percentages should sum up to 100%
    });


    it("Should not allow non-owner to update recipients", async function () {
        await expect(
          contract.connect(recipient1).updateRecipients([recipient1.address], [500000])
        ).to.be.revertedWith("Ownable: caller is not the owner");
    });
    

    it("Should airdrop GANG correctly", async function () {
      
      // Send Ether to the contract to simulate funds being added
      await owner.sendTransaction({
        to: contract.getAddress(),
        value: ethers.parseEther("1000"), // Replace with the desired amount
      });
      
      await contract.connect(owner).updateTotalAirdropCount(1);
      await contract.connect(owner).updateRecipients([recipient1.address, recipient2.address], [500000, 500000]);

      const initialRecipient1Balance = await ethers.provider.getBalance(recipient1.address);
      const initialRecipient2Balance = await ethers.provider.getBalance(recipient2.address);
    
      await contract.connect(owner).airdropGANG();

      const finalRecipient1Balance = await ethers.provider.getBalance(recipient1.address);
      const finalRecipient2Balance = await ethers.provider.getBalance(recipient2.address);
    
      // Ensure GANG was airdropped correctly
      expect(finalRecipient1Balance).to.equal((initialRecipient1Balance + ethers.parseEther("500")));
      expect(finalRecipient2Balance).to.equal((initialRecipient2Balance + ethers.parseEther("500")));
    });
    

    it("Should distribute all remaining GANG in a single batch", async function () {
      
      // Send Ether to the contract to simulate funds being added
      await owner.sendTransaction({
        to: contract.getAddress(),
        value: ethers.parseEther("1000"), // Replace with the desired amount
      });
      
      await contract.connect(owner).updateTotalAirdropCount(1);
      await contract.connect(owner).updateRecipients([recipient1.address, recipient2.address], [500000, 500000]);

      const initialRecipient1Balance = await ethers.provider.getBalance(recipient1.address);
      const initialRecipient2Balance = await ethers.provider.getBalance(recipient2.address);
    
      await contract.connect(owner).distributeAllRemainingGANG();

      const finalRecipient1Balance = await ethers.provider.getBalance(recipient1.address);
      const finalRecipient2Balance = await ethers.provider.getBalance(recipient2.address);
    
      // Ensure GANG was airdropped correctly
       expect(finalRecipient1Balance).to.equal((initialRecipient1Balance + ethers.parseEther("500")));
      expect(finalRecipient2Balance).to.equal((initialRecipient2Balance + ethers.parseEther("500")));
    });
        
      
    it("Should not allow airdrop when all airdrops have been completed", async function () {
        await contract.connect(owner).updateRecipients([recipient1.address], [1000000]);
    
        // Airdrop all available batches
        for (let i = 0; i < 10; i++) {
          await contract.connect(owner).airdropGANG();
        }
    
        // Attempt another airdrop
        await expect(
          contract.connect(owner).airdropGANG()
        ).to.be.revertedWith("All airdrops have been completed.");
    });
    
      
    it("Should not allow distribution when all airdrops have been completed", async function () {
        await contract.connect(owner).updateRecipients([recipient1.address], [1000000]);
    
        // Airdrop all available batches
        for (let i = 0; i < 10; i++) {
          await contract.connect(owner).airdropGANG();
        }
    
        // Attempt distribution of remaining GANG
        await expect(
          contract.connect(owner).distributeAllRemainingGANG()
        ).to.be.revertedWith("All airdrops have been completed.");
    });
    

    it("Should revert when trying to airdrop GANG without recipients", async function () {
        await expect(
          contract.connect(owner).airdropGANG()
        ).to.be.revertedWith("No recipients to airdrop GANG to.");
    });
    

    it("Should revert when trying to distribute remaining GANG without recipients", async function () {
        await expect(
          contract.connect(owner).distributeAllRemainingGANG()
        ).to.be.revertedWith("No recipients to distribute remaining GANG to.");
    });
    

    it("Should revert when updating recipients with mismatched arrays", async function () {
        await expect(
          contract.connect(owner).updateRecipients([recipient1.address], [500000, 500000])
        ).to.be.revertedWith("Number of addresses and percentages should match.");
    });
    
    
    it("Should revert when updating recipients with zero percentages", async function () {
        await expect(
          contract.connect(owner).updateRecipients([recipient1.address], [0])
        ).to.be.revertedWith("Percentage must be greater than 0.");
    });
    
    
    it("Should revert when updating recipients with percentages exceeding 100%", async function () {
        await expect(
          contract.connect(owner).updateRecipients([recipient1.address], [1000001])
        ).to.be.revertedWith("Percentage cannot exceed 100%.");
    });
    
    
    it("Should revert when non-owner tries to pause the contract", async function () {
        await expect(
          contract.connect(recipient1).pause()
        ).to.be.revertedWith("Ownable: caller is not the owner");
    });
    
    
    it("Should revert when non-owner tries to unpause the contract", async function () {
        await contract.connect(owner).pause(); // Pause the contract first
        await expect(
          contract.connect(recipient1).unpause()
        ).to.be.revertedWith("Ownable: caller is not the owner");
    });
    
    
    it("Should revert when non-owner tries to withdraw ERC20 tokens", async function () {
        await expect(
          contract.connect(recipient1).withdrawERC20(recipient2.address, owner.address)
        ).to.be.revertedWith("Ownable: caller is not the owner");
    });
});