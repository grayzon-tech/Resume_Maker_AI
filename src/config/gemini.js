import { GoogleGenerativeAI } from "@google/generative-ai";

// Load API key from environment variable
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error('Gemini API key is missing. Please check your .env file.');
}

// Initialize the API
const genAI = new GoogleGenerativeAI(API_KEY, {
  apiEndpoint: "https://generativelanguage.googleapis.com/v1beta/models",
});

export const generateContent = async (prompt) => {
  try {
    if (!API_KEY) {
      throw new Error('API key is missing. Please check your .env file.');
    }

    console.log('Generating content with prompt:', prompt);

    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    });

    // Create a chat instance
    const chat = model.startChat();
    const result = await chat.sendMessage(prompt);
    const response = result.response;
    const text = response.text();

    if (!text) {
      throw new Error('Empty response from Gemini AI');
    }

    console.log('Generated text:', text);
    return text;
  } catch (error) {
    console.error("Detailed error:", error);

    if (error.message.includes('API key')) {
      throw new Error('Invalid API key. Please follow these steps:' +
        '\n1. Go to https://makersuite.google.com/app/apikey' +
        '\n2. Create a new API key' +
        '\n3. Copy the ENTIRE key (it should start with "AIza")' +
        '\n4. Replace the existing key in your .env file');
    }

    if (error.message.includes('models/gemini-pro is not found')) {
      throw new Error('Unable to access Gemini API. Please:' +
        '\n1. Go to https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com' +
        '\n2. Make sure you are logged in with the same Google account' +
        '\n3. Click Enable' +
        '\n4. Wait 5-10 minutes for the API to be fully enabled');
    }

    throw new Error(`Failed to generate content: ${error.message}`);
  }
};
