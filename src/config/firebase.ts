import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDSNNnhCbLtYrkWO-tZfzbIgfxZy5GUPiQ",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "ai-resume-cover-builder.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "ai-resume-cover-builder",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "ai-resume-cover-builder.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "684318815150",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:684318815150:web:4d0078ab3a02b51aca0e3f"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export default app