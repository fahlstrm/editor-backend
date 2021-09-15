process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const db = require("./db-setup.js")

chai.use(chaiHttp);
chai.should();



describe('Documents', () => {
    before('connect', async function() {
        await db.tearDown();
        id_ = await db.create();
    });
    describe('GET /documents/all', () => {

        it('it should return an object', (done) => {
            chai.request(server)
                .get("/documents/all")
                .end((err, res) => {
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");

                    done();
                });
        });
    });

    describe('GET /documents/:id', () => {
        it('it should return an object', (done) => {
            chai.request(server)
                .get(`/documents/${id_}`)                
                .end((err, res) => {
                    res.body.should.be.an("object");
                    // res.body.data.should.be.an("array");

                    done();
                });
        });
    });
})
