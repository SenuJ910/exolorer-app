import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import DiscoverPage from './pages/DiscoverPage';
import GemDetailPage from './pages/GemDetailPage';
import CommunityPage from './pages/CommunityPage';
import ConnectPage from './pages/ConnectPage';
import SafetyPage from './pages/SafetyPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import EventsPage from './pages/EventsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/discover" element={<DiscoverPage />} />
            <Route path="/discover/:id" element={<GemDetailPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/connect" element={<ConnectPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/safety" element={<SafetyPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>

        <footer style={{
          padding: '2rem 0',
          textAlign: 'center',
          borderTop: '1px solid var(--color-border)',
          marginTop: '4rem',
          color: 'var(--color-text-muted)'
        }}>
          <div className="container">
            <p>&copy; 2025 Exolorer. Made with ❤️ in Lagos.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
