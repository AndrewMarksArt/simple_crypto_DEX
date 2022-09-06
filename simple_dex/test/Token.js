const { ethers } = require('hardhat');
const { expect } = require('chai');

const tokens = (num) => {
    return ethers.utils.parseUnits(num.toString(), 'ether')
}

describe("Token", ()=> {
    let token
    beforeEach(async () => {
         // fetch token from blockchain
         const Token = await ethers.getContractFactory('Token')
         token = await Token.deploy('Viking Gold', 'VIKINGg', '1000000000')
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

    // check it has the correct number of decimals
    it("has correct decimals", async () => {
        // check that the name is correct
        expect(await token.decimals()).to.equal("18")

    })

    // check the total supply is correct
    it("has correct total supply", async () => {
        expect(await token.totalSupply()).to.equal(tokens('1000000000'))

    })
})
