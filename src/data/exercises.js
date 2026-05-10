export const exercises = [
  {
    id: "ex_chest_001",
    name: "Barbell Bench Press",
    muscleGroup: "Chest",
    equipment: ["Barbell"],
    difficulty: "Intermediate",
    gifUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=400&h=300",
    videoUrl: "",
    thumbnailUrl: "",
    instructions: [
      "Lie back on a flat bench.",
      "Grip the bar with hands slightly wider than shoulder-width.",
      "Lower the bar to your mid-chest.",
      "Press the bar back up until your arms are straight."
    ],
    commonMistakes: ["Bouncing the bar off the chest", "Not keeping back tight", "Elbows flared out too much"],
    tips: ["Squeeze shoulder blades together", "Keep feet planted firmly on the ground"],
    targetMuscles: ["Pectoralis Major"],
    secondaryMuscles: ["Triceps", "Anterior Deltoid"],
    caloriesPerMin: 6,
    alternativeExercises: ["Dumbbell Bench Press", "Push-ups"]
  },
  {
    id: "ex_back_001",
    name: "Pull-ups",
    muscleGroup: "Back",
    equipment: ["No Equipment", "Pull-up Bar"],
    difficulty: "Advanced",
    gifUrl: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&q=80&w=400&h=300",
    instructions: [
      "Grab the pull-up bar with an overhand grip, hands slightly wider than shoulder-width.",
      "Hang with your arms fully extended.",
      "Pull yourself up until your chin clears the bar.",
      "Lower yourself back down with control."
    ],
    commonMistakes: ["Using momentum (kipping) when not intended", "Not going through full range of motion"],
    tips: ["Initiate the movement by pulling your shoulder blades down and back"],
    targetMuscles: ["Latissimus Dorsi"],
    secondaryMuscles: ["Biceps", "Rhomboids", "Core"],
    caloriesPerMin: 8,
    alternativeExercises: ["Lat Pulldown", "Inverted Row"]
  },
  {
    id: "ex_legs_001",
    name: "Barbell Squat",
    muscleGroup: "Legs",
    equipment: ["Barbell"],
    difficulty: "Intermediate",
    gifUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=400&h=300",
    instructions: [
      "Rest the barbell on your upper back/traps.",
      "Stand with feet shoulder-width apart.",
      "Lower your body by bending your knees and pushing your hips back.",
      "Keep your chest up and back straight.",
      "Push back up to the starting position."
    ],
    commonMistakes: ["Knees caving in", "Heels lifting off the floor", "Rounding the lower back"],
    tips: ["Drive through your mid-foot/heels", "Brace your core before descending"],
    targetMuscles: ["Quadriceps", "Glutes"],
    secondaryMuscles: ["Hamstrings", "Core", "Lower Back"],
    caloriesPerMin: 8,
    alternativeExercises: ["Goblet Squat", "Leg Press"]
  },
  {
    id: "ex_core_001",
    name: "Plank",
    muscleGroup: "Core",
    equipment: ["No Equipment"],
    difficulty: "Beginner",
    gifUrl: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&q=80&w=400&h=300",
    instructions: [
      "Start in a push-up position but rest on your forearms instead of your hands.",
      "Keep your body in a straight line from head to heels.",
      "Engage your core and hold the position."
    ],
    commonMistakes: ["Hips sagging", "Hips too high", "Looking up and straining the neck"],
    tips: ["Squeeze your glutes", "Breathe normally throughout the hold"],
    targetMuscles: ["Rectus Abdominis", "Transverse Abdominis"],
    secondaryMuscles: ["Shoulders", "Glutes"],
    caloriesPerMin: 4,
    alternativeExercises: ["Dead Bug", "Ab Wheel Rollout"]
  }
];

export const getExercisesByGroup = (group) => {
  return exercises.filter(ex => ex.muscleGroup.toLowerCase() === group.toLowerCase());
};

export const getExercisesByEquipment = (equipList) => {
  return exercises.filter(ex => ex.equipment.some(e => equipList.includes(e)));
};
