import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import './App.css';

// Lazy load pages to optimize bundle size
const LandingPage = lazy(() => import('./pages/LandingPage'));
const DiscoverPage = lazy(() => import('./pages/DiscoverPage'));
const GemDetailPage = lazy(() => import('./pages/GemDetailPage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));
const ConnectPage = lazy(() => import('./pages/ConnectPage'));
const SafetyPage = lazy(() => import('./pages/SafetyPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));

// Loading Component
const PageLoader = () => (
  <div style={{
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--color-bg)'
  }}>
    <div className="spinner" style={{
      width: '40px',
      height: '40px',
      border: '4px solid var(--color-bg-card)',
      borderTop: '4px solid var(--color-primary)',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
  </div>
);

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Suspense fallback={<PageLoader />}>
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
          </Suspense>
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
