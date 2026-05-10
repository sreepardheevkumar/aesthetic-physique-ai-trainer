import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { StepHeader, SelectionGrid } from '../components/onboarding/OnboardingComponents';

const TOTAL_STEPS = 5;

export default function Onboarding() {
  const { saveProfile } = useAppContext();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    gender: '', goal: '', experience: '', equipment: '',
    age: '', weight: '', height: '', activityLevel: 'moderate'
  });

  const update = (key, value) => setFormData(prev => ({ ...prev, [key]: value }));

  const isNextDisabled = () => {
    if (step === 1 && !formData.gender) return true;
    if (step === 2 && !formData.goal) return true;
    if (step === 3 && !formData.experience) return true;
    if (step === 4 && !formData.equipment) return true;
    if (step === 5 && (!formData.age || !formData.weight || !formData.height)) return true;
    return false;
  };

  const handleNext = async () => {
    if (step < TOTAL_STEPS) { setStep(s => s + 1); return; }
    await saveProfile({ ...formData, createdAt: new Date().toISOString(), xp: 0, streak: 0 });
    navigate('/');
  };

  const genderOptions = [
    { value: 'Male', label: 'Male', icon: '♂️', description: 'Optimized for testosterone-driven gains' },
    { value: 'Female', label: 'Female', icon: '♀️', description: 'Programs designed for female physiology' },
  ];
  const goalOptions = [
    { value: 'Fat Loss', label: 'Fat Loss', icon: '🔥', description: 'Burn fat, reveal muscle' },
    { value: 'Lean Muscle', label: 'Lean Muscle', icon: '💪', description: 'Build muscle, stay lean' },
    { value: 'Aesthetic Physique', label: 'Aesthetic Body', icon: '🏆', description: 'Proportional, aesthetic physique' },
    { value: 'Strength', label: 'Pure Strength', icon: '⚡', description: 'Get as strong as possible' },
    { value: 'Athletic', label: 'Athletic', icon: '🏃', description: 'Speed, power, performance' },
    { value: 'Beginner Transformation', label: 'Transform', icon: '🌟', description: 'Start your journey from zero' },
  ];
  const expOptions = [
    { value: 'Beginner', label: 'Beginner', icon: '🌱', description: '0–1 year of training' },
    { value: 'Intermediate', label: 'Intermediate', icon: '💪', description: '1–3 years of training' },
    { value: 'Advanced', label: 'Advanced', icon: '🏅', description: '3+ years of training' },
  ];
  const equipOptions = [
    { value: 'No Equipment', label: 'No Equipment', icon: '🏠', description: 'Bodyweight only' },
    { value: 'Dumbbells Only', label: 'Dumbbells', icon: '🏋️', description: 'Dumbbells available' },
    { value: 'Full Gym', label: 'Full Gym', icon: '🏟️', description: 'Access to a commercial gym' },
  ];

  return (
    <div className="min-h-screen bg-hero-gradient flex flex-col px-5 py-10">
      {/* Logo */}
      <div className="text-center mb-6">
        <div className="text-3xl mb-2">⚡</div>
        <p className="text-xs text-white/30 uppercase tracking-widest font-medium">Aesthetic Physique</p>
      </div>

      {/* Step Progress */}
      <div className="flex gap-1.5 mb-8">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${i < step ? 'bg-violet-500' : 'bg-white/10'}`} />
        ))}
      </div>

      <StepHeader step={step} totalSteps={TOTAL_STEPS} />

      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {step === 1 && <SelectionGrid options={genderOptions} selected={formData.gender} onSelect={v => update('gender', v)} columns={2} />}
            {step === 2 && <SelectionGrid options={goalOptions} selected={formData.goal} onSelect={v => update('goal', v)} columns={2} />}
            {step === 3 && <SelectionGrid options={expOptions} selected={formData.experience} onSelect={v => update('experience', v)} columns={1} />}
            {step === 4 && <SelectionGrid options={equipOptions} selected={formData.equipment} onSelect={v => update('equipment', v)} columns={1} />}
            {step === 5 && (
              <div className="space-y-4">
                {[{ key: 'age', label: 'Age', placeholder: 'e.g. 22', type: 'number' },
                  { key: 'weight', label: 'Weight (kg)', placeholder: 'e.g. 72', type: 'number' },
                  { key: 'height', label: 'Height (cm)', placeholder: 'e.g. 175', type: 'number' }
                ].map(({ key, label, placeholder, type }) => (
                  <div key={key}>
                    <label className="text-sm text-white/60 block mb-1.5 font-medium">{label}</label>
                    <input type={type} inputMode="decimal" className="input-field" placeholder={placeholder}
                      value={formData[key]} onChange={e => update(key, e.target.value)} />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-3 mt-8 pt-4">
        {step > 1 && (
          <Button variant="glass" className="!w-14 !h-14 !p-0 flex-shrink-0" onClick={() => setStep(s => s - 1)}>
            <ArrowLeft size={20} />
          </Button>
        )}
        <Button variant="primary" className="flex-1 !h-14 text-base" onClick={handleNext} disabled={isNextDisabled()}>
          {step === TOTAL_STEPS ? '🚀 Start My Journey' : 'Continue'}
          {step < TOTAL_STEPS && <ArrowRight size={20} />}
        </Button>
      </div>
    </div>
  );
}
