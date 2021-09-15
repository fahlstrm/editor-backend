

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.use(chaiHttp);
chai.should();


describe('Index', () => {
    describe('GET /', () => {
        it('it should return an object, expect not to be null', (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");

                    done();
                });
        });
    });

    describe('GET /test', () => {
        it('it should return an object', (done) => {
            chai.request(server)
                .get("/test")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");

                    done();
                });
        });
    });
})