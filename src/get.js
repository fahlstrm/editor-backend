"use strict";

const database = require("../db/database.js");
const users = require("./users.js");

const { ObjectId } = require("mongodb");

/**
 * Functions to collect all docs. or one specific doc
 */
const data = {
    all: async function run() {
        var cursor;
        const db = await database.documents();
        try {
            cursor = db.collection.find({});
            var result = await cursor.toArray();
            if ((await cursor.count()) === 0) {
                console.log("No documents found!");
            }
        } finally {
            await db.client.close();
            return result;
        }
    },
    docUsers: async function(id) {
        const db = await database.documents();
        var result; 
        try {
            const query = {_id: new ObjectId(id)};
            let crusor = await db.collection.find(query);
            let found = await crusor.toArray();
            let avaliable = await this.availableUser(found[0].users);

            result = {
                currentUsers: found[0].users,
                availableUsers : avaliable
            }

        } finally {
            await db.client.close();
            return result;
        }
    },
    availableUser: async function(docUser) {
        let allUsers = await users.getAllUsers();
        let avaUsers = allUsers.map(check);

        avaUsers = avaUsers.filter(emp => {
            return emp != null && emp != ``;
        })

        function check(user) {
            console.log(user.username)
            if (docUser.includes(user.username)) {
                return; 
            }
            return user;
        }
        return avaUsers;
    },
    oneTitle: async function run(id) {
        const db = await database.documents();

        try {
            if (ObjectId.isValid(id)) {
                const query = {_id: new ObjectId(id)};
                let crusor = await db.collection.find(query);
                var found = await crusor.toArray();
    
                return found[0].title;
            }
            return "No valid id";
        } finally {
            await db.client.close();
        } 
    },
    one: async function run(id) {
        const db = await database.documents();
        try {

            if (ObjectId.isValid(id)) {
                const query = {_id: new ObjectId(id)};
                let crusor = await db.collection.find(query);
                var found = await crusor.toArray();
    
                return found[0];
            }
            return "No valid id";
        } finally {
            await db.client.close();
        }  
    }
};

module.exports = data;
