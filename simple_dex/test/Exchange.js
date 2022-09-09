const { ethers } = require('hardhat');
const { expect } = require('chai');

const tokens = (num) => {
    return ethers.utils.parseUnits(num.toString(), 'ether')
}

describe("Exchange", ()=> {
    let deployer, feeAccount, exchange, accounts

    const feePercent = 1

    beforeEach(async () => {
         accounts = await ethers.getSigners()
         deployer = accounts[0]
         feeAccount = accounts[1]

         const Exchange = await ethers.getContractFactory('Exchange')
         exchange = await Exchange.deploy(feeAccount.address, feePercent)
         
    })

    describe('Deployment', () => {

        it("it tracks the fee account", async () => {
            expect(await exchange.feeAccount()).to.equal(feeAccount.address)
        })

        it("it tracks the fee percent", async () => {
            expect(await exchange.feePercent()).to.equal(feePercent)
        })
    })

})