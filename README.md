# Exolorer - Lagos Solo Travel Companion
[![](https://img.shields.io/badge/Live-Demo-green)](https://SenuJ910.github.io/exolorer-app/)


Exolorer is a mobile-first web application designed to help solo travelers navigate Lagos, Nigeria safely and authentically. It connects users with verified local "Gems" (places), events, and a community of other travelers and guides.

## Features

- **Discover Gems**: Curated list of safe and interesting places to visit in Lagos.
- **Interactive Map**: View gems on a map with 3D tilt and satellite modes.
- **Events**: Find local events, concerts, and meetups.
- **Community**: Connect with other travelers and verified local guides.
- **Safety**: Integrated safety features and verified locations.
- **Dashboard**: User profile, saved gems, and settings.

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Vanilla CSS, Framer Motion (animations)
- **Maps**: Leaflet, React Leaflet
- **Icons**: Lucide React
- **Mobile Wrapper**: Capacitor (for iOS/Android builds)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/exolorer-app.git
   cd exolorer-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:5173`.

## Building for Production

To create a production build:

```bash
npm run build
```

## Mobile Development (Capacitor)

To sync with native projects:

```bash
npx cap sync
```

To open in Android Studio:
```bash
npx cap open android
```

To open in Xcode:
```bash
npx cap open ios
```

## License

[Add License Here]
