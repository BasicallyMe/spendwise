import { auth, db } from "./firebase";
import format from 'date-fns/format';
import getYear from 'date-fns/getYear';
import getMonth from "date-fns/getMonth";
import parseISO from "date-fns/parseISO";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";

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
    const parsedDate = parseISO(data.date);
    const year = getYear(parsedDate);
    const month = getMonth(parsedDate);
    data = {...data, year, month};
    await addDoc(collection(db, `users/${uid}/transactions`), data);
    return { status: 'success', message: 'Added successfully' };
  } catch (error) {
    console.log(error);
    return { status: 'error', message: 'Please try again' }
  }
}

export async function getAllTransactions() {
  const uid = auth.currentUser.uid;
  const data = [];
  try {
    const snapshot = await getDocs(collection(db, `users/${uid}/transactions`));
    snapshot.forEach((doc) => data.push(doc.data()))
    return { data, status: 'success' };
  } catch (error) {
    return ({ status: 'error' });
  }
}
