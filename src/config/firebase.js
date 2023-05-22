import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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

// const playersCollectionRefs = collection(dataBase, "players");
// const clubsCollectionRefs = collection(dataBase, "clubs");

// export const savePlayer = async (player) => {
//   try {
//     const docRef = doc(dataBase, "players", player.id);
//     await setDoc(docRef, player);
//     const data = await getDocs(playersCollectionRefs);
//     const list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//     return list
//   } catch (error) {
//     console.error(error);
//   }
// };
// export const saveTeam = async (team) => {
//   try {
//     const docRef = doc(dataBase, "clubs", team.id);
//     await setDoc(docRef, team);
//     const data = await getDocs(clubsCollectionRefs);
//     const list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//     return list;
//   } catch (error) {
//     console.error(error);
//   }
// };
