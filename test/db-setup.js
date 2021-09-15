const database = require("../db/database.js");




const dbFunc = {
    create: async function() {
        const db = await database.getDb();
        db.collection.insertOne(
            { 
                "title" : "test-title",
                "text" : "test-text to use in tests",
            }
         )
        let id = await db.collection.find({"title": "test-title"} ).toArray();
    
        id = id[0]._id.toString();
    
        return id;
    },
    tearDown: async function() {
        const db = await database.getDb();
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
    }
}


module.exports = dbFunc;
