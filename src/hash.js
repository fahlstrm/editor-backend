"use strict";
const database = require("../db/database.js");
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const myPlaintextPassword = 'longandhardP4$w0rD';
// const { MongoClient, ObjectId } = require("mongodb");

/**
 * Functionns to update or save a new doc
 */
const data = {
    hashPW: function (password) {
        return new Promise((res, rej) => 
        bcryptjs.hash(password, saltRounds, async function(err, hash) {
            if(err) {
                rej(err)
            }
            res(hash)
        })
        )

    }
};

module.exports = data;
