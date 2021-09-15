const mongo = require("mongodb").MongoClient;
const config = require("../config.json");
var collectionName = "";


// let DSN_CONNECTION = `mongodb+srv://${config.username}:${config.password}@cluster0.yu3ek.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const database = {
    getDb: async function getDb () {
        // Link to MongoDB Atlas
        let dsn = `mongodb+srv://${config.username}:${config.password}@${config.link}`;
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

