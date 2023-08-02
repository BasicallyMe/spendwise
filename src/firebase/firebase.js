import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBUIBMlG6XyQKHkKQ_3LQpTpBBjQvAhKXM",
  authDomain: "whatsmyexpense.firebaseapp.com",
  projectId: "whatsmyexpense",
  storageBucket: "whatsmyexpense.appspot.com",
  messagingSenderId: "365205139061",
  appId: "1:365205139061:web:467c395184157e1f66923c",
  measurementId: "G-2VL30RVTSY",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);