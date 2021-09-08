var express = require('express');
const { get } = require('.');
var router = express.Router();

const docs = require("../src/get.js");


router.get('/all', async function(req, res, next) {
    let result = await docs.all();
    
    const data = {
        data: result
    };
    console.log(data);
    res.json(data);
    // res.status(201).send(data);
});

router.get('/:id', async function(req, res, next) {
    let result = await docs.one(req.params.id);
    
    const data = {
        data: result
    };
    console.log(data);
    res.json(data);
    // res.status(201).send(data);
});



module.exports = router;