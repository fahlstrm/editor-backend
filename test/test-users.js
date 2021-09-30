process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const db = require("./db-setup.js")

chai.use(chaiHttp);
chai.should();


describe('Users', () => {
    before('connect', async function() {
        await db.tearDown();
        // result = await db.create("doc");
    });
    describe('POST /users/create', () => {
        it('it should return an object', (done) => {
            chai.request(server)
                .post(`/users/create`)
                .send({
                    username: "TestUser",
                    password: "AnHashedPassword",
                })
                .end((err, res) => {
                    res.body.should.be.an("object");
                    done();
                });
        });
    });
    describe('POST /users/login', () => {
        it('it should return an object', (done) => {
            chai.request(server)
                .post(`/users/login`)
                .send({
                    username: "TestUser",
                    password: "AnHashedPassword",
                })
                .end((err, res) => {
                    res.body.should.be.an("object");
                    done();
                });
        });
    });
    describe('POST /users/all', () => {
        it('it should return an object', (done) => {
            chai.request(server)
                .get(`/users/all`)
                .end((err, res) => {
                    res.body.should.be.an("object");
                    done();
                });
        });
    });
});
