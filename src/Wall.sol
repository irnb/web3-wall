// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/*
    ⣐⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣤⣶⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⣿⣅⡠⠃⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠈⢻⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⢹⣿⣇⡀⠀⠀⠀⢀⣤⣤⣤⣾⣿⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀
    ⢸⣿⣿⣷⡀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣶
    ⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣤⡀⠀⠀⠀⣀⣀⣤⣾
    ⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇
    ⠀⠀⠉⠙⠉⠉⠁⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⣿⣿⣿⠟⠋⠁⠀⠀

 Wall Smart Contract
 
 This is a smart contract for a decentralized message board called "Web3 Wall", where users can post messages.
 Each message is minted as an ERC721 token. Messages can be "pinned" to the wall for a certain amount of blocks.
 This contract is built with OpenZeppelin contracts ERC721, Ownable2Step and Pausable.
 
 Developed by: irnb
 Date: 12/01/2023
 */

contract Wall is ERC721, Ownable2Step, Pausable {
    // State Variables
    uint256 public messageCount = 0;
    uint256 public pinedMessageCount = 0;

    mapping(uint256 => string) public messages;
    mapping(uint256 => PinedMessage) public pinedMessages;
    mapping(uint256 => string) private _tokenURIs;

    uint64 public pinThresholdAuthorityCount;
    uint64 public pinDurationBlockCount;
    uint64 public pinFee;

    // Structs
    struct MessageReturn {
        string message;
        address postedBy;
        uint256 tokenID;
        string tokenURI;
    }

    struct PinedMessage {
        uint256 messageId;
        uint256 validUntilBlock;
        address pinedBy;
    }

    // Events
    // Modifiers

    // Constructor
    constructor(
        uint64 _pinThresholdAuthorityCount,
        uint64 _pinDurationBlockCount,
        uint64 _pinFee
    ) ERC721("Web3 Wall NFT", "FWT") Ownable(msg.sender) Pausable() {
        pinThresholdAuthorityCount = _pinThresholdAuthorityCount;
        pinDurationBlockCount = _pinDurationBlockCount;
        pinFee = _pinFee;
    }

    // Fallback/Receive Functions

    // External Functions


    /**
    * @dev This function allows a user to post a message on the wall.
    * Each message is associated with minted ERC721 token.
    * The function is only allowed to be called when the contract is not paused.
    * @param _message The message that the user wants to post.
    * @param _tokenURI The URI for the token to be minted.
    */
    function postMessage(
        string calldata _message,
        string calldata _tokenURI
    ) external whenNotPaused {
        messageCount++;
        messages[messageCount] = _message;

        _mintNFT(msg.sender, _tokenURI);
    }

    /**
    * @dev This function allows a user to pin a message on the wall.
    * Each pinned message is stored with details such as the block number until it is valid and the address of the pinner.
    * The function is only allowed to be called when the contract is not paused.
    * The user must either own a certain number of tokens (pinThresholdAuthorityCount) or pay a fee (pinFee) to pin a message.
    * @param _messageId The ID of the message that the user wants to pin.
    */
    function pinMessage(uint256 _messageId) external payable whenNotPaused {
        pinedMessageCount++;
        require(_messageId <= messageCount, "Message does not exist");
        bool eligible = false;

        if (balanceOf(msg.sender) >= pinThresholdAuthorityCount) {
            eligible = true;
        } else {
            require(msg.value >= pinFee, "Insufficient fee");
            eligible = true;
        }
        require(eligible, "Not eligible to pin message");

        pinedMessages[pinedMessageCount] = PinedMessage(
            _messageId,
            block.number + pinDurationBlockCount,
            msg.sender
        );
    }

    function adminPinMessage(uint256[] memory _messageIds) external onlyOwner {
        for (uint256 i = 0; i <= _messageIds.length; i++) {
            pinedMessageCount++;
            uint256 _messageId = _messageIds[i];
            require(_messageId < messageCount, "Message does not exist");

            pinedMessages[pinedMessageCount] = PinedMessage(
                _messageId,
                block.number + pinDurationBlockCount,
                address(this)
            );
        }
    }

    function changePinPolicy(
        uint64 _pinThresholdAuthorityCount,
        uint64 _pinDurationBlockCount,
        uint64 _pinFee
    ) external onlyOwner {
        pinThresholdAuthorityCount = _pinThresholdAuthorityCount;
        pinDurationBlockCount = _pinDurationBlockCount;
        pinFee = _pinFee;

        messages[messageCount] = "Welcome to Web3 Wall!";
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    // Public Functions

    function tokenURI(
        uint256 _tokenId
    ) public view override returns (string memory) {
        return _tokenURIs[_tokenId];
    }

    function paginationPinedMessages(
        uint256 _page,
        uint256 _pageSize
    ) public view returns (PinedMessage[] memory) {
        uint256 _offset = _page * _pageSize;
        uint256 _limit = _offset + _pageSize;
        if (_limit > pinedMessageCount) {
            _limit = pinedMessageCount;
        }
        uint256 _size = _limit - _offset;
        PinedMessage[] memory _pinedMessages = new PinedMessage[](_size);
        uint256 _currentBlock = block.number;
        for (uint256 i = _offset; i < _limit; i++) {
            uint256 j = i;
            while (pinedMessages[j].validUntilBlock < _currentBlock) {
                require(j <= pinedMessageCount, "Invalid pined message");
                j++;
            }
            _pinedMessages[i - _offset] = pinedMessages[j];
        }
        return _pinedMessages;
    }

    function paginationMessages(
        uint256 _page,
        uint256 _pageSize
    ) public view returns (string[] memory) {
        uint256 _offset = _page * _pageSize;
        uint256 _limit = _offset + _pageSize;
        if (_limit > messageCount) {
            _limit = messageCount;
        }
        uint256 _size = _limit - _offset;
        string[] memory _messages = new string[](_size);
        for (uint256 i = _offset; i < _limit; i++) {
            _messages[i - _offset] = messages[i];
        }
        return _messages;
    }

    function paginationMessagesWithTokenURI(
        uint256 _page,
        uint256 _pageSize
    ) public view returns (MessageReturn[] memory) {
        uint256 _offset = _page * _pageSize;
        uint256 _limit = _offset + _pageSize;
        if (_limit > messageCount) {
            _limit = messageCount;
        }
        uint256 _size = _limit - _offset;
        MessageReturn[] memory _messages = new MessageReturn[](_size);
        for (uint256 i = _offset; i < _limit; i++) {
            _messages[i - _offset] = MessageReturn(
                messages[i],
                ownerOf(i),
                i,
                tokenURI(i)
            );
        }
        return _messages;
    }

    // Internal Functions

    // Private Functions
    function _mintNFT(address _recipient, string calldata _tokenURI) private {
        uint256 _tokenId = messageCount;
        _safeMint(_recipient, _tokenId);
        _setTokenURI(_tokenId, _tokenURI);
    }

    function _setTokenURI(
        uint256 _tokenId,
        string calldata _tokenURI
    ) private {
        _tokenURIs[_tokenId] = _tokenURI;
    }
}
