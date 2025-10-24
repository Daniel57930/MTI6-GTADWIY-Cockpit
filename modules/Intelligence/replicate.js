/**
 * Replicate Intelligence Module
 * 
 * Provides AI model inference using Replicate
 * API Key from process.env.REPLICATE_API_KEY
 */

const API_KEY = process.env.REPLICATE_API_KEY;
const BASE_URL = "https://api.replicate.com/v1";

/**
 * Run AI model prediction
 * @param {string} modelVersion - Model version ID
 * @param {object} input - Model input
 * @returns {Promise<object>} Prediction result
 */
export async function runPrediction(modelVersion, input) {
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
    console.error("Replicate prediction error:", error.message);
    return null;
  }
}

/**
 * Get prediction result
 * @param {string} predictionId - Prediction ID
 * @returns {Promise<object>} Result
 */
export async function getPredictionResult(predictionId) {
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
  runPrediction,
  getPredictionResult
};
