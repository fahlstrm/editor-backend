"use strict";

const database = require("../db/database.js");
const { ObjectId } = require("mongodb");

/**
 * Functions to collect all docs. or one specific doc
 */
const data = {
    all: async function run() {
        var cursor;

        try {
            const db = await database.getDb();

            cursor = db.collection.find({});
            var result = await cursor.toArray();

            if ((await cursor.count()) === 0) {
                console.log("No documents found!");
            }
        } finally {
        // await db.client.close();
            return result;
        }
    },
    oneTitle: async function run(id) {
        const db = await database.getDb();

        if (ObjectId.isValid(id)) {
            const query = {_id: new ObjectId(id)};
            let crusor = await db.collection.find(query);
            var found = await crusor.toArray();

            return found[0].title;
        }
        return "No valid id";
    },
    one: async function run(id) {
        const db = await database.getDb();

        if (ObjectId.isValid(id)) {
            const query = {_id: new ObjectId(id)};
            let crusor = await db.collection.find(query);
            var found = await crusor.toArray();

            return found[0];
        }
        return "No valid id";
    }
};

module.exports = data;
