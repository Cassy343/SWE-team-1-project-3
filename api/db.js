const { initializeApp } = require("firebase/app");
const { getFirestore, query, collection, where, getDocs, getDoc, doc, addDoc } = require('firebase/firestore');
require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const uidToDocId = {};

const addUser = async (uid, name) => {
    const dc = await addDoc(collection(db, 'users'), {
        uid: uid,
        name: name
    });

    uidToDocId[uid] = dc.id;
    return dc.id;
};

const userUidToDocId = async uid => {
    if (uidToDocId[uid]) {
        return uidToDocId[uid];
    }

    const userQuery = query(
        collection(db, 'users'),
        where('uid', '==', uid)
    );

    const docs = (await getDocs(userQuery)).docs;

    if (docs.length === 0) {
        return null;
    }

    const docId = docs[0].id;
    uidToDocId[uid] = docId;
    
    return docId;
};

const userUidToDoc = async uid => {
    if (uidToDocId[uid]) {
        return await getDoc(doc(db, 'users', uidToDocId[uid]));
    } else {
        const userQuery = query(
            collection(db, 'users'),
            where('uid', '==', uid)
        );
    
        const docs = (await getDocs(userQuery)).docs;
    
        if (docs.length === 0) {
            return null;
        }

        uidToDocId[uid] = docs[0].id;
        return docs[0];
    }
};

module.exports = {
    db: db,
    addUser: addUser,
    userUidToDocId: userUidToDocId,
    userUidToDoc: userUidToDoc
};
