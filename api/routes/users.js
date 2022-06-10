var express = require('express');
var router = express.Router();
const db = require("../db")
const {doc, getDoc } = require("firebase/firestore")

// router.get('/', function(req, res, next) {
//     res.send('respond with a resource');
// });

// gets user name from uid
router.get('/', async function(req, res, next) {
    const uid = req.query.id;
    const firestoreID = await db.userUidToDocId(uid);
    const d = await getDoc(doc(db.db, "users", firestoreID))
    res.json(d.data().name)
})

module.exports = router;
