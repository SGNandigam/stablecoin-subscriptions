import { useNavigate } from 'react-router-dom'

function Landing() {
    const navigate = useNavigate()

    return (
        <>
            {/* Hero */}
            <section className="hero">
                <div className="hero-content">
                    <div className="hero-badge">
                        ⚡ Powered by Polygon Network
                    </div>
                    <h1>
                        Subscription Payments<br />
                        with <span className="gradient-text">Stablecoins</span>
                    </h1>
                    <p className="hero-subtitle">
                        Accept recurring payments in USDC and USDT on Polygon. No volatility, no middlemen, just seamless crypto subscriptions for your business.
                    </p>
                    <div className="hero-actions">
                        <button className="btn-primary" onClick={() => navigate('/plans')}>
                            View Plans
                        </button>
                        <button className="btn-secondary" onClick={() => navigate('/dashboard')}>
                            Open Dashboard
                        </button>
                    </div>
                    <div className="hero-stats">
                        <div className="stat">
                            <div className="stat-value">$2.4M+</div>
                            <div className="stat-label">Total Volume Processed</div>
                        </div>
                        <div className="stat">
                            <div className="stat-value">12,500+</div>
                            <div className="stat-label">Active Subscribers</div>
                        </div>
                        <div className="stat">
                            <div className="stat-value">99.9%</div>
                            <div className="stat-label">Uptime Guarantee</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <div className="badge">Features</div>
                        <h2>Why StablePay?</h2>
                        <p>Everything you need to run subscription-based services on the blockchain</p>
                    </div>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon purple">🛡️</div>
                            <h3>No Volatility</h3>
                            <p>Payments in USDC and USDT mean your revenue stays stable. No more worrying about crypto price swings.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon blue">⚡</div>
                            <h3>Instant Settlement</h3>
                            <p>Transactions settle in seconds on Polygon with near-zero gas fees. No waiting days for bank transfers.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon cyan">🔄</div>
                            <h3>Auto-Renewal</h3>
                            <p>Smart contract-powered recurring payments. Set up once and let the blockchain handle renewals.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon green">📊</div>
                            <h3>AI Analytics</h3>
                            <p>GPT-powered insights into payment patterns, churn prediction, and revenue optimization.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon pink">🌐</div>
                            <h3>Global Access</h3>
                            <p>Accept payments from anyone, anywhere. No bank accounts needed — just a crypto wallet.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon orange">🔒</div>
                            <h3>Fully On-Chain</h3>
                            <p>All subscription logic lives in auditable smart contracts. Transparent, trustless, and secure.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <div className="badge">How It Works</div>
                        <h2>Start in 3 Simple Steps</h2>
                        <p>Get your stablecoin subscription running in minutes</p>
                    </div>
                    <div className="steps-container">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <h3>Connect Your Wallet</h3>
                            <p>Link your MetaMask or WalletConnect wallet to the Polygon network</p>
                            <div className="step-connector"></div>
                        </div>
                        <div className="step-card">
                            <div className="step-number">2</div>
                            <h3>Choose a Plan</h3>
                            <p>Select Basic, Premium, or Enterprise — pay in USDC or USDT</p>
                            <div className="step-connector"></div>
                        </div>
                        <div className="step-card">
                            <div className="step-number">3</div>
                            <h3>Enjoy the Service</h3>
                            <p>Your subscription is active on-chain. Auto-renews every billing cycle</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Landing
