const { db } = require("../config/firebase");
const { getDoc, setDoc, doc, collection } = require("firebase/firestore");

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

async function addTransaction(uid, data) {
 try {
  console.log(uid, user);
 } catch(err) {
  console.log(err);
 }
}


module.exports = {
    createUserDatabase: createUserDatabase,
    getUserData: getUserData,
    addTransaction: addTransaction,
}
