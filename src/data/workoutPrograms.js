import { getProfileInsights } from '../utils/profileInsights';

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const ex = (name, sets, reps, rest) => ({ name, sets, reps, rest });

const REST_DAY = {
  type: 'Rest',
  focus: 'Recovery + Mobility',
  duration: 0,
  intensity: 'None',
  warmup: [],
  exercises: [],
  cooldown: [],
  notes: 'Recover hard: walk, stretch lightly, hydrate, and sleep well.',
  coachTip: 'Consistency grows between sessions too. Treat recovery like training.'
};

const RECOVERY_DAY = {
  type: 'Recovery',
  focus: 'Walking · Mobility · Easy Cardio',
  duration: 25,
  intensity: 'Low',
  warmup: ['5 min easy walk'],
  exercises: [
    ex('Walking', 1, '20-30 min', 0),
    ex('Hip Mobility Flow', 2, '45s each', 20),
    ex('Thoracic Rotations', 2, '10 each', 20),
  ],
  cooldown: ['Nasal breathing 2 min', 'Light stretching 5 min'],
  notes: 'Keep the effort easy. This day is for feeling better tomorrow.',
  coachTip: 'Recovery sessions help posture, blood flow, and adherence.'
};

const fullGymPool = {
  push: [
    ex('Barbell Bench Press', 4, '6-8', 120),
    ex('Incline Dumbbell Press', 4, '8-10', 90),
    ex('Weighted Dips', 3, '8-10', 90),
    ex('Overhead Press', 3, '8-10', 90),
    ex('Lateral Raises', 4, '12-20', 45),
    ex('Skull Crushers', 3, '10-12', 60),
  ],
  pull: [
    ex('Pull-ups', 4, '6-10', 90),
    ex('Barbell Row', 4, '8-10', 90),
    ex('Seated Cable Row', 3, '10-12', 75),
    ex('Face Pulls', 3, '15-20', 45),
    ex('Barbell Curl', 3, '10-12', 60),
    ex('Hammer Curls', 3, '12-15', 60),
  ],
  legs: [
    ex('Barbell Squat', 4, '6-8', 120),
    ex('Romanian Deadlift', 4, '8-10', 90),
    ex('Bulgarian Split Squat', 3, '10-12 each', 75),
    ex('Leg Curl', 3, '12-15', 60),
    ex('Standing Calf Raises', 4, '15-20', 45),
  ],
  upper: [
    ex('Barbell Bench Press', 4, '6-8', 120),
    ex('Pull-ups', 4, '6-10', 90),
    ex('Overhead Press', 3, '8-10', 90),
    ex('Seated Cable Row', 3, '10-12', 75),
    ex('Incline Dumbbell Press', 3, '10-12', 75),
    ex('Face Pulls', 3, '15-20', 45),
  ],
  lower: [
    ex('Barbell Squat', 4, '6-8', 120),
    ex('Romanian Deadlift', 4, '8-10', 90),
    ex('Leg Press', 3, '12-15', 75),
    ex('Walking Lunges', 3, '12 each', 75),
    ex('Calf Raises', 4, '15-20', 45),
    ex('Plank', 3, '45-60s', 45),
  ],
  conditioning: [
    ex('Rowing Machine', 5, '1 min hard', 60),
    ex('Battle Ropes', 4, '30s', 45),
    ex('Farmer Walks', 4, '40m', 60),
    ex('Burpees', 3, '10', 60),
  ],
  glutes: [
    ex('Hip Thrusts', 4, '10-12', 90),
    ex('Romanian Deadlift', 4, '8-10', 90),
    ex('Cable Kickbacks', 3, '12-15', 45),
    ex('Hamstring Curl', 3, '12-15', 60),
    ex('Walking Lunges', 3, '12 each', 75),
  ],
  quads: [
    ex('Barbell Squat', 4, '8-10', 120),
    ex('Bulgarian Split Squat', 3, '10-12 each', 75),
    ex('Leg Press', 3, '12-15', 75),
    ex('Step-ups', 3, '12 each', 60),
    ex('Calf Raises', 4, '15-20', 45),
  ],
  fullBody: [
    ex('Goblet Squat', 3, '10-12', 75),
    ex('Push-ups', 3, '10-15', 45),
    ex('Seated Cable Row', 3, '10-12', 75),
    ex('Romanian Deadlift', 3, '8-10', 90),
    ex('Plank', 3, '30-45s', 45),
  ],
};

