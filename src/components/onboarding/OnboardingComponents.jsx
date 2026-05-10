import React from 'react';
import { User, Target, Dumbbell, Activity, BarChart2, Map } from 'lucide-react';

export const stepMeta = [
  { step: 1, title: "Who are you?", subtitle: "Let's personalize your journey", icon: User },
  { step: 2, title: "Your Goal", subtitle: "What do you want to achieve?", icon: Target },
  { step: 3, title: "Experience Level", subtitle: "Be honest — we'll calibrate everything", icon: BarChart2 },
  { step: 4, title: "Equipment Access", subtitle: "We'll build around what you have", icon: Dumbbell },
  { step: 5, title: "Your Stats", subtitle: "Used to calculate your perfect plan", icon: Activity },
];

export const StepHeader = ({ step, totalSteps }) => {
  const meta = stepMeta[step - 1];
  const Icon = meta?.icon || User;
  return (
    <div className="mb-8 text-center">
      <div className="w-16 h-16 rounded-2xl bg-violet-600/20 flex items-center justify-center mx-auto mb-4 border border-violet-500/30">
        <Icon className="text-violet-400 w-8 h-8" />
      </div>
      <h2 className="text-2xl font-display font-bold text-white mb-1">{meta?.title}</h2>
      <p className="text-white/50 text-sm">{meta?.subtitle}</p>
    </div>
  );
};

export const SelectionGrid = ({ options, selected, onSelect, columns = 2 }) => (
  <div className={`grid grid-cols-${columns} gap-3`}>
    {options.map(opt => {
      const isSelected = selected === opt.value;
      return (
        <div
          key={opt.value}
          onClick={() => onSelect(opt.value)}
          className={`rounded-2xl p-4 text-center cursor-pointer transition-all border ${
            isSelected
              ? 'bg-violet-600/20 border-violet-500 ring-2 ring-violet-500/50 scale-[1.02]'
              : 'glass border-white/10 hover:border-white/20 active:scale-98'
          }`}
        >
          {opt.icon && <div className="text-3xl mb-2">{opt.icon}</div>}
          <p className={`font-semibold text-sm ${isSelected ? 'text-violet-300' : 'text-white/80'}`}>{opt.label}</p>
          {opt.description && <p className="text-[10px] text-white/40 mt-1 leading-tight">{opt.description}</p>}
        </div>
      );
    })}
  </div>
);
