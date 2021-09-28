var express = require('express');
var router = express.Router();

const users = require("../src/users.js");



router.post('/create', async function(req, res) {
    let result = await users.createUser(req.body);
    const data = {
        data: {
            result: result
        }
    };

    console.log(data);
    res.status(200).json(data);
});

router.post('/login', async function(req, res) {
    let result = await users.loginUser(req.body);
    const data = {
        data: {
            result: result
        }
    };

    console.log(data);
    res.status(200).json(data);
});


module.exports = router;
