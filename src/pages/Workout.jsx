import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { getProgramByProfile } from '../data/workoutPrograms';
import { exercises } from '../data/exercises';

export default function Workout() {
  const { userProfile } = useAppContext();
  const navigate = useNavigate();
  const program = getProgramByProfile(userProfile || {});
  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  const [selectedDay, setSelectedDay] = useState(todayIndex);
  const [expandedEx, setExpandedEx] = useState(null);

  const selectedDayPlan = program.days[selectedDay];
  const dayExercises = selectedDayPlan?.exercises?.map(planEx =>
    exercises.find(e => e.name === planEx.name) ? { ...exercises.find(e => e.name === planEx.name), ...planEx } : planEx
  ) || [];

  const intensityColor = {
    'Very High': 'danger', 'High': 'danger', 'Moderate': 'warning', 'Low': 'success', 'None': 'neutral'
  };

  return (
    <div className="page-container pt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Training Plan</h1>
          <p className="text-white/40 text-xs mt-0.5">{program.name}</p>
        </div>
      </div>

      {/* Weekly calendar */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-1 no-scrollbar">
        {program.days.map((day, i) => {
          const isSelected = i === selectedDay;
          const isToday = i === todayIndex;
          return (
            <div key={i} onClick={() => setSelectedDay(i)}
              className={`flex flex-col items-center justify-center min-w-[60px] h-[72px] rounded-2xl cursor-pointer transition-all flex-shrink-0 ${
                isSelected ? 'bg-violet-600 shadow-violet-glow scale-105' : isToday ? 'glass border border-violet-500/40' : 'glass'
              }`}
            >
              <span className="text-[9px] uppercase font-bold tracking-wider text-white/50 mb-0.5">{day.label.slice(0, 3)}</span>
              <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-white/70'}`}>{day.type.slice(0, 3)}</span>
              {isToday && !isSelected && <div className="w-1 h-1 rounded-full bg-violet-400 mt-1" />}
            </div>
          );
        })}
      </div>

      {/* Day summary */}
      {selectedDayPlan && (
        <div className="mb-5">
          <div className="flex justify-between items-end mb-2">
            <div>
              <h2 className="text-xl font-display font-bold">{selectedDayPlan.focus}</h2>
              <p className="text-white/50 text-sm">{selectedDayPlan.type} · {selectedDayPlan.duration} min</p>
            </div>
            <Badge variant={intensityColor[selectedDayPlan.intensity] || 'neutral'}>{selectedDayPlan.intensity}</Badge>
          </div>
        </div>
      )}

      {/* Exercises or Rest */}
      {selectedDayPlan?.type === 'Rest' ? (
        <Card variant="glass" className="text-center py-10">
          <div className="text-4xl mb-3">😴</div>
          <h3 className="font-bold text-lg mb-2">Rest Day</h3>
          <p className="text-white/50 text-sm max-w-xs mx-auto">{selectedDayPlan.notes}</p>
        </Card>
      ) : (
        <div className="space-y-3 mb-8">
          {dayExercises.map((ex, idx) => (
            <Card key={idx} variant="dark" className="!p-0 overflow-hidden">
              <div className="flex gap-0">
                <div className="w-20 h-20 flex-shrink-0 bg-white/5 overflow-hidden">
                  {ex.gifUrl ? (
                    <img src={ex.gifUrl} alt={ex.name} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">🏋️</div>
                  )}
                </div>
                <div className="flex-1 px-3 py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-sm mb-0.5">{ex.name}</h4>
                      <p className="text-xs text-white/50">{ex.sets} sets · {ex.reps} reps · {ex.rest}s rest</p>
                    </div>
                    <button onClick={() => setExpandedEx(expandedEx === idx ? null : idx)} className="text-white/30 hover:text-violet-400 transition-colors p-1">
                      {expandedEx === idx ? <ChevronUp size={16} /> : <Info size={16} />}
                    </button>
                  </div>
                  {ex.targetMuscles && (
                    <div className="flex gap-1 mt-1.5 flex-wrap">
                      {ex.targetMuscles.slice(0, 2).map(m => (
                        <span key={m} className="text-[9px] px-1.5 py-0.5 rounded-full bg-violet-600/20 text-violet-300">{m}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {expandedEx === idx && ex.instructions && (
                <div className="px-4 pb-4 pt-2 border-t border-white/5">
                  <p className="text-xs text-white/50 font-semibold uppercase tracking-wider mb-2">Instructions</p>
                  {ex.instructions.map((step, si) => (
                    <p key={si} className="text-xs text-white/70 mb-1">• {step}</p>
                  ))}
                  {ex.notes && <p className="text-xs text-gold-400 mt-2 font-medium">💡 {ex.notes}</p>}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {selectedDayPlan?.type !== 'Rest' && (
        <Button variant="primary" className="w-full py-4 text-lg sticky bottom-28" onClick={() => navigate('/workout/active')}>
          <Play className="fill-current" /> Start Workout
        </Button>
      )}
    </div>
  );
}
