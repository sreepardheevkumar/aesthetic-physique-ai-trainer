import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Dumbbell, Target, User, Activity, ArrowRight, ArrowLeft } from 'lucide-react';

export default function Onboarding() {
  const { saveProfile } = useAppContext();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    gender: '',
    goal: '',
    experience: '',
    equipment: '',
    height: '',
    weight: '',
    age: ''
  });

  const updateForm = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
    else handleComplete();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = async () => {
    await saveProfile(formData);
    navigate('/');
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-center">Select Gender</h2>
            <div className="grid grid-cols-2 gap-4">
              {['Male', 'Female'].map(g => (
                <Card 
                  key={g} 
                  variant={formData.gender === g ? 'violet' : 'glass'}
                  className={`text-center cursor-pointer transition-all ${formData.gender === g ? 'ring-2 ring-violet-500' : ''}`}
                  onClick={() => updateForm('gender', g)}
                >
                  <User size={48} className={`mx-auto mb-2 ${formData.gender === g ? 'text-violet-400' : 'text-white/50'}`} />
                  <p className="font-semibold">{g}</p>
                </Card>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-center">Your Goal</h2>
            <div className="space-y-3">
              {['Fat Loss', 'Lean Muscle', 'Aesthetic Physique'].map(g => (
                <Card 
                  key={g} 
                  variant={formData.goal === g ? 'violet' : 'glass'}
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={() => updateForm('goal', g)}
                >
                  <Target className={formData.goal === g ? 'text-violet-400' : 'text-white/50'} />
                  <span className="font-semibold">{g}</span>
                </Card>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-center">Experience Level</h2>
            <div className="space-y-3">
              {['Beginner', 'Intermediate', 'Advanced'].map(exp => (
                <Card 
                  key={exp} 
                  variant={formData.experience === exp ? 'violet' : 'glass'}
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={() => updateForm('experience', exp)}
                >
                  <Activity className={formData.experience === exp ? 'text-violet-400' : 'text-white/50'} />
                  <span className="font-semibold">{exp}</span>
                </Card>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-center">Available Equipment</h2>
            <div className="space-y-3">
              {['No Equipment', 'Dumbbells Only', 'Full Gym'].map(eq => (
                <Card 
                  key={eq} 
                  variant={formData.equipment === eq ? 'violet' : 'glass'}
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={() => updateForm('equipment', eq)}
                >
                  <Dumbbell className={formData.equipment === eq ? 'text-violet-400' : 'text-white/50'} />
                  <span className="font-semibold">{eq}</span>
                </Card>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-center">Your Stats</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-white/70 block mb-1">Age</label>
                <input 
                  type="number" 
                  className="input-field" 
                  placeholder="e.g. 25" 
                  value={formData.age}
                  onChange={(e) => updateForm('age', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-white/70 block mb-1">Weight (kg)</label>
                <input 
                  type="number" 
                  className="input-field" 
                  placeholder="e.g. 70"
                  value={formData.weight}
                  onChange={(e) => updateForm('weight', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-white/70 block mb-1">Height (cm)</label>
                <input 
                  type="number" 
                  className="input-field" 
                  placeholder="e.g. 175"
                  value={formData.height}
                  onChange={(e) => updateForm('height', e.target.value)}
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const isNextDisabled = () => {
    if (step === 1 && !formData.gender) return true;
    if (step === 2 && !formData.goal) return true;
    if (step === 3 && !formData.experience) return true;
    if (step === 4 && !formData.equipment) return true;
    if (step === 5 && (!formData.age || !formData.weight || !formData.height)) return true;
    return false;
  };

  return (
    <div className="page-container flex flex-col justify-between pt-12 pb-8">
      <div>
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-violet-600/20 flex items-center justify-center animate-glow-pulse">
            <Dumbbell className="text-violet-400 w-8 h-8" />
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/10 rounded-full mb-8">
          <div 
            className="h-full bg-violet-500 rounded-full transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-4 mt-8">
        {step > 1 && (
          <Button variant="glass" className="w-14 h-14 !p-0 flex-shrink-0" onClick={handleBack}>
            <ArrowLeft />
          </Button>
        )}
        <Button 
          variant="primary" 
          className="flex-1 h-14" 
          onClick={handleNext}
          disabled={isNextDisabled()}
        >
          {step === 5 ? 'Start Journey' : 'Continue'}
          {step < 5 && <ArrowRight className="w-5 h-5" />}
        </Button>
      </div>
    </div>
  );
}
