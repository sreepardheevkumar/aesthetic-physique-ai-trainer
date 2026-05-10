import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, User, Target, Dumbbell, Activity, BarChart2, Calendar } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const TOTAL_STEPS = 7;

// Step metadata
const stepMeta = [
  { icon: '👋', title: "What's your name?", subtitle: "Let's make this personal" },
  { icon: '⚡', title: "Who are you?", subtitle: "We'll tailor your program" },
  { icon: '🎯', title: "Your Goal", subtitle: "What do you want to achieve?" },
  { icon: '📅', title: "Training Days", subtitle: "How many days can you commit per week?" },
  { icon: '🏅', title: "Experience Level", subtitle: "Be honest — we calibrate everything" },
  { icon: '🏋️', title: "Equipment Access", subtitle: "We'll build around what you have" },
  { icon: '📊', title: "Your Stats", subtitle: "Used to calculate your perfect plan" },
];

// Option cards for selections
const SelectGrid = ({ options, selected, onSelect, cols = 2 }) => (
  <div className={`grid gap-3 ${cols === 1 ? 'grid-cols-1' : cols === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
    {options.map(opt => {
      const active = selected === opt.value;
      return (
        <div key={opt.value} onClick={() => onSelect(opt.value)}
          className={`rounded-2xl p-4 text-center cursor-pointer transition-all border select-none
            ${active
              ? 'bg-violet-600/25 border-violet-500 ring-2 ring-violet-500/50 scale-[1.03]'
              : 'bg-white/3 border-white/10 hover:border-white/25 active:scale-95'}`}>
          {opt.emoji && <div className="text-3xl mb-2">{opt.emoji}</div>}
          <p className={`font-semibold text-sm ${active ? 'text-violet-200' : 'text-white/80'}`}>{opt.label}</p>
          {opt.desc && <p className="text-[10px] text-white/40 mt-1 leading-tight">{opt.desc}</p>}
        </div>
      );
    })}
  </div>
);

export default function Onboarding() {
  const { saveProfile } = useAppContext();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    gender: '',
    goal: '',
    daysPerWeek: 0,
    experience: '',
    equipment: '',
    age: '',
    weight: '',
    height: '',
  });

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const canProceed = () => {
    if (step === 1) return form.name.trim().length >= 2;
    if (step === 2) return !!form.gender;
    if (step === 3) return !!form.goal;
    if (step === 4) return form.daysPerWeek >= 2 && form.daysPerWeek <= 6;
    if (step === 5) return !!form.experience;
    if (step === 6) return !!form.equipment;
    if (step === 7) return !!form.age && !!form.weight && !!form.height;
    return false;
  };

  const handleNext = async () => {
    if (step < TOTAL_STEPS) { setStep(s => s + 1); return; }
    await saveProfile({
      ...form,
      createdAt: new Date().toISOString(),
      xp: 0,
      streak: 0,
      lastWorkout: null,
    });
    navigate('/');
  };

  const dayOptions = [2, 3, 4, 5, 6].map(d => ({
    value: d, emoji: ['🌱', '💪', '🔥', '⚡', '🏆'][d - 2],
    label: `${d} Days`,
    desc: d === 2 ? 'Easy start' : d === 3 ? 'Recommended for beginners' : d === 4 ? 'Optimal for most goals' : d === 5 ? 'Advanced training' : 'Elite athlete',
  }));

  return (
    <div className="min-h-screen min-h-dvh bg-dark-950 flex flex-col px-5 pt-12 pb-8">
      {/* Logo */}
      <div className="text-center mb-8">
        <span className="text-4xl">⚡</span>
        <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mt-1">Aesthetic Physique</p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 mb-8">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 
            ${i < step ? 'bg-violet-500' : i === step - 1 ? 'bg-violet-500 animate-pulse' : 'bg-white/10'}`} />
        ))}
      </div>

      {/* Step header */}
      <div className="text-center mb-7">
        <div className="text-4xl mb-3">{stepMeta[step - 1]?.icon}</div>
        <h2 className="text-2xl font-display font-bold text-white mb-1">{stepMeta[step - 1]?.title}</h2>
        <p className="text-white/40 text-sm">{stepMeta[step - 1]?.subtitle}</p>
      </div>

      {/* Step content */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div key={step}
            initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}>

            {/* STEP 1: Name */}
            {step === 1 && (
              <div>
                <input
                  autoFocus
                  type="text"
                  className="input-field text-xl text-center py-5 font-semibold"
                  placeholder="Enter your name"
                  value={form.name}
                  maxLength={30}
                  onChange={e => update('name', e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && canProceed() && handleNext()}
                />
                {form.name.trim().length >= 2 && (
                  <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="text-center text-violet-400 text-sm mt-4 font-medium">
                    Welcome, {form.name.trim().split(' ')[0]}! 🎉
                  </motion.p>
                )}
              </div>
            )}

            {/* STEP 2: Gender */}
            {step === 2 && (
              <SelectGrid options={[
                { value: 'Male', label: 'Male', emoji: '♂️', desc: 'Testosterone-optimized training' },
                { value: 'Female', label: 'Female', emoji: '♀️', desc: 'Programs for female physiology' },
              ]} selected={form.gender} onSelect={v => update('gender', v)} />
            )}

            {/* STEP 3: Goal */}
            {step === 3 && (
              <SelectGrid cols={2} options={[
                { value: 'Fat Loss', label: 'Fat Loss', emoji: '🔥', desc: 'Burn fat, reveal muscle' },
                { value: 'Lean Muscle', label: 'Lean Muscle', emoji: '💪', desc: 'Build muscle, stay lean' },
                { value: 'Aesthetic Physique', label: 'Aesthetic', emoji: '🏆', desc: 'Proportional & aesthetic' },
                { value: 'Strength', label: 'Pure Strength', emoji: '⚡', desc: 'Maximum strength gains' },
                { value: 'Athletic', label: 'Athletic', emoji: '🏃', desc: 'Speed, power, performance' },
                { value: 'Beginner Transformation', label: 'Transform', emoji: '🌟', desc: 'Start from zero' },
              ]} selected={form.goal} onSelect={v => update('goal', v)} />
            )}

            {/* STEP 4: Days per week */}
            {step === 4 && (
              <div className="space-y-4">
                <SelectGrid cols={3} options={dayOptions.map(d => ({
                  value: d.value, label: d.label, emoji: d.emoji, desc: d.desc
                }))} selected={form.daysPerWeek} onSelect={v => update('daysPerWeek', v)} />

                {form.daysPerWeek > 0 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <Card variant="violet" className="!p-4 text-center">
                      <p className="text-sm font-semibold text-violet-200 mb-1">
                        Your {form.daysPerWeek}-Day Program
                      </p>
                      <p className="text-xs text-white/60">
                        {form.daysPerWeek === 2 && '2 Full-Body workouts + 5 rest days'}
                        {form.daysPerWeek === 3 && 'Push / Pull / Legs split'}
                        {form.daysPerWeek === 4 && 'Upper / Lower body split'}
                        {form.daysPerWeek === 5 && 'PPL + Upper/Lower hybrid'}
                        {form.daysPerWeek === 6 && '6-day PPL (Push/Pull/Legs × 2)'}
                      </p>
                    </Card>
                  </motion.div>
                )}
              </div>
            )}

            {/* STEP 5: Experience */}
            {step === 5 && (
              <SelectGrid cols={1} options={[
                { value: 'Beginner', label: 'Beginner', emoji: '🌱', desc: '0–1 year of training. Focus on form and consistency.' },
                { value: 'Intermediate', label: 'Intermediate', emoji: '💪', desc: '1–3 years. You know the basics, ready to progress.' },
                { value: 'Advanced', label: 'Advanced', emoji: '🏅', desc: '3+ years. You push hard and track everything.' },
              ]} selected={form.experience} onSelect={v => update('experience', v)} />
            )}

            {/* STEP 6: Equipment */}
            {step === 6 && (
              <SelectGrid cols={1} options={[
                { value: 'No Equipment', label: 'No Equipment', emoji: '🏠', desc: 'Bodyweight only. Full program at home.' },
                { value: 'Dumbbells Only', label: 'Dumbbells', emoji: '🏋️', desc: 'Adjustable or fixed dumbbells available.' },
                { value: 'Full Gym', label: 'Full Gym', emoji: '🏟️', desc: 'Barbells, machines, cables — full access.' },
              ]} selected={form.equipment} onSelect={v => update('equipment', v)} />
            )}

            {/* STEP 7: Stats */}
            {step === 7 && (
              <div className="space-y-4">
                {[
                  { key: 'age', label: 'Age', placeholder: 'e.g. 22', suffix: 'yrs' },
                  { key: 'weight', label: 'Body Weight', placeholder: 'e.g. 72', suffix: 'kg' },
                  { key: 'height', label: 'Height', placeholder: 'e.g. 175', suffix: 'cm' },
                ].map(({ key, label, placeholder, suffix }) => (
                  <div key={key}>
                    <label className="text-sm text-white/50 font-medium block mb-1.5">{label}</label>
                    <div className="relative">
                      <input type="number" inputMode="decimal"
                        className="input-field pr-12"
                        placeholder={placeholder}
                        value={form[key]}
                        onChange={e => update(key, e.target.value)}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-white/30 font-medium">{suffix}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        {step > 1 && (
          <Button variant="glass" className="!w-14 !h-14 !p-0 flex-shrink-0 rounded-2xl" onClick={() => setStep(s => s - 1)}>
            <ArrowLeft size={20} />
          </Button>
        )}
        <Button variant="primary" className="flex-1 !h-14 text-base rounded-2xl"
          onClick={handleNext} disabled={!canProceed()}>
          {step === TOTAL_STEPS
            ? `🚀 Build My ${form.daysPerWeek || ''}${form.daysPerWeek ? '-Day ' : ''}Program`
            : 'Continue'}
          {step < TOTAL_STEPS && <ArrowRight size={20} />}
        </Button>
      </div>
    </div>
  );
}
