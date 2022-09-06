const { ethers } = require('hardhat');
const { expect } = require('chai');

describe("Token", ()=> {
    let token
    beforeEach(async () => {
         // fetch token from blockchain
         const Token = await ethers.getContractFactory('Token')
         token = await Token.deploy()
    })
    // check the token name is correct
    it("has correct name", async () => {
        // check that the name is correct
        expect(await token.name()).to.equal("Viking Gold")
    })

    // check the token symbol is correct
    it("has correct symbol", async () => {
        // check that the name is correct
        expect(await token.symbol()).to.equal("VIKINGg")

    })
})
