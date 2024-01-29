// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract Trade {
    using ECDSA for bytes32;

    enum State { Open, Closed }
    enum PaymentType { Ether, ERC20 }

    struct Order {
        address seller;
        address token; // address(0) for Ether
        uint256 price;
        State state;
        PaymentType paymentType;
        bytes32[] buyerMessages;
    }

    event OrderCreated(
        uint256 indexed orderId,
        address indexed seller,
        address indexed token,
        uint256 price,
        PaymentType paymentType
    );

    event OrderFulfilled(
        uint256 indexed orderId,
        address indexed buyer
    );

    mapping(uint256 => Order) public orders;
    mapping(bytes32 => address) public buyers;
    uint256 public orderCount;

    function createOrder(
        uint256 _orderId,
        address _token, // Use address(0) for Ether
        uint256 _price,
        PaymentType _paymentType
    ) external payable {
        require(_paymentType == PaymentType.Ether && msg.value == _price || _paymentType == PaymentType.ERC20, "Payment must match order type and price");
        
        if (_orderId == 0) {
            _orderId = orderCount++;
        }

        orders[_orderId] = Order({
            seller: msg.sender,
            token: _token,
            price: _price,
            state: State.Open,
            paymentType: _paymentType,
            buyerMessages: new bytes32[](0)
        });

        emit OrderCreated(_orderId, msg.sender, _token, _price, _paymentType);
    }

    function register(uint256 _orderId, bytes32 _message) external {
        Order storage order = orders[_orderId];
        require(order.state == State.Open, "Order is not open");

        buyers[_message] = msg.sender;
        order.buyerMessages.push(_message);
    }

    function fulfill(
    uint256 _orderId,
    bytes32 _message,
    bytes memory _signature
) external {
    Order storage order = orders[_orderId];
    require(order.state == State.Open, "Order is not open");

    // Correctly using ECDSA library functions
    address buyer = ECDSA.recover(
        keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", _message)),
        _signature
    );
    require(buyers[_message] == buyer, "Signature does not match buyer");

    if (order.paymentType == PaymentType.ERC20) {
        IERC20(order.token).transferFrom(order.seller, buyer, order.price);
    } else {
        payable(buyer).transfer(order.price);
    }

    order.state = State.Closed;
    emit OrderFulfilled(_orderId, buyer);
}

    // Constructor to receive Ether in case of direct send
    receive() external payable {}

    // Fallback function in case of non-data calls
    fallback() external payable {}
}
