
import React from 'react';

interface SectionProps {
  id?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ id, title, children, className = '' }) => {
  return (
    <section id={id} className={`py-12 ${className}`}>
      {title && (
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-10 sm:mb-12 uppercase text-amber-400 font-montserrat tracking-wider">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
};
