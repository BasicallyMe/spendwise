const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
const { getFirestore } = require('firebase/firestore')
require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "whatsmyexpense.firebaseapp.com",
  projectId: "whatsmyexpense",
  storageBucket: "whatsmyexpense.appspot.com",
  messagingSenderId: "365205139061",
  appId: "1:365205139061:web:467c395184157e1f66923c",
  measurementId: "G-2VL30RVTSY",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 

module.exports = {
    auth: auth,
    db: db,
}