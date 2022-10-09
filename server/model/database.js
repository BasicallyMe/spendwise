const { db } = require("../config/firebase");
const { getDoc, setDoc, doc } = require("firebase/firestore");

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
      const {firstName, lastName} = docSnap.data();
      return { firstName, lastName};
    } else {
      return { message: "Couldn't find user"}
    }
  } catch(err) {
    return {};
  }
} 


module.exports = {
    createUserDatabase: createUserDatabase,
    getUserData: getUserData,
}
