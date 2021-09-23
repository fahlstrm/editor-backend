"use strict";

const database = require("../db/database.js");
const { ObjectId } = require("mongodb");

/**
 * Functions to collect all docs. or one specific doc
 */
const data = {
    all: async function run() {
        var cursor;
        const db = await database.getDb();
        try {
            cursor = db.collection.find({});
            var result = await cursor.toArray();

            if ((await cursor.count()) === 0) {
                console.log("No documents found!");
            }
        } finally {
            await db.client.close();
            return result;
        }
    },
    oneTitle: async function run(id) {
        const db = await database.getDb();

        try {
            if (ObjectId.isValid(id)) {
                const query = {_id: new ObjectId(id)};
                let crusor = await db.collection.find(query);
                var found = await crusor.toArray();
    
                return found[0].title;
            }
            return "No valid id";
        } finally {
            await db.client.close();
        } 
    },
    one: async function run(id) {
        const db = await database.getDb();
        try {

            if (ObjectId.isValid(id)) {
                const query = {_id: new ObjectId(id)};
                let crusor = await db.collection.find(query);
                var found = await crusor.toArray();
    
                return found[0];
            }
            return "No valid id";
        } finally {
            await db.client.close();
        }  
    }
};

module.exports = data;
