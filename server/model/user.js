require('dotenv').config();
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const app = require('../config/database');
const axios = require('axios');

const auth = getAuth(app);

async function registerUser(option) {
    const { displayName, email, password } = option;
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password, displayName);
        let user = await response?.user;
        return {
            email: user.email,
            displayName: displayName,
            createdOn: user.metadata.creationTime,
            uid: user.uid
        }
    } catch(err) {
        console.log(err.code);
        return {
            error: err.code,
        };
    }
}

async function findUser(option) {
    const { email, password } = option;
    console.log(email, password);
    return true;
}

module.exports = {
    registerUser: registerUser,
    findUser: findUser,
}