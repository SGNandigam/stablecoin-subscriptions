// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title MockStablecoin
 * @dev A mock ERC-20 token simulating USDC/USDT for local testing.
 *      Uses 6 decimals to match real stablecoin behavior.
 */
contract MockStablecoin is ERC20 {
    uint8 private _decimals;

    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals_
    ) ERC20(name, symbol) {
        _decimals = decimals_;
    }

    function decimals() public view override returns (uint8) {
        return _decimals;
    }

    /**
     * @dev Mint tokens to any address (for testing only)
     */
    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }

    /**
     * @dev Faucet: mint 1000 tokens to the caller
     */
    function faucet() external {
        _mint(msg.sender, 1000 * (10 ** _decimals));
    }
}
