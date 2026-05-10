import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Dumbbell, Play, Info } from 'lucide-react';
import { useWorkoutContext } from '../context/WorkoutContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { getExercisesByGroup } from '../data/exercises';

export default function Workout() {
  const { weeklyPlan } = useWorkoutContext();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(3); // Mock current day

  const handleStartWorkout = () => {
    // In a real app, this would dispatch to WorkoutContext
    alert('Starting active workout mode! (To be implemented)');
  };

  // Mock workout details for the selected day
  const todaysExercises = [
    getExercisesByGroup('Chest')[0],
    getExercisesByGroup('Back')[0],
  ].filter(Boolean); // filter out undefined if not found

  return (
    <div className="page-container pt-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold">Training Plan</h1>
        <Button variant="icon">
          <CalendarIcon size={24} />
        </Button>
      </div>

      {/* Weekly Calendar Selector */}
      <div className="flex justify-between mb-8 overflow-x-auto no-scrollbar pb-2">
        {weeklyPlan.map((dayPlan, index) => {
          const isToday = dayPlan.day === selectedDay;
          return (
            <div 
              key={index}
              onClick={() => setSelectedDay(dayPlan.day)}
              className={`flex flex-col items-center justify-center min-w-[56px] h-[72px] rounded-2xl mx-1 cursor-pointer transition-all ${
                isToday 
                  ? 'bg-violet-600 shadow-violet-glow scale-110' 
                  : 'glass text-white/50 hover:bg-white/10'
              }`}
            >
              <span className="text-[10px] uppercase font-bold tracking-wider mb-1">
                Day {dayPlan.day}
              </span>
              <span className={`text-xs font-medium ${isToday ? 'text-white' : ''}`}>
                {dayPlan.type.substring(0, 3)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Selected Day Details */}
      <div className="mb-6">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="text-xl font-display font-bold text-white mb-1">
              Upper Body Power
            </h2>
            <p className="text-white/60 text-sm">45 Min • 6 Exercises</p>
          </div>
          <Badge variant="primary">Hypertrophy</Badge>
        </div>

        {/* Exercises List */}
        <div className="space-y-4 mb-8">
          {todaysExercises.length > 0 ? (
             todaysExercises.map((ex, idx) => (
              <Card key={idx} variant="dark" className="flex gap-4 !p-3">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                  {ex.gifUrl ? (
                    <img src={ex.gifUrl} alt={ex.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Dumbbell className="text-white/20" />
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h4 className="font-semibold text-sm mb-1">{ex.name}</h4>
                  <p className="text-xs text-white/50 mb-2">3 sets x 8-12 reps</p>
                  <div className="flex gap-2">
                    {ex.targetMuscles.map(m => (
                      <span key={m} className="text-[10px] px-2 py-0.5 rounded-sm bg-white/10 text-white/70">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-center px-2 text-white/30 hover:text-violet-400 cursor-pointer">
                  <Info size={20} />
                </div>
              </Card>
            ))
          ) : (
             <div className="text-center text-white/50 py-8 glass rounded-2xl">
                Rest Day. Recover well!
             </div>
          )}
        </div>

        {todaysExercises.length > 0 && (
          <Button 
            variant="primary" 
            className="w-full py-4 text-lg"
            onClick={handleStartWorkout}
          >
            <Play className="fill-current mr-2" /> Start Workout
          </Button>
        )}
      </div>
    </div>
  );
}
