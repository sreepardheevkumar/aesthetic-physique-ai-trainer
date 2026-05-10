import React, { useState } from 'react';
import { Plus, Search, X } from 'lucide-react';
import { useIndexedDB } from '../hooks/useIndexedDB';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MacroRing, WaterTracker } from '../components/nutrition/NutritionComponents';
import { foodDatabase, mealTypes, searchFoods } from '../data/nutritionData';
import { calculateBMR, calculateTDEE, calculateMacros } from '../utils/calculators';
import { useAppContext } from '../context/AppContext';

export default function Nutrition() {
  const { userProfile } = useAppContext();
  const today = new Date().toISOString().split('T')[0];
  const { data: todayLog, putData: saveTodayLog } = useIndexedDB('nutritionLogs', today);

  const [water, setWater] = useState(todayLog?.water || 0);
  const [meals, setMeals] = useState(todayLog?.meals || { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] });
  const [searchModal, setSearchModal] = useState(null); // which meal is open
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customFood, setCustomFood] = useState({ name: '', calories: '', protein: '', carbs: '', fat: '' });

  const bmr = userProfile?.age ? calculateBMR(Number(userProfile.weight), Number(userProfile.height), Number(userProfile.age), userProfile.gender) : 2000;
  const tdee = calculateTDEE(bmr, userProfile?.activityLevel || 'moderate');
  const targets = calculateMacros(tdee, userProfile?.goal || 'Aesthetic Physique', Number(userProfile?.weight || 70));

  const allFoods = Object.values(meals).flat();
  const consumed = {
    protein: Math.round(allFoods.reduce((s, f) => s + f.protein, 0)),
    carbs: Math.round(allFoods.reduce((s, f) => s + f.carbs, 0)),
    fat: Math.round(allFoods.reduce((s, f) => s + f.fat, 0)),
  };

  const addFood = async (mealType, food) => {
    const updated = { ...meals, [mealType]: [...(meals[mealType] || []), food] };
    setMeals(updated);
    await saveTodayLog({ date: today, meals: updated, water });
    setSearchModal(null);
    setSearchQuery('');
    setIsAddingCustom(false);
    setCustomFood({ name: '', calories: '', protein: '', carbs: '', fat: '' });
  };

  const handleAddCustomFood = async () => {
    if (!customFood.name || !customFood.calories) return;
    const food = {
      id: Date.now().toString(),
      name: customFood.name,
      serving: 'Custom Entry',
      category: 'Custom',
      calories: Number(customFood.calories),
      protein: Number(customFood.protein) || 0,
      carbs: Number(customFood.carbs) || 0,
      fat: Number(customFood.fat) || 0,
    };
    await addFood(searchModal, food);
  };

  const addWater = async (ml) => {
    const newWater = water + ml;
    setWater(newWater);
    await saveTodayLog({ date: today, meals, water: newWater });
  };

  const results = searchFoods(searchQuery);

  return (
    <div className="page-container pt-8">
      <h1 className="text-2xl font-display font-bold mb-6">Nutrition</h1>

      {/* Macro Ring */}
      <Card variant="dark" className="!p-6 mb-6 flex flex-col items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-cyan-600/5" />
        <MacroRing consumed={consumed} target={targets} />
      </Card>

      {/* Water */}
      <Card variant="glass" className="!p-4 mb-6">
        <h3 className="text-sm font-semibold mb-4">💧 Hydration</h3>
        <WaterTracker current={water} target={3000} onAdd={addWater} />
      </Card>

      {/* Meals */}
      <h2 className="section-header">Today's Meals</h2>
      <div className="space-y-4 mb-8">
        {mealTypes.slice(0, 4).map(mealType => {
          const mealFoods = meals[mealType] || [];
          const mealCals = Math.round(mealFoods.reduce((s, f) => s + f.calories, 0));
          return (
            <Card key={mealType} variant="glass" className="!p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-sm">{mealType}</h4>
                <div className="flex items-center gap-3">
                  {mealCals > 0 && <span className="text-xs text-white/40">{mealCals} kcal</span>}
                  <button onClick={() => setSearchModal(mealType)}
                    className="w-7 h-7 rounded-full bg-violet-600/30 text-violet-400 flex items-center justify-center hover:bg-violet-600/50 transition-colors">
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              {mealFoods.length === 0
                ? <p className="text-xs text-white/30 text-center py-2">No foods logged yet</p>
                : mealFoods.map((f, i) => (
                    <div key={i} className="flex justify-between items-center py-1.5 border-t border-white/5">
                      <span className="text-xs text-white/80">{f.name}</span>
                      <div className="flex gap-3 text-[10px] text-white/40">
                        <span>{f.protein}g P</span>
                        <span>{f.calories} kcal</span>
                      </div>
                    </div>
                  ))
              }
            </Card>
          );
        })}
      </div>

      {/* Food Search Modal */}
      {searchModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex flex-end" onClick={() => { setSearchModal(null); setIsAddingCustom(false); }}>
          <div className="absolute bottom-0 left-0 right-0 bg-dark-800 rounded-t-3xl max-h-[80vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h3 className="font-bold">{isAddingCustom ? 'Add Custom Food' : `Add to ${searchModal}`}</h3>
              <button onClick={() => { setSearchModal(null); setIsAddingCustom(false); }}><X size={20} className="text-white/50" /></button>
            </div>
            {!isAddingCustom ? (
              <>
                <div className="p-4 border-b border-white/5">
                  <div className="flex gap-2 glass rounded-xl px-3 py-2">
                    <Search size={16} className="text-white/40 flex-shrink-0 mt-0.5" />
                    <input autoFocus className="flex-1 bg-transparent text-sm placeholder-white/30 outline-none"
                      placeholder="Search foods (dal, chicken, oats...)"
                      value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                  </div>
                </div>
                <div className="overflow-y-auto flex-1 p-4 space-y-3">
                  <Button variant="glass" className="w-full text-xs py-2.5 mb-2 border-dashed border-white/20" onClick={() => setIsAddingCustom(true)}>
                    + Add Custom Food
                  </Button>
                  {results.map(food => (
                    <div key={food.id} onClick={() => addFood(searchModal, food)}
                      className="flex justify-between items-center p-3 glass rounded-xl cursor-pointer hover:bg-violet-600/10 transition-colors active:scale-98">
                      <div>
                        <p className="text-sm font-medium">{food.name}</p>
                        <p className="text-[10px] text-white/40">{food.serving} · {food.category}</p>
                      </div>
                      <div className="text-right text-xs">
                        <p className="text-white font-bold">{food.calories} kcal</p>
                        <p className="text-white/40">{food.protein}g protein</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="p-5 space-y-4 flex-1 overflow-y-auto">
                <div>
                  <label className="text-xs text-white/50 mb-1.5 block">Food Name *</label>
                  <input className="input-field" placeholder="e.g. Homemade Chicken Curry" 
                    value={customFood.name} onChange={e => setCustomFood({...customFood, name: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/50 mb-1.5 block">Calories (kcal) *</label>
                    <input type="number" className="input-field" placeholder="0" 
                      value={customFood.calories} onChange={e => setCustomFood({...customFood, calories: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 mb-1.5 block">Protein (g)</label>
                    <input type="number" className="input-field" placeholder="0" 
                      value={customFood.protein} onChange={e => setCustomFood({...customFood, protein: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 mb-1.5 block">Carbs (g)</label>
                    <input type="number" className="input-field" placeholder="0" 
                      value={customFood.carbs} onChange={e => setCustomFood({...customFood, carbs: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 mb-1.5 block">Fat (g)</label>
                    <input type="number" className="input-field" placeholder="0" 
                      value={customFood.fat} onChange={e => setCustomFood({...customFood, fat: e.target.value})} />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="glass" className="flex-1" onClick={() => setIsAddingCustom(false)}>Back to Search</Button>
                  <Button variant="primary" className="flex-1" onClick={handleAddCustomFood} disabled={!customFood.name || !customFood.calories}>Add Food</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
