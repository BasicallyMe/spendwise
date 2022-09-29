const { auth } = require("../config/firebase");
const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");

async function createUser({ email, password, firstName, lastName }) {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = await res.user.toJSON();
    return {
      uid: user.uid,
      email: user.email,
      firstName,
      lastName
    }
  } catch (err) {
   return {
    error: err.code,
   }
  }
}

async function signInUser({email, password}) {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = await res.user.toJSON();
    return {
      uid: user.uid,
      email: user.email
    }
  }catch(err) {
    return {
      error: err.code
    }
  }
}

module.exports = {
  createUser: createUser,
  signInUser: signInUser,
};
