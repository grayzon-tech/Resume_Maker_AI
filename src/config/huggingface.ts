import { HfInference } from '@huggingface/inference'

const API_KEY = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY
const HF_API_URL = "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct"

if (!API_KEY) {
  console.error('HuggingFace API key is missing. Please check your .env file.')
}

// Initialize with custom fetch options
const hf = new HfInference(API_KEY, {
  fetch: (url: string, options: any) => {
    // Add CORS headers
    const newOptions = {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    }
    return fetch(url, newOptions)
  }
})

export const generateContent = async (prompt: string): Promise<string> => {
  try {
    if (!API_KEY) {
      throw new Error('API key is missing. Please check your .env file.')
    }

    console.log('Generating content with prompt:', prompt)

    const response = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    const text = result[0]?.generated_text

    if (!text) {
      throw new Error('No text was generated')
    }

    // Clean up the response to ensure we only get the bullet points
    const cleanText = text
      .split('\n')
      .filter((line: string) => line.trim().startsWith('•'))
      .join('\n')

    console.log('Generated text:', cleanText || text)
    return cleanText || text // Fallback to original text if no bullet points found
  } catch (error: any) {
    console.error("Detailed error:", error)
    
    if (error.message.includes('API key')) {
      throw new Error('Invalid API key. Please follow these steps:' +
        '\n1. Go to https://huggingface.co/settings/tokens' +
        '\n2. Create a new API key' +
        '\n3. Select "write" access when creating the token' +
        '\n4. Copy the ENTIRE key' +
        '\n5. Add it to your .env file as NEXT_PUBLIC_HUGGINGFACE_API_KEY')
    }
    
    if (error.message.includes('sufficient permissions')) {
      throw new Error('Insufficient permissions. Please:' +
        '\n1. Go to https://huggingface.co/settings/tokens' +
        '\n2. Delete your existing token' +
        '\n3. Create a new token with "write" access' +
        '\n4. Update your .env file with the new token')
    }

    if (error.message.includes('HTTP error!')) {
      throw new Error('Service temporarily unavailable. Please try again in a few moments.')
    }
    
    throw new Error(`Failed to generate content: ${error.message}`)
  }
}