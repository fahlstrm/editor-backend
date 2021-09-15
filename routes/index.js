var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    const data = {
        data: {
            msg: "Index"
        }
    };

    console.log(data);
    res.status(200).json(data);
});


module.exports = router;
