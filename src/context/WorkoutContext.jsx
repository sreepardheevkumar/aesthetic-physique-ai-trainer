import React, { createContext, useContext, useState, useEffect } from 'react';
import { useIndexedDB } from '../hooks/useIndexedDB';

const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const { data: logsData, addData: addWorkoutLog } = useIndexedDB('workoutLogs');
  const [currentWorkout, setCurrentWorkout] = useState(null);
  
  // Basic mock structure for now
  const [weeklyPlan, setWeeklyPlan] = useState([]);

  useEffect(() => {
      // In a real app, generate this based on userProfile from AppContext
      // For now, simple static placeholder
      setWeeklyPlan([
          { day: 1, type: 'Push', completed: false },
          { day: 2, type: 'Pull', completed: false },
          { day: 3, type: 'Legs', completed: false },
          { day: 4, type: 'Rest', completed: false },
          { day: 5, type: 'Upper', completed: false },
          { day: 6, type: 'Lower', completed: false },
          { day: 7, type: 'Rest', completed: false },
      ]);
  }, []);

  const startWorkout = (workoutPlan) => {
    setCurrentWorkout({
      ...workoutPlan,
      startTime: new Date().toISOString(),
      exercises: workoutPlan.exercises || [],
    });
  };

  const finishWorkout = async (summaryData) => {
    if (currentWorkout) {
      const logEntry = {
        ...currentWorkout,
        ...summaryData,
        endTime: new Date().toISOString(),
      };
      await addWorkoutLog(logEntry);
      setCurrentWorkout(null);
    }
  };

  const cancelWorkout = () => {
    setCurrentWorkout(null);
  };

  return (
    <WorkoutContext.Provider value={{ currentWorkout, startWorkout, finishWorkout, cancelWorkout, weeklyPlan, logsData }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkoutContext = () => useContext(WorkoutContext);
