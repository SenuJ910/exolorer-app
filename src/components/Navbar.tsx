import React from 'react';
import { MapPin, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <nav className="navbar" style={{
            padding: '1.5rem 0',
            borderBottom: '1px solid var(--color-border)',
            position: 'sticky',
            top: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(10px)',
            zIndex: 50
        }}>
            <div className="container flex justify-between items-center">
                <Link to="/" className="flex items-center gap-sm" style={{ textDecoration: 'none' }}>
                    <div style={{
                        backgroundColor: 'var(--color-primary)',
                        padding: '0.5rem',
                        borderRadius: 'var(--radius-md)',
                        color: '#000'
                    }}>
                        <MapPin size={24} />
                    </div>
                    <span style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: 'var(--color-text)',
                        letterSpacing: '-0.02em'
                    }}>
                        Exolorer
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden-mobile flex gap-lg items-center">
                    <Link to="/discover" className="text-muted hover:text-primary transition">Discover</Link>
                    <Link to="/events" className="text-muted hover:text-primary transition">Events</Link>
                    <Link to="/connect" className="text-muted hover:text-primary transition" style={{ color: 'var(--color-secondary)' }}>Live Connect</Link>
                    <Link to="/safety" className="text-muted hover:text-primary transition">Safety</Link>
                    <Link to="/community" className="text-muted hover:text-primary transition">Community</Link>
                    <Link to="/dashboard" className="btn btn-outline" style={{ textDecoration: 'none', padding: '0.5rem 1rem' }}>Profile</Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'none' // Hidden by default, shown via CSS media query
                    }}
                >
                    <Menu size={24} color="var(--color-text)" />
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    width: '100%',
                    background: 'var(--color-bg)',
                    borderBottom: '1px solid var(--color-border)',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                }}>
                    <Link to="/discover" onClick={() => setIsMenuOpen(false)} className="text-muted" style={{ padding: '0.5rem' }}>Discover</Link>
                    <Link to="/events" onClick={() => setIsMenuOpen(false)} className="text-muted" style={{ padding: '0.5rem' }}>Events</Link>
                    <Link to="/connect" onClick={() => setIsMenuOpen(false)} className="text-muted" style={{ padding: '0.5rem', color: 'var(--color-secondary)' }}>Live Connect</Link>
                    <Link to="/safety" onClick={() => setIsMenuOpen(false)} className="text-muted" style={{ padding: '0.5rem' }}>Safety</Link>
                    <Link to="/community" onClick={() => setIsMenuOpen(false)} className="text-muted" style={{ padding: '0.5rem' }}>Community</Link>
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="btn btn-primary" style={{ textAlign: 'center' }}>Profile</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
