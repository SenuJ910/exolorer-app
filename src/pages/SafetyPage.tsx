import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Share2, PhoneCall } from 'lucide-react';

const SafetyPage: React.FC = () => {
    const [isSosActive, setIsSosActive] = useState(false);

    const handleSosClick = () => {
        setIsSosActive(!isSosActive);
        // In a real app, this would trigger the SOS protocol
    };

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Safety Center</h1>

            <div style={{
                display: 'grid',
                gap: '2rem',
                maxWidth: '600px',
                margin: '0 auto'
            }}>
                {/* SOS Button */}
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSosClick}
                    style={{
                        background: isSosActive ? 'var(--color-text)' : 'var(--color-danger)',
                        color: isSosActive ? 'var(--color-danger)' : '#fff',
                        border: 'none',
                        borderRadius: '50%',
                        width: '200px',
                        height: '200px',
                        margin: '0 auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 0 50px ${isSosActive ? 'rgba(255, 255, 255, 0.5)' : 'rgba(239, 68, 68, 0.5)'}`,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                >
                    <ShieldAlert size={64} />
                    <span style={{ fontSize: '1.5rem', fontWeight: '800', marginTop: '0.5rem' }}>
                        {isSosActive ? 'CANCEL' : 'SOS'}
                    </span>
                </motion.button>

                <p className="text-center text-muted">
                    Press and hold for 3 seconds to alert emergency contacts and local authorities.
                </p>

                {/* Quick Actions */}
                <div className="card flex flex-col gap-md">
                    <div className="flex items-center justify-between p-2">
                        <div className="flex items-center gap-sm">
                            <Share2 color="var(--color-primary)" />
                            <div>
                                <h3 className="font-semibold">Share Live Location</h3>
                                <p className="text-muted" style={{ fontSize: '0.875rem' }}>Trusted contacts will see where you are.</p>
                            </div>
                        </div>
                        <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round"></span>
                        </label>
                    </div>

                    {/* Lagos Emergency (112/767) */}
                    <div className="flex items-center justify-between p-2" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                        <div className="flex items-center gap-sm">
                            <PhoneCall color="var(--color-danger)" />
                            <div>
                                <h3 className="font-semibold">Lagos Emergency</h3>
                                <p className="text-muted" style={{ fontSize: '0.875rem' }}>General Emergency (112 / 767)</p>
                            </div>
                        </div>
                        <a href="tel:112" className="btn btn-outline" style={{ padding: '0.5rem 1rem', textDecoration: 'none', color: 'inherit' }}>Call</a>
                    </div>

                    {/* Police Control Room */}
                    <div className="flex items-center justify-between p-2" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                        <div className="flex items-center gap-sm">
                            <ShieldAlert color="var(--color-info)" />
                            <div>
                                <h3 className="font-semibold">Police Control</h3>
                                <p className="text-muted" style={{ fontSize: '0.875rem' }}>Rapid Response Squad</p>
                            </div>
                        </div>
                        <a href="tel:08022222323" className="btn btn-outline" style={{ padding: '0.5rem 1rem', textDecoration: 'none', color: 'inherit' }}>Call</a>
                    </div>

                    {/* LASTMA (Traffic) */}
                    <div className="flex items-center justify-between p-2" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                        <div className="flex items-center gap-sm">
                            <div style={{ fontWeight: 'bold', color: '#FFD700' }}>⚠️</div>
                            <div>
                                <h3 className="font-semibold">LASTMA</h3>
                                <p className="text-muted" style={{ fontSize: '0.875rem' }}>Traffic Emergencies</p>
                            </div>
                        </div>
                        <a href="tel:08129928515" className="btn btn-outline" style={{ padding: '0.5rem 1rem', textDecoration: 'none', color: 'inherit' }}>Call</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SafetyPage;
