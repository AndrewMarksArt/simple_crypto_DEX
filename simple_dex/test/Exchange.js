const { ethers } = require('hardhat');
const { expect } = require('chai');

const tokens = (num) => {
    return ethers.utils.parseUnits(num.toString(), 'ether')
}

describe("Exchange", ()=> {
    let deployer, feeAccount, exchange

    const feePercent = 1

    beforeEach(async () => {
        const Exchange = await ethers.getContractFactory('Exchange')
        const Token = await ethers.getContractFactory('Token')

        token1 = await Token.deploy('Viking Gold', 'VIKINGg', '1000000000')

         accounts = await ethers.getSigners()
         deployer = accounts[0]
         feeAccount = accounts[1]
         user1 = accounts[2]

         let transaction = await token1.connect(deployer).transfer(user1.address, tokens(100))
         await transaction.wait()
         
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

    describe('Depositing Tokens', () => {
        let transaction, result
        let amount = tokens(10)

        beforeEach(async () => {
            // approve token
            transaction = await token1.connect(user1).approve(exchange.address, amount)
            result = await transaction.wait()
            // deposit token
            transaction = await exchange.connect(user1).depositToken(token1.address, amount)    
            result = await transaction.wait()
        })

        describe('Success', () => {
            it('tracks the token deposit', async () => {
                expect(await token1.balanceOf(exchange.address)).to.equal(amount)
            })
        })

        describe('Failure', () => {

        })
    })

})