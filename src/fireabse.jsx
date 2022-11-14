import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCO_Gr2v8iuquk9g7JFgJ1HgUFH0rhWPmc",
  authDomain: "react-libary-19f83.firebaseapp.com",
  projectId: "react-libary-19f83",
  storageBucket: "react-libary-19f83.appspot.com",
  messagingSenderId: "203614812884",
  appId: "1:203614812884:web:65c586dbd5eb7db8719941"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();