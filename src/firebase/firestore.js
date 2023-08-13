import { auth, db } from "./firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

export async function createUserDatabase(user) {
  try {
    await setDoc(doc(db, "users", user.uid), user);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function addNewTransaction(data) {
  const uid = auth.currentUser.uid;
  try {
    await addDoc(collection(db, `users/${uid}/transactions`), data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
