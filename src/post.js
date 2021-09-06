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
    // create a document to be inserted
    const doc = { title: "Test title", content: "test content" };
    const result = await text.insertOne(doc);
    console.log(result);
    console.log(
      `${result.acknowledged} documents were inserted with the _id: ${result.insertedId}`,
    );
  } finally {
    await client.close();
  }
}
run().catch(console.dir);