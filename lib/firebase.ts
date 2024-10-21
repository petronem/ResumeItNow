// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "resumeit-auth.firebaseapp.com",
  projectId: "resumeit-auth",
  storageBucket: "resumeit-auth.appspot.com",
  messagingSenderId: "479650561287",
  appId: "1:479650561287:web:6a007bc0fd3f235f4cd9a2",
  measurementId: "G-8830XX5JVP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);