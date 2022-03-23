// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA048JRVlwn_R4yD5XqsUSsei-2hHx9Z14",
  authDomain: "fir-auth-2eca3.firebaseapp.com",
  projectId: "fir-auth-2eca3",
  storageBucket: "fir-auth-2eca3.appspot.com",
  messagingSenderId: "22293599471",
  appId: "1:22293599471:web:8b10a0a490840e7e17371a",
  measurementId: "G-0WQJE6TTW4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export async function createUser(email, password) {
  //Check credentials
  createUserWithEmailAndPassword(auth, email, password);
}
