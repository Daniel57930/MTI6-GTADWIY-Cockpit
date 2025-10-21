/**
 * Replicate Avatar Connector
 * 
 * Creates avatars using various AI models on Replicate
 * API Key from process.env.REPLICATE_API_KEY
 */

const API_KEY = process.env.REPLICATE_API_KEY;
const BASE_URL = "https://api.replicate.com/v1";

/**
 * Generate avatar using AI model
 * @param {string} modelVersion - Replicate model version
 * @param {object} input - Model input parameters
 * @returns {Promise<object>} Generated avatar
 */
export async function generateAvatar(modelVersion, input) {
  const url = `${BASE_URL}/predictions`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        version: modelVersion,
        input
      })
    });
    
    if (!response.ok) throw new Error(`Replicate API error: ${response.status}`);
    const data = await response.json();
    return {
      predictionId: data.id,
      status: data.status,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error("Replicate avatar generation error:", error.message);
    return null;
  }
}

/**
 * Get avatar generation result
 * @param {string} predictionId - Prediction ID
 * @returns {Promise<object>} Avatar result
 */
export async function getAvatarResult(predictionId) {
  const url = `${BASE_URL}/predictions/${predictionId}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Token ${API_KEY}`
      }
    });
    
    if (!response.ok) throw new Error(`Replicate API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Replicate result fetch error:", error.message);
    return null;
  }
}

export default {
  generateAvatar,
  getAvatarResult
};
