// ============================================================
// WORKOUT PROGRAMS DATABASE
// 7-Day program templates tailored by goal, equipment, gender
// ============================================================

export const workoutPrograms = {
  aesthetic_gym: {
    id: "aesthetic_gym",
    name: "Aesthetic Physique — Gym",
    goal: "Aesthetic Physique",
    equipment: "Full Gym",
    level: "Intermediate",
    description: "Classic Push/Pull/Legs split for maximum aesthetic development",
    days: [
      {
        day: 1, label: "Monday", type: "Push", focus: "Chest & Shoulders",
        duration: 60, intensity: "High",
        warmup: ["5 min treadmill walk", "Arm circles 30s", "Band pull-aparts 2x15"],
        exercises: [
          { name: "Barbell Bench Press", sets: 4, reps: "8-10", rest: 90, rir: 2, notes: "Control the descent" },
          { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", rest: 75, rir: 2 },
          { name: "Cable Chest Fly", sets: 3, reps: "12-15", rest: 60, rir: 1 },
          { name: "Overhead Press", sets: 4, reps: "8-10", rest: 90, rir: 2 },
          { name: "Lateral Raises", sets: 4, reps: "15-20", rest: 45, rir: 0 },
          { name: "Tricep Rope Pushdown", sets: 3, reps: "12-15", rest: 60, rir: 1 },
        ],
        cooldown: ["Chest stretch 30s each side", "Shoulder cross-body stretch 30s each", "Childs pose 60s"]
      },
      {
        day: 2, label: "Tuesday", type: "Pull", focus: "Back & Biceps",
        duration: 60, intensity: "High",
        warmup: ["5 min bike", "Cat-cow 10 reps", "Band face pulls 2x15"],
        exercises: [
          { name: "Pull-ups", sets: 4, reps: "6-10", rest: 90, rir: 2, notes: "Full ROM — dead hang to chin above bar" },
          { name: "Barbell Row", sets: 4, reps: "8-10", rest: 90, rir: 2 },
          { name: "Seated Cable Row", sets: 3, reps: "10-12", rest: 75, rir: 2 },
          { name: "Face Pulls", sets: 3, reps: "15-20", rest: 60, rir: 1 },
          { name: "Barbell Curl", sets: 3, reps: "10-12", rest: 75, rir: 1 },
          { name: "Hammer Curls", sets: 3, reps: "12-15", rest: 60, rir: 1 },
        ],
        cooldown: ["Lat stretch doorway 30s each", "Bicep wall stretch 30s each", "Thoracic rotation 10 reps each"]
      },
      {
        day: 3, label: "Wednesday", type: "Legs", focus: "Quads & Glutes",
        duration: 70, intensity: "Very High",
        warmup: ["5 min walk incline", "Leg swings 15 each", "Glute bridges 2x15", "Bodyweight squat 2x10"],
        exercises: [
          { name: "Barbell Squat", sets: 4, reps: "6-10", rest: 120, rir: 2, notes: "Break parallel, drive through heels" },
          { name: "Romanian Deadlift", sets: 3, reps: "10-12", rest: 90, rir: 2 },
          { name: "Leg Press", sets: 3, reps: "12-15", rest: 75, rir: 1 },
          { name: "Leg Extension", sets: 3, reps: "15-20", rest: 60, rir: 0 },
          { name: "Leg Curl", sets: 3, reps: "12-15", rest: 60, rir: 1 },
          { name: "Calf Raises", sets: 4, reps: "20-25", rest: 45, rir: 0 },
        ],
        cooldown: ["Hip flexor stretch 60s each", "Hamstring stretch 45s each", "Pigeon pose 60s each"]
      },
      {
        day: 4, label: "Thursday", type: "Rest", focus: "Active Recovery",
        duration: 30, intensity: "Low",
        warmup: [],
        exercises: [],
        cooldown: [],
        notes: "Light walking, stretching, or yoga. Focus on sleep and nutrition."
      },
      {
        day: 5, label: "Friday", type: "Upper", focus: "Chest, Back & Arms",
        duration: 65, intensity: "High",
        warmup: ["5 min row machine", "Band pull-aparts 2x15", "Arm swings 30s"],
        exercises: [
          { name: "Incline Barbell Press", sets: 4, reps: "8-10", rest: 90, rir: 2 },
          { name: "Weighted Pull-ups", sets: 4, reps: "6-8", rest: 90, rir: 2 },
          { name: "Dumbbell Shoulder Press", sets: 3, reps: "10-12", rest: 75, rir: 2 },
          { name: "Cable Row", sets: 3, reps: "12-15", rest: 60, rir: 1 },
          { name: "Incline Dumbbell Curl", sets: 3, reps: "10-12", rest: 60, rir: 1 },
          { name: "Skull Crushers", sets: 3, reps: "10-12", rest: 60, rir: 1 },
        ],
        cooldown: ["Full body stretch sequence 10 min"]
      },
      {
        day: 6, label: "Saturday", type: "Lower", focus: "Hamstrings & Glutes",
        duration: 55, intensity: "High",
        warmup: ["5 min bike", "Glute bridges 2x20", "Hip circles 10 each"],
        exercises: [
          { name: "Deadlift", sets: 4, reps: "5-6", rest: 120, rir: 3, notes: "Focus on hip hinge, keep bar close" },
          { name: "Bulgarian Split Squat", sets: 3, reps: "10-12 each", rest: 90, rir: 2 },
          { name: "Hip Thrust", sets: 4, reps: "12-15", rest: 75, rir: 1 },
          { name: "Lying Leg Curl", sets: 3, reps: "12-15", rest: 60, rir: 1 },
          { name: "Plank", sets: 3, reps: "60s", rest: 45, rir: 0 },
          { name: "Ab Wheel Rollout", sets: 3, reps: "10-12", rest: 60, rir: 1 },
        ],
        cooldown: ["Hamstring stretch 60s each", "Pigeon pose 60s each", "Child's pose 60s"]
      },
      {
        day: 7, label: "Sunday", type: "Rest", focus: "Full Rest",
        duration: 0, intensity: "None",
        warmup: [],
        exercises: [],
        cooldown: [],
        notes: "Complete rest day. Prioritize 8h sleep, high protein intake, and hydration."
      }
    ]
  },

  fat_loss_home: {
    id: "fat_loss_home",
    name: "Fat Loss — Home Bodyweight",
    goal: "Fat Loss",
    equipment: "No Equipment",
    level: "Beginner",
    description: "High-intensity bodyweight circuit for maximum fat burn at home",
    days: [
      {
        day: 1, label: "Monday", type: "Full Body", focus: "Upper + Core",
        duration: 40, intensity: "High",
        warmup: ["Jumping jacks 60s", "High knees 30s", "Arm circles 30s"],
        exercises: [
          { name: "Push-ups", sets: 4, reps: "12-15", rest: 60, notes: "Keep core tight throughout" },
          { name: "Pike Push-ups", sets: 3, reps: "10-12", rest: 60 },
          { name: "Tricep Dips (Chair)", sets: 3, reps: "12-15", rest: 60 },
          { name: "Plank", sets: 3, reps: "45s", rest: 30 },
          { name: "Mountain Climbers", sets: 3, reps: "30s", rest: 30 },
          { name: "Burpees", sets: 3, reps: "10", rest: 60 },
        ],
        cooldown: ["Chest stretch 30s each", "Tricep stretch 30s each", "Child's pose 60s"]
      },
      {
        day: 2, label: "Tuesday", type: "Cardio", focus: "LISS Cardio",
        duration: 35, intensity: "Moderate",
        warmup: [],
        exercises: [
          { name: "Brisk Walking / Jogging", sets: 1, reps: "30 min", rest: 0, notes: "Stay at conversational pace" }
        ],
        cooldown: ["Full body stretch 5 min"]
      },
      {
        day: 3, label: "Wednesday", type: "Full Body", focus: "Legs + Glutes",
        duration: 40, intensity: "High",
        warmup: ["Leg swings 15 each", "Hip circles 10 each", "Bodyweight squat 10"],
        exercises: [
          { name: "Bodyweight Squat", sets: 4, reps: "20", rest: 60 },
          { name: "Jump Squats", sets: 3, reps: "15", rest: 60 },
          { name: "Glute Bridge", sets: 4, reps: "20", rest: 45 },
          { name: "Reverse Lunges", sets: 3, reps: "12 each leg", rest: 60 },
          { name: "Wall Sit", sets: 3, reps: "45s", rest: 45 },
          { name: "Calf Raises (Bodyweight)", sets: 3, reps: "25", rest: 30 },
        ],
        cooldown: ["Hip flexor stretch 45s each", "Hamstring stretch 45s each", "Glute stretch 45s each"]
      },
      {
        day: 4, label: "Thursday", type: "Rest", focus: "Rest & Recover",
        duration: 0, intensity: "None",
        warmup: [], exercises: [], cooldown: [],
        notes: "Full rest or gentle yoga."
      },
      {
        day: 5, label: "Friday", type: "Full Body", focus: "HIIT Circuit",
        duration: 35, intensity: "Very High",
        warmup: ["Jumping jacks 60s", "Arm swings 30s", "High knees 30s"],
        exercises: [
          { name: "Burpees", sets: 4, reps: "10", rest: 30 },
          { name: "Jump Squats", sets: 4, reps: "15", rest: 30 },
          { name: "Push-ups", sets: 4, reps: "12", rest: 30 },
          { name: "Mountain Climbers", sets: 4, reps: "30s", rest: 30 },
          { name: "High Knees", sets: 4, reps: "30s", rest: 30 },
        ],
        cooldown: ["Full body stretch 10 min"]
      },
      {
        day: 6, label: "Saturday", type: "Full Body", focus: "Core & Mobility",
        duration: 30, intensity: "Low",
        warmup: ["Cat-cow 10", "Bird dog 10 each"],
        exercises: [
          { name: "Plank", sets: 3, reps: "60s", rest: 30 },
          { name: "Bicycle Crunches", sets: 3, reps: "20", rest: 30 },
          { name: "Leg Raises", sets: 3, reps: "15", rest: 30 },
          { name: "Superman Hold", sets: 3, reps: "12", rest: 30 },
          { name: "Dead Bug", sets: 3, reps: "10 each", rest: 30 },
        ],
        cooldown: ["Full body stretch 10 min"]
      },
      {
        day: 7, label: "Sunday", type: "Rest", focus: "Full Rest",
        duration: 0, intensity: "None",
        warmup: [], exercises: [], cooldown: [],
        notes: "Complete rest. Walk if you feel like it."
      }
    ]
  }
};

export const getProgramByProfile = (profile) => {
  const { goal, equipment } = profile;
  if (!goal || !equipment) return workoutPrograms.aesthetic_gym;
  if (equipment === 'No Equipment' || equipment === 'Dumbbells Only') return workoutPrograms.fat_loss_home;
  return workoutPrograms.aesthetic_gym;
};
