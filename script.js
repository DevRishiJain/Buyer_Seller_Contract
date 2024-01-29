// Create a Web3 instance using the user's Ethereum provider (e.g., MetaMask)
const web3 = new Web3(window.ethereum);

// Set the contract address
const contractAddress = '0x4812a2d440e29e60e9f6b87c94ab0237089cbe32';

// Define the contract ABI (paste your actual ABI here)
const contractABI = [
    [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_token",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_price",
                    "type": "uint256"
                }
            ],
            "name": "createOrder",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "ECDSAInvalidSignature",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "length",
                    "type": "uint256"
                }
            ],
            "name": "ECDSAInvalidSignatureLength",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                }
            ],
            "name": "ECDSAInvalidSignatureS",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_orderId",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes32",
                    "name": "_message",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes",
                    "name": "_signature",
                    "type": "bytes"
                }
            ],
            "name": "fulfill",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "orderId",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                }
            ],
            "name": "OrderCreated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "orderId",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                }
            ],
            "name": "OrderFulfilled",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_orderId",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes32",
                    "name": "_message",
                    "type": "bytes32"
                }
            ],
            "name": "register",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "name": "buyers",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_orderId",
                    "type": "uint256"
                }
            ],
            "name": "getOrderDetails",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "seller",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "token",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "price",
                            "type": "uint256"
                        },
                        {
                            "internalType": "enum Trade.State",
                            "name": "state",
                            "type": "uint8"
                        },
                        {
                            "internalType": "bytes32[]",
                            "name": "buyerMessages",
                            "type": "bytes32[]"
                        }
                    ],
                    "internalType": "struct Trade.Order",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "orderCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "orders",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                },
                {
                    "internalType": "enum Trade.State",
                    "name": "state",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
];

// Create a contract instance
const tradeContract = new web3.eth.Contract(contractABI, contractAddress);

// Function to create an order
async function createOrder() {
    const token = document.getElementById('token').value;
    const price = document.getElementById('price').value;

    // Get the user's Ethereum accounts
    const accounts = await web3.eth.requestAccounts();
    const sender = accounts[0];

    // Call the createOrder function in the smart contract
    const result = await tradeContract.methods.createOrder(token, price).send({ from: sender });

    console.log(result);
}

// Function to register a buyer
async function register() {
    const orderId = document.getElementById('orderId').value;
    const message = document.getElementById('message').value;

    // Get the user's Ethereum accounts
    const accounts = await web3.eth.requestAccounts();
    const sender = accounts[0];

    // Call the register function in the smart contract
    const result = await tradeContract.methods.register(orderId, message).send({ from: sender });

    console.log(result);
}

// Function to fulfill an order
async function fulfill() {
    const orderId = document.getElementById('orderId').value;
    const message = document.getElementById('fulfillMessage').value;
    const signature = document.getElementById('signature').value;

    // Get the user's Ethereum accounts
    const accounts = await web3.eth.requestAccounts();
    const sender = accounts[0];

    // Call the fulfill function in the smart contract
    const result = await tradeContract.methods.fulfill(orderId, message, signature).send({ from: sender });

    console.log(result);
}

// Function to get order details
async function getOrderDetails() {
    const orderId = document.getElementById('getOrderDetailsId').value;

    // Call the getOrderDetails function in the smart contract
    const result = await tradeContract.methods.getOrderDetails(orderId).call();

    document.getElementById('orderDetails').innerText = JSON.stringify(result, null, 2);
}
