  import express from 'express';
  import realEstateController from '../controllers/realEstateController.js';

  const router = express.Router();

  // POST /api/real-estate/generate-video
  router.post('/generate-video', realEstateController.generateVideo.bind(realEstateController));

  // POST /api/real-estate/validate-parameters
  router.post('/validate-parameters', realEstateController.validateParameters.bind(realEstateController));

  // GET /api/real-estate/info
  router.get('/info', (req, res) => {
    res.json({
      success: true,
      message: 'Real Estate Video Generation API',
      endpoints: {
        generateVideo: {
          method: 'POST',
          path: '/api/real-estate/generate-video',
          description: 'Generate a real estate property video tour script',
          requiredFields: ['tourStyle', 'narrationStyle', 'focusAreas'],
          optionalFields: ['tourDuration', 'additionalRequirements'],
          validValues: {
            tourStyle: ['professional', 'casual', 'luxury', 'family-friendly', 'modern'],
            narrationStyle: ['informative', 'enthusiastic', 'conversational', 'authoritative', 'friendly'],
            focusAreas: ['kitchen', 'bedrooms', 'bathrooms', 'living room', 'outdoor space', 'master suite', 'garage', 'basement']
          }
        },
        validateParameters: {
          method: 'POST',
          path: '/api/real-estate/validate-parameters',
          description: 'Validate real estate video parameters'
        }
      },
      examples: {
        generateVideo: {
          tourStyle: 'professional',
          narrationStyle: 'informative',
          focusAreas: ['kitchen', 'bedrooms', 'living room', 'outdoor space'],
          tourDuration: '3 minutes',
          additionalRequirements: 'Focus on luxury finishes and smart home features'
        }
      }
    });
  });

  export default router;