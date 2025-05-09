// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-realestate-35930.firebaseapp.com",
  projectId: "mern-realestate-35930",
  storageBucket: "mern-realestate-35930.firebasestorage.app",
  messagingSenderId: "870337850224",
  appId: "1:870337850224:web:639d62593b08f3388a7db5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);