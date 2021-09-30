const database = require("../db/database.js");
const hash = require("../src/hash.js");
const jwt = require("../src/jwt.js");

// config = require("../config.json");


const jwtSetup = {
    createToken: async function(username) {
        let token = jwt.getToken(username)
        return token;
    }
}


module.exports = jwtSetup;
