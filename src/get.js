"use strict";

const uri = require("../db/database.js");
const { MongoClient } = require("mongodb");

/**
 * 
 */

 const client = new MongoClient(uri);
 const data = {
  getAll: async function run() {
    try {
      await client.connect();
      const database = client.db("editor");
      const texts = database.collection("texts");
      // query for movies that have a runtime less than 15 minutes
      const query = { runtime: { $lt: 15 } };
      const options = {
        // sort returned documents in ascending order by title (A->Z)
        sort: { title: 1 },
        // Include only the `title` field in each returned document
        projection: { _id: 0, title: 1 },
      };
      const cursor = texts.find(query, options);
      // print a message if no documents were found
      if ((await cursor.count()) === 0) {
        console.log("No documents found!");
      }
      // replace console.dir with your callback to access individual elements
      await cursor.forEach(console.dir);
    } finally {
      await client.close();
    }
  }
}

module.exports = data;