import { auth } from "./firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  signOut
} from "firebase/auth";

const provider = new GoogleAuthProvider();

export async function signOutUser() {
  try {
    await signOut(auth)
    return true;
  } catch (error) {
    return false;
  }
}

export async function signInWithEmail(userObj) {
  const { email, password } = userObj;
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = await userCredentials.user;
    return { status: "success", verified: user.emailVerified };
  } catch (error) {
    let message = "";
    console.log("error code", error.code);
    switch (error.code) {
      case "auth/user-not-found":
        message =
          "We couldn't find an account with this email. Please try a different email";
        break;
      case "auth/wrong-password":
        message =
          "Your password might be incorrect. Please try a different one.";
        break;
      default:
        message = "We couldn't sign you in. Please try again";
        break;
    }
    return { status: "error", message };
  }
}

export async function verifyUser() {
  try {
    await sendEmailVerification(auth.currentUser);
  } catch (error) {
    console.error(error.code);
  }
}

export async function newUser(userObj) {
  try {
    const { email, password, firstName, lastName } = userObj;
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = await userCredentials.user;
    await updateProfile(user, {
      displayName: `${firstName} ${lastName}`
    })
    if (user) {
      await verifyUser();
    }
    return { user, status: "success" };
  } catch (error) {
    let message = "";
    console.log("error code", error.code);
    switch (error.code) {
      case "auth/email-already-in-use":
        message =
          "This email might already be in use by another account";
        break;
      default:
        message = "We couldn't sign you in. Please try again";
        break;
    }
    return { status: "error", message };
  }
}

export async function getUser() {
  try {
    return auth.currentUser;
  } catch (error) {
    console.log(error);
  }
}
