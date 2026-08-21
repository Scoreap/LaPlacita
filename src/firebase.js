import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9Lzn-QcgK7ql0i31zAz6ET_VktqUfHGg",
  authDomain: "la-placita-bd.firebaseapp.com",
  projectId: "la-placita-bd",
  storageBucket: "la-placita-bd.firebasestorage.app",
  messagingSenderId: "811619328012",
  appId: "1:811619328012:web:de3e222dc2c96fbb768e29",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
