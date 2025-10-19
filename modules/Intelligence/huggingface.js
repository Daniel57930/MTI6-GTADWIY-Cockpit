import { getIntelligenceApiKey } from './intelligenceApis';

const HUGGINGFACE_API_BASE = "https://api-inference.huggingface.co";
const API_KEY = getIntelligenceApiKey("huggingface");

async function huggingfaceRequest(path, method = "POST", body = {}) {
  if (!API_KEY) throw new Error("Hugging Face API key missing");
  const res = await fetch(`${HUGGINGFACE_API_BASE}${path}`, {
    method,
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: Object.keys(body).length ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Hugging Face API error");
  return data;
}

// Text generation
export async function huggingfaceTextGeneration({model="bigscience/bloom", inputs}) {
  return huggingfaceRequest(`/models/${model}`, "POST", {inputs});
}

// Image classification
export async function huggingfaceImageClassification({model="google/vit-base-patch16-224", inputs}) {
  return huggingfaceRequest(`/models/${model}`, "POST", {inputs});
}