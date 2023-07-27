import db from "./firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

export async function createUserDatabase(user) {
  try {
    const docRef = await addDoc(collection(db, "users"), user);
    console.log(docRef);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
