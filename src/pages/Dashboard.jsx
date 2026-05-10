import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatCard, StreakCard, XPLevelCard, MotivationCard } from '../components/dashboard/StatCards';
import { getDailyQuote } from '../data/quotes';
import { calculateBMR, calculateTDEE, calculateMacros } from '../utils/calculators';
import { Dumbbell, Utensils, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const { userProfile } = useAppContext();
  const navigate = useNavigate();

  const quote = getDailyQuote();
  const streak = userProfile?.streak || 0;
  const xp = userProfile?.xp || 0;

  // Calculate targets from profile
  const bmr = userProfile?.age && userProfile?.weight && userProfile?.height
    ? calculateBMR(Number(userProfile.weight), Number(userProfile.height), Number(userProfile.age), userProfile.gender)
    : 2000;
  const tdee = calculateTDEE(bmr, userProfile?.activityLevel || 'moderate');
  const macros = calculateMacros(tdee, userProfile?.goal || 'Aesthetic Physique', Number(userProfile?.weight || 70));

  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <div className="page-container pt-8 space-y-6">
      {/* Header */}
      <header className="flex justify-between items-center">
        <div>
          <p className="text-white/50 text-sm mb-0.5">{today}</p>
          <h1 className="text-2xl font-display font-bold">
            Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'} 👋
          </h1>
        </div>
        <div
          onClick={() => navigate('/settings')}
          className="w-11 h-11 rounded-full border-2 border-violet-500/40 bg-violet-900/30 flex items-center justify-center cursor-pointer hover:border-violet-400 transition-colors"
        >
          <span className="text-lg">{userProfile?.gender === 'Female' ? '🧘‍♀️' : '🏋️'}</span>
        </div>
      </header>

      {/* Streak + XP */}
      <div className="grid grid-cols-2 gap-3">
        <StreakCard streak={streak} />
        <XPLevelCard totalXP={xp} />
      </div>

      {/* Today's Workout Card */}
      <section>
        <h2 className="section-header">Today's Training</h2>
        <Card variant="violet" className="relative overflow-hidden group cursor-pointer" onClick={() => navigate('/workout')}>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600)` }}
          />
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-5">
              <span className="bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full">Day 3</span>
              <span className="text-white/70 text-xs">60 min · Push</span>
            </div>
            <h3 className="text-2xl font-display font-bold mb-1">Upper Body Power</h3>
            <p className="text-white/60 text-sm mb-5">Chest · Shoulders · Triceps</p>
            <Button variant="primary" className="w-full shadow-violet-glow" onClick={(e) => { e.stopPropagation(); navigate('/workout/active'); }}>
              <Play className="fill-current w-5 h-5" /> Begin Workout
            </Button>
          </div>
        </Card>
      </section>

      {/* Calorie Summary */}
      <section>
        <h2 className="section-header flex items-center justify-between">
          Nutrition Today
          <button onClick={() => navigate('/nutrition')} className="text-violet-400 text-sm font-normal flex items-center gap-1">
            Log <ChevronRight size={14} />
          </button>
        </h2>
        <div className="grid grid-cols-3 gap-3">
          <StatCard icon={Utensils} label="Calories" value={macros.calories} unit="kcal" color="violet" />
          <StatCard icon={TrendingUp} label="Protein" value={macros.protein} unit="g" color="cyan" />
          <StatCard icon={Dumbbell} label="Carbs" value={macros.carbs} unit="g" color="gold" />
        </div>
      </section>

      {/* Motivation */}
      <MotivationCard quote={quote} />

      {/* Quick Actions */}
      <section>
        <h2 className="section-header">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Log Meal', emoji: '🥗', path: '/nutrition' },
            { label: 'Progress', emoji: '📸', path: '/progress' },
            { label: 'Analytics', emoji: '📊', path: '/progress' },
          ].map(action => (
            <Card key={action.label} variant="glass" className="!p-4 text-center cursor-pointer hover:bg-white/10 transition-colors" onClick={() => navigate(action.path)}>
              <div className="text-2xl mb-1">{action.emoji}</div>
              <p className="text-xs font-medium text-white/70">{action.label}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
