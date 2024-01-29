# Trade Contract README

## Objective:
This repository contains a simple trade contract designed to facilitate transactions between a buyer and a seller. The contract supports the listing of both native and ERC20 tokens for sale. The primary purpose is to establish a secure and transparent trading environment, allowing buyers to register themselves and sellers to release funds based on a signed message.

## Instructions:

1. **Token Listing:**
   - The seller can list either native or any ERC20 token for sale.

2. **Buyer Registration:**
   - Buyers can register themselves by sending a random number as a message to the contract.

3. **Order Structure:**
   - All registered buyers and their corresponding messages are stored as part of the order structure.
   - There can be any number of registered buyers for a single order.

4. **Funds Release:**
   - To release funds from the order, the seller must choose a number provided by any buyer.
   - The seller needs to sign the chosen number, and the contract verifies the signature to release funds to the buyer whose message has been signed.

5. **Assumptions:**
   - The buyer and seller have an off-chain agreement about the deal.
   - The contract facilitates the transfer of tokens from the seller to the buyer.

## Requirements:

1. **Token Support:**
   - Add support for both native and ERC20 token listings.

2. **Order Details:**
   - Implement a function to fetch order details by providing an order ID.

3. **Order State:**
   - Ensure awareness of the order state throughout the contract execution.

4. **Security:**
   - Be vigilant against potential attack vectors to maintain the contract's integrity.

5. **Signature Validation:**
   - Implement on-chain signature validation for secure funds release.

6. **Funds Transfer:**
   - Facilitate a successful transfer of funds from the seller to the buyer upon a valid signature.

7. **Testing:**
   - Develop comprehensive tests to ensure the reliability and security of the contract.

8. **Documentation:**
   - Provide thorough documentation to guide users and developers on utilizing the trade contract.

## Usage:

To use the trade contract, follow the instructions provided in the documentation. Ensure that the requirements are met, and consider the assumptions made for off-chain agreements between buyers and sellers.

Feel free to explore the codebase, run tests, and contribute to the improvement of this trade contract.

**Note:** Always exercise caution and conduct thorough testing before deploying this contract in a production environment.

## License:

This trade contract is open-source and available under the [MIT License](LICENSE). Feel free to use, modify, and distribute it in accordance with the terms of the license.
