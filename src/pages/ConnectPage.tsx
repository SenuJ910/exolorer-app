import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Send, MapPin, Image as ImageIcon, MoreVertical, Phone, Video, Glasses, ScanLine } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- Types ---
type Message = {
    id: number;
    text: string;
    sender: 'me' | 'other';
    senderName?: string;
    timestamp: string;
    type: 'text' | 'location' | 'image';
    location?: [number, number]; // Lat, Lng
    image?: string;
};

type ChatRoom = {
    id: number;
    name: string;
    type: 'group' | 'direct';
    participants: number;
    location: [number, number]; // Center of the chat's interest
    lastMessage: string;
};

// --- Mock Data ---
const CHAT_ROOMS: ChatRoom[] = [
    { id: 1, name: "Lagos Solo Travelers", type: 'group', participants: 128, location: [6.4500, 3.4000], lastMessage: "Anyone heading to the beach?" },
    { id: 2, name: "Lekki Foodies", type: 'group', participants: 45, location: [6.4450, 3.4700], lastMessage: "Best suya spot?" },
    { id: 3, name: "Mainland Connect", type: 'group', participants: 82, location: [6.5244, 3.3792], lastMessage: "Traffic is crazy on 3rd Mainland!" },
];

const INITIAL_MESSAGES: Message[] = [
    { id: 1, text: "Hey everyone! I just arrived in Lagos.", sender: 'other', senderName: "Sarah", timestamp: "10:00 AM", type: 'text' },
    { id: 2, text: "Welcome! You should check out the Nike Art Gallery.", sender: 'other', senderName: "Tunde", timestamp: "10:02 AM", type: 'text' },
    { id: 3, text: "I'm actually nearby! Here's my location if anyone wants to grab coffee.", sender: 'other', senderName: "Sarah", timestamp: "10:05 AM", type: 'location', location: [6.4550, 3.4840] },
];

// --- Components ---

// Component to fly map to location
const MapFlyTo = ({ center }: { center: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, 14, { duration: 1.5 });
    }, [center, map]);
    return null;
};

