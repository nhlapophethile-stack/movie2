import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSOLrVCUbq3KOQkoEyuoVWTWRYPhVVdqQ",
  authDomain: "movies-4180f.firebaseapp.com",
  databaseURL: "https://movies-4180f-default-rtdb.firebaseio.com",
  projectId: "movies-4180f",
  storageBucket: "movies-4180f.firebasestorage.app",
  messagingSenderId: "137906722927",
  appId: "1:137906722927:web:42aadad89e0b746842d59a",
  measurementId: "G-CMT6EC4BTW"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };
