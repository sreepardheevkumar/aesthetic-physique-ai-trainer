import { calculateBMI } from './calculators';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const getActivityLevelFromProfile = (profile = {}) => {
  if (profile.activityLevel) return profile.activityLevel;

  const days = Number(profile.daysPerWeek) || 0;
  const lifestyle = profile.lifestyle;

  if (lifestyle === 'Busy Professional') return days >= 4 ? 'moderate' : 'light';
  if (lifestyle === 'Teen Student' || lifestyle === 'College Student') return days >= 5 ? 'active' : 'moderate';
  if (lifestyle === '40+ Adult') return days >= 4 ? 'moderate' : 'light';
  if (days >= 6) return 'active';
  if (days >= 4) return 'moderate';
  if (days >= 2) return 'light';
  return 'sedentary';
};

export const getHydrationTarget = (profile = {}) => {
  const weight = Number(profile.weight) || 70;
  const base = weight * 35;
  const daysBonus = (Number(profile.daysPerWeek) || 3) * 150;
  return clamp(Math.round(base + daysBonus), 2200, 4200);
};

export const getProfileInsights = (profile = {}) => {
  const age = Number(profile.age) || 0;
  const weight = Number(profile.weight) || 0;
  const height = Number(profile.height) || 0;
  const goal = profile.goal || 'Aesthetic Physique';
  const experience = profile.experience || 'Beginner';
  const lifestyle = profile.lifestyle || 'General Adult';
  const bodyType = profile.bodyType || 'Balanced';
  const equipment = profile.equipment || 'Full Gym';
  const gender = profile.gender || 'Male';
  const bmiData = weight && height ? calculateBMI(weight, height) : null;

  const segment =
    lifestyle === 'Teen Student' ? 'Teen Foundation' :
    lifestyle === 'College Student' ? 'Campus Builder' :
    lifestyle === 'Busy Professional' ? 'Minimalist Professional' :
    lifestyle === '40+ Adult' || age >= 40 ? 'Longevity Builder' :
    bodyType === 'Lean / Hard Gainer' ? 'Mass Builder' :
    bodyType === 'Overweight / Fat Loss Focus' ? 'Recomp Starter' :
    gender === 'Female' && goal === 'Aesthetic Physique' ? 'Glute & Shape Sculpt' :
    gender === 'Male' && goal === 'Aesthetic Physique' ? 'V-Taper Sculpt' :
    experience === 'Advanced' ? 'Advanced Specialist' :
    experience === 'Intermediate' ? 'Symmetry Builder' :
    equipment === 'No Equipment' ? 'Bodyweight Sculpt' :
    'Balanced Aesthetic';

  const trainingBias =
    segment === 'Teen Foundation' ? 'athletic base, posture, and consistency' :
    segment === 'Campus Builder' ? 'lean muscle and confident structure' :
    segment === 'Minimalist Professional' ? 'time-efficient compound training' :
    segment === 'Longevity Builder' ? 'joint-friendly strength and mobility' :
    segment === 'Mass Builder' ? 'compound lifts, progressive overload, and recovery' :
    segment === 'Recomp Starter' ? 'fat loss with muscle retention' :
    segment === 'Glute & Shape Sculpt' ? 'glute development, shoulders, and core control' :
    segment === 'V-Taper Sculpt' ? 'upper chest, delts, lats, and waist control' :
    segment === 'Advanced Specialist' ? 'weak-point focus and volume cycling' :
    segment === 'Symmetry Builder' ? 'balanced weekly volume and aesthetics' :
    segment === 'Bodyweight Sculpt' ? 'bodyweight progression and conditioning' :
    'balanced physique development';

  const priorities =
    segment === 'Teen Foundation' ? ['Form first', '3-4 training days', 'Mobility + sports'] :
    segment === 'Campus Builder' ? ['4-5 hard sessions', 'Progressive overload', 'Sleep 7-8 hours'] :
    segment === 'Minimalist Professional' ? ['30-45 minute workouts', 'Supersets', 'Posture recovery'] :
    segment === 'Longevity Builder' ? ['Joint-friendly range', 'Walking', 'Consistency over intensity'] :
    segment === 'Mass Builder' ? ['Calorie surplus', 'Heavy compounds', 'Limit extra cardio'] :
    segment === 'Recomp Starter' ? ['Daily walking', 'Resistance training', 'Sustainable deficit'] :
    segment === 'Glute & Shape Sculpt' ? ['Glutes', 'Hamstrings', 'Waist definition'] :
    segment === 'V-Taper Sculpt' ? ['Delts', 'Upper chest', 'Lats'] :
    segment === 'Advanced Specialist' ? ['Specialization blocks', 'Deload weeks', 'Conditioning'] :
    segment === 'Symmetry Builder' ? ['10-20 sets / muscle / week', 'Symmetry', 'Recovery'] :
    segment === 'Bodyweight Sculpt' ? ['Push/pull balance', 'Core control', 'HIIT conditioning'] :
    ['Consistency', 'Recovery', 'Technique'];

  const nutritionFocus =
    segment === 'Mass Builder' ? ['Rice, oats, eggs, milk', 'Peanut butter and bananas', 'Protein at every meal'] :
    segment === 'Recomp Starter' ? ['Protein priority', 'Fiber-rich meals', 'Reduce sugary drinks'] :
    segment === 'Teen Foundation' ? ['Milk, eggs, oats, rice', 'Hydrate well', 'Avoid extreme dieting'] :
    segment === 'Campus Builder' ? ['Protein target daily', 'Simple meal prep', 'Sleep supports recovery'] :
    ['High protein meals', 'Whole-food carbs', 'Healthy fats and hydration'];

  const recoveryFocus =
    segment === 'Minimalist Professional' ? ['Walk after meals', 'Desk stretches', 'Protect sleep window'] :
    segment === 'Longevity Builder' ? ['Mobility every session', 'Joint-friendly tempo', 'Two recovery days'] :
    segment === 'Advanced Specialist' ? ['Deload planning', 'Manage fatigue', 'Track performance drop-offs'] :
    ['Sleep 7-8 hours', 'Mobility work', 'Stay consistent'];

  return {
    age,
    bmiData,
    segment,
    trainingBias,
    priorities,
    nutritionFocus,
    recoveryFocus,
    activityLevel: getActivityLevelFromProfile(profile),
    hydrationTarget: getHydrationTarget(profile),
  };
};

