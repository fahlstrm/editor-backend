var express = require('express');
var router = express.Router();

const update = require("../src/update.js");
const newDoc = require("../src/post.js");

const jwt = require("../src/jwt.js");


router.post('/new/doc', async function(req, res) {
    const token = req.headers['x-access-token'];
    let result = await jwt.verifyToken(token).then(async (resolved) => {
        let res = await newDoc.createNew(req.body);
        data = {
            data: res,
            jwt: resolved
        };
        return data;   
    }).catch((rejected) => {
        data = {
            err: rejected
        };
        return data;   
    });
    res.json(result);
});


router.post('/new/user', async function(req, res) {
    const token = req.headers['x-access-token'];

    let result = await jwt.verifyToken(token).then(async (resolved) => {
        let res = await update.updateUser(req.body);
        data = {
            data: res,
            jwt: resolved
        };
        return data;   
    }).catch((rejected) => {
        data = {
            err: rejected
        };
        return data;   
    });
    res.json(result);
});

module.exports = router;
