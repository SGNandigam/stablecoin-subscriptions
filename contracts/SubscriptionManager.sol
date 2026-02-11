// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title SubscriptionManager
 * @dev Manages stablecoin-based subscription payments on Polygon
 */
contract SubscriptionManager is Ownable, ReentrancyGuard {
    
    enum PlanType { Basic, Premium, Enterprise }
    
    struct Plan {
        string name;
        uint256 price;          // in stablecoin units (6 decimals for USDC/USDT)
        uint256 duration;       // in seconds
        bool active;
    }
    
    struct Subscription {
        PlanType planType;
        uint256 startTime;
        uint256 endTime;
        address stablecoin;     // USDC or USDT address
        bool active;
    }
    
    struct Transaction {
        address user;
        PlanType planType;
        uint256 amount;
        address stablecoin;
        uint256 timestamp;
        string txType;          // "subscribe", "renew", "cancel"
    }
    
    // Supported stablecoins
    mapping(address => bool) public supportedStablecoins;
    
    // Plans
    mapping(PlanType => Plan) public plans;
    
    // User subscriptions
    mapping(address => Subscription) public subscriptions;
    
    // Transaction history
    Transaction[] public transactions;
    mapping(address => uint256[]) public userTransactionIds;
    
    // Revenue tracking
    uint256 public totalRevenue;
    address public treasury;
    
    // Events
    event PlanCreated(PlanType indexed planType, string name, uint256 price);
    event Subscribed(address indexed user, PlanType planType, address stablecoin, uint256 amount);
    event Renewed(address indexed user, PlanType planType, uint256 newEndTime);
    event Cancelled(address indexed user, PlanType planType);
    event StablecoinAdded(address indexed token);
    event StablecoinRemoved(address indexed token);
    
    constructor(address _treasury) Ownable(msg.sender) {
        treasury = _treasury;
        
        // Initialize plans (prices in 6-decimal stablecoin units)
        plans[PlanType.Basic] = Plan("Basic", 10 * 1e6, 30 days, true);
        plans[PlanType.Premium] = Plan("Premium", 20 * 1e6, 30 days, true);
        plans[PlanType.Enterprise] = Plan("Enterprise", 50 * 1e6, 30 days, true);
        
        emit PlanCreated(PlanType.Basic, "Basic", 10 * 1e6);
        emit PlanCreated(PlanType.Premium, "Premium", 20 * 1e6);
        emit PlanCreated(PlanType.Enterprise, "Enterprise", 50 * 1e6);
    }
    
    modifier validPlan(PlanType _planType) {
        require(plans[_planType].active, "Plan is not active");
        _;
    }
    
    modifier validStablecoin(address _stablecoin) {
        require(supportedStablecoins[_stablecoin], "Stablecoin not supported");
        _;
    }
    
    /**
     * @dev Add a supported stablecoin
     */
    function addStablecoin(address _token) external onlyOwner {
        supportedStablecoins[_token] = true;
        emit StablecoinAdded(_token);
    }
    
    /**
     * @dev Remove a supported stablecoin
     */
    function removeStablecoin(address _token) external onlyOwner {
        supportedStablecoins[_token] = false;
        emit StablecoinRemoved(_token);
    }
    
    /**
     * @dev Subscribe to a plan using a stablecoin
     */
    function subscribe(
        PlanType _planType,
        address _stablecoin
    ) external nonReentrant validPlan(_planType) validStablecoin(_stablecoin) {
        require(!subscriptions[msg.sender].active, "Already subscribed");
        
        Plan memory plan = plans[_planType];
        
        // Transfer stablecoin from user to treasury
        IERC20(_stablecoin).transferFrom(msg.sender, treasury, plan.price);
        
        // Create subscription
        subscriptions[msg.sender] = Subscription({
            planType: _planType,
            startTime: block.timestamp,
            endTime: block.timestamp + plan.duration,
            stablecoin: _stablecoin,
            active: true
        });
        
        // Record transaction
        uint256 txId = transactions.length;
        transactions.push(Transaction({
            user: msg.sender,
            planType: _planType,
            amount: plan.price,
            stablecoin: _stablecoin,
            timestamp: block.timestamp,
            txType: "subscribe"
        }));
        userTransactionIds[msg.sender].push(txId);
        
        totalRevenue += plan.price;
        
        emit Subscribed(msg.sender, _planType, _stablecoin, plan.price);
    }
    
    /**
     * @dev Renew an existing subscription
     */
    function renew() external nonReentrant {
        Subscription storage sub = subscriptions[msg.sender];
        require(sub.active, "No active subscription");
        
        Plan memory plan = plans[sub.planType];
        
        // Transfer payment
        IERC20(sub.stablecoin).transferFrom(msg.sender, treasury, plan.price);
        
        // Extend subscription
        if (block.timestamp > sub.endTime) {
            sub.endTime = block.timestamp + plan.duration;
        } else {
            sub.endTime += plan.duration;
        }
        
        // Record transaction
        uint256 txId = transactions.length;
        transactions.push(Transaction({
            user: msg.sender,
            planType: sub.planType,
            amount: plan.price,
            stablecoin: sub.stablecoin,
            timestamp: block.timestamp,
            txType: "renew"
        }));
        userTransactionIds[msg.sender].push(txId);
        
        totalRevenue += plan.price;
        
        emit Renewed(msg.sender, sub.planType, sub.endTime);
    }
    
    /**
     * @dev Cancel a subscription
     */
    function cancel() external {
        Subscription storage sub = subscriptions[msg.sender];
        require(sub.active, "No active subscription");
        
        sub.active = false;
        
        // Record transaction
        uint256 txId = transactions.length;
        transactions.push(Transaction({
            user: msg.sender,
            planType: sub.planType,
            amount: 0,
            stablecoin: sub.stablecoin,
            timestamp: block.timestamp,
            txType: "cancel"
        }));
        userTransactionIds[msg.sender].push(txId);
        
        emit Cancelled(msg.sender, sub.planType);
    }
    
    /**
     * @dev Check if a user's subscription is active and valid
     */
    function isSubscriptionActive(address _user) external view returns (bool) {
        Subscription memory sub = subscriptions[_user];
        return sub.active && block.timestamp <= sub.endTime;
    }
    
    /**
     * @dev Get user's transaction count
     */
    function getUserTransactionCount(address _user) external view returns (uint256) {
        return userTransactionIds[_user].length;
    }
    
    /**
     * @dev Get total transaction count
     */
    function getTransactionCount() external view returns (uint256) {
        return transactions.length;
    }
    
    /**
     * @dev Update plan pricing
     */
    function updatePlanPrice(PlanType _planType, uint256 _newPrice) external onlyOwner {
        plans[_planType].price = _newPrice;
    }
    
    /**
     * @dev Update treasury address
     */
    function setTreasury(address _newTreasury) external onlyOwner {
        require(_newTreasury != address(0), "Invalid address");
        treasury = _newTreasury;
    }
}
