// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOW4K1Igc3AUMPHA83qAPcPLIdHTie-Mk",
  authDomain: "ingen-labtica.firebaseapp.com",
  projectId: "ingen-labtica",
  storageBucket: "ingen-labtica.appspot.com",
  messagingSenderId: "254264160932",
  appId: "1:254264160932:web:c98e99043e15eee262ac31",
  measurementId: "G-MKSKHQ1RKY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
export const auth = getAuth(app);
