import { getProgramByProfile } from '../data/workoutPrograms';

/**
 * Generate a personalized 7-day weekly plan for a user profile
 */
export const generateWeeklyProgram = (userProfile) => {
  return getProgramByProfile(userProfile);
};

/**
 * Progressive Overload Suggestion
 * If user completed the last session with all reps at target, suggest increase
 */
export const getProgressiveOverloadSuggestion = (lastSession, exercise) => {
  if (!lastSession || !exercise) return null;
  const lastLog = lastSession.find(e => e.name === exercise.name);
  if (!lastLog) return null;

  const allSetsCompleted = lastLog.sets?.every(s => s.completed && parseInt(s.reps) >= parseInt(exercise.reps?.split('-')[1] || exercise.reps));

  if (allSetsCompleted) {
    const lastWeight = parseFloat(lastLog.sets[0]?.weight || 0);
    const increment = lastWeight >= 40 ? 2.5 : 1.25;
    return {
      type: 'weight',
      suggestion: `Increase weight by ${increment}kg (to ${lastWeight + increment}kg) 💪`,
      newWeight: lastWeight + increment
    };
  }
  return null;
};

/**
 * Calculate workout volume (sets × reps × weight)
 */
export const calculateVolume = (exercises) => {
  return exercises.reduce((total, ex) => {
    const exVolume = (ex.sets || []).reduce((s, set) => {
      return s + (parseFloat(set.weight || 0) * parseInt(set.reps || 0));
    }, 0);
    return total + exVolume;
  }, 0);
};

/**
 * Get a missed workout recovery plan
 */
export const getMissedWorkoutSuggestion = (missedDay) => {
  const suggestions = {
    Push: "Do a shorter upper body push session today, or combine it with tomorrow's Pull day for a full Upper Body session.",
    Pull: "Add extra back/bicep work to your next session, or do a short 30-min pull session today.",
    Legs: "Legs are important — try to make it up within 2 days. Even a 30-min bodyweight leg session helps.",
    Rest: "You successfully rested! That counts as planned recovery.",
  };
  return suggestions[missedDay?.type] || "Get back on track with today's planned session. One missed day won't break your progress.";
};
