
import React from 'react';
import { Section } from './Section';
import { Card } from './Card';
import { ASSISTANTS } from '../constants';

export const ExpertAssistants: React.FC = () => {
  return (
    <Section id="assistants" title="Trợ lý của chuyên gia">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {ASSISTANTS.map(assistant => (
          <Card key={assistant.name} className="flex flex-col items-center justify-center text-center">
            <h3 className="font-bold text-base sm:text-lg mb-4 text-white">{assistant.name}</h3>
            <a href={assistant.href} target="_blank" rel="noopener noreferrer" className="mt-auto bg-amber-500 text-slate-900 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-amber-600 transition-colors">
              Sử dụng ngay
            </a>
          </Card>
        ))}
      </div>
    </Section>
  );
};
