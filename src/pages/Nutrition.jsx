import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Plus, Flame, Droplet } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export default function Nutrition() {
  const macros = [
    { name: 'Protein', value: 120, color: '#7c3aed' },
    { name: 'Carbs', value: 200, color: '#06b6d4' },
    { name: 'Fats', value: 65, color: '#f59e0b' }
  ];

  return (
    <div className="page-container pt-8">
      <h1 className="text-2xl font-display font-bold mb-6">Nutrition</h1>

      {/* Calories Summary */}
      <Card variant="dark" className="mb-6 relative overflow-hidden flex flex-col items-center justify-center p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-cyan-600/10" />
        
        <div className="relative w-48 h-48 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={macros}
                innerRadius={70}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {macros.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-white">1,850</span>
            <span className="text-xs text-white/50 uppercase tracking-wide">Kcal Left</span>
          </div>
        </div>

        <div className="flex w-full justify-between px-4 relative z-10">
          {macros.map((macro) => (
            <div key={macro.name} className="text-center">
              <div className="flex items-center gap-1 justify-center mb-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: macro.color }} />
                <span className="text-xs text-white/70">{macro.name}</span>
              </div>
              <span className="font-bold text-sm">{macro.value}g</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Meals */}
      <h2 className="section-header">Today's Meals</h2>
      <div className="space-y-4 mb-8">
        {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map((meal) => (
          <Card key={meal} variant="glass" className="flex justify-between items-center p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                <Plus className="text-white/50" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">{meal}</h4>
                <p className="text-xs text-white/40">Recommend: 400-600 kcal</p>
              </div>
            </div>
            <Button variant="icon">
              <Plus size={20} />
            </Button>
          </Card>
        ))}
      </div>

      {/* Water Tracking */}
      <h2 className="section-header">Hydration</h2>
      <Card variant="glass" className="flex items-center justify-between p-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cyan-600/20 flex items-center justify-center">
            <Droplet className="text-cyan-400 fill-current" />
          </div>
          <div>
            <h4 className="font-semibold text-sm">Water Intake</h4>
            <p className="text-xs text-cyan-400">1.5 / 3.0 Liters</p>
          </div>
        </div>
        <Button variant="glass" className="!p-2 !rounded-xl">
          <Plus size={20} />
        </Button>
      </Card>
    </div>
  );
}
