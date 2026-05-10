import React from 'react';

export const Badge = ({ children, variant = 'primary', icon = null, className = '' }) => {
  const variants = {
    primary: "bg-violet-600/20 text-violet-300 border border-violet-500/30",
    success: "bg-gain-600/20 text-gain-400 border border-gain-500/30",
    warning: "bg-gold-600/20 text-gold-400 border border-gold-500/30",
    danger: "bg-fire-600/20 text-fire-400 border border-fire-500/30",
    neutral: "bg-white/5 text-white/70 border border-white/10"
  };

  return (
    <span className={`badge ${variants[variant]} ${className}`}>
      {icon && <span className="w-3 h-3 flex items-center justify-center">{icon}</span>}
      {children}
    </span>
  );
};
