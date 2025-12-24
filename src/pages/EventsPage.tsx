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
    },
    {
        id: 6,
        title: "Lekki Food Festival",
        category: "Food",
        date: "Dec 10, 2025",
        time: "12:00 PM",
        location: "Muri Okunola Park, VI",
        image: "https://placehold.co/600x400/F59E0B/FFF?text=Food+Fest",
        price: "₦2,000",
        description: "Taste the best of Lagos street food and gourmet dishes."
    },
    {
        id: 7,
        title: "Startup Grind Lagos",
        category: "Tech",
        date: "Nov 28, 2025",
        time: "5:00 PM",
        location: "Zone Tech Park, Gbagada",
        image: "https://placehold.co/600x400/3B82F6/FFF?text=Startup+Grind",
        price: "Free",
        description: "Fireside chat with top founders and VCs. Networking opportunity."
    },
    {
        id: 8,
        title: "Felabration 2025",
        category: "Music",
        date: "Oct 15, 2025",
        time: "7:00 PM",
        location: "New Afrika Shrine, Ikeja",
        image: "https://placehold.co/600x400/EF4444/FFF?text=Felabration",
        price: "Free",
        description: "Celebrating the life and legacy of Fela Kuti with non-stop Afrobeat music."
    },
    {
        id: 9,
        title: "GTBank Fashion Weekend",
        category: "Lifestyle",
        date: "Nov 11-12, 2025",
        time: "10:00 AM",
        location: "Plot 1, Water Corporation Dr",
        image: "https://placehold.co/600x400/EC4899/FFF?text=Fashion+Wknd",
        price: "Free",
        description: "Africa's finest fashion exhibition and masterclasses."
    },
    {
        id: 10,
        title: "Coding for Kids",
        category: "Tech",
        date: "Dec 5, 2025",
        time: "10:00 AM",
        location: "CCHub, Yaba",
        image: "https://placehold.co/600x400/10B981/FFF?text=Kids+Code",
        price: "₦5,000",
        description: "Introduction to Python and Scratch for children aged 8-14."
    },
    {
        id: 11,
        title: "Silent Disco",
        category: "Nightlife",
        date: "Every Friday",
        time: "9:00 PM",
        location: "Truth Beach Club, VI",
        image: "https://placehold.co/600x400/8B5CF6/FFF?text=Silent+Disco",
        price: "₦3,000",
        description: "Three DJs, one dancefloor, zero noise pollution. Pick your channel."
    },
    {
        id: 12,
        title: "Lagos Poetry Festival",
        category: "Art",
        date: "Oct 25, 2025",
        time: "6:00 PM",
        location: "Freedom Park, Lagos Island",
        image: "https://placehold.co/600x400/6366F1/FFF?text=Poetry+Fest",
        price: "₦1,000",
        description: "Spoken word, poetry slams, and storytelling under the stars."
    },
    {
        id: 13,
        title: "DevFest Lagos",
        category: "Tech",
        date: "Nov 30, 2025",
        time: "9:00 AM",
        location: "Landmark Event Centre",
        image: "https://placehold.co/600x400/0EA5E9/FFF?text=DevFest",
        price: "₦2,000",
        description: "Google's developer festival. Talks, workshops, and swag."
    },
    {
        id: 14,
        title: "Jazzhole Live",
        category: "Music",
        date: "First Sunday",
        time: "7:00 PM",
        location: "The Jazzhole, Ikoyi",
        image: "https://placehold.co/600x400/D97706/FFF?text=Jazz+Night",
        price: "₦5,000",
        description: "Intimate jazz performances in Lagos' most iconic record store."
    },
    {
        id: 15,
        title: "Eko Atlantic City Tour",
        category: "Lifestyle",
        date: "Dec 20, 2025",
        time: "11:00 AM",
        location: "Eko Atlantic City",
        image: "https://placehold.co/600x400/06B6D4/FFF?text=City+Tour",
        price: "₦10,000",
        description: "Guided tour of the new futuristic city rising from the ocean."
    },
    {
        id: 16,
        title: "Palm Wine Music Festival",
        category: "Music",
        date: "Dec 24, 2025",
        time: "6:00 PM",
        location: "Muri Okunola Park",
        image: "https://placehold.co/600x400/84CC16/FFF?text=Palm+Wine",
        price: "₦15,000",
        description: "Show Dem Camp and friends. The ultimate alternative music fest."
    },
    {
        id: 17,
        title: "Terra Kulture Stage Play",
        category: "Art",
        date: "Every Sunday",
        time: "3:00 PM & 6:00 PM",
        location: "Terra Kulture, VI",
        image: "https://placehold.co/600x400/A855F7/FFF?text=Stage+Play",
        price: "₦5,000",
        description: "Award-winning Nigerian theatre productions."
    },
    {
        id: 18,
        title: "Product Dive",
        category: "Tech",
        date: "Dec 8, 2025",
        time: "11:00 AM",
        location: "Microsoft Garage, Ikoyi",
        image: "https://placehold.co/600x400/EC4899/FFF?text=Product+Dive",
        price: "Free",
        description: "Masterclass for Product Managers and Designers."
    },
    {
        id: 19,
        title: "Beach Soccer Copa",
        category: "United",
        date: "Dec 15, 2025",
        time: "10:00 AM",
        location: "Eko Hotel Beach",
        image: "https://placehold.co/600x400/F43F5E/FFF?text=Beach+Soccer",
        price: "₦2,000",
        description: "International beach soccer tournament. Fun in the sun."
    },
    {
        id: 20,
        title: "Alara Pop-Up",
        category: "Lifestyle",
        date: "Sat & Sun",
        time: "10:00 AM",
        location: "Alara Lagos, VI",
        image: "https://placehold.co/600x400/14B8A6/FFF?text=Alara+Luxury",
        price: "Free",
        description: "Exclusive fashion and design pop-up market."
    },
    {
        id: 21,
        title: "Nike Art Gallery Tour",
        category: "Art",
        date: "Daily",
        time: "10:00 AM",
        location: "Nike Art Gallery, Lekki",
        image: "https://placehold.co/600x400/F97316/FFF?text=Nike+Gallery",
        price: "Free",
        description: "Explore the largest art gallery in West Africa."
    },
    {
        id: 22,
        title: "Bogobiri Open Mic",
        category: "Music",
        date: "Every Thursday",
        time: "8:00 PM",
        location: "Bogobiri House, Ikoyi",
        image: "https://placehold.co/600x400/64748B/FFF?text=Open+Mic",
        price: "Free",
        description: "Where raw talent meets soulful vibes. Spoken word and music."
    },
    {
        id: 23,
        title: "Lagos Games Festival",
        category: "Tech",
        date: "Apr 20, 2025",
        time: "10:00 AM",
        location: "TBS, Lagos Island",
        image: "https://placehold.co/600x400/22C55E/FFF?text=Games+Fest",
        price: "Free",
        description: "Board games, video games, diverse play culture in Lagos."
    },
    {
        id: 24,
        title: "Danfo Bistro Brunch",
        category: "Food",
        date: "Every Sunday",
        time: "11:00 AM",
        location: "Danfo Bistro, Ikoyi",
        image: "https://placehold.co/600x400/EAB308/FFF?text=Brunch",
        price: "Costs Vary",
        description: "The most authentic Lagos-themed brunch spot."
    },
    {
        id: 25,
        title: "Filmhouse IMAX Premiere",
        category: "Movies",
        date: "Fridays",
        time: "7:00 PM",
        location: "Filmhouse IMAX, Lekki",
        image: "https://placehold.co/600x400/3B82F6/000?text=IMAX",
        price: "₦6,000",
        description: "Catch the latest blockbusters on the biggest screen in Lagos."
    },
    {
        id: 26,
        title: "Rufus & Bee Arcade Night",
        category: "Lifestyle",
        date: "Daily",
        time: "12:00 PM",
        location: "Twinwaters, Lekki",
        image: "https://placehold.co/600x400/A855F7/FFF?text=Arcade",
        price: "Pay as you go",
        description: "Bowling, arcade games, and sports bar."
    },
    {
        id: 27,
        title: "Muson Centre Concert",
        category: "Music",
        date: "Dec 18, 2025",
        time: "6:00 PM",
        location: "Muson Centre, Onikan",
        image: "https://placehold.co/600x400/BE123C/FFF?text=Classical",
        price: "₦5,000",
        description: "Annual Christmas concert by the Muson Symphony Orchestra."
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
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                    {filteredEvents.map((event) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3 }}
                            className="card"
                            style={{
                                padding: 0,
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}
                        >
                            <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                                <motion.img
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                    src={event.image}
                                    alt={event.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: 'rgba(15, 23, 42, 0.85)',
                                    backdropFilter: 'blur(4px)',
                                    color: 'var(--color-primary)',
                                    padding: '0.4rem 1rem',
                                    borderRadius: 'var(--radius-full)',
                                    fontSize: '0.75rem',
                                    fontWeight: '700',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    border: '1px solid var(--color-primary)'
                                }}>
                                    {event.category}
                                </div>
                            </div>

                            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.2))' }}>
                                <div className="flex justify-between items-start mb-3">
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: '700', lineHeight: '1.2', fontFamily: "'Outfit', sans-serif" }}>{event.title}</h3>
                                </div>

                                <div className="flex flex-col gap-sm text-muted" style={{ fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                                    <div className="flex items-center gap-sm">
                                        <Calendar size={18} className="text-primary" />
                                        <span style={{ color: 'var(--color-text-muted)' }}>{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-sm">
                                        <Clock size={18} className="text-primary" />
                                        <span style={{ color: 'var(--color-text-muted)' }}>{event.time}</span>
                                    </div>
                                    <div className="flex items-center gap-sm">
                                        <MapPin size={18} className="text-primary" />
                                        <span style={{ color: 'var(--color-text-muted)' }}>{event.location}</span>
                                    </div>
                                </div>

                                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: '1.6', flex: 1 }}>
                                    {event.description}
                                </p>

                                <div className="flex justify-between items-center pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                    <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-secondary)' }}>
                                        {event.price}
                                    </span>
                                    <div className="flex gap-sm">
                                        <button
                                            onClick={() => handleRideClick(event.location)}
                                            className="btn btn-outline"
                                            style={{ padding: '0.6rem', borderRadius: '50%' }}
                                            title="Get a Ride"
                                        >
                                            <Car size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleGetTicket(event)}
                                            className="btn btn-primary"
                                            style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem', fontWeight: '700' }}
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
