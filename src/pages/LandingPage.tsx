import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Compass, Users, ChevronRight, Map, Phone } from 'lucide-react';

const LandingPage: React.FC = () => {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero" style={{
                padding: '6rem 0',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span style={{
                            color: 'var(--color-secondary)',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            fontSize: '0.875rem',
                            marginBottom: '1rem',
                            display: 'block'
                        }}>
                            Welcome to Lagos
                        </span>
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                            fontWeight: '800',
                            lineHeight: '1.1',
                            marginBottom: '1.5rem',
                            background: 'linear-gradient(to right, #fff, #94A3B8)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            Explore Lagos Solo.<br />
                            <span style={{ color: 'var(--color-primary)', WebkitTextFillColor: 'var(--color-primary)' }}>Never Alone.</span>
                        </h1>
                        <p style={{
                            fontSize: '1.25rem',
                            color: 'var(--color-text-muted)',
                            maxWidth: '600px',
                            margin: '0 auto 2.5rem'
                        }}>
                            The ultimate travel companion for navigating the vibrant chaos of Lagos.
                            Safety, community, and hidden gems in your pocket.
                        </p>
                        <div className="flex gap-md justify-center">
                            <Link to="/discover" className="btn btn-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                                Start Exploring <ChevronRight size={20} style={{ marginLeft: '0.5rem' }} />
                            </Link>
                            <Link to="/connect" className="btn btn-outline" style={{ textDecoration: 'none' }}>
                                View Demo
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Abstract Background Elements */}
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: '300px',
                    height: '300px',
                    background: 'var(--color-primary)',
                    filter: 'blur(150px)',
                    opacity: '0.1',
                    zIndex: -1
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '10%',
                    right: '10%',
                    width: '400px',
                    height: '400px',
                    background: 'var(--color-secondary)',
                    filter: 'blur(150px)',
                    opacity: '0.05',
                    zIndex: -1
                }} />
            </section>

            {/* Features Grid */}
            <section id="features" style={{ padding: '4rem 0', backgroundColor: 'var(--color-bg)' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}>
                        <FeatureCard
                            to="/safety"
                            icon={<Shield size={32} color="var(--color-primary)" />}
                            title="Safety First"
                            description="Real-time SOS, trusted contact sharing, and AI-driven safe routes to keep you secure."
                        />
                        <FeatureCard
                            to="/discover"
                            icon={<Compass size={32} color="var(--color-secondary)" />}
                            title="Hyper-Local Discovery"
                            description="Find verified 'Lagos Gems'—from authentic Bukka spots to hidden art galleries."
                        />
                        <FeatureCard
                            to="/community"
                            icon={<Users size={32} color="#3B82F6" />}
                            title="Vetted Community"
                            description="Connect with other solo travelers and verified local guides for safe meetups."
                        />
                    </div>
                </div>
            </section>

            {/* App Preview / USP Section */}
            <section id="safety" style={{ padding: '6rem 0', borderTop: '1px solid var(--color-border)' }}>
                <div className="container flex flex-col md:flex-row items-center gap-xl">
                    <div style={{ flex: 1 }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: '700' }}>
                            Navigate with Confidence
                        </h2>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', fontSize: '1.125rem' }}>
                            Lagos is beautiful but can be overwhelming. Exolorer gives you the tools to move like a local.
                        </p>

                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <ListItem
                                to="/safety"
                                icon={<Phone size={20} />}
                                text="One-tap SOS to Police & LASTMA"
                            />
                            <ListItem
                                to="/discover"
                                icon={<Map size={20} />}
                                text="Offline maps for Lekki, Ikeja & Lagos Island"
                            />
                            <ListItem
                                to="/discover"
                                icon={<Shield size={20} />}
                                text="Verified accommodation & ride-hailing integration"
                            />
                        </ul>
                    </div>

                    <Link to="/discover" style={{ textDecoration: 'none', flex: 1 }}>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            style={{
                                background: 'var(--color-bg-card)',
                                padding: '2rem',
                                borderRadius: '2rem',
                                border: '1px solid var(--color-border)',
                                minHeight: '400px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                            }}
                        >
                            {/* Placeholder for App UI Image */}
                            <div style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>
                                [App Interface Preview]
                                <br />
                                <small>Map View with Safe Zones</small>
                                <br />
                                <span style={{ color: 'var(--color-primary)', fontSize: '0.9rem', marginTop: '1rem', display: 'inline-block' }}>Click to Explore Map</span>
                            </div>
                        </motion.div>
                    </Link>
                </div>
            </section>
            {/* Footer */}
            <footer style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.9rem', borderTop: '1px solid var(--color-border)' }}>
                <div className="container">
                    <p>&copy; 2025 Exolorer. Made with ❤️ in Lagos.</p>
                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                        <Link to="/safety" style={{ color: 'inherit', textDecoration: 'none' }}>Safety Center</Link>
                        <Link to="/discover" style={{ color: 'inherit', textDecoration: 'none' }}>Discover Gems</Link>
                        <a href="/DEPLOYMENT_AND_PAYMENTS.md" target="_blank" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Owner's Guide</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, description, to }: { icon: React.ReactNode, title: string, description: string, to: string }) => (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        <motion.div
            className="card"
            whileHover={{ y: -5, borderColor: 'var(--color-primary)' }}
            style={{ height: '100%', cursor: 'pointer' }}
        >
            <div style={{ marginBottom: '1.5rem' }}>{icon}</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '600' }}>{title}</h3>
            <p style={{ color: 'var(--color-text-muted)' }}>{description}</p>
        </motion.div>
    </Link>
);

const ListItem = ({ icon, text, to }: { icon: React.ReactNode, text: string, to: string }) => (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
        <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem', cursor: 'pointer' }}>
            <div style={{
                background: 'rgba(0, 204, 102, 0.1)',
                padding: '0.5rem',
                borderRadius: '50%',
                color: 'var(--color-primary)'
            }}>
                {icon}
            </div>
            <span style={{ borderBottom: '1px dashed var(--color-text-muted)' }}>{text}</span>
        </li>
    </Link>
);

export default LandingPage;
