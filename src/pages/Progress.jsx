import React, { useState } from 'react';
import { Camera, TrendingDown, Plus } from 'lucide-react';
import { useIndexedDB } from '../hooks/useIndexedDB';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { WeightChart, StreakHeatmap, MeasurementTracker } from '../components/progress/ProgressComponents';
import { achievements, rarityColors } from '../data/achievements';
import { useAppContext } from '../context/AppContext';

export default function Progress() {
  const { userProfile } = useAppContext();
  const { data: bodyLogs, putData: saveBodyLog } = useIndexedDB('bodyTracking');
  const [newWeight, setNewWeight] = useState('');
  const [measurements, setMeasurements] = useState({});
  const [activeTab, setActiveTab] = useState('weight');

  const weightData = Array.isArray(bodyLogs)
    ? bodyLogs.filter(l => l.weight).map(l => ({ date: l.date?.slice(5), weight: l.weight })).slice(-10)
    : [];

  const handleLogWeight = async () => {
    if (!newWeight) return;
    const today = new Date().toISOString().split('T')[0];
    await saveBodyLog({ date: today, weight: parseFloat(newWeight), measurements });
    setNewWeight('');
  };

  const tabs = ['weight', 'measurements', 'photos', 'badges'];

  const unlockedAchievements = achievements.slice(0, 3); // mock: first 3 unlocked

  return (
    <div className="page-container pt-8">
      <h1 className="text-2xl font-display font-bold mb-6">Progress</h1>

      {/* Tabs */}
      <div className="flex gap-1 glass rounded-2xl p-1 mb-6">
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
              activeTab === t ? 'bg-violet-600 text-white shadow-violet-glow' : 'text-white/40 hover:text-white/70'
            }`}>
            {t}
          </button>
        ))}
      </div>

      {activeTab === 'weight' && (
        <div className="space-y-5">
          <Card variant="dark" className="!p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-sm text-white/60 font-medium">Body Weight</h3>
                <p className="text-3xl font-bold">{userProfile?.weight || '--'} <span className="text-sm text-white/40">kg</span></p>
              </div>
              {weightData.length > 1 && (
                <div className="text-right">
                  <span className="text-gain-400 text-sm font-bold flex items-center gap-1"><TrendingDown size={14} /> Progress tracking</span>
                </div>
              )}
            </div>
            <WeightChart data={weightData} />
          </Card>

          <Card variant="glass" className="!p-4">
            <h3 className="text-sm font-semibold mb-3">Log Today's Weight</h3>
            <div className="flex gap-3">
              <input type="number" inputMode="decimal" className="input-field flex-1" placeholder="e.g. 74.5 kg"
                value={newWeight} onChange={e => setNewWeight(e.target.value)} />
              <Button variant="primary" onClick={handleLogWeight} className="!px-5 flex-shrink-0">Log</Button>
            </div>
          </Card>

          <Card variant="dark" className="!p-4">
            <h3 className="text-sm font-semibold mb-3">12-Week Activity</h3>
            <StreakHeatmap data={[]} />
          </Card>
        </div>
      )}

      {activeTab === 'measurements' && (
        <div className="space-y-5">
          <Card variant="glass" className="!p-4">
            <h3 className="text-sm font-semibold mb-4">Body Measurements</h3>
            <MeasurementTracker measurements={measurements} onUpdate={(k, v) => setMeasurements(m => ({ ...m, [k]: v }))} />
          </Card>
          <Button variant="primary" className="w-full">Save Measurements</Button>
        </div>
      )}

      {activeTab === 'photos' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=300" className="w-full h-full object-cover opacity-60" alt="Start" />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <p className="text-xs font-bold">Day 1 — Start</p>
              </div>
            </div>
            <div onClick={() => alert('Upload feature — add your camera integration here!')}
              className="aspect-[3/4] rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
              <Camera className="text-white/30 mb-2 w-8 h-8" />
              <p className="text-xs text-white/50 font-medium">Add Photo</p>
              <p className="text-[10px] text-white/30 mt-1">Track your transformation</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'badges' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {achievements.map((ach, i) => {
              const isUnlocked = i < 3; // First 3 are "unlocked" for demo
              return (
                <Card key={ach.id} variant="glass" className={`!p-4 text-center transition-all ${!isUnlocked ? 'opacity-40 grayscale' : ''}`}>
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${rarityColors[ach.rarity]} flex items-center justify-center mx-auto mb-3 text-2xl border`}>
                    {ach.icon}
                  </div>
                  <p className="font-bold text-sm mb-0.5">{ach.title}</p>
                  <p className="text-[10px] text-white/50 mb-2 leading-tight">{ach.description}</p>
                  <span className="text-[10px] text-gold-400 font-bold">{ach.xp} XP</span>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
