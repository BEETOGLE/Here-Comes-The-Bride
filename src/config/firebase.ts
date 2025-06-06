import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getAnalytics, Analytics } from 'firebase/analytics';
import { getFirestore, Firestore } from 'firebase/firestore';

// Firebase configuration with environment variables and fallbacks
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyBnz1uazfXDGLF4ymlpHFgsqluZih161yc",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "here-comes-the-bride.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "here-comes-the-bride",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "here-comes-the-bride.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "28319259817",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:28319259817:web:1019660619c3d606f91db8",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-R7L653G5ND"
};

// Validate Firebase configuration
const validateFirebaseConfig = () => {
  const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
  const missingFields = requiredFields.filter(field => !firebaseConfig[field as keyof typeof firebaseConfig]);
  
  if (missingFields.length > 0) {
    console.error('❌ Firebase configuration error - missing fields:', missingFields);
    throw new Error(`Firebase configuration missing required fields: ${missingFields.join(', ')}`);
  }
  
  // Log configuration in development (but not the full API key for security)
  if (process.env.NODE_ENV === 'development') {
    console.log('🔥 Firebase configuration:', {
      ...firebaseConfig,
      apiKey: firebaseConfig.apiKey ? `${firebaseConfig.apiKey.substring(0, 10)}...` : 'undefined'
    });
  }
  
  // In production, log only the project ID and domain for verification
  if (process.env.NODE_ENV === 'production') {
    console.log('🔥 Firebase production config:', {
      projectId: firebaseConfig.projectId,
      authDomain: firebaseConfig.authDomain,
      hasApiKey: !!firebaseConfig.apiKey,
      hasAppId: !!firebaseConfig.appId
    });
  }
};

// Validate configuration before initializing
validateFirebaseConfig();

// Initialize Firebase with error handling
let app: FirebaseApp;
let auth: Auth;
let analytics: Analytics | undefined;
let db: Firestore;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  
  // Only initialize analytics in production and if measurementId is available
  if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
    try {
      analytics = getAnalytics(app);
    } catch (analyticsError) {
      console.warn('⚠️ Analytics initialization failed:', analyticsError);
    }
  }
  
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
  throw error;
}

export { auth, analytics, db };
export default app; 