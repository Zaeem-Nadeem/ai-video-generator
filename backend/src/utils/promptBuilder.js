// utils/promptBuilder.js

export function buildMarketingPrompt(params) {
  return `
    Create a marketing video for "Suplimax" energy drink with these requirements:
    
    - Clearly show the product with "Suplimax" visible on the packaging
    - Highlight these features: ${params.productFeatures.join(', ')}
    - Tone: ${params.tone}
    - Target audience: ${params.targetAudience}
    - Video style: ${params.style}
    - Duration: ${params.duration} seconds
    ${params.additionalNotes ? `- Additional notes: ${params.additionalNotes}` : ''}

    Include dynamic visuals that match the energy drink's tropical flavor theme.
  `;
}

export function buildRealEstatePrompt(params) {
  return `
    Create a detailed real estate video tour script with the following requirements:
    
    Tour Style: ${params.tourStyle}
    Narration Style: ${params.narrationStyle}
    Focus Areas: ${params.focusAreas.join(', ')}
    ${params.tourDuration ? `Duration: ${params.tourDuration}` : ''}
    ${params.additionalRequirements ? `Additional Requirements: ${params.additionalRequirements}` : ''}

    Please create a professional and engaging script that:
    1. Introduces each focus area with appropriate transitions
    2. Highlights key features and selling points
    3. Uses the specified narration style to engage viewers
    4. Maintains the chosen tour style throughout
    5. Includes specific camera movements and angles for each area
    6. Incorporates any additional requirements provided

    Format the script with clear scene descriptions, camera directions, and narration text.
  `;
}
