"""
Advanced GPT-4o Mini Reasoning Analysis for Stablecoin Subscriptions
This script performs detailed analysis and reasoning on subscription payment data.
"""

import json
import os
from typing import Dict, List, Any
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


class SubscriptionAnalyzer:
    """Analyzes subscription data using GPT-4o Mini with reasoning."""

    def __init__(self, model: str = "gpt-4o-mini"):
        self.model = model

    def _chat(self, system: str, prompt: str, temperature: float = 0.7, max_tokens: int = 1500) -> str:
        response = client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": system},
                {"role": "user", "content": prompt}
            ],
            temperature=temperature,
            max_tokens=max_tokens
        )
        return response.choices[0].message.content

    def analyze_payment_patterns(self, subscription_data: Dict[str, Any]) -> str:
        """Analyze payment patterns and user behavior with reasoning."""
        prompt = f"""
        Analyze the following stablecoin subscription data and provide insights:

        {json.dumps(subscription_data, indent=2)}

        Please reason through:
        1. Payment frequency patterns
        2. Subscription plan utilization
        3. Stablecoin preference (USDC vs USDT)
        4. User retention indicators
        5. Potential churn risks
        6. Revenue optimization opportunities
        """
        return self._chat(
            "You are a blockchain payment analytics expert specializing in subscription models using stablecoins. Provide detailed reasoning and actionable insights.",
            prompt
        )

    def predict_churn_risk(self, user_profile: Dict[str, Any]) -> str:
        """Predict churn risk for a user with detailed reasoning."""
        prompt = f"""
        Based on the following user subscription profile, assess churn risk:

        {json.dumps(user_profile, indent=2)}

        Provide:
        1. Churn risk score (0-100)
        2. Key risk factors
        3. Recommended retention strategies
        4. Expected lifetime value
        """
        return self._chat(
            "You are a predictive analytics expert for SaaS and subscription businesses. Use data-driven reasoning to assess user churn probability.",
            prompt, temperature=0.5, max_tokens=1000
        )

    def optimize_pricing_strategy(self, market_data: Dict[str, Any]) -> str:
        """Analyze and suggest pricing optimization with reasoning."""
        prompt = f"""
        Analyze this stablecoin subscription market data and suggest pricing optimizations:

        {json.dumps(market_data, indent=2)}

        Consider:
        1. Current price elasticity
        2. Competitor positioning
        3. User segment profitability
        4. Currency volatility impacts
        5. Recommended price adjustments
        """
        return self._chat(
            "You are a pricing strategy expert for blockchain-based subscription services. Provide economically sound recommendations.",
            prompt, temperature=0.6, max_tokens=1200
        )

    def analyze_transaction_anomalies(self, transactions: List[Dict[str, Any]]) -> str:
        """Detect and analyze transaction anomalies with reasoning."""
        prompt = f"""
        Analyze the following transaction history for anomalies and patterns:

        {json.dumps(transactions, indent=2)}

        Identify:
        1. Unusual transaction patterns
        2. Potential fraud indicators
        3. Smart contract interaction risks
        4. Gas fee optimization opportunities
        5. Recommendations for risk mitigation
        """
        return self._chat(
            "You are a blockchain security and transaction analysis expert. Identify risks and optimization opportunities.",
            prompt, temperature=0.6, max_tokens=1200
        )


# Example usage
if __name__ == "__main__":
    with open("test-dataset.json", "r") as f:
        test_data = json.load(f)

    analyzer = SubscriptionAnalyzer()

    print("=" * 80)
    print("STABLECOIN SUBSCRIPTION ANALYSIS WITH GPT-4o MINI REASONING")
    print("=" * 80)

    print("\n1. PAYMENT PATTERN ANALYSIS:")
    print("-" * 80)
    payment_analysis = analyzer.analyze_payment_patterns(test_data)
    print(payment_analysis)

    print("\n2. CHURN RISK ASSESSMENT:")
    print("-" * 80)
    if test_data.get("subscriptions"):
        user_profile = test_data["subscriptions"][0]
        churn_analysis = analyzer.predict_churn_risk(user_profile)
        print(churn_analysis)

    print("\n3. TRANSACTION ANOMALY DETECTION:")
    print("-" * 80)
    if test_data.get("subscriptions") and test_data["subscriptions"][0].get("transactionHistory"):
        transactions = test_data["subscriptions"][0]["transactionHistory"]
        anomaly_analysis = analyzer.analyze_transaction_anomalies(transactions)
        print(anomaly_analysis)

    print("\n" + "=" * 80)
    print("Analysis Complete")
    print("=" * 80)