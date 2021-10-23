var express = require('express');
var router = express.Router();

const update = require("../src/update.js");
const get = require("../src/get.js");
const jwt = require("../src/jwt.js");


router.post('/create/:id', async function(req, res) {
    const token = req.headers['x-access-token'];

    let result = await jwt.verifyToken(token).then(async () => {
        let res = await update.updateComments(req.params.id, req.body);
        data = {
            data: res
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

router.get('/:id', async function(req, res) {
    const token = req.headers['x-access-token'];

    let result = await jwt.verifyToken(token).then(async () => {
        let res = await get.getComments(req.params.id);

        data = {
            data: res
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

module.exports = router;

