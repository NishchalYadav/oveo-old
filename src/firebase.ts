// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import getAuth

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWEE3bTZnJ_cm1-Z0BFc-Afw2yjVnU_LQ",
  authDomain: "oveolabs.firebaseapp.com",
  projectId: "oveolabs",
  storageBucket: "oveolabs.appspot.com",
  messagingSenderId: "532593976942",
  appId: "1:532593976942:web:64bf3937612e6b8242287f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // Initialize Firebase Authentication

export { app, db, auth }; // Export auth