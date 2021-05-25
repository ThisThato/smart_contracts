// SPDX-License-Identifier: MIT
pragma solidity 0.8.1;

contract Quote {
    string private message;
    address public owner;

    mapping(address => bool) public whitelist;

    constructor() {
        owner = msg.sender;
        whitelist[msg.sender] = true;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner");
        _;
    }

    modifier onlyWhitelist {
        require(whitelist[msg.sender] == true, "Only whitelist");
        _;
    }

    function setQuote(string memory _message) public onlyWhitelist {
        message = _message;
    }

    function getQuote() public view returns (string memory) {
        return message;
    }

    function addMember(address _member) public onlyOwner {
        whitelist[_member] = true;
    }

    function removeMember(address _member) public onlyOwner {
        whitelist[_member] = false;
    }
}
