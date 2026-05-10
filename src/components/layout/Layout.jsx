import React from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { useAppContext } from '../../context/AppContext';

export const Layout = () => {
  const { isOnboarded, loading } = useAppContext();

  if (loading) {
    return <div className="page-container flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-4 border-violet-600 border-t-transparent animate-spin"></div>
    </div>;
  }

  return (
    <div className="relative min-h-screen max-w-md mx-auto bg-dark-900 overflow-hidden shadow-2xl">
      {/* Background ambient glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[30%] bg-violet-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[30%] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <main className="relative z-10 h-full w-full">
        <Outlet />
      </main>
      
      {isOnboarded && <BottomNav />}
    </div>
  );
};
