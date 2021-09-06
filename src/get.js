"use strict";

const uri = require("../db/database.js");
const { MongoClient } = require("mongodb");

/**
 * Post ned docs to editor collection
 */

 const client = new MongoClient(uri);
 async function run() {
   try {
     await client.connect();
     const database = client.db("editor");
     const text = database.collection("texts");
     // Query for a movie that has the title 'The Room'
     const query = { title: "Test title" };
  
     const doc = await text.findOne(query);
     // since this method returns the matched document, not a cursor, print it directly
     console.log(doc);
   } finally {
     await client.close();
   }
 }
 run().catch(console.dir);