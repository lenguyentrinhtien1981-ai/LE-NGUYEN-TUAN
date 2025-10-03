import React, { useState } from 'react';
import { DownloadIcon } from './icons/DownloadIcon';
import { FacebookIcon } from './icons/FacebookIcon';
import { TiktokIcon } from './icons/TiktokIcon';
import { MessengerIcon } from './icons/MessengerIcon';
import { EXPERT_SOCIALS } from '../constants';

interface OutputPanelProps {
  image: string | null;
  isLoading: boolean;
  isEnhancing: boolean;
  error: string | null;
  concept: string;
  onEnhance: (quality: '4k' | '8k') => void;
}

export const OutputPanel: React.FC<OutputPanelProps> = ({ image, isLoading, isEnhancing, error, onEnhance }) => {
  const [showEnhanceOptions, setShowEnhanceOptions] = useState(false);
  
  const handleDownload = () => {
    if (!image) return;
    const link = document.createElement('a');
    link.href = image;
    link.download = `studio-doanh-nhan-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEnhanceClick = (quality: '4k' | '8k') => {
    onEnhance(quality);
    setShowEnhanceOptions(false);
  };

  return (
    <div className="space-y-6">
      <div className="relative aspect-[4/5] bg-slate-800/50 border border-slate-700 rounded-2xl flex items-center justify-center p-4">
        {(isLoading || isEnhancing) && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl z-10">
            <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-lg font-semibold text-white">
              {isEnhancing ? 'Đang nâng cấp chất lượng ảnh...' : 'AI đang vẽ, vui lòng chờ trong giây lát...'}
            </p>
          </div>
        )}

        {error && !isLoading && !isEnhancing && (
          <div className="text-center text-red-400 p-4">
            <h3 className="font-bold text-lg">Lỗi!</h3>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {!image && !isLoading && !error && (
          <div className="text-center text-gray-400">
            <p className="text-lg font-semibold">Ảnh của bạn sẽ xuất hiện ở đây</p>
            <p className="text-sm">Hãy thiết lập các tuỳ chọn và bấm "Tạo ảnh"</p>
          </div>
        )}

        {image && !(isLoading || isEnhancing) && (
            <img src={image} alt="Generated entrepreneur" className="w-full h-full object-contain rounded-lg" />
        )}
      </div>

      {image && !isLoading && !isEnhancing && (
        <div className="flex flex-col items-center gap-3">
          <div className="flex justify-center items-center gap-4">
             <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                  <DownloadIcon className="w-5 h-5" />
                  <span>Tải xuống</span>
              </button>
              <button
                  onClick={() => setShowEnhanceOptions(prev => !prev)}
                  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.256 9a1 1 0 010 1.998l-3.11 1.8-1.179 4.457a1 1 0 01-1.933 0L9.854 12.8 6.744 11a1 1 0 010-1.998l3.11-1.8L11.033 2.744A1 1 0 0112 2z" clipRule="evenodd" /></svg>
                  <span>Nâng chất lượng ảnh</span>
              </button>
          </div>
          {showEnhanceOptions && (
            <div className="flex justify-center items-center gap-4 p-3 bg-slate-800 border border-slate-700 rounded-lg animate-fade-in-down">
                <button onClick={() => handleEnhanceClick('4k')} disabled={isEnhancing} className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-md transition-colors disabled:bg-slate-500">
                    Nâng lên 4K
                </button>
                 <button onClick={() => handleEnhanceClick('8k')} disabled={isEnhancing} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition-colors disabled:bg-slate-500">
                    Nâng lên 8K
                </button>
            </div>
          )}
        </div>
      )}

      <div className="text-center p-4 bg-slate-800/50 border border-slate-700 rounded-2xl">
        <h3 className="text-lg font-semibold mb-4 text-white uppercase font-montserrat">Kết nối với chuyên gia</h3>
        <div className="flex justify-center items-center gap-6">
            <a href={EXPERT_SOCIALS.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" title="Facebook">
                <FacebookIcon className="w-8 h-8"/>
            </a>
            <a href={EXPERT_SOCIALS.tiktok} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" title="TikTok">
                <TiktokIcon className="w-8 h-8"/>
            </a>
            <a href={EXPERT_SOCIALS.messenger} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" title="Messenger">
                <MessengerIcon className="w-8 h-8"/>
            </a>
        </div>
      </div>
      <style>{`
          @keyframes fade-in-down {
              0% {
                  opacity: 0;
                  transform: translateY(-10px);
              }
              100% {
                  opacity: 1;
                  transform: translateY(0);
              }
          }
          .animate-fade-in-down {
              animation: fade-in-down 0.3s ease-out;
          }
      `}</style>
    </div>
  );
};