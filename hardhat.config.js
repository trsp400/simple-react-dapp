require("@nomiclabs/hardhat-waffle");
require("dotenv").config({
  path: ".env",
});

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.3",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/00b1046ecd63435f9f4a055e742c2e0d",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};
