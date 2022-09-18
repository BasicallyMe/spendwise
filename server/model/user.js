require("dotenv").config();
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("firebase/auth");
const { auth } = require("../config/firebase");

async function registerUser(option) {
  const { email, password, firstName, lastName } = option;
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = await response?.user;
    return {
      email: user.email,
      firstName: firstName,
      lastName: lastName,
      createdOn: user.metadata.creationTime,
      uid: user.uid,
    };
  } catch (err) {
    return {
      error: err.code,
    };
  }
}

async function signInUser(option) {
  const { email, password } = option;
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const user = await response?.user;
    return {
      email: user.email,
      uid: user.uid,
    };
  } catch (err) {
    return {
      error: err.code,
    };
  }
}

module.exports = {
  registerUser: registerUser,
  signInUser: signInUser,
};
