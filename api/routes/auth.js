var express = require('express');
var router = express.Router();
const { login, createAccount } = require('../db');

router.put('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    login(email, password).then(result => {
        res.send(result);
    }).catch(error => {
        res.status(403);
        res.send(error);
    });
});

router.post('/login', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    createAccount(name, email, password).then(result => {
        res.send(result);
    }).catch(error => {
        res.status(403);
        res.send(error);
    });
});

module.exports = router;