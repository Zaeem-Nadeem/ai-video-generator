import GeminiService from '../services/geminiService.js';
import { buildMarketingPrompt } from '../utils/promptBuilder.js';

class MarketingController {
  constructor() {
    this.geminiService = GeminiService;
  }

  async generateVideo(req, res) {
    try {
      // Validate required fields
      const { productFeatures, videoTone, targetAudience, videoStyle } = req.body;

      if (!productFeatures || !videoTone || !targetAudience || !videoStyle) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: productFeatures, videoTone, targetAudience, and videoStyle are required',
          receivedFields: Object.keys(req.body)
        });
      }

      // Validate productFeatures is an array
      if (!Array.isArray(productFeatures) || productFeatures.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'productFeatures must be a non-empty array of strings'
        });
      }

      // Extract all parameters
      const videoData = {
        productFeatures: productFeatures.map(feature => feature.trim()),
        videoTone: videoTone.trim(),
        targetAudience: targetAudience.trim(),
        videoStyle: videoStyle.trim(),
        videoDuration: req.body.videoDuration?.trim() || '30 seconds',
        additionalNotes: req.body.additionalNotes?.trim() || ''
      };

      console.log('Generating marketing video with data:', videoData);

      // Generate content using Gemini
      const result = await this.geminiService.generateMarketingVideo(videoData);
      
      // Check if we got a default response (no API key or error)
      const isDefaultResponse = result.metadata?.isDefault;
      
      res.status(200).json({
        success: true,
        message: isDefaultResponse ? 'Using default video (no API key or error occurred)' : 'Marketing video generated successfully',
        data: {
          videoUrl: isDefaultResponse ? result.metadata.videoUrl : result.content,
          parameters: videoData,
          isDefaultResponse
        }
      });

    } catch (error) {
      console.error('Error in generateVideo:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to generate video',
        error: error.message
      });
    }
  }


  async validateParameters(req, res) {
    try {
      const { productFeatures, videoTone, targetAudience, videoStyle, videoDuration } = req.body;

      const validationResults = {
        productFeatures: {
          valid: Array.isArray(productFeatures) && productFeatures.length > 0,
          suggestions: [
            'high caffeine content',
            'natural ingredients',
            'zero sugar',
            'great taste',
            'long-lasting energy',
            'vitamin enriched',
            'performance boost',
            'mental focus'
          ]
        },
        videoTone: {
          valid: typeof videoTone === 'string' && videoTone.trim().length > 0,
          suggestions: ['energetic', 'bold', 'inspiring', 'dynamic', 'motivational', 'edgy', 'fun', 'professional']
        },
        targetAudience: {
          valid: typeof targetAudience === 'string' && targetAudience.trim().length > 0,
          suggestions: [
            'young adults (18-25)',
            'fitness enthusiasts',
            'gamers',
            'students',
            'professionals',
            'athletes',
            'active lifestyle',
            'millennials'
          ]
        },
        videoStyle: {
          valid: typeof videoStyle === 'string' && videoStyle.trim().length > 0,
          suggestions: ['modern', 'cinematic', 'fast-paced', 'minimalist', 'vibrant', 'urban', 'lifestyle', 'action-packed']
        },
        videoDuration: {
          valid: !videoDuration || (typeof videoDuration === 'string' && videoDuration.trim().length > 0),
          suggestions: ['15 seconds', '30 seconds', '60 seconds', '90 seconds', '2 minutes']
        }
      };

      const isValid = Object.values(validationResults).every(result => result.valid);

      res.status(200).json({
        success: true,
        valid: isValid,
        validationResults,
        message: isValid ? 'All parameters are valid' : 'Some parameters need attention'
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Parameter validation failed',
        error: error.message
      });
    }
  }


  async getSuggestedFeatures(req, res) {
    try {
      const suggestedFeatures = {
        energyFeatures: [
          'High caffeine content (200mg per can)',
          'Long-lasting energy boost',
          'No crash or jitters',
          'Quick energy absorption'
        ],
        healthFeatures: [
          'Zero sugar formula',
          'Natural ingredients',
          'Vitamin B complex enriched',
          'Electrolyte balance',
          'Low calorie content'
        ],
        performanceFeatures: [
          'Enhanced mental focus',
          'Improved physical performance',
          'Faster recovery time',
          'Increased alertness'
        ],
        tasteFeatures: [
          'Refreshing taste',
          'Multiple flavor options',
          'Smooth texture',
          'No artificial aftertaste'
        ]
      };

      res.status(200).json({
        success: true,
        message: 'Suggested features for Suplimax Energy Drink',
        data: suggestedFeatures,
        totalFeatures: Object.values(suggestedFeatures).flat().length
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to get suggested features',
        error: error.message
      });
    }
  }
}

export default new MarketingController();