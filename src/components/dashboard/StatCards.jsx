import React from 'react';
import { Flame, Award, Zap } from 'lucide-react';
import { Card } from '../ui/Card';
import { getLevelFromXP } from '../../data/achievements';

export const StatCard = ({ icon: Icon, label, value, unit = '', color = 'violet' }) => {
  const colors = {
    violet: 'bg-violet-600/20 text-violet-400',
    fire: 'bg-fire-600/20 text-fire-400',
    gold: 'bg-gold-600/20 text-gold-400',
    gain: 'bg-gain-600/20 text-gain-400',
    cyan: 'bg-cyan-600/20 text-cyan-400',
  };

  return (
    <Card variant="dark" className="flex items-center gap-3 !p-4">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${colors[color]}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-xl font-bold text-white leading-none">{value}<span className="text-sm text-white/50 ml-1">{unit}</span></p>
        <p className="text-xs text-white/40 uppercase tracking-wider mt-0.5">{label}</p>
      </div>
    </Card>
  );
};

export const XPLevelCard = ({ totalXP = 0 }) => {
  const { level, currentXP, requiredXP } = getLevelFromXP(totalXP);
  const progress = Math.min((currentXP / requiredXP) * 100, 100);

  return (
    <Card variant="dark" className="!p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <Award className="text-gold-400 w-5 h-5" />
          <span className="font-bold text-white">Level {level}</span>
        </div>
        <span className="text-xs text-white/50">{currentXP} / {requiredXP} XP</span>
      </div>
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold-500 to-fire-500 transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>
    </Card>
  );
};

export const StreakCard = ({ streak = 0 }) => {
  const streakColor = streak >= 30 ? 'text-violet-400' : streak >= 7 ? 'text-fire-400' : streak >= 3 ? 'text-gold-400' : 'text-white/50';

  return (
    <Card variant="dark" className="flex items-center gap-3 !p-4">
      <div className="relative">
        <Flame className={`w-10 h-10 ${streakColor}`} />
        {streak >= 7 && (
          <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${streak >= 30 ? 'bg-violet-500' : 'bg-fire-500'} flex items-center justify-center`}>
            <Zap size={8} className="text-white fill-current" />
          </div>
        )}
      </div>
      <div>
        <p className={`text-2xl font-bold leading-none ${streakColor}`}>{streak}</p>
        <p className="text-xs text-white/40 uppercase tracking-wider mt-0.5">Day Streak</p>
      </div>
    </Card>
  );
};

export const MotivationCard = ({ quote }) => (
  <Card variant="glass" className="border-l-4 border-l-cyan-500 !p-5">
    <div className="flex gap-1 mb-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
      ))}
      <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider ml-1">Daily Insight</span>
    </div>
    <p className="italic text-white/80 text-sm leading-relaxed mb-3">"{quote?.text}"</p>
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded-full bg-cyan-900/50 border border-cyan-500/30 flex items-center justify-center">
        <span className="text-[9px] font-bold text-cyan-400">AI</span>
      </div>
      <span className="text-xs text-white/40 font-medium">— {quote?.author}</span>
    </div>
  </Card>
);
