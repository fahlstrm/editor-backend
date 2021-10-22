"use strict";
const document = require("./get.js");

const database = require("../db/database.js");
const { ObjectId } = require("mongodb");

// const { MongoClient, ObjectId } = require("mongodb");

/**
 * Functionns to update or save a new doc
 */
const data = {
    updateDoc: async function(id, body) {
        var created = null;
        const db = await database.documents();

        try {
            //Get document by id
            let found = await document.oneTitle(id);
            //Using title 
            const query = {title: found};
            // create a new document that will be used to replace the existing document
            const replacement = {
                title: body.title,
                type: body.type,
                content: body.content,
                users: body.users,
                comments: body.comments
            };

            const result = await db.collection.replaceOne(query, replacement);

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
            }
        } finally {
            await db.client.close();
            return created;
        }
    },
    updateUser: async function(body) {
        const db = await database.documents();
        var updated;
        try {
            const query = {_id: new ObjectId(body.id)};
            let cursor = await db.collection.find(query);
            let foundDoc = await cursor.toArray();

            foundDoc[0].users.push(body.newUser)
            // console.log(foundDoc[0].users)

            const replacement = {
                title: foundDoc[0].title,
                type: foundDoc[0].type,
                content: foundDoc[0].content,
                users : foundDoc[0].users,
                comments: foundDoc[0].comments
            } 

            updated = await db.collection.replaceOne(query, replacement);
            // let result = foundDoc[0].users;
        } finally {
            await db.client.close();
            return updated;
        }
    },
    updateComments: async function(id, body) {
        console.log(body.comment)
        const db = await database.documents();
        var updated;
        try {
            const query = {_id: new ObjectId(id)};
            let cursor = await db.collection.find(query);
            let foundDoc = await cursor.toArray();
            console.log("hittat", foundDoc[0])
            if (!foundDoc[0].comments) {
                foundDoc[0].comments = [];
            }
            foundDoc[0].comments.push(body.comment)
            console.log("hittade kommentar:" , foundDoc[0].comments)

            const replacement = {
                title: foundDoc[0].title,
                type: foundDoc[0].type,
                content: body.content,
                users : foundDoc[0].users,
                comments: foundDoc[0].comments
            } 
            console.log("i update", replacement)
            updated = await db.collection.replaceOne(query, replacement);
            console.log(updated)
            // let result = foundDoc[0].users;
        } finally {
            await db.client.close();
            return updated;
        }
    }
};

module.exports = data;
