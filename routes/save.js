var express = require('express');
var router = express.Router();

const update = require("../src/update.js");


router.get('/:content', async function(req, res, next) {
    let result = await update.update(req.params.content);
    if (result) {
        res.status(201).send();
    } else {
        res.status(204).send();
    }
});


module.exports = router;