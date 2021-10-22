var express = require('express');
var router = express.Router();

const users = require("../src/users.js");
const update = require("../src/update.js");
const jwt = require("../src/jwt.js");



router.post('/create', async function(req, res) {

    let id = await users.createUser(req.body);

    if (req.body.urlId) {
        let val = {
            id: req.body.urlId,
            newUser: req.body.username
        }
        let userAdded = await update.updateUser(val);
        console.log(userAdded)
    }
    
    let result = await users.loginUser(req.body)

    const data = {
        data: {
            id: id,
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

router.get('/all', async function(req, res) {
    let result = await users.getAllUsers();

    const data = {
        data: result
    };

    console.log(data);
    res.json(data);
    // res.status(201).send(data);
});

module.exports = router;
