"use strict";

const database = require("../db/database.js");

/**
 * Post ned docs to editor collection
 */
const data = {
    createNew: async function (body) {
        const db = await database.documents();
        var result = null;

        try {
            // create a document to be inserted
            const doc = { 
                title: body.title,
                type: body.type,
                content: ``,
                users: [ body.username ],
                comments: [] };

            result = await db.collection.insertOne(doc);
        } finally {
            await db.client.close();
            return result;
        }
    }
}

module.exports = data;

