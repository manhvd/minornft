import { HardhatUserConfig } from "hardhat/config";
import * as dotenv from 'dotenv'
dotenv.config({path:__dirname + "/.env"});
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    bsctest:{
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      accounts: [process.env.PRI_KEY]
    },
    mumbaitestnet:{
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRI_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.BSC_TEST_API_KEY
  }
};

export default config;
