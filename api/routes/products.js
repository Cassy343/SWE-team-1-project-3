const express = require("express")
const router = express.Router()
const db = require("../db")
const {getDocs, collection, doc, getDoc } = require("firebase/firestore")

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
    res.json({id: d.id, data: d.data(), sellerName: seller.data().name})
})

module.exports = router