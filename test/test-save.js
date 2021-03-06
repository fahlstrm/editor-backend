process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const db = require("./db-setup.js")
const jwt = require("./jwt-setup.js")

chai.use(chaiHttp);
chai.should();

let token; 

describe('Save', () => {
    before('connect', async function() {
        await db.tearDown();
        doc = await db.createDoc();
        token = await jwt.createToken("TestUser");
        console.log(doc)
    });
    describe('POST /save/new/doc', () => {
        it('it should return an object', (done) => {
            chai.request(server)
                .post(`/save/new/doc`)
                .set({'x-access-token': token})
                .send({
                    title: "New title",
                    text: "",
                    users: ["testuser", "anotherTestUser" ]
                })
                .end((err, res) => {
                    res.body.should.be.an("object");
                    done();
                });
        });
    });
    describe('POST /save/new/user', () => {
        it('it should return an object', (done) => {
            chai.request(server)
                .post(`/save/new/user`)
                .set({'x-access-token': token})
                .send({
                    id: doc.id,
                    newUser: "newUser"
                })
                .end((err, res) => {
                    res.body.should.be.an("object");
                    done();
                });
        });
    });
});
