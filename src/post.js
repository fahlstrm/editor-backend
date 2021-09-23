"use strict";

const database = require("../db/database.js");

/**
 * Post ned docs to editor collection
 */
const data = {
    createNew: async function run(text) {
        const db = await database.getDb();
        var result = null;
        try {
            // create a document to be inserted
            const doc = { 
                title: text.slice(3, 15),
                text: text };
            result = await db.collection.insertOne(doc);
    
            // console.log(
            //     `${result.acknowledged} documents were inserted with the _id: ${result.insertedId}`,
            // );
            console.log(result.insertedId)
        } finally {
            await db.client.close();
            return result;
        }
    }
}

module.exports = data;

