import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { WalletContext } from '../App'

const monthlyRevenue = [
    { month: 'Sep', value: 820 },
    { month: 'Oct', value: 1150 },
    { month: 'Nov', value: 1380 },
    { month: 'Dec', value: 1620 },
    { month: 'Jan', value: 2100 },
    { month: 'Feb', value: 2450 },
]

const planDistribution = [
    { label: 'Basic', value: 42, color: 'var(--accent-blue)' },
    { label: 'Premium', value: 35, color: 'var(--accent-purple)' },
    { label: 'Enterprise', value: 23, color: 'var(--accent-cyan)' },
]

const coinDistribution = [
    { label: 'USDC', value: 64, color: '#2680eb' },
    { label: 'USDT', value: 36, color: '#26a17b' },
]

function Analytics() {
    const { wallet } = useContext(WalletContext)
    const navigate = useNavigate()

    if (!wallet) {
        return (
            <section className="section">
                <div className="container" style={{ textAlign: 'center', paddingTop: 80 }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 16 }}>Connect Your Wallet</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: '1.1rem' }}>
                        Please connect your wallet to view analytics
                    </p>
                    <button className="btn-primary" onClick={() => navigate('/')}>
                        Go to Home
                    </button>
                </div>
            </section>
        )
    }

    const maxRevenue = Math.max(...monthlyRevenue.map(m => m.value))

    return (
        <section className="section">
            <div className="container">
                <div className="section-header" style={{ textAlign: 'left', marginBottom: 32 }}>
                    <div className="badge">Analytics</div>
                    <h2>Subscription Insights</h2>
                    <p>AI-powered analytics and payment pattern analysis</p>
                </div>

                {/* Summary Stats */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon">📈</div>
                        <div className="stat-value">$2,450</div>
                        <div className="stat-label">Revenue This Month</div>
                        <div className="stat-change up">↑ 16.7% vs last month</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">🔁</div>
                        <div className="stat-value">92%</div>
                        <div className="stat-label">Retention Rate</div>
                        <div className="stat-change up">↑ 3% improvement</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">⚠️</div>
                        <div className="stat-value">4</div>
                        <div className="stat-label">Churn Risk Users</div>
                        <div className="stat-change down">↓ 2 flagged</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">💎</div>
                        <div className="stat-value">$186</div>
                        <div className="stat-label">Avg. Lifetime Value</div>
                        <div className="stat-change up">↑ 8% growth</div>
                    </div>
                </div>

                {/* Charts Grid */}
                <div className="analytics-grid">
                    {/* Revenue Bar Chart */}
                    <div className="chart-card">
                        <h3>📊 Monthly Revenue ($)</h3>
                        <div className="bar-chart" style={{ marginBottom: 36 }}>
                            {monthlyRevenue.map((m) => (
                                <div
                                    key={m.month}
                                    className="bar"
                                    style={{ height: `${(m.value / maxRevenue) * 100}%` }}
                                >
                                    <div className="bar-value">${m.value}</div>
                                    <div className="bar-label">{m.month}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Plan Distribution Donut */}
                    <div className="chart-card">
                        <h3>📋 Plan Distribution</h3>
                        <div className="donut-chart">
                            <div
                                className="donut-visual"
                                style={{
                                    background: `conic-gradient(
                    ${planDistribution[0].color} 0% ${planDistribution[0].value}%,
                    ${planDistribution[1].color} ${planDistribution[0].value}% ${planDistribution[0].value + planDistribution[1].value}%,
                    ${planDistribution[2].color} ${planDistribution[0].value + planDistribution[1].value}% 100%
                  )`
                                }}
                            >
                                <div className="donut-center">
                                    <div className="donut-value">100%</div>
                                    <div className="donut-label">Total</div>
                                </div>
                            </div>
                            <div className="donut-legend">
                                {planDistribution.map((item) => (
                                    <div key={item.label} className="legend-item">
                                        <div className="legend-dot" style={{ background: item.color }}></div>
                                        <span>{item.label}</span>
                                        <span className="legend-value">{item.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stablecoin Usage Donut */}
                    <div className="chart-card">
                        <h3>🪙 Stablecoin Usage</h3>
                        <div className="donut-chart">
                            <div
                                className="donut-visual"
                                style={{
                                    background: `conic-gradient(
                    ${coinDistribution[0].color} 0% ${coinDistribution[0].value}%,
                    ${coinDistribution[1].color} ${coinDistribution[0].value}% 100%
                  )`
                                }}
                            >
                                <div className="donut-center">
                                    <div className="donut-value">2</div>
                                    <div className="donut-label">Coins</div>
                                </div>
                            </div>
                            <div className="donut-legend">
                                {coinDistribution.map((item) => (
                                    <div key={item.label} className="legend-item">
                                        <div className="legend-dot" style={{ background: item.color }}></div>
                                        <span>{item.label}</span>
                                        <span className="legend-value">{item.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* AI Insights */}
                    <div className="chart-card">
                        <h3>🤖 AI-Powered Insights</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div style={{
                                padding: 16,
                                background: 'rgba(16, 185, 129, 0.08)',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid rgba(16, 185, 129, 0.15)',
                                fontSize: '0.88rem',
                                lineHeight: 1.6
                            }}>
                                <strong style={{ color: 'var(--accent-green)' }}>✅ Revenue Growing</strong>
                                <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>
                                    Revenue increased 16.7% MoM. Premium plan adoption drives most growth. Consider offering annual billing discounts.
                                </p>
                            </div>
                            <div style={{
                                padding: 16,
                                background: 'rgba(245, 158, 11, 0.08)',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid rgba(245, 158, 11, 0.15)',
                                fontSize: '0.88rem',
                                lineHeight: 1.6
                            }}>
                                <strong style={{ color: 'var(--accent-orange)' }}>⚠️ Churn Alert</strong>
                                <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>
                                    4 Basic plan users show declining engagement. Recommend targeted upgrade offers or retention campaigns.
                                </p>
                            </div>
                            <div style={{
                                padding: 16,
                                background: 'rgba(139, 92, 246, 0.08)',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid rgba(139, 92, 246, 0.15)',
                                fontSize: '0.88rem',
                                lineHeight: 1.6
                            }}>
                                <strong style={{ color: 'var(--accent-purple)' }}>💡 Pricing Insight</strong>
                                <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>
                                    Enterprise plan has highest retention (98%). Consider adding a mid-tier at $35/mo to capture users between Premium and Enterprise.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Analytics
