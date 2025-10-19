import { getIntelligenceApiKey } from './intelligenceApis';

const FACE_API_BASE = "https://api-us.faceplusplus.com/facepp/v3/detect";
const API_KEY = getIntelligenceApiKey("faceplusplus");

// Usage: await detectEmotion(imageUrl)
export async function detectEmotion(imageUrl) {
  if (!API_KEY) throw new Error("Face++ API key missing");
  const formData = new URLSearchParams();
  formData.append("api_key", API_KEY);
  // formData.append("api_secret", ""); // Add your api_secret if needed
  formData.append("image_url", imageUrl);
  formData.append("return_attributes", "emotion");

  const res = await fetch(FACE_API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formData.toString(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error_message || "Face++ API error");
  return data;
}