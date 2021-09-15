process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const db = require("./db-setup.js")

chai.use(chaiHttp);
chai.should();



describe('Save', () => {
    before('connect', async function() {
        await db.tearDown();
        result = await db.create();
    });
    describe('POST /save/:id', () => {
        it('it should return an object', (done) => {
            chai.request(server)
                .post(`/save/${result.id}`)
                .send({ body : {
                    text: "Trying to update text"
                }})
                .end((err, res) => {
                    // let found = await db.find(text);
                    // console.log(found)
                    res.body.should.be.an("object");
                    // res.body.data.should.be.an("array");

                    done();
                });
        });
        it('it should return an object', (done) => {
            chai.request(server)
                .post(`/save/0`)
                .send({ body : {
                    text: "New text"
                }})
                .end((err, res) => {
                    // let found = await db.find(text);
                    // console.log(found)
                    res.body.should.be.an("object");
                    // res.body.data.should.be.an("array");

                    done();
                });
        });
        it('it should return an object', (done) => {
            chai.request(server)
                .post(`/save/0`)
                .send({ body : {
                    text: "New text"
                }})
                .end((err, res) => {
                    // let found = await db.find(text);
                    // console.log(found)
                    res.body.should.be.an("object");
                    // res.body.data.should.be.an("array");

                    done();
                });
        });
    });
})
