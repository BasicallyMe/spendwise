const { db } = require('../config/firebase');
const { doc, setDoc } = require('firebase/firestore');


async function createUserDatabase(user) {
    try {
        const response = await setDoc(doc(db, "users", `${user.uid}`), user);
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    createUserDatabase: createUserDatabase,
}