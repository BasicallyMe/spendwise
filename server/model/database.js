const { db } = require("../config/firebase");
const { addDoc, collection, doc, getDoc, setDoc, Timestamp } = require("firebase/firestore");
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
   data.timestamp = Timestamp.fromDate(new Date(data.date));
   // const docRef = doc(db, `users/${uid}/transactions/`);
   const collectionRef = collection(db, `users/${uid}/${collectionName}`);
   const newDoc = await addDoc(collectionRef, data);
   console.log(newDoc.id, 'new doc created');
 } catch(err) {
  console.log(err);
 }
}


module.exports = {
    createUserDatabase: createUserDatabase,
    getUserData: getUserData,
    addTransaction: addTransaction,
}
