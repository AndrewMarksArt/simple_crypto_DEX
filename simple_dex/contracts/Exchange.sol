// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Token.sol";

/* 
Check list of work to be completed and functionality to add
1. Deposit Tokens
2. Withdraw Tokens
3. Check Balances
4. Make Orders
5. Cancel Orders
6. Fill Orders
7. Charge Fees
8. Track Fee Account
*/

contract Exchange {
    address public feeAccount;
    uint256 public feePercent;

    constructor(address _feeAccount, uint256 _feePercent) {
        feeAccount = _feeAccount;
        feePercent = _feePercent;
    }

    // Deposit Tokens
    function depositToken(address _token, uint256 _amount)  public {
        // transfer tokens to exchange
        Token(_token).transferFrom(msg.sender, address(this), _amount);
        // update user balances
        // emit an event
    }
    // Check Balances
}
