// FIX: Creating geminiService.ts to encapsulate Gemini API image generation logic.
import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";
import type { GenerationOptions } from '../types';

// FIX: Initializing GoogleGenAI client according to guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToGenerativePart = async (file: File) => {
    const base64EncodedData = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
    return {
        inlineData: {
            data: base64EncodedData,
            mimeType: file.type,
        },
    };
};

// FIX: Updated generatePrompt to use height/weight and add face-lock instructions.
const generatePrompt = (options: GenerationOptions): string => {
    const {
        height,
        weight,
        age,
        concept,
        outfit,
        setting,
        props,
        expression,
        lighting,
        composition,
        angles,
        background,
        creativeTechnique,
        faceReferenceImage,
        propsReferenceImage,
    } = options;

    const ageMapping: { [key: string]: string } = {
        'Nhi đồng': 'child (10-14 years old)',
        'Thiếu niên': 'teenager (15-18 years old)',
        'Thanh niên': 'young adult (25-35 years old)',
        'Trung niên': 'middle-aged (40-55 years old)',
        'Cao niên': 'elderly (60+ years old)',
    };
    const ageEn = ageMapping[age] || 'adult';

    const techniques = [
        lighting,
        composition,
        angles,
        background,
        creativeTechnique
    ].filter(Boolean).map(t => t.split(':')[0].trim());

    const bodyMetrics = [];
    if (height) bodyMetrics.push(`Height: ${height}cm`);
    if (weight) bodyMetrics.push(`Weight: ${weight}kg`);
    
    const prompt = `
      Professional portrait photography of a Vietnamese entrepreneur.
      ${faceReferenceImage ? 'Crucially, the person in the final image must have the exact same face and facial features as the person in the provided reference image. Adapt the body and style but keep the face identical.' : ''}
      - Age group: ${ageEn}
      ${bodyMetrics.length > 0 ? `- Body Metrics: ${bodyMetrics.join(', ')}` : ''}
      - Core concept: "${concept}"
      - Attire: ${outfit}
      - Setting / Background: ${setting}
      - Props: Interacting with or holding ${props}. ${propsReferenceImage ? 'The prop should be the exact same object as shown in the provided prop reference image.' : ''}
      - Facial Expression: ${expression}
      ${techniques.length > 0 ? `- Photography techniques: ${techniques.join(', ')}` : ''}

      Important: If any text appears in the image (on books, signs, screens, etc.), it must be spelled correctly and be legible. Avoid garbled or nonsensical characters.

      The image should be photorealistic, high-detail, with cinematic lighting, and a professional look.
    `.trim().replace(/\s\s+/g, ' ');

    return prompt;
};

export const generateImage = async (options: GenerationOptions): Promise<string> => {
    const prompt = generatePrompt(options);

    try {
        if (options.faceReferenceImage || options.propsReferenceImage) {
            const parts = [];
            
            if (options.faceReferenceImage) {
                parts.push(await fileToGenerativePart(options.faceReferenceImage));
            }

            if (options.propsReferenceImage) {
                parts.push(await fileToGenerativePart(options.propsReferenceImage));
            }
            
            parts.push({ text: prompt });

            const response: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image-preview',
                contents: { parts: parts },
                config: {
                    responseModalities: [Modality.IMAGE, Modality.TEXT],
                },
            });
            
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    const base64ImageBytes: string = part.inlineData.data;
                    return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
                }
            }
            throw new Error("Không thể tạo ảnh từ ảnh tham chiếu. Model không trả về ảnh nào.");

        } else {
            const response = await ai.models.generateImages({
                model: 'imagen-4.0-generate-001',
                prompt: prompt,
                config: {
                    numberOfImages: 1,
                    outputMimeType: 'image/jpeg',
                    aspectRatio: options.aspectRatio,
                },
            });

            if (response.generatedImages && response.generatedImages.length > 0) {
                const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
                return `data:image/jpeg;base64,${base64ImageBytes}`;
            } else {
                throw new Error("Không thể tạo ảnh. API không trả về ảnh nào.");
            }
        }
    } catch (error) {
        console.error("Lỗi khi gọi Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Lỗi API: ${error.message}`);
        }
        throw new Error("Đã xảy ra lỗi không xác định khi tạo ảnh.");
    }
};

const base64ToGenerativePart = (base64Data: string, mimeType: string) => {
    const data = base64Data.split(',')[1];
    return {
        inlineData: {
            data,
            mimeType,
        },
    };
};

export const enhanceImage = async (base64Image: string, quality: '4k' | '8k'): Promise<string> => {
    const mimeType = base64Image.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)?.[1] || 'image/jpeg';
    const imagePart = base64ToGenerativePart(base64Image, mimeType);
    
    const qualityText = quality === '4k' ? '4K UHD (3840x2160 pixels)' : '8K UHD (7680x4320 pixels)';
    
    const prompt = `
      Please upscale and enhance the provided image to ${qualityText} resolution. 
      Increase the level of detail, sharpness, and texture clarity significantly. 
      The final result should be photorealistic and suitable for high-quality printing.
      Do not change the subject, composition, colors, or artistic style of the original image. Just increase its resolution and detail. If any text exists in the original image, ensure it remains sharp, clear, and unaltered.
    `.trim().replace(/\s\s+/g, ' ');

    const textPart = { text: prompt };

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: { parts: [imagePart, textPart] },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
            }
        }
        throw new Error("Model không trả về ảnh được nâng cấp.");

    } catch (error) {
        console.error("Lỗi khi gọi Gemini API để nâng cấp:", error);
        if (error instanceof Error) {
            throw new Error(`Lỗi API: ${error.message}`);
        }
        throw new Error("Đã xảy ra lỗi không xác định khi nâng cấp ảnh.");
    }
};