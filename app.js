const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require('cors');

const index = require('./routes/index');
const save = require('./routes/save');
const documents = require('./routes/documents');

const update = require("./src/update.js");


const app = express();
// const port = process.env.PORT || 1337;
const port = process.env.PORT || 3000;


const httpServer = require("http").createServer(app);

const io = require("socket.io")(httpServer, {
    cors: {
      origin: "http://localhost:4200",
      methods: ["GET", "POST"]
    }
  });



io.on('connection', function (socket) {
    console.info("User connected");

    // socket.emit('message', "testing some data new");
    // var throttleTimer;

    socket.on('create', function(room) {
        var reset;
        socket.join(room);
        socket.leave(reset);
        reset = room;
        console.log(`i server ${room}`)
    });


    socket.on('message', function (message) {
        console.log(message)
        let id = message.id; 
        socket.to(message.id).emit("message", message.text);

        throttleTimer = setTimeout(async function() {
            console.log("now it should save to database")
            await update.updateDoc(message.id, message);
            // console.log(res)
        }, 2000);
        // io.emit('message', message.text);
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


app.use('/', index);
app.use('/save', save);
app.use('/documents', documents);


app.get("/test", (req, res) => {
    const data = {
        data: {
            msg: "Testsidan"
        }
    };

    console.log(data);
    // res.json(data);
    res.status(200).json(data);
});


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

// Start up server
// const server = app.listen(port, () => console.log(`Example API listening on port ${port}!`));
const server= httpServer.listen(port, () => {
    console.log(`listening on ${port}`);
  });


module.exports = server;
