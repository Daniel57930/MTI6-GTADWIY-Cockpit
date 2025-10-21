/**
 * Face++ Avatar Connector
 * 
 * Analyzes and creates emotional avatar expressions using Face++
 * API Key and Secret from process.env.FACEPLUSPLUS_API_KEY and FACEPLUSPLUS_API_SECRET
 */

const API_KEY = process.env.FACEPLUSPLUS_API_KEY;
const API_SECRET = process.env.FACEPLUSPLUS_API_SECRET;
const BASE_URL = "https://api-us.faceplusplus.com/facepp/v3";

/**
 * Analyze emotional expression from image
 * @param {string} imageUrl - URL of face image
 * @returns {Promise<object>} Emotion analysis
 */
export async function analyzeEmotionalExpression(imageUrl) {
  const url = `${BASE_URL}/detect`;
  
  try {
    const formData = new FormData();
    formData.append('api_key', API_KEY);
    formData.append('api_secret', API_SECRET);
    formData.append('image_url', imageUrl);
    formData.append('return_attributes', 'emotion');
    
    const response = await fetch(url, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) throw new Error(`Face++ API error: ${response.status}`);
    const data = await response.json();
    return {
      emotions: data.faces[0]?.attributes?.emotion || {},
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error("Face++ emotion analysis error:", error.message);
    return null;
  }
}

/**
 * Generate avatar emotional profile
 * @param {object} targetEmotions - Desired emotional states
 * @returns {object} Avatar emotional configuration
 */
export function generateEmotionalProfile(targetEmotions) {
  return {
    emotionalState: targetEmotions,
    expressionSettings: {
      happiness: targetEmotions.happiness || 50,
      sadness: targetEmotions.sadness || 10,
      anger: targetEmotions.anger || 5,
      surprise: targetEmotions.surprise || 20,
      fear: targetEmotions.fear || 5,
      disgust: targetEmotions.disgust || 5,
      neutral: targetEmotions.neutral || 30
    },
    timestamp: new Date().toISOString()
  };
}

export default {
  analyzeEmotionalExpression,
  generateEmotionalProfile
};
