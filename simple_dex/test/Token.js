const { ethers } = require('hardhat');
const { expect } = require('chai');

const tokens = (num) => {
    return ethers.utils.parseUnits(num.toString(), 'ether')
}

describe("Token", ()=> {
    let token, accounts, deployer, reciever

    beforeEach(async () => {
         // fetch token from blockchain
         const Token = await ethers.getContractFactory('Token')
         token = await Token.deploy('Viking Gold', 'VIKINGg', '1000000000')
         // fetch accounts
         accounts = await ethers.getSigners()
         deployer = accounts[0]
         reciever = accounts[1]
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

    describe('Sending Tokens', () => {
        let amount, transaction, result

        describe('Success', () => {

            beforeEach(async () => {
                // amount to send
                amount = tokens(100)
                // trasfer tokens
                transaction = await token.connect(deployer).transfer(reciever.address, amount)
                result = await transaction.wait()
            })
    
            it("trasfers token balances", async () => {
                // ensure that tokesn were transfered
                expect(await token.balanceOf(deployer.address)).to.equal(tokens(1000000000-100))
                expect(await token.balanceOf(reciever.address)).to.equal(amount)
            })
    
            it("emits a transfer Event", async () => {
                // ensure the Transfer event happens
                const eventLog = result.events[0]
                expect(eventLog.event).to.equal('Transfer')
    
                // ensure from =, to, and value from the event are correct
                const args = eventLog.args
                expect(args.from).to.equal(deployer.address)
                expect(args.to).to.equal(reciever.address)
                expect(args.value).to.equal(amount)
            })
        })

        describe('Failure', () => {
            it('rejects insufficient balances', async () => {
                // transfer more tokens than deployer has
                const invalidAmount = tokens(1000000000000)
                await expect(token.connect(deployer).transfer(reciever.address, invalidAmount)).to.be.reverted
            })

            it('reject invalid recipent', async () => {
                const amount = tokens(100)
                await expect(token.connect(deployer).transfer('0x0000000000000000000000000000000000000000', amount)).to.be.reverted
            })
        })

        
    })

   
})
