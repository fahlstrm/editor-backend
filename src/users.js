"use strict";
const database = require("../db/database.js");
// const { MongoClient, ObjectId } = require("mongodb");

/**
 * Functionns to update or save a new doc
 */
const data = {
    createUser: async function(id, body) {
        var created = null;
        const db = await database.getUsersDb();
        
        try {

            
        } finally {
            await db.client.close();
            return created;
        }
    }
};

module.exports = data;
