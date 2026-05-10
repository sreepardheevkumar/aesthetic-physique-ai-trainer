import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check, X, Timer } from 'lucide-react';
import { useWorkoutContext } from '../context/WorkoutContext';
import { exercises as exerciseLibrary } from '../data/exercises';
import { Button } from '../components/ui/Button';

const createSetState = (count = 3) =>
  Array.from({ length: count }, () => ({ reps: '', weight: '', completed: false }));

export default function ActiveWorkout() {
  const { currentWorkout, finishWorkout, cancelWorkout } = useWorkoutContext();
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const workoutExercises = (currentWorkout?.exercises || []).map((exercise) => {
    const details = exerciseLibrary.find((item) => item.name === exercise.name);
    return details ? { ...details, ...exercise } : exercise;
  });

  const [currentExIndex, setCurrentExIndex] = useState(0);
  const currentExercise = workoutExercises[currentExIndex];
  const [sets, setSets] = useState(createSetState(currentExercise?.sets || 3));
  const [restTimer, setRestTimer] = useState(0);
  const [isResting, setIsResting] = useState(false);

  useEffect(() => {
    if (!currentWorkout) {
      navigate('/workout');
    }
  }, [currentWorkout, navigate]);

  useEffect(() => {
    setSets(createSetState(currentExercise?.sets || 3));
    setIsResting(false);
    setRestTimer(0);
  }, [currentExIndex, currentExercise?.sets]);

  useEffect(() => {
    if (isResting && restTimer > 0) {
      timerRef.current = setTimeout(() => setRestTimer((value) => value - 1), 1000);
    } else if (restTimer === 0 && isResting) {
      setIsResting(false);
      if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
    }

    return () => clearTimeout(timerRef.current);
  }, [restTimer, isResting]);

  const startRest = (seconds = 60) => {
    setRestTimer(seconds);
    setIsResting(true);
  };

  const toggleSet = (index) => {
    setSets((previous) => {
      const next = [...previous];
      next[index] = { ...next[index], completed: !next[index].completed };
      if (next[index].completed) startRest(Number(currentExercise?.rest) || 60);
      return next;
    });
  };

  const updateSet = (index, field, value) => {
    setSets((previous) => {
      const next = [...previous];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleFinish = async () => {
    await finishWorkout({ totalVolume: 0 });
    navigate('/');
  };

  const nextExercise = async () => {
    if (currentExIndex < workoutExercises.length - 1) {
      setCurrentExIndex((value) => value + 1);
      return;
    }

    if (window.confirm('Finish workout?')) {
      await handleFinish();
    }
  };

  if (!currentWorkout || !currentExercise) {
    return <div className="page-container text-center pt-20">Loading workout...</div>;
  }

  return (
    <div className="fixed inset-0 bg-dark-900 z-50 overflow-y-auto pb-24">
      <div className="sticky top-0 z-40 bg-dark-900/80 backdrop-blur-md border-b border-white/10 px-4 py-4 flex justify-between items-center">
        <Button
          variant="icon"
          onClick={() => {
            if (window.confirm('Cancel workout?')) {
              cancelWorkout();
              navigate('/workout');
            }
          }}
        >
          <X />
        </Button>
        <span className="font-bold text-lg">{currentWorkout.type}</span>
        <Button variant="icon" onClick={handleFinish}>
          <Check className="text-gain-400" />
        </Button>
      </div>

      <div className="w-full aspect-[4/3] bg-white/5 relative overflow-hidden">
        {currentExercise.gifUrl ? (
          <img src={currentExercise.gifUrl} alt={currentExercise.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/30 text-6xl">🏋️</div>
        )}

        {isResting && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm">
            <Timer className="w-12 h-12 text-violet-400 mb-2" />
            <h3 className="text-4xl font-bold text-white mb-2">
              {Math.floor(restTimer / 60)}:{(restTimer % 60).toString().padStart(2, '0')}
            </h3>
            <p className="text-white/60 mb-6">Resting</p>
            <Button variant="glass" onClick={() => setIsResting(false)}>Skip Rest</Button>
          </div>
        )}
      </div>

      <div className="px-4 py-6">
        <div className="mb-8">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-2xl font-display font-bold">{currentExercise.name}</h2>
            <span className="text-violet-400 font-bold">{currentExIndex + 1} / {workoutExercises.length}</span>
          </div>
          <p className="text-white/60 text-sm">
            {currentWorkout.focus} · {currentExercise.sets} sets · {currentExercise.reps} reps
          </p>
        </div>

        <div className="space-y-3 mb-10">
          <div className="flex text-xs text-white/50 font-medium px-2 mb-2 uppercase tracking-wide">
            <div className="w-10">Set</div>
            <div className="flex-1 text-center">kg</div>
            <div className="flex-1 text-center">Reps</div>
            <div className="w-12 text-center">Done</div>
          </div>

          {sets.map((set, index) => (
            <div key={index} className={`flex items-center glass rounded-xl p-2 transition-colors ${set.completed ? 'bg-gain-600/20 border-gain-500/50' : ''}`}>
              <div className="w-10 text-center font-bold text-white/50">{index + 1}</div>
              <div className="flex-1 px-1">
                <input
                  type="number"
                  className="w-full bg-black/20 rounded-lg text-center py-3 text-lg font-bold disabled:opacity-50"
                  placeholder="0"
                  value={set.weight}
                  onChange={(event) => updateSet(index, 'weight', event.target.value)}
                  disabled={set.completed}
                />
              </div>
              <div className="flex-1 px-1">
                <input
                  type="number"
                  className="w-full bg-black/20 rounded-lg text-center py-3 text-lg font-bold disabled:opacity-50"
                  placeholder="10"
                  value={set.reps}
                  onChange={(event) => updateSet(index, 'reps', event.target.value)}
                  disabled={set.completed}
                />
              </div>
              <div className="w-12 flex justify-center">
                <button
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${set.completed ? 'bg-gain-500 text-white shadow-gain-glow' : 'bg-white/10 text-white/30'}`}
                  onClick={() => toggleSet(index)}
                >
                  <Check size={16} strokeWidth={3} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <Button variant="primary" className="w-full py-4 text-lg" onClick={nextExercise}>
          {currentExIndex < workoutExercises.length - 1 ? 'Next Exercise' : 'Finish Workout'}
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
