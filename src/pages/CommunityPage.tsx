import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Calendar, MessageCircle, CheckCircle, MapPin } from 'lucide-react';
import communityHero from '../assets/community-hero.png';
import PaymentModal from '../components/PaymentModal';

const MEETUPS = [
    {
        id: 1,
        title: "Afrobeats & Chill",
        location: "Moist Beach Club, Oniru",
        date: "Fri, Nov 24 • 7:00 PM",
        attendees: 12,
        image: "https://placehold.co/600x400/1a1a1a/FFF?text=Beach+Vibes",
        verified: true
    },
    {
        id: 2,
        title: "Lekki Art Walk",
        location: "Nike Art Gallery",
        date: "Sat, Nov 25 • 10:00 AM",
        attendees: 8,
        image: "https://placehold.co/600x400/00CC66/000?text=Art+Walk",
        verified: true
    },
    {
        id: 3,
        title: "Tech Nomad Coffee",
        location: "Cafe Neo, VI",
        date: "Sun, Nov 26 • 11:00 AM",
        attendees: 5,
        image: "https://placehold.co/600x400/FFD700/000?text=Coffee+Meet",
        verified: false
    }
];

const GUIDES = [
    {
        id: 1,
        name: "Tunde B.",
        specialty: "History & Culture",
        rating: 4.9,
        reviews: 120,
        avatar: "https://placehold.co/100x100/333/FFF?text=TB"
    },
    {
        id: 2,
        name: "Amaka O.",
        specialty: "Food & Nightlife",
        rating: 5.0,
        reviews: 85,
        avatar: "https://placehold.co/100x100/333/FFF?text=AO"
    }
];

const CommunityPage: React.FC = () => {
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [selectedMeetup, setSelectedMeetup] = useState<typeof MEETUPS[0] | null>(null);
    const [joinedMeetups, setJoinedMeetups] = useState<number[]>([]);

    const handleJoinClick = (meetup: typeof MEETUPS[0]) => {
        console.log("Join clicked for:", meetup.title);
        if (joinedMeetups.includes(meetup.id)) return;

        if (meetup.id === 1) {
            // Paid meetup
            console.log("Opening payment modal for:", meetup.title);
            setSelectedMeetup(meetup);
            setPaymentModalOpen(true);
        } else {
            // Free meetup
            console.log("Joining free meetup:", meetup.title);
            setJoinedMeetups([...joinedMeetups, meetup.id]);
        }
    };

    const handlePaymentSuccess = () => {
        if (selectedMeetup) {
            setJoinedMeetups([...joinedMeetups, selectedMeetup.id]);
            setPaymentModalOpen(false);
            setSelectedMeetup(null);
        }
    };

    const handleChat = (guideName: string) => {
        // Simple custom alert using browser API for now, but logged to ensure it fires
        console.log(`Chatting with ${guideName}`);
        alert(`💬 Starting secure chat with ${guideName}...\n\n(This feature connects you to the guide in the real app)`);
    };

    return (
        <div className="community-page">
            <PaymentModal
                isOpen={paymentModalOpen}
                onClose={() => setPaymentModalOpen(false)}
                onSuccess={handlePaymentSuccess}
                planName={selectedMeetup ? `Ticket: ${selectedMeetup.title}` : 'Event Ticket'}
                amount="₦2,000"
            />

            {/* Hero Section */}
            <section style={{
                position: 'relative',
                height: '40vh',
                minHeight: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${communityHero})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.4)'
                }} />

                <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontSize: '3rem', marginBottom: '1rem' }}
                    >
                        Find Your Tribe in Lagos
                    </motion.h1>
                    <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto', color: 'var(--color-text-muted)' }}>
                        Connect with fellow solo travelers and verified locals. Safe, social, and curated.
                    </p>
                </div>
            </section>

            <div className="container" style={{ padding: '4rem 0' }}>
                <div className="flex flex-col gap-xl">

                    {/* Upcoming Meetups */}
                    <section>
                        <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
                            <h2 className="flex items-center gap-sm">
                                <Calendar className="text-primary" /> Upcoming Meetups
                            </h2>
                            <Link to="/events" className="btn btn-outline" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem', textDecoration: 'none' }}>
                                View All
                            </Link>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: '2rem'
                        }}>
                            {MEETUPS.map((meetup) => {
                                const isJoined = joinedMeetups.includes(meetup.id);
                                return (
                                    <motion.div
                                        key={meetup.id}
                                        className="card"
                                        style={{ padding: 0, overflow: 'hidden' }}
                                        whileHover={{ y: -5 }}
                                    >
                                        <div style={{ height: '150px', background: '#333', position: 'relative' }}>
                                            <img src={meetup.image} alt={meetup.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            {meetup.verified && (
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '10px',
                                                    right: '10px',
                                                    background: 'rgba(0,0,0,0.7)',
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    fontSize: '0.75rem',
                                                    color: 'var(--color-success)'
                                                }}>
                                                    <CheckCircle size={12} /> Verified Safe
                                                </div>
                                            )}
                                        </div>
                                        <div style={{ padding: '1.5rem' }}>
                                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{meetup.title}</h3>
                                            <div className="flex flex-col gap-sm text-muted" style={{ fontSize: '0.9rem' }}>
                                                <div className="flex items-center gap-xs">
                                                    <Calendar size={16} /> {meetup.date}
                                                </div>
                                                <div className="flex items-center gap-xs">
                                                    <MapPin size={16} /> {meetup.location}
                                                </div>
                                                <div className="flex items-center gap-xs">
                                                    <Users size={16} /> {meetup.attendees + (isJoined ? 1 : 0)} attending
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleJoinClick(meetup)}
                                                className={`btn w-full ${isJoined ? 'btn-outline' : 'btn-primary'}`}
                                                style={{
                                                    marginTop: '1.5rem',
                                                    borderColor: isJoined ? 'var(--color-success)' : undefined,
                                                    color: isJoined ? 'var(--color-success)' : undefined,
                                                    cursor: isJoined ? 'default' : 'pointer'
                                                }}
                                            >
                                                {isJoined ? '✓ Joined' : (meetup.id === 1 ? 'Join Meetup (₦2,000)' : 'Join Meetup')}
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Verified Guides */}
                    <section>
                        <h2 className="flex items-center gap-sm" style={{ marginBottom: '2rem' }}>
                            <CheckCircle className="text-secondary" /> Verified Local Guides
                        </h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                            gap: '2rem'
                        }}>
                            {GUIDES.map((guide) => (
                                <div key={guide.id} className="card flex items-center gap-md">
                                    <img
                                        src={guide.avatar}
                                        alt={guide.name}
                                        style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }}
                                    />
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem' }}>{guide.name}</h3>
                                        <p className="text-muted" style={{ fontSize: '0.85rem' }}>{guide.specialty}</p>
                                        <div className="flex items-center gap-xs" style={{ color: 'var(--color-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                                            <span>★ {guide.rating}</span>
                                            <span className="text-muted">({guide.reviews})</span>
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-outline"
                                        style={{ marginLeft: 'auto', padding: '0.5rem', cursor: 'pointer' }}
                                        onClick={() => handleChat(guide.name)}
                                    >
                                        <MessageCircle size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default CommunityPage;
