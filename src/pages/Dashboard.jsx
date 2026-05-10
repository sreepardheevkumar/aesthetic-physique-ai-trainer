import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Flame, Award, ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export default function Dashboard() {
  const { userProfile } = useAppContext();
  const navigate = useNavigate();

  // Mock data for dashboard
  const stats = {
    streak: 3,
    level: 5,
    xpProgress: 65, // out of 100
    calories: 1850,
    protein: 120
  };

  return (
    <div className="page-container pt-8">
      {/* Header */}
      <header className="mb-6 flex justify-between items-center">
        <div>
          <p className="text-white/60 text-sm mb-1">Good morning,</p>
          <h1 className="text-2xl font-display font-bold">Aesthetic Builder</h1>
        </div>
        <div className="w-12 h-12 rounded-full border-2 border-violet-500/50 overflow-hidden flex items-center justify-center bg-violet-900/50">
          <UserIcon className="w-6 h-6 text-violet-300" />
        </div>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card variant="dark" className="flex items-center gap-3 !p-4">
          <div className="w-10 h-10 rounded-full bg-fire-600/20 flex items-center justify-center">
            <Flame className="text-fire-500 w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{stats.streak}</p>
            <p className="text-xs text-white/50 uppercase tracking-wider">Day Streak</p>
          </div>
        </Card>
        
        <Card variant="dark" className="flex items-center gap-3 !p-4">
          <div className="w-10 h-10 rounded-full bg-gold-600/20 flex items-center justify-center">
            <Award className="text-gold-500 w-5 h-5" />
          </div>
          <div className="w-full">
            <div className="flex justify-between items-end mb-1">
              <p className="text-sm font-bold text-white">Lvl {stats.level}</p>
              <p className="text-[10px] text-white/50">{stats.xpProgress}%</p>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gold-500 rounded-full" 
                style={{ width: `${stats.xpProgress}%` }}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Today's Workout Card */}
      <h2 className="section-header">Today's Training</h2>
      <Card variant="violet" className="mb-6 relative overflow-hidden group">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400&h=300')] bg-cover bg-center opacity-20 mix-blend-overlay transition-transform duration-700 group-hover:scale-105" />
        
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full">Day 3</span>
              <span className="text-white/80 text-sm flex items-center gap-1">
                45 min • <Flame className="w-3 h-3 text-fire-500" /> Intense
              </span>
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-1">Upper Body Power</h3>
            <p className="text-white/70 text-sm mb-6">Focus: Chest, Shoulders, Triceps</p>
          </div>
          
          <Button 
            variant="primary" 
            className="w-full shadow-violet-glow"
            onClick={() => navigate('/workout')}
          >
            <Play className="w-5 h-5 fill-current" /> 
            Start Workout
          </Button>
        </div>
      </Card>

      {/* Motivation Card */}
      <h2 className="section-header">Daily Insight</h2>
      <Card variant="glass" className="border-l-4 border-l-cyan-500">
        <p className="italic text-white/80 mb-3 text-sm">
          "Discipline equals freedom. The workout you skip today is the progress you lose tomorrow."
        </p>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-cyan-900/50 flex items-center justify-center">
            <span className="text-[10px]">AI</span>
          </div>
          <span className="text-xs text-white/50 font-medium">Coach APhysique</span>
        </div>
      </Card>
    </div>
  );
}

// Temporary inline component until Lucide fixes import issue in some Vite setups
const UserIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);
