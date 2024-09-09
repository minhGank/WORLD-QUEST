// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3RiwDU3kJ63Ym7dktsg1Jj1RZTWUGHXY",
  authDomain: "world-quest-9100e.firebaseapp.com",
  projectId: "world-quest-9100e",
  storageBucket: "world-quest-9100e.appspot.com",
  messagingSenderId: "585946703414",
  appId: "1:585946703414:web:d0bf64e92f2b7921e39a97",
  measurementId: "G-6YWE4CN1KN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const googleSignInAuth = getAuth();
export default app;
export const googleSignInProvider = new GoogleAuthProvider();
