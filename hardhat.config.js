require("@nomicfoundation/hardhat-toolbox");

const { mnemonic } = require('./secrets.json');

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: {
    version: "0.8.19"
  },
  networks: {
    gaussTestnet: {
      url: "http://10.0.0.24:8554/",
      chainId: 1452,
      accounts: {mnemonic: mnemonic}
    },
    gaussMainnet: {
      url: "https://rpc.gaussgang.com",
      chainId: 1777,
      accounts: {mnemonic: mnemonic}
    },
    hardhat: {
      chainId: 1452,
      gas: 21000,
      gasPrice: 0,
      accounts: {
        count: 10, // Number of accounts to generate
        initialIndex: 0, // Index to start the numbering
        mnemonic: mnemonic,
        accountsBalance: "2000000000000000000000000", // 2000000 ETH in Wei
      }
    }
  }
};