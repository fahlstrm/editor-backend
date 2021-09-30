const database = require("../db/database.js");
const hash = require("../src/hash.js");

const dbFunc = {
    createDoc: async function() {
        const db = await database.documents();

        db.collection.insertOne(
            { 
                "title" : "test-title",
                "text" : "test-text to use in tests",
                "users": ["userOne"]
            }
            )
        let res = await db.collection.find({"title": "test-title"} ).toArray();
        let result = {};
        
        result.id = res[0]._id.toString();
        result.data = res;
    
        return result;
    },
    createUser: async function() {
        const db = await database.users();

        db.collection.insertOne(
            { 
                "username" : "testUser",
                "password" : "aHashPassword",
            }
         )
        let res = await db.collection.find({"username": "testUser"} ).toArray();
        let result = {};
        
        result.id = res[0]._id.toString();
        result.data = res;
    
        return result;
    },
    findDoc: async function(title) {
        const db = await database.documents();
        let res = await db.collection.find({"text": `${title}`} ).toArray();
        return res;
    },
    tearDown: async function() {
        const db = await database.documents();
        db.db.listCollections(
            { name: "test" }
        )
            .next()
            .then(async function(info) {
                if (info) {
                    await db.collection.drop();
                }
            })
            .catch(function(err) {
                console.error(err);
            })
            .finally(async function() {
                await db.client.close();
                resolve();
            });
    },
    tearDownUsers: async function() {
        const db = await database.users();
        db.db.listCollections(
            { name: "test-docs" }
        )
            .next()
            .then(async function(info) {
                if (info) {
                    await db.collection.drop();
                }
            })
            .catch(function(err) {
                console.error(err);
            })
            .finally(async function() {
                await db.client.close();
                resolve();
            });
    },
}


module.exports = dbFunc;
