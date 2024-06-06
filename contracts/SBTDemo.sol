// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "./ERC721.sol";
/**
 * An experiment in Soul Bound Tokens (SBT's) following Vitalik's
 * co-authored whitepaper at:
 * https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4105763
 *
 * I propose for a rename to Non-Transferable Tokens NTT's
 */
contract SoulboundTokenDemo is ERC721 {
    constructor() ERC721("SoulboundTokenDemo", "SBTDemo") {}

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override {
        require(from == address(0), "Token transfer is not allowed");
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function mint(address to, uint256 tokenId) external {
        _mint(to, tokenId);
    }
}
