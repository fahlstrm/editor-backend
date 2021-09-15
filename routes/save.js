var express = require('express');
var router = express.Router();

const update = require("../src/update.js");


router.post('/:id', async function(req, res) {
    let result = await update.update(req.params.id, req.body);

    if (result) {
        res.status(201).send();
    } else {
        res.status(204).send();
    }
    res.json({
        data: {
            msg: "Got a POST request"
        }
    });
});

module.exports = router;
