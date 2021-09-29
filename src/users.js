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
            const db = await database.users();
            let crusor = await db.collection.find({username: user});
            let found = await crusor.toArray();

            await db.client.close();
            res(found)
        })
    },
    createUser: async function(body) {
        var result = null;
        const db = await database.users();

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
    getAllUsers: async function() {
        var cursor;
        const db = await database.users();

        try {
            cursor = db.collection.find({});
            var result = await cursor.toArray();

            if ((await cursor.count()) === 0) {
                console.log("No users found!");
            }
        } finally {
            await db.client.close();
            return result;
        }
    },
    loginUser: async function(body) {
        var result = null;
        const db = await database.users();

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
