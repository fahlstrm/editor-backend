"use strict";
const database = require("../db/database.js");
const bcryptjs = require('bcryptjs');
const saltRounds = 10;


/**
 * Functionns to hash pw
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
    },
    unhash: function (password, hash) {
        return new Promise((res, rej) => 
        bcryptjs.compare(password, hash, function(err, unlocked) {
            if(err) {
                rej(err)
            }
            res(unlocked)
        })
        )
    }
};

module.exports = data;
