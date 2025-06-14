import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildMarketingPrompt, buildRealEstatePrompt } from '../utils/promptBuilder.js';

class GeminiService {
  constructor() {
    this.apiKey = process.env.GOOGLE_GEMINI_API_KEY || '';
    this.defaultRealEstateVideoUrl = 'https://res.cloudinary.com/ddzbiyutc/video/upload/v1749798576/7578552-uhd_3840_2160_30fps_vtesig.mp4';
    this.defaultMarketingVideoUrl = 'https://res.cloudinary.com/ddzbiyutc/video/upload/v1749801571/5319426-uhd_2160_3840_25fps_goz1wq.mp4';
    // if (!this.apiKey) {
    //   throw new Error('Google Gemini API key is required. Set GOOGLE_GEMINI_API_KEY in .env');
    // }
  }

  async generateContent(prompt, options = {}) {
    // If no API key is available, return default response
    if (!this.apiKey) {
      console.log('No Gemini API key found, returning default response');
      return {
        content: 'Default video content',
        metadata: {
          model: 'default',
          isDefault: true,
          videoUrl: options.isMarketing ? this.defaultMarketingVideoUrl : this.defaultRealEstateVideoUrl
        }
      };
    }

    const genAI = new GoogleGenerativeAI(this.apiKey);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-pro',  // Use text model for script generation
      ...options
    });

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return {
        content: response.text(),
        metadata: {
          model: 'gemini-pro',
          ...options
        }
      };
    } catch (error) {
      console.error('Content Generation Error:', error);
      // Return default response on error
      return {
        content: 'Default video content',
        metadata: {
          model: 'default',
          isDefault: true,
          videoUrl: options.isMarketing ? this.defaultMarketingVideoUrl : this.defaultRealEstateVideoUrl,
          error: error.message
        }
      };
    }
  }

  async generateMarketingVideo(params, options = {}) {
    const prompt = buildMarketingPrompt(params);
    const defaultOptions = {
      temperature: 0.7,
      maxOutputTokens: 2000,
      isMarketing: true
    };
    return this.generateContent(prompt, { ...defaultOptions, ...options });
  }

  async generateRealEstateVideo(params, options = {}) {
    const prompt = buildRealEstatePrompt(params);
    const defaultOptions = {
      temperature: 0.8,
      maxOutputTokens: 3000,
      isMarketing: false
    };
    return this.generateContent(prompt, { ...defaultOptions, ...options });
  }
}

export default new GeminiService();
