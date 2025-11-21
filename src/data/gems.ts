import lagosArt from '../assets/lagos-art.png';

export const GEMS = [
    {
        id: 1,
        name: "Nike Art Gallery",
        category: "Art & Culture",
        rating: 4.9,
        safetyLevel: "High",
        image: lagosArt,
        description: "A five-story art gallery housing thousands of works from Nigerian artists. Owned by Nike Davies-Okundaye, this gallery is arguably the largest of its kind in West Africa.",
        fullDescription: "Immerse yourself in Nigerian culture at the Nike Art Gallery. This four-story building is filled with over 8,000 diverse artworks from various Nigerian artists. You can take art classes, buy souvenirs, and sometimes even meet Chief Nike herself. It's a safe, verified location perfect for solo travelers looking to soak up local creativity.",
        address: "2 Elegushi Beach Road, Lekki Phase I, Lekki",
        openingHours: "10:00 AM - 6:00 PM",
        position: [6.4550, 3.4840] as [number, number]
    },
    {
        id: 2,
        name: "Lekki Conservation Centre",
        category: "Nature",
        rating: 4.7,
        safetyLevel: "High",
        image: "https://placehold.co/600x400/008751/FFF?text=Lekki+Conservation",
        description: "Home to the longest canopy walk in Africa. A serene escape from the city.",
        fullDescription: "Escape the hustle of Lagos at the Lekki Conservation Centre. The highlight is the 401-metre long canopy walkway, which offers a bird's eye view of the swamp and wildlife. It's a protected area, making it very safe for tourists. Don't miss the giant chess board and the treehouse!",
        address: "Km 19 Lekki - Epe Expy, Lekki Penninsula II, Lekki",
        openingHours: "8:30 AM - 5:00 PM",
        position: [6.4419, 3.5362] as [number, number]
    },
    {
        id: 3,
        name: "Balogun Market",
        category: "Shopping",
        rating: 4.2,
        safetyLevel: "Moderate",
        warning: "Crowded area. Keep valuables safe.",
        image: "https://placehold.co/600x400/FFD700/000?text=Balogun+Market",
        description: "The sprawling heart of Lagos commerce. Intense, colorful, and chaotic.",
        fullDescription: "Dive into the chaos of Balogun Market, one of the biggest markets in Lagos. You can find fabrics, shoes, and everything in between. NOTE: It is extremely crowded. We recommend going with a verified guide from our Community page if it's your first time. Keep your phone and wallet secure.",
        address: "Lagos Island, Lagos",
        openingHours: "9:00 AM - 5:00 PM (Mon-Sat)",
        position: [6.4567, 3.3884] as [number, number]
    },
    {
        id: 4,
        name: "Terra Kulture",
        category: "Culture & Food",
        rating: 4.6,
        safetyLevel: "High",
        image: "https://placehold.co/600x400/FF4500/FFF?text=Terra+Kulture",
        description: "A premier educational and recreational organization celebrating Nigerian culture.",
        fullDescription: "Terra Kulture is a must-visit for art, food, and theatre lovers. It features a restaurant serving authentic Nigerian dishes, an art gallery, and a theatre arena. It's a very safe and upscale environment in Victoria Island.",
        address: "Plot 1376 Tiamiyu Savage St, Victoria Island, Lagos",
        openingHours: "9:00 AM - 10:00 PM",
        position: [6.4291, 3.4218] as [number, number]
    }
];
