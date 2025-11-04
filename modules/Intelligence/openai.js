import { getApiKey } from '../../src/lib/envGuard.js';

const OPENAI_API_BASE = "https://api.openai.com/v1";
const API_KEY = getApiKey("openai");

async function openaiRequest(path, method = "POST", body = {}) {
  if (!API_KEY) {
    throw new Error("OpenAI API key is missing. Set OPENAI_API_KEY, REACT_APP_OPENAI_API_KEY, or VITE_OPENAI_API_KEY environment variable.");
  }
  const res = await fetch(`${OPENAI_API_BASE}${path}`, {
    method,
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: Object.keys(body).length ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || "OpenAI API error");
  return data;
}

// Text completion (chat/completions endpoint)
export async function openaiChatCompletion({model="gpt-3.5-turbo", messages}) {
  return openaiRequest("/chat/completions", "POST", {model, messages});
}

// Image generation (DALL·E)
export async function openaiImageGen({prompt, n=1, size="1024x1024"}) {
  return openaiRequest("/images/generations", "POST", {prompt, n, size});
}

// Audio transcription (Whisper)
export async function openaiAudioTranscribe({file}) {
  // Note: For file upload, need to use multipart/form-data and adjust this function
  throw new Error("Audio transcription requires multipart/form-data; implement as needed.");
}