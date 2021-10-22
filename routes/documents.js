var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');


const docs = require("../src/get.js");
const jwt = require("../src/jwt.js");
const puppeteer = require("../puppeteer/puppeteer.js");
const sendgrid = require("../sendgrid/sendgrid.js");
const { ExecutableDefinitionsRule } = require('graphql');



router.get('/all', async function(req, res) {
    const token = req.headers['x-access-token'];
    let result = await jwt.verifyToken(token).then(async () => {
        let result = await docs.all();
        data = {
            data: result
        };
        return data;
    }).catch((rej) => {
        data = {
            err: rej
        };
        return data;
    });
    res.json(result);
});

router.get('/users/:id', async function(req, res) {
    const token = req.headers['x-access-token'];

    let result = await jwt.verifyToken(token).then(async (resolved) => {
        let res = await docs.docUsers(req.params.id);
        data = {
            data: res,
            jwt: resolved
        };
        return data;
    }).catch((rejected) => {
        data = {
            err: rejected
        };
        return data;
    });
    res.json(result);
});


router.get('/:id', async function(req, res) {
    const token = req.headers['x-access-token'];
    let result = await jwt.verifyToken(token).then(async (resolved) => {
        let res = await docs.one(req.params.id);
        data = {
            data: res,
            jwt: resolved
        };
        return data;
        }).catch((rejected) => {
            data = {
                err: rejected
            };
            return data;
        });
    res.json(result);
});

// router.post('/execute', async function(req, res) {
//     // const token = req.headers['x-access-token'];
//     // let result = await jwt.verifyToken(token).then(async (resolved) => {
//     // let result = await docs.one(req.params.id);
//     // data = {
//     //     data: res,
//     //     // jwt: resolved
//     // };
//     // // return data;
//     // // }).catch((rejected) => {
//     // //     data = {
//     // //         err: rejected
//     // //     };
//     // //     return data;
//     // // });
//     // res.json(result);
// });


router.post('/pdf', async function(req, res) {
    const token = req.headers['x-access-token'];
    
    let result = await jwt.verifyToken(token).then(async () => {
        let data = await docs.one(req.body.id);
        console.log(data)
        let pdf = await puppeteer.createPdf(data);

        return pdf;
    }).catch((rej) => {
        data = {
            err: rej
        };
        return data;
    });
    res.json(result);
});


router.post('/invite', async function(req, res) {
    const token = req.headers['x-access-token'];

    let result = await jwt.verifyToken(token).then(async () => {
        let res = await sendgrid.sendEmail(req.body.email, req.body.title, req.body.id);
        data = {
            data: res
        };
        return data;
    }).catch((rej) => {
        data = {
            err: rej
        };
        return data;
    });
    res.json(result);
});



module.exports = router;
