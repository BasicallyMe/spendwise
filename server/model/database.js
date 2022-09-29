const { db } = require("../config/firebase");
const { setDoc, doc } = require("firebase/firestore");

async function createUserDatabase(user) {
  try {
    await setDoc(doc(db, "users", user.uid), user);
    return true;
  } catch (err) {
    return false;
  }
}


module.exports = {
    createUserDatabase: createUserDatabase,
}
