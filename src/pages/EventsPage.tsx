import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Filter, Search, Music, Code, Palette, GlassWater, Car } from 'lucide-react';
import TransportModal from '../components/TransportModal';
import PaymentModal from '../components/PaymentModal';

// Mock Data for Events
const EVENTS = [
    {
        id: 1,
        title: "Lagos Tech Fest 2025",
        category: "Tech",
        date: "Nov 25, 2025",
        time: "9:00 AM",
        location: "Landmark Centre, VI",
        image: "https://placehold.co/600x400/0f172a/FFF?text=Tech+Fest",
        price: "Free",
        description: "The biggest gathering of tech enthusiasts, startups, and investors in West Africa."
    },
    {
        id: 2,
        title: "Afrobeats & Chill",
        category: "Nightlife",
        date: "Nov 22, 2025",
        time: "8:00 PM",
        location: "The Good Beach, VI",
        image: "https://placehold.co/600x400/FF4500/FFF?text=Afrobeats",
        price: "₦5,000",
        description: "Live performances from top Afrobeats artists. Good vibes only."
    },
    {
        id: 3,
        title: "Art X Lagos",
        category: "Art",
        date: "Dec 1-3, 2025",
        time: "10:00 AM",
        location: "Federal Palace Hotel",
        image: "https://placehold.co/600x400/FFD700/000?text=Art+X",
        price: "₦3,000",
        description: "West Africa's premier international art fair showcasing contemporary art."
    },
    {
        id: 4,
        title: "Mainland Block Party",
        category: "Nightlife",
        date: "Nov 26, 2025",
        time: "4:00 PM",
        location: "Secret Location, Ikeja",
        image: "https://placehold.co/600x400/00CC66/000?text=Block+Party",
        price: "₦2,500",
        description: "The wildest monthly block party on the mainland."
    },
    {
        id: 5,
        title: "Sip & Paint",
        category: "Lifestyle",
        date: "Nov 24, 2025",
        time: "2:00 PM",
        location: "EbonyLife Place",
        image: "https://placehold.co/600x400/FF69B4/FFF?text=Sip+Paint",
        price: "₦15,000",
        description: "Unleash your inner artist with wine and good company."
    }
];

const CATEGORIES = [
    { name: "All", icon: Calendar },
    { name: "Tech", icon: Code },
    { name: "Nightlife", icon: GlassWater },
    { name: "Art", icon: Palette },
    { name: "Music", icon: Music },
];

const EventsPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [isTransportOpen, setIsTransportOpen] = useState(false);
    const [selectedDestination, setSelectedDestination] = useState("");

    const filteredEvents = EVENTS.filter(event => {
        const matchesCategory = activeCategory === "All" || event.category === activeCategory;
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.location.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleRideClick = (destination: string) => {
        setSelectedDestination(destination);
        setIsTransportOpen(true);
    };

    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<{ title: string, price: string } | null>(null);

    const handleGetTicket = (event: { title: string, price: string }) => {
        setSelectedEvent(event);
        setIsTicketModalOpen(true);
    };

    return (
        <div className="events-page" style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
            <TransportModal
                isOpen={isTransportOpen}
                onClose={() => setIsTransportOpen(false)}
                destination={selectedDestination}
            />

            <PaymentModal
                isOpen={isTicketModalOpen}
                onClose={() => setIsTicketModalOpen(false)}
                planName={`Ticket: ${selectedEvent?.title}`}
                amount={selectedEvent?.price || "Free"}
            />

            {/* Hero Section */}
            <div style={{
                background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://placehold.co/1200x400/1e293b/FFF?text=Lagos+Events)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '6rem 0',
                textAlign: 'center',
                color: '#fff'
            }}>
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontSize: '3rem', marginBottom: '1rem' }}
                    >
                        What's Happening in Lagos
                    </motion.h1>
                    <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto', color: 'rgba(255,255,255,0.9)' }}>
                        Discover concerts, tech meetups, art exhibitions, and more.
                    </p>
                </div>
            </div>

            <div className="container" style={{ padding: '3rem 0' }}>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-lg mb-8" style={{ marginBottom: '2rem' }}>

                    {/* Category Tabs */}
                    <div className="flex gap-sm overflow-x-auto" style={{ paddingBottom: '0.5rem', maxWidth: '100%' }}>
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => setActiveCategory(cat.name)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.5rem 1rem',
                                    borderRadius: 'var(--radius-full)',
                                    background: activeCategory === cat.name ? 'var(--color-primary)' : 'var(--color-bg-card)',
                                    color: activeCategory === cat.name ? '#000' : 'var(--color-text)',
                                    border: '1px solid var(--color-border)',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                <cat.icon size={16} />
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem 0.75rem 2.5rem',
                                borderRadius: 'var(--radius-full)',
                                border: '1px solid var(--color-border)',
                                background: 'var(--color-bg-card)',
                                color: '#fff',
                                outline: 'none'
                            }}
                        />
                    </div>
                </div>

                {/* Events Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {filteredEvents.map((event) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="card"
                            style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                        >
                            <div style={{ height: '200px', position: 'relative' }}>
                                <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: 'rgba(0,0,0,0.8)',
                                    color: '#fff',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: 'var(--radius-full)',
                                    fontSize: '0.8rem',
                                    fontWeight: 'bold'
                                }}>
                                    {event.category}
                                </div>
                            </div>

                            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', lineHeight: '1.3' }}>{event.title}</h3>
                                </div>

                                <div className="flex flex-col gap-xs text-muted" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                                    <div className="flex items-center gap-xs">
                                        <Calendar size={16} className="text-primary" /> {event.date}
                                    </div>
                                    <div className="flex items-center gap-xs">
                                        <Clock size={16} className="text-primary" /> {event.time}
                                    </div>
                                    <div className="flex items-center gap-xs">
                                        <MapPin size={16} className="text-primary" /> {event.location}
                                    </div>
                                </div>

                                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                                    {event.description}
                                </p>

                                <div className="flex justify-between items-center" style={{ marginTop: 'auto', gap: '0.5rem' }}>
                                    <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--color-secondary)' }}>
                                        {event.price}
                                    </span>
                                    <div className="flex gap-xs">
                                        <button
                                            onClick={() => handleRideClick(event.location)}
                                            className="btn btn-outline"
                                            style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                            title="Get a Ride"
                                        >
                                            <Car size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleGetTicket(event)}
                                            className="btn btn-primary"
                                            style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                                        >
                                            Get Tickets
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredEvents.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-muted)' }}>
                        <Filter size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                        <p>No events found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventsPage;
