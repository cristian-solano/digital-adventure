// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7gVurtBOqTtxpc3qzcIl8KGEagbrEBG0",
  authDomain: "image-79d5c.firebaseapp.com",
  projectId: "image-79d5c",
  storageBucket: "image-79d5c.appspot.com",
  messagingSenderId: "358016941487",
  appId: "1:358016941487:web:101ace175430ab17c7435a",
  measurementId: "G-K4R6F4VZRS"
};




// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app)
setPersistence(auth, browserLocalPersistence)