// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  enableIndexedDbPersistence, 
  initializeFirestore,
  CACHE_SIZE_UNLIMITED,
  connectFirestoreEmulator
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqX7zc6phe6iXjHy0vOtHnvTu7nvQ1b3I",
  authDomain: "react-native-987cb.firebaseapp.com",
  projectId: "react-native-987cb",
  storageBucket: "react-native-987cb.firebasestorage.app",
  messagingSenderId: "581943552185",
  appId: "1:581943552185:web:6733a6ae08740d75fb9368",
  measurementId: "G-RFYPC8MTN9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// app.firestore().settings({ experimentalForceLongPolling: true });
// const analytics = getAnalytics(app);
const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
  useFetchStreams: false,
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  merge: true,
  ignoreUndefinedProperties: true
});

// Enable offline persistence with error handling
const enablePersistence = async () => {
  try {
    await enableIndexedDbPersistence(db, {
      synchronizeTabs: true
    });
    console.log('Firestore persistence enabled successfully');
  } catch (err) {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('The current browser does not support persistence.');
    } else {
      console.error('Error enabling persistence:', err);
    }
  }
};

// Call enablePersistence
enablePersistence();

// Add retry logic for Firestore operations
const withRetry = async (operation, maxRetries = 3) => {
  let lastError;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      console.warn(`Operation failed, attempt ${i + 1} of ${maxRetries}:`, error);
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
  throw lastError;
};

// Wrap Firestore operations with retry logic
const wrappedAddDoc = (collectionRef, data) => 
  withRetry(() => addDoc(collectionRef, data));

const wrappedGetDocs = (query) => 
  withRetry(() => getDocs(query));

const wrappedDeleteDoc = (docRef) => 
  withRetry(() => deleteDoc(docRef));

export { 
  db, 
  collection, 
  doc,
  wrappedAddDoc as addDoc, 
  wrappedGetDocs as getDocs, 
  wrappedDeleteDoc as deleteDoc 
};