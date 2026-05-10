import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Camera, TrendingUp, Award } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export default function Progress() {
  const weightData = [
    { date: 'W1', weight: 75 },
    { date: 'W2', weight: 74.5 },
    { date: 'W3', weight: 74.1 },
    { date: 'W4', weight: 73.8 },
    { date: 'W5', weight: 73.2 },
  ];

  return (
    <div className="page-container pt-8">
      <h1 className="text-2xl font-display font-bold mb-6">Progress</h1>

      {/* Weight Chart */}
      <Card variant="dark" className="mb-6 p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-sm font-semibold text-white/70">Body Weight</h3>
            <p className="text-2xl font-bold text-white">73.2 <span className="text-sm text-white/50">kg</span></p>
          </div>
          <div className="text-right">
            <span className="text-gain-400 text-sm font-semibold flex items-center gap-1">
              <TrendingUp size={16} /> -1.8 kg
            </span>
            <p className="text-[10px] text-white/40">Past Month</p>
          </div>
        </div>
        
        <div className="h-48 w-full -ml-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis domain={['dataMin - 2', 'dataMax + 2']} hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px' }}
                itemStyle={{ color: '#06b6d4' }}
              />
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="#06b6d4" 
                strokeWidth={3} 
                dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }} 
                activeDot={{ r: 6, fill: '#7c3aed' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Progress Photos */}
      <h2 className="section-header flex justify-between items-center">
        Photos
        <Button variant="icon"><Camera size={20} /></Button>
      </h2>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="aspect-[3/4] rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center relative overflow-hidden group">
          <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=300" className="absolute inset-0 w-full h-full object-cover opacity-60" alt="Before" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
            <p className="text-xs font-bold text-white">Day 1</p>
          </div>
        </div>
        <div className="aspect-[3/4] rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center relative overflow-hidden cursor-pointer hover:bg-white/10 transition-colors">
          <Camera className="text-white/30 mb-2 w-8 h-8" />
          <p className="text-xs text-white/50 font-medium">Add Update</p>
        </div>
      </div>

      {/* Achievements */}
      <h2 className="section-header">Achievements</h2>
      <Card variant="glass" className="p-4 mb-8">
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-500/20 to-fire-500/20 border border-gold-500/30 flex items-center justify-center mb-2 shadow-gold-glow">
                <Award className="text-gold-400 w-8 h-8" />
              </div>
              <span className="text-[10px] font-bold text-white/70 text-center w-16 leading-tight">7 Day<br/>Streak</span>
            </div>
          ))}
          <div className="flex flex-col items-center flex-shrink-0 opacity-50 grayscale">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
              <Award className="text-white/30 w-8 h-8" />
            </div>
            <span className="text-[10px] font-bold text-white/50 text-center w-16 leading-tight">Lift 1000kg</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
