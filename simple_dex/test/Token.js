const { ethers } = require('hardhat');
const { expect } = require('chai');

const tokens = (num) => {
    return ethers.utils.parseUnits(num.toString(), 'ether')
}

describe("Token", ()=> {
    let token, accounts, deployer

    beforeEach(async () => {
         // fetch token from blockchain
         const Token = await ethers.getContractFactory('Token')
         token = await Token.deploy('Viking Gold', 'VIKINGg', '1000000000')
         // fetch accounts
         accounts = await ethers.getSigners()
         deployer = accounts[0]
    })

    describe('Deployment', () => {
        const name = 'Viking Gold'
        const symbol = 'VIKINGg'
        const decimals = '18'
        const totalSupply = '1000000000'

        it("has correct name", async () => {
            expect(await token.name()).to.equal(name)
        })

        it("has correct symbol", async () => {
            expect(await token.symbol()).to.equal(symbol)
        })

        it("has correct decimals", async () => {
            expect(await token.decimals()).to.equal(decimals)
        })

        it("has correct total supply", async () => {
            expect(await token.totalSupply()).to.equal(tokens(totalSupply))
        })

        it('assigns total supply to deployer', async () => {
            expect(await token.balanceOf(deployer.address)).to.equal(tokens(totalSupply))
        })
    })

   
})
