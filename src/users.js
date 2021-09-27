"use strict";
const database = require("../db/database.js");
const hash = require("./hash.js");

// const { MongoClient, ObjectId } = require("mongodb");

/**
 * Functionns to update or save a new doc
 */
const data = {
    createUser: async function(body) {
        var result = null;
        const db = await database.getUsersDb();

        try {   
            let hashedPW = await hash.hashPW(body.password);
            const user = { 
                username: body.username,
                password: hashedPW,
                permissions: body.permissions
            };
            
            result = await db.collection.insertOne(user);
            console.log(result)  
        } finally {
            await db.client.close();
            return result;
        }
    },
    loginUser: async function(body) {
        var result = null;
        const db = await database.getUsersDb();
        try {   
            let hashedPW = await hash.hashPW(body.password);
            
            result = await db.collection.insertOne(user);
            console.log(result)  
        } finally {
            await db.client.close();
            return result;
        }
    }
};

module.exports = data;
