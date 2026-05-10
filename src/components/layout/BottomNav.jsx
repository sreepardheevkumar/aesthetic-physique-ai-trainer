import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Dumbbell, Utensils, LineChart, User } from 'lucide-react';

export const BottomNav = () => {
  const location = useLocation();
  const isWorkoutActive = location.pathname === '/workout/active';

  if (isWorkoutActive) return null; // Hide nav during active workout

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/workout', icon: Dumbbell, label: 'Workout' },
    { path: '/nutrition', icon: Utensils, label: 'Food' },
    { path: '/progress', icon: LineChart, label: 'Progress' },
    { path: '/settings', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-dark border-t border-white/10 pb-safe-bottom">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <NavLink
              key={path}
              to={path}
              className={`relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? 'text-violet-400' : 'text-white/40 hover:text-white/70'
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'animate-bounce-subtle' : ''} />
              <span className="text-[10px] font-medium">{label}</span>
              {isActive && <div className="nav-indicator" />}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
