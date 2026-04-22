import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useUser } from './core/contexts';
import { ThemeProvider, useTheme } from './core/ThemeContext';
import { Sun, Moon } from 'lucide-react';

// Pages
import { UserEntry } from './pages/UserEntry';
import { PromptInput } from './pages/PromptInput';
import { Thinking } from './pages/Thinking';
import { Acknowledgement } from './pages/Acknowledgement';
import { DynamicLaunch } from './pages/DynamicLaunch';

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useUser();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return (
    <div className="w-full h-full min-h-screen">
      {children}
    </div>
  );
};

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className="theme-toggle-btn">
      {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-blue-600" />}
    </button>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<UserEntry />} />
        <Route path="/prompt" element={<ProtectedRoute><PromptInput /></ProtectedRoute>} />
        <Route path="/thinking" element={<ProtectedRoute><Thinking /></ProtectedRoute>} />
        <Route path="/ack" element={<ProtectedRoute><Acknowledgement /></ProtectedRoute>} />
        <Route path="/launch" element={<ProtectedRoute><DynamicLaunch /></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
  );
}

function AppContent() {
  return (
    <main className="min-h-screen w-full flex flex-col relative overflow-hidden">
      <ThemeToggle />
      <AnimatedRoutes />
    </main>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
