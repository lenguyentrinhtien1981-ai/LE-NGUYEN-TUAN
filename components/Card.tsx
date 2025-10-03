
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-slate-800/50 border border-slate-700 rounded-2xl shadow-lg p-6 hover:border-amber-400/50 hover:shadow-amber-500/10 transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
};
