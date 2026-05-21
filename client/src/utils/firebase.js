// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "devoraui.firebaseapp.com",
  projectId: "devoraui",
  storageBucket: "devoraui.firebasestorage.app",
  messagingSenderId: "591303377075",
  appId: "1:591303377075:web:b1d64d2230cd6a5678b0c6",
  measurementId: "G-4QRMMHFYE4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth, provider}