import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "flex justify-center items-center gap-2 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    glass: "btn-glass",
    danger: "btn-danger",
    icon: "p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
