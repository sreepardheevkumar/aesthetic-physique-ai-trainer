// ============================================================
// NUTRITION DATABASE
// Includes Indian and Global foods with macros
// ============================================================

export const foodDatabase = [
  // ---- INDIAN FOODS ----
  { id: "f001", name: "Dal (Masoor)", category: "Indian", serving: "1 bowl (200ml)", calories: 115, protein: 8, carbs: 18, fat: 1, fiber: 8 },
  { id: "f002", name: "Chapati / Roti (Wheat)", category: "Indian", serving: "1 piece (30g)", calories: 80, protein: 3, carbs: 15, fat: 1, fiber: 2 },
  { id: "f003", name: "Basmati Rice (cooked)", category: "Indian", serving: "1 cup (150g)", calories: 195, protein: 4, carbs: 43, fat: 0.5, fiber: 0.6 },
  { id: "f004", name: "Paneer (Cottage Cheese)", category: "Indian", serving: "100g", calories: 265, protein: 18, carbs: 1.2, fat: 20, fiber: 0 },
  { id: "f005", name: "Chicken Curry", category: "Indian", serving: "1 bowl (250g)", calories: 290, protein: 28, carbs: 8, fat: 16, fiber: 1 },
  { id: "f006", name: "Curd / Yogurt (full fat)", category: "Indian", serving: "1 cup (200g)", calories: 120, protein: 8, carbs: 9, fat: 5, fiber: 0 },
  { id: "f007", name: "Rajma (Kidney Beans)", category: "Indian", serving: "1 bowl (200g)", calories: 210, protein: 14, carbs: 35, fat: 1, fiber: 12 },
  { id: "f008", name: "Poha (Flattened Rice)", category: "Indian", serving: "1 plate (150g)", calories: 165, protein: 3, carbs: 35, fat: 2, fiber: 1.5 },
  { id: "f009", name: "Egg Bhurji (2 eggs)", category: "Indian", serving: "1 plate", calories: 210, protein: 16, carbs: 4, fat: 14, fiber: 0.5 },
  { id: "f010", name: "Sambar", category: "Indian", serving: "1 bowl (200ml)", calories: 95, protein: 5, carbs: 14, fat: 2, fiber: 4 },
  { id: "f011", name: "Idli", category: "Indian", serving: "2 pieces", calories: 150, protein: 5, carbs: 30, fat: 0.5, fiber: 2 },
  { id: "f012", name: "Dosa (Plain)", category: "Indian", serving: "1 large", calories: 165, protein: 4, carbs: 32, fat: 2, fiber: 1.5 },
  { id: "f013", name: "Moong Dal", category: "Indian", serving: "1 bowl (200ml)", calories: 100, protein: 7, carbs: 16, fat: 0.5, fiber: 7 },
  { id: "f014", name: "Boiled Egg", category: "Protein", serving: "1 large", calories: 78, protein: 6, carbs: 0.6, fat: 5, fiber: 0 },
  { id: "f015", name: "Aloo Sabzi (Potato Curry)", category: "Indian", serving: "1 bowl", calories: 150, protein: 3, carbs: 28, fat: 4, fiber: 3 },
  { id: "f016", name: "Palak Paneer", category: "Indian", serving: "1 bowl (200g)", calories: 270, protein: 14, carbs: 10, fat: 18, fiber: 3 },
  { id: "f017", name: "Chhole (Chickpea Curry)", category: "Indian", serving: "1 bowl (200g)", calories: 220, protein: 12, carbs: 32, fat: 5, fiber: 10 },
  { id: "f018", name: "Tandoori Chicken", category: "Indian", serving: "200g", calories: 260, protein: 40, carbs: 5, fat: 9, fiber: 0 },
  { id: "f019", name: "Fish Curry", category: "Indian", serving: "1 bowl (200g)", calories: 220, protein: 30, carbs: 5, fat: 9, fiber: 0 },
  { id: "f020", name: "Upma", category: "Indian", serving: "1 plate (200g)", calories: 190, protein: 5, carbs: 32, fat: 5, fiber: 3 },

  // ---- GLOBAL FOODS ----
  { id: "f021", name: "Chicken Breast (grilled)", category: "Protein", serving: "100g", calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0 },
  { id: "f022", name: "Oats (dry)", category: "Carbs", serving: "50g", calories: 190, protein: 7, carbs: 34, fat: 3, fiber: 5 },
  { id: "f023", name: "Banana", category: "Fruit", serving: "1 medium", calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6 },
  { id: "f024", name: "Sweet Potato (boiled)", category: "Carbs", serving: "100g", calories: 86, protein: 1.6, carbs: 20, fat: 0.1, fiber: 3 },
  { id: "f025", name: "Whole Milk", category: "Dairy", serving: "200ml", calories: 122, protein: 6, carbs: 9, fat: 7, fiber: 0 },
  { id: "f026", name: "Peanut Butter", category: "Fats", serving: "1 tbsp (16g)", calories: 94, protein: 4, carbs: 3, fat: 8, fiber: 1 },
  { id: "f027", name: "Almonds", category: "Nuts", serving: "30g (23 nuts)", calories: 174, protein: 6, carbs: 6, fat: 15, fiber: 3.5 },
  { id: "f028", name: "Brown Rice (cooked)", category: "Carbs", serving: "1 cup (195g)", calories: 215, protein: 5, carbs: 45, fat: 1.8, fiber: 3.5 },
  { id: "f029", name: "Tuna (canned in water)", category: "Protein", serving: "100g", calories: 116, protein: 26, carbs: 0, fat: 1, fiber: 0 },
  { id: "f030", name: "Whey Protein Shake", category: "Supplement", serving: "1 scoop (30g)", calories: 120, protein: 24, carbs: 3, fat: 2, fiber: 0 },
  { id: "f031", name: "Greek Yogurt (0% fat)", category: "Dairy", serving: "150g", calories: 90, protein: 15, carbs: 6, fat: 0.5, fiber: 0 },
  { id: "f032", name: "Broccoli (steamed)", category: "Vegetables", serving: "100g", calories: 35, protein: 2.4, carbs: 7, fat: 0.4, fiber: 2.6 },
  { id: "f033", name: "Avocado", category: "Fats", serving: "1/2 medium (75g)", calories: 120, protein: 1.5, carbs: 6, fat: 11, fiber: 5 },
  { id: "f034", name: "Salmon (baked)", category: "Protein", serving: "100g", calories: 208, protein: 20, carbs: 0, fat: 13, fiber: 0 },
  { id: "f035", name: "Whole Wheat Bread", category: "Carbs", serving: "1 slice (30g)", calories: 80, protein: 4, carbs: 14, fat: 1, fiber: 2 },
];

export const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snacks", "Pre-Workout", "Post-Workout"];

export const searchFoods = (query) => {
  const q = query.toLowerCase().trim();
  if (!q) return foodDatabase;
  return foodDatabase.filter(f => f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q));
};
