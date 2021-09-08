"use strict";
const document = require("./get.js");

const uri = require("../db/database.js");
const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient(uri);

const data = {
    update: async function(id, body) {
        var created = null;
        try {
          console.log(body);
          await client.connect();
          const database = client.db("editor");
          const text = database.collection("texts");
          //Get document by id 
          let found = await document.oneTitle(id);
          console.log(found);
          //Using title or creates new one
          const query = {title: found};

          const options = {
            // create a document if no documents match the query
            upsert: true,
          };
          // create a new document that will be used to replace the existing document
          const replacement = {
            title: body.text.slice(3, 10),
            text:
              body.text,
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
