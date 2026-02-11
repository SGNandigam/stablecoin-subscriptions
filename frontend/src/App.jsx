import { useState, createContext } from 'react'
import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import Landing from './pages/Landing'
import Plans from './pages/Plans'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'

export const WalletContext = createContext()

function App() {
    const [wallet, setWallet] = useState(null)
    const [showWalletModal, setShowWalletModal] = useState(false)
    const [toast, setToast] = useState(null)
    const location = useLocation()

    const connectWallet = (type) => {
        // Simulate wallet connection
        const mockAddress = '0x' + Array.from({ length: 40 }, () =>
            Math.floor(Math.random() * 16).toString(16)
        ).join('')
        setWallet({
            address: mockAddress,
            type,
            balance: '1,250.00',
            network: 'Polygon Mumbai'
        })
        setShowWalletModal(false)
        showToast('Wallet connected successfully!', 'success')
    }

    const disconnectWallet = () => {
        setWallet(null)
        showToast('Wallet disconnected', 'success')
    }

    const showToast = (message, type = 'success') => {
        setToast({ message, type })
        setTimeout(() => setToast(null), 3000)
    }

    const shortAddress = wallet
        ? `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`
        : ''

    return (
        <WalletContext.Provider value={{ wallet, connectWallet, disconnectWallet, showToast }}>
            {/* Animated Background */}
            <div className="animated-bg">
                <div className="orb"></div>
                <div className="orb"></div>
                <div className="orb"></div>
            </div>

            {/* Navigation */}
            <nav className="navbar">
                <NavLink to="/" className="navbar-logo">
                    <div className="logo-icon">◈</div>
                    <span className="logo-text">StablePay</span>
                </NavLink>

                <div className="navbar-links">
                    <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>Home</NavLink>
                    <NavLink to="/plans" className={location.pathname === '/plans' ? 'active' : ''}>Plans</NavLink>
                    <NavLink to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</NavLink>
                    <NavLink to="/analytics" className={location.pathname === '/analytics' ? 'active' : ''}>Analytics</NavLink>
                </div>

                {wallet ? (
                    <button className="btn-connect connected" onClick={disconnectWallet}>
                        <span className="dot"></span>
                        {shortAddress}
                    </button>
                ) : (
                    <button className="btn-connect" onClick={() => setShowWalletModal(true)}>
                        Connect Wallet
                    </button>
                )}
            </nav>

            {/* Pages */}
            <div className="page-container">
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/plans" element={<Plans />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/analytics" element={<Analytics />} />
                </Routes>

                {/* Footer */}
                <footer className="footer">
                    <div className="container">
                        <p>© 2026 StablePay — Stablecoin Subscriptions on <a href="https://polygon.technology" target="_blank" rel="noreferrer">Polygon</a>. Built with ♥</p>
                    </div>
                </footer>
            </div>

            {/* Wallet Modal */}
            {showWalletModal && (
                <div className="modal-overlay" onClick={() => setShowWalletModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h2>Connect Wallet</h2>
                        <p>Choose a wallet provider to connect to StablePay</p>
                        <div className="wallet-options">
                            <button className="wallet-option" onClick={() => connectWallet('MetaMask')}>
                                <div className="wallet-icon">🦊</div>
                                MetaMask
                            </button>
                            <button className="wallet-option" onClick={() => connectWallet('WalletConnect')}>
                                <div className="wallet-icon">🔗</div>
                                WalletConnect
                            </button>
                            <button className="wallet-option" onClick={() => connectWallet('Coinbase')}>
                                <div className="wallet-icon">🪙</div>
                                Coinbase Wallet
                            </button>
                        </div>
                        <button className="modal-close" onClick={() => setShowWalletModal(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Toast */}
            {toast && (
                <div className={`toast ${toast.type}`}>
                    {toast.type === 'success' ? '✅' : '❌'} {toast.message}
                </div>
            )}
        </WalletContext.Provider>
    )
}

export default App
