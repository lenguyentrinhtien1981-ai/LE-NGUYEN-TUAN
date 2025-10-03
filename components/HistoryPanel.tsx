import React from 'react';
import { Section } from './Section';
import { HistoryItem } from '../types';

interface HistoryPanelProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onSelect, onClear }) => {
  if (history.length === 0) {
    return null; // Don't render anything if there's no history
  }

  return (
    <Section title="Lịch sử tạo ảnh">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={onClear}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold text-sm py-2 px-4 rounded-lg transition-colors"
          >
            Xoá lịch sử
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {history.map((item) => (
            <div
              key={item.id}
              className="group relative cursor-pointer aspect-[4/5] overflow-hidden rounded-lg shadow-lg"
              onClick={() => onSelect(item)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(item)}
              role="button"
              tabIndex={0}
              aria-label="Tải lại ảnh và cài đặt"
            >
              <img
                src={item.image}
                alt="Generated image from history"
                className="w-full h-full object-cover border-2 border-slate-700 group-hover:border-amber-500 transition-all duration-300 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2">
                <p className="text-white font-bold text-center text-sm">Tải lại</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
