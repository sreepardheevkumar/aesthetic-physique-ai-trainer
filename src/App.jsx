import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import { WorkoutProvider } from './context/WorkoutContext';
import { Layout } from './components/layout/Layout';

// Placeholder imports for pages
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Workout from './pages/Workout';
import ActiveWorkout from './pages/ActiveWorkout';
import Nutrition from './pages/Nutrition';
import Progress from './pages/Progress';
import Settings from './pages/Settings';

const ProtectedRoute = ({ children }) => {
  const { isOnboarded, loading } = useAppContext();
  if (loading) return null;
  if (!isOnboarded) return <Navigate to="/onboarding" replace />;
  return children;
};

const AppContent = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/workout/active" element={<ActiveWorkout />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <WorkoutProvider>
          <AppContent />
        </WorkoutProvider>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
