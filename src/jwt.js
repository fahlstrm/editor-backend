config = require("../config.json");
const jwt = require('jsonwebtoken');

// const payload = { email: "user@example.com" };
// const secret = process.env.JWT_SECRET;

// const token = jwt.sign(payload, secret, { expiresIn: '1h'});

var config;

/**
 * jwt 
 */
 const data = {
    secret: process.env.JWT_SECRET || config.secret,
    getToken: function(username) {
        return new Promise(async (res, rej) => {
            let payload = {username: username}
            let token = await jwt.sign(payload, this.secret, { expiresIn: '1h'});
            if (token == null) {
                rej("Something went wrong")
            }
            res(token);
        })
    },
}

module.exports = data;

