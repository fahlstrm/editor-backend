"use strict";

const uri = require("../db/database.js");
// const { MongoClient } = require("mongodb");

/**
 * Post ned docs to editor collection
 */
async function run() {
  try {
    const db = await database.getDb();

    // create a document to be inserted
    const doc = { title: "Test title", content: "test content" };
    const result = await db.connection.insertOne(doc);

    console.log(
      `${result.acknowledged} documents were inserted with the _id: ${result.insertedId}`,
    );
  } finally {
    await client.close();
  }
}
run().catch(console.dir);