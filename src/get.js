"use strict";

const uri = require("../db/database.js");
const { MongoClient, ObjectId } = require("mongodb");

/**
 * get all documents in mongoDB
 */

 const client = new MongoClient(uri);
 const data = {
  all: async function run() {
    var cursor;
    try {
      await client.connect();
      const database = client.db("editor");
      const texts = database.collection("texts");
      cursor = texts.find({});
      var result = await cursor.toArray(); 

      if ((await cursor.count()) === 0) {
        console.log("No documents found!");
      }
    } finally {
      await client.close();
      return result;
    }
  },
  oneTitle: async function run(id) {
    await client.connect();
    const database = client.db("editor");
    const texts = database.collection("texts");
  
    
    if(ObjectId.isValid(id)) {
      const query = {_id: new ObjectId(id)};
      let crusor = await texts.find(query);
      var found = await crusor.toArray();
      return found[0].title;
    }
    return "No valid id"
  },
  one: async function run(id) {
    await client.connect();
    const database = client.db("editor");
    const texts = database.collection("texts");
  
    
    if(ObjectId.isValid(id)) {
      const query = {_id: new ObjectId(id)};
      let crusor = await texts.find(query);
      var found = await crusor.toArray();
      return found[0];
    }
    return "No valid id"
  }
}

module.exports = data;