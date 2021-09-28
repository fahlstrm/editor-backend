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
        console.log("i unhash")
        console.log(hash)
        console.log(password)
        return new Promise((res, rej) => 
        bcryptjs.compare(password, hash, function(err, unlocked) {
            console.log(err) 
            console.log(unlocked)
            console.log("i bcrypt") 
            if(err) {
                rej(err)
            }
            res(unlocked)
            // res innehåller nu true eller false beroende på om det är rätt lösenord.
        })
        )
    }
};

module.exports = data;
