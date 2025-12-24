import React, { useState, useEffect } from 'react';
import { MapPin, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMenuOpen]);

    // Close menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navLinks = [
        { path: '/discover', label: 'Discover' },
        { path: '/events', label: 'Events' },
        { path: '/connect', label: 'Live Connect', style: { color: 'var(--color-secondary)' } },
        { path: '/safety', label: 'Safety' },
        { path: '/community', label: 'Community' },
        { path: '/dashboard', label: 'Profile', isButton: true },
    ];

    return (
        <nav className="navbar" style={{
            padding: '1rem 0',
            borderBottom: '1px solid var(--color-border)',
            position: 'sticky',
            top: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(12px)',
            zIndex: 100,
            height: '80px',
            display: 'flex',
            alignItems: 'center'
        }}>
            <div className="container flex justify-between items-center w-full">
                <Link to="/" className="flex items-center gap-sm relative" style={{ textDecoration: 'none', zIndex: 110 }}>
                    <div style={{
                        backgroundColor: 'var(--color-primary)',
                        padding: '0.5rem',
                        borderRadius: 'var(--radius-md)',
                        color: '#000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <MapPin size={24} />
                    </div>
                    <span style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: 'var(--color-text)',
                        letterSpacing: '-0.02em',
                        fontFamily: "'Outfit', sans-serif"
                    }}>
                        Exolorer
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden-mobile flex gap-lg items-center">
                    {navLinks.map((link) => (
                        link.isButton ? (
                            <Link key={link.path} to={link.path} className="btn btn-outline" style={{ textDecoration: 'none', padding: '0.5rem 1.25rem' }}>
                                {link.label}
                            </Link>
                        ) : (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="text-muted hover:text-primary transition font-medium"
                                style={{ ...link.style, textDecoration: 'none' }}
                            >
                                {link.label}
                            </Link>
                        )
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn relative p-2"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 110
                    }}
                >
                    {isMenuOpen ? (
                        <X size={28} color="var(--color-text)" />
                    ) : (
                        <Menu size={28} color="var(--color-text)" />
                    )}
                </button>
            </div>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setIsMenuOpen(false)}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0,0,0,0.6)',
                                backdropFilter: 'blur(4px)',
                                zIndex: 90
                            }}
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            style={{
                                position: 'fixed',
                                top: 0,
                                right: 0,
                                bottom: 0,
                                width: 'min(300px, 80vw)',
                                backgroundColor: 'var(--color-bg-card)',
                                borderLeft: '1px solid var(--color-border)',
                                zIndex: 95,
                                padding: '6rem 1.5rem 2rem', // Top padding clears the header/close button area
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.5rem',
                                boxShadow: '-10px 0 30px rgba(0,0,0,0.5)'
                            }}
                        >
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: idx * 0.05 + 0.1 }}
                                >
                                    <Link
                                        to={link.path}
                                        className={link.isButton ? "btn btn-primary w-full" : "font-semibold"}
                                        style={{
                                            ...link.style,
                                            color: link.isButton ? '#000' : 'var(--color-text)',
                                            textDecoration: 'none',
                                            display: link.isButton ? 'flex' : 'block',
                                            padding: link.isButton ? '0.75rem' : '1rem 0',
                                            fontSize: link.isButton ? '1rem' : '1.25rem',
                                            borderBottom: link.isButton ? 'none' : '1px solid rgba(255,255,255,0.05)'
                                        }}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
