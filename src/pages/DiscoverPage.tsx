import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, AlertTriangle, Map as MapIcon, List } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import lagosArt from '../assets/lagos-art.png';
import { GEMS } from '../data/gems';
import GemDetailModal from '../components/GemDetailModal';

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

const DiscoverPage: React.FC = () => {
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
    const [selectedGem, setSelectedGem] = useState<any | null>(null);

    const handleGemClick = (gem: any) => {
        setSelectedGem(gem);
    };

    return (
        <div className="discover-page">
            <GemDetailModal
                gem={selectedGem}
                isOpen={!!selectedGem}
                onClose={() => setSelectedGem(null)}
            />

            <header style={{
                background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${lagosArt})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '6rem 0',
                textAlign: 'center',
                color: '#fff'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Discover Lagos Gems</h1>
                    <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                        Curated experiences, verified for safety and authenticity.
                    </p>
                </div>
            </header>

            <div className="container" style={{ padding: '2rem 0' }}>
                {/* View Toggle */}
                <div className="flex justify-end mb-4" style={{ marginBottom: '2rem' }}>
                    <div style={{
                        background: 'var(--color-bg-card)',
                        padding: '0.25rem',
                        borderRadius: 'var(--radius-md)',
                        display: 'inline-flex',
                        border: '1px solid var(--color-border)'
                    }}>
                        <button
                            onClick={() => setViewMode('list')}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: 'var(--radius-sm)',
                                background: viewMode === 'list' ? 'var(--color-primary)' : 'transparent',
                                color: viewMode === 'list' ? '#000' : 'var(--color-text-muted)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontWeight: '600'
                            }}
                        >
                            <List size={18} /> List
                        </button>
                        <button
                            onClick={() => setViewMode('map')}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: 'var(--radius-sm)',
                                background: viewMode === 'map' ? 'var(--color-primary)' : 'transparent',
                                color: viewMode === 'map' ? '#000' : 'var(--color-text-muted)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontWeight: '600'
                            }}
                        >
                            <MapIcon size={18} /> Map
                        </button>
                    </div>
                </div>

                {viewMode === 'list' ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}>
                        {GEMS.map((gem) => (
                            <div
                                key={gem.id}
                                onClick={() => handleGemClick(gem)}
                                style={{ display: 'block', cursor: 'pointer' }}
                            >
                                <motion.div
                                    className="card"
                                    style={{ padding: 0, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}
                                    whileHover={{ y: -5 }}
                                >
                                    <div style={{ height: '200px', overflow: 'hidden' }}>
                                        <img src={gem.image} alt={gem.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
                                            <span style={{
                                                fontSize: '0.75rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em',
                                                color: 'var(--color-primary)'
                                            }}>
                                                {gem.category}
                                            </span>
                                            <div className="flex items-center gap-xs" style={{ color: 'var(--color-secondary)' }}>
                                                <Star size={16} fill="currentColor" />
                                                <span style={{ fontWeight: 'bold' }}>{gem.rating}</span>
                                            </div>
                                        </div>

                                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-text)' }}>{gem.name}</h3>
                                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                            {gem.description}
                                        </p>

                                        <div className="flex justify-between items-center" style={{ marginTop: 'auto' }}>
                                            <div className="flex items-center gap-xs" style={{
                                                color: gem.safetyLevel === 'High' ? 'var(--color-success)' : 'var(--color-warning)',
                                                fontSize: '0.875rem',
                                                fontWeight: '500'
                                            }}>
                                                <ShieldCheckOrAlert level={gem.safetyLevel} />
                                                <span>{gem.safetyLevel} Safety</span>
                                            </div>
                                            {gem.warning && (
                                                <div title={gem.warning} style={{ color: 'var(--color-accent)', cursor: 'help' }}>
                                                    <AlertTriangle size={18} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ height: '600px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--color-border)', position: 'relative' }}>
                        <MapWrapper gems={GEMS} onGemClick={handleGemClick} />
                    </div>
                )}
            </div>
        </div>
    );
};

