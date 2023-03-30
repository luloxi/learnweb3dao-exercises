const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
const { CRYPTODEVS_NFT_CONTRACT_ADDRESS } = require("../constants");

// const CRYPTODEVS_NFT_CONTRACT_ADDRESS =
//   "0xB2631A785b0766b1bF2518F50731eAEfe1D26FaC";

async function main() {
  const cryptodevsNftContractAddress = CRYPTODEVS_NFT_CONTRACT_ADDRESS;
  // Deploy the FakeNFTMarketplace contract first
  const FakeNFTMarketplace = await ethers.getContractFactory(
    "FakeNFTMarketplace"
  );
  const fakeNftMarketplace = await FakeNFTMarketplace.deploy();
  // console.log(
  //   `Deployed to ${fakeNftMarketplace.address} and waiting for confirmation!`
  // );
  await fakeNftMarketplace.deployed();
  console.log("Deployed!");

  console.log("FakeNFTMarketplace deployed to: ", fakeNftMarketplace.address);

  // Now deploy the CryptoDevsDAO contract
  const CryptoDevsDAO = await ethers.getContractFactory("CryptoDevsDAO");
  const cryptoDevsDAO = await CryptoDevsDAO.deploy(
    fakeNftMarketplace.address,
    cryptodevsNftContractAddress,
    {
      // This assumes your account has at least 1 ETH in it's account
      // Change this value as you want
      value: ethers.utils.parseEther("0.1"),
    }
  );
  await cryptoDevsDAO.deployed();

  console.log("CryptoDevsDAO deployed to: ", cryptoDevsDAO.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
