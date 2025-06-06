import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBnz1uazfXDGLF4ymlpHFgsqluZih161yc",
  authDomain: "here-comes-the-bride.firebaseapp.com",
  projectId: "here-comes-the-bride",
  storageBucket: "here-comes-the-bride.appspot.com", // ← fixed
  messagingSenderId: "28319259817",
  appId: "1:28319259817:web:1019660619c3d606f91db8",
  measurementId: "G-R7L653G5ND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

export default app; 