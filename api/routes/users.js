var express = require('express');
var router = express.Router();
const { addUser } = require('../db');

router.post('/', (req, res) => {
    // TODO: check to make sure required body parameters are present

    addUser(req.body.uid, req.body.name)
        .then(_id => res.sendStatus(204))
        .catch(e => {
            res.sendStatus(403);
            console.error(e);
        });
});

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
