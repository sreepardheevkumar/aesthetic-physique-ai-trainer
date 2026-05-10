import React from 'react';

export const Card = ({ children, className = '', variant = 'glass', ...props }) => {
  const variants = {
    glass: "glass",
    violet: "glass-violet",
    dark: "glass-dark",
    stat: "stat-card"
  };

  return (
    <div className={`rounded-2xl p-5 ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};