const ConnectPage: React.FC = () => {
    const [activeRoom, setActiveRoom] = useState<ChatRoom>(CHAT_ROOMS[0]);
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [inputText, setInputText] = useState("");
    const [mapCenter, setMapCenter] = useState<[number, number]>(activeRoom.location);
    const [isVRMode, setIsVRMode] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Simulate receiving a message
    useEffect(() => {
        const timer = setTimeout(() => {
            const newMsg: Message = {
                id: Date.now(),
                text: "Has anyone tried the new rooftop bar in VI?",
                sender: 'other',
                senderName: "Emeka",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                type: 'text'
            };
            setMessages(prev => [...prev, newMsg]);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    const handleSendMessage = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputText.trim()) return;

        const newMsg: Message = {
            id: Date.now(),
            text: inputText,
            sender: 'me',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'text'
        };

        setMessages([...messages, newMsg]);
        setInputText("");
    };

    const handleShareLocation = () => {
        // Simulate getting user location (e.g., somewhere in VI)
        const myLocation: [number, number] = [6.4281, 3.4219];

        const newMsg: Message = {
            id: Date.now(),
            text: "Shared a location",
            sender: 'me',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'location',
            location: myLocation
        };

        setMessages([...messages, newMsg]);
        setMapCenter(myLocation);
    };

    const handleRoomChange = (room: ChatRoom) => {
        setActiveRoom(room);
        setMapCenter(room.location);
    };

    return (
        <div className="connect-page" style={{ height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
            <div className="flex h-full">

                {/* LEFT: Chat Interface */}
                <div className="chat-section" style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    borderRight: '1px solid var(--color-border)',
                    maxWidth: '500px',
                    background: 'var(--color-bg-card)',
                    zIndex: 20
                }}>
                    {/* Chat Header */}
                    <div style={{
                        padding: '1rem',
                        borderBottom: '1px solid var(--color-border)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'rgba(15, 23, 42, 0.95)'
                    }}>
                        <div className="flex items-center gap-sm">
                            <div style={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                background: 'var(--color-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                color: '#000'
                            }}>
                                {activeRoom.name.charAt(0)}
                            </div>
                            <div>
                                <h2 style={{ fontSize: '1rem', fontWeight: '600' }}>{activeRoom.name}</h2>
                                <span style={{ fontSize: '0.8rem', color: 'var(--color-success)' }}>● {activeRoom.participants} Online</span>
                            </div>
                        </div>
                        <div className="flex gap-sm text-muted">
                            <Phone size={20} />
                            <Video size={20} />
                            <MoreVertical size={20} />
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div style={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        backgroundImage: 'radial-gradient(var(--color-border) 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }}>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{
                                    alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                                    maxWidth: '80%',
                                }}
                            >
                                {msg.sender === 'other' && (
                                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem', display: 'block' }}>
                                        {msg.senderName}
                                    </span>
                                )}

                                <div style={{
                                    padding: '0.75rem 1rem',
                                    borderRadius: '1rem',
                                    borderTopLeftRadius: msg.sender === 'other' ? '0' : '1rem',
                                    borderTopRightRadius: msg.sender === 'me' ? '0' : '1rem',
                                    background: msg.sender === 'me' ? 'var(--color-primary)' : '#334155',
                                    color: msg.sender === 'me' ? '#000' : '#fff',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                                }}>
                                    {msg.type === 'text' && <p>{msg.text}</p>}

                                    {msg.type === 'location' && msg.location && (
                                        <div
                                            onClick={() => setMapCenter(msg.location!)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <div className="flex items-center gap-xs" style={{ marginBottom: '0.5rem', fontWeight: '600' }}>
                                                <MapPin size={16} /> Shared Location
                                            </div>
                                            <div style={{
                                                width: '200px',
                                                height: '100px',
                                                background: '#000',
                                                borderRadius: '0.5rem',
                                                overflow: 'hidden',
                                                position: 'relative'
                                            }}>
                                                <img
                                                    src="https://placehold.co/200x100/1e293b/FFF?text=Map+View"
                                                    alt="Location"
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '0.25rem', display: 'block', textAlign: msg.sender === 'me' ? 'right' : 'left' }}>
                                    {msg.timestamp}
                                </span>
                            </motion.div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSendMessage} style={{
                        padding: '1rem',
                        borderTop: '1px solid var(--color-border)',
                        background: 'var(--color-bg-card)',
                        display: 'flex',
                        gap: '0.5rem',
                        alignItems: 'center'
                    }}>
                        <button type="button" className="btn btn-outline" style={{ padding: '0.5rem', border: 'none' }}>
                            <ImageIcon size={20} color="var(--color-text-muted)" />
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline"
                            style={{ padding: '0.5rem', border: 'none' }}
                            onClick={handleShareLocation}
                            title="Share Location"
                        >
                            <MapPin size={20} color="var(--color-text-muted)" />
                        </button>
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Type a message..."
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-full)',
                                border: '1px solid var(--color-border)',
                                background: 'var(--color-bg)',
                                color: '#fff',
                                outline: 'none'
                            }}
                        />
                        <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem', borderRadius: '50%' }}>
                            <Send size={20} />
                        </button>
                    </form>
                </div>

                {/* RIGHT: VR Map Interface */}
                <div className="map-section hidden-mobile" style={{
                    flex: 1.5,
                    position: 'relative',
                    background: '#000',
                    overflow: 'hidden',
                    perspective: '1000px' // Enable 3D perspective
                }}>

                    {/* VR Toggle Button */}
                    <button
                        onClick={() => setIsVRMode(!isVRMode)}
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            left: '1rem',
                            zIndex: 1000,
                            background: isVRMode ? 'var(--color-primary)' : 'rgba(15, 23, 42, 0.9)',
                            color: isVRMode ? '#000' : '#fff',
                            border: '1px solid var(--color-border)',
                            padding: '0.75rem 1.5rem',
                            borderRadius: 'var(--radius-full)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            boxShadow: isVRMode ? '0 0 20px var(--color-primary)' : 'none',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <Glasses size={20} />
                        {isVRMode ? 'VR Mode ON' : 'Enable VR Mode'}
                    </button>

                    {/* Map Container with 3D Transforms */}
                    <motion.div
                        animate={{
                            rotateX: isVRMode ? 45 : 0,
                            scale: isVRMode ? 1.2 : 1,
                            filter: isVRMode ? 'contrast(1.2) brightness(1.1) hue-rotate(10deg)' : 'none'
                        }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        style={{
                            height: '100%',
                            width: '100%',
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                            />
                            <MapFlyTo center={mapCenter} />

                            {CHAT_ROOMS.map(room => (
                                <Marker
                                    key={room.id}
                                    position={room.location}
                                    eventHandlers={{ click: () => handleRoomChange(room) }}
                                >
                                    <Popup>
                                        <div style={{ color: '#000' }}>
                                            <strong>{room.name}</strong>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </motion.div>

                    {/* VR Overlay Effects (Scanlines, Vignette) */}
                    <AnimatePresence>
                        {isVRMode && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    pointerEvents: 'none',
                                    zIndex: 500
                                }}
                            >
                                {/* Scanlines */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2))',
                                    backgroundSize: '100% 4px',
                                    opacity: 0.3
                                }} />

                                {/* Vignette */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: 'radial-gradient(circle, transparent 60%, #000 100%)'
                                }} />

                                {/* HUD Elements */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: '2rem',
                                    left: '2rem',
                                    color: 'var(--color-primary)',
                                    fontFamily: 'monospace',
                                    fontSize: '0.8rem'
                                }}>
                                    <div className="flex items-center gap-xs">
                                        <ScanLine size={16} /> SYSTEM: ONLINE
                                    </div>
                                    <div>COORDS: {mapCenter[0].toFixed(4)}, {mapCenter[1].toFixed(4)}</div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Floating Room Selector (Hidden in VR mode for immersion, or styled differently) */}
                    {!isVRMode && (
                        <div style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            zIndex: 1000,
                            background: 'rgba(15, 23, 42, 0.9)',
                            padding: '1rem',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--color-border)',
                            backdropFilter: 'blur(10px)',
                            maxWidth: '250px'
                        }}>
                            <h3 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Active Rooms Nearby</h3>
                            <div className="flex flex-col gap-sm">
                                {CHAT_ROOMS.map(room => (
                                    <div
                                        key={room.id}
                                        onClick={() => handleRoomChange(room)}
                                        style={{
                                            padding: '0.5rem',
                                            borderRadius: 'var(--radius-md)',
                                            background: activeRoom.id === room.id ? 'rgba(0, 204, 102, 0.2)' : 'transparent',
                                            cursor: 'pointer',
                                            border: activeRoom.id === room.id ? '1px solid var(--color-primary)' : '1px solid transparent',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>{room.name}</span>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{room.participants}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConnectPage;
