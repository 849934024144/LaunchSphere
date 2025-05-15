// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTThXWXkai20XNGq7F-KGdkkpRy5d-78U",
  authDomain: "devcartel-2abfe.firebaseapp.com",
  projectId: "devcartel-2abfe",
  storageBucket: "devcartel-2abfe.firebasestorage.app",
  messagingSenderId: "824712076567",
  appId: "1:824712076567:web:ddb32f6472bd37aafaeb52",
  measurementId: "G-38YL8RK8X4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);