import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyC7ZkEWXsC9LIn4BBzXZXtn_WU-e6b6yCg",
  authDomain: "signalcloneyt-3894f.firebaseapp.com",
  projectId: "signalcloneyt-3894f",
  storageBucket: "signalcloneyt-3894f.appspot.com",
  messagingSenderId: "169030227397",
  appId: "1:169030227397:web:a5f2153fdcbe183346a7ac",
  measurementId: "G-FH3NQ6NZ1R"
};

const app=initializeApp(firebaseConfig)
const authentication=getAuth(app)
const db=getFirestore(app)
export {authentication,db}