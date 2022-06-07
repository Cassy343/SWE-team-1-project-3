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
const userData = {};

const addUser = async (uid, name) => {
    const dc = await addDoc(collection(db, 'users'), {
        uid: uid,
        name: name
    });

    uidToDocId[uid] = dc.id;
    return dc.id;
};

const getUser = async docId => {
    if (userData[docId]) {
        return userData[docId];
    } else {
        const dc = await getDoc(doc(db, 'users', docId));
        const ret = {
            ...dc.data(),
            id: docId
        };

        uidToDocId[ret.uid] = docId;
        userData[docId] = ret;

        return ret;
    }
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
    userData[docId] = {
        ...docs[0].data(),
        id: docId
    };
    
    return docId;
};

const userUidToDoc = async uid => {
    if (uidToDocId[uid]) {
        const docId = uidToDocId[uid];

        if (userData[docId]) {
            return userData[docId];
        } else {
            const dc = await getDoc(doc(db, 'users', uidToDocId[uid]));

            const ret = {
                ...dc.data(),
                id: docId
            };

            userData[docId] = ret;

            return ret;
        }
    } else {
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

        const ret = {
            ...docs[0].data(),
            id: docId
        };

        userData[docId] = ret;

        return ret;
    }
};

module.exports = {
    db: db,
    addUser: addUser,
    getUser: getUser,
    userUidToDocId: userUidToDocId,
    userUidToDoc: userUidToDoc
};
