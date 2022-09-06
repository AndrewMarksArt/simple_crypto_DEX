const { ethers } = require('hardhat');
const { expect } = require('chai');

describe("Token", ()=> {
    //test go inside here
    it("has a nme", async () => {
        // fetch token from blockchain
        const Token = await ethers.getContractFactory('Token')
        let token = await Token.deploy()
        // read toekn name
        const name = await token.name()
        // check that the name is correct
        expect(name).to.equal("My Token")

    })
})