const dumbbellPool = {
  push: [
    ex('Dumbbell Floor Press', 4, '8-10', 75),
    ex('Incline Dumbbell Press', 4, '8-12', 75),
    ex('Push-ups', 3, '12-15', 45),
    ex('Dumbbell Shoulder Press', 3, '8-10', 75),
    ex('Lateral Raises', 4, '12-20', 45),
    ex('Overhead Dumbbell Extension', 3, '10-12', 60),
  ],
  pull: [
    ex('One-Arm Dumbbell Row', 4, '10-12', 60),
    ex('Chest Supported Dumbbell Row', 3, '10-12', 60),
    ex('Rear Delt Fly', 3, '12-15', 45),
    ex('Hammer Curls', 3, '10-12', 45),
    ex('Dumbbell Curl', 3, '10-12', 45),
  ],
  legs: [
    ex('Goblet Squat', 4, '10-12', 75),
    ex('Dumbbell Romanian Deadlift', 4, '10-12', 75),
    ex('Walking Lunges', 3, '12 each', 60),
    ex('Split Squat', 3, '10 each', 60),
    ex('Calf Raises', 4, '20', 45),
  ],
  upper: [
    ex('Dumbbell Floor Press', 4, '8-10', 75),
    ex('One-Arm Dumbbell Row', 4, '10-12', 60),
    ex('Dumbbell Shoulder Press', 3, '8-10', 75),
    ex('Lateral Raises', 3, '12-15', 45),
    ex('Hammer Curls', 3, '10-12', 45),
    ex('Overhead Dumbbell Extension', 3, '10-12', 45),
  ],
  lower: [
    ex('Goblet Squat', 4, '10-12', 75),
    ex('Dumbbell Romanian Deadlift', 4, '10-12', 75),
    ex('Step-ups', 3, '12 each', 60),
    ex('Glute Bridge', 3, '15', 45),
    ex('Plank', 3, '45s', 45),
  ],
  conditioning: [
    ex('Dumbbell Thrusters', 4, '12', 45),
    ex('Mountain Climbers', 4, '30s', 30),
    ex('Burpees', 3, '10', 60),
    ex('Jump Rope', 4, '1 min', 30),
  ],
  glutes: [
    ex('Dumbbell Hip Thrust', 4, '12', 75),
    ex('Dumbbell Romanian Deadlift', 4, '10-12', 75),
    ex('Reverse Lunges', 3, '12 each', 60),
    ex('Glute Bridge', 3, '15', 45),
    ex('Kickback Pulses', 3, '20 each', 30),
  ],
  quads: [
    ex('Goblet Squat', 4, '10-12', 75),
    ex('Bulgarian Split Squat', 3, '10 each', 60),
    ex('Step-ups', 3, '12 each', 60),
    ex('Walking Lunges', 3, '12 each', 60),
    ex('Calf Raises', 4, '20', 45),
  ],
  fullBody: [
    ex('Goblet Squat', 3, '10-12', 75),
    ex('Dumbbell Floor Press', 3, '10', 60),
    ex('One-Arm Dumbbell Row', 3, '12 each', 60),
    ex('Dumbbell Romanian Deadlift', 3, '10', 75),
    ex('Plank', 3, '30-45s', 45),
  ],
};

