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
        { "title" : "canvas",
          "test" : "test",
        }
     )
    // console.log(db.collection.find({}))
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





describe('GET /documents/all', () => {
    before('connect', async function() {
        tearDown();
        create();
        // const db = await  database.getDb();
        // db.collection.insertOne(
        // { "title" : "canvas",
        //   "test" : "test",
        // }
        // )
    // console.log(db.collection.find({}))
      });
    it('it should return an object', (done) => {
        chai.request(server)
            .get("/documents/all")
            .end((err, res) => {
                // res.should.have.status(200);

                res.body.should.be.an("object");
                res.body.data.should.be.an("array");

                done();
            });
    });
});

// describe('GET /test', () => {
//     it('it should return an object', (done) => {
//         chai.request(server)
//             .get("/test")
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.an("object");
//                 res.body.data.should.be.an("object");

//                 done();
//             });
//     });
// });
