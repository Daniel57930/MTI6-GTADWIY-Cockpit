/**
 * Together AI Intelligence Module
 * 
 * Provides AI reasoning and text generation using Together AI
 * API Key from process.env.TOGETHERAI_API_KEY
 */

const API_KEY = process.env.TOGETHERAI_API_KEY;
const BASE_URL = "https://api.together.xyz/v1";

/**
 * Generate text completion
 * @param {string} prompt - Input prompt
 * @param {object} options - Generation options
 * @returns {Promise<object>} Completion result
 */
export async function generateCompletion(prompt, options = {}) {
  const url = `${BASE_URL}/chat/completions`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: options.model || 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: options.maxTokens || 512,
        temperature: options.temperature || 0.7
      })
    });
    
    if (!response.ok) throw new Error(`Together AI API error: ${response.status}`);
    const data = await response.json();
    return {
      text: data.choices[0].message.content,
      model: data.model,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error("Together AI completion error:", error.message);
    return null;
  }
}

/**
 * Analyze sentiment of text
 * @param {string} text - Text to analyze
 * @returns {Promise<object>} Sentiment analysis
 */
export async function analyzeSentiment(text) {
  const prompt = `Analyze the sentiment of this text and respond with ONLY one word (positive, negative, or neutral): "${text}"`;
  const result = await generateCompletion(prompt);
  
  if (!result) return null;
  
  return {
    sentiment: result.text.toLowerCase().trim(),
    originalText: text,
    timestamp: new Date().toISOString()
  };
}

export default {
  generateCompletion,
  analyzeSentiment
};
