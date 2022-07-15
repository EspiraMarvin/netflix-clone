// Import the functions you need from the SDKs you need
import firebase, { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

// Initialize Firebase 
// check if the app is not initialized, then initialize 
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
let app = null

if (!getApps().length){
  app = initializeApp(firebaseConfig)
  getAnalytics(app)
} else {
  getApp()
}

initializeApp(firebaseConfig)


// if(typeof window != undefined){
//   getAnalytics(app)
// }
const db = getFirestore()
const auth = getAuth()
export default app
export { auth, db }
