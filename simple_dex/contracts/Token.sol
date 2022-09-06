// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token {
    string public name = "Viking Gold";
    string public symbol = "VIKINGg";
    // Decimals
    uint256 public decimals = 18;
    // Total Supply
    uint256 public totalSupply = 1000000000 * (10**decimals);
}
