import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings as SettingsIcon, Bell, Moon, Sun, Download, Trash2, ChevronRight, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { getProfileInsights } from '../utils/profileInsights';

export default function Settings() {
  const { userProfile, resetProfile } = useAppContext();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const insights = getProfileInsights(userProfile || {});

  const handleReset = async () => {
    if (window.confirm("Are you sure you want to reset all data? This cannot be undone.")) {
      await resetProfile();
      navigate('/onboarding');
    }
  };

  const SettingRow = ({ icon: Icon, label, value, onClick, isDestructive = false }) => (
    <div 
      className={`flex items-center justify-between p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${isDestructive ? 'text-fire-400' : 'text-white'}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <Icon size={20} className={isDestructive ? 'text-fire-400' : 'text-white/50'} />
        <span className="font-medium text-sm">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className="text-xs text-white/50">{value}</span>}
        <ChevronRight size={16} className="text-white/30" />
      </div>
    </div>
  );

  return (
    <div className="page-container pt-8 pb-24">
      <h1 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
        <SettingsIcon className="text-violet-400" /> Settings
      </h1>

      {/* Profile Summary */}
      <Card variant="dark" className="mb-6 flex items-center gap-4 !p-4">
        <div className="w-16 h-16 rounded-full bg-violet-600/20 flex items-center justify-center border border-violet-500/30">
          <User className="text-violet-400 w-8 h-8" />
        </div>
        <div>
          <h2 className="font-bold text-lg">{userProfile?.name || 'Athlete'}</h2>
          <p className="text-xs text-white/50">{userProfile?.goal || 'No goal set'} · {userProfile?.daysPerWeek ? `${userProfile.daysPerWeek} days/week` : ''}</p>
          <p className="text-[11px] text-violet-300/80 mt-1">{insights.segment}</p>
        </div>
        <Button variant="glass" className="ml-auto !px-3 !py-1.5 text-xs" onClick={() => navigate('/onboarding')}>Edit</Button>
      </Card>

      {/* Preferences */}
      <h2 className="section-header !text-sm !text-white/50 uppercase tracking-wider mb-2 px-2">Preferences</h2>
      <Card variant="glass" className="!p-0 mb-6 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            {isDarkMode ? <Moon size={20} className="text-violet-400" /> : <Sun size={20} className="text-gold-400" />}
            <span className="font-medium text-sm">Dark Mode</span>
          </div>
          <div 
            className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${isDarkMode ? 'bg-violet-600' : 'bg-white/20'}`}
            onClick={toggleTheme}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`} />
          </div>
        </div>
        <SettingRow icon={Bell} label="Notifications" value="Enabled" />
      </Card>

      {/* Data Management */}
      <h2 className="section-header !text-sm !text-white/50 uppercase tracking-wider mb-2 px-2">Data & Storage</h2>
      <Card variant="glass" className="!p-0 overflow-hidden">
        <SettingRow icon={Download} label="Export Data" />
        <SettingRow icon={Trash2} label="Reset All Data" isDestructive={true} onClick={handleReset} />
      </Card>

      <div className="mt-8 text-center text-xs text-white/30">
        <p>Aesthetic Physique AI Trainer</p>
        <p>Version 1.0.0 (Offline PWA)</p>
      </div>
    </div>
  );
}
