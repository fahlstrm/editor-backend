"use strict";
const database = require("../db/database.js");
const hash = require("./hash.js");
const jwt = require("./jwt.js");

// const { MongoClient, ObjectId } = require("mongodb");

/**
 * Functionns to update or save a new doc
 */
const data = {
    getUser: function(user) {
        return new Promise(async (res) => {
            const db = await database.getUsersDb();
            // const query = {username: user};
            let crusor = await db.collection.find({username: user});
            let found = await crusor.toArray();
            res(found)
        })
    },
    createUser: async function(body) {
        var result = null;
        const db = await database.getUsersDb();

        try {   
            let hashedPW = await hash.hashPW(body.password);
            const user = { 
                username: body.username,
                password: hashedPW,
                permission: body.permission
            };
            
            result = await db.collection.insertOne(user);
        } finally {
            await db.client.close();
            return result;
        }
    },
    loginUser: async function(body) {
        var result = null;
        const db = await database.getUsersDb();
        try {
            let foundUser = await this.getUser(body.username);
            if (foundUser.length == 0) {
                result = {
                    errCode: 0,
                    err: "Användare finns inte"
                };
                return;
            } else {
                let unhased = await hash.unhash(body.password, foundUser[0].password);
                if (unhased != true) {
                    result = {
                        errCode: 0,
                        err: "Felaktigt lösenord"
                    };
                    return;
                }
                let token = await jwt.getToken(foundUser[0].username);
                result = {
                    token: token,
                    user: {
                        username: foundUser[0].username,
                        permission: foundUser[0].permission
                    }
                }
            }  
        } finally {
            return result;
        }
    }
};

module.exports = data;
