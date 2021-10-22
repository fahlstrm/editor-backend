const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require('cors');

const update = require("./src/update.js");
const jwt = require("./src/jwt.js");
const index = require('./routes/index');
const save = require('./routes/save');
const users = require('./routes/users');
const documents = require('./routes/documents');
const comments = require('./routes/comments');

const { graphqlHTTP } = require('express-graphql');
const {GraphQLSchema} = require("graphql");
const RootQueryType = require("./graphql/root.js");
const root = require('./graphql/root');

const puppeteer = require('./puppeteer/puppeteer');
 
const app = express();
const port = process.env.PORT || 3000;


/**
 * Sockets.io
 */
const httpServer = require("http").createServer(app);

const io = require("socket.io")(httpServer, {
    cors: {
        // origin: "http://www.student.bth.se",
        origin: "*",
        methods: ["GET", "POST"]
    }
  });


io.on('connection', function (socket) {
    console.info("User connected");
    console.log(socket.handshake.query);

    socket.on('create', function(room) {
        var reset;
        socket.leave(reset);
        socket.join(room);
        reset = room;
        console.log(`i server ${room}`)
    });


    socket.on('message', function (message) {
        console.log(message)
        console.log("skickar meddelande")
        socket.to(message.id).emit("message", message.content);

        throttleTimer = setTimeout(async function() {
            console.log("now it should save to database")
            console.log("data som skickas tillbaka", message)
            await update.updateDoc(message.id, message);
        }, 2000);
    });

});



app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());



// This is middleware called for all routes.
// Middleware takes three parameters.
app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}



/**
 * HTTP-routes
 */
app.use('/', index);
app.use('/save', save);
app.use('/users', users);
app.use('/documents', documents);
app.use('/comments', comments);


/**
 * Graphql 
 */
 const schema = new GraphQLSchema({
    query: RootQueryType
});


// TODO: Sätt tillbaka till token
app.use(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      graphiql: false,
    }),
    // '/graphql',
    // (request, response, next) => jwt.checkToken(request, response, next),
    // graphqlHTTP({
    //   schema: schema,
    //   graphiql: false,
    // }),
);




/**
 * Test route 
 */
app.get("/test", (req, res) => {

    const data = puppeteer.createPdf();


});




/**
 * Error handling
 */
app.use((req, res, next) => {
    var err = new Error("Not Found");

    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});



/**
 * Start up server
 */
const server= httpServer.listen(port, () => {
    console.log(`listening on ${port}`);
  });


module.exports = server;
