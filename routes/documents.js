var express = require('express');
var router = express.Router();

const docs = require("../src/get.js");
const jwt = require("../src/jwt.js");



router.get('/all', async function(req, res) {
    const token = req.headers['x-access-token'];
    let result = await jwt.verifyToken(token).then(async () => {
        let result = await docs.all();
        data = {
            data: result
        };
        return data;   
    }).catch((rej) => {
        data = {
            err: rej
        };
        return data;   
    });
    res.json(result);
});


router.get('/users/:id', async function(req, res) {
    const token = req.headers['x-access-token'];
    let result = await jwt.verifyToken(token).then(async (resolved) => {
        let res = await docs.docUsers(req.params.id);
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

router.get('/:id', async function(req, res) {
    const token = req.headers['x-access-token'];
    let result = await jwt.verifyToken(token).then(async (resolved) => {
        let res = await docs.one(req.params.id);
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
