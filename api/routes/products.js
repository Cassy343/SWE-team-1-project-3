const express = require("express")
const router = express.Router()
const db = require("../db")
const {getDocs, collection, doc, getDoc, query, where, addDoc, Timestamp } = require("firebase/firestore")
const { validateReq } = require("../db")

// gets all products
router.get("/all", async (req, res, next) => {
    if (!validateReq(req)) {
        res.sendStatus(401);
        return;
    }

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
    if (!validateReq(req)) {
        res.sendStatus(401);
        return;
    }

    const id = req.query.id;
    const d = await getDoc(doc(db.db, "products", id))
    const seller = await getDoc(d.data().seller);
    res.json({ ...d.data(), id: d.id, sellerName: seller.data().name })
})

// gets all docs for a user
router.get('/', async (req, res, next) => {
    const uid = validateReq(req);
    if (!uid) {
        res.sendStatus(401);
        return;
    }

    const firestoreID = db.userUidToDocId(uid);

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
    console.log(req.headers['access-token'])
    const uid = validateReq(req);
    console.log(uid)
    if (!uid) {
        res.sendStatus(401);
        return;
    }

    const firestoreID = await db.userUidToDocId(uid);
    console.log(firestoreID)

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