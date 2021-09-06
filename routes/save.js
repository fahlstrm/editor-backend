var express = require('express');
var router = express.Router();

const update = require("../src/update.js");


router.get('/:content', function(req, res, next) {
    update.update(req.params.content);
    const data = {
        data: {
            msg: "Spara routen"
        }
    };
    console.log(data);
    res.json(data);
});


module.exports = router;