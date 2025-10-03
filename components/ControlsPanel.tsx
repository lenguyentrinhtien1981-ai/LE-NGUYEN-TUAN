// FIX: Creating ControlsPanel.tsx to provide UI for generation options.
import React, { useState } from 'react';
import {
  AGES,
  CONCEPTS,
  ASPECT_RATIOS,
  QUICK_OUTFITS,
  QUICK_SETTINGS,
  QUICK_PROPS,
  QUICK_EXPRESSIONS,
  SHOOTING_TECHNIQUES,
} from '../constants';
import { GenerationOptions, AspectRatio } from '../types';

interface ControlsPanelProps {
  options: GenerationOptions;
  onOptionsChange: (newOptions: Partial<GenerationOptions>) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const ControlGroup: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex flex-col gap-2">
    <label className="font-semibold text-gray-300 text-sm">{label}</label>
    {children}
  </div>
);

const QuickButtons: React.FC<{ options: string[]; value: string; onSelect: (value: string) => void; }> = ({ options, value, onSelect }) => (
  <div className="flex flex-wrap gap-2">
    {options.map((opt) => (
      <button
        key={opt}
        type="button"
        onClick={() => onSelect(opt)}
        className={`px-3 py-1 text-sm rounded-full transition-colors ${
          value === opt
            ? 'bg-amber-500 text-slate-900 font-bold'
            : 'bg-slate-700 hover:bg-slate-600 text-gray-200'
        }`}
      >
        {opt}
      </button>
    ))}
  </div>
);


