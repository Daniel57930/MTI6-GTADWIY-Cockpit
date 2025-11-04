/**
 * OpenAI Avatar Connector
 * 
 * Creates AI-generated avatars and personalities using OpenAI
 * API Key from process.env.OPENAI_API_KEY
 */

import { getApiKey } from '../../src/lib/envGuard.js';

const API_KEY = getApiKey("openai");
const BASE_URL = "https://api.openai.com/v1";

/**
 * Generate avatar personality profile
 * @param {object} traits - Personality traits
 * @returns {Promise<object>} Avatar personality
 */
export async function generateAvatarPersonality(traits) {
  if (!API_KEY) {
    console.warn("OpenAI API key is missing. Set OPENAI_API_KEY, REACT_APP_OPENAI_API_KEY, or VITE_OPENAI_API_KEY environment variable.");
    return null;
  }
  
  const prompt = `Create a detailed personality profile for an AI bot avatar with these traits: ${JSON.stringify(traits)}`;
  
  try {
    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }]
      })
    });
    
    if (!response.ok) throw new Error(`OpenAI API error: ${response.status}`);
    const data = await response.json();
    return {
      personality: data.choices[0].message.content,
      traits,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error("OpenAI avatar personality error:", error.message);
    return null;
  }
}

/**
 * Generate avatar image using DALL-E
 * @param {string} description - Avatar description
 * @returns {Promise<object>} Avatar image URL
 */
export async function generateAvatarImage(description) {
  if (!API_KEY) {
    console.warn("OpenAI API key is missing. Set OPENAI_API_KEY, REACT_APP_OPENAI_API_KEY, or VITE_OPENAI_API_KEY environment variable.");
    return null;
  }
  
  try {
    const response = await fetch(`${BASE_URL}/images/generations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        prompt: description,
        n: 1,
        size: "256x256"
      })
    });
    
    if (!response.ok) throw new Error(`OpenAI API error: ${response.status}`);
    const data = await response.json();
    return {
      imageUrl: data.data[0].url,
      description,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error("OpenAI avatar image error:", error.message);
    return null;
  }
}

export default {
  generateAvatarPersonality,
  generateAvatarImage
};
