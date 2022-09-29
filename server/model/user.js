const { auth } = require("../config/firebase");
const { createUserWithEmailAndPassword } = require("firebase/auth");

async function createUser({ email, password, firstName, lastName }) {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    console.log(res.user.toJSON());
    let user = res.user.toJSON();
    return {
      uid: user.uid,
      email: user.email,
      firstName,
      lastName
    }
  } catch (err) {
   return {
    error: err.code,
    message: "Account already exist. Please sign in to continue"
   }
  }
}

module.exports = {
  createUser: createUser,
};
