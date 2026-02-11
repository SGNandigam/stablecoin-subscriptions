import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { WalletContext } from '../App'

const mockTransactions = [
    { id: 'TX-1001', user: 'John Doe', plan: 'Basic', amount: 10.00, coin: 'USDC', date: '2026-02-05 14:32', status: 'active', type: 'Subscribe' },
    { id: 'TX-1002', user: 'John Doe', plan: 'Basic', amount: 10.00, coin: 'USDC', date: '2026-03-05 14:32', status: 'active', type: 'Renewal' },
    { id: 'TX-2001', user: 'Jane Smith', plan: 'Premium', amount: 20.00, coin: 'USDT', date: '2026-02-06 15:22', status: 'active', type: 'Subscribe' },
    { id: 'TX-2002', user: 'Jane Smith', plan: 'Premium', amount: 20.00, coin: 'USDT', date: '2026-03-06 15:22', status: 'active', type: 'Renewal' },
    { id: 'TX-3001', user: 'Alex Morgan', plan: 'Enterprise', amount: 50.00, coin: 'USDC', date: '2026-02-07 09:15', status: 'active', type: 'Subscribe' },
    { id: 'TX-3002', user: 'Sam Wilson', plan: 'Basic', amount: 10.00, coin: 'USDT', date: '2026-02-08 11:42', status: 'cancelled', type: 'Cancel' },
    { id: 'TX-4001', user: 'Chris Lee', plan: 'Premium', amount: 20.00, coin: 'USDC', date: '2026-02-09 16:30', status: 'active', type: 'Subscribe' },
    { id: 'TX-4002', user: 'Taylor Kim', plan: 'Enterprise', amount: 50.00, coin: 'USDT', date: '2026-02-10 08:05', status: 'pending', type: 'Subscribe' },
]

function Dashboard() {
    const { wallet } = useContext(WalletContext)
    const navigate = useNavigate()

    if (!wallet) {
        return (
            <section className="section">
                <div className="container" style={{ textAlign: 'center', paddingTop: 80 }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 16 }}>Connect Your Wallet</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: '1.1rem' }}>
                        Please connect your wallet to view the dashboard
                    </p>
                    <button className="btn-primary" onClick={() => navigate('/')}>
                        Go to Home
                    </button>
                </div>
            </section>
        )
    }

    return (
        <section className="section">
            <div className="container">
                {/* Header */}
                <div className="dashboard-header">
                    <div>
                        <h1>Dashboard</h1>
                        <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>
                            Welcome back! Here's your subscription overview.
                        </p>
                    </div>
                    <button className="btn-primary" onClick={() => navigate('/plans')}>
                        Upgrade Plan
                    </button>
                </div>

                {/* Active Subscription */}
                <div className="sub-status-card">
                    <div className="sub-info">
                        <h3>Current Subscription</h3>
                        <div className="sub-plan">Premium Plan</div>
                        <div className="sub-details">
                            <div className="sub-detail">
                                💳 $20.00/mo
                            </div>
                            <div className="sub-detail">
                                🪙 Paying in USDC
                            </div>
                            <div className="sub-detail">
                                📅 Renews Mar 6, 2026
                            </div>
                        </div>
                    </div>
                    <div className="sub-actions">
                        <button className="btn-secondary" style={{ padding: '10px 20px', borderRadius: 'var(--radius-md)' }}>
                            Change Plan
                        </button>
                        <button className="btn-secondary" style={{ padding: '10px 20px', borderRadius: 'var(--radius-md)', borderColor: '#ef4444', color: '#ef4444' }}>
                            Cancel
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon">💰</div>
                        <div className="stat-value">$190.00</div>
                        <div className="stat-label">Total Spent</div>
                        <div className="stat-change up">↑ 12% vs last month</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">🔄</div>
                        <div className="stat-value">8</div>
                        <div className="stat-label">Total Transactions</div>
                        <div className="stat-change up">↑ 3 new this month</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">👥</div>
                        <div className="stat-value">6</div>
                        <div className="stat-label">Active Subscribers</div>
                        <div className="stat-change up">↑ 2 new</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">⏱️</div>
                        <div className="stat-value">22 days</div>
                        <div className="stat-label">Until Renewal</div>
                        <div className="stat-change" style={{ background: 'rgba(139,92,246,0.1)', color: 'var(--accent-purple)' }}>
                            Auto-renew ON
                        </div>
                    </div>
                </div>

                {/* Transaction Table */}
                <div className="table-card">
                    <div className="table-header">
                        <h3>Transaction History</h3>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            {mockTransactions.length} transactions
                        </span>
                    </div>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Tx ID</th>
                                <th>User</th>
                                <th>Plan</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Coin</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockTransactions.map((tx) => (
                                <tr key={tx.id}>
                                    <td style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{tx.id}</td>
                                    <td>{tx.user}</td>
                                    <td>{tx.plan}</td>
                                    <td>{tx.type}</td>
                                    <td style={{ fontWeight: 600 }}>${tx.amount.toFixed(2)}</td>
                                    <td>
                                        <span className={`coin-badge ${tx.coin.toLowerCase()}`}>
                                            {tx.coin}
                                        </span>
                                    </td>
                                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{tx.date}</td>
                                    <td>
                                        <span className={`status-badge ${tx.status}`}>
                                            {tx.status === 'active' ? '●' : tx.status === 'pending' ? '○' : '✕'} {tx.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default Dashboard
