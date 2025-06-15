// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCakj3_RRVu1lv5tmHZiZAZqBTKQGkhjKg",
  authDomain: "luxera-7d82c.firebaseapp.com",
  projectId: "luxera-7d82c",
  storageBucket: "luxera-7d82c.firebasestorage.app",
  messagingSenderId: "885826636216",
  appId: "1:885826636216:web:1d4dd7739b602f3faaa74d",
  measurementId: "G-88ZT8E2SLL"
};

const app = initializeApp(firebaseConfig);

export {app};