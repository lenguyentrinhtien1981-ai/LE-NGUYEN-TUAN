
import React from 'react';
import { Section } from './Section';
import { Card } from './Card';
import { TRAININGS } from '../constants';

export const AiMasteryTraining: React.FC = () => {
  return (
    <Section id="training" title="Huấn luyện làm chủ AI">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TRAININGS.map(training => (
          <Card key={training.name} className="flex flex-col">
            <h3 className="text-xl font-bold font-montserrat text-white">{training.name}</h3>
            <p className="text-gray-400 mt-2 mb-4 flex-grow">{training.description}</p>
            <a href="https://m.me/lecongnang86" target="_blank" rel="noopener noreferrer" className="self-start bg-transparent border-2 border-amber-500 text-amber-500 font-semibold px-5 py-2 rounded-lg hover:bg-amber-500 hover:text-slate-900 transition-colors">
              Nhận tư vấn ngay
            </a>
          </Card>
        ))}
      </div>
    </Section>
  );
};
