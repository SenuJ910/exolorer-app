import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, MapPin, Clock, Shield, Heart, Share2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import TransportModal from './TransportModal';

// Fix for default leaflet marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface GemDetailModalProps {
    gem: any | null;
    isOpen: boolean;
    onClose: () => void;
}

const GemDetailModal: React.FC<GemDetailModalProps> = ({ gem, isOpen, onClose }) => {
    const [isTransportOpen, setIsTransportOpen] = useState(false);

    if (!isOpen || !gem) return null;

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
                            justifyContent: 'center',
                            padding: '1rem'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="card"
                            style={{
                                width: '100%',
                                maxWidth: '900px',
                                maxHeight: '90vh',
                                overflowY: 'auto',
                                padding: 0,
                                position: 'relative',
                                background: 'var(--color-bg)',
                                border: '1px solid var(--color-border)'
                            }}
                        >
                            <button
                                onClick={onClose}
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: 'rgba(0,0,0,0.5)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '32px',
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    cursor: 'pointer',
                                    zIndex: 10
                                }}
                            >
                                <X size={20} />
                            </button>

                            {/* Hero Image */}
                            <div style={{ height: '300px', position: 'relative' }}>
                                <img
                                    src={gem.image}
                                    alt={gem.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: '100%',
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                                    padding: '2rem 1.5rem 1rem'
                                }}>
                                    <div className="flex items-center gap-md mb-2">
                                        <span style={{
                                            background: 'var(--color-primary)',
                                            color: '#000',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: 'var(--radius-full)',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            textTransform: 'uppercase'
                                        }}>
                                            {gem.category}
                                        </span>
                                        <div className="flex items-center gap-xs" style={{ color: 'var(--color-secondary)' }}>
                                            <Star size={16} fill="currentColor" />
                                            <span style={{ fontWeight: 'bold' }}>{gem.rating}</span>
                                        </div>
                                    </div>
                                    <h2 style={{ fontSize: '2rem', margin: 0, color: '#fff' }}>{gem.name}</h2>
                                </div>
                            </div>

                            <div style={{ padding: '1.5rem' }}>
                                <div className="flex flex-col md:flex-row gap-xl">
                                    {/* Main Content */}
                                    <div style={{ flex: 2 }}>
                                        <section style={{ marginBottom: '2rem' }}>
                                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>About</h3>
                                            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                                                {gem.fullDescription || gem.description}
                                            </p>
                                        </section>

                                        <section>
                                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Location</h3>
                                            <div style={{ height: '300px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                                                <MapContainer center={gem.position} zoom={15} style={{ height: '100%', width: '100%' }}>
                                                    <TileLayer
                                                        attribution='&copy; Google Maps'
                                                        url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
                                                        maxNativeZoom={20}
                                                        maxZoom={22}
                                                    />
                                                    <Marker position={gem.position}>
                                                        <Popup>{gem.name}</Popup>
                                                    </Marker>
                                                </MapContainer>
                                            </div>
                                        </section>
                                    </div>

                                    {/* Sidebar Info */}
                                    <div style={{ flex: 1 }}>
                                        <div className="flex flex-col gap-lg p-4 bg-card rounded-lg border border-border">
                                            <div className="flex items-start gap-md">
                                                <MapPin className="text-primary shrink-0" size={20} />
                                                <div>
                                                    <h4 style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>Address</h4>
                                                    <p className="text-muted" style={{ fontSize: '0.85rem' }}>{gem.address}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-md">
                                                <Clock className="text-primary shrink-0" size={20} />
                                                <div>
                                                    <h4 style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>Opening Hours</h4>
                                                    <p className="text-muted" style={{ fontSize: '0.85rem' }}>{gem.openingHours}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-md">
                                                <Shield className={`shrink-0 ${gem.safetyLevel === 'High' ? 'text-success' : 'text-warning'}`} size={20} />
                                                <div>
                                                    <h4 style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>Safety: {gem.safetyLevel}</h4>
                                                    <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                                                        {gem.safetyLevel === 'High' ? 'Verified safe zone.' : 'Exercise caution.'}
                                                    </p>
                                                </div>
                                            </div>

                                            <hr style={{ borderColor: 'var(--color-border)' }} />

                                            <div className="flex flex-col gap-sm">
                                                <button
                                                    className="btn btn-primary w-full"
                                                    onClick={() => setIsTransportOpen(true)}
                                                >
                                                    Get Directions
                                                </button>
                                                <div className="flex gap-sm">
                                                    <button className="btn btn-outline flex-1 flex justify-center items-center py-2">
                                                        <Heart size={18} />
                                                    </button>
                                                    <button className="btn btn-outline flex-1 flex justify-center items-center py-2">
                                                        <Share2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <TransportModal
                        isOpen={isTransportOpen}
                        onClose={() => setIsTransportOpen(false)}
                        destination={gem.name}
                    />
                </>
            )}
        </AnimatePresence>
    );
};

export default GemDetailModal;
