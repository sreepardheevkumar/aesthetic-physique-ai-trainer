import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { getActivityLevelFromProfile, getProfileInsights } from '../utils/profileInsights';

const TOTAL_STEPS = 9;

const stepMeta = [
  { icon: '👋', title: "What's your name?", subtitle: "We'll build this around you" },
  { icon: '🧬', title: 'Who are you training like?', subtitle: 'Pick the life stage that fits best' },
  { icon: '🎯', title: 'Your main goal', subtitle: 'Your training style starts here' },
  { icon: '⚖️', title: 'Starting point', subtitle: 'This helps us shape the right pace' },
  { icon: '📅', title: 'Training days', subtitle: 'Choose the schedule you can repeat' },
  { icon: '🏅', title: 'Experience level', subtitle: 'We will scale the volume and difficulty' },
  { icon: '🏋️', title: 'Equipment access', subtitle: 'Gym, dumbbells, or bodyweight only' },
  { icon: '📊', title: 'Your stats', subtitle: 'Used for calories, macros, and pacing' },
  { icon: '✨', title: 'Your blueprint', subtitle: 'Quick preview before we lock it in' },
];

const SelectGrid = ({ options, selected, onSelect, cols = 2 }) => (
  <div className={`grid gap-3 ${cols === 1 ? 'grid-cols-1' : cols === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
    {options.map((opt) => {
      const active = selected === opt.value;
      return (
        <div
          key={opt.value}
          onClick={() => onSelect(opt.value)}
          className={`rounded-2xl p-4 text-center cursor-pointer transition-all border select-none ${
            active
              ? 'bg-violet-600/25 border-violet-500 ring-2 ring-violet-500/50 scale-[1.03]'
              : 'bg-white/3 border-white/10 hover:border-white/25 active:scale-95'
          }`}
        >
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
    lifestyle: '',
    goal: '',
    bodyType: '',
    daysPerWeek: 0,
    experience: '',
    equipment: '',
    age: '',
    weight: '',
    height: '',
  });

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const canProceed = () => {
    if (step === 1) return form.name.trim().length >= 2;
    if (step === 2) return !!form.lifestyle && !!form.gender;
    if (step === 3) return !!form.goal;
    if (step === 4) return !!form.bodyType;
    if (step === 5) return form.daysPerWeek >= 2 && form.daysPerWeek <= 6;
    if (step === 6) return !!form.experience;
    if (step === 7) return !!form.equipment;
    if (step === 8) return !!form.age && !!form.weight && !!form.height;
    if (step === 9) return true;
    return false;
  };

  const profilePreview = getProfileInsights({
    ...form,
    activityLevel: getActivityLevelFromProfile(form),
  });

  const handleNext = async () => {
    if (step < TOTAL_STEPS) {
      setStep((current) => current + 1);
      return;
    }

    await saveProfile({
      ...form,
      activityLevel: getActivityLevelFromProfile(form),
      createdAt: new Date().toISOString(),
      xp: 0,
      streak: 0,
      lastWorkout: null,
    });
    navigate('/');
  };

  const lifestyleOptions = [
    { value: 'Teen Student', label: 'Teen', emoji: '🧒', desc: '13-17, skill and posture first' },
    { value: 'College Student', label: 'College', emoji: '🎓', desc: 'Lean muscle with campus-friendly structure' },
    { value: 'Busy Professional', label: 'Professional', emoji: '💼', desc: '30-45 minute efficient sessions' },
    { value: 'General Adult', label: 'General Adult', emoji: '🏃', desc: 'Balanced training and recovery' },
    { value: '40+ Adult', label: '40+', emoji: '🧘', desc: 'Strength, mobility, and joint-friendly work' },
  ];

  const genderOptions = [
    { value: 'Male', label: 'Male', emoji: '♂️', desc: 'Used for calorie and plan tuning' },
    { value: 'Female', label: 'Female', emoji: '♀️', desc: 'Used for calorie and plan tuning' },
  ];

  const dayOptions = [2, 3, 4, 5, 6].map((days) => ({
    value: days,
    emoji: ['🌱', '💪', '🔥', '⚡', '🏆'][days - 2],
    label: `${days} Days`,
    desc:
      days === 2 ? 'Easy start' :
      days === 3 ? 'Beginner-friendly' :
      days === 4 ? 'Best balance' :
      days === 5 ? 'Growth-focused' :
      'High commitment',
  }));

  return (
    <div className="min-h-screen min-h-dvh bg-dark-950 flex flex-col px-5 pt-12 pb-8">
      <div className="text-center mb-8">
        <span className="text-4xl">⚡</span>
        <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mt-1">Aesthetic Physique</p>
      </div>

      <div className="flex gap-1.5 mb-8">
        {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full transition-all duration-500 ${
              index < step ? 'bg-violet-500' : index === step - 1 ? 'bg-violet-500 animate-pulse' : 'bg-white/10'
            }`}
          />
        ))}
      </div>

      <div className="text-center mb-7">
        <div className="text-4xl mb-3">{stepMeta[step - 1]?.icon}</div>
        <h2 className="text-2xl font-display font-bold text-white mb-1">{stepMeta[step - 1]?.title}</h2>
        <p className="text-white/40 text-sm">{stepMeta[step - 1]?.subtitle}</p>
      </div>

      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -30, opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            {step === 1 && (
              <div>
                <input
                  autoFocus
                  type="text"
                  className="input-field text-xl text-center py-5 font-semibold"
                  placeholder="Enter your name"
                  value={form.name}
                  maxLength={30}
                  onChange={(e) => update('name', e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && canProceed() && handleNext()}
                />
                {form.name.trim().length >= 2 && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-violet-400 text-sm mt-4 font-medium"
                  >
                    Welcome, {form.name.trim().split(' ')[0]}! 🎉
                  </motion.p>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/35 font-semibold mb-3">Life stage</p>
                  <SelectGrid cols={1} options={lifestyleOptions} selected={form.lifestyle} onSelect={(value) => update('lifestyle', value)} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/35 font-semibold mb-3">Gender</p>
                  <SelectGrid options={genderOptions} selected={form.gender} onSelect={(value) => update('gender', value)} />
                </div>
              </div>
            )}

            {step === 3 && (
              <SelectGrid
                cols={2}
                options={[
                  { value: 'Fat Loss', label: 'Fat Loss', emoji: '🔥', desc: 'Reveal muscle and improve fitness' },
                  { value: 'Lean Muscle', label: 'Lean Muscle', emoji: '💪', desc: 'Build size without sloppy bulk' },
                  { value: 'Aesthetic Physique', label: 'Aesthetic', emoji: '🏆', desc: 'Balanced proportions and symmetry' },
                  { value: 'Strength', label: 'Strength', emoji: '⚡', desc: 'Get stronger on key lifts' },
                  { value: 'Athletic', label: 'Athletic', emoji: '🏃', desc: 'Move better and feel explosive' },
                  { value: 'Beginner Transformation', label: 'Transform', emoji: '🌟', desc: 'Master the basics and change habits' },
                ]}
                selected={form.goal}
                onSelect={(value) => update('goal', value)}
              />
            )}

            {step === 4 && (
              <SelectGrid
                cols={1}
                options={[
                  { value: 'Lean / Hard Gainer', label: 'Lean / Hard Gainer', emoji: '🍚', desc: 'Research path for skinny mass gain' },
                  { value: 'Balanced', label: 'Balanced', emoji: '⚖️', desc: 'General recomposition and aesthetics' },
                  { value: 'Overweight / Fat Loss Focus', label: 'Overweight / Fat Loss Focus', emoji: '🚶', desc: 'Fat loss while preserving muscle' },
                ]}
                selected={form.bodyType}
                onSelect={(value) => update('bodyType', value)}
              />
            )}

            {step === 5 && (
              <div className="space-y-4">
                <SelectGrid cols={3} options={dayOptions} selected={form.daysPerWeek} onSelect={(value) => update('daysPerWeek', value)} />

                {form.daysPerWeek > 0 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <Card variant="violet" className="!p-4 text-center">
                      <p className="text-sm font-semibold text-violet-200 mb-1">Your {form.daysPerWeek}-day rhythm</p>
                      <p className="text-xs text-white/60">
                        {form.daysPerWeek === 2 && 'Two full-body sessions with generous recovery'}
                        {form.daysPerWeek === 3 && 'Three focused days to build consistency'}
                        {form.daysPerWeek === 4 && 'A sustainable aesthetic split for most people'}
                        {form.daysPerWeek === 5 && 'Higher weekly volume for faster progress'}
                        {form.daysPerWeek === 6 && 'Advanced frequency with one full rest day'}
                      </p>
                    </Card>
                  </motion.div>
                )}
              </div>
            )}

            {step === 6 && (
              <SelectGrid
                cols={1}
                options={[
                  { value: 'Beginner', label: 'Beginner', emoji: '🌱', desc: '0-1 year. Technique, confidence, and basics.' },
                  { value: 'Intermediate', label: 'Intermediate', emoji: '💪', desc: '1-3 years. Ready for more volume and symmetry work.' },
                  { value: 'Advanced', label: 'Advanced', emoji: '🏅', desc: '3+ years. Specialization, fatigue management, and detail.' },
                ]}
                selected={form.experience}
                onSelect={(value) => update('experience', value)}
              />
            )}

            {step === 7 && (
              <SelectGrid
                cols={1}
                options={[
                  { value: 'No Equipment', label: 'No Equipment', emoji: '🏠', desc: 'Bodyweight-only plan with conditioning and posture work.' },
                  { value: 'Dumbbells Only', label: 'Dumbbells Only', emoji: '🏋️', desc: 'At-home setup or compact gym access.' },
                  { value: 'Full Gym', label: 'Full Gym', emoji: '🏟️', desc: 'Full range of barbells, machines, and cables.' },
                ]}
                selected={form.equipment}
                onSelect={(value) => update('equipment', value)}
              />
            )}

            {step === 8 && (
              <div className="space-y-4">
                {[
                  { key: 'age', label: 'Age', placeholder: 'e.g. 22', suffix: 'yrs' },
                  { key: 'weight', label: 'Body Weight', placeholder: 'e.g. 72', suffix: 'kg' },
                  { key: 'height', label: 'Height', placeholder: 'e.g. 175', suffix: 'cm' },
                ].map(({ key, label, placeholder, suffix }) => (
                  <div key={key}>
                    <label className="text-sm text-white/50 font-medium block mb-1.5">{label}</label>
                    <div className="relative">
                      <input
                        type="number"
                        inputMode="decimal"
                        className="input-field pr-12"
                        placeholder={placeholder}
                        value={form[key]}
                        onChange={(e) => update(key, e.target.value)}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-white/30 font-medium">{suffix}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {step === 9 && (
              <div className="space-y-4">
                <Card variant="violet" className="!p-5">
                  <p className="text-xs uppercase tracking-wider text-violet-200/70 mb-2">Research-driven profile</p>
                  <h3 className="text-xl font-display font-bold mb-2">{profilePreview.segment}</h3>
                  <p className="text-sm text-white/75 leading-relaxed">
                    Your app will bias toward {profilePreview.trainingBias}.
                  </p>
                </Card>

                <Card variant="glass" className="!p-4">
                  <p className="text-xs uppercase tracking-wider text-white/35 font-semibold mb-3">Top priorities</p>
                  <div className="flex flex-wrap gap-2">
                    {profilePreview.priorities.map((priority) => (
                      <span key={priority} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/75">
                        {priority}
                      </span>
                    ))}
                  </div>
                </Card>

                <Card variant="glass" className="!p-4">
                  <p className="text-xs uppercase tracking-wider text-white/35 font-semibold mb-3">Nutrition + recovery</p>
                  <p className="text-sm text-white/70 mb-2">
                    Hydration target: <span className="text-violet-300 font-semibold">{profilePreview.hydrationTarget} ml/day</span>
                  </p>
                  <p className="text-xs text-white/50 leading-relaxed">
                    {profilePreview.nutritionFocus.join(' • ')}
                  </p>
                </Card>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-3 mt-8">
        {step > 1 && (
          <Button
            variant="glass"
            className="!w-14 !h-14 !p-0 flex-shrink-0 rounded-2xl"
            onClick={() => setStep((current) => current - 1)}
          >
            <ArrowLeft size={20} />
          </Button>
        )}
        <Button variant="primary" className="flex-1 !h-14 text-base rounded-2xl" onClick={handleNext} disabled={!canProceed()}>
          {step === TOTAL_STEPS ? '🚀 Build My Program' : 'Continue'}
          {step < TOTAL_STEPS && <ArrowRight size={20} />}
        </Button>
      </div>
    </div>
  );
}
