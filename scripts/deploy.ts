import { ethers,hardhatArguments } from "hardhat";
import * as Config from "./config"
async function main() {
  await Config.initConfig();
  const network = hardhatArguments.network ? hardhatArguments.network : 'dev';
  const [deployer] = await ethers.getSigners();
  console.log('deploy from address: ', deployer.address);
  
  //Deploy ERC721
  // const ERC721 = await ethers.getContractFactory("ERC721");
  // const eRC721 = await ERC721.deploy();
  // Config.setConfig(network + '.ERC721', eRC721.address);

  //Deploy MinorNFT
  // const MinorNFT = await ethers.getContractFactory("MinorNFT");
  // const minorNFT = await MinorNFT.deploy('NFT01 of Manh','MinorNFT');
  // await minorNFT.mint('https://ipfs.io/ipfs/QmXmavxP9nTZ6o7bjhdjERjmbzy9RdKpZZAwMmnAH1sjK5');
  // Config.setConfig(network + '.MinorNFT', minorNFT.address);

//Deploy LoyNFT
// const LoyNFT = await ethers.getContractFactory("LoyNFT");
// const loyNFT = await LoyNFT.deploy();
// console.log('LoyNFT address: ', loyNFT.address);
// Config.setConfig(network + '.LoyNFT', loyNFT.address);

const demoNFTSBTContract = await ethers.getContractFactory("SBTDemo");
const demoNFTSBT = await demoNFTSBTContract.deploy("SBT02 for test","SBT02");
console.log('SBT02 address: ', demoNFTSBT.address);
Config.setConfig(network + '.SBT02', demoNFTSBT.address);

  await Config.updateConfig();
  demoNFTSBT.mint("https://ipfs.io/ipfs/QmaDXGyzzg8WNxKVkMaPSEaDhsirdZ24p1nqxeeX7pqqCZ");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
