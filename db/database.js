const mongo = require("mongodb").MongoClient;
try {
    const config = require("../config.json");
} catch(e) {
    console.log(e)
}

var collectionName = "";

const username = process.env.USERNAME || config.username;
const password = process.env.PASSWORD || config.password;
const link = `cluster0.yu3ek.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// let DSN_CONNECTION = `mongodb+srv://${config.username}:${config.password}@cluster0.yu3ek.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const database = {
    getDb: async function getDb () {
        // Link to MongoDB Atlas
        let dsn = `mongodb+srv://${username}:${password}@${link}`;
        // console.log(process.env.NODE_ENV)

        if (process.env.NODE_ENV !== 'test') {
            // Production collection name
            collectionName = "texts";
            console.log("i produktion")
        } else {
            //Test collection name
            console.log("i test")
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

