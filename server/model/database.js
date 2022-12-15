const { db } = require("../config/firebase");
const { addDoc, collection, doc, getDoc, setDoc, } = require("firebase/firestore");
const months = require('months');
const { getMonth, getYear, parseISO } = require('date-fns');

async function createUserDatabase(user) {
  try {
    await setDoc(doc(db, "users", user.uid), user);
    return true;
  } catch (err) {
    return false;
  }
}

async function getUserData(uid) {
  try {
    const docSnap = await getDoc(doc(db, "users", uid));
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch(err) {
    return {};
  }
} 

const getCollectionName = (date) => {
  const parseDate = parseISO(date);
  const month = months[getMonth(parseDate)];
  const year = getYear(parseDate);
  return `${month}_${year}`;
}

async function addTransaction(uid, data) {
 try {
   const collectionName = getCollectionName(data.date);
   // const docRef = doc(db, `users/${uid}/transactions/`);
   const collectionRef = collection(db, `users/${uid}/${collectionName}`);
   
 } catch(err) {
  console.log(err);
 }
}


module.exports = {
    createUserDatabase: createUserDatabase,
    getUserData: getUserData,
    addTransaction: addTransaction,
}
