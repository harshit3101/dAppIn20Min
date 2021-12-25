// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.2;

contract Storage {
    string public value;

    constructor() {
        value = "test";
    }

    function setValue(string memory val) public {
        value = val;
    }

    function retrieve() public view returns (string memory){
        return value;
    }
}