# AI Resume Builder Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn

## Installation Steps

1. Open PowerShell or Command Prompt as Administrator

2. Navigate to the project directory:
```bash
cd c:\Users\Admin\OneDrive\Desktop\AI-Resume-Cover-Builder
```

3. Install dependencies:
```bash
npm install
# or
yarn install
```

4. Required packages:
- @google/generative-ai: For AI content generation
- react: Frontend framework
- react-dom: React DOM renderer
- react-router-dom: For routing
- tailwindcss: For styling
- firebase: For authentication and storage

5. Environment Variables:
Create a `.env` file in the root directory with:
```
VITE_GEMINI_API_KEY=your_gemini_api_key
```

6. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Troubleshooting

If you encounter PowerShell execution policy issues:

1. Open PowerShell as Administrator
2. Run:
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```
3. Try installing dependencies again

## Note
Make sure to replace the Gemini API key in `src/config/gemini.js` with your actual API key from Google AI Studio.
