// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract ERC721 {
 /// @dev This emits when ownership of any NFT changes by any mechanism.
    ///  This event emits when NFTs are created (`from` == 0) and destroyed
    ///  (`to` == 0). Exception: during contract creation, any number of NFTs
    ///  may be created and assigned without emitting Transfer. At the time of
    ///  any transfer, the approved address for that NFT (if any) is reset to none.
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);

    /// @dev This emits when the approved address for an NFT is changed or
    ///  reaffirmed. The zero address indicates there is no approved address.
    ///  When a Transfer event emits, this also indicates that the approved
    ///  address for that NFT (if any) is reset to none.
    event Approval(address indexed _owners, address indexed _approved, uint256 indexed _tokenId);

    /// @dev This emits when an operator is enabled or disabled for an owner.
    ///  The operator can manage all NFTs of the owner.
    event ApprovalForAll(address indexed _owners, address indexed _operator, bool _approved);

    mapping(address => uint256) internal _balances;
    mapping(uint256 => address) internal _owners;
    mapping(uint256 => address) internal _tokenApprovals;
    mapping(address => mapping(address => bool)) private _operatorAppprove;
    function balanceOf(address owner) external view returns (uint256){
        require(owner != address(0), "Wrong address");
        return _balances[owner];
    }

    function ownerOf(uint256 tokenId) public view returns (address){
        address owner = _owners[tokenId];
         require(owner != address(0), "Wrong address");
         return owner;
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public payable{
        transferFrom(from, to, tokenId);
        require(_checkOnERC721Recived() == 1, "Reciver not implemented");
    }
    function _checkOnERC721Recived() private pure returns(uint256){
        return 1;
    }
    function safeTransferFrom(address from, address to, uint256 tokenId) external payable{
         safeTransferFrom(from, to, tokenId, "");
    }

   
    function transferFrom(address from, address to, uint256 tokenId) public payable{
        address owner = ownerOf(tokenId);
        require(
            msg.sender == owner ||
            getApproved(tokenId) == msg.sender ||
            isApprovedForAll(owner, msg.sender),
            "msg.sender is not the owner or approver for tranfer"
        );  
        require(
            to != address(0), "Address to wrong"
        );
        require(
            _owners[tokenId] != address(0), "Token does not exist"
        );
        approve(address(0),tokenId);
        _balances[from] -=1;
        _balances[from] +=1;
        _owners[tokenId] = to;
        emit Transfer(from, to, tokenId);
    }
    function approve(address approved, uint256 tokenId) public payable{
        address owner = ownerOf(tokenId);
        require(msg.sender == owner || isApprovedForAll(owner,msg.sender), "msg.sender is not owner or is not approver");
        _tokenApprovals[tokenId] = approved;
        emit Approval(owner, approved, tokenId);
    }
    function setApprovalForAll(address operator, bool approved) external{
            _operatorAppprove[msg.sender][operator] = approved;
            emit ApprovalForAll(msg.sender,operator, approved);
    }
    function getApproved(uint256 tokenId) public view returns (address){
        require(_owners[tokenId] != address(0),"Token does not exist");
        _tokenApprovals[tokenId];
    }
    function isApprovedForAll(address owner, address operator) public view returns (bool){
        return _operatorAppprove[owner][operator];
    }
    function supportInterface(bytes4 interfaceID) public pure virtual returns(bool){
        return interfaceID == 0x80ac58cd;
    }
}