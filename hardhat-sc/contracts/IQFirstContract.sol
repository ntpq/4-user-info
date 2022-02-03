// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

contract IQFirstContract {
  struct Message {
    string name;
    address theAddress;
    uint256 timestamp;
  }

  Message[] public AllMessage;

  function addMessage(string memory name) public {
    uint256 timestamp = block.timestamp; // Current block timestamp
    address sender = msg.sender; // address of the caller
    AllMessage.push(Message(name, sender, timestamp));
  }

  function getAllMessage() public view returns (Message[] memory) {
    return AllMessage;
  }
}
