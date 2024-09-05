import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBlOXtDV8i31dSYI5FH3EzHyXJYdaTBABE",
  authDomain: "adsync-d5c36.firebaseapp.com",
  projectId: "adsync-d5c36",
  storageBucket: "adsync-d5c36.appspot.com",
  messagingSenderId: "1065716048912",
  appId: "1:1065716048912:web:96ee40bff5735f39145695"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const storage = getStorage(firebase)