// ============================================================
// ACHIEVEMENTS & BADGES SYSTEM
// ============================================================
export const achievements = [
  { id: "first_workout", title: "First Rep", description: "Complete your first workout", icon: "🏋️", xp: 100, rarity: "common", condition: (stats) => stats.totalWorkouts >= 1 },
  { id: "streak_3", title: "On Fire", description: "3-day workout streak", icon: "🔥", xp: 150, rarity: "common", condition: (stats) => stats.currentStreak >= 3 },
  { id: "streak_7", title: "Week Warrior", description: "7-day workout streak", icon: "⚡", xp: 500, rarity: "rare", condition: (stats) => stats.currentStreak >= 7 },
  { id: "streak_30", title: "Unstoppable", description: "30-day workout streak", icon: "💎", xp: 2000, rarity: "legendary", condition: (stats) => stats.currentStreak >= 30 },
  { id: "workouts_10", title: "Dedicated", description: "Complete 10 workouts", icon: "💪", xp: 300, rarity: "common", condition: (stats) => stats.totalWorkouts >= 10 },
  { id: "workouts_50", title: "Iron Will", description: "Complete 50 workouts", icon: "🥇", xp: 1000, rarity: "epic", condition: (stats) => stats.totalWorkouts >= 50 },
  { id: "workouts_100", title: "Legend", description: "Complete 100 workouts", icon: "🏆", xp: 5000, rarity: "legendary", condition: (stats) => stats.totalWorkouts >= 100 },
  { id: "weight_logged", title: "Self-Aware", description: "Log your weight for the first time", icon: "⚖️", xp: 50, rarity: "common", condition: (stats) => stats.weightLogs >= 1 },
  { id: "photo_logged", title: "Transformation", description: "Upload your first progress photo", icon: "📸", xp: 100, rarity: "common", condition: (stats) => stats.photos >= 1 },
  { id: "calories_week", title: "Nutritionist", description: "Log calories every day for a week", icon: "🥗", xp: 400, rarity: "rare", condition: (stats) => stats.nutritionStreak >= 7 },
  { id: "weight_loss_5", title: "Lean Machine", description: "Lose 5kg from starting weight", icon: "📉", xp: 800, rarity: "epic", condition: (stats) => stats.weightLost >= 5 },
];

export const rarityColors = {
  common: "from-white/20 to-white/10 border-white/20",
  rare: "from-cyan-500/30 to-cyan-900/20 border-cyan-500/40",
  epic: "from-violet-500/30 to-violet-900/20 border-violet-500/40",
  legendary: "from-gold-500/30 to-amber-900/20 border-gold-500/50"
};

export const getLevelFromXP = (xp) => {
  const levels = [0, 100, 300, 600, 1000, 1500, 2200, 3000, 4000, 5500, 7500];
  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i]) return { level: i + 1, currentXP: xp - levels[i], requiredXP: (levels[i + 1] || levels[i] * 1.5) - levels[i] };
  }
  return { level: 1, currentXP: 0, requiredXP: 100 };
};