const MapWrapper = ({ gems, onGemClick }: { gems: any[], onGemClick: (gem: any) => void }) => {
    const [is3D, setIs3D] = useState(false);
    const [mapType, setMapType] = useState<'satellite' | 'street'>('satellite');

    return (
        <>
            <motion.div
                animate={{
                    rotateX: is3D ? 45 : 0,
                    scale: is3D ? 1.4 : 1,
                    perspective: 1000
                }}
                transition={{ duration: 0.8 }}
                style={{ height: '100%', width: '100%', transformStyle: 'preserve-3d' }}
            >
                <MapContainer center={[6.4500, 3.4500]} zoom={12} maxZoom={22} style={{ height: '100%', width: '100%' }}>
                    {mapType === 'satellite' ? (
                        <>
                            <TileLayer
                                attribution='&copy; Google Maps'
                                url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
                                maxNativeZoom={20}
                                maxZoom={22}
                            />
                        </>
                    ) : (
                        <TileLayer
                            attribution='&copy; OpenStreetMap contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            maxNativeZoom={19}
                            maxZoom={22}
                        />
                    )}
                    {gems.map((gem) => (
                        <Marker
                            key={gem.id}
                            position={gem.position}
                            icon={L.divIcon({
                                className: 'custom-marker',
                                html: `<div style="
                                    width: 40px; 
                                    height: 40px; 
                                    border-radius: 50%; 
                                    border: 2px solid #00CC66; 
                                    overflow: hidden; 
                                    background: #000;
                                    box-shadow: 0 4px 10px rgba(0,0,0,0.5);
                                ">
                                    <img src="${gem.image}" style="width: 100%; height: 100%; object-fit: cover;" />
                                </div>`,
                                iconSize: [40, 40],
                                iconAnchor: [20, 40]
                            })}
                        >
                            <Popup className="custom-popup">
                                <div style={{ width: '200px' }}>
                                    <div style={{ height: '100px', borderRadius: '8px 8px 0 0', overflow: 'hidden', marginBottom: '0.5rem' }}>
                                        <img src={gem.image} alt={gem.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <h3 style={{ margin: '0 0 0.25rem', fontSize: '1rem', fontWeight: 'bold' }}>{gem.name}</h3>
                                    <p style={{ margin: '0 0 0.5rem', fontSize: '0.8rem', color: '#666' }}>{gem.category}</p>
                                    <button
                                        onClick={() => onGemClick(gem)}
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            textAlign: 'center',
                                            background: 'var(--color-primary)',
                                            color: '#000',
                                            padding: '0.4rem',
                                            borderRadius: '4px',
                                            border: 'none',
                                            fontWeight: '600',
                                            fontSize: '0.8rem',
                                            marginBottom: '0.5rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        View Details
                                    </button>
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${gem.position[0]},${gem.position[1]}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'block',
                                            textAlign: 'center',
                                            color: 'var(--color-primary)',
                                            textDecoration: 'underline',
                                            fontSize: '0.75rem'
                                        }}
                                    >
                                        Open in Google Maps
                                    </a>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </motion.div>

            {/* Floating Controls */}
            <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                zIndex: 1000
            }}>
                <button
                    onClick={() => setIs3D(!is3D)}
                    className="btn"
                    style={{
                        background: is3D ? 'var(--color-primary)' : 'rgba(15, 23, 42, 0.9)',
                        color: is3D ? '#000' : '#fff',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid var(--color-border)',
                        padding: '0.5rem 1rem',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                >
                    {is3D ? '2D View' : '3D View'}
                </button>
                <button
                    onClick={() => setMapType(mapType === 'satellite' ? 'street' : 'satellite')}
                    className="btn"
                    style={{
                        background: 'rgba(15, 23, 42, 0.9)',
                        color: '#fff',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid var(--color-border)',
                        padding: '0.5rem 1rem',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                >
                    {mapType === 'satellite' ? 'Show Map' : 'Show Satellite'}
                </button>
            </div>
        </>
    );
};

const ShieldCheckOrAlert = ({ level }: { level: string }) => {
    if (level === 'High') return <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'currentColor' }} />;
    return <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'currentColor' }} />;
};

export default DiscoverPage;