const bodyweightPool = {
  push: [
    ex('Push-ups', 4, '10-20', 45),
    ex('Incline Push-ups', 3, '12-15', 45),
    ex('Pike Push-ups', 3, '8-10', 60),
    ex('Chair Dips', 3, '10-12', 60),
    ex('Plank Shoulder Taps', 3, '20 total', 30),
  ],
  pull: [
    ex('Doorway Row', 4, '10-12', 45),
    ex('Reverse Snow Angels', 3, '15', 30),
    ex('Superman Hold', 3, '30s', 30),
    ex('Towel Curl Isometric', 3, '20s', 20),
    ex('Prone Y-T-W Raises', 2, '8 each', 20),
  ],
  legs: [
    ex('Bodyweight Squat', 4, '15-20', 45),
    ex('Reverse Lunges', 3, '12 each', 45),
    ex('Glute Bridge', 4, '15-20', 45),
    ex('Wall Sit', 3, '45s', 45),
    ex('Calf Raises', 4, '20', 30),
  ],
  upper: [
    ex('Push-ups', 4, '10-20', 45),
    ex('Pike Push-ups', 3, '8-10', 60),
    ex('Doorway Row', 4, '10-12', 45),
    ex('Chair Dips', 3, '10-12', 60),
    ex('Plank Shoulder Taps', 3, '20 total', 30),
  ],
  lower: [
    ex('Bodyweight Squat', 4, '15-20', 45),
    ex('Reverse Lunges', 3, '12 each', 45),
    ex('Glute Bridge', 4, '15-20', 45),
    ex('Step-ups', 3, '12 each', 45),
    ex('Plank', 3, '45s', 30),
  ],
  conditioning: [
    ex('Burpees', 4, '10', 60),
    ex('Mountain Climbers', 4, '30s', 30),
    ex('Jumping Jacks', 4, '45s', 30),
    ex('High Knees', 4, '30s', 30),
  ],
  glutes: [
    ex('Glute Bridge', 4, '20', 45),
    ex('Single-Leg Glute Bridge', 3, '12 each', 45),
    ex('Squat Pulses', 3, '20', 30),
    ex('Reverse Lunges', 3, '12 each', 45),
    ex('Wall Sit', 3, '45s', 45),
  ],
  quads: [
    ex('Bodyweight Squat', 4, '20', 45),
    ex('Bulgarian Split Squat', 3, '10 each', 45),
    ex('Step-ups', 3, '12 each', 45),
    ex('Lateral Lunges', 3, '10 each', 45),
    ex('Calf Raises', 4, '20', 30),
  ],
  fullBody: [
    ex('Push-ups', 3, '10-15', 45),
    ex('Bodyweight Squat', 3, '15-20', 45),
    ex('Glute Bridge', 3, '15-20', 45),
    ex('Mountain Climbers', 3, '30s', 30),
    ex('Plank', 3, '30-45s', 30),
  ],
};

const getPool = (equipment) => {
  if (equipment === 'No Equipment') return bodyweightPool;
  if (equipment === 'Dumbbells Only') return dumbbellPool;
  return fullGymPool;
};

const makeDay = ({ type, focus, duration, intensity, warmup, exercises, cooldown, notes, coachTip }) => ({
  type,
  focus,
  duration,
  intensity,
  warmup,
  exercises,
  cooldown,
  notes,
  coachTip,
});

