const { db } = require("../config/firebase");
const {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc
} = require("firebase/firestore");

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
  } catch (err) {
    return {};
  }
}

async function addTransaction(uid, data) {
  try {
    const collectionRef = collection(db, `users/${uid}/transactions`);
    await addDoc(collectionRef, data);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function getTransactions(uid) {
  try {
    const transactionRef = collection(db, `users/${uid}/transactions`);
    const dataQuery = query(transactionRef, orderBy("date", "desc"));
    const querySnapshot = await getDocs(dataQuery);
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({...doc.data(), id: doc.id})
    });
    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = {
  createUserDatabase: createUserDatabase,
  getUserData: getUserData,
  addTransaction: addTransaction,
  getTransactions: getTransactions,
};
