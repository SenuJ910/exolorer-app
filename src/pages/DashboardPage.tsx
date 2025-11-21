import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Settings, Crown, LogOut, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GEMS } from '../data/gems';
import PaymentModal from '../components/PaymentModal';

const DashboardPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'saved' | 'settings'>('overview');
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);

    // Mock User Data
    const user = {
        name: "Alex Explorer",
        email: "alex@example.com",
        avatar: "https://placehold.co/150x150/00CC66/000?text=AE",
        memberSince: "Nov 2023",
        status: "Free Plan",
        savedGems: [1, 3] // IDs of saved gems
    };

    const savedGemsList = GEMS.filter(gem => user.savedGems.includes(gem.id));

    return (
        <div className="dashboard-page" style={{ minHeight: '100vh', background: 'var(--color-bg)', paddingBottom: '4rem' }}>
            <PaymentModal isOpen={isPaymentOpen} onClose={() => setIsPaymentOpen(false)} />

            {/* Header / Profile Section */}
            <div style={{
                background: 'linear-gradient(to right, #0f172a, #1e293b)',
                padding: '4rem 0 2rem',
                borderBottom: '1px solid var(--color-border)'
            }}>
                <div className="container">
                    <div className="flex flex-col md:flex-row items-center gap-xl">
                        <motion.img
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            src={user.avatar}
                            alt="Profile"
                            style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                border: '4px solid var(--color-primary)',
                                boxShadow: '0 0 20px rgba(0, 204, 102, 0.3)'
                            }}
                        />
                        <div style={{ textAlign: 'center' }}>
                            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{user.name}</h1>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>Member since {user.memberSince}</p>
                            <div className="flex gap-sm justify-center md:justify-start">
                                <span style={{
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: 'var(--radius-full)',
                                    fontSize: '0.8rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <User size={14} /> Solo Traveler
                                </span>
                                <span style={{
                                    background: 'var(--color-bg-card)',
                                    border: '1px solid var(--color-border)',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: 'var(--radius-full)',
                                    fontSize: '0.8rem',
                                    color: 'var(--color-text-muted)'
                                }}>
                                    {user.status}
                                </span>
                            </div>
                        </div>

                        <div style={{ marginLeft: 'auto' }}>
                            <button
                                className="btn btn-primary"
                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                onClick={() => setIsPaymentOpen(true)}
                            >
                                <Crown size={18} /> Upgrade to Premium
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ marginTop: '2rem' }}>
                <div className="flex flex-col md:flex-row gap-xl">

                    {/* Sidebar Navigation */}
                    <div style={{ flex: 1, maxWidth: '250px' }}>
                        <div className="card" style={{ padding: '1rem' }}>
                            <nav className="flex flex-col gap-xs">
                                <button
                                    onClick={() => setActiveTab('overview')}
                                    style={{
                                        textAlign: 'left',
                                        padding: '0.75rem 1rem',
                                        borderRadius: 'var(--radius-md)',
                                        background: activeTab === 'overview' ? 'var(--color-primary)' : 'transparent',
                                        color: activeTab === 'overview' ? '#000' : 'var(--color-text)',
                                        fontWeight: activeTab === 'overview' ? '600' : '400',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        cursor: 'pointer',
                                        border: 'none',
                                        width: '100%'
                                    }}
                                >
                                    <User size={18} /> Overview
                                </button>
                                <button
                                    onClick={() => setActiveTab('saved')}
                                    style={{
                                        textAlign: 'left',
                                        padding: '0.75rem 1rem',
                                        borderRadius: 'var(--radius-md)',
                                        background: activeTab === 'saved' ? 'var(--color-primary)' : 'transparent',
                                        color: activeTab === 'saved' ? '#000' : 'var(--color-text)',
                                        fontWeight: activeTab === 'saved' ? '600' : '400',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        cursor: 'pointer',
                                        border: 'none',
                                        width: '100%'
                                    }}
                                >
                                    <MapPin size={18} /> Saved Gems
                                </button>
                                <button
                                    onClick={() => setActiveTab('settings')}
                                    style={{
                                        textAlign: 'left',
                                        padding: '0.75rem 1rem',
                                        borderRadius: 'var(--radius-md)',
                                        background: activeTab === 'settings' ? 'var(--color-primary)' : 'transparent',
                                        color: activeTab === 'settings' ? '#000' : 'var(--color-text)',
                                        fontWeight: activeTab === 'settings' ? '600' : '400',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        cursor: 'pointer',
                                        border: 'none',
                                        width: '100%'
                                    }}
                                >
                                    <Settings size={18} /> Settings
                                </button>
                                <hr style={{ borderColor: 'var(--color-border)', margin: '0.5rem 0' }} />
                                <button
                                    style={{
                                        textAlign: 'left',
                                        padding: '0.75rem 1rem',
                                        borderRadius: 'var(--radius-md)',
                                        color: 'var(--color-warning)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        cursor: 'pointer',
                                        border: 'none',
                                        background: 'transparent',
                                        width: '100%'
                                    }}
                                >
                                    <LogOut size={18} /> Sign Out
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div style={{ flex: 3 }}>
                        {activeTab === 'overview' && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <h2 style={{ marginBottom: '1.5rem' }}>Dashboard Overview</h2>

                                {/* Stats Grid */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                                    <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                                        <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--color-primary)' }}>{savedGemsList.length}</div>
                                        <div style={{ color: 'var(--color-text-muted)' }}>Saved Gems</div>
                                    </div>
                                    <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                                        <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--color-secondary)' }}>0</div>
                                        <div style={{ color: 'var(--color-text-muted)' }}>Upcoming Trips</div>
                                    </div>
                                    <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                                        <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--color-accent)' }}>3</div>
                                        <div style={{ color: 'var(--color-text-muted)' }}>Active Chats</div>
                                    </div>
                                </div>

                                {/* Premium Banner */}
                                <div className="card" style={{
                                    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                                    border: '1px solid var(--color-primary)',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{ position: 'relative', zIndex: 1 }}>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <Crown color="var(--color-secondary)" fill="var(--color-secondary)" /> Go Premium
                                                </h3>
                                                <p style={{ color: 'var(--color-text-muted)', maxWidth: '400px', marginBottom: '1.5rem' }}>
                                                    Unlock exclusive local guides, offline maps, and priority safety support.
                                                </p>
                                                <button className="btn btn-primary">View Plans</button>
                                            </div>
                                            <div className="hidden-mobile" style={{ fontSize: '5rem', opacity: 0.1 }}>
                                                💎
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'saved' && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <h2 style={{ marginBottom: '1.5rem' }}>Saved Gems</h2>
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    {savedGemsList.map(gem => (
                                        <div key={gem.id} className="card" style={{ display: 'flex', gap: '1rem', padding: '1rem', alignItems: 'center' }}>
                                            <img src={gem.image} alt={gem.name} style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }} />
                                            <div style={{ flex: 1 }}>
                                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{gem.name}</h3>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{gem.category}</span>
                                            </div>
                                            <Link to={`/discover/${gem.id}`} className="btn btn-outline" style={{ padding: '0.5rem' }}>
                                                <ChevronRight size={20} />
                                            </Link>
                                        </div>
                                    ))}
                                    {savedGemsList.length === 0 && (
                                        <p className="text-muted">No saved gems yet. Go explore!</p>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'settings' && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <h2 style={{ marginBottom: '1.5rem' }}>Account Settings</h2>
                                <div className="card">
                                    <div className="flex flex-col gap-lg">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 style={{ fontSize: '1rem' }}>Email Notifications</h3>
                                                <p className="text-muted" style={{ fontSize: '0.8rem' }}>Receive updates about new gems and safety alerts.</p>
                                            </div>
                                            <div style={{ width: '40px', height: '20px', background: 'var(--color-primary)', borderRadius: '10px', position: 'relative' }}>
                                                <div style={{ width: '16px', height: '16px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px' }}></div>
                                            </div>
                                        </div>
                                        <hr style={{ borderColor: 'var(--color-border)' }} />
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 style={{ fontSize: '1rem' }}>Location Sharing</h3>
                                                <p className="text-muted" style={{ fontSize: '0.8rem' }}>Allow friends to see your location in Live Connect.</p>
                                            </div>
                                            <div style={{ width: '40px', height: '20px', background: '#334155', borderRadius: '10px', position: 'relative' }}>
                                                <div style={{ width: '16px', height: '16px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px' }}></div>
                                            </div>
                                        </div>
                                        <hr style={{ borderColor: 'var(--color-border)' }} />
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 style={{ fontSize: '1rem' }}>Payment Method</h3>
                                                <p className="text-muted" style={{ fontSize: '0.8rem' }}>Manage your subscription payment details.</p>
                                            </div>
                                            <button className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem' }}>Update</button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
