var express = require('express');
var router = express.Router();

const update = require("../src/update.js");
const newDoc = require("../src/post.js");



router.post('/:id', async function(req, res) {
    let result = await update.update(req.params.id, req.body);

    if (result) {
        res.status(201).send();
    } else {
        res.status(204).send();
    }
    // res.json({
    //     data: {
    //         msg: "Got a POST request"
    //     }
    // });
});

router.post('/new/doc', async function(req, res) {
    console.log(req.body)
    let result = await newDoc.createNew(req.body.text);
    console.log(result)

    const data = {
        data: result
    };

    res.json(data);
});


module.exports = router;
