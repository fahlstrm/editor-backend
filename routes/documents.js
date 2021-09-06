var express = require('express');
const { get } = require('.');
var router = express.Router();

const update = require("../src/get.js");


router.get('/', function(req, res, next) {
    let result = await get.getAll();
    const data = {
        data: {
            msg: "Dokument"
        }
    };
    console.log(data);
    res.json(data);
});



module.exports = router;