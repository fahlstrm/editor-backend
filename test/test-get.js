process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const users = require('../routes/users.js');
const db = require("./db-setup.js")
const jwt = require("./jwt-setup.js")

chai.use(chaiHttp);
chai.should();



describe('Documents', () => {
    before('connect', async function() {
        await db.tearDown();
        doc = await db.createDoc();
        // user = await db.createUser();
        // token = await jwt.createToken(user.data[0].username);
        token = await jwt.createToken("TestUser");
        // console.log(token)
    });
    describe('GET /documents/all', () => {
        it('it should return an object', (done) => {
            chai.request(server)
                // .auth(token)
                .get("/documents/all")
                .set({'x-access-token': token})
                .end((err, res) => {
                    // console.log(res)
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");

                    done();
                });
        });
    });
    // describe('GET /documents/all', () => {
    //     it('it should return an err ojb', (done) => {
    //         chai.request(server)
    //             // .auth(token)
    //             .get("/documents/all")
    //             .set({'x-access-token': "felToken"})
    //             .end((err, res) => {
    //                 // console.log(res)
    //                 res.body.should.be.an("object");
    //                 res.body.data.should.be.an("array");

    //                 done();
    //             });
    //     });
    // });
    describe('GET /documents/users/:id', () => {
        it('it should return an object', (done) => {
            chai.request(server)
                .get(`/documents/users/${doc.id}`)     
                .set({'x-access-token': token})
                .end((err, res) => {
                    res.body.should.be.an("object");
                    // res.body.data.should.be.an("array");

                    done();
                });
        });
    });
    describe('GET /documents/:id', () => {
        it('it should return an object', (done) => {
            chai.request(server)
                .get(`/documents/${doc.id}`)     
                .set({'x-access-token': token})
                .end((err, res) => {
                    res.body.should.be.an("object");
                    // res.body.data.should.be.an("array");

                    done();
                });
        });
    });
})
