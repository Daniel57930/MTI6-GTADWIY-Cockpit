/**
 * Hugging Face Avatar Connector
 * 
 * Creates avatars using Hugging Face models
 * API Key from process.env.HUGGINGFACE_API_KEY
 */

const API_KEY = process.env.HUGGINGFACE_API_KEY;
const BASE_URL = "https://api-inference.huggingface.co/models";

/**
 * Generate avatar image using Stable Diffusion
 * @param {string} prompt - Avatar description
 * @returns {Promise<object>} Avatar image
 */
export async function generateAvatarImage(prompt) {
  const modelUrl = `${BASE_URL}/stabilityai/stable-diffusion-2-1`;
  
  try {
    const response = await fetch(modelUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: prompt })
    });
    
    if (!response.ok) throw new Error(`Hugging Face API error: ${response.status}`);
    const blob = await response.blob();
    return {
      image: blob,
      prompt,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error("Hugging Face avatar image error:", error.message);
    return null;
  }
}

/**
 * Generate avatar text description
 * @param {string} characteristics - Avatar characteristics
 * @returns {Promise<object>} Generated description
 */
export async function generateAvatarDescription(characteristics) {
  const modelUrl = `${BASE_URL}/gpt2`;
  const prompt = `Describe an avatar with these characteristics: ${characteristics}`;
  
  try {
    const response = await fetch(modelUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: prompt })
    });
    
    if (!response.ok) throw new Error(`Hugging Face API error: ${response.status}`);
    const data = await response.json();
    return {
      description: data[0].generated_text,
      characteristics,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error("Hugging Face avatar description error:", error.message);
    return null;
  }
}

export default {
  generateAvatarImage,
  generateAvatarDescription
};