export const ControlsPanel: React.FC<ControlsPanelProps> = ({ options, onOptionsChange, onSubmit, isLoading }) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onOptionsChange({ [e.target.name]: e.target.value });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      onOptionsChange({ [name]: files[0] });
    } else {
      onOptionsChange({ [name]: null });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };
  
  const advancedOptionMapping: { [key: string]: keyof GenerationOptions } = {
    "Ánh sáng (Lighting)": "lighting",
    "Bố cục (Composition)": "composition",
    "Góc chụp (Angles)": "angles",
    "Hậu cảnh (Background)": "background",
    "Kỹ thuật sáng tạo (Creative Techniques)": "creativeTechnique",
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
       <ControlGroup label="Ảnh tham chiếu (Khoá gương mặt)">
        <div className="relative border-2 border-dashed border-slate-600 rounded-lg p-6 text-center cursor-pointer hover:border-amber-500 transition-colors">
          <input
            type="file"
            name="faceReferenceImage"
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Tải ảnh tham chiếu"
          />
          {options.faceReferenceImage ? (
            <div className="text-green-400 font-semibold">
              <p>✓ Đã tải lên: {options.faceReferenceImage.name}</p>
              <button 
                type="button" 
                onClick={(e) => {
                  e.stopPropagation(); 
                  onOptionsChange({ faceReferenceImage: null });
                  // Reset file input value
                  const input = document.querySelector('input[name="faceReferenceImage"]') as HTMLInputElement;
                  if (input) input.value = '';
                }} 
                className="text-xs text-red-400 hover:underline mt-1"
              >
                Xoá ảnh
              </button>
            </div>
          ) : (
            <p className="text-gray-400">Kéo thả hoặc nhấp để tải ảnh JPG/PNG</p>
          )}
        </div>
      </ControlGroup>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <ControlGroup label="Chiều cao (cm)">
            <input
              type="number"
              name="height"
              value={options.height}
              onChange={handleInputChange}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="ví dụ: 175"
            />
          </ControlGroup>
          <ControlGroup label="Cân nặng (kg)">
            <input
              type="number"
              name="weight"
              value={options.weight}
              onChange={handleInputChange}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="ví dụ: 70"
            />
          </ControlGroup>
      </div>
      
       <ControlGroup label="Độ tuổi">
          <select
            name="age"
            value={options.age}
            onChange={handleInputChange}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 focus:ring-amber-500 focus:border-amber-500"
          >
            {AGES.map(age => <option key={age} value={age}>{age}</option>)}
          </select>
        </ControlGroup>

      <ControlGroup label="Concept chính">
        <select
          name="concept"
          value={options.concept}
          onChange={handleInputChange}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 focus:ring-amber-500 focus:border-amber-500"
        >
          {CONCEPTS.map(concept => <option key={concept} value={concept}>{concept}</option>)}
        </select>
      </ControlGroup>

      <div className="space-y-4 p-4 border border-slate-700 rounded-lg">
          <h3 className="font-semibold text-amber-400">Tuỳ chỉnh chi tiết</h3>
          <ControlGroup label="Trang phục">
            <QuickButtons options={QUICK_OUTFITS} value={options.outfit} onSelect={outfit => onOptionsChange({ outfit })} />
            <input
              type="text"
              name="outfit"
              value={options.outfit}
              onChange={handleInputChange}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 mt-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="Hoặc nhập tuỳ chỉnh..."
            />
          </ControlGroup>

          <ControlGroup label="Bối cảnh">
              <QuickButtons options={QUICK_SETTINGS} value={options.setting} onSelect={setting => onOptionsChange({ setting })} />
              <input
                type="text"
                name="setting"
                value={options.setting}
                onChange={handleInputChange}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 mt-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Hoặc nhập tuỳ chỉnh..."
              />
          </ControlGroup>

          <ControlGroup label="Đạo cụ">
              <QuickButtons options={QUICK_PROPS} value={options.props} onSelect={props => onOptionsChange({ props })} />
              <input
                type="text"
                name="props"
                value={options.props}
                onChange={handleInputChange}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 mt-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Hoặc nhập tuỳ chỉnh..."
              />
              <div className="relative border-2 border-dashed border-slate-600 rounded-lg p-4 text-center cursor-pointer hover:border-amber-500 transition-colors mt-2 text-sm">
                <input
                    type="file"
                    name="propsReferenceImage"
                    accept="image/jpeg,image/png"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    aria-label="Tải ảnh đạo cụ"
                />
                {options.propsReferenceImage ? (
                    <div className="text-green-400 font-semibold">
                        <p>✓ Đạo cụ: {options.propsReferenceImage.name}</p>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onOptionsChange({ propsReferenceImage: null });
                                const input = document.querySelector('input[name="propsReferenceImage"]') as HTMLInputElement;
                                if (input) input.value = '';
                            }}
                            className="text-xs text-red-400 hover:underline mt-1"
                        >
                            Xoá ảnh
                        </button>
                    </div>
                ) : (
                    <p className="text-gray-400">Tải ảnh đạo cụ thực tế (tuỳ chọn)</p>
                )}
              </div>
          </ControlGroup>
          
          <ControlGroup label="Biểu cảm">
              <QuickButtons options={QUICK_EXPRESSIONS} value={options.expression} onSelect={expression => onOptionsChange({ expression })} />
              <input
                type="text"
                name="expression"
                value={options.expression}
                onChange={handleInputChange}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 mt-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Hoặc nhập tuỳ chỉnh..."
              />
          </ControlGroup>
      </div>

      <div className="space-y-2">
        <button
          type="button"
          onClick={() => setIsAdvancedOpen(prev => !prev)}
          className="w-full flex items-center justify-between p-3 bg-slate-700/70 hover:bg-slate-700 rounded-lg font-semibold text-amber-400 transition-all duration-300"
        >
          <span>Tuỳ chọn nâng cao</span>
          <svg className={`w-6 h-6 transform transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>

        {isAdvancedOpen && (
          <div className="p-4 space-y-4 bg-slate-800/50 border border-slate-700 rounded-b-lg animate-fade-in-down">
            {SHOOTING_TECHNIQUES.map(group => {
              const fieldName = advancedOptionMapping[group.label];
              return (
                <ControlGroup label={group.label} key={group.label}>
                  <select
                    name={fieldName}
                    value={(options as any)[fieldName]}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="">-- Không chọn --</option>
                    {group.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </ControlGroup>
              );
            })}
          </div>
        )}
      </div>

      <ControlGroup label="Tỷ lệ khung hình">
          <div className="grid grid-cols-5 gap-2">
            {ASPECT_RATIOS.map(ratio => (
                <button
                    key={ratio}
                    type="button"
                    onClick={() => onOptionsChange({ aspectRatio: ratio as AspectRatio })}
                    className={`py-2 rounded-lg font-semibold transition-colors text-sm ${
                        options.aspectRatio === ratio ? 'bg-amber-500 text-slate-900' : 'bg-slate-700 hover:bg-slate-600 text-gray-200'
                    }`}
                >
                    {ratio}
                </button>
            ))}
          </div>
      </ControlGroup>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-amber-500 text-slate-900 font-extrabold text-lg py-4 rounded-lg shadow-lg hover:bg-amber-600 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Đang tạo...
          </>
        ) : (
          'TẠO ẢNH'
        )}
      </button>
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
    </form>
  );
};