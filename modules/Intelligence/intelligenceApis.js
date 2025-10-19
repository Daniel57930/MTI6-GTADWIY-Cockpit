export const INTELLIGENCE_APIS = [
  {
    id: "togetherai",
    name: "Together AI",
    website: "https://www.together.ai/",
    docs: "https://docs.together.ai/",
    env: "TOGETHERAI_API_KEY",
  },
  {
    id: "replicate",
    name: "Replicate",
    website: "https://replicate.com/",
    docs: "https://replicate.com/docs",
    env: "REPLICATE_API_KEY",
  },
  {
    id: "openai",
    name: "OpenAI",
    website: "https://platform.openai.com/",
    docs: "https://platform.openai.com/docs/api-reference",
    env: "OPENAI_API_KEY",
  },
  {
    id: "faceplusplus",
    name: "Face++ Emotion",
    website: "https://www.faceplusplus.com/",
    docs: "https://console.faceplusplus.com/documents/5679127",
    env: "FACEPLUSPLUS_API_KEY",
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    website: "https://huggingface.co/",
    docs: "https://huggingface.co/docs/api-inference/index",
    env: "HUGGINGFACE_API_KEY",
  }
  // ... add more providers as needed
];

export function getIntelligenceApi(id) {
  return INTELLIGENCE_APIS.find(api => api.id === id);
}

export function getIntelligenceApiKey(id) {
  const api = getIntelligenceApi(id);
  return api ? process.env[api.env] : null;
}