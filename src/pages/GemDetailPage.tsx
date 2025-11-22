import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Shield, ArrowLeft, Share2, Heart } from 'lucide-react';
import { GEMS } from '../data/gems';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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

import TransportModal from '../components/TransportModal';

const GemDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const gem = GEMS.find(g => g.id === Number(id));
    const [isTransportOpen, setIsTransportOpen] = React.useState(false);

    if (!gem) {
        return (
            <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <h2>Gem not found</h2>
                <Link to="/discover" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Discover</Link>
            </div>
        );
    }

    return (
        <div className="gem-detail-page">
            <TransportModal
                isOpen={isTransportOpen}
                onClose={() => setIsTransportOpen(false)}
                destination={gem.name}
            />

            {/* Hero Image */}
            <div style={{
                height: '50vh',
                minHeight: '400px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <img
                    src={gem.image}
                    alt={gem.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), var(--color-bg))'
                }} />

                <div className="container" style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    paddingBottom: '2rem'
                }}>
                    <Link to="/discover" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'rgba(255,255,255,0.8)',
                        marginBottom: '1rem',
                        fontSize: '0.9rem'
                    }}>
                        <ArrowLeft size={16} /> Back to Discover
                    </Link>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontSize: '3rem', marginBottom: '0.5rem' }}
                    >
                        {gem.name}
                    </motion.h1>
                    <div className="flex items-center gap-md">
                        <span style={{
                            background: 'var(--color-primary)',
                            color: '#000',
                            padding: '0.25rem 0.75rem',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            textTransform: 'uppercase'
                        }}>
                            {gem.category}
                        </span>
                        <div className="flex items-center gap-xs" style={{ color: 'var(--color-secondary)' }}>
                            <Star size={18} fill="currentColor" />
                            <span style={{ fontWeight: 'bold' }}>{gem.rating}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: '3rem 0' }}>
                <div className="flex flex-col md:flex-row gap-xl">
                    {/* Main Content */}
                    <div style={{ flex: 2 }}>
                        <section style={{ marginBottom: '3rem' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>About</h2>
                            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', fontSize: '1.1rem' }}>
                                {gem.fullDescription || gem.description}
                            </p>
                        </section>

                        <section style={{ marginBottom: '3rem' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Location</h2>
                            <div style={{ height: '300px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                                <MapContainer center={gem.position} zoom={15} style={{ height: '100%', width: '100%' }}>
                                    <TileLayer
                                        attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                    />
                                    <TileLayer
                                        url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}"
                                    />
                                    <TileLayer
                                        url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
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
                        <div className="card" style={{ position: 'sticky', top: '100px' }}>
                            <div className="flex flex-col gap-lg">
                                <div className="flex items-start gap-md">
                                    <MapPin className="text-primary" size={24} />
                                    <div>
                                        <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Address</h3>
                                        <p className="text-muted" style={{ fontSize: '0.9rem' }}>{gem.address}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-md">
                                    <Clock className="text-primary" size={24} />
                                    <div>
                                        <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Opening Hours</h3>
                                        <p className="text-muted" style={{ fontSize: '0.9rem' }}>{gem.openingHours}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-md">
                                    <Shield className={gem.safetyLevel === 'High' ? 'text-success' : 'text-warning'} size={24} color={gem.safetyLevel === 'High' ? 'var(--color-success)' : 'var(--color-warning)'} />
                                    <div>
                                        <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Safety Level: {gem.safetyLevel}</h3>
                                        <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                                            {gem.safetyLevel === 'High' ? 'Verified safe zone with security presence.' : 'Exercise normal caution.'}
                                        </p>
                                    </div>
                                </div>

                                <hr style={{ borderColor: 'var(--color-border)' }} />

                                <div className="flex gap-md">
                                    <button
                                        className="btn btn-primary w-full"
                                        onClick={() => setIsTransportOpen(true)}
                                    >
                                        Get Directions
                                    </button>
                                    <button className="btn btn-outline" style={{ padding: '0.75rem' }}>
                                        <Heart size={20} />
                                    </button>
                                    <button className="btn btn-outline" style={{ padding: '0.75rem' }}>
                                        <Share2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GemDetailPage;
