import { Type, Schema } from "@google/genai";

export const MODEL_NAME = "gemini-2.5-flash";

export const SYSTEM_INSTRUCTION = `You are an expert botanist, mycologist (mushroom expert), and taxonomist. 
Your task is to identify plants, trees, and mushrooms from images with high accuracy. 

You must provide the following details:
1. Scientific Name: The Latin binomial name.
2. Common Name: The most standard English name.
3. Description: A concise, engaging description (2-3 sentences) covering key features and origin.
4. Translations: Translate the common name into Hindi, Tamil, Kannada, Bengali, Marathi, Telugu, Gujarati, and Malayalam.
5. Medicinal Values: Describe known medicinal properties or health benefits. If none, state "No specific medicinal value known."
6. Hazard Status: Determine if the plant/mushroom is toxic, poisonous, or harmful to humans/pets. Describe the effects.

If the image is not a plant, tree, or mushroom, strictly set 'isPlant' to false.`;

export const PLANT_RESPONSE_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    scientificName: {
      type: Type.STRING,
      description: "The scientific Latin name.",
    },
    commonName: {
      type: Type.STRING,
      description: "The most widely used common English name.",
    },
    description: {
      type: Type.STRING,
      description: "A 2-3 sentence description of the plant/mushroom.",
    },
    translations: {
      type: Type.OBJECT,
      properties: {
        hindi: { type: Type.STRING },
        tamil: { type: Type.STRING },
        kannada: { type: Type.STRING },
        bengali: { type: Type.STRING },
        marathi: { type: Type.STRING },
        telugu: { type: Type.STRING },
        gujarati: { type: Type.STRING },
        malayalam: { type: Type.STRING },
      },
      required: ["hindi", "tamil", "kannada", "bengali", "marathi", "telugu", "gujarati", "malayalam"],
    },
    medicinalProperties: {
      type: Type.STRING,
      description: "List of medicinal properties/uses or 'None'.",
    },
    hazard: {
      type: Type.OBJECT,
      properties: {
        isHarmful: { type: Type.BOOLEAN, description: "True if toxic/poisonous/harmful." },
        effects: { type: Type.STRING, description: "Description of harmful effects, or 'Safe' if not harmful." },
      },
      required: ["isHarmful", "effects"],
    },
    confidence: {
      type: Type.NUMBER,
      description: "Confidence score between 0 and 1.",
    },
    isPlant: {
      type: Type.BOOLEAN,
      description: "True if the image contains a plant, tree, or mushroom.",
    }
  },
  required: ["scientificName", "commonName", "description", "translations", "medicinalProperties", "hazard", "confidence", "isPlant"],
};