const buildWeeklyTemplate = (profile, insights) => {
  const daysPerWeek = Number(profile.daysPerWeek) || 4;
  const pool = getPool(profile.equipment);
  const segment = insights.segment;
  const experience = profile.experience || 'Beginner';

  const teen = [
    makeDay({
      type: 'Full Body',
      focus: 'Athletic Base · Core · Posture',
      duration: 45,
      intensity: 'Moderate',
      warmup: ['Brisk walk 5 min', 'Arm swings 30s', 'Hip openers 30s'],
      exercises: pool.fullBody,
      cooldown: ['Hamstring stretch 45s', 'Chest stretch 45s'],
      notes: 'Move crisply and stop each set before form breaks.',
      coachTip: 'Teen plans prioritize coordination, posture, and repeatable habits over maximal loading.',
    }),
    RECOVERY_DAY,
    makeDay({
      type: 'Upper',
      focus: 'Push · Pull · Shoulder Control',
      duration: 40,
      intensity: 'Moderate',
      warmup: ['Jumping jacks 45s', 'Scap circles 10 each'],
      exercises: pool.upper,
      cooldown: ['Lat stretch 45s each', 'Breathing 2 min'],
      notes: 'Think clean reps and stable shoulder blades.',
      coachTip: 'Own the movement pattern first, then earn harder variations.',
    }),
    makeDay({
      type: 'Lower',
      focus: 'Leg Strength · Glutes · Core',
      duration: 40,
      intensity: 'Moderate',
      warmup: ['Walk 5 min', 'Leg swings 10 each'],
      exercises: pool.lower,
      cooldown: ['Quad stretch 45s each', 'Calf stretch 45s each'],
      notes: 'Control the lowering phase to build better movement quality.',
      coachTip: 'A strong lower body supports sports, posture, and confidence.',
    }),
    makeDay({
      type: 'Cardio',
      focus: 'Conditioning · Core',
      duration: 30,
      intensity: 'Moderate',
      warmup: ['Easy march 2 min'],
      exercises: pool.conditioning,
      cooldown: ['Walk 3 min', 'Child\'s pose 45s'],
      notes: 'Keep energy high but technique sharp.',
      coachTip: 'Cardio days build work capacity without replacing strength work.',
    }),
    REST_DAY,
    REST_DAY,
  ];

  const college = [
    makeDay({
      type: 'Push',
      focus: 'Chest · Shoulders · Triceps',
      duration: 60,
      intensity: 'High',
      warmup: ['Bike 5 min', 'Band pull-aparts 2x15'],
      exercises: pool.push,
      cooldown: ['Chest stretch 45s', 'Tricep stretch 45s'],
      notes: 'Track top sets and try to add reps or load weekly.',
      coachTip: 'Your research emphasized progressive overload for students. Log your numbers.',
    }),
    makeDay({
      type: 'Pull',
      focus: 'Back · Biceps · Rear Delts',
      duration: 60,
      intensity: 'High',
      warmup: ['Row 5 min', 'Scap pull-downs 2x12'],
      exercises: pool.pull,
      cooldown: ['Lat stretch 45s', 'Biceps wall stretch 45s'],
      notes: 'Chase full range and posture, not just momentum.',
      coachTip: 'Back detail and posture carry the whole aesthetic look.',
    }),
    makeDay({
      type: 'Legs',
      focus: 'Quads · Hamstrings · Glutes',
      duration: 65,
      intensity: 'Very High',
      warmup: ['Walk 5 min', 'Leg swings 10 each', 'Glute bridges 15'],
      exercises: pool.legs,
      cooldown: ['Hip flexor stretch 45s', 'Hamstring stretch 45s'],
      notes: 'Hard leg work gives the physique real balance.',
      coachTip: 'The aesthetic look is never just upper body. Train legs like they matter.',
    }),
    makeDay({
      type: 'Upper',
      focus: 'Shoulders · Arms · Abs',
      duration: 55,
      intensity: 'High',
      warmup: ['Band warmup 4 min'],
      exercises: [...pool.upper.slice(2), ex('Hanging Leg Raises', 3, '12-15', 45)],
      cooldown: ['Shoulder stretch 45s', 'Cobra stretch 30s'],
      notes: 'This is your refinement day: delts, arms, and control.',
      coachTip: 'Use this session to build the visible details of the physique.',
    }),
    makeDay({
      type: 'Conditioning',
      focus: 'Athletic Conditioning',
      duration: 35,
      intensity: 'Moderate',
      warmup: ['Walk 3 min', 'Dynamic stretch 2 min'],
      exercises: pool.conditioning,
      cooldown: ['Walk 5 min'],
      notes: 'Work hard but leave enough recovery for next week.',
      coachTip: 'Conditioning supports energy, appetite control, and athletic shape.',
    }),
    REST_DAY,
    REST_DAY,
  ];

  const professional = [
    makeDay({
      type: 'Push',
      focus: 'Push Strength',
      duration: 40,
      intensity: 'High',
      warmup: ['Walk 4 min', 'Band warmup 2 min'],
      exercises: pool.push.slice(0, 4),
      cooldown: ['Chest stretch 45s', 'Breathing 2 min'],
      notes: 'Keep rest tight and move with intent.',
      coachTip: 'Minimalist sessions work when intensity stays high and fluff stays low.',
    }),
    makeDay({
      type: 'Pull',
      focus: 'Pull Strength · Posture',
      duration: 40,
      intensity: 'High',
      warmup: ['Row 4 min', 'Scap pull-aparts 2x15'],
      exercises: pool.pull.slice(0, 4),
      cooldown: ['Lat stretch 45s', 'Neck resets 30s'],
      notes: 'Quality rows and face pulls help undo desk posture.',
      coachTip: 'This day is your posture insurance policy.',
    }),
    makeDay({
      type: 'Legs',
      focus: 'Lower Body',
      duration: 45,
      intensity: 'High',
      warmup: ['Walk 4 min', 'Hip openers 1 min'],
      exercises: pool.legs.slice(0, 4),
      cooldown: ['Hip flexor stretch 45s', 'Calf stretch 45s'],
      notes: 'Compound lifts first, then finish and get out.',
      coachTip: 'Busy schedules reward compact sessions with big movements.',
    }),
    makeDay({
      type: 'Conditioning',
      focus: 'Circuit + Cardio',
      duration: 30,
      intensity: 'Moderate',
      warmup: ['March 2 min'],
      exercises: pool.conditioning,
      cooldown: ['Walk 3 min', 'Stretch 4 min'],
      notes: 'Stay smooth. We are building capacity, not wrecking recovery.',
      coachTip: 'Conditioning helps stress management and supports fat loss.',
    }),
    RECOVERY_DAY,
    REST_DAY,
    REST_DAY,
  ];

  const femaleAesthetic = [
    makeDay({
      type: 'Lower',
      focus: 'Glutes · Hamstrings',
      duration: 60,
      intensity: 'High',
      warmup: ['Walk 5 min', 'Glute activation 2x15'],
      exercises: pool.glutes,
      cooldown: ['Hamstring stretch 45s', 'Figure-4 stretch 45s'],
      notes: 'Drive through the heel and finish glute-dominant reps fully.',
      coachTip: 'This follows your research emphasis on glute development and posterior-chain shape.',
    }),
    makeDay({
      type: 'Upper',
      focus: 'Back · Shoulders · Posture',
      duration: 50,
      intensity: 'High',
      warmup: ['Band warmup 4 min'],
      exercises: [...pool.pull.slice(0, 3), ...pool.upper.slice(2, 4)],
      cooldown: ['Lat stretch 45s', 'Shoulder stretch 45s'],
      notes: 'Own the shoulder blades and keep the ribcage stacked.',
      coachTip: 'Upper-back training makes the waist look tighter and posture cleaner.',
    }),
    makeDay({
      type: 'Lower',
      focus: 'Quads · Glutes',
      duration: 60,
      intensity: 'High',
      warmup: ['Bike 5 min', 'Leg swings 10 each'],
      exercises: pool.quads,
      cooldown: ['Quad stretch 45s', 'Hip flexor stretch 45s'],
      notes: 'Push the squat pattern hard, then finish with unilateral work.',
      coachTip: 'Balanced lower-body work drives both shape and function.',
    }),
    makeDay({
      type: 'Core',
      focus: 'Core Control · Cardio',
      duration: 35,
      intensity: 'Moderate',
      warmup: ['Easy walk 3 min'],
      exercises: [ex('Plank', 3, '45s', 30), ex('Bicycle Crunches', 3, '20 total', 30), ...pool.conditioning.slice(0, 2)],
      cooldown: ['Walk 5 min', 'Child\'s pose 45s'],
      notes: 'Keep the core braced and the cardio sustainable.',
      coachTip: 'Core definition comes from both training quality and nutrition adherence.',
    }),
    REST_DAY,
    RECOVERY_DAY,
    REST_DAY,
  ];

  const hardGainer = [
    makeDay({
      type: 'Upper',
      focus: 'Heavy Upper',
      duration: 60,
      intensity: 'High',
      warmup: ['Walk 5 min', 'Band warmup 3 min'],
      exercises: [
        ex(pool.push[0].name, 5, '5', 120),
        ex(pool.pull[1]?.name || pool.pull[0].name, 5, '5', 120),
        pool.pull[0],
        pool.upper[2],
      ],
      cooldown: ['Chest stretch 45s', 'Lat stretch 45s'],
      notes: 'Attack compounds and earn the volume.',
      coachTip: 'Mass gain plans hinge on hard sets, recovery, and enough food.',
    }),
    makeDay({
      type: 'Lower',
      focus: 'Heavy Lower',
      duration: 60,
      intensity: 'Very High',
      warmup: ['Walk 5 min', 'Glute bridge 15'],
      exercises: [
        ex(pool.legs[0].name, 5, '5', 120),
        ex(pool.legs[1].name, 4, '5-6', 120),
        pool.legs[2],
        pool.legs[4],
      ],
      cooldown: ['Hamstring stretch 45s', 'Hip flexor stretch 45s'],
      notes: 'Progress load slowly and consistently.',
      coachTip: 'You do not need extra fatigue from random cardio. Save resources for growth.',
    }),
    REST_DAY,
    makeDay({
      type: 'Upper',
      focus: 'Hypertrophy Upper',
      duration: 55,
      intensity: 'High',
      warmup: ['Band warmup 3 min'],
      exercises: [pool.push[1], pool.pull[2], ex('Dumbbell Fly', 3, '12-15', 45), pool.pull[4]],
      cooldown: ['Stretch 5 min'],
      notes: 'Chase the pump after the heavy work earlier in the week.',
      coachTip: 'This is the volume day that adds roundness to the frame.',
    }),
    makeDay({
      type: 'Lower',
      focus: 'Hypertrophy Lower',
      duration: 55,
      intensity: 'High',
      warmup: ['Bike 4 min'],
      exercises: [pool.lower[0], pool.legs[1], pool.legs[3], ex('Leg Extension', 3, '12-15', 60)],
      cooldown: ['Stretch 5 min'],
      notes: 'Stay controlled and let the muscles do the work.',
      coachTip: 'Volume plus food plus sleep is the recipe here.',
    }),
    REST_DAY,
    REST_DAY,
  ];

  const overweightStarter = [
    makeDay({
      type: 'Full Body',
      focus: 'Strength Base',
      duration: 40,
      intensity: 'Moderate',
      warmup: ['Walk 5 min'],
      exercises: pool.fullBody,
      cooldown: ['Walk 3 min', 'Stretch 4 min'],
      notes: 'Train at a pace you can repeat next week.',
      coachTip: 'Fat loss plans win with sustainability. Do not chase exhaustion.',
    }),
    makeDay({
      type: 'Cardio',
      focus: 'Walking · Cycling · Easy Cardio',
      duration: 45,
      intensity: 'Low',
      warmup: ['Easy walk 5 min'],
      exercises: [ex('Walking', 1, '45 min', 0), ex('Cycling', 1, '20 min optional', 0)],
      cooldown: ['Breathing 2 min'],
      notes: 'Nasal breathing pace is perfect here.',
      coachTip: 'Daily movement supports fat loss more reliably than heroic random workouts.',
    }),
    makeDay({
      type: 'Full Body',
      focus: 'Strength + Core',
      duration: 40,
      intensity: 'Moderate',
      warmup: ['Walk 5 min'],
      exercises: [...pool.fullBody.slice(0, 4), ex('Plank', 3, '30s', 30)],
      cooldown: ['Walk 3 min'],
      notes: 'Own your reps and protect your joints.',
      coachTip: 'Resistance training is what preserves muscle while body fat comes down.',
    }),
    RECOVERY_DAY,
    makeDay({
      type: 'Circuit',
      focus: 'Simple Conditioning',
      duration: 30,
      intensity: 'Moderate',
      warmup: ['March 2 min'],
      exercises: [ex('Squats', 3, '15', 30), ex('Incline Push-ups', 3, '10-12', 30), ex('Marching', 3, '45s', 20), ex('Mountain Climbers', 3, '20s', 20)],
      cooldown: ['Walk 3 min'],
      notes: 'Smooth breathing, controlled effort, no all-out redlining.',
      coachTip: 'The goal is repeatability. Stack good weeks, not one savage day.',
    }),
    REST_DAY,
    REST_DAY,
  ];

  const olderAdult = [
    makeDay({
      type: 'Full Body',
      focus: 'Strength · Posture · Mobility',
      duration: 40,
      intensity: 'Moderate',
      warmup: ['Walk 5 min', 'Joint circles 2 min'],
      exercises: pool.fullBody,
      cooldown: ['Hip mobility 3 min', 'Breathing 2 min'],
      notes: 'Use a controlled tempo and stop with 2 reps in reserve.',
      coachTip: 'Joint-friendly consistency beats sporadic heroic training.',
    }),
    RECOVERY_DAY,
    makeDay({
      type: 'Full Body',
      focus: 'Balance · Core · Lower Body',
      duration: 40,
      intensity: 'Moderate',
      warmup: ['Bike 5 min'],
      exercises: [...pool.lower.slice(0, 4), ex('Dead Bug', 3, '10 each', 30)],
      cooldown: ['Stretch 5 min'],
      notes: 'Stay stable through the trunk and hips.',
      coachTip: 'Mobility and lower-body strength are major quality-of-life investments.',
    }),
    REST_DAY,
    makeDay({
      type: 'Conditioning',
      focus: 'Walking · Light Conditioning',
      duration: 30,
      intensity: 'Low',
      warmup: ['Easy walk 3 min'],
      exercises: [ex('Walking', 1, '20-30 min', 0), ex('Farmer Carry', 4, '20m', 45)],
      cooldown: ['Stretch 5 min'],
      notes: 'Move enough to feel better, not flatter.',
      coachTip: 'Conditioning should leave you energized, not drained.',
    }),
    REST_DAY,
    REST_DAY,
  ];

  const advanced = [
    makeDay({
      type: 'Push',
      focus: 'Upper Chest · Delts · Triceps',
      duration: 70,
      intensity: 'Very High',
      warmup: ['Full upper warmup 8 min'],
      exercises: pool.push,
      cooldown: ['Stretch 6 min'],
      notes: 'Track performance and use one advanced technique on the last isolation movement only.',
      coachTip: 'Advanced work benefits from discipline. Save intensity methods for the right place.',
    }),
    makeDay({
      type: 'Pull',
      focus: 'Lats · Mid Back · Rear Delts',
      duration: 70,
      intensity: 'Very High',
      warmup: ['Row 6 min', 'Scap work 2 min'],
      exercises: pool.pull,
      cooldown: ['Stretch 6 min'],
      notes: 'Bias the lats and upper back for more shape through the torso.',
      coachTip: 'This is one of the biggest visual impact days in the whole week.',
    }),
    makeDay({
      type: 'Legs',
      focus: 'Quads · Hamstrings · Glutes',
      duration: 75,
      intensity: 'Very High',
      warmup: ['Bike 5 min', 'Leg prep 3 min'],
      exercises: pool.legs,
      cooldown: ['Stretch 6 min'],
      notes: 'Bring intent, then recover like it matters.',
      coachTip: 'Leg days are where advanced lifters separate from aesthetic pretenders.',
    }),
    makeDay({
      type: 'Upper',
      focus: 'Weak Point Specialization',
      duration: 65,
      intensity: 'High',
      warmup: ['Band warmup 5 min'],
      exercises: [...pool.upper, ex('Ab Wheel Rollout', 3, '10-12', 45)],
      cooldown: ['Stretch 5 min'],
      notes: 'Add detail work to the body parts that need more visual return.',
      coachTip: 'Specialization is earned by bringing lagging muscles up without wrecking recovery.',
    }),
    makeDay({
      type: 'Lower',
      focus: 'Posterior Chain · Core',
      duration: 65,
      intensity: 'High',
      warmup: ['Walk 5 min', 'Glute activation 2 min'],
      exercises: [...pool.lower, ex('Hanging Leg Raises', 3, '12-15', 45)],
      cooldown: ['Stretch 5 min'],
      notes: 'This is your volume support day, not a max-out day.',
      coachTip: 'Volume cycling works better than trying to PR every session.',
    }),
    makeDay({
      type: 'Conditioning',
      focus: 'Athletic Conditioning',
      duration: 35,
      intensity: 'Moderate',
      warmup: ['Walk 3 min'],
      exercises: pool.conditioning,
      cooldown: ['Walk 4 min'],
      notes: 'Get in, build engine, keep joints happy.',
      coachTip: 'Conditioning keeps advanced physiques looking athletic instead of soft.',
    }),
    REST_DAY,
  ];

  const beginner = [
    makeDay({
      type: 'Full Body',
      focus: 'Workout A',
      duration: 45,
      intensity: 'Moderate',
      warmup: ['Walk 5 min'],
      exercises: [ex('Squats', 3, '10', 60), ex('Push-ups', 3, '10', 45), ex('Rows', 3, '10', 60), ex('Plank', 3, '30s', 30)],
      cooldown: ['Stretch 5 min'],
      notes: 'Leave a couple reps in reserve and learn the patterns.',
      coachTip: 'Beginners progress fastest when form and consistency lead the process.',
    }),
    REST_DAY,
    makeDay({
      type: 'Full Body',
      focus: 'Workout B',
      duration: 45,
      intensity: 'Moderate',
      warmup: ['Walk 5 min'],
      exercises: [ex('Lunges', 3, '10 each', 60), ex('Shoulder Press', 3, '10', 60), ex('Deadlift', 3, '8', 75), ex('Leg Raises', 3, '15', 30)],
      cooldown: ['Stretch 5 min'],
      notes: 'Control the lowering phase and own the setup.',
      coachTip: 'Learning clean reps now pays off for years.',
    }),
    REST_DAY,
    makeDay({
      type: 'Full Body',
      focus: 'Workout A Repeat',
      duration: 45,
      intensity: 'Moderate',
      warmup: ['Walk 5 min'],
      exercises: [ex('Squats', 3, '10', 60), ex('Push-ups', 3, '10', 45), ex('Rows', 3, '10', 60), ex('Plank', 3, '30s', 30)],
      cooldown: ['Stretch 5 min'],
      notes: 'Aim to make one thing better than Monday.',
      coachTip: 'Repeating patterns weekly accelerates confidence and skill.',
    }),
    REST_DAY,
    REST_DAY,
  ];

  if (segment === 'Teen Foundation') return teen;
  if (segment === 'Campus Builder') return college;
  if (segment === 'Minimalist Professional') return professional;
  if (segment === 'Glute & Shape Sculpt') return femaleAesthetic;
  if (segment === 'Mass Builder') return hardGainer;
  if (segment === 'Recomp Starter') return overweightStarter;
  if (segment === 'Longevity Builder') return olderAdult;
  if (segment === 'Advanced Specialist') return advanced;
  if (experience === 'Beginner' && daysPerWeek <= 3) return beginner;

  const fallback = daysPerWeek >= 5
    ? [professional[0], professional[1], professional[2], REST_DAY, college[3], college[4], REST_DAY]
    : daysPerWeek === 3
      ? [beginner[0], REST_DAY, beginner[2], REST_DAY, beginner[4], REST_DAY, REST_DAY]
      : [college[0], college[1], REST_DAY, college[2], college[3], REST_DAY, REST_DAY];

  return fallback;
};

