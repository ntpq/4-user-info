// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

contract UserInformation {
    struct User {
        string firstname;
        string lastname;
        string email;
    }

    User[] private users;

    function getAllUsers() public view returns (User[] memory) {
        return users;
    }

    function getUser(uint256 idx) public view returns (User memory) {
        require(idx < users.length);
        return users[idx];
    }

    function getLength() public view returns (uint256) {
        return users.length;
    }

    function addUser(
        string memory firstname,
        string memory lastname,
        string memory email
    ) public {
        users.push(User(firstname, lastname, email));
    }

    function removeUser(uint256 idx) public {
        require(idx < users.length);
        users[idx] = users[users.length - 1];
        users.pop();
    }
}
