import { auth } from './firebase';
import { GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const provider = new GoogleAuthProvider();

export async function signInWithEmail(userObj) {
    const { email, password } = userObj;
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const user = await userCredentials.user;
        return user;
    } catch(error) {
        return { type: 'error', code: error.code, message: error.message }
    }
}

export async function newUser(userObj) {
    console.log('calling create user')
    try {
        const { email, password } = userObj;
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = await userCredentials.user;
        return user;
    } catch(error) {
        console.log(error);
        return { type: 'error', code: error.code, message: error.message }
    }
}