export const getProgramByProfile = (profile = {}) => {
  const insights = getProfileInsights(profile);
  const days = Number(profile.daysPerWeek) || 4;
  const weeklyTemplate = buildWeeklyTemplate(profile, insights);
  const trainingDays = weeklyTemplate.filter((day) => day.type !== 'Rest').length;

  const daysWithLabels = weeklyTemplate.map((day, index) => ({
    day: index + 1,
    label: WEEKDAYS[index],
    ...day,
  }));

  return {
    id: `custom_${days}d_${insights.segment.toLowerCase().replace(/\s+/g, '_')}`,
    name: `${profile.name || 'Athlete'}'s ${insights.segment} Plan`,
    goal: profile.goal || 'Aesthetic Physique',
    daysPerWeek: trainingDays,
    requestedDaysPerWeek: days,
    equipment: profile.equipment || 'Full Gym',
    segment: insights.segment,
    trainingBias: insights.trainingBias,
    priorities: insights.priorities,
    nutritionFocus: insights.nutritionFocus,
    recoveryFocus: insights.recoveryFocus,
    hydrationTarget: insights.hydrationTarget,
    description: `Research-based plan for ${insights.segment.toLowerCase()} with ${trainingDays} training days per week.`,
    days: daysWithLabels,
  };
};
