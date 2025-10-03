
import React from 'react';
import { COMMUNITY_LINK } from '../constants';

export const Community: React.FC = () => {
  return (
    <section id="community" className="text-center py-12">
      <a 
        href={COMMUNITY_LINK} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="inline-block bg-green-600 text-white font-bold text-xl px-10 py-4 rounded-xl shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
      >
        Tham gia cộng đồng AI FOR BUSINESS
      </a>
    </section>
  );
};
