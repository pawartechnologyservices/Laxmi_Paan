// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKLUKReJJyaqYnwv5iWqzDIdG_I3cWnw0",
  authDomain: "laxmiipan.firebaseapp.com",
  databaseURL: "https://laxmiipan-default-rtdb.firebaseio.com",
  projectId: "laxmiipan",
  storageBucket: "laxmiipan.firebasestorage.app",
  messagingSenderId: "716049098185",
  appId: "1:716049098185:web:cd88aa8e48902805077418",
  measurementId: "G-4F21CPRNRK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth };