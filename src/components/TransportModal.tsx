import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Navigation, Train, Bus, Car, Footprints } from 'lucide-react';

interface TransportModalProps {
    isOpen: boolean;
    onClose: () => void;
    destination: string;
}

const TransportModal: React.FC<TransportModalProps> = ({ isOpen, onClose, destination }) => {

    // Mock deep links (in a real app, these would use actual coordinates)
    const openRideApp = (appName: string) => {
        const encodedDest = encodeURIComponent(destination + ", Lagos, Nigeria");
        let url = "";

        switch (appName) {
            case 'Uber':
                url = `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${encodedDest}`;
                break;
            case 'Bolt':
                url = `https://bolt.eu/`;
                break;
            case 'LagosRide':
                url = `https://lagosride.com/`;
                break;
            case 'LagosRail':
                // Link to Lagos Blue/Red Line info or Cowry Card app
                url = `https://t.me/LagosMetropolitanAreaTransportAuthority`; // Placeholder for LAMATA info
                break;
            case 'BRT':
                // Link to BRT routes or Cowry app
                url = `https://play.google.com/store/apps/details?id=com.touchandpay.cowry&hl=en&gl=US`;
                break;
            case 'Drive':
                // Google Maps Driving Navigation
                url = `https://www.google.com/maps/dir/?api=1&destination=${encodedDest}&travelmode=driving`;
                break;
            case 'Walk':
                // Google Maps Walking Navigation
                url = `https://www.google.com/maps/dir/?api=1&destination=${encodedDest}&travelmode=walking`;
                break;
            default:
                break;
        }

        if (url) {
            window.open(url, '_blank');
        }
    };

    // Determine nearest public transport hubs based on destination (Mock Logic)
    const getNearestHubs = (dest: string) => {
        if (dest.includes("VI") || dest.includes("Victoria Island") || dest.includes("Lekki")) {
            return {
                rail: "Marina Station (Blue Line)",
                brt: "TBS Terminal / Lekki Phase 1 Stop"
            };
        } else if (dest.includes("Ikeja") || dest.includes("Mainland")) {
            return {
                rail: "Ikeja Station (Red Line)",
                brt: "Ikeja Bus Terminal"
            };
        } else {
            return {
                rail: "Marina Station (Blue Line)",
                brt: "CMS / Marina Terminal"
            };
        }
    };

    const hubs = getNearestHubs(destination);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(0, 0, 0, 0.8)',
                            backdropFilter: 'blur(5px)',
                            zIndex: 1000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '90%',
                            maxWidth: '450px',
                            background: 'var(--color-bg-card)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-lg)',
                            padding: '2rem',
                            zIndex: 1001,
                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                            maxHeight: '90vh',
                            overflowY: 'auto'
                        }}
                    >
                        <button
                            onClick={onClose}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--color-text-muted)',
                                cursor: 'pointer'
                            }}
                        >
                            <X size={24} />
                        </button>

                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Commute Options</h2>
                            <p style={{ color: 'var(--color-text-muted)' }}>
                                Best ways to get to <br />
                                <strong style={{ color: '#fff' }}>{destination}</strong>
                            </p>
                        </div>

                        <div className="flex flex-col gap-md">

                            {/* Self Navigation Section */}
                            <div style={{ marginBottom: '1rem' }}>
                                <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>Self Navigation</h3>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                    {/* Driving */}
                                    <button
                                        onClick={() => openRideApp('Drive')}
                                        className="card"
                                        style={{
                                            padding: '0.75rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            cursor: 'pointer',
                                            border: '1px solid var(--color-border)',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <div style={{ width: '24px', height: '24px', background: 'var(--color-primary)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
                                            <Car size={14} />
                                        </div>
                                        <span style={{ fontWeight: '600' }}>Drive</span>
                                    </button>

                                    {/* Walking */}
                                    <button
                                        onClick={() => openRideApp('Walk')}
                                        className="card"
                                        style={{
                                            padding: '0.75rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            cursor: 'pointer',
                                            border: '1px solid var(--color-border)',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <div style={{ width: '24px', height: '24px', background: 'var(--color-secondary)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
                                            <Footprints size={14} />
                                        </div>
                                        <span style={{ fontWeight: '600' }}>Walk</span>
                                    </button>
                                </div>
                            </div>

                            {/* Public Transport Section */}
                            <div style={{ marginBottom: '1rem' }}>
                                <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>Public Transport (Cheapest)</h3>

                                {/* Rail */}
                                <button
                                    onClick={() => openRideApp('LagosRail')}
                                    className="card"
                                    style={{
                                        padding: '1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        cursor: 'pointer',
                                        border: '1px solid var(--color-border)',
                                        marginBottom: '0.5rem',
                                        width: '100%'
                                    }}
                                >
                                    <div style={{ width: '40px', height: '40px', background: '#003399', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                                        <Train size={20} />
                                    </div>
                                    <div style={{ flex: 1, textAlign: 'left' }}>
                                        <h3 style={{ fontSize: '1rem' }}>Lagos Rail Mass Transit</h3>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Nearest: <span style={{ color: 'var(--color-primary)' }}>{hubs.rail}</span></p>
                                    </div>
                                    <Navigation size={18} color="var(--color-text-muted)" />
                                </button>

                                {/* BRT */}
                                <button
                                    onClick={() => openRideApp('BRT')}
                                    className="card"
                                    style={{
                                        padding: '1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        cursor: 'pointer',
                                        border: '1px solid var(--color-border)',
                                        width: '100%'
                                    }}
                                >
                                    <div style={{ width: '40px', height: '40px', background: '#CC0000', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                                        <Bus size={20} />
                                    </div>
                                    <div style={{ flex: 1, textAlign: 'left' }}>
                                        <h3 style={{ fontSize: '1rem' }}>BRT Bus</h3>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Nearest: <span style={{ color: 'var(--color-primary)' }}>{hubs.brt}</span></p>
                                    </div>
                                    <Navigation size={18} color="var(--color-text-muted)" />
                                </button>
                            </div>

                            {/* Ride Hailing Section */}
                            <div>
                                <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>Ride Hailing (Fastest)</h3>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                    {/* Uber */}
                                    <button
                                        onClick={() => openRideApp('Uber')}
                                        className="card"
                                        style={{
                                            padding: '0.75rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            cursor: 'pointer',
                                            border: '1px solid var(--color-border)',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <div style={{ width: '24px', height: '24px', background: '#000', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.8rem', fontWeight: 'bold' }}>U</div>
                                        <span style={{ fontWeight: '600' }}>Uber</span>
                                    </button>

                                    {/* Bolt */}
                                    <button
                                        onClick={() => openRideApp('Bolt')}
                                        className="card"
                                        style={{
                                            padding: '0.75rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            cursor: 'pointer',
                                            border: '1px solid var(--color-border)',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <div style={{ width: '24px', height: '24px', background: '#34D186', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.8rem', fontWeight: 'bold' }}>B</div>
                                        <span style={{ fontWeight: '600' }}>Bolt</span>
                                    </button>
                                </div>
                            </div>

                        </div>

                        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                <MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />
                                Use <a href="https://play.google.com/store/apps/details?id=com.touchandpay.cowry" target="_blank" style={{ color: 'var(--color-primary)' }}>Cowry Card</a> for Rail & BRT payments.
                            </p>
                        </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default TransportModal;
