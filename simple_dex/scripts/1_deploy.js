const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
    // get contract to deploy
    const Token = await ethers.getContractFactory("Token")

    // deploy contract
    const token = await Token.deploy()
    await token.deployed()
    console.log(`Token Deployed to: ${token.address}`)
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
