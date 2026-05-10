// ============================================================
// CALCULATORS: BMI, BMR, TDEE, Macros
// ============================================================

/**
 * Calculate BMI
 * @param {number} weightKg
 * @param {number} heightCm
 */
export const calculateBMI = (weightKg, heightCm) => {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  let category = '';
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 25) category = 'Normal';
  else if (bmi < 30) category = 'Overweight';
  else category = 'Obese';
  return { bmi: parseFloat(bmi.toFixed(1)), category };
};

/**
 * Calculate BMR using Mifflin-St Jeor Equation
 * @param {number} weightKg
 * @param {number} heightCm
 * @param {number} ageYears
 * @param {'Male'|'Female'} gender
 */
export const calculateBMR = (weightKg, heightCm, ageYears, gender) => {
  let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * ageYears);
  bmr += gender === 'Male' ? 5 : -161;
  return Math.round(bmr);
};

/**
 * Activity multipliers for TDEE
 */
export const activityLevels = {
  sedentary: { label: 'Sedentary (desk job, no exercise)', multiplier: 1.2 },
  light: { label: 'Light (1-3 days/week exercise)', multiplier: 1.375 },
  moderate: { label: 'Moderate (3-5 days/week exercise)', multiplier: 1.55 },
  active: { label: 'Active (6-7 days/week exercise)', multiplier: 1.725 },
  very_active: { label: 'Very Active (physical job + training)', multiplier: 1.9 },
};

/**
 * Calculate TDEE
 */
export const calculateTDEE = (bmr, activityLevel = 'moderate') => {
  const multiplier = activityLevels[activityLevel]?.multiplier || 1.55;
  return Math.round(bmr * multiplier);
};

/**
 * Calculate daily calorie targets and macros based on goal
 * @param {number} tdee
 * @param {'Fat Loss'|'Lean Muscle'|'Aesthetic Physique'|'Strength'} goal
 * @param {number} weightKg
 */
export const calculateMacros = (tdee, goal, weightKg) => {
  let targetCalories = tdee;
  let proteinMultiplier = 2.0; // g per kg bodyweight
  let fatPercent = 0.25;

  switch (goal) {
    case 'Fat Loss':
      targetCalories = tdee - 400; // moderate deficit
      proteinMultiplier = 2.2;
      fatPercent = 0.25;
      break;
    case 'Lean Muscle':
    case 'Aesthetic Physique':
      targetCalories = tdee + 150; // lean bulk
      proteinMultiplier = 2.0;
      fatPercent = 0.28;
      break;
    case 'Strength':
      targetCalories = tdee + 300;
      proteinMultiplier = 1.8;
      fatPercent = 0.30;
      break;
    default:
      targetCalories = tdee;
      proteinMultiplier = 2.0;
      fatPercent = 0.25;
  }

  const protein = Math.round(weightKg * proteinMultiplier); // grams
  const fat = Math.round((targetCalories * fatPercent) / 9); // grams
  const carbs = Math.round((targetCalories - protein * 4 - fat * 9) / 4); // grams

  return {
    calories: Math.max(targetCalories, 1200),
    protein: Math.max(protein, 50),
    fat: Math.max(fat, 30),
    carbs: Math.max(carbs, 50),
    deficit: tdee - targetCalories
  };
};
