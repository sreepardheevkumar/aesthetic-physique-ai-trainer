import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, ChevronRight, Dumbbell, Utensils, TrendingUp, Droplets, HeartPulse } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatCard, StreakCard, XPLevelCard, MotivationCard } from '../components/dashboard/StatCards';
import { getDailyQuote } from '../data/quotes';
import { calculateBMR, calculateTDEE, calculateMacros } from '../utils/calculators';
import { getProgramByProfile } from '../data/workoutPrograms';
import { getProfileInsights } from '../utils/profileInsights';
import { useWorkoutContext } from '../context/WorkoutContext';

export default function Dashboard() {
  const { userProfile } = useAppContext();
  const { startWorkout } = useWorkoutContext();
  const navigate = useNavigate();

  const quote = getDailyQuote();
  const streak = userProfile?.streak || 0;
  const xp = userProfile?.xp || 0;
  const program = getProgramByProfile(userProfile || {});
  const insights = getProfileInsights(userProfile || {});

  const bmr = userProfile?.age && userProfile?.weight && userProfile?.height
    ? calculateBMR(Number(userProfile.weight), Number(userProfile.height), Number(userProfile.age), userProfile.gender)
    : 2000;
  const tdee = calculateTDEE(bmr, insights.activityLevel);
  const macros = calculateMacros(tdee, userProfile?.goal || 'Aesthetic Physique', Number(userProfile?.weight || 70));

  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' });
  const firstName = userProfile?.name?.trim().split(' ')[0] || 'Athlete';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  const todayPlan = program.days[todayIndex] || program.days[0];

  return (
    <div className="page-container pt-8 space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <p className="text-white/50 text-sm mb-0.5">{today}</p>
          <h1 className="text-2xl font-display font-bold">
            {greeting}, {firstName}! 👋
          </h1>
          <p className="text-xs text-violet-400/80 mt-0.5 flex items-center gap-1">
            <Dumbbell size={10} /> {program.segment} · {userProfile?.goal || 'Aesthetic Physique'}
          </p>
        </div>
        <div
          onClick={() => navigate('/settings')}
          className="w-11 h-11 rounded-full border-2 border-violet-500/40 bg-violet-900/30 flex items-center justify-center cursor-pointer hover:border-violet-400 transition-colors"
        >
          <span className="text-lg">{userProfile?.gender === 'Female' ? '🧘‍♀️' : '🏋️'}</span>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-3">
        <StreakCard streak={streak} />
        <XPLevelCard totalXP={xp} />
      </div>

      <section>
        <h2 className="section-header">Today's Training</h2>
        <Card variant="violet" className="relative overflow-hidden group cursor-pointer" onClick={() => navigate('/workout')}>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600)' }}
          />
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-5">
              <span className="bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full">{todayPlan.label}</span>
              <span className="text-white/70 text-xs">{todayPlan.duration} min · {todayPlan.type}</span>
            </div>
            <h3 className="text-2xl font-display font-bold mb-1">{todayPlan.focus}</h3>
            <p className="text-white/60 text-sm mb-5">{todayPlan.notes}</p>
            <Button
              variant="primary"
              className="w-full shadow-violet-glow"
              onClick={(event) => {
                event.stopPropagation();
                if (todayPlan.type === 'Rest') {
                  navigate('/workout');
                  return;
                }
                startWorkout(todayPlan);
                navigate('/workout/active');
              }}
            >
              <Play className="fill-current w-5 h-5" /> {todayPlan.type === 'Rest' ? 'Open Weekly Plan' : 'Begin Workout'}
            </Button>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="section-header">Daily Targets</h2>
        <div className="grid grid-cols-2 gap-3">
          <StatCard icon={Utensils} label="Calories" value={macros.calories} unit="kcal" color="violet" />
          <StatCard icon={TrendingUp} label="Protein" value={macros.protein} unit="g" color="cyan" />
          <StatCard icon={Droplets} label="Water" value={Math.round(program.hydrationTarget / 100) / 10} unit="L" color="gold" />
          <StatCard icon={HeartPulse} label="Training Days" value={program.daysPerWeek} unit="/week" color="fire" />
        </div>
      </section>

      <section>
        <h2 className="section-header">Coach Notes</h2>
        <Card variant="glass" className="!p-5">
          <p className="text-xs uppercase tracking-wider text-cyan-400 font-bold mb-2">Research-based bias</p>
          <p className="text-sm text-white/80 leading-relaxed mb-4">
            Your plan emphasizes {program.trainingBias}.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {program.priorities.map((priority) => (
              <span key={priority} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
                {priority}
              </span>
            ))}
          </div>
          <p className="text-xs text-white/50">{todayPlan.coachTip}</p>
        </Card>
      </section>

      <MotivationCard quote={quote} />

      <section>
        <h2 className="section-header">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Nutrition', emoji: '🥗', path: '/nutrition' },
            { label: 'Progress', emoji: '📸', path: '/progress' },
            { label: 'Plan', emoji: '📅', path: '/workout' },
          ].map((action) => (
            <Card key={action.label} variant="glass" className="!p-4 text-center cursor-pointer hover:bg-white/10 transition-colors" onClick={() => navigate(action.path)}>
              <div className="text-2xl mb-1">{action.emoji}</div>
              <p className="text-xs font-medium text-white/70">{action.label}</p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="section-header flex items-center justify-between">
          Nutrition Focus
          <button onClick={() => navigate('/nutrition')} className="text-violet-400 text-sm font-normal flex items-center gap-1">
            Open <ChevronRight size={14} />
          </button>
        </h2>
        <Card variant="dark" className="!p-4">
          <p className="text-sm text-white/80 mb-3">Today's simple checklist based on your research profile:</p>
          <div className="space-y-2">
            {insights.nutritionFocus.map((item) => (
              <p key={item} className="text-xs text-white/55">• {item}</p>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
