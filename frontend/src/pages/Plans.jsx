import { useContext, useState } from 'react'
import { WalletContext } from '../App'

const plansData = [
    {
        type: 'Basic',
        price: 10,
        period: '/month',
        features: [
            'Up to 100 transactions/month',
            'USDC payments only',
            'Basic analytics dashboard',
            'Email support',
            'Single user access'
        ],
        featured: false
    },
    {
        type: 'Premium',
        price: 20,
        period: '/month',
        features: [
            'Up to 1,000 transactions/month',
            'USDC & USDT payments',
            'Advanced AI analytics',
            'Priority support',
            'Up to 5 team members',
            'Churn prediction insights'
        ],
        featured: true
    },
    {
        type: 'Enterprise',
        price: 50,
        period: '/month',
        features: [
            'Unlimited transactions',
            'All stablecoins supported',
            'Full AI analytics suite',
            'Dedicated account manager',
            'Unlimited team members',
            'Custom smart contract logic',
            'SLA guarantee'
        ],
        featured: false
    }
]

function Plans() {
    const { wallet, showToast } = useContext(WalletContext)
    const [subscribing, setSubscribing] = useState(null)

    const handleSubscribe = async (plan) => {
        if (!wallet) {
            showToast('Please connect your wallet first', 'error')
            return
        }
        setSubscribing(plan.type)
        // Simulate transaction
        await new Promise(resolve => setTimeout(resolve, 1500))
        setSubscribing(null)
        showToast(`Subscribed to ${plan.type} plan for $${plan.price}/mo!`, 'success')
    }

    return (
        <section className="section">
            <div className="container">
                <div className="section-header">
                    <div className="badge">Pricing</div>
                    <h2>Choose Your Plan</h2>
                    <p>Pay with stablecoins — USDC or USDT on Polygon. Cancel anytime.</p>
                </div>

                <div className="plans-grid">
                    {plansData.map((plan) => (
                        <div key={plan.type} className={`plan-card ${plan.featured ? 'featured' : ''}`}>
                            {plan.featured && <div className="plan-badge">Most Popular</div>}
                            <div className="plan-name">{plan.type}</div>
                            <div className="plan-price">
                                ${plan.price}<span> USD</span>
                            </div>
                            <div className="plan-period">per month, billed in stablecoins</div>
                            <ul className="plan-features">
                                {plan.features.map((feature, i) => (
                                    <li key={i}>
                                        <span className="check">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button
                                className={`btn-plan ${plan.featured ? 'primary' : 'outline'}`}
                                onClick={() => handleSubscribe(plan)}
                                disabled={subscribing === plan.type}
                            >
                                {subscribing === plan.type ? 'Processing...' : `Subscribe — $${plan.price}/mo`}
                            </button>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: 48 }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                        All payments are processed on-chain via smart contracts on the Polygon network.<br />
                        Supported stablecoins: USDC (Circle) • USDT (Tether)
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Plans
