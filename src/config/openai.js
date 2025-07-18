import OpenAI from 'openai';

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

if (!API_KEY) {
  console.error('OpenAI API key is missing. Please check your .env file.');
}

const openai = new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateContent = async (prompt) => {
  try {
    if (!API_KEY) {
      throw new Error('API key is missing. Please check your .env file.');
    }

    console.log('Generating content with prompt:', prompt);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 2048,
    });

    const text = completion.choices[0]?.message?.content;
    
    if (!text) {
      throw new Error('Empty response from OpenAI');
    }
    
    console.log('Generated text:', text);
    return text;
  } catch (error) {
    console.error("Detailed error:", error);
    
    if (error.message.includes('API key')) {
      throw new Error('Invalid API key. Please follow these steps:' +
        '\n1. Go to https://platform.openai.com/api-keys' +
        '\n2. Create a new API key' +
        '\n3. Copy the ENTIRE key' +
        '\n4. Add it to your .env file as VITE_OPENAI_API_KEY');
    }
    
    throw new Error(`Failed to generate content: ${error.message}`);
  }
};
