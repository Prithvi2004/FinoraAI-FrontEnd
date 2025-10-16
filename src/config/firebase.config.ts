// Firebase Client SDK Configuration
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDnot_zlEtRzA_FL-gE8LkQm4wkOcUqWWs",
  authDomain: "finora-6b8b9.firebaseapp.com",
  projectId: "finora-6b8b9",
  storageBucket: "finora-6b8b9.firebasestorage.app",
  messagingSenderId: "1011322130413",
  appId: "1:1011322130413:web:ca7674e5c4c3f68a99a1e4",
  measurementId: "G-YDVZ6Q7V7Z",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics, firebaseConfig };
