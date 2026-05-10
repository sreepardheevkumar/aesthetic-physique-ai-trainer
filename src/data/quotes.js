export const motivationalQuotes = [
  { text: "Discipline equals freedom. The workout you skip today is the progress you lose tomorrow.", author: "Coach APhysique" },
  { text: "Your body can do it. It's your mind you need to convince.", author: "Coach APhysique" },
  { text: "Every rep is a vote for the person you want to become.", author: "Coach APhysique" },
  { text: "The pain of discipline is far less than the pain of regret.", author: "Bob Andrews" },
  { text: "Strength doesn't come from what you can do. It comes from overcoming what you thought you couldn't.", author: "Rikki Rogers" },
  { text: "You don't have to be extreme. Just consistent.", author: "Coach APhysique" },
  { text: "The only bad workout is the one that didn't happen.", author: "Coach APhysique" },
  { text: "Don't count the days. Make the days count.", author: "Muhammad Ali" },
  { text: "If it doesn't challenge you, it doesn't change you.", author: "Fred DeVito" },
  { text: "Push yourself because no one else is going to do it for you.", author: "Coach APhysique" },
  { text: "Wake up with determination. Go to bed with satisfaction.", author: "Coach APhysique" },
  { text: "Sweat today, shine tomorrow.", author: "Coach APhysique" },
  { text: "One year from now, you'll wish you had started today.", author: "Coach APhysique" },
  { text: "Success isn't given. It's earned in the gym, on the track, and in the kitchen.", author: "Coach APhysique" },
  { text: "You are your only limit.", author: "Coach APhysique" },
];

export const coachMessages = [
  { condition: "morning", message: "Morning, champion! Your muscles are fresh and ready. Today's session will build the version of you that you're working towards. Let's go! 💪" },
  { condition: "streak_active", message: "You're on a streak! Every day you show up, you're proving to yourself that you are someone who doesn't quit. Keep that identity strong! 🔥" },
  { condition: "post_workout", message: "Excellent session! Your muscles are broken down and ready to rebuild stronger. Now focus on protein and sleep — that's where the gains actually happen." },
  { condition: "missed_day", message: "Yesterday's skip doesn't define you. What you do TODAY does. Get back on track and let's go — one workout at a time." },
  { condition: "rest_day", message: "Rest is not weakness. Your muscles grow during recovery, not during training. Eat well, sleep 8 hours, and come back stronger tomorrow." },
  { condition: "default", message: "Consistency is the one thing that separates the people who transform their bodies from the people who just wish they had. Show up today." },
];

export const getDailyQuote = () => {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return motivationalQuotes[dayOfYear % motivationalQuotes.length];
};
