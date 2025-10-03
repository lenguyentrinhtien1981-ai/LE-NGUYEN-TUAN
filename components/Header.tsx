
import React from 'react';
import { HEADER_LINKS } from '../constants';

export const Header: React.FC = () => {
  return (
    <header className="py-4 border-b border-slate-700/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm sm:text-base font-medium">
          {HEADER_LINKS.map((link) => (
            <li key={link.name}>
              <a href={link.href} className="text-gray-300 hover:text-amber-400 transition-colors duration-300 font-montserrat">
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
