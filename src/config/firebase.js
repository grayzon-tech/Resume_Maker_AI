import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDSNNnhCbLtYrkWO-tZfzbIgfxZy5GUPiQ",
  authDomain: "ai-resume-cover-builder.firebaseapp.com",
  projectId: "ai-resume-cover-builder",
  storageBucket: "ai-resume-cover-builder.firebasestorage.app",
  messagingSenderId: "684318815150",
  appId: "1:684318815150:web:4d0078ab3a02b51aca0e3f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
