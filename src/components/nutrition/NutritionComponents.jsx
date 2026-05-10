import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const MACRO_COLORS = { protein: '#7c3aed', carbs: '#06b6d4', fat: '#f59e0b' };

export const MacroRing = ({ consumed, target }) => {
  const data = [
    { name: 'Protein', value: consumed.protein, color: MACRO_COLORS.protein },
    { name: 'Carbs', value: consumed.carbs, color: MACRO_COLORS.carbs },
    { name: 'Fat', value: consumed.fat, color: MACRO_COLORS.fat },
  ];
  const totalCalories = consumed.protein * 4 + consumed.carbs * 4 + consumed.fat * 9;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-44 h-44">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} innerRadius={62} outerRadius={80} paddingAngle={4} dataKey="value" stroke="none">
              {data.map((entry, index) => <Cell key={index} fill={entry.color} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white">{Math.round(totalCalories)}</span>
          <span className="text-[10px] text-white/40 uppercase tracking-wide">of {target.calories}</span>
          <span className="text-[10px] text-white/40">kcal</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full mt-4">
        {data.map(macro => (
          <div key={macro.name} className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: macro.color }} />
              <span className="text-[10px] text-white/60">{macro.name}</span>
            </div>
            <p className="font-bold text-sm text-white">{macro.value}g</p>
            <p className="text-[10px] text-white/30">/ {target[macro.name.toLowerCase()]}g</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const WaterTracker = ({ current = 0, target = 3000, onAdd }) => {
  const percentage = Math.min((current / target) * 100, 100);
  const glasses = Math.round(current / 250);

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-16 h-24 flex-shrink-0">
        <div className="absolute inset-0 rounded-2xl border border-cyan-500/30 overflow-hidden bg-white/5">
          <div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-500 to-cyan-400/60 rounded-b-2xl transition-all duration-700"
            style={{ height: `${percentage}%` }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg">💧</span>
        </div>
      </div>

      <div className="flex-1">
        <p className="font-bold text-cyan-400 text-lg">{(current / 1000).toFixed(1)}L</p>
        <p className="text-xs text-white/40 mb-3">of {(target / 1000).toFixed(1)}L goal · {glasses} glasses</p>
        <div className="flex gap-2 flex-wrap">
          {[250, 500].map(ml => (
            <button key={ml} onClick={() => onAdd?.(ml)}
              className="text-xs px-3 py-1.5 rounded-xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-600/30 active:scale-95 transition-all">
              +{ml}ml
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
