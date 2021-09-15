process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const database = require("../db/database.js");

chai.use(chaiHttp);
chai.should();

async function create() {
    const db = await  database.getDb();
    
    db.collection.insertOne(
        { 
            "title" : "test-titel",
            "text" : "test-text to use in tests",
        }
     )
}

async function tearDown() {
    const db = await database.getDb();

    db.db.listCollections(
        { name: "test-docs" }
    )
        .next()
        .then(async function(info) {
            if (info) {
                await db.collection.drop();
            }
        })
        .catch(function(err) {
            console.error(err);
        })
        .finally(async function() {
            await db.client.close();
            resolve();
        });
}



describe('Documents', () => {
    describe('GET /documents/all', () => {
        before('connect', async function() {
            await tearDown();
            await create();
        });
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
})
