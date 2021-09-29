const mongo = require("mongodb").MongoClient;

// const {MongoClient} = require("mongodb");

var config;

try {
    config = require("../config.json");
} catch (e) {
    console.log(e);
}


var username = process.env.USERNAME || config.username;
var password = process.env.PASSWORD || config.password;

// Link to MongoDB Atlas
var link = `cluster0.yu3ek.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const database = {
    documents: async function () {
        let dsn = `mongodb+srv://${username}:${password}@${link}`;
        let collectionName; 

        if (process.env.NODE_ENV != 'test') {
            // Production collection name
            collectionName = "texts";
        } else if (process.env.NODE_ENV == 'test') {
            //Test collection name
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
    },
    users: async function () {
        let dsn = `mongodb+srv://${username}:${password}@${link}`;
        let collectionName; 

        if (process.env.NODE_ENV != 'test') {
            // Production collection name
            collectionName = "users";
        } else if (process.env.NODE_ENV == 'test') {
            //Test collection name
            collectionName = "test-users";
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
    },
};

module.exports = database;

