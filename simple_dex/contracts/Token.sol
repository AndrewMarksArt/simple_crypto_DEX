// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token {
    string public name;
    string public symbol;
    uint256 public decimals = 18;
    uint256 public totalSupply;

    // track balances
    mapping (address => uint) public balanceOf;

    constructor(string memory _name, string memory _symbol, uint256 _totalSupply) {
        name = _name;
        symbol =  _symbol;
        totalSupply = _totalSupply * (10**decimals);
        balanceOf[msg.sender] = totalSupply;
    }

    // send tokens
    function transfer(address _to, uint256 _value)
        public
        returns (bool success) 
    {
        // deduct tokens from sender
        balanceOf[msg.sender] = balanceOf[msg.sender] - _value;
        // credit tokens to reciever
        balanceOf[_to] = balanceOf[_to] + _value;
    }
}
