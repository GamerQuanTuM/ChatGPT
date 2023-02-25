import { getApp, getApps, initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDj_9oDg9qqLyfJuk9D42_Pv1MK3fs9KVI",
    authDomain: "chatgpt-61399.firebaseapp.com",
    projectId: "chatgpt-61399",
    storageBucket: "chatgpt-61399.appspot.com",
    messagingSenderId: "186573949331",
    appId: "1:186573949331:web:df8b2f5970087dd0e8c066"
  };
// Initialize Firebase
const app = getApps.length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db }