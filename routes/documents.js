var express = require('express');
const { get } = require('.');
var router = express.Router();

const getAll = require("../src/get.js");


router.get('/', async function(req, res, next) {
    let result = await getAll.getAll();
    const data = {
        data: {
            msg: result
        }
    };
    console.log(data);
    res.json(data);
});



module.exports = router;