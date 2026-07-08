import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_dlEZYXOWbOtjPnCN_lclxouOwz5Sm-Q",
  authDomain: "rentoflats-5ba20.firebaseapp.com",
  projectId: "rentoflats-5ba20",
  storageBucket: "rentoflats-5ba20.firebasestorage.app",
  messagingSenderId: "186743207154",
  appId: "1:186743207154:web:a1e82333c6886a0a3bcc6b",
  measurementId: "G-SSN0SYR6LB"
};

// Initialize Firebase with prevention of multiple app instance creations
console.log("Firebase Config Check:", firebaseConfig.apiKey ? "Key exists" : "Key missing");
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
