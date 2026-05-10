import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, ChevronLeft, ChevronRight, Check, X, Timer } from 'lucide-react';
import { useWorkoutContext } from '../context/WorkoutContext';
import { getExercisesByGroup } from '../data/exercises';
import { Button } from '../components/ui/Button';

export default function ActiveWorkout() {
  const { currentWorkout, finishWorkout, cancelWorkout } = useWorkoutContext();
  const navigate = useNavigate();
  
  // MOCK DATA for now since Workout start isn't fully wired yet
  const exercises = [
    getExercisesByGroup('Chest')[0],
    getExercisesByGroup('Back')[0]
  ].filter(Boolean);

  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [sets, setSets] = useState([
    { reps: '', weight: '', completed: false },
    { reps: '', weight: '', completed: false },
    { reps: '', weight: '', completed: false }
  ]);
  
  const [restTimer, setRestTimer] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const timerRef = useRef(null);

  const currentExercise = exercises[currentExIndex];

  useEffect(() => {
    if (isResting && restTimer > 0) {
      timerRef.current = setTimeout(() => setRestTimer(r => r - 1), 1000);
    } else if (restTimer === 0 && isResting) {
      setIsResting(false);
      // Optional: Vibrate when timer ends
      if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
    }
    return () => clearTimeout(timerRef.current);
  }, [restTimer, isResting]);

  const startRest = (seconds = 60) => {
    setRestTimer(seconds);
    setIsResting(true);
  };

  const toggleSet = (index) => {
    const newSets = [...sets];
    newSets[index].completed = !newSets[index].completed;
    setSets(newSets);
    if (newSets[index].completed) {
      startRest(60);
    }
  };

  const updateSet = (index, field, value) => {
    const newSets = [...sets];
    newSets[index][field] = value;
    setSets(newSets);
  };

  const nextExercise = () => {
    if (currentExIndex < exercises.length - 1) {
      setCurrentExIndex(c => c + 1);
      // Reset sets for next exercise (simplified)
      setSets([{ reps: '', weight: '', completed: false }, { reps: '', weight: '', completed: false }, { reps: '', weight: '', completed: false }]);
      setIsResting(false);
    } else {
      // Finish Workout
      if (window.confirm("Finish workout?")) {
        finishWorkout({ totalVolume: 1000 }); // Mock summary
        navigate('/');
      }
    }
  };

  if (!currentExercise) return <div className="page-container text-center pt-20">Loading workout...</div>;

  return (
    <div className="fixed inset-0 bg-dark-900 z-50 overflow-y-auto pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-dark-900/80 backdrop-blur-md border-b border-white/10 px-4 py-4 flex justify-between items-center">
        <Button variant="icon" onClick={() => { if(window.confirm('Cancel workout?')) { cancelWorkout(); navigate('/'); } }}>
          <X />
        </Button>
        <span className="font-bold text-lg">Workout in Progress</span>
        <Button variant="icon" onClick={() => { finishWorkout({}); navigate('/'); }}>
          <Check className="text-gain-400" />
        </Button>
      </div>

      {/* Exercise Media */}
      <div className="w-full aspect-[4/3] bg-white/5 relative overflow-hidden">
        {currentExercise.gifUrl ? (
          <img src={currentExercise.gifUrl} alt={currentExercise.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/30">No Media</div>
        )}
        
        {/* Rest Timer Overlay */}
        {isResting && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm">
            <Timer className="w-12 h-12 text-violet-400 mb-2 animate-bounce-subtle" />
            <h3 className="text-4xl font-bold text-white mb-2">{Math.floor(restTimer/60)}:{(restTimer%60).toString().padStart(2, '0')}</h3>
            <p className="text-white/60 mb-6">Resting</p>
            <Button variant="glass" onClick={() => setIsResting(false)}>Skip Rest</Button>
          </div>
        )}
      </div>

      <div className="px-4 py-6">
        {/* Exercise Info */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-2xl font-display font-bold">{currentExercise.name}</h2>
            <span className="text-violet-400 font-bold">{currentExIndex + 1} / {exercises.length}</span>
          </div>
          <p className="text-white/60 text-sm">{currentExercise.muscleGroup}</p>
        </div>

        {/* Sets Tracker */}
        <div className="space-y-3 mb-10">
          <div className="flex text-xs text-white/50 font-medium px-2 mb-2 uppercase tracking-wide">
            <div className="w-10">Set</div>
            <div className="flex-1 text-center">kg</div>
            <div className="flex-1 text-center">Reps</div>
            <div className="w-12 text-center">Done</div>
          </div>
          
          {sets.map((set, idx) => (
            <div key={idx} className={`flex items-center glass rounded-xl p-2 transition-colors ${set.completed ? 'bg-gain-600/20 border-gain-500/50' : ''}`}>
              <div className="w-10 text-center font-bold text-white/50">{idx + 1}</div>
              <div className="flex-1 px-1">
                <input 
                  type="number" 
                  className="w-full bg-black/20 rounded-lg text-center py-3 text-lg font-bold disabled:opacity-50"
                  placeholder="0"
                  value={set.weight}
                  onChange={e => updateSet(idx, 'weight', e.target.value)}
                  disabled={set.completed}
                />
              </div>
              <div className="flex-1 px-1">
                <input 
                  type="number" 
                  className="w-full bg-black/20 rounded-lg text-center py-3 text-lg font-bold disabled:opacity-50"
                  placeholder="10"
                  value={set.reps}
                  onChange={e => updateSet(idx, 'reps', e.target.value)}
                  disabled={set.completed}
                />
              </div>
              <div className="w-12 flex justify-center">
                <button 
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${set.completed ? 'bg-gain-500 text-white shadow-gain-glow' : 'bg-white/10 text-white/30'}`}
                  onClick={() => toggleSet(idx)}
                >
                  <Check size={16} strokeWidth={3} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Next Exercise Button */}
        <Button variant="primary" className="w-full py-4 text-lg" onClick={nextExercise}>
          {currentExIndex < exercises.length - 1 ? 'Next Exercise' : 'Finish Workout'}
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
