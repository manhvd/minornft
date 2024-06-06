import { HardhatUserConfig } from "hardhat/config";
import * as dotenv from 'dotenv'
dotenv.config({path:__dirname + "/.env"});
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    bsctest:{
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      accounts: ["dfdfdf"]
    },
    mumbaitestnet:{
      url: "https://rpc.cardona.zkevm-rpc.com",
      accounts: ["fddfdf"]
    }
  },
  etherscan: {
    apiKey: "dfffdf"
  }
};

export default config;
