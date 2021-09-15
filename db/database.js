const mongo = require("mongodb").MongoClient;

var config; 
try {
    config = require("../config.json");
} catch(e) {
    console.log(e)
}

var collectionName = "";

var username = process.env.USERNAME || config.username;
// var password = process.env.PASSWORD || config.password;
var link = `cluster0.yu3ek.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const database = {
    getDb: async function getDb () {
        // Link to MongoDB Atlas

        let dsn = `mongodb+srv://${username}:${password}@${link}`;
        // console.log(process.env.NODE_ENV)

        if (process.env.NODE_ENV != 'test') {
            // Production collection name
            collectionName = "texts";
            console.log("i produktion")
        } else if (process.env.NODE_ENV == 'test') {
            //Test collection name
            console.log("collectionName: test-docs")
            collectionName = "test-docs";

        }

        const client  = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = await client.db("editor");
        const collection = await db.collection(collectionName);

        return {
            db: db,
            collection: collection,
            client: client,
        };
    }
};

module.exports = database;

