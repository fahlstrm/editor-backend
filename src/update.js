"use strict";
const document = require("./get.js");

const database = require("../db/database.js");
// const { MongoClient, ObjectId } = require("mongodb");

/**
 * Functionns to update or save a new doc
 */
const data = {
    updateDoc: async function(id, body) {
        var created = null;
        const db = await database.getDb();
        
        try {
            //Get document by id
            console.log("i uppdatera")

            console.log(id)
            let found = await document.oneTitle(id);

            //Using title or creates new one
            const query = {title: found};
         
            // create a new document that will be used to replace the existing document
            const replacement = {
                title: body.text.slice(3, 15),
                text: body.text,
            };

            console.log(replacement)
            const result = await db.collection.replaceOne(query, replacement);
            console.log(result)
            if (result.modifiedCount === 0 && result.upsertedCount === 0) {
                console.log("No changes made to the collection.");
            } else {
                if (result.matchedCount === 1) {
                    console.log("Matched " + result.matchedCount + " documents.");
                }
                if (result.modifiedCount === 1) {
                    created = "Updated one document"
                    console.log("Updated one document.");
                }
                if (result.upsertedCount === 1) {
                    created = 1;
                    console.log(
                        "Inserted one new document with an _id of " + result.upsertedId
                    );
                }
                console.log("färdig uppdatera")

            }
        } finally {
            await db.client.close();
            return created;
        }
    }
};

module.exports = data;
