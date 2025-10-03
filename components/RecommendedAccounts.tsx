import React from 'react';
import { Section } from './Section';
import { Card } from './Card';
import { RECOMMENDED_ACCOUNTS } from '../constants';

export const RecommendedAccounts: React.FC = () => {
  return (
    <Section title="Tài khoản chuyên gia khuyên dùng">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {RECOMMENDED_ACCOUNTS.map(account => (
          <Card key={account.name}>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex-grow text-center sm:text-left">
                <h3 className="font-semibold text-lg text-white">{account.name}</h3>
                <p className="text-sm text-gray-400 mt-1">{account.description}</p>
              </div>
              <a href={account.href} target="_blank" rel="noopener noreferrer" className="shrink-0 bg-slate-700 text-white font-semibold px-6 py-2 rounded-lg hover:bg-slate-600 transition-colors">
                TÌM HIỂU LUÔN
              </a>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};