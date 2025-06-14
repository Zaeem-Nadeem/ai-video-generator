import express from 'express';
import marketingController from '../controllers/marketingController.js';

const router = express.Router();

// POST /api/marketing/generate-video
router.post('/generate-video', marketingController.generateVideo.bind(marketingController));

// POST /api/marketing/validate-parameters
router.post('/validate-parameters', marketingController.validateParameters.bind(marketingController));

// GET /api/marketing/suggested-features
router.get('/suggested-features', marketingController.getSuggestedFeatures.bind(marketingController));

// GET /api/marketing/info
router.get('/info', (req, res) => {
  res.json({
    success: true,
    message: 'Marketing Video Generation API for Suplimax Energy Drink',
    product: 'Suplimax Energy Drink',
    endpoints: {
      generateVideo: {
        method: 'POST',
        path: '/api/marketing/generate-video',
        description: 'Generate a marketing video script for Suplimax Energy Drink',
        requiredFields: ['productFeatures', 'videoTone', 'targetAudience', 'videoStyle'],
        optionalFields: ['videoDuration', 'additionalNotes']
      },
      validateParameters: {
        method: 'POST',
        path: '/api/marketing/validate-parameters',
        description: 'Validate marketing video parameters'
      },
      suggestedFeatures: {
        method: 'GET',
        path: '/api/marketing/suggested-features',
        description: 'Get suggested product features for Suplimax Energy Drink'
      }
    },
    examples: {
      generateVideo: {
        productFeatures: ['high caffeine content', 'zero sugar', 'natural ingredients', 'great taste'],
        videoTone: 'energetic',
        targetAudience: 'young adults (18-25)',
        videoStyle: 'modern',
        videoDuration: '30 seconds',
        additionalNotes: 'Include gym and outdoor activity scenes'
      }
    }
  });
});

export default router;