import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD9NJg_dZxLqW4VNebJxPH9gmqDesM32RM",
  authDomain: "game-plan-creator.firebaseapp.com",
  projectId: "game-plan-creator",
  storageBucket: "game-plan-creator.appspot.com",
  messagingSenderId: "405089418751",
  appId: "1:405089418751:web:59bac087fe3051bbaa7bca",
  measurementId: "G-KTQNFX6FBW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const dataBase = getFirestore(app);
export const storage = getStorage(app)

