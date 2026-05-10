import React, { useState, useEffect, useRef } from 'react';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';

export const RestTimer = ({ defaultSeconds = 90, onComplete }) => {
  const [seconds, setSeconds] = useState(defaultSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && seconds > 0) {
      intervalRef.current = setInterval(() => setSeconds(s => s - 1), 1000);
    } else if (seconds === 0) {
      setIsRunning(false);
      if (navigator.vibrate) navigator.vibrate([300, 100, 300]);
      onComplete?.();
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, seconds]);

  const reset = () => { setSeconds(defaultSeconds); setIsRunning(false); };
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const progress = seconds / defaultSeconds;
  const circumference = 2 * Math.PI * 40;

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
          <circle
            cx="50" cy="50" r="40" fill="none"
            stroke={seconds < 10 ? '#f43f5e' : '#7c3aed'}
            strokeWidth="8" strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Timer size={16} className="text-white/40 mb-1" />
          <span className={`text-2xl font-bold tabular-nums ${seconds < 10 ? 'text-fire-400' : 'text-white'}`}>
            {mins}:{secs.toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="glass" onClick={reset} className="!px-3 !py-2">
          <RotateCcw size={16} />
        </Button>
        <Button variant="primary" onClick={() => setIsRunning(!isRunning)} className="!px-6">
          {isRunning ? <Pause size={18} /> : <Play size={18} />}
          {isRunning ? 'Pause' : 'Start'}
        </Button>
      </div>

      <div className="flex gap-2">
        {[60, 90, 120, 180].map(s => (
          <button key={s} onClick={() => { setSeconds(s); setIsRunning(false); }}
            className={`text-xs px-2 py-1 rounded-lg transition-colors ${defaultSeconds === s ? 'bg-violet-600 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
            {s}s
          </button>
        ))}
      </div>
    </div>
  );
};

export const SetTracker = ({ sets, onUpdateSet, onCompleteSet }) => (
  <div className="space-y-3">
    <div className="flex text-xs text-white/40 font-medium uppercase tracking-wider px-2">
      <div className="w-8">Set</div>
      <div className="flex-1 text-center">Weight (kg)</div>
      <div className="flex-1 text-center">Reps</div>
      <div className="w-10 text-center">✓</div>
    </div>
    {sets.map((set, idx) => (
      <div key={idx} className={`flex items-center glass rounded-xl p-2 transition-all ${set.completed ? 'bg-gain-600/15 border-gain-500/40' : ''}`}>
        <div className="w-8 text-center text-sm font-bold text-white/40">{idx + 1}</div>
        <div className="flex-1 px-2">
          <input type="number" inputMode="decimal"
            className="w-full bg-black/20 rounded-lg text-center py-2.5 text-base font-bold focus:ring-1 focus:ring-violet-500 disabled:opacity-40"
            placeholder="0" value={set.weight}
            onChange={e => onUpdateSet(idx, 'weight', e.target.value)}
            disabled={set.completed}
          />
        </div>
        <div className="flex-1 px-2">
          <input type="number" inputMode="numeric"
            className="w-full bg-black/20 rounded-lg text-center py-2.5 text-base font-bold focus:ring-1 focus:ring-violet-500 disabled:opacity-40"
            placeholder="10" value={set.reps}
            onChange={e => onUpdateSet(idx, 'reps', e.target.value)}
            disabled={set.completed}
          />
        </div>
        <div className="w-10 flex justify-center">
          <button onClick={() => onCompleteSet(idx)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${set.completed ? 'bg-gain-500 shadow-gain-glow' : 'bg-white/10 hover:bg-white/20'}`}>
            <span className="text-sm">✓</span>
          </button>
        </div>
      </div>
    ))}
  </div>
);

export const ExerciseCard = ({ exercise, onClick }) => (
  <div className="exercise-card glass rounded-2xl overflow-hidden flex gap-0 cursor-pointer" onClick={onClick}>
    <div className="w-24 h-24 flex-shrink-0 bg-white/5 overflow-hidden">
      {exercise?.gifUrl ? (
        <img src={exercise.gifUrl} alt={exercise.name} className="w-full h-full object-cover" loading="lazy" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white/20 text-3xl">🏋️</div>
      )}
    </div>
    <div className="flex-1 p-3 flex flex-col justify-center">
      <h4 className="font-semibold text-sm text-white mb-1 line-clamp-1">{exercise?.name}</h4>
      <p className="text-xs text-white/50 mb-2">{exercise?.sets} sets · {exercise?.reps} reps</p>
      <div className="flex flex-wrap gap-1">
        {exercise?.targetMuscles?.slice(0, 2).map(m => (
          <span key={m} className="text-[10px] px-2 py-0.5 rounded-full bg-violet-600/20 text-violet-300 border border-violet-500/20">{m}</span>
        ))}
      </div>
    </div>
  </div>
);
