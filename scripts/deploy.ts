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
  const MinorNFT = await ethers.getContractFactory("MinorNFT");
  const minorNFT = await MinorNFT.deploy('NFT01 of Manh','MinorNFT');
  await minorNFT.mint('https://ipfs.io/ipfs/QmXmavxP9nTZ6o7bjhdjERjmbzy9RdKpZZAwMmnAH1sjK5');
  Config.setConfig(network + '.MinorNFT', minorNFT.address);

  await Config.updateConfig();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
