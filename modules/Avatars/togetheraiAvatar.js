/**
 * Together AI Avatar Connector
 * 
 * Creates avatars using Together AI models
 * API Key from process.env.TOGETHERAI_API_KEY
 */

import { getApiKey } from '../../src/lib/envGuard.js';

const API_KEY = getApiKey("togetherai");
const BASE_URL = "https://api.together.xyz/v1";

/**
 * Generate avatar personality using LLM
 * @param {object} traits - Personality traits
 * @returns {Promise<object>} Avatar personality
 */
export async function generateAvatarPersonality(traits) {
  if (!API_KEY) {
    console.warn("Together AI API key is missing. Set TOGETHERAI_API_KEY, REACT_APP_TOGETHERAI_API_KEY, or VITE_TOGETHERAI_API_KEY environment variable.");
    return null;
  }
  
  const url = `${BASE_URL}/chat/completions`;
  const prompt = `Create a unique personality profile for an AI avatar with these traits: ${JSON.stringify(traits)}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        messages: [{ role: 'user', content: prompt }]
      })
    });
    
    if (!response.ok) throw new Error(`Together AI API error: ${response.status}`);
    const data = await response.json();
    return {
      personality: data.choices[0].message.content,
      traits,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error("Together AI avatar personality error:", error.message);
    return null;
  }
}

/**
 * Generate avatar image using Together AI
 * @param {string} description - Avatar description
 * @returns {Promise<object>} Avatar image
 */
export async function generateAvatarImage(description) {
  if (!API_KEY) {
    console.warn("Together AI API key is missing. Set TOGETHERAI_API_KEY, REACT_APP_TOGETHERAI_API_KEY, or VITE_TOGETHERAI_API_KEY environment variable.");
    return null;
  }
  
  const url = `${BASE_URL}/images/generations`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'stabilityai/stable-diffusion-xl-base-1.0',
        prompt: description,
        n: 1
      })
    });
    
    if (!response.ok) throw new Error(`Together AI API error: ${response.status}`);
    const data = await response.json();
    return {
      imageUrl: data.data[0].url,
      description,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error("Together AI avatar image error:", error.message);
    return null;
  }
}

export default {
  generateAvatarPersonality,
  generateAvatarImage
};
