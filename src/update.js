"use strict";

const uri = require("../db/database.js");
const { MongoClient } = require("mongodb");

const client = new MongoClient(uri);

const data = {
    update: async function(old_h1, new_h1 = old_h1) {
        var created = null;
        try {
            await client.connect();
            const database = client.db("editor");
            const text = database.collection("texts");
            // create a query for a movie to update
            const query = { title: old_h1 };
            const options = {
              // create a document if no documents match the query
              upsert: true,
            };
            // create a new document that will be used to replace the existing document
            const replacement = {
              title: new_h1,
              plot:
                "Robin Sparkles mourns for a relationship with a mall rat at an idyllic beach.",
            };
            const result = await text.replaceOne(query, replacement, options);
            if (result.modifiedCount === 0 && result.upsertedCount === 0) {
              console.log("No changes made to the collection.");
            } else {
              if (result.matchedCount === 1) {
                console.log("Matched " + result.matchedCount + " documents.");
              }
              if (result.modifiedCount === 1) {
                console.log("Updated one document.");
              }
              if (result.upsertedCount === 1) {
                created = 1;
                console.log(
                  "Inserted one new document with an _id of " + result.upsertedId
                );
              }
            }
          } finally {
            await client.close();
            return created;
          }
    }
}

module.exports = data;

// async function run() {
//   try {
//     await client.connect();
//     const database = client.db("editor");
//     const text = database.collection("texts");
//     // create a query for a movie to update
//     const query = { title: "Test title" };
//     const options = {
//       // create a document if no documents match the query
//       upsert: true,
//     };
//     // create a new document that will be used to replace the existing document
//     const replacement = {
//       title: "Sandcastles in the Sand",
//       plot:
//         "Robin Sparkles mourns for a relationship with a mall rat at an idyllic beach.",
//     };
//     const result = await text.replaceOne(query, replacement, options);
//     if (result.modifiedCount === 0 && result.upsertedCount === 0) {
//       console.log("No changes made to the collection.");
//     } else {
//       if (result.matchedCount === 1) {
//         console.log("Matched " + result.matchedCount + " documents.");
//       }
//       if (result.modifiedCount === 1) {
//         console.log("Updated one document.");
//       }
//       if (result.upsertedCount === 1) {
//         console.log(
//           "Inserted one new document with an _id of " + result.upsertedId._id
//         );
//       }
//     }
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);