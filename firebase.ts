// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCiDnK3HSFDZ_e-QF2ZNTBVXZhng1cDNJY",
    authDomain: "netflix-clone-b75e3.firebaseapp.com",
    projectId: "netflix-clone-b75e3",
    storageBucket: "netflix-clone-b75e3.appspot.com",
    messagingSenderId: "401672775135",
    appId: "1:401672775135:web:b8d5d60914d5096e2fd06a",
    measurementId: "G-F8WYY6PP0Z"
}

// Initialize Firebase 
// check if the app is not initialized, then initialize 
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }

/*

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiDnK3HSFDZ_e-QF2ZNTBVXZhng1cDNJY",
  authDomain: "netflix-clone-b75e3.firebaseapp.com",
  projectId: "netflix-clone-b75e3",
  storageBucket: "netflix-clone-b75e3.appspot.com",
  messagingSenderId: "401672775135",
  appId: "1:401672775135:web:b8d5d60914d5096e2fd06a",
  measurementId: "G-F8WYY6PP0Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

*/

