// services/geminiService.ts
import { GoogleGenAI } from "@google/genai";
import type { PlantData } from "../types";
import {
  MODEL_NAME,
  PLANT_RESPONSE_SCHEMA,
  SYSTEM_INSTRUCTION,
} from "../constants";

// Helper to convert file to Base64
const fileToGenerativePart = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = base64String.split(",")[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const identifyPlant = async (imageFile: File): Promise<PlantData> => {
  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const base64Image = await fileToGenerativePart(imageFile);

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [
        {
          inlineData: {
            mimeType: imageFile.type,
            data: base64Image,
          },
        },
        {
          text: "Identify this. If it's a plant, tree, or mushroom, provide details including medicinal values and hazards.",
        },
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: PLANT_RESPONSE_SCHEMA,
        temperature: 0.2, // Low temperature for factual accuracy
      },
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("Empty response from AI service.");
    }

    const result = JSON.parse(jsonText);

    if (!result.isPlant) {
      throw new Error(
        "This does not appear to be a plant, tree, or mushroom. Please try a clearer photo."
      );
    }

    return {
      scientificName: result.scientificName,
      commonName: result.commonName,
      description: result.description,
      translations: result.translations,
      medicinalProperties: result.medicinalProperties,
      hazard: result.hazard,
      confidence: result.confidence,
    };
  } catch (error: any) {
    console.error("Plant Identification Error:", error);
    throw new Error(
      error.message ||
        "Failed to identify plant. Please check your connection and try again."
    );
  }
};
