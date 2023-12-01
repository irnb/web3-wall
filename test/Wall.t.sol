// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/Wall.sol";

contract WallTest is Test {
    Wall public wall;

    struct PinedMessage {
        uint256 messageId;
        uint256 validUntilBlock;
        address pinedBy;
    }

    function setUp() public {
        uint64 _pinThresholdAuthorityCount = 3;
        uint64 _pinDurationBlockCount = 30;
        uint64 _pinFee = 1000000;
        
        wall = new Wall(
            _pinThresholdAuthorityCount,
            _pinDurationBlockCount,
            _pinFee
        );
    }

    function testPostMessage() public {
        address sender = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
        string memory message = "Hello World!";
        vm.prank(sender);
        wall.postMessage(message, "testURI");
        assertEq(wall.messageCount(), 1);
        assertEq(wall.tokenURI(1), "testURI");
        assertEq(wall.ownerOf(1), sender);
        assertEq(wall.balanceOf(sender), 1);
        assertEq(wall.messages(1), message);
    }

    function testFailPinMessage() public {
        vm.prank(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);

        wall.pinMessage(10);
    }

    function testPinMessage() public {
        address sender = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
        string memory message = "Hello World!";
        vm.prank(sender);
        wall.postMessage(message, "testURI");

        wall.pinMessage{value: 1000000}(1);
        assertEq(wall.pinedMessageCount(), 1);
        PinedMessage memory expected = PinedMessage(1, block.number + 30, sender);
        (uint256 messageId, uint256 validUntilBlock, address pinedBy) = wall.pinedMessages(1);
        PinedMessage memory actual = PinedMessage(messageId, validUntilBlock, pinedBy);


        assertEq(expected.messageId, actual.messageId);
    }

    
    


}