// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);