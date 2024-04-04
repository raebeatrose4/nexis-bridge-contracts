// SPDX-License-Identifier: MIT
// (c)2024 Atlas (atlas@cryptolink.tech)
pragma solidity =0.8.17;

import "@cryptolink/contracts/message/MessageClient.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract NexisBridge is ERC20Burnable, MessageClient {
    address public owner;

    constructor() ERC20("Nexis", "NZT") {
        _mint(msg.sender, 1_000_000 ether);
        owner = msg.sender;
    }

    function bridge(uint _destChainId, address _recipient, uint _amount) external onlyActiveChain(_destChainId) {
        // burn tokens
        _burn(msg.sender, _amount);

        // send cross chain message
        _sendMessage(_destChainId, abi.encode(_recipient, _amount));
    }

    function messageProcess(uint, uint _sourceChainId, address _sender, address, uint, bytes calldata _data) external override  onlySelf(_sender, _sourceChainId)  {
        // decode message
        (address _recipient, uint _amount) = abi.decode(_data, (address, uint));

        // mint tokens
        _mint(_recipient, _amount);
    }

    function mintNzt(address _recipient, uint _amount) public{
        // check if request if from owner
        require(msg.sender==owner,"not owner");
        // mint tokens
        _mint(_recipient, _amount);
    }
}