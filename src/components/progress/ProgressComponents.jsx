import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export const WeightChart = ({ data = [] }) => {
  if (data.length === 0) return (
    <div className="flex items-center justify-center h-48 text-white/30 text-sm">No weight data yet. Start logging!</div>
  );

  return (
    <div className="h-52 w-full -ml-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="date" stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} />
          <YAxis domain={['dataMin - 1', 'dataMax + 1']} hide />
          <Tooltip
            contentStyle={{ backgroundColor: '#14141f', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '12px', fontSize: 12 }}
            itemStyle={{ color: '#06b6d4' }}
            formatter={(v) => [`${v} kg`, 'Weight']}
          />
          <Line type="monotone" dataKey="weight" stroke="#06b6d4" strokeWidth={3}
            dot={{ fill: '#7c3aed', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: '#06b6d4', stroke: '#7c3aed', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const StreakHeatmap = ({ data = [] }) => {
  const weeks = 12;
  const days = 7;
  const grid = [];
  const today = new Date();

  for (let w = weeks - 1; w >= 0; w--) {
    const week = [];
    for (let d = 0; d < days; d++) {
      const date = new Date(today);
      date.setDate(today.getDate() - (w * 7 + (6 - d)));
      const dateStr = date.toISOString().split('T')[0];
      const log = data.find(l => l.date === dateStr);
      week.push({ date: dateStr, level: log ? (log.completed ? 4 : 1) : 0 });
    }
    grid.push(week);
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-1 min-w-max">
        {grid.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((day, di) => (
              <div key={di}
                className={`heatmap-cell heatmap-${day.level}`}
                title={`${day.date}: ${day.level > 0 ? 'Worked out' : 'Rest'}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-end items-center gap-2 mt-2 text-[10px] text-white/30">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map(l => <div key={l} className={`heatmap-cell heatmap-${l}`} />)}
        <span>More</span>
      </div>
    </div>
  );
};

export const MeasurementTracker = ({ measurements = {}, onUpdate }) => {
  const fields = [
    { key: 'chest', label: 'Chest', unit: 'cm' },
    { key: 'waist', label: 'Waist', unit: 'cm' },
    { key: 'hips', label: 'Hips', unit: 'cm' },
    { key: 'arms', label: 'Arms', unit: 'cm' },
    { key: 'thighs', label: 'Thighs', unit: 'cm' },
  ];

  return (
    <div className="space-y-3">
      {fields.map(({ key, label, unit }) => (
        <div key={key} className="flex items-center justify-between glass rounded-xl px-4 py-3">
          <span className="text-sm font-medium text-white/80">{label}</span>
          <div className="flex items-center gap-2">
            <input
              type="number" inputMode="decimal"
              className="w-20 bg-black/30 rounded-lg px-3 py-1.5 text-sm text-center font-bold focus:ring-1 focus:ring-violet-500 outline-none"
              placeholder="—"
              value={measurements[key] || ''}
              onChange={e => onUpdate?.(key, e.target.value)}
            />
            <span className="text-xs text-white/30 w-6">{unit}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
