// ============================================================
// WORKOUT PROGRAMS — Dynamic generation by days per week
// ============================================================

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Exercise library per muscle group
const EXERCISES = {
  chest: [
    { name: 'Barbell Bench Press', sets: 4, reps: '8-10', rest: 90 },
    { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', rest: 75 },
    { name: 'Cable Chest Fly', sets: 3, reps: '12-15', rest: 60 },
    { name: 'Push-ups', sets: 4, reps: '15-20', rest: 45 },
  ],
  back: [
    { name: 'Pull-ups', sets: 4, reps: '6-10', rest: 90 },
    { name: 'Barbell Row', sets: 4, reps: '8-10', rest: 90 },
    { name: 'Seated Cable Row', sets: 3, reps: '10-12', rest: 75 },
    { name: 'Face Pulls', sets: 3, reps: '15-20', rest: 60 },
  ],
  legs: [
    { name: 'Barbell Squat', sets: 4, reps: '6-10', rest: 120 },
    { name: 'Romanian Deadlift', sets: 3, reps: '10-12', rest: 90 },
    { name: 'Leg Press', sets: 3, reps: '12-15', rest: 75 },
    { name: 'Leg Curl', sets: 3, reps: '12-15', rest: 60 },
    { name: 'Calf Raises', sets: 4, reps: '20-25', rest: 45 },
  ],
  shoulders: [
    { name: 'Overhead Press', sets: 4, reps: '8-10', rest: 90 },
    { name: 'Lateral Raises', sets: 4, reps: '15-20', rest: 45 },
    { name: 'Rear Delt Fly', sets: 3, reps: '15-20', rest: 45 },
  ],
  arms: [
    { name: 'Barbell Curl', sets: 3, reps: '10-12', rest: 60 },
    { name: 'Hammer Curls', sets: 3, reps: '12-15', rest: 60 },
    { name: 'Tricep Rope Pushdown', sets: 3, reps: '12-15', rest: 60 },
    { name: 'Skull Crushers', sets: 3, reps: '10-12', rest: 60 },
  ],
  core: [
    { name: 'Plank', sets: 3, reps: '60s', rest: 45 },
    { name: 'Hanging Leg Raises', sets: 3, reps: '12-15', rest: 60 },
    { name: 'Ab Wheel Rollout', sets: 3, reps: '10-12', rest: 60 },
  ],
  bodyweight: [
    { name: 'Push-ups', sets: 4, reps: '15-20', rest: 45 },
    { name: 'Bodyweight Squat', sets: 4, reps: '20', rest: 45 },
    { name: 'Glute Bridge', sets: 4, reps: '20', rest: 45 },
    { name: 'Mountain Climbers', sets: 3, reps: '30s', rest: 30 },
    { name: 'Burpees', sets: 3, reps: '10', rest: 60 },
    { name: 'Plank', sets: 3, reps: '45s', rest: 30 },
    { name: 'Jumping Jacks', sets: 3, reps: '30s', rest: 30 },
    { name: 'Reverse Lunges', sets: 3, reps: '12 each', rest: 60 },
  ],
};

const REST_DAY = (label) => ({
  label, type: 'Rest', focus: 'Active Recovery', duration: 0, intensity: 'None',
  warmup: [], exercises: [], cooldown: [],
  notes: 'Rest, recover, eat well, sleep 8 hours.'
});

// Templates per days/week
const buildDays = (daysPerWeek, equipment) => {
  const isHome = equipment === 'No Equipment';
  const hasDumbbells = equipment === 'Dumbbells Only' || equipment === 'Full Gym';
  const hasBarbell = equipment === 'Full Gym';

  const push = {
    type: 'Push', focus: 'Chest · Shoulders · Triceps', duration: 60, intensity: 'High',
    warmup: ['5 min jog', 'Arm circles 30s', 'Band pull-aparts 2×15'],
    exercises: [
      ...(hasBarbell ? [EXERCISES.chest[0]] : []),
      EXERCISES.chest[1] || EXERCISES.chest[3],
      EXERCISES.chest[2],
      EXERCISES.shoulders[0],
      EXERCISES.shoulders[1],
      EXERCISES.arms[2],
    ].filter(Boolean),
    cooldown: ['Chest stretch 30s each', 'Shoulder stretch 30s each'],
  };

  const pull = {
    type: 'Pull', focus: 'Back · Biceps · Rear Delts', duration: 60, intensity: 'High',
    warmup: ['5 min bike', 'Band pull-aparts 2×15', 'Cat-cow 10'],
    exercises: [
      EXERCISES.back[0],
      ...(hasBarbell ? [EXERCISES.back[1]] : []),
      EXERCISES.back[2],
      EXERCISES.back[3],
      EXERCISES.arms[0],
      EXERCISES.arms[1],
    ].filter(Boolean),
    cooldown: ['Lat stretch 30s each', 'Bicep wall stretch 30s each'],
  };

  const legs = {
    type: 'Legs', focus: 'Quads · Hamstrings · Glutes', duration: 65, intensity: 'Very High',
    warmup: ['5 min walk', 'Leg swings 15 each', 'Glute bridges 2×15'],
    exercises: [
      ...(hasBarbell ? [EXERCISES.legs[0]] : []),
      EXERCISES.legs[1],
      ...(hasDumbbells || hasBarbell ? [EXERCISES.legs[2]] : []),
      EXERCISES.legs[3],
      EXERCISES.legs[4],
    ].filter(Boolean),
    cooldown: ['Hip flexor stretch 60s each', 'Hamstring stretch 45s each'],
  };

  const upper = {
    type: 'Upper', focus: 'Chest · Back · Shoulders · Arms', duration: 65, intensity: 'High',
    warmup: ['5 min row', 'Arm circles 30s', 'Band pull-aparts 2×15'],
    exercises: [
      ...(hasBarbell ? [EXERCISES.chest[0]] : [EXERCISES.chest[3]]),
      EXERCISES.back[0],
      EXERCISES.shoulders[0],
      EXERCISES.back[2],
      EXERCISES.arms[0],
      EXERCISES.arms[2],
    ].filter(Boolean),
    cooldown: ['Full body stretch 10 min'],
  };

  const lower = {
    type: 'Lower', focus: 'Quads · Hamstrings · Glutes · Core', duration: 60, intensity: 'High',
    warmup: ['5 min bike', 'Glute bridges 2×20'],
    exercises: [
      ...(hasBarbell ? [EXERCISES.legs[0]] : []),
      EXERCISES.legs[1],
      EXERCISES.legs[3],
      EXERCISES.legs[4],
      EXERCISES.core[0],
    ].filter(Boolean),
    cooldown: ['Hip flexor 60s each', 'Child\'s pose 60s'],
  };

  const fullBody = {
    type: 'Full Body', focus: 'Total Body Strength', duration: 50, intensity: 'High',
    warmup: ['5 min walk', 'Jumping jacks 30s', 'Arm swings 30s'],
    exercises: isHome ? EXERCISES.bodyweight : [
      ...(hasBarbell ? [EXERCISES.chest[0]] : [EXERCISES.chest[3]]),
      EXERCISES.back[0],
      ...(hasBarbell ? [EXERCISES.legs[0]] : []),
      EXERCISES.shoulders[1],
      EXERCISES.core[0],
    ].filter(Boolean),
    cooldown: ['Full body stretch 10 min'],
  };

  const cardio = {
    type: 'Cardio', focus: 'Active Cardio / HIIT', duration: 35, intensity: 'Moderate',
    warmup: [],
    exercises: isHome ? [
      EXERCISES.bodyweight[4], // Burpees
      EXERCISES.bodyweight[3], // Mountain Climbers
      { name: 'High Knees', sets: 4, reps: '30s', rest: 30 },
    ] : [
      { name: 'Treadmill Run', sets: 1, reps: '20 min', rest: 0 },
      { name: 'Rowing Machine', sets: 1, reps: '10 min', rest: 0 },
    ],
    cooldown: ['Walk 5 min', 'Stretch 5 min'],
  };

  // Build 7-day schedule based on daysPerWeek
  let schedule;

  if (daysPerWeek === 2) {
    schedule = [fullBody, REST_DAY('Tue'), REST_DAY('Wed'), fullBody, REST_DAY('Thu'), REST_DAY('Fri'), REST_DAY('Sun')];
  } else if (daysPerWeek === 3) {
    schedule = [push, REST_DAY('Tue'), pull, REST_DAY('Thu'), legs, REST_DAY('Sat'), REST_DAY('Sun')];
  } else if (daysPerWeek === 4) {
    schedule = [upper, REST_DAY('Tue'), lower, REST_DAY('Thu'), upper, REST_DAY('Sat'), lower];
  } else if (daysPerWeek === 5) {
    schedule = [push, pull, legs, REST_DAY('Thu'), upper, lower, REST_DAY('Sun')];
  } else if (daysPerWeek === 6) {
    schedule = [push, pull, legs, push, pull, legs, REST_DAY('Sun')];
  } else {
    // Default: 4 days
    schedule = [upper, REST_DAY('Tue'), lower, REST_DAY('Thu'), upper, REST_DAY('Sat'), lower];
  }

  return schedule.map((day, i) => ({
    day: i + 1,
    label: WEEKDAYS[i],
    ...day,
    warmup: day.warmup || [],
    exercises: day.exercises || [],
    cooldown: day.cooldown || [],
  }));
};

export const getProgramByProfile = (profile) => {
  const days = parseInt(profile?.daysPerWeek) || 4;
  const equipment = profile?.equipment || 'Full Gym';
  const goal = profile?.goal || 'Aesthetic Physique';
  const name = profile?.name || 'Athlete';

  const splitName = {
    2: 'Full Body',
    3: 'Push / Pull / Legs',
    4: 'Upper / Lower',
    5: 'PPL + Upper / Lower',
    6: '6-Day PPL',
  };

  return {
    id: `custom_${days}d`,
    name: `${name}'s ${days}-Day ${splitName[days] || 'Training'} Program`,
    goal,
    daysPerWeek: days,
    equipment,
    description: `Custom program generated for ${name} — ${days} days/week, goal: ${goal}`,
    days: buildDays(days, equipment),
  };
};
