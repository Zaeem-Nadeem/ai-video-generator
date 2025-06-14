import GeminiService from '../services/geminiService.js';
import { buildRealEstatePrompt } from '../utils/promptBuilder.js';

class RealEstateController {
  constructor() {
    this.geminiService = GeminiService;
    this.validTourStyles = ['professional', 'casual', 'luxury', 'family-friendly', 'modern'];
    this.validNarrationStyles = ['informative', 'enthusiastic', 'conversational', 'authoritative', 'friendly'];
    this.validFocusAreas = ['kitchen', 'bedrooms', 'bathrooms', 'living room', 'outdoor space', 'master suite', 'garage', 'basement'];
  }

  async generateVideo(req, res) {
    try {
      // Validate required fields
      const { tourStyle, narrationStyle, focusAreas } = req.body;

      if (!tourStyle || !narrationStyle || !focusAreas) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: tourStyle, narrationStyle, and focusAreas are required',
          receivedFields: Object.keys(req.body)
        });
      }

      // Validate focusAreas is an array
      if (!Array.isArray(focusAreas) || focusAreas.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'focusAreas must be a non-empty array of strings'
        });
      }

      // Validate tour style
      if (!this.validTourStyles.includes(tourStyle.trim())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid tour style',
          validStyles: this.validTourStyles
        });
      }

      // Validate narration style
      if (!this.validNarrationStyles.includes(narrationStyle.trim())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid narration style',
          validStyles: this.validNarrationStyles
        });
      }

      // Extract all parameters
      const videoData = {
        tourStyle: tourStyle.trim(),
        narrationStyle: narrationStyle.trim(),
        focusAreas: focusAreas.map(area => area.trim()),
        tourDuration: req.body.tourDuration?.trim() || '2-3 minutes',
        additionalRequirements: req.body.additionalRequirements?.trim() || ''
      };

      console.log('Generating real estate video with data:', videoData);
      const result = await this.geminiService.generateRealEstateVideo(videoData);
      
      // Check if we got a default response (no API key or error)
      const isDefaultResponse = result.metadata?.isDefault;
      
      res.status(200).json({
        success: true,
        message: isDefaultResponse ? 'Using default video (no API key or error occurred)' : 'Real estate video generated successfully',
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
      const { tourStyle, narrationStyle, focusAreas, tourDuration } = req.body;

      const validationResults = {
        tourStyle: {
          valid: this.validTourStyles.includes(tourStyle?.trim()),
          suggestions: this.validTourStyles
        },
        narrationStyle: {
          valid: this.validNarrationStyles.includes(narrationStyle?.trim()),
          suggestions: this.validNarrationStyles
        },
        focusAreas: {
          valid: Array.isArray(focusAreas) && 
                 focusAreas.length > 0 && 
                 focusAreas.every(area => this.validFocusAreas.includes(area.trim())),
          suggestions: this.validFocusAreas
        },
        tourDuration: {
          valid: !tourDuration || (typeof tourDuration === 'string' && tourDuration.trim().length > 0),
          suggestions: ['30 seconds', '1 minute', '2-3 minutes', '5 minutes', '10 minutes']
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
}

export default new RealEstateController();