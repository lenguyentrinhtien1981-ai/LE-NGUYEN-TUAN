// FIX: Creating Generator.tsx to manage state and logic for the image generator section.
import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { ControlsPanel } from './ControlsPanel';
import { OutputPanel } from './OutputPanel';
import { Section } from './Section';
import { GenerationOptions, HistoryItem } from '../types';
import { generateImage, enhanceImage } from '../services/geminiService';
import { CONCEPTS, AGES, QUICK_OUTFITS, QUICK_SETTINGS, QUICK_PROPS, QUICK_EXPRESSIONS } from '../constants';
import { HistoryPanel } from './HistoryPanel';

export const Generator: React.FC = () => {
  // FIX: Updated initial state to remove gender and add height, weight, and faceReferenceImage.
  const [options, setOptions] = useState<GenerationOptions>({
    height: '175',
    weight: '70',
    age: AGES[3], // Trung niên
    concept: CONCEPTS[0],
    outfit: QUICK_OUTFITS[0],
    setting: QUICK_SETTINGS[0],
    props: QUICK_PROPS[0],
    expression: QUICK_EXPRESSIONS[0],
    lighting: '',
    composition: '',
    angles: '',
    background: '',
    creativeTechnique: '',
    aspectRatio: '4:5',
    faceReferenceImage: null,
    propsReferenceImage: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('generationHistory');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (e) {
      console.error("Failed to parse history from localStorage", e);
      localStorage.removeItem('generationHistory');
    }
  }, []);

  const handleOptionsChange = (newOptions: Partial<GenerationOptions>) => {
    setOptions(prev => ({ ...prev, ...newOptions }));
  };
  
  // FIX: Added a robust watermarking function using HTML canvas.
  const addWatermark = (imageUrl: string): Promise<string> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) return resolve(imageUrl);

            ctx.drawImage(img, 0, 0);

            // Watermark style
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            const padding = img.width * 0.02;
            const baseFontSize = Math.max(12, img.width / 60);

            const mainText = 'LÊ CÔNG NĂNG';
            const subText = 'Prompt by';

            // Draw sub text
            ctx.font = `normal ${baseFontSize * 0.75}px Inter, sans-serif`;
            ctx.fillText(subText, padding, canvas.height - padding - baseFontSize - (baseFontSize * 0.2));

            // Draw main text
            ctx.font = `bold ${baseFontSize}px Montserrat, sans-serif`;
            ctx.fillText(mainText, padding, canvas.height - padding);

            resolve(canvas.toDataURL('image/jpeg'));
        };
        img.onerror = () => resolve(imageUrl); // Return original if fails
        img.src = imageUrl;
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setImage(null);
    try {
      const generatedImageUrl = await generateImage(options);
      const watermarkedImageUrl = await addWatermark(generatedImageUrl);
      setImage(watermarkedImageUrl);

      const newHistoryItem: HistoryItem = {
        id: Date.now(),
        image: watermarkedImageUrl,
        options: { ...options, faceReferenceImage: null, propsReferenceImage: null }, // Don't store the file object
      };

      setHistory(prevHistory => {
        const updatedHistory = [newHistoryItem, ...prevHistory].slice(0, 10);
        localStorage.setItem('generationHistory', JSON.stringify(updatedHistory));
        return updatedHistory;
      });

    } catch (err: any) {
      setError(err.message || 'Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.');
      setImage(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnhanceImage = async (quality: '4k' | '8k') => {
    if (!image) {
        setError("Không có ảnh để nâng cấp.");
        return;
    }
    setIsEnhancing(true);
    setError(null);
    try {
        const enhancedImageUrl = await enhanceImage(image, quality);
        const watermarkedImageUrl = await addWatermark(enhancedImageUrl);
        setImage(watermarkedImageUrl);
    } catch (err: any) {
        setError(err.message || 'Lỗi khi nâng cấp ảnh.');
    } finally {
        setIsEnhancing(false);
    }
  };

  const handleHistorySelect = (item: HistoryItem) => {
    setImage(item.image);
    setOptions({ ...item.options, faceReferenceImage: null, propsReferenceImage: null }); // Don't load file object
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('generationHistory');
  };


  return (
    <>
      <Section id="generator">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <Card>
            <ControlsPanel
              options={options}
              onOptionsChange={handleOptionsChange}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </Card>
          <Card className="flex flex-col">
            <OutputPanel
              image={image}
              isLoading={isLoading}
              isEnhancing={isEnhancing}
              error={error}
              concept={options.concept}
              onEnhance={handleEnhanceImage}
            />
          </Card>
        </div>
      </Section>
      <HistoryPanel history={history} onSelect={handleHistorySelect} onClear={handleClearHistory} />
    </>
  );
};