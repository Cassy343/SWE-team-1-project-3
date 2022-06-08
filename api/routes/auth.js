var express = require('express');
var router = express.Router();
const { login, createAccount, logout } = require('../db');

router.put('/', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    login(email, password).then(result => {
        res.send(result);
    }).catch(error => {
        res.status(403);
        res.send(error);
    });
});

router.post('/', (req, res) => {
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

router.delete('/', (req, res) => {
    logout(req.headers['access-token']);
    res.sendStatus(204);
});

module.exports = router;