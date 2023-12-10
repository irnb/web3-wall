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
        uint64 _pinXpReward = 100;
        
        wall = new Wall(
            _pinThresholdAuthorityCount,
            _pinDurationBlockCount,
            _pinFee,
            _pinXpReward
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
        vm.startPrank(sender);
        vm.deal(sender, 100 ether);
        wall.postMessage(message, "testURI");

        wall.pinMessage{value: 1000000}(1);

        vm.stopPrank();
        assertEq(wall.pinedMessageCount(), 1);
        PinedMessage memory expected = PinedMessage(1, block.number + 30, sender);
        (uint256 messageId, uint256 validUntilBlock, address pinedBy) = wall.pinedMessages(1);
        PinedMessage memory actual = PinedMessage(messageId, validUntilBlock, pinedBy);


        assertEq(expected.messageId, actual.messageId);
        assertEq(expected.validUntilBlock, actual.validUntilBlock);
        assertEq(expected.pinedBy, actual.pinedBy);
        assertEq(address(wall).balance, 1000000);
    }

    function testPinMessageWithReputation() public {
        address sender = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
        string memory message1 = "Hello World!";
        string memory message2 = "Hello World!";
        string memory message3 = "Hello World!";

        vm.startPrank(sender);
        vm.deal(sender, 100 ether);
        wall.postMessage(message1, "testURI1");
        wall.postMessage(message2, "testURI2");
        wall.postMessage(message3, "testURI3");

        wall.pinMessage(1);

        vm.stopPrank();


        assertEq(wall.pinedMessageCount(), 1);
        PinedMessage memory expected = PinedMessage(1, block.number + 30, sender);
        (uint256 messageId, uint256 validUntilBlock, address pinedBy) = wall.pinedMessages(1);
        PinedMessage memory actual = PinedMessage(messageId, validUntilBlock, pinedBy);

        assertEq(expected.messageId, actual.messageId);
        assertEq(expected.validUntilBlock, actual.validUntilBlock);
        assertEq(expected.pinedBy, actual.pinedBy);


    }

    
    


}