const express = require("express")
const router = express.Router()
const db = require("../db")
const {getDocs, collection, doc, getDoc, query, where, addDoc, Timestamp } = require("firebase/firestore")

// gets all products
router.get("/all", async (req, res, next) => {
    const allDocData = []
    const docs = await getDocs(collection(db.db, "products"))
    docs.forEach((d) => {
        allDocData.push({id: d.id, data: d.data()})
    })
    await Promise.all(allDocData.map(async (d) => {
        const seller = await getDoc(d.data.seller)
        d.sellerName = seller.data().name
    }))
    res.json({result: allDocData})
})

//gets one product
router.get("/info", async (req, res, next) => {
    const id = req.query.id;
    const d = await getDoc(doc(db.db, "products", id))
    const seller = await getDoc(d.data().seller);
    res.json({ ...d.data(), id: d.id, sellerName: seller.data().name })
})

// gets all docs for a user
router.get('/', async (req, res, next) => {
    const q1 = query(
        collection(db.db, 'users'), where('uid', '==', req.query.user)
    );
    const d1 = await getDocs(q1).then(docs => docs.docs);
    const firestoreID = d1[0].id;


    const q2 = query(
        collection(db.db, 'products'), where('seller', '==', doc(db.db, 'users/' + firestoreID))
    );
    const d2 = await getDocs(q2).then(docs => docs.docs);
    const allDocs = [];
    d2.forEach((doc) => {allDocs.push(doc.data())})
    res.json({result: allDocs})
});

// posts new product
router.post('/', async (req, res, next) => {
    const q1 = query(
        collection(db.db, 'users'), where('uid', '==', req.query.user)
    );
    const d1 = await getDocs(q1).then(docs => docs.docs);
    const firestoreID = d1[0].id;

    const product = {
        name: req.body.name,
        price: Number(req.body.price),
        description: req.body.description,
        image: req.body.image,
        date_posted: Timestamp.fromDate(new Date()),
        seller: doc(db.db, 'users/' + firestoreID)
    };
    const productDoc = await addDoc(collection(db.db, 'products'), product);
    res.send(productDoc)
});

module.exports = router